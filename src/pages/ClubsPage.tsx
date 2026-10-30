import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, CalendarDays, Info, Trophy, Users } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'
import clsx from 'clsx'
import PageHeader from '@/components/PageHeader'
import { clubs, CLUBS_ARE_SAMPLES, type Club, type ClubField } from '@/data/clubs'

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1550305080-4e029753abcf?auto=format&fit=crop&w=1920&q=80'

// Fields that have at least one club, in the order they first appear
const fields = [...new Set(clubs.map((club) => club.field))]

export default function ClubsPage() {
  const { t } = useTranslation()
  const [field, setField] = useState<ClubField | null>(null)

  useEffect(() => {
    document.title = `${t('clubs.title')} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  const visible = field ? clubs.filter((club) => club.field === field) : clubs
  const totalMembers = clubs.reduce((sum, club) => sum + club.members, 0)

  return (
    <>
      <PageHeader
        image={HEADER_IMAGE}
        title={t('clubs.title')}
        eyebrow={
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            <Link to="/" className="transition hover:text-white">
              {t('brand.name')}
            </Link>
            <span>/</span>
            <span className="text-[#e8c27a]">{t('clubs.eyebrow')}</span>
          </nav>
        }
      >
        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">{t('clubs.intro')}</p>
        <div className="mt-8 flex flex-wrap gap-8 text-sm">
          <HeaderStat value={clubs.length} label={t('clubs.statClubs')} />
          <HeaderStat value={totalMembers} label={t('clubs.statMembers')} />
          <HeaderStat value={fields.length} label={t('clubs.statFields')} />
        </div>
      </PageHeader>

      <section className="bg-stone px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          {CLUBS_ARE_SAMPLES && (
            <p className="mb-8 flex items-start gap-3 border border-[#e8c27a] bg-[#e8c27a]/15 px-4 py-3 text-sm text-neutral-700">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#a87b2a]" />
              {t('clubs.sampleNotice')}
            </p>
          )}

          {/* Field filter: one swipeable row on phones */}
          <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <FilterChip active={field === null} onClick={() => setField(null)}>
              {t('clubs.all')} ({clubs.length})
            </FilterChip>
            {fields.map((id) => (
              <FilterChip key={id} active={field === id} onClick={() => setField(id)}>
                {t(`clubs.fields.${id}`)}
              </FilterChip>
            ))}
          </div>

          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((club) => (
              <li key={club.id} className="animate-fade-in">
                <ClubCard club={club} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function HeaderStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-serif text-4xl font-semibold">{value}</p>
      <p className="mt-1 text-xs tracking-[0.2em] text-white/60 uppercase">{label}</p>
    </div>
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

function ClubCard({ club }: { club: Club }) {
  const { t } = useTranslation()
  const text = (key: string) => t(`clubs.items.${club.id}.${key}`)

  return (
    <article className="group relative flex h-full flex-col bg-[#f7f7f5] focus-within:ring-2 focus-within:ring-crimson shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:bg-white">
      <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />

      {/* Event photo with its caption */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        <img
          src={club.image}
          alt={text('event')}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent" />
        <span className="absolute start-4 top-4 bg-neutral-950/70 px-2.5 py-1 text-xs font-semibold tracking-[0.15em] text-[#e8c27a] uppercase backdrop-blur-sm">
          {t(`clubs.fields.${club.field}`)}
        </span>
        <p className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-sm text-white/90">
          <CalendarDays className="h-4 w-4 shrink-0 text-[#e8c27a]" />
          <span className="line-clamp-1">{text('event')}</span>
        </p>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h2 className="font-serif text-2xl leading-snug font-semibold text-neutral-900">
          {/* The link covers the whole card; the social buttons sit above it */}
          <Link
            to={`/clubs/${club.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {text('name')}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text('description')}</p>

        {/* Best achievement */}
        <div className="mt-6 border-s-4 border-[#e8c27a] bg-neutral-900 px-4 py-4 text-white">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#e8c27a] uppercase">
            <Trophy className="h-4 w-4" />
            {t('clubs.bestAchievement')} · {club.achievementYear}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/85">{text('achievement')}</p>
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson">
          {t('clubs.viewProfile')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>

        <div className="flex-1" />

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-crimson" />
              {t('clubs.members', { count: club.members })}
            </span>
            <span>{t('clubs.since', { year: club.founded })}</span>
          </div>
          <div className="relative z-10 flex gap-1.5">
            {club.facebook && (
              <SocialLink href={club.facebook} label="Facebook">
                <FaFacebookF className="h-3.5 w-3.5" />
              </SocialLink>
            )}
            {club.instagram && (
              <SocialLink href={club.instagram} label="Instagram">
                <FaInstagram className="h-3.5 w-3.5" />
              </SocialLink>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target={href === '#' ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center border border-neutral-300 text-neutral-600 transition hover:border-crimson hover:bg-crimson hover:text-white"
    >
      {children}
    </a>
  )
}
