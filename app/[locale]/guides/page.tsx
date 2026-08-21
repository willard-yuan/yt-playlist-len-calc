import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GuidesListing } from "@/components/guides-listing";
import { SUPPORTED_LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/dictionary";
import { getSubT } from "@/lib/i18n/subpages";

const SITE_URL = "https://ytplaylistlength.pro";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES
    .filter((l) => l !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const isValidLocale = SUPPORTED_LOCALES.includes(locale as Locale);
  if (!isValidLocale || locale === "en") {
    notFound();
  }
  const l = locale as Locale;
  const subT = getSubT(l);
  const title = subT("seo.guides.title");
  const description = subT("seo.guides.desc");
  const canonicalUrl = `${SITE_URL}/${l}/guides`;

  const languages: Record<string, string> = {
    en: `${SITE_URL}/guides`,
  };
  SUPPORTED_LOCALES.forEach((x) => {
    if (x !== "en") languages[x] = `${SITE_URL}/${x}/guides`;
  });
  languages["x-default"] = `${SITE_URL}/guides`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: LOCALE_META[l].ogLocale,
      type: "website",
    },
  };
}

export default function LocaleGuides({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUPPORTED_LOCALES.includes(locale) || locale === "en") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      <GuidesListing locale={locale} />
      <Footer />
    </div>
  );
}
