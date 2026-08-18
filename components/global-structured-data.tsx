"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useI18n, getLocaleFromPath, DEFAULT_LOCALE } from "@/lib/i18n"

const SITE_URL = "https://ytplaylistlength.pro"

/**
 * Localizes the global WebSite + SoftwareApplication JSON-LD for non-English
 * locales. The English version is rendered server-side in the root layout
 * (marked data-global="true"); for hi/tr we strip it and inject the localized
 * equivalent so the structured data matches the page language.
 *
 * For en we keep the SSR block untouched (only cleaning up a stale injected
 * copy) to preserve server-rendered structured data for crawlers.
 */
export function GlobalStructuredData() {
  const { t } = useI18n()
  const pathname = usePathname()

  useEffect(() => {
    const locale = getLocaleFromPath(pathname)

    if (locale === DEFAULT_LOCALE) {
      // Keep the SSR-rendered global JSON-LD; drop any stale injected copy.
      document
        .querySelectorAll('script[data-global="true"][data-injected="true"]')
        .forEach((el) => el.remove())
      return
    }

    // Remove the English SSR block and any previously injected copy.
    document
      .querySelectorAll('script[data-global="true"]')
      .forEach((el) => el.remove())

    const blocks = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: t("jsonld.website.name"),
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?url={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: t("jsonld.app.name"),
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ]

    const head = document.head
    const fragment = document.createDocumentFragment()
    blocks.forEach((block) => {
      const s = document.createElement("script")
      s.type = "application/ld+json"
      s.dataset.global = "true"
      s.dataset.injected = "true"
      s.textContent = JSON.stringify(block)
      fragment.appendChild(s)
    })
    head.appendChild(fragment)
  }, [pathname, t])

  return null
}
