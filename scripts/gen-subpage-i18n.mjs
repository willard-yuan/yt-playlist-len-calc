// Batch i18n generator for yt-playlist-len-calc SUBPAGES.
//
// Parses lib/i18n/subpages/en.ts, protects inline HTML tags (<b>, <strong>)
// and placeholders ({count}, {total}, {author}, ...) so they survive
// translation, then translates every key into the 21 non-en target langs via
// the keyless Google "gtx" endpoint (batched + sentinel-joined to keep the
// connection count low). Writes one dictionary file per locale plus an
// index.ts that exposes subTranslations + getSubT.
//
// Run:  node scripts/gen-subpage-i18n.mjs            # fill missing
//       node scripts/gen-subpage-i18n.mjs --force    # overwrite all
//       node scripts/gen-subpage-i18n.mjs --lang ja  # one language
//
// Resumable: scripts/.subpage-i18n-cache.json stores every (lang|key) pair.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TRANS_DIR = path.join(ROOT, "lib/i18n/subpages");
const CACHE_PATH = path.join(__dirname, ".subpage-i18n-cache.json");
const LOG_PATH = path.join(__dirname, "gen-subpage-i18n.log");

const BATCH_SIZE = 12;
const SEP = "⟁⟁⟁";

const log = (msg) => {
  fs.appendFileSync(LOG_PATH, msg + "\n");
  process.stdout.write(msg + "\n");
};

// code, varName, tl
const TARGETS = [
  ["zh", "zh", "zh-CN"],
  ["zh-Hant", "zhHant", "zh-TW"],
  ["es", "es", "es"],
  ["fr", "fr", "fr"],
  ["de", "de", "de"],
  ["hi", "hi", "hi"],
  ["tr", "tr", "tr"],
  ["ar", "ar", "ar"],
  ["id", "id", "id"],
  ["fil", "fil", "fil"],
  ["ru", "ru", "ru"],
  ["pl", "pl", "pl"],
  ["nl", "nl", "nl"],
  ["vi", "vi", "vi"],
  ["ja", "ja", "ja"],
  ["pt", "pt", "pt"],
  ["it", "it", "it"],
  ["th", "th", "th"],
  ["ko", "ko", "ko"],
  ["sv", "sv", "sv"],
  ["he", "he", "he"],
];

// ---------------------------------------------------------------------------
function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}
function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
}

function unescapeRaw(s) {
  let out = s.replace(/\\\\/g, "");
  out = out.replace(/\\"/g, '"');
  out = out.replace(/\\n/g, "\n");
  out = out.replace(/\\t/g, "\t");
  out = out.replace(/\\\//g, "/");
  out = out.replace(//g, "\\");
  return out;
}

const PROTECT_RE = /<[^>]+>|\{[^}]+\}/g;
function protect(text) {
  const map = [];
  const replaced = text.replace(PROTECT_RE, (m) => {
    const tok = String.fromCodePoint(0xe000 + map.length);
    map.push([tok, m]);
    return tok;
  });
  return { protected: replaced, map };
}
function restore(protectedText, map) {
  let out = protectedText;
  for (const [tok, original] of map) out = out.split(tok).join(original);
  return out;
}

function tagsBalanced(s) {
  const opens = (s.match(/<b>|<strong>/g) || []).length;
  const closes = (s.match(/<\/b>|<\/strong>/g) || []).length;
  return opens === closes;
}

function placeholdersOk(orig, translated) {
  const norm = (s) =>
    [...s.matchAll(/\{([a-zA-Z_]+)\}/g)]
      .map((x) => x[1])
      .sort()
      .join("|");
  return norm(orig) === norm(translated);
}

function parseEn() {
  const src = fs.readFileSync(path.join(TRANS_DIR, "en.ts"), "utf8");
  const body = src.match(/const en = \{([\s\S]*?)\} as const/);
  if (!body) throw new Error("Could not extract en object body");
  const lines = body[1].split("\n");
  const entries = [];
  for (const line of lines) {
    const m = line.match(
      /^\s*"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$/
    );
    if (m) entries.push({ key: m[1], value: unescapeRaw(m[2]) });
  }
  return entries;
}

// ---------------------------------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchTranslate(joined, tl) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
    tl +
    "&dt=t&q=" +
    encodeURIComponent(joined);
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  return data[0].map((s) => (s && s[0] ? s[0] : "")).join("");
}

async function translateMany(texts, tl, cache, langPrefix) {
  // `texts` entries are { key, value }. Cache is keyed by the STABLE key name
  // (langPrefix:key), NOT by positional index — otherwise inserting/reordering
  // keys in en.ts would shift every later index and reassign stale cached
  // translations to the wrong keys.
  const result = new Array(texts.length);
  const missingIdx = [];
  texts.forEach((entry, i) => {
    const t = entry.value;
    const ck = `${langPrefix}:${entry.key}`;
    if (cache[ck] !== undefined) {
      if (tagsBalanced(cache[ck]) && placeholdersOk(t, cache[ck])) result[i] = cache[ck];
      else missingIdx.push(i);
    } else if (!t.trim()) {
      result[i] = t;
      cache[ck] = t;
    } else missingIdx.push(i);
  });

  for (let b = 0; b < missingIdx.length; b += BATCH_SIZE) {
    const idxs = missingIdx.slice(b, b + BATCH_SIZE);
    const batch = idxs.map((i) => {
      const { protected: prot, map } = protect(texts[i].value);
      return { prot, map };
    });
    const joined = batch.map((x) => x.prot).join(SEP);
    let translatedJoined = null;
    for (let attempt = 0; attempt < 4 && translatedJoined === null; attempt++) {
      try {
        translatedJoined = await fetchTranslate(joined, tl);
      } catch (e) {
        await sleep(400 * (attempt + 1));
      }
    }
    let parts = translatedJoined ? translatedJoined.split(SEP) : null;
    if (!parts || parts.length !== idxs.length) {
      log(`  ! batch fallback (got ${parts ? parts.length : 0}, want ${idxs.length})`);
      parts = [];
      for (const x of batch) {
        let t = null;
        for (let a = 0; a < 4 && t === null; a++) {
          try {
            t = await fetchTranslate(x.prot, tl);
          } catch {
            await sleep(300 * (a + 1));
          }
        }
        parts.push(t ?? x.prot);
      }
    }
    for (let bi = 0; bi < idxs.length; bi++) {
      const origIdx = idxs[bi];
      const k = bi;
      let restored = restore(parts[k] ?? batch[k].prot, batch[k].map);
      const srcText = texts[origIdx].value;
      if (!tagsBalanced(restored) || !placeholdersOk(srcText, restored)) {
        let single = null;
        for (let a = 0; a < 4 && single === null; a++) {
          try {
            single = await fetchTranslate(batch[k].prot, tl);
          } catch {
            await sleep(300 * (a + 1));
          }
        }
        if (single !== null) {
          const r2 = restore(single, batch[k].map);
          if (tagsBalanced(r2) && placeholdersOk(srcText, r2)) restored = r2;
        }
      }
      if (!tagsBalanced(restored) || !placeholdersOk(srcText, restored)) {
        restored = srcText;
      }
      result[origIdx] = restored || srcText;
      cache[`${langPrefix}:${texts[origIdx].key}`] = result[origIdx];
    }
    saveCache(cache);
  }
  return result;
}

// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const langArg = args.find((a) => a.startsWith("--lang="))?.split("=")[1];

  fs.writeFileSync(LOG_PATH, "");
  const cache = loadCache();
  const entries = parseEn();
  log(`Parsed ${entries.length} keys from subpages/en.ts`);

  let targets = TARGETS;
  if (langArg) targets = TARGETS.filter((t) => t[0] === langArg);
  if (!targets.length) throw new Error("No matching target: " + langArg);

  const written = [];

  for (const [code, varName, tl] of targets) {
    const dictPath = path.join(TRANS_DIR, `${code}.ts`);
    const needDict = force || !fs.existsSync(dictPath);
    log(`\n[${code}] tl=${tl} ${needDict ? "(gen)" : "(exists, fill missing)"}`);

    if (needDict) {
      const translated = await translateMany(
        entries,
        tl,
        cache,
        code
      );
      const out = [];
      out.push(`// ${code} subpage translations (machine-generated by scripts/gen-subpage-i18n.mjs)`);
      out.push(`import type { SubpageKey } from "./en";`);
      out.push("");
      out.push(`const ${varName}: Record<SubpageKey, string> = {`);
      entries.forEach((e, i) => {
        out.push(`  ${JSON.stringify(e.key)}: ${JSON.stringify(translated[i])},`);
      });
      out.push("};");
      out.push("");
      out.push(`export default ${varName};`);
      fs.writeFileSync(dictPath, out.join("\n"));
      log(`  wrote ${dictPath} (${entries.length} keys)`);
      written.push(code);
    }
  }

  // index.ts
  const importLines = ['import type { Locale } from "@/lib/i18n/dictionary";', 'import { SUPPORTED_LOCALES } from "@/lib/i18n/dictionary";', 'import type { SubpageKey } from "./en";', "import en from \"./en\";"];
  const dictImports = [];
  const dictEntries = [];
  for (const [code, varName] of TARGETS) {
    dictImports.push(`import ${varName} from "./${code}";`);
    dictEntries.push(`  ${JSON.stringify(code)}: ${varName},`);
  }
  const indexLines = [
    "// AUTO-GENERATED by scripts/gen-subpage-i18n.mjs — do not edit by hand.",
    ...importLines,
    ...dictImports,
    "",
    "export type { SubpageKey } from \"./en\";",
    "export { SUPPORTED_LOCALES }",
    "export type SubpageLocale = Locale;",
    "",
    "export const subTranslations: Record<Locale, Record<SubpageKey, string>> = {",
    "  en,",
    ...dictEntries,
    "};",
    "",
    "export function getSubT(locale: Locale): (key: SubpageKey) => string {",
    "  const dict = subTranslations[locale] ?? en;",
    "  return (key: SubpageKey) => dict[key] ?? en[key] ?? (key as string);",
    "}",
    "",
  ];
  fs.writeFileSync(path.join(TRANS_DIR, "index.ts"), indexLines.join("\n"));
  log(`\nWrote lib/i18n/subpages/index.ts (${TARGETS.length + 1} locales)`);
  log(`Generated dicts this run: ${written.length ? written.join(", ") : "none (all cached)"}`);
  log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
