import { useEffect, useState } from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, RotateCw, TriangleAlert } from 'lucide-react'
import { canReloadNow, isOutdatedFileError, reloadNow } from '@/lib/reloadOnNewVersion'

/** Shown instead of React Router's developer screen when a page fails to load or crashes */
export default function RouteError() {
  const error = useRouteError()
  const { t } = useTranslation()
  const isNewVersion = isOutdatedFileError(error)
  // A page file from an older deployment: reload once, already on the page the visitor asked for
  const [isReloading] = useState(() => isNewVersion && canReloadNow())

  useEffect(() => {
    if (import.meta.env.DEV) console.error(error)
    if (isReloading) reloadNow()
  }, [error, isReloading])

  if (isReloading) return <div className="min-h-screen bg-neutral-950" aria-busy="true" />

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e8c27a]/15 blur-3xl" />

      <div className="relative max-w-lg text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center bg-crimson/20 text-[#e8c27a]">
          <TriangleAlert className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-serif text-4xl font-semibold">
          {isNewVersion ? t('errors.newVersionTitle') : t('errors.title')}
        </h1>
        <p className="mt-4 leading-relaxed text-white/70">
          {isNewVersion ? t('errors.newVersionText') : t('errors.text')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#e8c27a]"
          >
            <RotateCw className="h-4 w-4" />
            {t('errors.reload')}
          </button>
          <Link
            to="/"
            reloadDocument
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            {t('errors.home')}
          </Link>
        </div>
      </div>
    </section>
  )
}
