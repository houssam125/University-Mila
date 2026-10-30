import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { faculties, type Faculty } from '@/data/faculties'
import { useInView } from '@/hooks/useInView'

export default function FacultiesSection() {
  const { t } = useTranslation()
  const [sectionRef, isInView] = useInView<HTMLElement>(0.1)

  return (
    <section ref={sectionRef} className="relative z-10 bg-stone px-4 pb-16 sm:px-6 lg:pb-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-6 border-t border-neutral-300 pt-14 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {t('faculties.label')}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold text-neutral-900 sm:text-5xl">
              {t('faculties.title')}
            </h2>
          </div>
          <p className="max-w-xl leading-relaxed text-neutral-600 lg:justify-self-end">
            {t('faculties.intro')}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {faculties.map((faculty, index) => (
            <li
              key={faculty.id}
              className={clsx(
                'transition-all duration-700 ease-out md:last:col-span-2 lg:last:col-span-1',
                faculty.wide && 'md:col-span-2',
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              )}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <FacultyCard faculty={faculty} number={index + 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FacultyCard({ faculty, number }: { faculty: Faculty; number: number }) {
  const { t } = useTranslation()
  const Icon = faculty.icon

  return (
    <Link
      to={faculty.to}
      className="group relative block h-80 overflow-hidden bg-neutral-900 text-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)] focus:outline-none"
    >
      {faculty.image ? (
        <img
          src={faculty.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
      ) : (
        // No photo yet: the dark grid artwork used across the site, with the faculty icon
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute -end-10 -top-16 h-64 w-64 rounded-full bg-[#e8c27a]/20 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
          <Icon
            className="absolute end-8 top-1/2 h-32 w-32 -translate-y-2/3 text-white/10 transition-transform duration-1000 group-hover:scale-110"
            strokeWidth={1}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-500 group-hover:via-black/55" />
      <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right" />

      <span className="absolute start-6 top-6 flex h-11 w-11 items-center justify-center border border-white/25 bg-black/30 backdrop-blur-sm transition-colors duration-300 group-hover:border-crimson group-hover:bg-crimson">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="absolute end-6 top-6 border border-white/25 bg-black/30 px-2.5 py-1 text-xs font-semibold tabular-nums backdrop-blur-sm">
        {String(number).padStart(2, '0')}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <h3 className="max-w-xl font-serif text-2xl leading-snug font-semibold">
          {t(`faculties.items.${faculty.id}.title`)}
        </h3>

        {/* Description slides open on hover; always shown on touch screens */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="max-w-2xl pt-3 text-sm leading-relaxed text-white/80">
              {t(`faculties.items.${faculty.id}.description`)}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#e8c27a]">
              {t('faculties.explore')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
