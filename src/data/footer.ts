import {
  CalendarDays,
  Database,
  FlaskConical,
  Landmark,
  Laptop,
  Network,
  type LucideIcon,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { BOUSSOUF_PATH } from './boussouf'

export interface FooterLink {
  /** Translation key under footer.links */
  key: string
  href: string
  icon?: LucideIcon
  external?: boolean
}

// Official accounts, as linked from the university website (univ-mila.dz), checked October 2026
export const socialLinks: { label: string; href: string; icon: IconType }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/univmila', icon: FaFacebookF },
  { label: 'X', href: 'https://x.com/univmila', icon: FaXTwitter },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC9--lQO1WBvXm38B70e9u5w',
    icon: FaYoutube,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/universite-de-mila',
    icon: FaLinkedinIn,
  },
  { label: 'Instagram', href: 'https://www.instagram.com/universitedemila', icon: FaInstagram },
]

// University platforms. TODO: replace '#' with their addresses
export const quickLinks: FooterLink[] = [
  {
    key: 'distanceLearning',
    href: 'https://elearning.univ-mila.dz/',
    icon: Laptop,
    external: true,
  },
  { key: 'dspace', href: '#', icon: Database, external: true },
  {
    key: 'timetable',
    href: 'https://edt.univ-mila.dz/starter/ar/index.php',
    icon: CalendarDays,
    external: true,
  },
]

export const relatedLinks: FooterLink[] = [
  { key: 'ministry', href: 'https://www.mesrs.dz', icon: Landmark, external: true },
  { key: 'cerist', href: 'https://www.cerist.dz', icon: FlaskConical, external: true },
  { key: 'arn', href: 'https://www.arn.dz', icon: Network, external: true },
]

export const sitePages: FooterLink[] = [
  { key: 'home', href: '/' },
  { key: 'structure', href: '/university/structure' },
  { key: 'boussouf', href: BOUSSOUF_PATH },
  { key: 'events', href: '/events' },
  { key: 'teachers', href: '/teachers' },
  { key: 'clubs', href: '/clubs' },
  { key: 'labs', href: '/research-labs' },
  { key: 'scholarships', href: '/scholarships' },
  { key: 'housing', href: '/housing' },
]

// Official contact details, as published on the university's Facebook page
export const contact = {
  phone: '031 45 00 45',
  phoneHref: 'tel:+21331450045',
  email: 'admin.site@centre-univ-mila.dz',
}

const MAP_QUERY = 'Université Abdelhafid Boussouf, Mila, Algérie'

export const map = {
  embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`,
  openUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
}
