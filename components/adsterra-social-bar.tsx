/**
 * Adsterra Social Bar — site-wide floating unit (phase 1 of the monetization plan).
 *
 * Placement: Adsterra asks for the loader to sit immediately above the closing
 * `</body>` tag, so this is mounted as the LAST child of <body> in app/layout.tsx.
 * Keeping it in one component means the zone can be swapped without touching the
 * layout, and future zones (result-page native, in-content blog ad) can live here.
 *
 * Why a plain <script defer> rather than next/script or `async`:
 *  - `next/script` with afterInteractive never emits a real <script> element into
 *    the server HTML — it only ships a <link rel="preload"> and relies on React
 *    hydration to inject the tag. That hides the ad script from page source and
 *    silently drops the ad if hydration is slow or fails.
 *  - `async` makes the tag hoistable, so React moves it into <head> and the
 *    browser may run it before the DOM exists — not what "right above </body>"
 *    means, and it races the widget injection.
 *  - `defer` is the faithful equivalent of Adsterra's snippet: the browser still
 *    discovers it in the served HTML, it never blocks parsing, and it executes
 *    only after the document has been parsed, so the Social Bar has a DOM to
 *    attach to — with no Core Web Vitals cost.
 *
 * Production gate: dev/local runs would send impressions from one repetitive IP,
 * which ad networks flag as invalid traffic, so the loader is only emitted in
 * production builds. Test locally with `next build && next start`, or force it
 * with NEXT_PUBLIC_ENABLE_ADS=true.
 */

const SOCIAL_BAR_SRC =
  "https://pl28785396.profitableratecpmnetwork.com/84/aa/ea/84aaea76726afc96e2c7ab89ed4e2068.js"

const ENABLED =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_ENABLE_ADS === "true"

export function AdsterraSocialBar() {
  if (!ENABLED) return null

  return <script defer src={SOCIAL_BAR_SRC} data-adsterra="social-bar" />
}
