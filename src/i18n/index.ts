import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import ar from './locales/ar.json'
import en from './locales/en.json'
import fr from './locales/fr.json'

export const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'ar', label: 'العربية', short: 'ع' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    supportedLngs: languages.map((language) => language.code),
    fallbackLng: 'en',
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    // A visitor's choice is remembered; first visits follow the browser language
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

// Keep <html lang/dir>, the tab title and the meta description in step with the language
function applyDocumentLanguage() {
  const language = i18n.resolvedLanguage ?? 'en'
  document.documentElement.lang = language
  document.documentElement.dir = i18n.dir(language)
  document.title = i18n.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'))
}

applyDocumentLanguage()
i18n.on('languageChanged', applyDocumentLanguage)

export default i18n
