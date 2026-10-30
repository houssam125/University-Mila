import { useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { useEventFilters, useEvents } from '@/api/events'
import type { EventCategoryKey } from '@/api/types'
import EventCard, { EventCardSkeleton } from '@/components/events/EventCard'
import EventFilters, { type EventFilterValues } from '@/components/events/EventFilters'
import LoadError from '@/components/LoadError'
import PageHeader from '@/components/PageHeader'

const HEADER_IMAGE = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/et.jpeg'
const PAGE_SIZE = 9

export default function EventsPage() {
  const { t } = useTranslation()
  // Filters live in the address (e.g. /events?organizer=economics&year=2026) so they can be shared
  const [searchParams, setSearchParams] = useSearchParams()
  const numberParam = (key: string) => Number(searchParams.get(key)) || undefined
  const filters: EventFilterValues = {
    q: searchParams.get('q') ?? '',
    category: (searchParams.get('category') as EventCategoryKey | null) ?? undefined,
    organizer: searchParams.get('organizer') ?? undefined,
    year: numberParam('year'),
    month: numberParam('year') ? numberParam('month') : undefined,
  }
  const page = Math.max(1, numberParam('page') ?? 1)

  const filterOptions = useEventFilters()
  const events = useEvents({
    q: filters.q || undefined,
    category: filters.category,
    organizer: filters.organizer,
    year: filters.year,
    month: filters.month,
    page,
    pageSize: PAGE_SIZE,
  })

  // Any filter change goes back to page 1; typing in search replaces the history entry
  const updateFilters = useCallback(
    (changes: Partial<EventFilterValues> & { page?: number }) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)
          for (const [key, value] of Object.entries(changes)) {
            if (value === undefined || value === '' || (key === 'page' && value === 1))
              next.delete(key)
            else next.set(key, String(value))
          }
          if (!('page' in changes)) next.delete('page')
          return next
        },
        { replace: 'q' in changes },
      )
      if ('page' in changes) window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [setSearchParams],
  )

  const meta = events.data?.meta

  return (
    <>
      <PageHeader
        image={HEADER_IMAGE}
        title={t('events.pageTitle')}
        eyebrow={
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            <Link to="/" className="transition hover:text-white">
              {t('brand.name')}
            </Link>
            <span>/</span>
            <span className="text-[#e8c27a]">{t('events.label')}</span>
          </nav>
        }
      >
        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">{t('events.pageIntro')}</p>
      </PageHeader>

      <section className="bg-stone px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <EventFilters
            values={filters}
            options={filterOptions.data}
            total={meta?.total}
            onChange={updateFilters}
          />

          {events.isError && <LoadError onRetry={() => events.refetch()} className="mt-10" />}

          <ul
            className={clsx(
              'mt-10 grid gap-6 transition-opacity md:grid-cols-2 xl:grid-cols-3',
              events.isPlaceholderData && 'opacity-60',
            )}
          >
            {events.isPending &&
              Array.from({ length: PAGE_SIZE }, (_, index) => (
                <li key={index}>
                  <EventCardSkeleton />
                </li>
              ))}
            {events.data?.data.map((event) => (
              <li key={event.slug} className="animate-fade-up">
                <EventCard event={event} />
              </li>
            ))}
          </ul>

          {events.data && events.data.data.length === 0 && (
            <p className="mt-16 text-center text-neutral-500">{t('events.empty')}</p>
          )}

          {meta && meta.totalPages > 1 && (
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              onChange={(nextPage) => updateFilters({ page: nextPage })}
            />
          )}
        </div>
      </section>
    </>
  )
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  const { t } = useTranslation()
  const arrowClass =
    'flex h-10 w-10 items-center justify-center bg-[#f7f7f5] text-neutral-700 transition hover:bg-white disabled:opacity-40'

  return (
    <nav
      aria-label={t('events.pagination')}
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={t('events.previousPage')}
        className={arrowClass}
      >
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          aria-current={number === page ? 'page' : undefined}
          className={clsx(
            'h-10 min-w-10 px-3 text-sm font-semibold tabular-nums transition',
            number === page
              ? 'bg-neutral-900 text-white'
              : 'bg-[#f7f7f5] text-neutral-700 hover:bg-white',
          )}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={t('events.nextPage')}
        className={arrowClass}
      >
        <ChevronRight className="h-4 w-4 rtl:rotate-180" />
      </button>
    </nav>
  )
}
