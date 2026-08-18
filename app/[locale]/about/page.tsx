import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AboutContent } from "@/components/about-content";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/dictionary";

const SITE_URL = "https://ytplaylistlength.pro";

const localeMetadata: Record<Exclude<Locale, "en">, { title: string; description: string }> = {
  hi: {
    title: "Willard Yuan के बारे में - यूट्यूब प्लेलिस्ट लंबाई कैलकुलेटर",
    description: "Willard Yuan, YouTube प्लेलिस्ट लंबाई कैलकुलेटर के डेवलपर से मिलें। जानें कि यह क्यों बनाया गया, यह कैसे काम करता है, और संपर्क कैसे करें।",
  },
  tr: {
    title: "Willard Yuan Hakkında - YouTube Çalma Listesi Süre Hesaplayıcısı",
    description: "YouTube Çalma Listesi Süre Hesaplayıcısı'nın geliştiricisi Willard Yuan ile tanışın. Neden yapıldığını, nasıl çalıştığını ve nasıl iletişime geçeceğinizi öğrenin.",
  },
};

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

  const meta = localeMetadata[locale as Exclude<Locale, "en">];
  const canonicalUrl = `${SITE_URL}/${locale}/about`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/about`,
        hi: `${SITE_URL}/hi/about`,
        tr: `${SITE_URL}/tr/about`,
        "x-default": `${SITE_URL}/about`,
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

export default function LocaleAbout({
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
      <AboutContent locale={locale} />
      <Footer />
    </div>
  );
}
