import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Building2, GraduationCap, Mail, Sparkles, UserRound } from 'lucide-react'
import { useEvents, usePerson } from '@/api/events'
import type { PersonDetail } from '@/api/types'
import EventCard, { EventCardSkeleton } from '@/components/events/EventCard'
import RichText from '@/components/events/RichText'
import LoadError from '@/components/LoadError'
import { ApiError } from '@/lib/api'
import NotFound from '@/pages/NotFound'

const HEADER_IMAGE = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/et.jpeg?tr=w-1600'

export default function PersonPage() {
  const { slug = '' } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: person, error, isPending, refetch } = usePerson(slug)
  const events = useEvents({ person: slug, pageSize: 12 })

  // The tab title follows the person while the page is open
  useEffect(() => {
    if (!person) return
    document.title = `${displayName(person)} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [person, t])

  if (error instanceof ApiError && error.status === 404) return <NotFound />

  if (isPending) {
    return <div className="h-[420px] animate-pulse bg-neutral-800" />
  }

  if (!person) {
    return (
      <div className="bg-stone px-4 pt-36 pb-20">
        <LoadError onRetry={() => refetch()} className="mx-auto max-w-xl" />
      </div>
    )
  }

  return (
    <>
      {/* Header: same dark grid style as the other inner pages */}
      <header className="relative overflow-hidden bg-neutral-950 px-4 pt-32 pb-14 text-white sm:px-6 lg:pt-40 lg:pb-16">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${HEADER_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute -start-20 -top-20 h-72 w-72 rounded-full bg-[#e8c27a]/15 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px] animate-fade-up">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
            {t('people.back')}
          </button>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end">
            <ProfilePhoto person={person} />
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] uppercase">
                {person.type === 'teacher' ? (
                  <GraduationCap className="h-3.5 w-3.5" />
                ) : (
                  <UserRound className="h-3.5 w-3.5" />
                )}
                {person.type === 'teacher' ? t('events.teacher') : t('events.staff')}
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
                {displayName(person)}
              </h1>
              <p className="mt-2 text-lg text-[#e8c27a]">{person.position}</p>
              {person.department && (
                <p className="mt-1 flex items-center gap-2 text-white/70">
                  <Building2 className="h-4 w-4" />
                  {person.department.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="bg-stone px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          <article className="bg-[#f7f7f5] px-6 py-8 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:px-10 sm:py-10">
            <h2 className="font-serif text-2xl font-semibold text-neutral-900">
              {t('people.about')}
            </h2>
            <div className="mt-5">
              <RichText blocks={person.bio} />
            </div>
          </article>

          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            {person.expertise.length > 0 && (
              <div className="bg-neutral-900 p-6 text-white">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                  <Sparkles className="h-4 w-4 text-[#e8c27a]" />
                  {t('people.expertise')}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {person.expertise.map((item) => (
                    <li key={item} className="border border-white/15 px-3 py-1.5 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {person.email && (
              <div className="bg-[#f7f7f5] p-6 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.3)]">
                <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
                  {t('people.contact')}
                </p>
                <p className="mt-2 text-sm break-all text-neutral-700" dir="ltr">
                  {person.email}
                </p>
                <a
                  href={`mailto:${person.email}`}
                  className="mt-4 flex items-center justify-center gap-2 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson"
                >
                  <Mail className="h-4 w-4" />
                  {t('people.sendEmail')}
                </a>
              </div>
            )}
          </aside>
        </div>

        {/* Events this person took part in (GET /events?person=slug) */}
        <div className="mx-auto mt-16 max-w-[1500px] border-t border-neutral-300 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-semibold text-neutral-900">
              {t('people.events')}
            </h2>
            <Link
              to="/events"
              className="text-sm font-semibold text-neutral-700 underline-offset-4 hover:underline"
            >
              {t('events.viewAll')}
            </Link>
          </div>

          {events.isError && <LoadError onRetry={() => events.refetch()} className="mt-8" />}
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.isPending &&
              Array.from({ length: 3 }, (_, index) => (
                <li key={index}>
                  <EventCardSkeleton />
                </li>
              ))}
            {events.data?.data.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
          {events.data?.data.length === 0 && (
            <p className="mt-8 text-neutral-500">{t('people.noEvents')}</p>
          )}
        </div>
      </section>
    </>
  )
}

const displayName = (person: PersonDetail) =>
  person.honorific ? `${person.honorific} ${person.fullName}` : person.fullName

/** Photo with gold corner brackets, or large initials when there is no photo */
function ProfilePhoto({ person }: { person: PersonDetail }) {
  const initials = person.fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <div className="relative h-40 w-36 shrink-0">
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 border border-white/20 rtl:-translate-x-2.5" />
      {person.photo ? (
        <img
          src={`${person.photo.url}?tr=w-300`}
          alt={person.photo.alt}
          className="relative h-full w-full object-cover object-top"
        />
      ) : (
        <span className="relative flex h-full w-full items-center justify-center bg-neutral-900 font-serif text-5xl font-semibold text-[#e8c27a]">
          {initials}
        </span>
      )}
      <span className="absolute -start-2 -top-2 h-5 w-5 border-s-2 border-t-2 border-[#e8c27a]" />
      <span className="absolute -end-2 -bottom-2 h-5 w-5 border-e-2 border-b-2 border-[#e8c27a]" />
    </div>
  )
}
