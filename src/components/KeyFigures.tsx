import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { keyFigures, type KeyFigure } from '@/data/keyFigures'
import { useInView } from '@/hooks/useInView'

const COUNT_DURATION_MS = 1800

export default function KeyFigures({ id }: { id: string }) {
  const { t } = useTranslation()
  // Start the count-up the first time the section scrolls into view
  const [sectionRef, isVisible] = useInView<HTMLElement>()

  return (
    <section
      id={id}
      ref={sectionRef}
      // Sits above the sticky hero so it slides over it while scrolling
      className="relative z-10 bg-stone px-4 py-16 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.45)] sm:px-6 lg:py-20"
    >
      <h2 className="sr-only">{t('figures.heading')}</h2>
      <dl className="mx-auto grid max-w-[1500px] grid-cols-1 bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:grid-cols-2 xl:grid-cols-5">
        {keyFigures.map((figure, index) => (
          <FigureCell key={figure.labelKey} figure={figure} start={isVisible} delay={index * 120} />
        ))}
      </dl>
    </section>
  )
}

function FigureCell({
  figure,
  start,
  delay,
}: {
  figure: KeyFigure
  start: boolean
  delay: number
}) {
  const { t } = useTranslation()
  const Icon = figure.icon
  return (
    <div className="group relative flex items-center gap-4 border-b border-neutral-200 px-6 py-8 transition-colors duration-300 last:sm:col-span-2 hover:bg-white sm:border-e xl:border-b-0 xl:last:col-span-1 xl:last:border-e-0">
      {/* Red bar that grows across the top on hover */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rtl:origin-right bg-crimson transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-neutral-200/60 text-neutral-400 transition duration-300 group-hover:bg-crimson/10 group-hover:text-crimson">
        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
      </span>

      {/* Label comes first for screen readers, number is shown on top */}
      <div className="flex flex-col-reverse transition-transform duration-300 group-hover:-translate-y-0.5">
        <dt className="mt-1 text-sm font-medium whitespace-nowrap text-neutral-500">
          {t(figure.labelKey)}
        </dt>
        <dd className="text-3xl font-bold tracking-tight text-neutral-800">
          <AnimatedNumber figure={figure} start={start} delay={delay} />
        </dd>
      </div>
    </div>
  )
}

function AnimatedNumber({
  figure,
  start,
  delay,
}: {
  figure: KeyFigure
  start: boolean
  delay: number
}) {
  // Visitors who prefer reduced motion get the final number straight away
  const [isStatic] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [current, setCurrent] = useState(isStatic ? figure.value : 0)

  useEffect(() => {
    if (!start || isStatic) return
    let frame = 0
    let startTime: number | null = null
    const tick = (now: number) => {
      startTime ??= now + delay
      const progress = Math.min(Math.max((now - startTime) / COUNT_DURATION_MS, 0), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(figure.value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, delay, figure, isStatic])

  return (
    <>
      {current.toLocaleString('en-US')}
      {figure.suffix}
    </>
  )
}
