import { CalendarDays, FileCheck2, MonitorPlay, type LucideIcon } from 'lucide-react'

export type PlatformArt = 'documents' | 'learning' | 'schedule'

export interface Platform {
  /** Texts live in src/i18n/locales/*.json under platforms.<id> */
  id: 'documents' | 'elearning' | 'timetables'
  icon: LucideIcon
  /** Which illustration to draw at the top of the card */
  art: PlatformArt
  /** TODO: replace '#' with the real platform addresses */
  href: string
}

export const platforms: Platform[] = [
  { id: 'documents', icon: FileCheck2, art: 'documents', href: '#' },
  { id: 'elearning', icon: MonitorPlay, art: 'learning', href: 'https://elearning.univ-mila.dz/' },
  {
    id: 'timetables',
    icon: CalendarDays,
    art: 'schedule',
    href: 'https://edt.univ-mila.dz/starter/ar/index.php',
  },
]
