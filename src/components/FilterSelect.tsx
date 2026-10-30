import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

/** Full-width dropdown that replaces a row of filter buttons on phones */
export default function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}) {
  return (
    <label className={clsx('block', className)}>
      <span className="mb-1.5 block text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none border border-neutral-300 bg-white ps-4 pe-11 text-sm font-medium text-neutral-900 transition outline-none focus:border-neutral-900"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      </span>
    </label>
  )
}
