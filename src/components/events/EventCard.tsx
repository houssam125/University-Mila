import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Camera, MapPin } from 'lucide-react'
import type { LanguageCode } from '@/i18n'
import type { EventSummary } from '@/api/types'
import { dateParts } from '@/lib/dates'

export default function EventCard({ event }: { event: EventSummary }) {
  const { t, i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? 'en') as LanguageCode
  const date = dateParts(event.startDate, language)

  return (
    <Link
      to={`/events/${event.slug}`}
      className="group relative flex h-full flex-col bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_32px_56px_-24px_rgba(0,0,0,0.4)]"
    >
      <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right" />

      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        <img
          src={`${event.coverImage.url}?tr=w-800`}
          alt={event.coverImage.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Date block */}
        <time
          dateTime={event.startDate}
          className="absolute start-0 bottom-0 flex min-w-[76px] flex-col items-center bg-white px-3 py-2.5 text-neutral-900 transition-colors duration-300 group-hover:bg-crimson group-hover:text-white"
        >
          <span className="text-2xl leading-none font-bold tabular-nums">{date.day}</span>
          <span className="mt-1 text-[11px] font-semibold tracking-[0.15em] uppercase">
            {date.month}
          </span>
          <span className="text-[11px] opacity-70">{date.year}</span>
        </time>

        <span className="absolute end-4 top-4 bg-black/45 px-2.5 py-1 text-[11px] font-semibold tracking-[0.15em] text-white uppercase backdrop-blur-sm">
          {event.category.label}
        </span>

        {event.photoCount > 1 && (
          <span className="absolute end-4 bottom-4 flex items-center gap-1.5 bg-black/45 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Camera className="h-3.5 w-3.5" />
            {event.photoCount}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pt-6 pb-7">
        <h3 className="font-serif text-xl leading-snug font-semibold text-neutral-900">
          {event.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {event.summary}
        </p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-200 pt-4 text-sm">
          <span className="flex min-w-0 items-center gap-1.5 text-neutral-500">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{event.location.name}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-semibold text-neutral-900">
            {t('events.readMore')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/** Grey placeholder shown while events load */
export function EventCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col bg-[#f7f7f5]" aria-hidden="true">
      <div className="aspect-[16/10] bg-neutral-300/70" />
      <div className="space-y-3 px-6 pt-6 pb-7">
        <div className="h-5 w-4/5 bg-neutral-300/70" />
        <div className="h-3 w-full bg-neutral-200" />
        <div className="h-3 w-2/3 bg-neutral-200" />
        <div className="mt-6 h-4 w-1/2 bg-neutral-200" />
      </div>
    </div>
  )
}
