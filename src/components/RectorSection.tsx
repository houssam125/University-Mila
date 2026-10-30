import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Quote } from 'lucide-react'
import clsx from 'clsx'
import { rector, type RectorDegree } from '@/data/rector'
import { useInView } from '@/hooks/useInView'

export default function RectorSection() {
  const { t } = useTranslation()
  const [sectionRef, isInView] = useInView<HTMLElement>(0.2)
  const degrees = t('rector.degrees', { returnObjects: true }) as RectorDegree[]

  return (
    <section ref={sectionRef} className="relative z-10 bg-stone px-4 pb-16 sm:px-6 lg:pb-20">
      {/* Same card style as the key figures strip just above */}
      <article
        className={clsx(
          'group/card relative mx-auto grid max-w-[1500px] bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out md:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_minmax(420px,0.9fr)]',
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        )}
      >
        <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson rtl:origin-right transition-transform duration-700 ease-out group-hover/card:scale-x-100" />

        {/* Photo panel: same dark grid and gold glow as the platform cards */}
        <div className="relative flex items-center justify-center overflow-hidden bg-neutral-900 px-10 py-12">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute -start-16 -top-16 h-56 w-56 rounded-full bg-[#e8c27a]/25 blur-3xl transition-transform duration-700 group-hover/card:scale-125" />
          <Quote
            className="absolute end-5 top-5 h-8 w-8 text-[#e8c27a]/40 rtl:-scale-x-100"
            strokeWidth={1.25}
          />

          {/* Kept under the photo's real size (350px) so it stays sharp */}
          <div className="relative w-full max-w-[220px]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 border border-white/20 transition-transform duration-500 group-hover/card:translate-x-4 group-hover/card:translate-y-4 rtl:-translate-x-3 rtl:group-hover/card:-translate-x-4" />
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800">
              <img
                src={rector.photoUrl}
                alt={t('rector.photoAlt')}
                className="h-full w-full object-cover object-[50%_20%] grayscale-[35%] transition duration-700 group-hover/card:scale-105 group-hover/card:grayscale-0"
              />
            </div>
            {/* Gold corner brackets */}
            <span className="absolute -start-2 -top-2 h-6 w-6 border-s-2 border-t-2 border-[#e8c27a]" />
            <span className="absolute -end-2 -bottom-2 h-6 w-6 border-e-2 border-b-2 border-[#e8c27a]" />
          </div>
        </div>

        {/* Name and short bio */}
        <div className="flex flex-col justify-center px-6 py-6 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            {t('rector.role')}
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight font-semibold text-neutral-900 sm:text-3xl">
            {t('rector.name')}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
            {t('rector.summary')}
          </p>
          <Link
            to={rector.addressLink}
            className="group/link mt-5 inline-flex w-fit items-center gap-3 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-700"
          >
            {t('rector.readAddress')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 rtl:-scale-x-100 rtl:group-hover/link:-translate-x-1" />
          </Link>
        </div>

        {/* Academic path */}
        <div className="border-t border-neutral-200 px-6 py-6 sm:px-8 md:col-span-2 xl:col-span-1 xl:border-t-0 xl:border-s">
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            {t('rector.academicPath')}
          </p>
          <ol className="mt-3">
            {degrees.map((item) => (
              <li
                key={item.year}
                className="flex items-baseline gap-4 border-b border-neutral-200 py-3 last:border-b-0"
              >
                <span className="w-12 shrink-0 text-[15px] font-bold text-neutral-900 tabular-nums">
                  {item.year}
                </span>
                <span>
                  <span className="block text-[15px] leading-snug font-semibold text-neutral-900">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-neutral-600">
                    {item.institution}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </section>
  )
}
