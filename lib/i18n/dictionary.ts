// Server-safe i18n primitives (no "use client"): usable from both server and
// client components without pulling the client I18nProvider bundle.
import en, { TranslationKey } from "./translations/en"
import hi from "./translations/hi"
import tr from "./translations/tr"
import zh from "./translations/zh"
import zhHant from "./translations/zh-Hant"
import es from "./translations/es"
import fr from "./translations/fr"
import de from "./translations/de"
import ar from "./translations/ar"
import id from "./translations/id"
import fil from "./translations/fil"
import ru from "./translations/ru"
import pl from "./translations/pl"
import nl from "./translations/nl"
import vi from "./translations/vi"
import ja from "./translations/ja"
import pt from "./translations/pt"
import it from "./translations/it"
import th from "./translations/th"
import ko from "./translations/ko"
import sv from "./translations/sv"
import he from "./translations/he"
import { GENERATED_LOCALE_META } from "./locale-meta"

export type Locale =
  | "en" | "hi" | "tr" | "zh" | "zh-Hant" | "es" | "fr" | "de"
  | "ar" | "id" | "fil" | "ru" | "pl" | "nl" | "vi" | "ja"
  | "pt" | "it" | "th" | "ko" | "sv" | "he"

export const DEFAULT_LOCALE: Locale = "en"
export const SUPPORTED_LOCALES: Locale[] = [
  "en", "hi", "tr", "zh", "zh-Hant", "es", "fr", "de",
  "ar", "id", "fil", "ru", "pl", "nl", "vi", "ja",
  "pt", "it", "th", "ko", "sv", "he",
]

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en, hi, tr, zh, "zh-Hant": zhHant, es, fr, de,
  ar, id, fil, ru, pl, nl, vi, ja,
  pt, it, th, ko, sv, he,
}

export type Direction = "ltr" | "rtl"

export interface LocaleMeta {
  /** English name (used for the <html lang> / debugging). */
  name: string
  /** Endonym — the language's name in its own language (used by the switcher). */
  nativeName: string
  flag: string
  dir: Direction
  /** OpenGraph locale code, e.g. "en_US", "ar_AR". */
  ogLocale: string
  /** Translated homepage SEO title. */
  title: string
  /** Translated homepage SEO description. */
  description: string
}

// en / hi / tr meta is hand-maintained (their homepage copy was written by
// hand); the other 19 locales come from the generated file.
const BASE_META: Record<"en" | "hi" | "tr", LocaleMeta> = {
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    dir: "ltr",
    ogLocale: "en_US",
    title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
    description:
      "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
  },
  hi: {
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    dir: "ltr",
    ogLocale: "hi_IN",
    title: "YTPlaylistLength - यूट्यूब प्लेलिस्ट लंबाई कैलकुलेटर",
    description:
      "किसी भी यूट्यूब प्लेलिस्ट की कुल लंबाई की तुरंत गणना करें। प्लेलिस्ट URL पेस्ट करें और सभी वीडियो देखने में कितना समय लगेगा, यह तुरंत जानें।",
  },
  tr: {
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    dir: "ltr",
    ogLocale: "tr_TR",
    title: "YTPlaylistLength - YouTube Çalma Listesi Süre Hesaplayıcı",
    description:
      "Herhangi bir YouTube çalma listesinin toplam süresini anında hesaplayın. Çalma listesi URL'sini yapıştırın ve tüm videoları izlemenin ne kadar süreceğini hemen görün.",
  },
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  ...BASE_META,
  ...(GENERATED_LOCALE_META as Record<
    Exclude<Locale, "en" | "hi" | "tr">,
    LocaleMeta
  >),
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

/** RegExp matching a leading locale segment for any supported locale. */
export const LOCALE_PATH_RE = new RegExp(
  `^\\/(${SUPPORTED_LOCALES.join("|")})(?=\\/|$)`
)
