export type ClubField = 'science' | 'tech' | 'culture' | 'social' | 'sports'

export interface ClubEvent {
  /** Texts live under clubs.items.<club>.events.<id> (title, text) */
  id: string
  date: string
  image: string
}

export interface Club {
  /** Texts live in src/i18n/locales/*.json under clubs.items.<id>:
   * name, description, event, achievement, mission, goals[] and events */
  id: string
  field: ClubField
  /** Cover photo: one of the club's events */
  image: string
  /** Every photo shown in the profile gallery */
  gallery: string[]
  events: ClubEvent[]
  founded: number
  members: number
  /** Year of the best achievement */
  achievementYear: number
  facebook?: string
  instagram?: string
}

// TODO: SAMPLE CONTENT. Every club below is a placeholder (no notice is shown on the site):
// replace them with the real clubs, their photos, events and achievements.

export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`

/** Builds a club from Unsplash photo ids; the first photo is the cover */
function club(
  data: Omit<Club, 'image' | 'gallery' | 'events'> & {
    photos: string[]
    events: { id: string; date: string; photo: number }[]
  },
): Club {
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

export const clubs: Club[] = [
  club({
    id: 'robotics',
    field: 'science',
    photos: [
      '1581092333322-31d2fd38a35e',
      '1518314916381-77a37c2a49ae',
      '1612300857278-a9d36109d258',
      '1653566031536-4d1b6a9da15e',
      '1612338762643-298feee70520',
    ],
    events: [
      { id: 'workshop', date: '2025-03-12', photo: 0 },
      { id: 'challenge', date: '2024-11-20', photo: 1 },
      { id: 'openDay', date: '2024-05-08', photo: 3 },
    ],
    founded: 2019,
    members: 45,
    achievementYear: 2024,
    facebook: '#',
    instagram: '#',
  }),
  club({
    id: 'developers',
    field: 'tech',
    photos: [
      '1504384308090-c894fdcc538d',
      '1563461660947-507ef49e9c47',
      '1631350397792-8e0c2de5b637',
      '1731160807880-daf859b64420',
      '1637073849667-91120a924221',
    ],
    events: [
      { id: 'hackathon', date: '2025-02-21', photo: 0 },
      { id: 'bootcamp', date: '2024-10-14', photo: 2 },
      { id: 'talk', date: '2024-04-17', photo: 4 },
    ],
    founded: 2020,
    members: 120,
    achievementYear: 2025,
    facebook: '#',
    instagram: '#',
  }),
  club({
    id: 'astronomy',
    field: 'science',
    photos: [
      '1470955233021-2c79a52e5034',
      '1604728890708-631078e3eab7',
      '1698677364363-50cfadf64be7',
      '1615653058464-841639bb85ba',
      '1610457642191-05328cdf34ff',
    ],
    events: [
      { id: 'starNight', date: '2024-08-12', photo: 0 },
      { id: 'eclipse', date: '2024-04-08', photo: 3 },
      { id: 'observatory', date: '2023-11-25', photo: 2 },
    ],
    founded: 2021,
    members: 38,
    achievementYear: 2023,
    instagram: '#',
  }),
  club({
    id: 'theatre',
    field: 'culture',
    photos: [
      '1503095396549-807759245b35',
      '1514306191717-452ec28c7814',
      '1576724196706-3f23f51ea351',
      '1579539760267-b2e78d9d735e',
      '1558970439-add78fc68990',
    ],
    events: [
      { id: 'play', date: '2024-06-05', photo: 0 },
      { id: 'festival', date: '2024-03-27', photo: 2 },
      { id: 'dance', date: '2023-12-18', photo: 3 },
    ],
    founded: 2016,
    members: 30,
    achievementYear: 2024,
    facebook: '#',
  }),
  club({
    id: 'debate',
    field: 'culture',
    photos: [
      '1544531586-fde5298cdd40',
      '1544531585-f14f463149ec',
      '1492538368677-f6e0afe31dcc',
      '1603478804503-dc909c7f5ce5',
      '1571645163064-77faa9676a46',
    ],
    events: [
      { id: 'debateNight', date: '2025-04-09', photo: 0 },
      { id: 'tournament', date: '2025-01-30', photo: 2 },
      { id: 'training', date: '2024-10-22', photo: 3 },
    ],
    founded: 2022,
    members: 55,
    achievementYear: 2025,
    facebook: '#',
    instagram: '#',
  }),
  club({
    id: 'volunteering',
    field: 'social',
    photos: [
      '1593113598332-cd288d649433',
      '1628717341663-0007b0ee2597',
      '1652971876875-05db98fab376',
      '1461532257246-777de18cd58b',
      '1559027615-cd4628902d4a',
    ],
    events: [
      { id: 'ramadan', date: '2024-03-15', photo: 0 },
      { id: 'cleanup', date: '2024-09-21', photo: 2 },
      { id: 'blood', date: '2023-12-05', photo: 1 },
    ],
    founded: 2018,
    members: 150,
    achievementYear: 2024,
    facebook: '#',
  }),
  club({
    id: 'football',
    field: 'sports',
    photos: [
      '1489358921548-9b3f69a1eb4a',
      '1598881034666-6d3443d4b1bc',
      '1641159009736-8a5fd4e52fef',
      '1630816386507-d265dca65670',
      '1663565197860-eee65f0b3f3c',
    ],
    events: [
      { id: 'final', date: '2023-05-18', photo: 0 },
      { id: 'tournament', date: '2024-02-10', photo: 2 },
      { id: 'friendly', date: '2024-11-02', photo: 3 },
    ],
    founded: 2012,
    members: 25,
    achievementYear: 2023,
    facebook: '#',
    instagram: '#',
  }),
]
