import type { LanguageCode } from '@/i18n'

// Dates follow the visitor's language, always with Western digits (as used in Algeria)
const DATE_LOCALES: Record<LanguageCode, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
  ar: 'ar-DZ-u-nu-latn',
}

// Events happen in Algeria, so show their local time whatever the visitor's timezone
const TIME_ZONE = 'Africa/Algiers'

/** e.g. "21 October 2026" */
export function formatLongDate(date: string, language: LanguageCode) {
  return new Date(date).toLocaleDateString(DATE_LOCALES[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: TIME_ZONE,
  })
}

/** e.g. "09:00" */
export function formatTime(date: string, language: LanguageCode) {
  return new Date(date).toLocaleTimeString(DATE_LOCALES[language], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  })
}

/** Day, short month and year for the date block on event cards */
export function dateParts(date: string, language: LanguageCode) {
  const value = new Date(date)
  const format = (options: Intl.DateTimeFormatOptions) =>
    value.toLocaleDateString(DATE_LOCALES[language], { ...options, timeZone: TIME_ZONE })
  return {
    day: format({ day: '2-digit' }),
    month: format({ month: 'short' }),
    year: format({ year: 'numeric' }),
  }
}

/** "21 – 22 October 2026", "18 May 2026", or "21 October 2026, 09:00 – 17:00" */
export function formatEventRange(
  start: string,
  end: string,
  allDay: boolean,
  language: LanguageCode,
) {
  const startDay = formatLongDate(start, language)
  const endDay = formatLongDate(end, language)
  if (startDay !== endDay) return `${startDay} – ${endDay}`
  if (allDay) return startDay
  return `${startDay}, ${formatTime(start, language)} – ${formatTime(end, language)}`
}
