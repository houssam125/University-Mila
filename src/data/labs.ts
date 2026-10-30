import type { Faculty } from '@/data/faculties'

export interface ResearchLab {
  /** Texts live in src/i18n/locales/*.json under labs.items.<id> */
  id: 'lsnm' | 'lmti' | 'lisi' | 'esdedd' | 'ldac' | 'lasl' | 'eetlab'
  faculty: Faculty['id']
  acronym: string
  /** Year the ministry accredited the laboratory */
  accredited: number
  teams: number
  /** Labs without their own website point to the university site */
  website?: string
}

// Source: univ-mila.dz/?page_id=574 (research laboratories of the University of Mila)
export const UNIVERSITY_WEBSITE = 'https://www.univ-mila.dz/?page_id=574'

export const researchLabs: ResearchLab[] = [
  {
    id: 'eetlab',
    faculty: 'technical',
    acronym: 'EE&TLab',
    accredited: 2024,
    teams: 4,
    website: 'https://eetlab.univ-mila.dz/',
  },
  { id: 'lasl', faculty: 'arabic', acronym: 'LASL', accredited: 2023, teams: 6 },
  { id: 'ldac', faculty: 'arabic', acronym: 'LDAC', accredited: 2021, teams: 4 },
  {
    id: 'lisi',
    faculty: 'mathCs',
    acronym: 'LISI',
    accredited: 2024,
    teams: 4,
    website: 'https://lisi.univ-mila.dz/',
  },
  {
    id: 'lmti',
    faculty: 'mathCs',
    acronym: 'LMTI',
    accredited: 2012,
    teams: 5,
    website: 'https://lmti.univ-mila.dz/',
  },
  { id: 'lsnm', faculty: 'natureLife', acronym: 'LSNM', accredited: 2012, teams: 7 },
  { id: 'esdedd', faculty: 'economics', acronym: 'ESDEDD', accredited: 2018, teams: 4 },
]
