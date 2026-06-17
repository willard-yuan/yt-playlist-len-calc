import { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "../home-client";

const SITE_URL = "https://ytplaylistlength.pro";
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "hi", "tr"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const localeMetadata: Record<Exclude<Locale, "en">, { title: string; description: string }> = {
  hi: {
    title: "YTPlaylistLength - यूट्यूब प्लेलिस्ट लंबाई कैलकुलेटर",
    description: "किसी भी यूट्यूब प्लेलिस्ट की कुल लंबाई की तुरंत गणना करें। प्लेलिस्ट URL पेस्ट करें और सभी वीडियो देखने में कितना समय लगेगा, यह तुरंत जानें।",
  },
  tr: {
    title: "YTPlaylistLength - YouTube Çalma Listesi Süre Hesaplayıcı",
    description: "Herhangi bir YouTube çalma listesinin toplam süresini anında hesaplayın. Çalma listesi URL'sini yapıştırın ve tüm videoları izlemenin ne kadar süreceğini hemen görün.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES
    .filter((l) => l !== DEFAULT_LOCALE)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const isValidLocale = SUPPORTED_LOCALES.includes(locale as Locale);
  if (!isValidLocale || locale === DEFAULT_LOCALE) {
    notFound();
  }

  const meta = localeMetadata[locale as Exclude<Locale, "en">];
  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": SITE_URL,
        "hi": `${SITE_URL}/hi`,
        "tr": `${SITE_URL}/tr`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      locale: locale === "hi" ? "hi_IN" : "tr_TR",
    },
  };
}

export default function LocaleHome() {
  return <HomeClient />;
}
