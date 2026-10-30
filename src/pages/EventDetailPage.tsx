import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  FileText,
  MapPin,
  PlayCircle,
  Tag,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'
import type { LanguageCode } from '@/i18n'
import { useEvent, useRelatedEvents } from '@/api/events'
import type { EventDetail, EventLink, EventLinkKind } from '@/api/types'
import EventCard from '@/components/events/EventCard'
import EventGallery from '@/components/events/EventGallery'
import EventPeople from '@/components/events/EventPeople'
import RichText from '@/components/events/RichText'
import LoadError from '@/components/LoadError'
import PageHeader from '@/components/PageHeader'
import { ApiError } from '@/lib/api'
import { formatEventRange, formatLongDate } from '@/lib/dates'
import NotFound from '@/pages/NotFound'

const LINK_ICONS: Record<EventLinkKind, LucideIcon> = {
  registration: Ticket,
  livestream: PlayCircle,
  program: CalendarDays,
  document: FileText,
  external: ExternalLink,
}

export default function EventDetailPage() {
  const { slug = '' } = useParams()
  const { t, i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? 'en') as LanguageCode
  const { data: event, error, isPending, refetch } = useEvent(slug)
  const related = useRelatedEvents(slug)

  // The tab title follows the event while the page is open
  useEffect(() => {
    if (!event) return
    document.title = event.seo.title
    return () => {
      document.title = t('meta.title')
    }
  }, [event, t])

  if (error instanceof ApiError && error.status === 404) return <NotFound />

  if (isPending) {
    return (
      <div className="min-h-screen bg-stone">
        <div className="h-[420px] animate-pulse bg-neutral-800" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="bg-stone px-4 pt-36 pb-20">
        <LoadError onRetry={() => refetch()} className="mx-auto max-w-xl" />
      </div>
    )
  }

  return (
    <>
      <PageHeader
        image={`${event.coverImage.url}?tr=w-1600`}
        title={event.title}
        eyebrow={
          <Link
            to="/events"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
            {t('events.back')}
          </Link>
        }
      >
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
          <span className="flex items-center gap-2 text-[#e8c27a]">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={event.startDate}>
              {formatEventRange(event.startDate, event.endDate, event.allDay, language)}
            </time>
          </span>
          <span className="flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" />
            {event.location.name}
          </span>
          <span className="bg-white/10 px-2.5 py-1 text-xs tracking-[0.15em] uppercase">
            {event.category.label}
          </span>
        </div>
      </PageHeader>

      <section className="bg-stone px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div className="min-w-0 space-y-14">
            <article className="bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)]">
              <div className="p-3 sm:p-4">
                <EventGallery images={event.gallery} />
              </div>
              <div className="px-6 pt-4 pb-10 sm:px-10">
                <p className="text-lg leading-relaxed font-medium text-neutral-900">
                  {event.summary}
                </p>
                <div className="mt-6">
                  <RichText blocks={event.content} />
                </div>
                {event.tags.length > 0 && (
                  <ul className="mt-8 flex flex-wrap gap-2 border-t border-neutral-200 pt-6">
                    {event.tags.map((tag) => (
                      <li
                        key={tag}
                        className="flex items-center gap-1.5 bg-neutral-200/70 px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>

            <EventPeople people={event.people} />
          </div>

          <EventSidebar event={event} language={language} />
        </div>

        {related.data && related.data.length > 0 && (
          <div className="mx-auto mt-20 max-w-[1500px] border-t border-neutral-300 pt-12">
            <h2 className="font-serif text-3xl font-semibold text-neutral-900">
              {t('events.moreEvents')}
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.data.map((other) => (
                <li key={other.slug}>
                  <EventCard event={other} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  )
}

/** The event link set by the administrator, key details and extra links; stays in view on large screens */
function EventSidebar({ event, language }: { event: EventDetail; language: LanguageCode }) {
  const { t } = useTranslation()

  // The registration link, if any, comes first among the extra links
  const links = [...event.links].sort(
    (a, b) => Number(b.kind === 'registration') - Number(a.kind === 'registration'),
  )

  return (
    <aside className="h-fit space-y-6 lg:sticky lg:top-24">
      {event.mainLink && <MainLinkCard link={event.mainLink} />}

      <div className="bg-neutral-900 text-white">
        <dl>
          <DetailRow icon={CalendarDays} label={t('events.date')}>
            {formatEventRange(event.startDate, event.endDate, event.allDay, language)}
          </DetailRow>
          <DetailRow icon={MapPin} label={t('events.location')}>
            {event.location.name}
            {event.location.address && (
              <span className="mt-1 block text-sm text-white/60">{event.location.address}</span>
            )}
            {event.location.mapUrl && (
              <a
                href={event.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-[#e8c27a] hover:underline"
              >
                {t('events.viewOnMap')}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </DetailRow>
          <DetailRow icon={Tag} label={t('events.category')}>
            {event.category.label}
          </DetailRow>
          {event.organizers.length > 0 && (
            <DetailRow icon={Users} label={t('events.organizedBy')}>
              {event.organizers.map((organizer) => organizer.name).join(' · ')}
            </DetailRow>
          )}
        </dl>

        {links.length > 0 && (
          <div className="space-y-px border-t border-white/10">
            {links.map((item) => {
              const Icon = LINK_ICONS[item.kind]
              return (
                <a
                  key={item.url}
                  href={item.url}
                  target={item.opensInNewTab ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={clsx(
                    'flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-colors',
                    item.kind === 'registration'
                      ? 'bg-crimson hover:bg-[#8a1219]'
                      : 'bg-white/5 hover:bg-white/10',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              )
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-neutral-500">
        {t('events.updated', { date: formatLongDate(event.updatedAt, language) })}
      </p>
    </aside>
  )
}

/** The link the administrator attached to the event, e.g. a form, a website or a document */
function MainLinkCard({ link }: { link: EventLink }) {
  const { t } = useTranslation()
  const Icon = LINK_ICONS[link.kind]
  const host = (() => {
    try {
      return new URL(link.url).hostname.replace(/^www\./, '')
    } catch {
      return link.url
    }
  })()

  return (
    <div className="relative bg-[#f7f7f5] p-6 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.3)]">
      <span className="absolute inset-x-0 top-0 h-1 bg-crimson" />
      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
        {t('events.eventLink')}
      </p>
      <p className="mt-3 flex items-start gap-3 font-semibold text-neutral-900">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
        {link.label}
      </p>
      <p className="mt-1 ps-8 text-sm text-neutral-500" dir="ltr">
        {host}
      </p>
      <a
        href={link.url}
        target={link.opensInNewTab ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="group mt-5 flex items-center justify-center gap-2 bg-neutral-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-crimson"
      >
        {t('events.openLink')}
        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 border-b border-white/10 px-6 py-5 last:border-b-0">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#e8c27a]" />
      <div className="min-w-0">
        <dt className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">{label}</dt>
        <dd className="mt-1 font-medium">{children}</dd>
      </div>
    </div>
  )
}
