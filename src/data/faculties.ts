import {
  BookOpenText,
  Calculator,
  Cog,
  Languages,
  Leaf,
  Scale,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

const IMAGE_BASE = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/'

/** ImageKit resizes on the fly, so large originals don't slow the page down */
const photo = (file: string) => `${IMAGE_BASE}${file}?tr=w-1200,q-80`

export interface Faculty {
  /** Texts live in src/i18n/locales/*.json under faculties.items.<id> */
  id: string
  icon: LucideIcon
  /** Without a photo the card shows the site's dark grid artwork and the icon */
  image?: string
  to: string
  /** Wide cards take two columns on large screens */
  wide?: boolean
}

export const faculties: Faculty[] = [
  {
    id: 'economics',
    icon: TrendingUp,
    image: photo('com.jpg'),
    to: '/faculties/economics',
    wide: true,
  },
  { id: 'foreignLanguages', icon: Languages, to: '/faculties/foreign-languages' },
  { id: 'arabic', icon: BookOpenText, to: '/faculties/arabic-language' },
  { id: 'natureLife', icon: Leaf, image: photo('sN.jpg'), to: '/faculties/nature-life-sciences' },
  { id: 'technical', icon: Cog, image: photo('st.jpg'), to: '/faculties/technical-sciences' },
  { id: 'mathCs', icon: Calculator, image: photo('IF.jpg'), to: '/faculties/math-cs', wide: true },
  { id: 'law', icon: Scale, to: '/faculties/law-political-sciences' },
]
