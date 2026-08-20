// scripts/check-i18n.mjs
// Validates every translation dictionary against en.ts:
//   1. 100% key coverage (no missing / no extra keys)
//   2. placeholder tokens ({year},{count},{total},{filtered},...) preserved
//   3. inline <b>/<strong>/<a> tags balanced (machine translation can drop a close tag)
// Run: node scripts/check-i18n.mjs
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIR = path.join(__dirname, "..", "lib", "i18n", "translations")

// Parse a flat `"key": "value",` translation file. Values are double-quoted;
// apostrophes inside values are common and must NOT close the match.
function parseDict(file) {
  const src = fs.readFileSync(file, "utf8")
  const out = {}
  const re = /^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$/
  for (const line of src.split("\n")) {
    const m = line.match(re)
    if (m) out[m[1]] = m[2]
  }
  return out
}

function placeholders(s) {
  return [...s.matchAll(/\{([a-zA-Z_]+)\}/g)].map((x) => x[1]).sort()
}

function tagsBalanced(s) {
  const opens = (s.match(/<b>|<strong>|<a[ >]/g) || []).length
  const closes = (s.match(/<\/b>|<\/strong>|<\/a>/g) || []).length
  return opens === closes
}

const en = parseDict(path.join(DIR, "en.ts"))
const enKeys = Object.keys(en)
const enKeysSet = new Set(enKeys)

let failures = 0
const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".ts") && f !== "en.ts")
  .sort()

for (const f of files) {
  const dict = parseDict(path.join(DIR, f))
  const keys = Object.keys(dict)
  const keySet = new Set(keys)
  const missing = enKeys.filter((k) => !keySet.has(k))
  const extra = keys.filter((k) => !enKeysSet.has(k))

  let phBad = 0
  let tagBad = 0
  for (const k of enKeys) {
    if (!keySet.has(k)) continue
    const ep = placeholders(en[k]).join(",")
    const dp = placeholders(dict[k]).join(",")
    if (ep !== dp) {
      phBad++
      if (phBad <= 5) {
        console.log(`  [PLACEHOLDER] ${f} "${k}": en={${ep}} got={${dp}}`)
      }
    }
    if ((en[k].includes("<b>") || en[k].includes("<strong>")) && !tagsBalanced(dict[k])) {
      tagBad++
      if (tagBad <= 5) {
        console.log(`  [TAG] ${f} "${k}": unbalanced -> ${dict[k]}`)
      }
    }
  }

  const ok = missing.length === 0 && extra.length === 0 && phBad === 0 && tagBad === 0
  if (ok) {
    console.log(`✓ ${f.padEnd(12)} keys=${keys.length} (coverage 100%, placeholders OK, tags OK)`)
  } else {
    failures++
    console.log(
      `✗ ${f.padEnd(12)} keys=${keys.length} missing=${missing.length} extra=${extra.length} placeholderIssues=${phBad} tagIssues=${tagBad}`
    )
    if (missing.length) console.log(`    missing sample: ${missing.slice(0, 8).join(", ")}`)
    if (extra.length) console.log(`    extra sample: ${extra.slice(0, 8).join(", ")}`)
  }
}

console.log(`\nen.ts reference keys: ${enKeys.length}`)
if (failures) {
  console.log(`\n${failures} file(s) with issues.`)
  process.exit(1)
} else {
  console.log("\nAll present dictionaries pass.")
}
