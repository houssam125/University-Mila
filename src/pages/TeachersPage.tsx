import { useEffect, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Building2, Info, Search, X } from 'lucide-react'
import clsx from 'clsx'
import { usePeople } from '@/api/events'
import type { PersonListItem } from '@/api/types'
import LoadError from '@/components/LoadError'
import PageHeader from '@/components/PageHeader'

// Professor writing formulas on a chalkboard (Unsplash, free licence)
const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1758685734343-491353d96a81?auto=format&fit=crop&w=1920&q=80'

// API faculty slugs → ids of the faculty names in src/i18n/locales/*.json
const FACULTIES: { slug: string; id: string }[] = [
  { slug: 'economics', id: 'economics' },
  { slug: 'foreign-languages', id: 'foreignLanguages' },
  { slug: 'arabic', id: 'arabic' },
  { slug: 'nature-life', id: 'natureLife' },
  { slug: 'technical', id: 'technical' },
  { slug: 'math-cs', id: 'mathCs' },
  { slug: 'law', id: 'law' },
]

export default function TeachersPage() {
  const { t } = useTranslation()
  // Filters live in the address bar, so a filtered list can be shared
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const faculty = params.get('faculty') ?? ''
  const { data, isPending, isError, refetch } = usePeople({
    type: 'teacher',
    faculty: faculty || undefined,
    q: q || undefined,
    pageSize: 48,
  })

  useEffect(() => {
    document.title = `${t('teachers.title')} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  const setFilter = (key: string, value: string) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )

  return (
    <>
      <PageHeader
        image={HEADER_IMAGE}
        title={t('teachers.title')}
        eyebrow={
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            <Link to="/" className="transition hover:text-white">
              {t('brand.name')}
            </Link>
            <span>/</span>
            <span className="text-[#e8c27a]">{t('teachers.eyebrow')}</span>
          </nav>
        }
      >
        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">{t('teachers.intro')}</p>
      </PageHeader>

      <section className="bg-stone px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-8 flex items-start gap-3 border border-[#e8c27a] bg-[#e8c27a]/15 px-4 py-3 text-sm text-neutral-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#a87b2a]" />
            {t('teachers.sampleNotice')}
          </p>

          {/* Search and faculty filter */}
          <div className="bg-[#f7f7f5] p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:p-6">
            <label className="relative block">
              <span className="sr-only">{t('teachers.searchLabel')}</span>
              <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={q}
                onChange={(event) => setFilter('q', event.target.value)}
                placeholder={t('teachers.searchPlaceholder')}
                className="h-12 w-full border border-neutral-300 bg-white ps-11 pe-4 text-sm text-neutral-900 transition outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              />
            </label>
            <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto border-t border-neutral-200 px-4 pt-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <FilterChip active={!faculty} onClick={() => setFilter('faculty', '')}>
                {t('teachers.allFaculties')}
              </FilterChip>
              {FACULTIES.map((item) => (
                <FilterChip
                  key={item.slug}
                  active={faculty === item.slug}
                  onClick={() => setFilter('faculty', item.slug)}
                >
                  {t(`faculties.items.${item.id}.title`)}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-neutral-500" aria-live="polite">
              {data && t('teachers.results', { count: data.meta.total })}
            </p>
            {(q || faculty) && (
              <button
                type="button"
                onClick={() => setParams({}, { replace: true })}
                className="flex items-center gap-1.5 text-sm font-semibold text-crimson hover:underline"
              >
                <X className="h-4 w-4" />
                {t('teachers.clear')}
              </button>
            )}
          </div>

          {isError && <LoadError onRetry={() => refetch()} />}

          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {isPending &&
              Array.from({ length: 6 }, (_, index) => (
                <li key={index} className="h-72 animate-pulse bg-neutral-200" />
              ))}
            {data?.data.map((person) => (
              <li key={person.slug} className="animate-fade-in">
                <TeacherCard person={person} />
              </li>
            ))}
          </ul>

          {data?.data.length === 0 && (
            <div className="border-2 border-dashed border-neutral-300 px-6 py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-neutral-400" />
              <p className="mt-4 font-serif text-xl font-semibold text-neutral-900">
                {t('teachers.emptyTitle')}
              </p>
              <p className="mt-2 text-sm text-neutral-600">{t('teachers.emptyText')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'shrink-0 border px-4 py-2 text-sm font-medium whitespace-nowrap transition',
        active
          ? 'border-neutral-900 bg-neutral-900 text-white'
          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900',
      )}
    >
      {children}
    </button>
  )
}

function TeacherCard({ person }: { person: PersonListItem }) {
  const { t } = useTranslation()
  const name = person.honorific ? `${person.honorific} ${person.fullName}` : person.fullName

  return (
    <article className="group relative flex h-full flex-col bg-[#f7f7f5] p-7 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition focus-within:ring-2 focus-within:ring-crimson hover:-translate-y-1 hover:bg-white">
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />

      <div className="flex items-start gap-5">
        <Portrait person={person} />
        <div className="min-w-0 pt-1">
          <h2 className="font-serif text-xl leading-snug font-semibold text-neutral-900">
            {/* The link covers the whole card */}
            <Link
              to={`/people/${person.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {name}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-crimson">{person.position}</p>
        </div>
      </div>

      {person.department && (
        <p className="mt-5 flex items-center gap-2 text-sm text-neutral-600">
          <Building2 className="h-4 w-4 shrink-0 text-neutral-400" />
          {person.department.name}
        </p>
      )}

      <ul className="mt-4 flex flex-wrap gap-2">
        {person.expertise.slice(0, 3).map((item) => (
          <li
            key={item}
            className="border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <span className="mt-6 inline-flex items-center gap-1.5 border-t border-neutral-200 pt-5 text-sm font-semibold text-crimson">
        {t('teachers.viewProfile')}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </span>
    </article>
  )
}

/** Photo with a gold corner, or initials when there is no photo yet */
function Portrait({ person }: { person: PersonListItem }) {
  const initials = person.fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <div className="relative h-24 w-20 shrink-0">
      {person.photo ? (
        <img
          src={`${person.photo.url}?tr=w-200`}
          alt={person.photo.alt}
          loading="lazy"
          className="h-full w-full object-cover object-top grayscale-[30%] transition group-hover:grayscale-0"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-neutral-900 font-serif text-3xl font-semibold text-[#e8c27a]">
          {initials}
        </span>
      )}
      <span className="absolute -end-1.5 -bottom-1.5 h-4 w-4 border-e-2 border-b-2 border-[#e8c27a]" />
    </div>
  )
}
