import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/i18n/dictionary";
import { blogPosts } from "@/lib/blog-data";
import { guides } from "@/lib/guides-data";

const SITE_URL = "https://ytplaylistlength.pro";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Pages that exist in every locale. Home uses "" as the (empty) path segment.
const LOCALIZED_PAGES: { path: string; priority: number; changefreq: ChangeFreq }[] = [
  { path: "", priority: 1.0, changefreq: "weekly" },
  { path: "about", priority: 0.8, changefreq: "monthly" },
  { path: "contact", priority: 0.7, changefreq: "monthly" },
  { path: "privacy", priority: 0.5, changefreq: "yearly" },
];

// Pages available only in English (no locale variants).
const STATIC_PAGES: { path: string; priority: number; changefreq: ChangeFreq; lastmod?: string }[] = [
  { path: "/youtube-playlist-exporter", priority: 0.9, changefreq: "weekly", lastmod: "2025-12-12" },
  { path: "/youtube-playlist-randomizer", priority: 0.9, changefreq: "monthly", lastmod: "2026-01-18" },
  { path: "/changelog", priority: 0.6, changefreq: "weekly", lastmod: "2025-12-27" },
  { path: "/terms", priority: 0.5, changefreq: "yearly", lastmod: "2025-12-12" },
  { path: "/blog", priority: 0.8, changefreq: "weekly", lastmod: "2025-12-20" },
  { path: "/guides", priority: 0.9, changefreq: "weekly", lastmod: "2026-02-10" },
  { path: "/llms.txt", priority: 0.5, changefreq: "monthly", lastmod: "2025-12-20" },
];

function localizedUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const tail = path === "" ? "" : `/${path}`;
  return `${SITE_URL}${prefix}${tail}`;
}

function buildLocalizedEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const page of LOCALIZED_PAGES) {
    const languages: Record<string, string> = {};
    for (const l of SUPPORTED_LOCALES) languages[l] = localizedUrl(l, page.path);
    languages["x-default"] = localizedUrl("en", page.path);

    for (const l of SUPPORTED_LOCALES) {
      entries.push({
        url: localizedUrl(l, page.path),
        lastModified: new Date(),
        changeFrequency: page.changefreq,
        // Non-default locales carry slightly lower priority (matches the
        // homepage convention already used in the previous static sitemap).
        priority: l === "en" ? page.priority : Math.round((page.priority - 0.1) * 10) / 10,
        alternates: { languages },
      });
    }
  }
  return entries;
}

function buildStaticEntries(): MetadataRoute.Sitemap {
  return STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: p.lastmod ? new Date(p.lastmod) : new Date(),
    changeFrequency: p.changefreq,
    priority: p.priority,
  }));
}

function buildBlogEntries(): MetadataRoute.Sitemap {
  return blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}

function buildGuideEntries(): MetadataRoute.Sitemap {
  return guides.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...buildLocalizedEntries(),
    ...buildStaticEntries(),
    ...buildBlogEntries(),
    ...buildGuideEntries(),
  ];
}
