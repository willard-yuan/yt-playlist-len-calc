import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ContactContent } from "@/components/contact-content";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/dictionary";

const SITE_URL = "https://ytplaylistlength.pro";

const localeMetadata: Record<Exclude<Locale, "en">, { title: string; description: string }> = {
  hi: {
    title: "संपर्क करें - YouTube प्लेलिस्ट लंबाई कैलकुलेटर सहायता",
    description: "कोई सवाल, सुझाव या फ़ीडबैक? YouTube प्लेलिस्ट लंबाई कैलकुलेटर टीम से संपर्क करें। हम मदद के लिए यहाँ हैं।",
  },
  tr: {
    title: "Bize Ulaşın - YouTube Çalma Listesi Süre Hesaplayıcısı Destek",
    description: "Sorularınız, önerileriniz veya geri bildirimleriniz mi var? YouTube Çalma Listesi Süre Hesaplayıcısı ekibiyle iletişime geçin. Size yardımcı olmak için buradayız.",
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
  const canonicalUrl = `${SITE_URL}/${locale}/contact`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/contact`,
        hi: `${SITE_URL}/hi/contact`,
        tr: `${SITE_URL}/tr/contact`,
        "x-default": `${SITE_URL}/contact`,
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

export default function LocaleContact({
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
      <ContactContent locale={locale} />
      <Footer />
    </div>
  );
}
