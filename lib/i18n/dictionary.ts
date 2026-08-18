// Server-safe i18n primitives (no "use client"): usable from both server and
// client components without pulling the client I18nProvider bundle.
import en, { TranslationKey } from "./translations/en"
import hi from "./translations/hi"
import tr from "./translations/tr"

export type Locale = "en" | "hi" | "tr"
export const DEFAULT_LOCALE: Locale = "en"
export const SUPPORTED_LOCALES: Locale[] = ["en", "hi", "tr"]

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  hi,
  tr,
}

/** Extract locale from pathname: "/" → "en", "/hi" → "hi", "/hi/foo" → "hi" */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean)
  const firstSegment = segments[0] as Locale | undefined
  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    return firstSegment
  }
  return DEFAULT_LOCALE
}

/** Get the URL path for a given locale (for navigation): en → "/", hi → "/hi" */
export function getLocalePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`
}

/** Locale-aware base path used to prefix internal links: en → "", hi → "/hi" */
export function localeBasePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`
}

/** Server-safe translator bound to a locale. Falls back to en, then the key. */
export function getT(locale: Locale) {
  const dict = translations[locale] ?? translations[DEFAULT_LOCALE]
  return (key: TranslationKey): string =>
    dict[key] ?? translations[DEFAULT_LOCALE][key] ?? key
}
