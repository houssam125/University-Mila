import { useEffect, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'
import EventGallery from '@/components/events/EventGallery'
import NotFound from '@/pages/NotFound'
import { housingPlaces, MEAL_PRICE_DZD, type HousingPlace } from '@/data/housing'

export default function HousingProfilePage() {
  const { id = '' } = useParams()
  const place = housingPlaces.find((item) => item.id === id)
  const { t, i18n } = useTranslation()
  const name = place ? t(`housing.items.${place.id}.name`) : ''

  useEffect(() => {
    if (!place) return
    document.title = `${name} | ${t('brand.university')}`
    window.scrollTo(0, 0)
    return () => {
      document.title = t('meta.title')
    }
  }, [place, name, t])

  if (!place) return <NotFound />

  const text = (key: string) => t(`housing.items.${place.id}.${key}`)
  const lang = i18n.resolvedLanguage ?? 'en'
  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(value),
    )
  const events = [...place.events].sort((a, b) => b.date.localeCompare(a.date))
  const gallery = place.gallery.map((url, index) => ({
    id: `${place.id}-${index}`,
    url,
    alt: name,
    caption: null,
    width: 1600,
    height: 1000,
  }))
  const others = housingPlaces.filter((item) => item.id !== place.id)

  return (
    <>
      {/* Cover photo with the place's name and key figures */}
      <header className="relative overflow-hidden bg-neutral-950 px-4 pt-36 pb-14 text-white sm:px-6 lg:pt-48 lg:pb-16">
        <img
          src={place.gallery[0]}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative mx-auto max-w-[1400px]">
          <Link
            to="/housing"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t('housing.back')}
          </Link>
          <p className="mt-6 w-fit bg-[#e8c27a] px-3 py-1 text-xs font-semibold tracking-[0.15em] text-neutral-900 uppercase">
            {t(`housing.kinds.${place.kind}`)}
            {place.gender && ` · ${t(`housing.gender.${place.gender}`)}`}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            {name}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/75">{text('summary')}</p>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-8 border-t border-white/15 pt-6">
            <dl className="flex flex-wrap gap-10">
              <Stat
                label={t('housing.capacity')}
                value={
                  place.kind === 'restaurant'
                    ? t('housing.mealsPerDay', { count: place.capacity })
                    : t('housing.beds', { count: place.capacity })
                }
              />
              {place.kind === 'restaurant' && (
                <Stat
                  label={t('housing.mealPrice')}
                  value={`${MEAL_PRICE_DZD} ${t('housing.dzd')}`}
                />
              )}
              <Stat label={t('housing.eventsLabel')} value={String(place.events.length)} />
            </dl>
            <Socials place={place} label={t('housing.followUs')} />
          </div>
        </div>
      </header>

      <div className="bg-stone px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-[1400px] space-y-16 lg:space-y-20">
          {/* Description, services and meal times */}
          <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="bg-[#f7f7f5] p-7 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:p-10">
              <SectionLabel>{t('housing.about')}</SectionLabel>
              <p className="mt-4 font-serif text-2xl leading-snug text-neutral-900 sm:text-[1.7rem]">
                {text('description')}
              </p>
              <SectionLabel className="mt-10">{t('housing.services')}</SectionLabel>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {place.services.map((service) => (
                  <li key={service} className="flex items-center gap-3 text-neutral-700">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-crimson/10 text-crimson">
                      <Check className="h-4 w-4" />
                    </span>
                    {t(`housing.serviceNames.${service}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden bg-neutral-900 p-7 text-white sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <Clock className="absolute -end-6 -bottom-6 h-48 w-48 text-white/5" />
              <div className="relative">
                {place.meals ? (
                  <>
                    <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#e8c27a] uppercase">
                      <Clock className="h-4 w-4" />
                      {t('housing.hours')}
                    </p>
                    <ul className="mt-6 divide-y divide-white/10">
                      {place.meals.map((meal) => (
                        <li key={meal.meal} className="flex items-center justify-between py-4">
                          <span className="text-lg">{t(`housing.serviceNames.${meal.meal}`)}</span>
                          <span className="font-serif text-2xl text-[#e8c27a]" dir="ltr">
                            {meal.from} – {meal.to}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#e8c27a] uppercase">
                      {t('housing.capacity')}
                    </p>
                    <p className="mt-6 font-serif text-7xl font-semibold text-[#e8c27a]">
                      {place.capacity.toLocaleString()}
                    </p>
                    <p className="mt-2 text-lg text-white/80">
                      {t('housing.beds', { count: place.capacity })}
                      {place.gender && ` · ${t(`housing.gender.${place.gender}`)}`}
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>{t('housing.gallery')}</SectionTitle>
            <div className="mt-6">
              <EventGallery images={gallery} />
            </div>
          </section>

          {/* Events, newest first */}
          <section>
            <SectionTitle>{t('housing.events')}</SectionTitle>
            <ol className="mt-6 space-y-5">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="group relative grid overflow-hidden bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition hover:bg-white sm:grid-cols-[280px_1fr]"
                >
                  <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                  <div className="aspect-[16/10] overflow-hidden sm:aspect-auto sm:h-full">
                    <img
                      src={event.image}
                      alt={text(`events.${event.id}.title`)}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="flex items-center gap-2 text-sm font-semibold text-crimson">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(event.date)}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-neutral-900">
                      {text(`events.${event.id}.title`)}
                    </h3>
                    <p className="mt-2 leading-relaxed text-neutral-600">
                      {text(`events.${event.id}.text`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <SectionTitle>{t('housing.others')}</SectionTitle>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {others.map((other) => (
                <li key={other.id}>
                  <Link
                    to={`/housing/${other.id}`}
                    className="group relative block aspect-[16/8] overflow-hidden bg-neutral-900"
                  >
                    <img
                      src={other.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 text-white">
                      <p className="text-xs font-semibold tracking-[0.2em] text-[#e8c27a] uppercase">
                        {t(`housing.kinds.${other.kind}`)}
                        {other.gender && ` · ${t(`housing.gender.${other.gender}`)}`}
                      </p>
                      <p className="mt-1 flex items-center justify-between gap-3 font-serif text-xl font-semibold">
                        {t(`housing.items.${other.id}.name`)}
                        <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.2em] text-white/60 uppercase">{label}</dt>
      <dd className="mt-1 font-serif text-3xl font-semibold">{value}</dd>
    </div>
  )
}

function Socials({ place, label }: { place: HousingPlace; label: string }) {
  if (!place.facebook && !place.instagram) return null
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs tracking-[0.2em] text-white/60 uppercase">{label}</span>
      {place.facebook && (
        <SocialLink href={place.facebook} label="Facebook">
          <FaFacebookF className="h-4 w-4" />
        </SocialLink>
      )}
      {place.instagram && (
        <SocialLink href={place.instagram} label="Instagram">
          <FaInstagram className="h-4 w-4" />
        </SocialLink>
      )}
    </div>
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
      className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/80 transition hover:border-crimson hover:bg-crimson hover:text-white"
    >
      {children}
    </a>
  )
}

function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.2em] text-crimson uppercase ${className ?? ''}`}
    >
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-4 font-serif text-3xl font-semibold text-neutral-900">
      <span className="h-8 w-1 bg-crimson" />
      {children}
    </h2>
  )
}
