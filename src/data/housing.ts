import { unsplash } from '@/data/clubs'

export type HousingKind = 'residence' | 'restaurant'
export type HousingService =
  | 'wifi'
  | 'readingRoom'
  | 'sports'
  | 'prayer'
  | 'medical'
  | 'laundry'
  | 'transport'
  | 'dining'
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'ramadan'

export interface HousingEvent {
  /** Texts live under housing.items.<place>.events.<id> (title, text) */
  id: string
  date: string
  image: string
}

export interface HousingPlace {
  /** Texts live in src/i18n/locales/*.json under housing.items.<id> (name, summary, description, events) */
  id: string
  kind: HousingKind
  /** Residences only */
  gender?: 'women' | 'men'
  /** Beds for a residence, meals served a day for a restaurant */
  capacity: number
  services: HousingService[]
  /** Restaurants only: opening hours of each meal */
  meals?: { meal: 'breakfast' | 'lunch' | 'dinner'; from: string; to: string }[]
  image: string
  gallery: string[]
  events: HousingEvent[]
  facebook?: string
  instagram?: string
  /**
   * TODO: replace the sample content with real details.
   * 'partial': name, capacity and Facebook page are real, the rest is a sample
   * 'full': everything is a sample
   */
  sample?: 'partial' | 'full'
}

/** Price of a meal in every Algerian university restaurant, in dinars */
export const MEAL_PRICE_DZD = '1,20'

function place(
  data: Omit<HousingPlace, 'image' | 'gallery' | 'events'> & {
    photos: string[]
    events: { id: string; date: string; photo: number }[]
  },
): HousingPlace {
  const { photos, events, ...rest } = data
  return {
    ...rest,
    image: unsplash(photos[0]),
    gallery: photos.map((id) => unsplash(id, 1600)),
    events: events.map(({ photo, ...event }) => ({
      ...event,
      image: unsplash(photos[photo], 800),
    })),
  }
}

export const housingPlaces: HousingPlace[] = [
  place({
    // Real: name, 2000 beds and the official Facebook page (facebook.com/2000litsmila)
    id: 'women2000',
    kind: 'residence',
    gender: 'women',
    capacity: 2000,
    services: [
      'wifi',
      'readingRoom',
      'sports',
      'prayer',
      'medical',
      'laundry',
      'transport',
      'dining',
    ],
    photos: [
      '1641443084309-7b73be298683',
      '1632119289059-793dd347950f',
      '1522202176988-66273c2fd55f',
      '1460518451285-97b6aa326961',
      '1543269865-cbf427effbad',
    ],
    events: [
      { id: 'welcome', date: '2025-09-28', photo: 2 },
      { id: 'reading', date: '2025-03-20', photo: 3 },
      { id: 'womensDay', date: '2025-03-08', photo: 4 },
    ],
    facebook: 'https://www.facebook.com/2000litsmila/',
    sample: 'partial',
  }),
  place({
    id: 'men',
    kind: 'residence',
    gender: 'men',
    capacity: 1500,
    services: ['wifi', 'readingRoom', 'sports', 'prayer', 'medical', 'transport', 'dining'],
    photos: [
      '1790532487096-97b518eef180',
      '1555854877-bab0e564b8d5',
      '1523240795612-9a054b0db644',
      '1463620910506-d0458143143e',
      '1520881363902-a0ff4e722963',
    ],
    events: [
      { id: 'football', date: '2025-04-24', photo: 2 },
      { id: 'quran', date: '2025-03-10', photo: 4 },
      { id: 'welcome', date: '2024-09-29', photo: 3 },
    ],
    facebook: '#',
    sample: 'full',
  }),
  place({
    id: 'restaurant',
    kind: 'restaurant',
    capacity: 3000,
    services: ['breakfast', 'lunch', 'dinner', 'ramadan'],
    meals: [
      { meal: 'breakfast', from: '07:00', to: '08:30' },
      { meal: 'lunch', from: '11:30', to: '14:00' },
      { meal: 'dinner', from: '17:30', to: '19:30' },
    ],
    photos: [
      '1687709645238-0470ff08a6bf',
      '1670348060135-d4c6662b4138',
      '1545575950-59f935d6521c',
      '1597075561373-cf8898ec7290',
      '1706586348467-5c1593cd0aad',
    ],
    events: [
      { id: 'iftar', date: '2025-03-15', photo: 4 },
      { id: 'tasting', date: '2024-12-11', photo: 3 },
      { id: 'renovation', date: '2024-09-15', photo: 1 },
    ],
    facebook: '#',
    instagram: '#',
    sample: 'full',
  }),
]
