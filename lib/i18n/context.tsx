"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import en, { TranslationKey } from "./translations/en"
import hi from "./translations/hi"
import tr from "./translations/tr"

export type Locale = "en" | "hi" | "tr"

export const DEFAULT_LOCALE: Locale = "en"
export const SUPPORTED_LOCALES: Locale[] = ["en", "hi", "tr"]

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  hi,
  tr,
}

const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  tr: "Türkçe",
}

/** Extract locale from pathname: "/" → "en", "/hi" → "hi", "/tr/foo" → "tr" */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean)
  const firstSegment = segments[0] as Locale | undefined
  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    return firstSegment
  }
  return DEFAULT_LOCALE
}

/** Get the URL path for a given locale (for navigation) */
export function getLocalePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  locales: Locale[]
  getLocaleName: (locale: Locale) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = getLocaleFromPath(pathname)

  const [locale, setLocaleState] = useState<Locale>(currentLocale)

  // Sync locale from URL changes
  useEffect(() => {
    setLocaleState(currentLocale)
  }, [currentLocale])

  // Also update the <html lang="..."> attribute
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback(
    (newLocale: Locale) => {
      const path = getLocalePath(newLocale)
      router.push(path)
    },
    [router]
  )

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale]?.[key] ?? translations.en[key] ?? key
    },
    [locale]
  )

  const getLocaleName = useCallback((l: Locale) => localeNames[l], [])

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        locales: SUPPORTED_LOCALES,
        getLocaleName,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
