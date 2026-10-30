import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, CalendarCheck, FlaskConical, Globe, Users } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '@/components/PageHeader'
import { researchLabs, UNIVERSITY_WEBSITE, type ResearchLab } from '@/data/labs'

// Researcher at a lab bench (Unsplash, free licence); the labs have no photos of their own yet
const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1581093577421-f561a654a353?auto=format&fit=crop&w=1920&q=80'

// Faculties that have at least one lab, in the order they first appear
const facultyIds = [...new Set(researchLabs.map((lab) => lab.faculty))]

export default function ResearchLabsPage() {
  const { t } = useTranslation()
  const [faculty, setFaculty] = useState<string | null>(null)

  useEffect(() => {
    document.title = `${t('labs.title')} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  const labs = faculty ? researchLabs.filter((lab) => lab.faculty === faculty) : researchLabs

  return (
    <>
      <PageHeader
        image={HEADER_IMAGE}
        title={t('labs.title')}
        eyebrow={
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            <Link to="/" className="transition hover:text-white">
              {t('brand.name')}
            </Link>
            <span>/</span>
            <span className="text-[#e8c27a]">{t('labs.eyebrow')}</span>
          </nav>
        }
      >
        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
          {t('labs.intro', { count: researchLabs.length })}
        </p>
      </PageHeader>

      <section className="bg-stone px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          {/* Faculty filter */}
          <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <FilterChip active={faculty === null} onClick={() => setFaculty(null)}>
              {t('labs.all')} ({researchLabs.length})
            </FilterChip>
            {facultyIds.map((id) => (
              <FilterChip key={id} active={faculty === id} onClick={() => setFaculty(id)}>
                {t(`faculties.items.${id}.title`)}
              </FilterChip>
            ))}
          </div>

          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {labs.map((lab) => (
              <li key={lab.id} className="animate-fade-in">
                <LabCard lab={lab} />
              </li>
            ))}
          </ul>

          <p className="mt-12 text-sm text-neutral-500">
            {t('labs.source')}{' '}
            <a
              href={UNIVERSITY_WEBSITE}
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
          : 'border-neutral-300 bg-white/60 text-neutral-700 hover:border-neutral-900',
      )}
    >
      {children}
    </button>
  )
}

function LabCard({ lab }: { lab: ResearchLab }) {
  const { t } = useTranslation()
  const topics = t(`labs.items.${lab.id}.topics`, { returnObjects: true }) as string[]

  return (
    <article className="group relative flex h-full flex-col bg-[#f7f7f5] p-7 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:bg-white">
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />

      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-crimson/10 text-crimson">
          <FlaskConical className="h-6 w-6" />
        </span>
        <span className="bg-neutral-900 px-3 py-1.5 font-serif text-sm font-semibold tracking-wider text-[#e8c27a]">
          {lab.acronym}
        </span>
      </div>

      <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-crimson uppercase">
        {t(`faculties.items.${lab.faculty}.title`)}
      </p>
      <h2 className="mt-2 font-serif text-2xl leading-snug font-semibold text-neutral-900">
        {t(`labs.items.${lab.id}.name`)}
      </h2>

      <ul className="mt-5 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li
            key={topic}
            className="border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600"
          >
            {topic}
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-5 text-sm">
        <div className="flex items-center gap-2 text-neutral-600">
          <CalendarCheck className="h-4 w-4 text-crimson" />
          <dt className="sr-only">{t('labs.accredited')}</dt>
          <dd>{t('labs.since', { year: lab.accredited })}</dd>
        </div>
        <div className="flex items-center gap-2 text-neutral-600">
          <Users className="h-4 w-4 text-crimson" />
          <dt className="sr-only">{t('labs.teamsLabel')}</dt>
          <dd>{t('labs.teams', { count: lab.teams })}</dd>
        </div>
      </dl>

      <a
        href={lab.website ?? UNIVERSITY_WEBSITE}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition',
          lab.website
            ? 'bg-crimson text-white hover:bg-neutral-900'
            : 'border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900',
        )}
      >
        <Globe className="h-4 w-4" />
        {lab.website ? t('labs.website') : t('labs.universityPage')}
        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
      </a>
    </article>
  )
}
