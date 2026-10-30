// The rector's name, bio and degrees are translated in src/i18n/locales/*.json under "rector"
export const rector = {
  photoUrl: 'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/directeur.jpg',
  addressLink: '/rectorate/address',
}

export interface RectorDegree {
  year: string
  title: string
  institution: string
}
