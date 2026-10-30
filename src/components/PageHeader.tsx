import type { ReactNode } from 'react'

/** Dark banner at the top of inner pages; leaves room for the fixed navigation bar */
export default function PageHeader({
  image,
  eyebrow,
  title,
  children,
}: {
  image: string
  eyebrow?: ReactNode
  title: string
  children?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden bg-neutral-950 px-4 pt-36 pb-16 text-white sm:px-6 lg:pt-44 lg:pb-20">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative mx-auto max-w-[1500px] animate-fade-up">
        {eyebrow}
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children}
      </div>
    </header>
  )
}
