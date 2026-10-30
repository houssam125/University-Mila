import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { EventPerson } from '@/api/types'

/** Teachers and staff involved in an event, with their role */
export default function EventPeople({ people }: { people: EventPerson[] }) {
  const { t } = useTranslation()
  if (people.length === 0) return null

  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold text-neutral-900">{t('events.people')}</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {people.map(({ person, role, roleLabel, note }) => (
          <li key={`${person.id}-${role}`}>
            <Link
              to={`/people/${person.slug}`}
              className="group relative flex h-full gap-4 bg-white p-5 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
              <Avatar name={person.fullName} photoUrl={person.photo?.url} />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.15em] text-crimson uppercase">
                  {roleLabel}
                </p>
                <p className="mt-1 font-semibold text-neutral-900 group-hover:underline">
                  {person.honorific ? `${person.honorific} ${person.fullName}` : person.fullName}
                </p>
                <p className="text-sm text-neutral-600">{person.position}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  {person.type === 'teacher' ? t('events.teacher') : t('events.staff')}
                  {person.department && ` · ${person.department.name}`}
                </p>
                {note && <p className="mt-2 text-sm text-neutral-700 italic">{note}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Photo when there is one, otherwise the person's initials */
function Avatar({ name, photoUrl }: { name: string; photoUrl?: string }) {
  if (photoUrl) {
    return (
      <img
        src={`${photoUrl}?tr=w-160`}
        alt=""
        className="h-16 w-16 shrink-0 object-cover object-top"
      />
    )
  }
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
  return (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center bg-neutral-900 font-serif text-xl font-semibold text-[#e8c27a]">
      {initials}
    </span>
  )
}
