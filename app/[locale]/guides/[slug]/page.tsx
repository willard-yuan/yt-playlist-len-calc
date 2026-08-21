import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GuidesArticleFrame } from "@/components/guides-article-frame";
import { SUPPORTED_LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/dictionary";
import { getSubT, type SubpageKey } from "@/lib/i18n/subpages";
import { guides, getGuideBySlug } from "@/lib/guides-data";
import { guideContent } from "@/lib/guides-content";

const SITE_URL = "https://ytplaylistlength.pro";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === "en") continue;
    for (const guide of guides) {
      params.push({ locale, slug: guide.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const isValidLocale = SUPPORTED_LOCALES.includes(locale as Locale);
  if (!isValidLocale || locale === "en") {
    notFound();
  }
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: "Guide Not Found" };
  }
  const l = locale as Locale;
  const subT = getSubT(l);
  const t = (k: string) => subT(k as unknown as SubpageKey);
  const title = t(`guides.${slug}.title`);
  const description = t(`guides.${slug}.excerpt`);
  const canonicalUrl = `${SITE_URL}/${l}/guides/${slug}`;

  const languages: Record<string, string> = {
    en: `${SITE_URL}/guides/${slug}`,
  };
  SUPPORTED_LOCALES.forEach((x) => {
    if (x !== "en") languages[x] = `${SITE_URL}/${x}/guides/${slug}`;
  });
  languages["x-default"] = `${SITE_URL}/guides/${slug}`;

  return {
    title: `${title} - YouTube Playlist Guides`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale: LOCALE_META[l].ogLocale,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [guide.author.name],
      images: [
        {
          url: `${SITE_URL}${guide.coverImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default function LocaleGuidePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }
  const Content = guideContent[guide.slug];
  if (!Content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground">
      <Navbar />
      <GuidesArticleFrame locale={locale as Locale} guide={guide} Content={Content} />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
