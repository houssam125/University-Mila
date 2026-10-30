import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import clsx from 'clsx'
import type { Image } from '@/api/types'

// ImageKit resizes on request; other hosts (e.g. Wikimedia) get the original file
const sized = (url: string, width: number) =>
  url.includes('ik.imagekit.io') ? `${url}?tr=w-${width}` : url

/** Large first photo with thumbnails; clicking any photo opens a full-screen viewer */
export default function EventGallery({ images }: { images: Image[] }) {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  if (images.length === 0) return null

  // One large photo and up to two thumbnails; the last thumbnail shows "+N" for the rest
  const [first, ...rest] = images
  const thumbnails = rest.slice(0, 2)
  const remaining = rest.length - thumbnails.length

  return (
    <>
      {/* Fixed height on wider screens so the large photo and thumbnails line up */}
      <div
        className={clsx(
          'grid gap-2',
          thumbnails.length > 0 && 'sm:h-[440px] sm:grid-cols-[2fr_1fr]',
        )}
      >
        <GalleryButton
          image={first}
          width={1400}
          onClick={() => setOpenIndex(0)}
          className={clsx('aspect-[16/10]', thumbnails.length > 0 && 'sm:aspect-auto sm:h-full')}
        />
        {thumbnails.length > 0 && (
          <div
            className={clsx(
              'grid grid-cols-2 gap-2 sm:h-full sm:min-h-0 sm:grid-cols-1',
              thumbnails.length === 2 ? 'sm:grid-rows-2' : 'sm:grid-rows-1',
            )}
          >
            {thumbnails.map((image, index) => (
              <GalleryButton
                key={image.id}
                image={image}
                width={600}
                onClick={() => setOpenIndex(index + 1)}
                className="aspect-[16/10] sm:aspect-auto sm:h-full sm:min-h-0"
                overlay={
                  index === thumbnails.length - 1 && remaining > 0 ? `+${remaining}` : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-neutral-500">
        {t('events.photoCount', { count: images.length })}
      </p>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}

function GalleryButton({
  image,
  width,
  onClick,
  className,
  overlay,
}: {
  image: Image
  width: number
  onClick: () => void
  className?: string
  overlay?: string
}) {
  const { t } = useTranslation()
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${t('events.openPhoto')}: ${image.caption ?? image.alt}`}
      className={clsx('group relative block w-full overflow-hidden bg-neutral-900', className)}
    >
      <img
        src={sized(image.url, width)}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
      {overlay ? (
        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-2xl font-semibold text-white">
          {overlay}
        </span>
      ) : (
        <Expand className="absolute end-3 top-3 h-5 w-5 text-white opacity-0 drop-shadow transition group-hover:opacity-100" />
      )}
    </button>
  )
}

function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: Image[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}) {
  const { t, i18n } = useTranslation()
  const image = images[index]
  const go = (step: number) => onChange((index + step + images.length) % images.length)
  // In Arabic the "next" arrow points left, so swap the arrow keys too
  const isRtl = i18n.dir() === 'rtl'

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(isRtl ? -1 : 1)
      if (event.key === 'ArrowLeft') go(isRtl ? 1 : -1)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  })

  const arrowClass =
    'absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/40 text-white transition hover:bg-white hover:text-neutral-900'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('events.gallery')}
      className="fixed inset-0 z-[60] flex animate-fade-in flex-col bg-black/95 text-white"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-sm text-white/70 tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('header.close')}
          className="flex h-10 w-10 items-center justify-center transition hover:text-accent"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 sm:px-20"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          key={image.id}
          src={sized(image.url, 1800)}
          alt={image.alt}
          className="max-h-[75vh] max-w-full animate-fade-in object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t('events.previousPhoto')}
              className={clsx(arrowClass, 'start-2 sm:start-6')}
            >
              <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t('events.nextPhoto')}
              className={clsx(arrowClass, 'end-2 sm:end-6')}
            >
              <ChevronRight className="h-6 w-6 rtl:rotate-180" />
            </button>
          </>
        )}
      </div>

      <div className="px-4 py-5 text-center sm:px-6" onClick={(event) => event.stopPropagation()}>
        {image.caption && <p className="text-sm text-white/80">{image.caption}</p>}
        <div className="mt-4 flex justify-center gap-2 overflow-x-auto">
          {images.map((thumb, thumbIndex) => (
            <button
              key={thumb.id}
              type="button"
              onClick={() => onChange(thumbIndex)}
              aria-label={`${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
              className={clsx(
                'h-14 w-20 shrink-0 overflow-hidden border-2 transition',
                thumbIndex === index
                  ? 'border-accent'
                  : 'border-transparent opacity-50 hover:opacity-100',
              )}
            >
              <img src={sized(thumb.url, 200)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
