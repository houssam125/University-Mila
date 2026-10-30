import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { useTopEvents } from '@/api/events'
import EventCard, { EventCardSkeleton } from '@/components/events/EventCard'
import LoadError from '@/components/LoadError'
import { useInView } from '@/hooks/useInView'

const TOP_EVENTS_LIMIT = 6

export default function EventsSection() {
  const { t } = useTranslation()
  const [sectionRef, isInView] = useInView<HTMLElement>(0.1)
  const { data: topEvents, isPending, isError, refetch } = useTopEvents(TOP_EVENTS_LIMIT)

  return (
    <section ref={sectionRef} className="relative z-10 bg-stone px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-6 border-t border-neutral-300 pt-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {t('events.label')}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold text-neutral-900 sm:text-5xl">
              {t('events.title')}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-neutral-600">{t('events.intro')}</p>
          </div>
          <ViewAllLink />
        </div>

        {isError && <LoadError onRetry={() => refetch()} className="mt-12" />}

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isPending &&
            Array.from({ length: TOP_EVENTS_LIMIT }, (_, index) => (
              <li key={index}>
                <EventCardSkeleton />
              </li>
            ))}
          {topEvents?.map((event, index) => (
            <li
              key={event.slug}
              className={clsx(
                'transition-all duration-700 ease-out',
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              )}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ViewAllLink() {
  const { t } = useTranslation()
  return (
    <Link
      to="/events"
      className="group inline-flex w-fit shrink-0 items-center gap-3 bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-crimson"
    >
      {t('events.viewAll')}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
    </Link>
  )
}
