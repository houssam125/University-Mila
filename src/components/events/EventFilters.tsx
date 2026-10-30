import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Search, X } from 'lucide-react'
import clsx from 'clsx'
import type { LanguageCode } from '@/i18n'
import type { EventCategoryKey, EventFilterOptions } from '@/api/types'

export interface EventFilterValues {
  q: string
  category?: EventCategoryKey
  organizer?: string
  year?: number
  month?: number
}

const SEARCH_DELAY_MS = 350
const MONTH_LOCALES: Record<LanguageCode, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-DZ' }

/** Search box, type buttons, and department / year / month menus for the All Events page */
export default function EventFilters({
  values,
  options,
  total,
  onChange,
}: {
  values: EventFilterValues
  options?: EventFilterOptions
  total?: number
  onChange: (changes: Partial<EventFilterValues>) => void
}) {
  const { t, i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? 'en') as LanguageCode

  // Typing updates the box at once; the search itself waits until typing pauses
  const [query, setQuery] = useState(values.q)
  // When the address changes from outside (back button, "Clear filters"), show its search text
  const [syncedQuery, setSyncedQuery] = useState(values.q)
  if (values.q !== syncedQuery) {
    setSyncedQuery(values.q)
    setQuery(values.q)
  }
  useEffect(() => {
    if (query === values.q) return
    const timer = setTimeout(() => onChange({ q: query }), SEARCH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [query, values.q, onChange])

  const monthName = (month: number) =>
    new Date(2026, month - 1, 1).toLocaleDateString(MONTH_LOCALES[language], { month: 'long' })

  const faculties = options?.organizers.filter((item) => item.kind === 'faculty') ?? []
  const universityWide = options?.organizers.filter((item) => item.kind !== 'faculty') ?? []
  const months = options?.years.find((item) => item.year === values.year)?.months ?? []
  const hasFilters = Boolean(values.q || values.category || values.organizer || values.year)

  return (
    <div className="space-y-5 border-b border-neutral-300 pb-6">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <label className="relative block">
          <span className="sr-only">{t('events.filters.search')}</span>
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('events.filters.search')}
            className="h-12 w-full border border-neutral-300 bg-white ps-11 pe-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
          />
        </label>

        <FilterSelect
          label={t('events.filters.organizer')}
          value={values.organizer ?? ''}
          onChange={(value) => onChange({ organizer: value || undefined })}
        >
          <option value="">{t('events.filters.allOrganizers')}</option>
          {universityWide.length > 0 && (
            <optgroup label={t('events.filters.universityGroup')}>
              {universityWide.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {`${item.name} (${item.count})`}
                </option>
              ))}
            </optgroup>
          )}
          {faculties.length > 0 && (
            <optgroup label={t('events.filters.facultiesGroup')}>
              {faculties.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {`${item.name} (${item.count})`}
                </option>
              ))}
            </optgroup>
          )}
        </FilterSelect>

        <FilterSelect
          label={t('events.filters.year')}
          value={values.year ? String(values.year) : ''}
          // A month only makes sense inside a year, so changing the year clears it
          onChange={(value) =>
            onChange({ year: value ? Number(value) : undefined, month: undefined })
          }
        >
          <option value="">{t('events.filters.allYears')}</option>
          {options?.years.map((item) => (
            <option key={item.year} value={item.year}>
              {`${item.year} (${item.count})`}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label={t('events.filters.month')}
          value={values.month ? String(values.month) : ''}
          disabled={!values.year}
          onChange={(value) => onChange({ month: value ? Number(value) : undefined })}
        >
          <option value="">
            {values.year ? t('events.filters.allMonths') : t('events.filters.pickYearFirst')}
          </option>
          {months.map((item) => (
            <option key={item.month} value={item.month}>
              {`${monthName(item.month)} (${item.count})`}
            </option>
          ))}
        </FilterSelect>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('events.filters.type')}>
          <TypeButton isActive={!values.category} onClick={() => onChange({ category: undefined })}>
            {t('events.all')}
          </TypeButton>
          {options?.categories.map((item) => (
            <TypeButton
              key={item.key}
              isActive={values.category === item.key}
              onClick={() => onChange({ category: item.key })}
            >
              {`${item.label} (${item.count})`}
            </TypeButton>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {total !== undefined && (
            <p className="text-sm font-medium text-neutral-500" aria-live="polite">
              {t('events.count', { count: total })}
            </p>
          )}
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                onChange({
                  q: '',
                  category: undefined,
                  organizer: undefined,
                  year: undefined,
                  month: undefined,
                })
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson hover:underline"
            >
              <X className="h-4 w-4" />
              {t('events.filters.clear')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  disabled = false,
  onChange,
  children,
}: {
  label: string
  value: string
  disabled?: boolean
  onChange: (value: string) => void
  children: ReactNode
}) {
  return (
    <label className="relative block">
      <span className="absolute start-4 top-1.5 text-[10px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={clsx(
          'h-12 w-full appearance-none border bg-white ps-4 pe-10 pt-4 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
          value ? 'border-neutral-900' : 'border-neutral-300',
        )}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
    </label>
  )
}

function TypeButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={clsx(
        'px-4 py-2 text-sm font-semibold transition-colors duration-300',
        isActive
          ? 'bg-neutral-900 text-white'
          : 'bg-[#f7f7f5] text-neutral-600 hover:bg-white hover:text-neutral-900',
      )}
    >
      {children}
    </button>
  )
}
