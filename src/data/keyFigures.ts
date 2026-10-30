import {
  FileText,
  GraduationCap,
  Presentation,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export interface KeyFigure {
  value: number
  /** Shown after the number, e.g. "+" */
  suffix?: string
  /** Translation key for the label under the number */
  labelKey: string
  icon: LucideIcon
}

export const keyFigures: KeyFigure[] = [
  { value: 533, labelKey: 'figures.teachers', icon: Presentation },
  { value: 10820, labelKey: 'figures.students', icon: Users },
  { value: 86685, labelKey: 'figures.studentsSince2008', icon: GraduationCap },
  { value: 100, labelKey: 'figures.programs', icon: Workflow },
  { value: 500, suffix: '+', labelKey: 'figures.publications', icon: FileText },
]
