export { I18nProvider, useI18n, getLocaleFromPath, getLocalePath, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./context"
export type { Locale } from "./context"
export type { TranslationKey } from "./translations/en"
// Server-safe primitives (no client bundle) for use in server components / route handlers.
export { getT, localeBasePath, translations, LOCALE_META, LOCALE_PATH_RE } from "./dictionary"
