/**
 * Adsterra 300x250 banner — replaces the Social Bar.
 *
 * WHAT THE LOADER ACTUALLY REQUIRES (reverse-engineered from
 * https://www.highrevenueformat.com/<key>/invoke.js, de-obfuscated)
 * ---------------------------------------------------------------
 * Entry point:
 *   if (window.atOptions is an object)      -> use it, then `delete window.atOptions`
 *   else if (window.atAsyncOptions is [])  -> splice entries one by one
 *
 * Render branch (this is the one that decides everything):
 *   if (typeof opts.height !== 'undefined' && typeof opts.width !== 'undefined') {
 *       // iframe mode — what a 300x250 banner uses
 *       UA(uuid => { iframe.src = IU + '&uuid=' + uuid })
 *       if (!opts.async) Ir(iframe);                              // insert next to the script tag
 *       else document.getElementById(opts.container)?.appendChild(iframe);
 *   } else {
 *       // 'js'/native mode — container id defaults to `atContainer-<key>`
 *   }
 *
 * Two consequences, both of which bite in React:
 *  1. `container` IS REQUIRED in async iframe mode. Without it the loader does
 *     `getElementById(undefined)` -> null -> the iframe is created, never
 *     appended, and NOTHING renders. No error, no request, no warning. This is
 *     the single most common "Adsterra active but invisible" failure.
 *  2. `atOptions` is a single global, so only one unit per page can use it
 *     (use the `atAsyncOptions` array if you ever need several).
 *
 * We therefore mount the ad client-side into a container div whose id we hand
 * to the loader via `opts.container`, and we set `async: true` so the loader
 * appends its iframe into that container instead of doing script-relative DOM
 * surgery. No document.write anywhere, so the page can never be blanked.
 *
 * Constraints to keep if you extend this file
 * -------------------------------------------
 * - ONE unit per page (`atOptions` is global). See note above.
 * - The container has a fixed 300x250 box so the ad cannot cause layout shift.
 * - Idempotent: React StrictMode double-effects and client re-mounts must not
 *   inject a second loader.
 * - Production-only: one repetitive local IP is recorded as invalid traffic by
 *   ad networks. Verify with `next build && next start`, or force it locally
 *   with NEXT_PUBLIC_ENABLE_ADS=true.
 */

"use client"

import { useEffect, useId, useRef } from "react"

export const ADSTERRA_BANNER_KEY = "b0c4c5ffda749402130eb046a2c46160"

const BANNER_WIDTH = 300
const BANNER_HEIGHT = 250
const LOADER_SRC = `https://www.highrevenueformat.com/${ADSTERRA_BANNER_KEY}/invoke.js`

const ENABLED =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_ENABLE_ADS === "true"

/** Marker written to the container so a re-mount cannot inject a second loader. */
const MOUNT_FLAG = "mounted"

export function AdsterraBanner({
  className = "",
  showLabel = true,
}: {
  className?: string
  showLabel?: boolean
}) {
  const hostRef = useRef<HTMLDivElement>(null)

  // Stable per-instance id. React's raw useId contains ":" which is legal in an
  // HTML id but awkward if anything ever builds a selector from it, so strip it.
  const rawId = useId()
  const containerId = `atContainer-${ADSTERRA_BANNER_KEY.slice(0, 8)}-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`

  useEffect(() => {
    if (!ENABLED) return

    const host = hostRef.current
    if (!host || host.dataset.adsterra === MOUNT_FLAG) return
    host.dataset.adsterra = MOUNT_FLAG

    const atOptions = {
      key: ADSTERRA_BANNER_KEY,
      format: "iframe",
      height: BANNER_HEIGHT,
      width: BANNER_WIDTH,
      params: {},
      // Without `container` the async iframe branch renders nothing — see header.
      async: true,
      container: containerId,
    }

    // The loader reads the global when it executes, so it must be set before the
    // loader is appended — not merely before it resolves.
    ;(window as unknown as { atOptions: typeof atOptions }).atOptions = atOptions

    const config = document.createElement("script")
    config.type = "text/javascript"
    config.text = `atOptions = ${JSON.stringify(atOptions)};`

    const loader = document.createElement("script")
    loader.type = "text/javascript"
    loader.src = LOADER_SRC
    loader.async = true

    host.appendChild(config)
    host.appendChild(loader)

    // Deliberately no cleanup: unmounting must not tear down an iframe Adsterra
    // already rendered into the page.
  }, [containerId])

  if (!ENABLED) return null

  return (
    <div className={`flex w-full flex-col items-center ${className}`}>
      {showLabel && (
        <span className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60">
          Advertisement
        </span>
      )}
      <div
        id={containerId}
        ref={hostRef}
        aria-hidden="true"
        className="overflow-hidden rounded-xl border border-border/40 bg-secondary/20"
        style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT, maxWidth: "100%" }}
      />
    </div>
  )
}
