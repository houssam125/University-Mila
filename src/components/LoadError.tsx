import { useTranslation } from 'react-i18next'
import { RotateCw, WifiOff } from 'lucide-react'
import clsx from 'clsx'

/** Shown when an API call fails, with a button to try again */
export default function LoadError({
  onRetry,
  className,
}: {
  onRetry: () => void
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <div
      role="alert"
      className={clsx(
        'flex flex-col items-center gap-4 bg-[#f7f7f5] px-6 py-12 text-center',
        className,
      )}
    >
      <WifiOff className="h-8 w-8 text-neutral-400" />
      <p className="text-neutral-600">{t('common.loadError')}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson"
      >
        <RotateCw className="h-4 w-4" />
        {t('common.retry')}
      </button>
    </div>
  )
}
