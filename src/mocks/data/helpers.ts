import type { LanguageCode } from '@/i18n'
import type { EventCategoryKey, EventLinkKind, EventOrganizer, EventRole } from '@/api/types'

// Records here use the admin shape from docs/api/events.md (all languages at once);
// src/mocks/eventsApi.ts turns them into public responses for one language.

export type Localized<T> = Record<LanguageCode, T>

export interface MockImage {
  id: string
  file: string
  alt: Localized<string>
  caption?: Localized<string>
  width: number
  height: number
}

// Rich text as the admin sends it: internal links have a slug, the server adds href
export type MockTarget =
  { kind: 'event' | 'person' | 'faculty' | 'page'; slug: string } | { kind: 'url'; href: string }

export type MockInline =
  | { type: 'text'; text: string; marks?: ('bold' | 'italic')[] }
  | { type: 'link'; text: string; target: MockTarget }

export type MockBlock =
  | { type: 'paragraph'; children: MockInline[] }
  | { type: 'heading'; level: 2 | 3; children: MockInline[] }
  | { type: 'list'; ordered: boolean; items: MockInline[][] }
  | { type: 'quote'; children: MockInline[]; cite: string | null }

export interface MockPerson {
  id: string
  slug: string
  fullName: Localized<string>
  honorific: Localized<string> | null
  type: 'teacher' | 'staff'
  position: Localized<string>
  department: { slug: string; name: Localized<string> } | null
  photo: MockImage | null
  email: string | null
  expertise: Localized<string[]>
  bio: Localized<MockBlock[]>
}

export interface MockEvent {
  id: string
  slug: string
  category: EventCategoryKey
  startDate: string
  endDate: string
  allDay: boolean
  isFeatured: boolean
  publishedAt: string
  updatedAt: string
  title: Localized<string>
  summary: Localized<string>
  content: Localized<MockBlock[]>
  location: {
    name: Localized<string>
    address: Localized<string> | null
    mapUrl: string | null
    online: boolean
  }
  gallery: MockImage[]
  /** The link the administrator attaches to the event; opens another page */
  mainLink: { kind: EventLinkKind; label: Localized<string>; url: string } | null
  links: { kind: EventLinkKind; label: Localized<string>; url: string }[]
  people: { personSlug: string; role: EventRole; note?: Localized<string> }[]
  organizers: { kind: EventOrganizer['kind']; slug: string }[]
  tags: Localized<string[]>
}

// ── Small builders so the sample texts stay readable ──────────────

type InlineInput = string | MockInline

const toInlines = (children: InlineInput[]): MockInline[] =>
  children.map((child) => (typeof child === 'string' ? { type: 'text', text: child } : child))

export const p = (...children: InlineInput[]): MockBlock => ({
  type: 'paragraph',
  children: toInlines(children),
})

export const h2 = (text: string): MockBlock => ({
  type: 'heading',
  level: 2,
  children: [{ type: 'text', text }],
})

export const ul = (...items: InlineInput[][]): MockBlock => ({
  type: 'list',
  ordered: false,
  items: items.map(toInlines),
})

export const quote = (cite: string | null, ...children: InlineInput[]): MockBlock => ({
  type: 'quote',
  cite,
  children: toInlines(children),
})

export const bold = (text: string): MockInline => ({ type: 'text', text, marks: ['bold'] })

export const link = (text: string, target: MockTarget): MockInline => ({
  type: 'link',
  text,
  target,
})

export const toEvent = (slug: string): MockTarget => ({ kind: 'event', slug })
export const toPerson = (slug: string): MockTarget => ({ kind: 'person', slug })
export const toFaculty = (slug: string): MockTarget => ({ kind: 'faculty', slug })
export const toPage = (slug: string): MockTarget => ({ kind: 'page', slug })
export const toUrl = (href: string): MockTarget => ({ kind: 'url', href })

const IMAGE_BASE = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/'

export const image = (
  id: string,
  file: string,
  size: [number, number],
  alt: Localized<string>,
  caption?: Localized<string>,
): MockImage => ({
  id,
  file: `${IMAGE_BASE}${file}`,
  width: size[0],
  height: size[1],
  alt,
  caption,
})
