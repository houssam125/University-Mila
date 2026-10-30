import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '@/components/PageHeader'
import {
  administration,
  commonServices,
  councils,
  FACULTIES_ICON,
  facultyNodes,
  library,
  rectorNode,
  type StructureNode,
} from '@/data/structure'

const HEADER_IMAGE = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/IF.jpg?tr=w-1600'

export default function StructurePage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('structure.title')} | ${t('brand.university')}`
    return () => {
      document.title = t('meta.title')
    }
  }, [t])

  const FacultiesIcon = FACULTIES_ICON
  const LibraryIcon = library.icon
  const RectorIcon = rectorNode.icon

  return (
    <>
      <PageHeader
        image={HEADER_IMAGE}
        title={t('structure.title')}
        eyebrow={
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            <Link to="/" className="transition hover:text-white">
              {t('brand.name')}
            </Link>
            <span>/</span>
            <span className="text-[#e8c27a]">{t('nav.university')}</span>
          </nav>
        }
      >
        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">{t('structure.intro')}</p>
      </PageHeader>

      <section className="overflow-x-clip bg-stone px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Legend />

          {/* Level 1: rector, with the councils on either side */}
          <LevelLabel>{t('structure.levels.leadership')}</LevelLabel>
          <div className="relative grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
            <div className="lg:flex lg:items-center lg:justify-end">
              <NodeCard node={councils[0]} variant="council" />
              <span className="hidden h-px w-12 border-t-2 border-dashed border-neutral-400 lg:block" />
            </div>

            <Link
              to={rectorNode.href!}
              className="group relative mx-auto flex w-full max-w-sm flex-col items-center bg-neutral-900 px-8 py-7 text-center text-white shadow-[0_30px_60px_-28px_rgba(0,0,0,0.6)] transition hover:-translate-y-1 lg:w-80"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-crimson via-[#e8c27a] to-crimson" />
              <span className="flex h-14 w-14 items-center justify-center bg-[#e8c27a] text-neutral-900">
                <RectorIcon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-serif text-2xl font-semibold">
                {t('structure.nodes.rector.title')}
              </p>
              <p className="mt-1 text-sm text-[#e8c27a]">{t('rector.name')}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {t('structure.nodes.rector.description')}
              </p>
            </Link>

            <div className="lg:flex lg:items-center">
              <span className="hidden h-px w-12 border-t-2 border-dashed border-neutral-400 lg:block" />
              <NodeCard node={councils[1]} variant="council" />
            </div>
          </div>

          {/* Level 2: vice-rectorates and general secretariat */}
          <Connector label={t('structure.levels.administration')} />
          <Branches count={administration.length}>
            {administration.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                variant={node.id === 'secretariat' ? 'accent' : 'default'}
              />
            ))}
          </Branches>

          {/* Level 3: faculties, library and common services */}
          <Connector label={t('structure.levels.academic')} />
          <Branches count={3} wideFirst>
            <div className="bg-[#f7f7f5] p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)]">
              <GroupTitle icon={<FacultiesIcon className="h-5 w-5" />}>
                {t('structure.groups.faculties')}
              </GroupTitle>
              <ul className="mt-4 grid gap-1 sm:grid-cols-2">
                {facultyNodes.map((faculty) => (
                  <li key={faculty.id}>
                    <Link
                      to={faculty.href}
                      className="group flex items-center gap-2 px-2 py-2 text-sm text-neutral-700 transition hover:bg-white hover:text-neutral-900"
                    >
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-crimson rtl:rotate-180" />
                      {t(`faculties.items.${faculty.id}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-neutral-200 pt-3 text-xs text-neutral-500">
                {t('structure.groups.facultiesNote')}
              </p>
            </div>

            <div className="flex flex-col bg-[#f7f7f5] p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)]">
              <GroupTitle icon={<LibraryIcon className="h-5 w-5" />}>
                {t('structure.nodes.library.title')}
              </GroupTitle>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {t('structure.nodes.library.description')}
              </p>
            </div>

            <div className="bg-[#f7f7f5] p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)]">
              <GroupTitle icon={<ServicesIcon />}>{t('structure.groups.services')}</GroupTitle>
              <ul className="mt-4 space-y-1">
                {commonServices.map((service) => {
                  const Icon = service.icon
                  const label = t(`structure.nodes.${service.id}.title`)
                  const content = (
                    <>
                      <Icon className="h-4 w-4 shrink-0 text-crimson" />
                      {label}
                    </>
                  )
                  return (
                    <li key={service.id}>
                      {service.href ? (
                        <Link
                          to={service.href}
                          className="flex items-center gap-2 px-2 py-2 text-sm text-neutral-700 transition hover:bg-white hover:text-neutral-900"
                        >
                          {content}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-2 px-2 py-2 text-sm text-neutral-700">
                          {content}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </Branches>

          <p className="mx-auto mt-14 max-w-3xl text-center text-sm text-neutral-500">
            {t('structure.note')}
          </p>
        </div>
      </section>
    </>
  )
}

function ServicesIcon() {
  const Icon = commonServices[0].icon
  return <Icon className="h-5 w-5" />
}

function Legend() {
  const { t } = useTranslation()
  return (
    <div className="mb-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600">
      <span className="flex items-center gap-2">
        <span className="h-0.5 w-8 bg-neutral-900" />
        {t('structure.legend.authority')}
      </span>
      <span className="flex items-center gap-2">
        <span className="w-8 border-t-2 border-dashed border-neutral-400" />
        {t('structure.legend.councils')}
      </span>
    </div>
  )
}

function LevelLabel({ children }: { children: string }) {
  return (
    <p className="mb-5 text-center text-xs font-semibold tracking-[0.25em] text-crimson uppercase">
      {children}
    </p>
  )
}

/** Vertical line between levels, with the next level's name on it */
function Connector({ label }: { label: string }) {
  return (
    <div className="relative mx-auto flex h-24 w-full items-center justify-center">
      <span
        className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-neutral-900"
        aria-hidden="true"
      />
      <p className="relative bg-stone px-4 text-center text-xs font-semibold tracking-[0.25em] text-crimson uppercase">
        {label}
      </p>
    </div>
  )
}

/** A horizontal line across the level, with a short tick down to each box on large screens */
function Branches({
  count,
  wideFirst = false,
  children,
}: {
  count: number
  wideFirst?: boolean
  children: ReactNode
}) {
  return (
    <div className="relative">
      <span
        className="absolute top-0 hidden h-0.5 bg-neutral-900 lg:block"
        // From the centre of the first box to the centre of the last one
        style={
          wideFirst
            ? { insetInlineStart: '22%', insetInlineEnd: '14%' }
            : { insetInline: `${50 / count}%` }
        }
        aria-hidden="true"
      />
      <div
        className={clsx(
          'grid gap-4 lg:pt-8',
          wideFirst ? 'lg:grid-cols-[1.6fr_1fr_1fr]' : 'sm:grid-cols-2 lg:grid-cols-5',
          '[&>*]:relative lg:[&>*]:before:absolute lg:[&>*]:before:-top-8 lg:[&>*]:before:left-1/2 lg:[&>*]:before:h-8 lg:[&>*]:before:w-0.5 lg:[&>*]:before:-translate-x-1/2 lg:[&>*]:before:bg-neutral-900 lg:[&>*]:before:content-[""]',
        )}
      >
        {children}
      </div>
    </div>
  )
}

function GroupTitle({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <p className="flex items-center gap-3 font-serif text-xl font-semibold text-neutral-900">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-crimson/10 text-crimson">
        {icon}
      </span>
      {children}
    </p>
  )
}

function NodeCard({
  node,
  variant,
}: {
  node: StructureNode
  variant: 'default' | 'accent' | 'council'
}) {
  const { t } = useTranslation()
  const Icon = node.icon
  const className = clsx(
    'group relative block h-full p-5 transition',
    variant === 'council' && 'border-2 border-dashed border-neutral-300 bg-white/60 lg:w-72',
    variant === 'default' &&
      'bg-[#f7f7f5] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:bg-white',
    variant === 'accent' &&
      'bg-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] ring-1 ring-[#e8c27a] hover:-translate-y-1',
  )
  const content = (
    <>
      {variant !== 'council' && (
        <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
      )}
      <span
        className={clsx(
          'flex h-10 w-10 items-center justify-center',
          variant === 'council' ? 'bg-neutral-200 text-neutral-600' : 'bg-crimson/10 text-crimson',
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 font-semibold leading-snug text-neutral-900">
        {t(`structure.nodes.${node.id}.title`)}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
        {t(`structure.nodes.${node.id}.description`)}
      </p>
    </>
  )
  return node.href ? (
    <Link to={node.href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}
