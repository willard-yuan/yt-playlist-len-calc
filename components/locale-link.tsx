"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { forwardRef, type ReactNode } from "react"
import {
  type Locale,
  DEFAULT_LOCALE,
  localeBasePath,
  getLocaleFromPath,
} from "@/lib/i18n/dictionary"

/**
 * Internal route segments that have locale-aware ([locale]) variants.
 * Links to any other internal path (e.g. /tools-you-may-also-like, /llms.txt,
 * static files) are intentionally left at their root (English) form so they
 * never 404. Keep this list in sync with the [locale] routes that exist.
 */
const LOCALE_AWARE_SEGMENTS = new Set<string>([
  "about",
  "contact",
  "privacy",
  "terms",
  "changelog",
  "blog",
  "guides",
  "youtube-playlist-exporter",
  "youtube-playlist-randomizer",
])

function isExternal(href: string): boolean {
  return (
    /^(https?:)?\/\//.test(href) ||
    /^mailto:/i.test(href) ||
    /^tel:/i.test(href) ||
    href.startsWith("#") ||
    href.startsWith("//")
  )
}

function shouldPrefix(href: string): boolean {
  if (!href.startsWith("/")) return false
  const path = href.split(/[?#]/)[0]
  if (path === "" || path === "/") return true // home
  const firstSegment = path.split("/").filter(Boolean)[0] ?? ""
  // Static files carry a dot in the first segment (llms.txt, sitemap.xml...).
  if (firstSegment.includes(".")) return false
  return LOCALE_AWARE_SEGMENTS.has(firstSegment)
}

export interface LocaleLinkProps extends LinkProps {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
}

/**
 * Drop-in replacement for next/link that keeps the current locale context when
 * navigating between internal pages. On a /zh/... page, an internal link to
 * "/blog" becomes "/zh/blog"; on the English root it stays "/blog". External
 * links, anchors and non-localized internal paths are passed through untouched.
 */
export const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  function LocaleLink({ href, children, className, ...rest }, ref) {
    const pathname = usePathname() ?? "/"
    const locale = getLocaleFromPath(pathname)

    let finalHref = href
    if (!isExternal(href) && shouldPrefix(href)) {
      // Guard: if href already carries a locale, never double-prefix.
      const hrefLocale = getLocaleFromPath(href)
      if (hrefLocale === DEFAULT_LOCALE) {
        finalHref =
          locale === DEFAULT_LOCALE
            ? href
            : `${localeBasePath(locale)}${href === "/" ? "" : href}`
      }
    }

    return (
      <Link ref={ref} href={finalHref} className={className} {...rest}>
        {children}
      </Link>
    )
  }
)
