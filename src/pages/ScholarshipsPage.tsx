import { useEffect, useMemo, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  Globe2,
  GraduationCap,
  Search,
  X,
} from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '@/components/PageHeader'
import {
  scholarships,
  scholarshipStatus,
  type Scholarship,
  type ScholarshipStatus,
} from '@/data/scholarships'

const HEADER_IMAGE = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/et.jpeg?tr=w-1600'
const SOURCE_URL = 'https://www.univ-mila.dz/?cat=251'
const STATUSES: (ScholarshipStatus | 'all')[] = ['all', 'open', 'upcoming', 'closed']

const years = [...new Set(scholarships.map((item) => item.published.slice(0, 4)))].sort().reverse()

export default function ScholarshipsPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'en'
  // Filters live in the address bar, so a filtered list can be shared
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const status = (params.get('status') ?? 'all') as ScholarshipStatus | 'all'
  const year = params.get('year') ?? ''
  const month = params.get('month') ?? ''

  useEffect(() => {
    document.title = `${t('scholarships.title')} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  const setFilter = (key: string, value: string) => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (value && value !== 'all') next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  const countryName = useMemo(() => {
    const names = new Intl.DisplayNames([lang], { type: 'region' })
    return (code?: string) => (code ? (names.of(code) ?? code) : t('scholarships.international'))
  }, [lang, t])

  const monthNames = useMemo(() => {
    const format = new Intl.DateTimeFormat(lang, { month: 'long' })
    return Array.from({ length: 12 }, (_, index) => format.format(new Date(2024, index, 1)))
  }, [lang])

  // Status of every offer, worked out once per visit
  const withStatus = useMemo(
    () => scholarships.map((item) => ({ item, status: scholarshipStatus(item) })),
    [],
  )

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: withStatus.length }
    for (const { status: s } of withStatus) result[s] = (result[s] ?? 0) + 1
    return result
  }, [withStatus])

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang)
    return withStatus.filter(({ item, status: s }) => {
      if (status !== 'all' && s !== status) return false
      if (year && !item.published.startsWith(year)) return false
      if (month && Number(item.published.slice(5, 7)) !== Number(month)) return false
      if (!needle) return true
      const haystack = [
        t(`scholarships.items.${item.id}.title`),
        t(`scholarships.items.${item.id}.summary`),
        countryName(item.country),
        ...(item.levels ?? []).map((level) => t(`scholarships.levels.${level}`)),
      ]
        .join(' ')
        .toLocaleLowerCase(lang)
      return haystack.includes(needle)
    })
  }, [withStatus, status, year, month, query, lang, t, countryName])

  const hasFilters = Boolean(query || status !== 'all' || year || month)

  return (
    <>
      <PageHeader
        image={HEADER_IMAGE}
        title={t('scholarships.title')}
        eyebrow={
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            <Link to="/" className="transition hover:text-white">
              {t('brand.name')}
            </Link>
            <span>/</span>
            <span className="text-[#e8c27a]">{t('scholarships.eyebrow')}</span>
          </nav>
        }
      >
        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">{t('scholarships.intro')}</p>
        <div className="mt-8 flex flex-wrap gap-8 text-sm">
          <HeaderStat value={counts.open ?? 0} label={t('scholarships.status.open')} accent />
          <HeaderStat value={counts.closed ?? 0} label={t('scholarships.status.closed')} />
          <HeaderStat value={years.length} label={t('scholarships.yearsCovered')} />
        </div>
      </PageHeader>

      <section className="bg-stone px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          {/* Search and filters */}
          <div className="bg-[#f7f7f5] p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:p-6">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <label className="relative block">
                <span className="sr-only">{t('scholarships.searchLabel')}</span>
                <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setFilter('q', event.target.value)}
                  placeholder={t('scholarships.searchPlaceholder')}
                  className="h-12 w-full border border-neutral-300 bg-white ps-11 pe-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
                />
              </label>
              <Select
                label={t('scholarships.year')}
                value={year}
                onChange={(value) => setFilter('year', value)}
                options={years.map((value) => ({ value, label: value }))}
                allLabel={t('scholarships.allYears')}
              />
              <Select
                label={t('scholarships.month')}
                value={month}
                onChange={(value) => setFilter('month', value)}
                options={monthNames.map((label, index) => ({ value: String(index + 1), label }))}
                allLabel={t('scholarships.allMonths')}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4">
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {STATUSES.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter('status', value)}
                    aria-pressed={status === value}
                    className={clsx(
                      'flex shrink-0 items-center gap-2 border px-4 py-2 text-sm font-medium whitespace-nowrap transition',
                      status === value
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900',
                    )}
                  >
                    {value !== 'all' && <StatusDot status={value} />}
                    {t(`scholarships.status.${value}`)}
                    <span className={status === value ? 'text-white/60' : 'text-neutral-400'}>
                      {counts[value] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => setParams({}, { replace: true })}
                  className="flex items-center gap-1.5 text-sm font-semibold text-crimson hover:underline"
                >
                  <X className="h-4 w-4" />
                  {t('scholarships.clear')}
                </button>
              )}
            </div>
          </div>

          <p className="mt-8 mb-5 text-sm text-neutral-500" aria-live="polite">
            {t('scholarships.results', { count: results.length })}
          </p>

          {results.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map(({ item, status: s }) => (
                <li key={item.id} className="animate-fade-in">
                  <ScholarshipCard
                    item={item}
                    status={s}
                    country={countryName(item.country)}
                    lang={lang}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 px-6 py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-neutral-400" />
              <p className="mt-4 font-serif text-xl font-semibold text-neutral-900">
                {t('scholarships.emptyTitle')}
              </p>
              <p className="mt-2 text-sm text-neutral-600">{t('scholarships.emptyText')}</p>
            </div>
          )}

          <p className="mt-12 text-sm text-neutral-500">
            {t('scholarships.source')}{' '}
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-crimson underline-offset-4 hover:underline"
            >
              univ-mila.dz
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

function HeaderStat({ value, label, accent }: { value: number; label: string; accent?: boolean }) {
  return (
    <div>
      <p className={clsx('font-serif text-4xl font-semibold', accent && 'text-[#e8c27a]')}>
        {value}
      </p>
      <p className="mt-1 text-xs tracking-[0.2em] text-white/60 uppercase">{label}</p>
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  allLabel: string
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 md:w-44"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

const statusStyles: Record<ScholarshipStatus, { dot: string; badge: string }> = {
  open: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
  upcoming: { dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-800 ring-amber-200' },
  closed: { dot: 'bg-neutral-400', badge: 'bg-neutral-100 text-neutral-600 ring-neutral-200' },
}

function StatusDot({ status }: { status: ScholarshipStatus }) {
  return (
    <span className="relative flex h-2 w-2">
      {status === 'open' && (
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
      )}
      <span className={clsx('relative h-2 w-2 rounded-full', statusStyles[status].dot)} />
    </span>
  )
}

function ScholarshipCard({
  item,
  status,
  country,
  lang,
}: {
  item: Scholarship
  status: ScholarshipStatus
  country: string
  lang: string
}) {
  const { t } = useTranslation()
  const date = (value: string) =>
    new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(value),
    )
  const closed = status === 'closed'

  return (
    <article
      className={clsx(
        'group relative flex h-full flex-col p-7 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition hover:-translate-y-1',
        closed ? 'bg-[#f1f0ec] hover:bg-[#f7f7f5]' : 'bg-[#f7f7f5] hover:bg-white',
      )}
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />

      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-crimson uppercase">
          <Globe2 className="h-4 w-4" />
          {country}
        </span>
        <span
          className={clsx(
            'flex items-center gap-2 px-2.5 py-1 text-xs font-semibold ring-1',
            statusStyles[status].badge,
          )}
        >
          <StatusDot status={status} />
          {t(`scholarships.status.${status}`)}
        </span>
      </div>

      <h2
        className={clsx(
          'mt-4 font-serif text-2xl leading-snug font-semibold',
          closed ? 'text-neutral-600' : 'text-neutral-900',
        )}
      >
        {t(`scholarships.items.${item.id}.title`)}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        {t(`scholarships.items.${item.id}.summary`)}
      </p>

      {item.levels && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.levels.map((level) => (
            <li
              key={level}
              className="flex items-center gap-1.5 border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600"
            >
              <GraduationCap className="h-3.5 w-3.5 text-neutral-400" />
              {t(`scholarships.levels.${level}`)}
            </li>
          ))}
        </ul>
      )}

      <div className="flex-1" />

      <dl className="mt-6 space-y-2 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
        <DateRow icon={<CalendarDays className="h-4 w-4 text-crimson" />}>
          <dt>{t('scholarships.published')}</dt>
          <dd className="font-medium text-neutral-900">{date(item.published)}</dd>
        </DateRow>
        <DateRow icon={<CalendarClock className="h-4 w-4 text-crimson" />}>
          <dt>{t('scholarships.deadline')}</dt>
          <dd className="font-medium text-neutral-900">
            {item.ongoing
              ? t('scholarships.allYear')
              : item.deadline
                ? date(item.deadline)
                : t('scholarships.seeAnnouncement')}
          </dd>
        </DateRow>
      </dl>

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition',
          closed
            ? 'border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
            : 'bg-crimson text-white hover:bg-neutral-900',
        )}
      >
        {closed ? t('scholarships.viewArchive') : t('scholarships.apply')}
        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
      </a>
    </article>
  )
}

function DateRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 [&>dt]:me-auto">
      {icon}
      {children}
    </div>
  )
}
