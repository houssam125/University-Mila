// Shapes returned by the Events API. Keep in sync with docs/api/events.md.

export interface Image {
  id: string
  url: string
  alt: string
  caption: string | null
  width: number
  height: number
}

export type EventCategoryKey = 'conference' | 'ceremony' | 'workshop' | 'studentLife' | 'research'

export interface EventCategory {
  key: EventCategoryKey
  label: string
  /** Only sent by GET /event-categories */
  count?: number
}

export type EventTiming = 'upcoming' | 'ongoing' | 'past'

export interface EventLocation {
  name: string
  address: string | null
  mapUrl: string | null
  online: boolean
}

export interface PersonSummary {
  id: string
  slug: string
  fullName: string
  honorific: string | null
  type: 'teacher' | 'staff'
  position: string
  department: { slug: string; name: string } | null
  photo: Image | null
  profileUrl: string
}

/** GET /people: a row of the teachers directory */
export interface PersonListItem extends PersonSummary {
  expertise: string[]
}

export interface PersonListParams {
  page?: number
  pageSize?: number
  type?: 'teacher' | 'staff'
  /** Faculty slug, e.g. math-cs */
  faculty?: string
  q?: string
}

/** A degree the person holds, oldest first */
export interface PersonDegree {
  year: number
  title: string
  institution: string
}

export interface PersonExperience {
  from: number
  /** null while the position is current */
  to: number | null
  role: string
  place: string
}

export type PublicationKind = 'article' | 'conference' | 'book' | 'chapter'

export interface PersonPublication {
  /** Kept in the language it was published in */
  title: string
  /** Journal, conference or publisher */
  venue: string
  year: number
  kind: PublicationKind
  url: string | null
}

export interface PersonProject {
  title: string
  description: string
  from: number
  to: number | null
}

export type ResearchProfileKind = 'googleScholar' | 'researchGate' | 'orcid' | 'scopus' | 'website'

export interface ResearchProfile {
  kind: ResearchProfileKind
  url: string
}

/** GET /people/{slug} */
export interface PersonDetail extends PersonListItem {
  email: string | null
  bio: Block[]
  education: PersonDegree[]
  experience: PersonExperience[]
  /** Newest first */
  publications: PersonPublication[]
  projects: PersonProject[]
  researchProfiles: ResearchProfile[]
}

export type EventRole = 'organizer' | 'speaker' | 'moderator' | 'coordinator' | 'guest'

export interface EventPerson {
  role: EventRole
  roleLabel: string
  note: string | null
  person: PersonSummary
}

export type EventLinkKind = 'registration' | 'livestream' | 'program' | 'document' | 'external'

export interface EventLink {
  kind: EventLinkKind
  label: string
  url: string
  opensInNewTab: boolean
}

export interface EventSummary {
  id: string
  slug: string
  /** Public page of the event on the website, for sharing */
  url: string
  title: string
  summary: string
  category: EventCategory
  startDate: string
  endDate: string
  allDay: boolean
  timing: EventTiming
  location: EventLocation
  coverImage: Image
  photoCount: number
  isFeatured: boolean
}

// ── Rich text (section 3 of the docs) ─────────────────────────────

export type LinkTarget =
  | { kind: 'event' | 'person' | 'faculty' | 'page'; slug: string; href: string }
  | { kind: 'url'; href: string }

export type Inline =
  | { type: 'text'; text: string; marks?: ('bold' | 'italic')[] }
  | { type: 'link'; text: string; target: LinkTarget }

export type Block =
  | { type: 'paragraph'; children: Inline[] }
  | { type: 'heading'; level: 2 | 3; children: Inline[] }
  | { type: 'list'; ordered: boolean; items: Inline[][] }
  | { type: 'quote'; children: Inline[]; cite: string | null }

export interface EventOrganizer {
  kind: 'faculty' | 'department' | 'lab' | 'club' | 'service'
  slug: string
  name: string
}

export interface EventDetail extends EventSummary {
  /** The link the administrator attached to the event (form, website, document…) */
  mainLink: EventLink | null
  content: Block[]
  gallery: Image[]
  links: EventLink[]
  people: EventPerson[]
  organizers: EventOrganizer[]
  tags: string[]
  publishedAt: string
  updatedAt: string
  seo: { title: string; description: string; image: string }
}

export interface Paginated<T> {
  data: T[]
  meta: { page: number; pageSize: number; total: number; totalPages: number }
}

export interface EventListParams {
  page?: number
  pageSize?: number
  category?: EventCategoryKey
  timing?: EventTiming
  featured?: boolean
  q?: string
  person?: string
  organizer?: string
  /** e.g. 2026 */
  year?: number
  /** 1–12, used together with year */
  month?: number
  sort?: 'startDate' | '-startDate' | 'title' | '-publishedAt'
}

/** GET /event-filters: the options the All Events page can filter by, with counts */
export interface EventFilterOptions {
  categories: (EventCategory & { count: number })[]
  organizers: (EventOrganizer & { count: number })[]
  years: { year: number; count: number; months: { month: number; count: number }[] }[]
}
