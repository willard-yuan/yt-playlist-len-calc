import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { PrivacyContent } from "@/components/privacy-content";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/dictionary";

const SITE_URL = "https://ytplaylistlength.pro";

const localeMetadata: Record<Exclude<Locale, "en">, { title: string; description: string }> = {
  hi: {
    title: "गोपनीयता नीति - YouTube प्लेलिस्ट लंबाई कैलकुलेटर",
    description: "हमारी गोपनीयता नीति पढ़ें और जानें कि हम आपके डेटा को कैसे संभालते हैं। आपकी गोपनीयता हमारी प्राथमिकता है।",
  },
  tr: {
    title: "Gizlilik Politikası - YouTube Çalma Listesi Süre Hesaplayıcısı",
    description: "Verilerinizi nasıl işlediğimizi anlamak için Gizlilik Politikamızı okuyun. Gizliliğiniz bizim önceliğimizdir.",
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
  const canonicalUrl = `${SITE_URL}/${locale}/privacy`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/privacy`,
        hi: `${SITE_URL}/hi/privacy`,
        tr: `${SITE_URL}/tr/privacy`,
        "x-default": `${SITE_URL}/privacy`,
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
