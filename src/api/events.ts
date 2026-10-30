import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { LanguageCode } from '@/i18n'
import { api, ApiError, USE_MOCK_API } from '@/lib/api'
import type {
  EventCategory,
  EventDetail,
  EventFilterOptions,
  EventListParams,
  EventSummary,
  Paginated,
  PersonDetail,
} from './types'

// The mock is loaded only in mock mode, so it never ships with the real build
const mock = () => import('@/mocks/eventsApi')

// ── Requests (one per endpoint in docs/api/events.md) ──────────────

export async function fetchTopEvents(lang: LanguageCode, limit = 6): Promise<EventSummary[]> {
  if (USE_MOCK_API) return (await mock()).getTopEvents(lang, limit)
  const { data } = await api.get<{ data: EventSummary[] }>('/events/top', {
    params: { lang, limit },
  })
  return data.data
}

export async function fetchEvents(
  lang: LanguageCode,
  params: EventListParams = {},
): Promise<Paginated<EventSummary>> {
  if (USE_MOCK_API) return (await mock()).listEvents(lang, params)
  const { data } = await api.get<Paginated<EventSummary>>('/events', {
    params: { lang, ...params },
  })
  return data
}

export async function fetchEvent(lang: LanguageCode, slug: string): Promise<EventDetail> {
  if (USE_MOCK_API) return (await mock()).getEvent(lang, slug)
  const { data } = await api.get<{ data: EventDetail }>(`/events/${encodeURIComponent(slug)}`, {
    params: { lang },
  })
  return data.data
}

export async function fetchRelatedEvents(
  lang: LanguageCode,
  slug: string,
  limit = 3,
): Promise<EventSummary[]> {
  if (USE_MOCK_API) return (await mock()).getRelatedEvents(lang, slug, limit)
  const { data } = await api.get<{ data: EventSummary[] }>(
    `/events/${encodeURIComponent(slug)}/related`,
    { params: { lang, limit } },
  )
  return data.data
}

export async function fetchEventCategories(lang: LanguageCode): Promise<EventCategory[]> {
  if (USE_MOCK_API) return (await mock()).listEventCategories(lang)
  const { data } = await api.get<{ data: EventCategory[] }>('/event-categories', {
    params: { lang },
  })
  return data.data
}

export async function fetchPerson(lang: LanguageCode, slug: string): Promise<PersonDetail> {
  if (USE_MOCK_API) return (await mock()).getPerson(lang, slug)
  const { data } = await api.get<{ data: PersonDetail }>(`/people/${encodeURIComponent(slug)}`, {
    params: { lang },
  })
  return data.data
}

export async function fetchEventFilters(lang: LanguageCode): Promise<EventFilterOptions> {
  if (USE_MOCK_API) return (await mock()).getEventFilters(lang)
  const { data } = await api.get<{ data: EventFilterOptions }>('/event-filters', {
    params: { lang },
  })
  return data.data
}

// ── React Query hooks: the current website language is sent as `lang` ──

function useLanguage() {
  const { i18n } = useTranslation()
  return (i18n.resolvedLanguage ?? 'en') as LanguageCode
}

export function useTopEvents(limit = 6) {
  const lang = useLanguage()
  return useQuery({
    queryKey: ['events', 'top', lang, limit],
    queryFn: () => fetchTopEvents(lang, limit),
  })
}

export function useEvents(params: EventListParams) {
  const lang = useLanguage()
  return useQuery({
    queryKey: ['events', 'list', lang, params],
    queryFn: () => fetchEvents(lang, params),
    // Keep showing the current page while the next filter or page loads
    placeholderData: keepPreviousData,
  })
}

export function useEvent(slug: string) {
  const lang = useLanguage()
  return useQuery({
    queryKey: ['events', 'detail', lang, slug],
    queryFn: () => fetchEvent(lang, slug),
    // A missing event won't appear by retrying
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status === 404) && failureCount < 2,
  })
}

export function useRelatedEvents(slug: string, limit = 3) {
  const lang = useLanguage()
  return useQuery({
    queryKey: ['events', 'related', lang, slug, limit],
    queryFn: () => fetchRelatedEvents(lang, slug, limit),
  })
}

export function useEventCategories() {
  const lang = useLanguage()
  return useQuery({
    queryKey: ['events', 'categories', lang],
    queryFn: () => fetchEventCategories(lang),
  })
}

export function usePerson(slug: string) {
  const lang = useLanguage()
  return useQuery({
    queryKey: ['people', 'detail', lang, slug],
    queryFn: () => fetchPerson(lang, slug),
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status === 404) && failureCount < 2,
  })
}

export function useEventFilters() {
  const lang = useLanguage()
  return useQuery({
    queryKey: ['events', 'filters', lang],
    queryFn: () => fetchEventFilters(lang),
  })
}
