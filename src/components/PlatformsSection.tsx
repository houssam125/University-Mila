import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { platforms, type Platform, type PlatformArt } from '@/data/platforms'
import { useInView } from '@/hooks/useInView'

export default function PlatformsSection() {
  const { t } = useTranslation()
  const [sectionRef, isInView] = useInView<HTMLElement>(0.15)

  return (
    <section ref={sectionRef} className="relative z-10 bg-stone px-4 pb-16 sm:px-6 lg:pb-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-6 border-t border-neutral-300 pt-14 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {t('platforms.label')}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold text-neutral-900 sm:text-5xl">
              {t('platforms.title')}
            </h2>
          </div>
          <p className="max-w-xl leading-relaxed text-neutral-600 lg:justify-self-end">
            {t('platforms.intro')}
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {platforms.map((platform, index) => (
            <li
              key={platform.id}
              className={clsx(
                'transition-all duration-700 ease-out',
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <PlatformCard platform={platform} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function PlatformCard({ platform }: { platform: Platform }) {
  const { t } = useTranslation()
  const Icon = platform.icon
  const text = (field: string) => t(`platforms.${platform.id}.${field}`)
  return (
    <a
      href={platform.href}
      className="group relative flex h-full flex-col bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_32px_56px_-24px_rgba(0,0,0,0.4)]"
    >
      <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson rtl:origin-right transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* Illustration drawn in the site's colours instead of a stock photo */}
      <div className="relative h-52 overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute -end-10 -top-16 h-56 w-56 rounded-full bg-[#e8c27a]/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <PlatformArtwork
          art={platform.art}
          className="absolute end-6 top-1/2 h-36 w-auto -translate-y-1/2 transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:scale-105 rtl:group-hover:translate-x-2"
        />
        <span className="absolute start-0 bottom-0 flex h-16 w-16 items-center justify-center bg-white text-neutral-900 transition-colors duration-300 group-hover:bg-crimson group-hover:text-white">
          <Icon className="h-7 w-7" strokeWidth={1.75} />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-7 pt-7 pb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
          {text('tag')}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-neutral-900">{text('title')}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-neutral-600">{text('description')}</p>
        <span className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-neutral-900">
          <span className="flex h-9 w-9 items-center justify-center bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-crimson">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </span>
          {text('cta')}
        </span>
      </div>
    </a>
  )
}

/** Simple line drawings, one per platform, in white with gold highlights */
function PlatformArtwork({ art, className }: { art: PlatformArt; className: string }) {
  const line = { fill: 'none', stroke: 'rgba(255,255,255,0.55)', strokeWidth: 1.5 }
  const faint = { ...line, stroke: 'rgba(255,255,255,0.25)' }
  const gold = '#e8c27a'

  if (art === 'documents') {
    return (
      <svg viewBox="0 0 220 150" className={className} aria-hidden="true">
        <rect x="20" y="22" width="80" height="104" transform="rotate(-8 60 74)" {...faint} />
        <rect x="58" y="14" width="80" height="104" transform="rotate(4 98 66)" {...faint} />
        <rect x="96" y="20" width="84" height="110" {...line} fill="rgba(255,255,255,0.04)" />
        {[42, 56, 70, 84].map((y, i) => (
          <line key={y} x1="108" y1={y} x2={i === 3 ? 148 : 168} y2={y} {...line} />
        ))}
        <line x1="108" y1="104" x2="138" y2="104" stroke={gold} strokeWidth="1.5" />
        <circle cx="170" cy="118" r="18" fill="#171717" stroke={gold} strokeWidth="1.5" />
        <path d="M162 118 l6 6 l11 -12" fill="none" stroke={gold} strokeWidth="2" />
      </svg>
    )
  }

  if (art === 'learning') {
    return (
      <svg viewBox="0 0 220 150" className={className} aria-hidden="true">
        <rect x="24" y="16" width="172" height="104" {...line} fill="rgba(255,255,255,0.04)" />
        <line x1="10" y1="130" x2="210" y2="130" {...line} />
        <line x1="24" y1="34" x2="196" y2="34" {...faint} />
        {[24, 32, 40].map((x) => (
          <circle key={x} cx={x + 8} cy="25" r="2" fill="rgba(255,255,255,0.4)" />
        ))}
        <circle cx="110" cy="74" r="22" {...line} />
        <path d="M103 63 L122 74 L103 85 Z" fill={gold} />
        <line x1="40" y1="108" x2="180" y2="108" {...faint} />
        <line x1="40" y1="108" x2="118" y2="108" stroke={gold} strokeWidth="2" />
      </svg>
    )
  }

  // schedule
  const days = 6
  const rows = 4
  const highlighted = new Set(['1-1', '3-0', '4-2', '2-3', '0-2'])
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden="true">
      <rect x="20" y="14" width="180" height="124" {...line} fill="rgba(255,255,255,0.04)" />
      <line x1="20" y1="38" x2="200" y2="38" {...line} />
      {[60, 160].map((x) => (
        <line key={x} x1={x} y1="6" x2={x} y2="22" stroke={gold} strokeWidth="2" />
      ))}
      {Array.from({ length: days * rows }, (_, i) => {
        const col = i % days
        const row = Math.floor(i / days)
        const isHighlighted = highlighted.has(`${col}-${row}`)
        return (
          <rect
            key={i}
            x={30 + col * 28}
            y={48 + row * 21}
            width="20"
            height="13"
            fill={isHighlighted ? gold : 'rgba(255,255,255,0.08)'}
            opacity={isHighlighted ? 0.85 : 1}
          />
        )
      })}
    </svg>
  )
}
