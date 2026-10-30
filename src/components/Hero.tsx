import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowDown } from 'lucide-react'

const HERO_BACKGROUND_URL = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/meanImg.jpg'

export default function Hero({ nextSectionId }: { nextSectionId: string }) {
  const { t } = useTranslation()
  const cursorRef = useRef<HTMLSpanElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isPointerInside, setPointerInside] = useState(false)

  // Parallax: the hero stays pinned while the next section slides over it.
  // Its text drifts up and fades, the photo slowly zooms and darkens.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${progress * -120}px)`
        contentRef.current.style.opacity = String(1 - progress * 1.4)
      }
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `scale(${1 + progress * 0.12})`
      }
      if (shadeRef.current) shadeRef.current.style.opacity = String(progress * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // Touch screens have no hover, so the arrow circle stays visible in place there
  const [canHover] = useState(() => window.matchMedia('(hover: hover)').matches)

  // Move the arrow circle with the mouse without re-rendering on every move
  const moveCursor = (event: PointerEvent<HTMLButtonElement>) => {
    const cursor = cursorRef.current
    if (!cursor || !canHover) return
    const zone = event.currentTarget.getBoundingClientRect()
    cursor.style.left = `${event.clientX - zone.left}px`
    cursor.style.top = `${event.clientY - zone.top}px`
  }

  const scrollToNext = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById(nextSectionId)
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className="sticky top-0 flex h-svh min-h-[560px] items-center justify-center overflow-hidden bg-neutral-950 text-white">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_URL})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      <div ref={shadeRef} className="absolute inset-0 bg-black opacity-0" />

      <div
        ref={contentRef}
        className="relative mx-auto max-w-4xl px-4 text-center will-change-transform sm:px-6"
      >
        <h1 className="animate-fade-up font-serif text-4xl leading-[1.1] font-semibold sm:text-6xl lg:text-7xl">
          {t('hero.titleLine1')}
          <span className="mt-1 block font-light text-[#e8c27a] italic">
            {t('hero.titleLine2')}
          </span>
        </h1>
        <span className="mx-auto mt-7 block h-[3px] w-16 animate-fade-up bg-accent [animation-delay:150ms]" />
        <p className="mx-auto mt-7 max-w-3xl animate-fade-up text-base leading-relaxed text-white/80 [animation-delay:300ms] sm:text-lg">
          {t('hero.description')}
        </p>
      </div>

      {/* Bottom zone: the mouse becomes an arrow circle, and a click scrolls to the next section */}
      <button
        type="button"
        onClick={scrollToNext}
        onPointerEnter={() => setPointerInside(true)}
        onPointerLeave={() => setPointerInside(false)}
        onPointerMove={moveCursor}
        aria-label={t('hero.scrollNext')}
        className="group absolute inset-x-0 bottom-0 h-[26%] min-h-[140px] cursor-none focus:outline-none"
      >
        <span
          ref={cursorRef}
          className={`pointer-events-none absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/10 backdrop-blur-sm transition-opacity duration-200 group-focus-visible:opacity-100 ${
            !canHover || isPointerInside ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ArrowDown className="h-5 w-5 animate-nudge" strokeWidth={2} />
        </span>
      </button>
    </section>
  )
}
