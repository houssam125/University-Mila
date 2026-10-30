import {
  BookOpen,
  Building2,
  Calculator,
  CalendarDays,
  Cog,
  Cpu,
  Factory,
  FlaskConical,
  GraduationCap,
  History,
  Info,
  Landmark,
  MessageSquare,
  Network,
  Presentation,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'

// Background-free version of the university logo, served from /public
export const LOGO_URL = '/logo.png'

export const MENU_BACKGROUND_URL = 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/et.jpeg'

export interface NavItem {
  /** Translation key, e.g. 'nav.overview' */
  labelKey: string
  icon: LucideIcon
  to?: string
  children?: NavItem[]
}

export interface NavCategory {
  labelKey: string
  /** Small uppercase heading shown above this category's column */
  sectionLabelKey: string
  items: NavItem[]
}

// Main categories: open a second (and sometimes third) column in the menu
export const navCategories: NavCategory[] = [
  {
    labelKey: 'nav.university',
    sectionLabelKey: 'nav.university',
    items: [
      {
        labelKey: 'nav.overview',
        icon: Info,
        children: [
          { labelKey: 'nav.about', icon: BookOpen, to: '/university/about' },
          { labelKey: 'nav.history', icon: History, to: '/university/history' },
          { labelKey: 'nav.mission', icon: Target, to: '/university/mission' },
        ],
      },
      {
        labelKey: 'nav.rectorate',
        icon: Landmark,
        children: [
          { labelKey: 'nav.rectorAddress', icon: MessageSquare, to: '/rectorate/address' },
          {
            labelKey: 'nav.viceRector',
            icon: GraduationCap,
            to: '/rectorate/vice-rector-higher-education',
          },
          { labelKey: 'nav.secretariat', icon: ScrollText, to: '/rectorate/general-secretariat' },
        ],
      },
      {
        labelKey: 'nav.centers',
        icon: Network,
        children: [
          { labelKey: 'nav.computingCenter', icon: ServerCog, to: '/centers/computing' },
          { labelKey: 'nav.qualityCell', icon: ShieldCheck, to: '/centers/quality' },
        ],
      },
    ],
  },
  {
    labelKey: 'nav.programs',
    sectionLabelKey: 'nav.programsSection',
    items: [
      { labelKey: 'nav.mathCs', icon: Calculator, to: '/programs/math-cs' },
      { labelKey: 'nav.technicalSciences', icon: Cog, to: '/programs/technical-sciences' },
      { labelKey: 'nav.economics', icon: TrendingUp, to: '/programs/economics' },
    ],
  },
  {
    labelKey: 'nav.faculties',
    sectionLabelKey: 'nav.faculties',
    items: [
      { labelKey: 'nav.facultyMathCs', icon: Cpu, to: '/faculties/math-cs' },
      { labelKey: 'nav.facultyTech', icon: Factory, to: '/faculties/tech-sciences' },
    ],
  },
]

// Direct links listed under the main categories
export const navLinks: NavItem[] = [
  { labelKey: 'nav.labs', icon: FlaskConical, to: '/research-labs' },
  { labelKey: 'nav.teachers', icon: Presentation, to: '/teachers' },
  { labelKey: 'nav.clubs', icon: Users, to: '/clubs' },
  { labelKey: 'nav.housing', icon: Building2, to: '/housing' },
  { labelKey: 'nav.events', icon: CalendarDays, to: '/events' },
]
