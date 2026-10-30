import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BookOpen,
  Building2,
  Fingerprint,
  Hourglass,
  MapPin,
  Flag,
  Flame,
  ExternalLink,
  Home,
  Landmark,
  Quote,
  Radio,
  Shield,
  Star,
  Medal,
  Users,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'
import type { LanguageCode } from '@/i18n'
import type { Image } from '@/api/types'
import EventGallery from '@/components/events/EventGallery'
import { useInView } from '@/hooks/useInView'
import {
  clanOujda,
  creditedPhotos,
  facts,
  photos,
  portrait,
  profile,
  sections,
  sources,
  timeline,
  type BoussoufSection,
  type FactId,
} from '@/data/boussouf'

// The 1958 Clan d'Oujda archive photo, softened behind the timeline
const TIMELINE_BACKGROUND = clanOujda.src

const FACT_ICONS: Record<FactId, LucideIcon> = {
  born: MapPin,
  died: Hourglass,
  alias: Fingerprint,
  rank: Medal,
  knownFor: Radio,
}

// One icon per date in the timeline
const TIMELINE_ICONS: Record<string, LucideIcon> = {
  '1926': Home,
  '1950': Shield,
  '1954': Flame,
  '1956': Star,
  '1957': Users,
  '1958': Landmark,
  '1960': Radio,
  '1962': Flag,
  '1980': BookOpen,
}

export default function BoussoufPage() {
  const { t, i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? 'en') as LanguageCode

  useEffect(() => {
    document.title = `${profile.name[language]} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [language, t])

  const galleryImages: Image[] = photos.map((photo, index) => ({
    id: `boussouf-${index}`,
    url: photo.src,
    alt: photo.caption[language],
    caption: photo.caption[language],
    width: photo.width,
    height: photo.height,
  }))

  return (
    <>
      {/* Hero: portrait framed with gold brackets over a dark archive photo */}
      <header className="relative overflow-hidden bg-neutral-950 px-4 pt-32 pb-28 text-white sm:px-6 lg:pt-40 lg:pb-36">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-25 blur-[2px] grayscale"
          style={{ backgroundImage: `url(${photos[2].src})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-neutral-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute -end-20 top-10 h-80 w-80 rounded-full bg-[#e8c27a]/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <figure className="relative mx-auto w-56 animate-fade-up sm:w-64 lg:mx-0 lg:w-72">
            <div className="absolute inset-0 translate-x-4 translate-y-4 border border-white/20 rtl:-translate-x-4" />
            <img
              src={portrait.src}
              alt={portrait.caption[language]}
              width={portrait.width}
              height={portrait.height}
              className="relative aspect-[595/815] w-full object-cover grayscale-[20%]"
            />
            <span className="absolute -start-3 -top-3 h-8 w-8 border-s-2 border-t-2 border-[#e8c27a]" />
            <span className="absolute -end-3 -bottom-3 h-8 w-8 border-e-2 border-b-2 border-[#e8c27a]" />
          </figure>

          <div className="animate-fade-up text-center [animation-delay:150ms] lg:text-start">
            <nav className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase lg:justify-start">
              <Link to="/" className="transition hover:text-white">
                {t('brand.name')}
              </Link>
              <span>/</span>
              <span className="text-[#e8c27a]">{t('boussouf.label')}</span>
            </nav>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
              {profile.name[language]}
            </h1>
            <p className="mt-3 font-serif text-2xl font-light text-[#e8c27a] italic sm:text-3xl">
              « {profile.alias[language]} » · {profile.years}
            </p>
            <span className="mx-auto mt-7 block h-[3px] w-16 bg-accent lg:mx-0" />
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/80 lg:mx-0">
              {profile.tagline[language]}
            </p>
          </div>
        </div>
      </header>

      {/* Key facts: a card that overlaps the hero, one icon per fact */}
      <section className="relative z-10 bg-stone px-4 sm:px-6">
        <div className="relative mx-auto -mt-16 max-w-[1500px] lg:-mt-20">
          <div className="h-1 bg-gradient-to-r from-crimson via-[#e8c27a] to-crimson" />
          <dl className="grid bg-[#f7f7f5] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.45)] sm:grid-cols-2 xl:grid-cols-5">
            {facts.map((fact, index) => {
              const Icon = FACT_ICONS[fact.id]
              return (
                <div
                  key={fact.id}
                  className="group relative flex gap-4 border-b border-neutral-200 px-6 py-7 transition-colors duration-300 hover:bg-white sm:border-e sm:last:col-span-2 xl:border-b-0 xl:last:col-span-1 xl:last:border-e-0"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-crimson/10 text-crimson transition-colors duration-300 group-hover:bg-crimson group-hover:text-white">
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold tracking-[0.2em] text-neutral-500 uppercase">
                      {fact.label[language]}
                    </dt>
                    <dd className="mt-1.5 font-serif text-lg leading-snug font-semibold text-neutral-900">
                      {fact.value[language]}
                    </dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </div>
      </section>

      {/* Biography: each part of the story next to a photo or a designed panel */}
      <section className="overflow-x-clip bg-stone px-4 pt-14 pb-20 sm:px-6 lg:pb-28">
        <div className="mx-auto max-w-[1500px]">
          <nav aria-label={t('boussouf.contents')} className="flex flex-wrap gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex shrink-0 items-center gap-2 bg-[#f7f7f5] px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-white hover:text-neutral-900"
              >
                <span className="text-xs text-crimson tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.title[language]}
              </a>
            ))}
          </nav>

          <div className="mt-16 space-y-24 lg:space-y-32">
            {sections.map((section, index) => (
              <StoryRow key={section.id} section={section} index={index} language={language} />
            ))}
          </div>

          <blockquote className="relative mx-auto mt-24 max-w-4xl overflow-hidden bg-neutral-900 px-8 py-12 text-center text-white sm:px-16">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[#e8c27a]/20 blur-3xl" />
            <Quote className="relative mx-auto h-10 w-10 text-[#e8c27a] rtl:-scale-x-100" />
            <p className="relative mt-6 font-serif text-2xl leading-relaxed sm:text-3xl">
              {t('boussouf.closing')}
            </p>
            <Link
              to="/"
              className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#e8c27a] hover:underline"
            >
              {t('hero.titleLine1')} {t('hero.titleLine2')}
            </Link>
          </blockquote>
        </div>
      </section>

      <Timeline language={language} />

      {/* Photos, credits and sources */}
      <section id="photos" className="scroll-mt-20 bg-stone px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            {t('boussouf.label')}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
            {t('boussouf.photos')}
          </h2>
          <div className="mt-10 bg-[#f7f7f5] p-3 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:p-4">
            <EventGallery images={galleryImages} />
          </div>

          <CreditsAndSources language={language} />
        </div>
      </section>
    </>
  )
}

/** One part of the biography; the picture alternates sides from row to row */
function StoryRow({
  section,
  index,
  language,
}: {
  section: BoussoufSection
  index: number
  language: LanguageCode
}) {
  const [ref, isInView] = useInView<HTMLElement>(0.2)
  const number = String(index + 1).padStart(2, '0')
  const imageFirst = index % 2 === 0

  return (
    <section
      ref={ref}
      id={section.id}
      className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <div
        className={clsx(
          'transition-all duration-1000 ease-out',
          !imageFirst && 'lg:order-2',
          isInView
            ? 'translate-x-0 opacity-100'
            : imageFirst
              ? '-translate-x-8 opacity-0'
              : 'translate-x-8 opacity-0',
        )}
      >
        <StoryMedia section={section} number={number} language={language} />
      </div>

      <div
        className={clsx(
          'transition-all delay-150 duration-1000 ease-out',
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        )}
      >
        <p className="flex items-center gap-3 text-sm font-semibold text-crimson">
          <span className="tabular-nums">{number}</span>
          <span className="h-px w-10 bg-crimson" />
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight font-semibold text-neutral-900 sm:text-4xl">
          {section.title[language]}
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          {section.paragraphs[language].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryMedia({
  section,
  number,
  language,
}: {
  section: BoussoufSection
  number: string
  language: LanguageCode
}) {
  const { media } = section

  if (media.kind === 'panel') {
    // No photo for this part: a panel in the site's dark grid and gold style
    return (
      <div className="group relative">
        <div className="absolute inset-0 translate-x-4 translate-y-4 border border-crimson/40 rtl:-translate-x-4" />
        <div className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden bg-neutral-900 p-8 text-white sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute -end-16 -top-16 h-72 w-72 rounded-full bg-[#e8c27a]/20 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
          <span className="absolute end-6 top-2 font-serif text-[9rem] leading-none font-semibold text-white/5 sm:text-[11rem]">
            {number}
          </span>
          <span className="relative block h-[3px] w-14 bg-accent" />
          <p className="relative mt-5 font-serif text-4xl leading-tight font-semibold text-[#e8c27a] sm:text-5xl">
            {media.headline[language]}
          </p>
          <p className="relative mt-3 max-w-md text-white/70">{media.caption[language]}</p>
        </div>
      </div>
    )
  }

  return (
    <figure className="group relative">
      <div className="absolute inset-0 translate-x-4 translate-y-4 border border-neutral-400/60 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5 rtl:-translate-x-4 rtl:group-hover:-translate-x-5" />
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
        <img
          src={media.photo.src}
          alt={media.photo.caption[language]}
          loading="lazy"
          className={clsx(
            'h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105',
            // Tall documents (the newspaper page) keep their masthead in view
            media.photo.height > media.photo.width && 'object-top',
          )}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pt-14 pb-5">
          <figcaption className="text-sm text-white/90">{media.photo.caption[language]}</figcaption>
        </div>
      </div>
      <span className="absolute -start-2 -top-2 h-7 w-7 border-s-2 border-t-2 border-[#e8c27a]" />
      <span className="absolute -end-2 -bottom-2 h-7 w-7 border-e-2 border-b-2 border-[#e8c27a]" />
    </figure>
  )
}

/** Light timeline over a soft photo of Mila, with a centre line and alternating cards */
function Timeline({ language }: { language: LanguageCode }) {
  const { t } = useTranslation()
  return (
    <section
      id="timeline"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${TIMELINE_BACKGROUND})` }}
      />
      <div className="absolute inset-0 bg-[#f4efe4]/90" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-crimson uppercase">
            {profile.years}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
            {t('boussouf.timeline')}
          </h2>
          <span className="mx-auto mt-5 block h-[3px] w-16 bg-accent" />
        </div>

        <ol className="relative mt-16">
          {/* The line: at the start on phones, in the centre on large screens */}
          <span className="absolute inset-y-0 start-5 w-0.5 bg-gradient-to-b from-[#e8c27a] via-crimson to-[#e8c27a] lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2" />
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              text={item.text[language]}
              icon={TIMELINE_ICONS[item.year] ?? Star}
              isLeft={index % 2 === 0}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

function TimelineItem({
  year,
  text,
  icon: Icon,
  isLeft,
}: {
  year: string
  text: string
  icon: LucideIcon
  isLeft: boolean
}) {
  const [ref, isInView] = useInView<HTMLLIElement>(0.3)
  return (
    <li ref={ref} className="relative grid pb-10 ps-16 last:pb-0 lg:grid-cols-2 lg:ps-0">
      {/* Dot on the line */}
      <span className="absolute start-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center border-2 border-white bg-crimson text-white shadow-md lg:start-1/2 rtl:translate-x-1/2">
        <Icon className="h-4 w-4" />
      </span>

      <div
        className={clsx(
          'transition-all duration-700 ease-out',
          isLeft ? 'lg:pe-16' : 'lg:col-start-2 lg:ps-16',
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        )}
      >
        <div className="group relative bg-white p-6 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] transition hover:-translate-y-1">
          <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
          <p className="font-serif text-4xl font-semibold text-crimson tabular-nums">{year}</p>
          <p className="mt-2 leading-relaxed text-neutral-700">{text}</p>
        </div>
      </div>
    </li>
  )
}

/** Photo credits with thumbnails, and the sources as cards */
function CreditsAndSources({ language }: { language: LanguageCode }) {
  const { t } = useTranslation()

  return (
    <div className="mt-16 grid gap-6 lg:grid-cols-2">
      <div className="bg-[#f7f7f5] p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:p-8">
        <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
          <Building2 className="h-4 w-4 text-crimson" />
          {t('boussouf.photoCredits')}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {t('boussouf.photoLicense')}
        </p>
        <ul className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
          {creditedPhotos.map((photo) => (
            <li key={photo.src}>
              <a
                href={photo.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-3 transition hover:bg-white"
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className="h-14 w-20 shrink-0 object-cover grayscale transition group-hover:grayscale-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 text-sm font-medium text-neutral-900">
                    {photo.caption[language]}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-500" dir="ltr">
                    Wikimedia Commons · {photo.credit}
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-crimson" />
              </a>
            </li>
          ))}
        </ul>
        {/* Creative Commons photos must link to their licence */}
        <ul className="mt-4 space-y-1 text-xs text-neutral-500" dir="ltr">
          {creditedPhotos
            .filter((photo) => photo.licenseUrl)
            .map((photo) => (
              <li key={photo.src}>
                {photo.credit} –{' '}
                <a
                  href={photo.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crimson hover:underline"
                >
                  {photo.licenseUrl}
                </a>
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-[#f7f7f5] p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:p-8">
        <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
          <BookOpen className="h-4 w-4 text-crimson" />
          {t('boussouf.sources')}
        </h3>
        <ul className="mt-6 space-y-3">
          {sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="group relative flex items-center gap-4 bg-white p-4 shadow-[0_12px_24px_-18px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-y-0 start-0 w-1 origin-top scale-y-0 bg-crimson transition-transform duration-300 group-hover:scale-y-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-neutral-900 font-serif text-lg font-semibold text-[#e8c27a]">
                  W
                </span>
                <span className="min-w-0 flex-1 text-start">
                  <span className="block text-xs font-semibold tracking-[0.1em] text-neutral-500 uppercase">
                    {source.publisher}
                  </span>
                  <span className="block font-medium text-neutral-900">{source.title}</span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-crimson" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-neutral-200 pt-5 text-sm leading-relaxed text-neutral-500">
          {t('boussouf.sourcesNote')}
        </p>
      </div>
    </div>
  )
}
