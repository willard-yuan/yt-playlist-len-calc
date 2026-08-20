// Batch i18n generator for yt-playlist-len-calc.
//
// Parses lib/i18n/translations/en.ts, protects inline HTML tags (<b>, <strong>)
// and placeholders ({year}, {count}, ...) so they survive translation, then
// translates every key into the target languages via the keyless Google
// "gtx" endpoint. Keys are batched (joined by a sentinel that is preserved
// through translation) to keep the number of network connections low.
//
// Writes one dictionary file per locale and a generated SEO meta file.
//
// Usage:
//   node scripts/gen-i18n.mjs                 # generate everything missing
//   node scripts/gen-i18n.mjs --force         # overwrite existing dict files
//   node scripts/gen-i18n.mjs --lang ar       # only one language (for testing)
//
// Resumable: scripts/.i18n-cache.json stores every (lang|key) translation.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TRANS_DIR = path.join(ROOT, "lib/i18n/translations");
const CACHE_PATH = path.join(__dirname, ".i18n-cache.json");
const LOG_PATH = path.join(__dirname, "gen-i18n.log");

const BATCH_SIZE = 12;
const SEP = "⟁⟁⟁"; // rare Unicode sentinel preserved through translation

const log = (msg) => {
  fs.appendFileSync(LOG_PATH, msg + "\n");
  process.stdout.write(msg + "\n");
};

const TARGETS = [
  // code,     varName,  tl,       nativeName,        flag, dir,  ogLocale, dictExists
  ["zh",      "zh",      "zh-CN",  "简体中文",         "🇨🇳", "ltr", "zh_CN", true],
  ["zh-Hant", "zhHant",  "zh-TW",  "繁體中文",         "🇹🇼", "ltr", "zh_TW", true],
  ["es",      "es",      "es",     "Español",         "🇪🇸", "ltr", "es_ES", true],
  ["fr",      "fr",      "fr",     "Français",        "🇫🇷", "ltr", "fr_FR", true],
  ["de",      "de",      "de",     "Deutsch",         "🇩🇪", "ltr", "de_DE", true],
  ["ar",      "ar",      "ar",     "العربية",         "🇸🇦", "rtl", "ar_AR", false],
  ["id",      "id",      "id",     "Bahasa Indonesia","🇮🇩", "ltr", "id_ID", false],
  ["fil",     "fil",     "fil",    "Filipino",        "🇵🇭", "ltr", "fil_PH",false],
  ["ru",      "ru",      "ru",     "Русский",         "🇷🇺", "ltr", "ru_RU", false],
  ["pl",      "pl",      "pl",     "Polski",          "🇵🇱", "ltr", "pl_PL", false],
  ["nl",      "nl",      "nl",     "Nederlands",      "🇳🇱", "ltr", "nl_NL", false],
  ["vi",      "vi",      "vi",     "Tiếng Việt",      "🇻🇳", "ltr", "vi_VN", false],
  ["ja",      "ja",      "ja",     "日本語",          "🇯🇵", "ltr", "ja_JP", false],
  ["pt",      "pt",      "pt",     "Português",       "🇵🇹", "ltr", "pt_PT", false],
  ["it",      "it",      "it",     "Italiano",        "🇮🇹", "ltr", "it_IT", false],
  ["th",      "th",      "th",     "ไทย",            "🇹🇭", "ltr", "th_TH", false],
  ["ko",      "ko",      "ko",     "한국어",          "🇰🇷", "ltr", "ko_KR", false],
  ["sv",      "sv",      "sv",     "Svenska",         "🇸🇪", "ltr", "sv_SE", false],
  ["he",      "he",      "he",     "עברית",          "🇮🇱", "rtl", "he_IL", false],
];

const EN_TITLE = "YTPlaylistLength - Best Youtube Playlist Length Calculator";
const EN_DESCRIPTION =
  "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.";

// Only en/hi/tr exist in TranslationKey; map them to native names.
const LANG_NAMES = { en: "English", hi: "हिन्दी", tr: "Türkçe" };

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

// Returns false if a string has unbalanced inline <b>/<strong> tags, which
// can happen when machine translation reorders around protected placeholders.
function tagsBalanced(s) {
  const opens = (s.match(/<b>|<strong>/g) || []).length;
  const closes = (s.match(/<\/b>|<\/strong>/g) || []).length;
  return opens === closes;
}

// Placeholder tokens like {year}/{count}/{total}/{filtered} must survive
// translation. Google sometimes drops the protected private-use tokens, so we
// verify the multiset of placeholders in the translated string matches the
// source. Returns true when they match.
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
  let pendingComment = "";
  for (const line of lines) {
    if (/^\s*\/\//.test(line)) {
      pendingComment += (pendingComment ? "\n" : "") + line.trim();
      continue;
    }
    const m = line.match(
      /^\s*"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$/
    );
    if (m) {
      entries.push({ key: m[1], value: unescapeRaw(m[2]), comment: pendingComment });
      pendingComment = "";
    }
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

// Translate an array of strings in batches. Returns array aligned to input.
async function translateMany(texts, tl, cache, langPrefix) {
  const result = new Array(texts.length);
  // 1) reuse cache (verify cached strings still have balanced tags and all
  //    placeholders — a broken cached entry is re-translated on this run)
  const missingIdx = [];
  texts.forEach((t, i) => {
    const ck = `${langPrefix}:${i}`;
    if (cache[ck] !== undefined) {
      if (tagsBalanced(cache[ck]) && placeholdersOk(t, cache[ck])) result[i] = cache[ck];
      else missingIdx.push(i); // cached but broken → retranslate
    } else if (!t.trim()) {
      result[i] = t;
      cache[ck] = t;
    } else missingIdx.push(i);
  });

  // 2) batch the missing ones
  for (let b = 0; b < missingIdx.length; b += BATCH_SIZE) {
    const idxs = missingIdx.slice(b, b + BATCH_SIZE);
    const batch = idxs.map((i) => {
      const { protected: prot, map } = protect(texts[i]);
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
    // Fallback: if split mismatches, translate item-by-item.
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
    idxs.forEach((origIdx, k) => {
      let restored = restore(parts[k] ?? batch[k].prot, batch[k].map);
      const srcText = texts[origIdx];
      // Recover strings where tags broke or placeholders were dropped: retry as
      // a single (item-by-item) translation, which has a lower token-drop rate.
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
      // Final fallback: keep the English source so nothing renders with a
      // broken/missing placeholder or tag.
      if (!tagsBalanced(restored) || !placeholdersOk(srcText, restored)) {
        restored = srcText;
      }
      result[origIdx] = restored || srcText;
      cache[`${langPrefix}:${origIdx}`] = result[origIdx];
    });
    saveCache(cache);
  }
  return result;
}

// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const langArg = args.find((a) => a.startsWith("--lang="))?.split("=")[1];
  const onlyLang = langArg || (args.includes("--lang") ? args[args.indexOf("--lang") + 1] : null);

  fs.writeFileSync(LOG_PATH, "");
  const cache = loadCache();
  const entries = parseEn();
  log(`Parsed ${entries.length} keys from en.ts`);

  let targets = TARGETS;
  if (onlyLang) targets = TARGETS.filter((t) => t[0] === onlyLang);
  if (!targets.length) throw new Error("No matching target: " + onlyLang);

  const meta = {};

  for (const [code, varName, tl, nativeName, flag, dir, ogLocale, dictExists] of targets) {
    const dictPath = path.join(TRANS_DIR, `${code}.ts`);
    const needDict = !dictExists && (force || !fs.existsSync(dictPath));
    log(`\n[${code}] tl=${tl} dir=${dir} ${needDict ? "(gen dict)" : "(dict exists)"}`);

    if (needDict) {
      const values = entries.map((e) =>
        e.key.startsWith("language.") ? (LANG_NAMES[e.key.split(".")[1]] ?? e.key) : e.value
      );
      const translated = await translateMany(values, tl, cache, code);
      const out = [];
      out.push(`// ${nativeName} translations (${nativeName})`);
      out.push(`import type { TranslationKey } from "./en";`);
      out.push("");
      out.push(`const ${varName}: Record<TranslationKey, string> = {`);
      entries.forEach((e, i) => {
        if (e.comment) out.push("  // " + e.comment.replace(/^\/\/\s?/, ""));
        out.push(`  ${JSON.stringify(e.key)}: ${JSON.stringify(translated[i])},`);
      });
      out.push("};");
      out.push("");
      out.push(`export default ${varName};`);
      fs.writeFileSync(dictPath, out.join("\n"));
      log(`  wrote ${dictPath} (${entries.length} keys)`);
    }

    const [title, desc] = await translateMany(
      [EN_TITLE, EN_DESCRIPTION],
      tl,
      cache,
      `${code}__meta`
    );
    meta[code] = { nativeName, flag, dir, ogLocale, title, description: desc };
    log(`  meta: ${title.slice(0, 48)}...`);
  }

  const metaLines = [
    "// AUTO-GENERATED by scripts/gen-i18n.mjs — do not edit by hand.",
    "export const GENERATED_LOCALE_META = {",
  ];
  for (const [code, m] of Object.entries(meta)) {
    metaLines.push(`  ${JSON.stringify(code)}: {`);
    metaLines.push(`    nativeName: ${JSON.stringify(m.nativeName)},`);
    metaLines.push(`    flag: ${JSON.stringify(m.flag)},`);
    metaLines.push(`    dir: ${JSON.stringify(m.dir)},`);
    metaLines.push(`    ogLocale: ${JSON.stringify(m.ogLocale)},`);
    metaLines.push(`    title: ${JSON.stringify(m.title)},`);
    metaLines.push(`    description: ${JSON.stringify(m.description)},`);
    metaLines.push(`  },`);
  }
  metaLines.push("};");
  metaLines.push("");
  fs.writeFileSync(path.join(ROOT, "lib/i18n/locale-meta.ts"), metaLines.join("\n"));
  log(`\nWrote lib/i18n/locale-meta.ts (${Object.keys(meta).length} locales)`);
  log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
