"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { TranslationKey } from "./translations/en"
import {
  type Locale,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  translations,
  getLocaleFromPath,
  getLocalePath,
} from "./dictionary"

export type { Locale } from "./dictionary"
export { DEFAULT_LOCALE, SUPPORTED_LOCALES, getLocaleFromPath, getLocalePath } from "./dictionary"

const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  tr: "Türkçe",
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
