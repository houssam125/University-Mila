import { Home, Library, Trophy, Users, type LucideIcon } from 'lucide-react'

export interface StudentLifeItem {
  /** Texts live in src/i18n/locales/*.json under studentLife.items.<id> */
  id: 'library' | 'scholarships' | 'clubs' | 'housing'
  icon: LucideIcon
  href: string
  /** Opens another website in a new tab */
  external?: boolean
  /** Wide cards take two columns on large screens */
  wide?: boolean
  /** The featured card uses the dark style */
  featured?: boolean
}

export const studentLife: StudentLifeItem[] = [
  {
    id: 'library',
    icon: Library,
    href: 'https://doc.univ-mila.dz/',
    external: true,
    wide: true,
    featured: true,
  },
  { id: 'scholarships', icon: Trophy, href: '/scholarships' },
  { id: 'clubs', icon: Users, href: '/clubs' },
  { id: 'housing', icon: Home, href: '/housing', wide: true },
]
