import {
  Building2,
  ClipboardList,
  Crown,
  Globe2,
  GraduationCap,
  Library,
  Microscope,
  Scale,
  ServerCog,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import { faculties } from './faculties'

// Organisation chart following the standard structure of Algerian universities
// (Executive Decree No. 03-279 of 23 August 2003). Texts are under structure.* in the locale files.
// Check the vice-rectorates and common services against the university's current organisation.

export interface StructureNode {
  id: string
  icon: LucideIcon
  href?: string
}

export const rectorNode: StructureNode = { id: 'rector', icon: Crown, href: '/rectorate/address' }

/** Councils that decide or advise alongside the rector */
export const councils: StructureNode[] = [
  { id: 'board', icon: Scale },
  { id: 'scientificCouncil', icon: Microscope },
]

export const administration: StructureNode[] = [
  { id: 'vrTeaching', icon: GraduationCap, href: '/rectorate/vice-rector-higher-education' },
  { id: 'vrResearch', icon: Microscope },
  { id: 'vrRelations', icon: Globe2 },
  { id: 'vrDevelopment', icon: TrendingUp },
  { id: 'secretariat', icon: ClipboardList, href: '/rectorate/general-secretariat' },
]

export const facultyNodes = faculties.map((faculty) => ({ id: faculty.id, href: faculty.to }))

export const library: StructureNode = { id: 'library', icon: Library }

export const commonServices: StructureNode[] = [
  { id: 'computing', icon: ServerCog, href: '/centers/computing' },
  { id: 'quality', icon: ShieldCheck, href: '/centers/quality' },
  { id: 'incubator', icon: Lightbulb },
]

export const FACULTIES_ICON = Building2
