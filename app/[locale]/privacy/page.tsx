import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { PrivacyContent } from "@/components/privacy-content";
import { SUPPORTED_LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/dictionary";

const SITE_URL = "https://ytplaylistlength.pro";

// Hand-written hi/tr subpage SEO copy is preserved; all other locales fall back
// to the translated homepage title/description from LOCALE_META.
const localeMetadata: Partial<
  Record<Exclude<Locale, "en">, { title: string; description: string }>
> = {
  hi: {
    title: "गोपनीयता नीति - YouTube प्लेलिस्ट लंबाई कैलकुलेटर",
    description: "हमारी गोपनीयता नीति पढ़ें और जानें कि हम आपके डेटा को कैसे संभालते हैं। आपकी गोपनीयता हमारी प्राथमिकता है।",
  },
  tr: {
    title: "Gizlilik Politikası - YouTube Çalma Listesi Süre Hesaplayıcısı",
    description: "Verilerinizi nasıl işlediğimizi anlamak için Gizlilik Politikamızı okuyun. Gizliliğiniz bizim önceliğimizdir.",
  },
};

/** Build an hreflang `languages` map for a given sub-path (e.g. "/privacy"). */
function buildLanguages(sub: string): Record<string, string> {
  const languages: Record<string, string> = { en: `${SITE_URL}${sub}` };
  SUPPORTED_LOCALES.forEach((l) => {
    if (l !== "en") languages[l] = `${SITE_URL}/${l}${sub}`;
  });
  languages["x-default"] = `${SITE_URL}${sub}`;
  return languages;
}

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

  const meta =
    localeMetadata[locale as Exclude<Locale, "en">] ?? {
      title: LOCALE_META[locale as Locale].title,
      description: LOCALE_META[locale as Locale].description,
    };
  const canonicalUrl = `${SITE_URL}/${locale}/privacy`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguages("/privacy"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      locale: LOCALE_META[locale as Locale].ogLocale,
    },
  };
}

export default function LocalePrivacy({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUPPORTED_LOCALES.includes(locale) || locale === "en") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      <PrivacyContent locale={locale} />
      <Footer />
    </div>
  );
}
