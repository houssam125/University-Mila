import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import clsx from 'clsx'
import { studentLife, type StudentLifeItem } from '@/data/studentLife'
import { useInView } from '@/hooks/useInView'

export default function StudentLifeSection() {
  const { t } = useTranslation()
  const [sectionRef, isInView] = useInView<HTMLElement>(0.1)

  return (
    <section ref={sectionRef} className="relative z-10 bg-stone px-4 pb-16 sm:px-6 lg:pb-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-6 border-t border-neutral-300 pt-14 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {t('studentLife.label')}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold text-neutral-900 sm:text-5xl">
              {t('studentLife.title')}
            </h2>
          </div>
          <p className="max-w-xl leading-relaxed text-neutral-600 lg:justify-self-end">
            {t('studentLife.intro')}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {studentLife.map((item, index) => (
            <li
              key={item.id}
              className={clsx(
                'transition-all duration-700 ease-out',
                item.wide && 'md:col-span-2',
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <StudentLifeCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function StudentLifeCard({ item }: { item: StudentLifeItem }) {
  const { t } = useTranslation()
  const Icon = item.icon
  const text = (field: string) => t(`studentLife.items.${item.id}.${field}`)
  const highlights = t(`studentLife.items.${item.id}.highlights`, {
    returnObjects: true,
  }) as string[]
  const opensNewTab = item.external && item.href !== '#'

  const className = clsx(
    'group relative flex h-full min-h-[300px] flex-col overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-9',
    item.featured
      ? 'bg-neutral-900 text-white shadow-[0_30px_60px_-28px_rgba(0,0,0,0.6)]'
      : 'bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] hover:bg-white',
  )

  const content = (
    <>
      <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right" />

      {item.featured && (
        // Same dark grid and gold glow as the platform cards, with a large faint icon
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute -end-16 -top-20 h-80 w-80 rounded-full bg-[#e8c27a]/20 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
          <Icon
            className="absolute end-8 top-8 hidden h-40 w-40 text-white/[0.06] transition-transform duration-1000 group-hover:scale-110 sm:block"
            strokeWidth={1}
          />
        </>
      )}

      <div className="relative flex items-center gap-4">
        <span
          className={clsx(
            'flex h-14 w-14 shrink-0 items-center justify-center transition-colors duration-300',
            item.featured
              ? 'bg-[#e8c27a] text-neutral-900 group-hover:bg-crimson group-hover:text-white'
              : 'bg-crimson/10 text-crimson group-hover:bg-crimson group-hover:text-white',
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span
          className={clsx(
            'text-xs font-semibold tracking-[0.2em] uppercase',
            item.featured ? 'text-[#e8c27a]' : 'text-neutral-500',
          )}
        >
          {text('tag')}
        </span>
      </div>

      <h3
        className={clsx(
          'relative mt-6 font-serif font-semibold',
          item.featured ? 'text-3xl sm:text-4xl' : 'text-2xl text-neutral-900 sm:text-3xl',
        )}
      >
        {text('title')}
      </h3>
      <p
        className={clsx(
          'relative mt-3 max-w-xl leading-relaxed',
          item.featured ? 'text-white/75' : 'text-neutral-600',
        )}
      >
        {text('description')}
      </p>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {highlights.map((highlight) => (
          <li
            key={highlight}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm',
              item.featured
                ? 'border border-white/15 text-white/85'
                : 'bg-neutral-200/70 text-neutral-700',
            )}
          >
            <Check
              className={clsx('h-3.5 w-3.5', item.featured ? 'text-[#e8c27a]' : 'text-crimson')}
            />
            {highlight}
          </li>
        ))}
      </ul>

      <span
        className={clsx(
          'relative mt-auto inline-flex items-center gap-3 pt-8 text-sm font-semibold',
          item.featured ? 'text-white' : 'text-neutral-900',
        )}
      >
        <span
          className={clsx(
            'flex h-10 w-10 items-center justify-center transition-colors duration-300 group-hover:bg-crimson group-hover:text-white',
            item.featured ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white',
          )}
        >
          {item.external ? (
            <ExternalLink className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          )}
        </span>
        {text('cta')}
      </span>
    </>
  )

  // Outside websites (the library) use a normal link; pages of this site use the router
  return item.external ? (
    <a
      href={item.href}
      target={opensNewTab ? '_blank' : undefined}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link to={item.href} className={className}>
      {content}
    </Link>
  )
}
