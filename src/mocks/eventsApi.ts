// Fake backend for the Events API. Answers with exactly the shapes in docs/api/events.md,
// so pages work the same before and after the real backend exists.
import type { LanguageCode } from '@/i18n'
import ar from '@/i18n/locales/ar.json'
import en from '@/i18n/locales/en.json'
import fr from '@/i18n/locales/fr.json'
import { faculties } from '@/data/faculties'
import { ApiError } from '@/lib/api'
import type {
  Block,
  EventCategory,
  EventCategoryKey,
  EventDetail,
  EventFilterOptions,
  EventListParams,
  EventOrganizer,
  EventPerson,
  EventRole,
  EventSummary,
  Image,
  Inline,
  Paginated,
  PersonDetail,
  PersonSummary,
} from '@/api/types'
import { events } from './data/events'
import type {
  Localized,
  MockBlock,
  MockEvent,
  MockImage,
  MockInline,
  MockPerson,
} from './data/helpers'
import { people } from './data/people'

const SITE_URL = import.meta.env.VITE_SITE_URL ?? ''
const locales = { en, fr, ar }

/** Pretend network latency so loading states can be seen */
const delay = () => new Promise((resolve) => setTimeout(resolve, 250))

// ── Lookups ────────────────────────────────────────────────────────

// Faculty slugs used in the API → ids used by the faculties section
const FACULTY_IDS: Record<string, string> = {
  economics: 'economics',
  'math-cs': 'mathCs',
  'nature-life': 'natureLife',
  technical: 'technical',
  'foreign-languages': 'foreignLanguages',
  arabic: 'arabic',
  law: 'law',
}

const OTHER_ORGANIZERS: Record<string, Localized<string>> = {
  rectorate: { en: 'Rectorate', fr: 'Rectorat', ar: 'رئاسة الجامعة' },
  incubator: { en: 'Business Incubator', fr: "Incubateur d'entreprises", ar: 'حاضنة الأعمال' },
  'research-labs': {
    en: 'Research Laboratories',
    fr: 'Laboratoires de recherche',
    ar: 'مخابر البحث',
  },
  'environment-club': { en: 'Environment Club', fr: "Club de l'environnement", ar: 'نادي البيئة' },
}

const UNIVERSITY_NAME: Localized<string> = {
  en: 'Mila University',
  fr: 'Université de Mila',
  ar: 'جامعة ميلة',
}

const ROLE_LABELS: Record<EventRole, Localized<string>> = {
  organizer: { en: 'Organizer', fr: 'Organisateur', ar: 'المنظم' },
  speaker: { en: 'Speaker', fr: 'Intervenant', ar: 'متدخل' },
  moderator: { en: 'Moderator', fr: 'Modérateur', ar: 'مسيّر الجلسة' },
  coordinator: { en: 'Coordinator', fr: 'Coordinateur', ar: 'المنسق' },
  guest: { en: 'Guest of honour', fr: "Invité d'honneur", ar: 'ضيف شرف' },
}

const facultyName = (slug: string, lang: LanguageCode) => {
  const id = FACULTY_IDS[slug] as keyof typeof en.faculties.items | undefined
  return id ? locales[lang].faculties.items[id].title : undefined
}

const facultyHref = (slug: string) => {
  const id = FACULTY_IDS[slug]
  return faculties.find((faculty) => faculty.id === id)?.to
}

const organizerName = (kind: EventOrganizer['kind'], slug: string, lang: LanguageCode) =>
  (kind === 'faculty' ? facultyName(slug, lang) : OTHER_ORGANIZERS[slug]?.[lang]) ?? slug

// Event dates carry Algeria's +01:00 offset, so the year and month can be read directly
const yearOf = (event: MockEvent) => Number(event.startDate.slice(0, 4))
const monthOf = (event: MockEvent) => Number(event.startDate.slice(5, 7))

const findPerson = (slug: string) => people.find((person) => person.slug === slug)
const publishedEvents = () => events.filter((event) => new Date(event.publishedAt) <= new Date())

// ── Converters: admin-shaped record → public response in one language ──

const toImage = (img: MockImage, lang: LanguageCode): Image => ({
  id: img.id,
  url: img.file,
  alt: img.alt[lang],
  caption: img.caption?.[lang] ?? null,
  width: img.width,
  height: img.height,
})

const toCategory = (key: EventCategoryKey, lang: LanguageCode): EventCategory => ({
  key,
  label: locales[lang].events.categories[key],
})

function timingOf(event: MockEvent) {
  const now = Date.now()
  if (new Date(event.startDate).getTime() > now) return 'upcoming' as const
  return new Date(event.endDate).getTime() >= now ? ('ongoing' as const) : ('past' as const)
}

const toPersonSummary = (person: MockPerson, lang: LanguageCode): PersonSummary => ({
  id: person.id,
  slug: person.slug,
  fullName: person.fullName[lang],
  honorific: person.honorific?.[lang] ?? null,
  type: person.type,
  position: person.position[lang],
  department: person.department
    ? { slug: person.department.slug, name: person.department.name[lang] }
    : null,
  photo: person.photo ? toImage(person.photo, lang) : null,
  profileUrl: `${SITE_URL}/people/${person.slug}`,
})

/** Resolves link targets to hrefs; links to things that don't exist become plain text */
function toInline(node: MockInline): Inline {
  if (node.type === 'text') return node
  const { target } = node
  switch (target.kind) {
    case 'url':
      return { type: 'link', text: node.text, target }
    case 'event':
      return events.some((event) => event.slug === target.slug)
        ? { type: 'link', text: node.text, target: { ...target, href: `/events/${target.slug}` } }
        : { type: 'text', text: node.text }
    case 'person':
      return findPerson(target.slug)
        ? { type: 'link', text: node.text, target: { ...target, href: `/people/${target.slug}` } }
        : { type: 'text', text: node.text }
    case 'faculty': {
      const href = facultyHref(target.slug)
      return href
        ? { type: 'link', text: node.text, target: { ...target, href } }
        : { type: 'text', text: node.text }
    }
    case 'page':
      return { type: 'link', text: node.text, target: { ...target, href: `/${target.slug}` } }
  }
}

function toBlock(block: MockBlock): Block {
  switch (block.type) {
    case 'list':
      return { ...block, items: block.items.map((item) => item.map(toInline)) }
    default:
      return { ...block, children: block.children.map(toInline) }
  }
}

function toSummary(event: MockEvent, lang: LanguageCode): EventSummary {
  return {
    id: event.id,
    slug: event.slug,
    url: `${SITE_URL}/events/${event.slug}`,
    title: event.title[lang],
    summary: event.summary[lang],
    category: toCategory(event.category, lang),
    startDate: event.startDate,
    endDate: event.endDate,
    allDay: event.allDay,
    timing: timingOf(event),
    location: {
      name: event.location.name[lang],
      address: event.location.address?.[lang] ?? null,
      mapUrl: event.location.mapUrl,
      online: event.location.online,
    },
    coverImage: toImage(event.gallery[0], lang),
    photoCount: event.gallery.length,
    isFeatured: event.isFeatured,
  }
}

function toDetail(event: MockEvent, lang: LanguageCode): EventDetail {
  const summary = toSummary(event, lang)
  const eventPeople: EventPerson[] = event.people.flatMap(({ personSlug, role, note }) => {
    const person = findPerson(personSlug)
    if (!person) return []
    return [
      {
        role,
        roleLabel: ROLE_LABELS[role][lang],
        note: note?.[lang] ?? null,
        person: toPersonSummary(person, lang),
      },
    ]
  })
  const organizers: EventOrganizer[] = event.organizers.map(({ kind, slug }) => ({
    kind,
    slug,
    name: organizerName(kind, slug, lang),
  }))

  return {
    ...summary,
    mainLink: event.mainLink
      ? {
          kind: event.mainLink.kind,
          label: event.mainLink.label[lang],
          url: event.mainLink.url,
          opensInNewTab: true,
        }
      : null,
    content: event.content[lang].map(toBlock),
    gallery: event.gallery.map((img) => toImage(img, lang)),
    links: event.links.map((item) => ({
      kind: item.kind,
      label: item.label[lang],
      url: item.url,
      opensInNewTab: true,
    })),
    people: eventPeople,
    organizers,
    tags: event.tags[lang],
    publishedAt: event.publishedAt,
    updatedAt: event.updatedAt,
    seo: {
      title: `${summary.title} | ${UNIVERSITY_NAME[lang]}`,
      description: summary.summary,
      image: `${summary.coverImage.url}?tr=w-1200`,
    },
  }
}

const newestFirst = (a: MockEvent, b: MockEvent) => b.startDate.localeCompare(a.startDate)

// ── Endpoints ──────────────────────────────────────────────────────

/** GET /events/top */
export async function getTopEvents(lang: LanguageCode, limit = 6): Promise<EventSummary[]> {
  await delay()
  const sorted = publishedEvents().sort(newestFirst)
  const featured = sorted.filter((event) => event.isFeatured)
  const others = sorted.filter((event) => !event.isFeatured)
  return [...featured, ...others].slice(0, limit).map((event) => toSummary(event, lang))
}

/** GET /events */
export async function listEvents(
  lang: LanguageCode,
  params: EventListParams = {},
): Promise<Paginated<EventSummary>> {
  await delay()
  const {
    page = 1,
    pageSize = 12,
    category,
    timing,
    featured,
    q,
    person,
    organizer,
    year,
    month,
    sort,
  } = params
  if (month !== undefined && (month < 1 || month > 12 || year === undefined)) {
    throw new ApiError(422, 'VALIDATION_ERROR', 'month must be 1–12 and needs a year.')
  }
  if (page < 1 || pageSize < 1 || pageSize > 50) {
    throw new ApiError(422, 'VALIDATION_ERROR', 'Invalid page or pageSize.')
  }
  const query = q?.trim().toLowerCase()

  const matches = publishedEvents()
    .filter((event) => !category || event.category === category)
    .filter((event) => !timing || timingOf(event) === timing)
    .filter((event) => featured === undefined || event.isFeatured === featured)
    .filter((event) => !person || event.people.some((item) => item.personSlug === person))
    .filter((event) => !organizer || event.organizers.some((item) => item.slug === organizer))
    .filter((event) => !year || yearOf(event) === year)
    .filter((event) => !month || monthOf(event) === month)
    .filter(
      (event) =>
        !query ||
        [
          event.title[lang],
          event.summary[lang],
          event.location.name[lang],
          ...event.tags[lang],
        ].some((text) => text.toLowerCase().includes(query)),
    )
    .sort((a, b) => {
      if (sort === 'startDate') return a.startDate.localeCompare(b.startDate)
      if (sort === 'title') return a.title[lang].localeCompare(b.title[lang], lang)
      if (sort === '-publishedAt') return b.publishedAt.localeCompare(a.publishedAt)
      return newestFirst(a, b)
    })

  const start = (page - 1) * pageSize
  return {
    data: matches.slice(start, start + pageSize).map((event) => toSummary(event, lang)),
    meta: {
      page,
      pageSize,
      total: matches.length,
      totalPages: Math.max(1, Math.ceil(matches.length / pageSize)),
    },
  }
}

/** GET /events/{slug} */
export async function getEvent(lang: LanguageCode, slug: string): Promise<EventDetail> {
  await delay()
  const event = publishedEvents().find((item) => item.slug === slug)
  if (!event) throw new ApiError(404, 'NOT_FOUND', 'Event not found.')
  return toDetail(event, lang)
}

/** GET /events/{slug}/related */
export async function getRelatedEvents(
  lang: LanguageCode,
  slug: string,
  limit = 3,
): Promise<EventSummary[]> {
  await delay()
  const event = publishedEvents().find((item) => item.slug === slug)
  if (!event) throw new ApiError(404, 'NOT_FOUND', 'Event not found.')
  const organizerSlugs = new Set(event.organizers.map((item) => item.slug))
  const score = (other: MockEvent) =>
    (other.category === event.category ? 2 : 0) +
    (other.organizers.some((item) => organizerSlugs.has(item.slug)) ? 1 : 0)

  return publishedEvents()
    .filter((other) => other.slug !== slug)
    .sort((a, b) => score(b) - score(a) || newestFirst(a, b))
    .slice(0, limit)
    .map((other) => toSummary(other, lang))
}

/** GET /event-categories */
export async function listEventCategories(lang: LanguageCode): Promise<EventCategory[]> {
  await delay()
  const counts = new Map<EventCategoryKey, number>()
  for (const event of publishedEvents()) {
    counts.set(event.category, (counts.get(event.category) ?? 0) + 1)
  }
  return [...counts].map(([key, count]) => ({ ...toCategory(key, lang), count }))
}

/** GET /people/{slug} */
export async function getPerson(lang: LanguageCode, slug: string): Promise<PersonDetail> {
  await delay()
  const person = findPerson(slug)
  if (!person) throw new ApiError(404, 'NOT_FOUND', 'Person not found.')
  return {
    ...toPersonSummary(person, lang),
    email: person.email,
    expertise: person.expertise[lang],
    bio: person.bio[lang].map(toBlock),
  }
}

/** GET /event-filters */
export async function getEventFilters(lang: LanguageCode): Promise<EventFilterOptions> {
  await delay()
  const published = publishedEvents()
  const countBy = <K>(keys: K[]) => {
    const counts = new Map<K, number>()
    for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1)
    return counts
  }

  const categories = [...countBy(published.map((event) => event.category))].map(([key, count]) => ({
    ...toCategory(key, lang),
    count,
  }))

  const organizerKinds = new Map<string, EventOrganizer['kind']>()
  for (const event of published) {
    for (const item of event.organizers) organizerKinds.set(item.slug, item.kind)
  }
  const organizers = [
    ...countBy(published.flatMap((event) => event.organizers.map((item) => item.slug))),
  ]
    .map(([slug, count]) => {
      const kind = organizerKinds.get(slug) ?? 'service'
      return { kind, slug, name: organizerName(kind, slug, lang), count }
    })
    .sort((a, b) => a.name.localeCompare(b.name, lang))

  const years = [...countBy(published.map(yearOf))]
    .sort(([a], [b]) => b - a)
    .map(([year, count]) => ({
      year,
      count,
      months: [...countBy(published.filter((event) => yearOf(event) === year).map(monthOf))]
        .sort(([a], [b]) => a - b)
        .map(([month, monthCount]) => ({ month, count: monthCount })),
    }))

  return { categories, organizers, years }
}
