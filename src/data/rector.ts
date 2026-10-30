// The rector's name, bio and degrees are translated in src/i18n/locales/*.json under "rector"
export const rector = {
  photoUrl: 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/directeur.jpg',
  // The rector's biography (PDF) on the official university website
  addressLink:
    'https://www.univ-mila.dz/wp-content/uploads/2024/10/Rec-A-Bouchelagham-English-biography.pdf',
}

export interface RectorDegree {
  year: string
  title: string
  institution: string
}
