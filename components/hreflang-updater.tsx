"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { getLocaleFromPath, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/lib/i18n"

const SITE_URL = "https://ytplaylistlength.pro"

/** Check if current path is a homepage (root or locale homepage like /hi, /tr) */
function isHomepage(pathname: string): boolean {
  return pathname === "/" || /^\/(hi|tr)\/?$/.test(pathname)
}

/** Dynamically injects hreflang link tags into <head> based on the current URL locale.
 *  Only active on homepage URLs — other pages don't have localized variants. */
export function HreflangUpdater() {
  const pathname = usePathname()

  useEffect(() => {
    // Always remove previously injected dynamic hreflang tags
    document.querySelectorAll("link[data-hreflang-dynamic], meta[data-hreflang-dynamic]").forEach((el) => el.remove())

    // Only inject hreflang on homepage URLs
    if (!isHomepage(pathname)) return

    const locale = getLocaleFromPath(pathname)
    const currentUrl = locale === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}/${locale}`

    const head = document.head
    const fragment = document.createDocumentFragment()

    // Add hreflang for each supported locale
    SUPPORTED_LOCALES.forEach((l) => {
      const link = document.createElement("link")
      link.rel = "alternate"
      link.hreflang = l
      link.href = l === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}/${l}`
      link.dataset.hreflangDynamic = "true"
      fragment.appendChild(link)
    })

    // Add x-default
    const xDefault = document.createElement("link")
    xDefault.rel = "alternate"
    xDefault.hreflang = "x-default"
    xDefault.href = SITE_URL
    xDefault.dataset.hreflangDynamic = "true"
    fragment.appendChild(xDefault)

    // Add canonical
    const canonical = document.createElement("link")
    canonical.rel = "canonical"
    canonical.href = currentUrl
    canonical.dataset.hreflangDynamic = "true"
    fragment.appendChild(canonical)

    // Add og:locale meta
    const ogLocale = document.createElement("meta")
    ogLocale.setAttribute("property", "og:locale")
    const ogLocaleMap: Record<string, string> = { en: "en_US", hi: "hi_IN", tr: "tr_TR" }
    ogLocale.content = ogLocaleMap[locale] || "en_US"
    ogLocale.dataset.hreflangDynamic = "true"
    fragment.appendChild(ogLocale)

    head.appendChild(fragment)
  }, [pathname])

  return null
}
