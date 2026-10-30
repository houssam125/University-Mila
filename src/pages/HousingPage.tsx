import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BedDouble, Check, UtensilsCrossed } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '@/components/PageHeader'
import { housingPlaces, MEAL_PRICE_DZD, type HousingPlace } from '@/data/housing'
import { unsplash } from '@/data/clubs'

const HEADER_IMAGE = unsplash('1522202176988-66273c2fd55f', 1920)

export default function HousingPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('housing.title')} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  const beds = housingPlaces
    .filter((place) => place.kind === 'residence')
    .reduce((sum, place) => sum + place.capacity, 0)

  return (
    <>
      <PageHeader
        image={HEADER_IMAGE}
        title={t('housing.title')}
        eyebrow={
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            <Link to="/" className="transition hover:text-white">
              {t('brand.name')}
            </Link>
            <span>/</span>
            <span className="text-[#e8c27a]">{t('housing.eyebrow')}</span>
          </nav>
        }
      >
        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">{t('housing.intro')}</p>
        <div className="mt-8 flex flex-wrap gap-8 text-sm">
          <HeaderStat value={beds.toLocaleString()} label={t('housing.capacity')} />
          <HeaderStat
            value={`${MEAL_PRICE_DZD} ${t('housing.dzd')}`}
            label={t('housing.mealPrice')}
          />
        </div>
      </PageHeader>

      <section className="bg-stone px-4 py-14 sm:px-6 lg:py-20">
        <ul className="mx-auto max-w-[1400px] space-y-8 lg:space-y-10">
          {housingPlaces.map((place, index) => (
            <li key={place.id} className="animate-fade-in">
              <PlaceRow place={place} reversed={index % 2 === 1} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function HeaderStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-4xl font-semibold">{value}</p>
      <p className="mt-1 text-xs tracking-[0.2em] text-white/60 uppercase">{label}</p>
    </div>
  )
}

/** Large photo beside the place's name, facts and main services; the photo side alternates */
function PlaceRow({ place, reversed }: { place: HousingPlace; reversed: boolean }) {
  const { t } = useTranslation()
  const Icon = place.kind === 'restaurant' ? UtensilsCrossed : BedDouble

  return (
    <article className="group relative grid overflow-hidden bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition hover:bg-white lg:grid-cols-2">
      <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />

      <div
        className={clsx(
          'relative aspect-[16/10] overflow-hidden bg-neutral-900 lg:aspect-auto lg:min-h-[420px]',
          reversed && 'lg:order-2',
        )}
      >
        <img
          src={place.image}
          alt={t(`housing.items.${place.id}.name`)}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
        <span className="absolute start-5 top-5 flex items-center gap-2 bg-neutral-950/75 px-3 py-1.5 text-xs font-semibold tracking-[0.15em] text-[#e8c27a] uppercase backdrop-blur-sm">
          <Icon className="h-4 w-4" />
          {t(`housing.kinds.${place.kind}`)}
          {place.gender && ` · ${t(`housing.gender.${place.gender}`)}`}
        </span>
      </div>

      <div className="flex flex-col p-7 sm:p-10">
        <h2 className="font-serif text-3xl leading-snug font-semibold text-neutral-900">
          <Link
            to={`/housing/${place.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {t(`housing.items.${place.id}.name`)}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-neutral-600">
          {t(`housing.items.${place.id}.summary`)}
        </p>

        <p className="mt-6 font-serif text-4xl font-semibold text-crimson">
          {place.kind === 'restaurant'
            ? t('housing.mealsPerDay', { count: place.capacity })
            : t('housing.beds', { count: place.capacity })}
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-neutral-700">
          {place.services.slice(0, 6).map((service) => (
            <li key={service} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-crimson" />
              {t(`housing.serviceNames.${service}`)}
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-crimson">
          {t('housing.viewProfile')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </article>
  )
}
