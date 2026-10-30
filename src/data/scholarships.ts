export type ScholarshipLevel = 'licence' | 'master' | 'phd' | 'training' | 'exchange' | 'staff'
export type ScholarshipStatus = 'open' | 'upcoming' | 'closed'

export interface Scholarship {
  /** Texts live in src/i18n/locales/*.json under scholarships.items.<id> */
  id: string
  /** ISO 3166 country code, shown with its name in the visitor's language */
  country?: string
  levels?: ScholarshipLevel[]
  /** Date the university announced the offer (YYYY-MM-DD) */
  published: string
  /** Applications open on this date; before it the offer is "upcoming" */
  opens?: string
  /** Last day to apply, when the announcement gives one */
  deadline?: string
  /** Standing programmes that stay open all year */
  ongoing?: boolean
  /** The announcement on the university website */
  link: string
}

const post = (id: number) => `https://www.univ-mila.dz/?p=${id}`

// Offers without a deadline are treated as closed one year after they were announced
const NO_DEADLINE_LIFETIME_DAYS = 365

export function scholarshipStatus(item: Scholarship, today = new Date()): ScholarshipStatus {
  if (item.ongoing) return 'open'
  const day = today.toISOString().slice(0, 10)
  if (item.opens && day < item.opens) return 'upcoming'
  if (item.deadline) return day <= item.deadline ? 'open' : 'closed'
  const expires = new Date(item.published)
  expires.setDate(expires.getDate() + NO_DEADLINE_LIFETIME_DAYS)
  return today <= expires ? 'open' : 'closed'
}

// Source: the "Scholarships" category of univ-mila.dz (?cat=251), newest first
export const scholarships: Scholarship[] = [
  {
    id: 'erasmus',
    levels: ['exchange', 'master', 'phd', 'staff'],
    published: '2025-02-25',
    ongoing: true,
    link: 'https://www.univ-mila.dz/?page_id=30708',
  },
  {
    id: 'mexico',
    country: 'MX',
    levels: ['master', 'phd'],
    published: '2025-09-10',
    link: post(32372),
  },
  {
    id: 'ethiopia',
    country: 'ET',
    levels: ['training'],
    published: '2025-08-18',
    link: post(32286),
  },
  { id: 'brazil', country: 'BR', levels: ['licence'], published: '2025-08-18', link: post(32283) },
  { id: 'vietnam', country: 'VN', published: '2024-07-18', link: post(27371) },
  {
    id: 'colombia',
    country: 'CO',
    levels: ['master', 'phd'],
    published: '2024-05-15',
    deadline: '2024-06-09',
    link: post(26195),
  },
  {
    id: 'insubria',
    country: 'IT',
    levels: ['licence', 'master'],
    published: '2024-05-12',
    deadline: '2024-05-31',
    link: post(26069),
  },
  { id: 'unoosa', levels: ['master'], published: '2023-12-27', link: post(24518) },
  { id: 'southAfrica', country: 'ZA', levels: ['phd'], published: '2023-12-27', link: post(24519) },
  {
    id: 'hungary2024',
    country: 'HU',
    levels: ['master', 'phd'],
    published: '2023-12-12',
    link: post(24362),
  },
  {
    id: 'china2024',
    country: 'CN',
    levels: ['master', 'phd'],
    published: '2023-12-11',
    // The announcement says 25 January 2023, a typo for 2024 (it was posted in December 2023)
    deadline: '2024-01-25',
    link: post(24318),
  },
  {
    id: 'indiaStaff',
    country: 'IN',
    levels: ['staff'],
    published: '2023-08-05',
    link: post(22952),
  },
  { id: 'romania2023', country: 'RO', published: '2023-04-24', link: post(21538) },
  {
    id: 'indonesiaMaulana',
    country: 'ID',
    levels: ['licence', 'master', 'phd'],
    published: '2023-04-23',
    link: post(21533),
  },
  {
    id: 'hungaryFao',
    country: 'HU',
    levels: ['master'],
    published: '2023-02-16',
    deadline: '2023-02-28',
    link: post(20931),
  },
  {
    id: 'indiaIccr',
    country: 'IN',
    published: '2023-02-16',
    opens: '2023-02-20',
    link: post(20926),
  },
  {
    id: 'indonesiaUnsika',
    country: 'ID',
    levels: ['licence'],
    published: '2022-06-08',
    link: post(18537),
  },
  { id: 'malaysia', country: 'MY', levels: ['phd'], published: '2022-06-03', link: post(18526) },
  {
    id: 'tunisia',
    country: 'TN',
    levels: ['exchange'],
    published: '2022-04-28',
    link: post(18331),
  },
  {
    id: 'serbia',
    country: 'RS',
    levels: ['master', 'phd'],
    published: '2022-02-12',
    // Deadline extended from 20 January 2022
    deadline: '2022-02-15',
    link: post(17984),
  },
  {
    id: 'egyptJapan',
    country: 'EG',
    levels: ['master', 'phd'],
    published: '2022-02-07',
    link: post(17948),
  },
  { id: 'renmin', country: 'CN', levels: ['master'], published: '2022-02-07', link: post(17945) },
  {
    id: 'azerbaijan',
    country: 'AZ',
    levels: ['master', 'phd'],
    published: '2022-01-17',
    deadline: '2022-02-20',
    link: post(17801),
  },
  { id: 'mauritius', country: 'MU', published: '2022-01-13', link: post(17783) },
  { id: 'romania2022', country: 'RO', published: '2022-01-10', link: post(17774) },
  {
    id: 'turkey',
    country: 'TR',
    levels: ['licence', 'master', 'phd'],
    published: '2022-01-10',
    link: post(17772),
  },
  { id: 'japan', country: 'JP', levels: ['training'], published: '2022-01-05', link: post(17760) },
]
