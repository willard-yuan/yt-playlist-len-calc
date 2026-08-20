import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ContactContent } from "@/components/contact-content";
import { SUPPORTED_LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/dictionary";

const SITE_URL = "https://ytplaylistlength.pro";

// Hand-written hi/tr subpage SEO copy is preserved; all other locales fall back
// to the translated homepage title/description from LOCALE_META.
const localeMetadata: Partial<
  Record<Exclude<Locale, "en">, { title: string; description: string }>
> = {
  hi: {
    title: "संपर्क करें - YouTube प्लेलिस्ट लंबाई कैलकुलेटर सहायता",
    description: "कोई सवाल, सुझाव या फ़ीडबैक? YouTube प्लेलिस्ट लंबाई कैलकुलेटर टीम से संपर्क करें। हम मदद के लिए यहाँ हैं।",
  },
  tr: {
    title: "Bize Ulaşın - YouTube Çalma Listesi Süre Hesaplayıcısı Destek",
    description: "Sorularınız, önerileriniz veya geri bildirimleriniz mi var? YouTube Çalma Listesi Süre Hesaplayıcısı ekibiyle iletişime geçin. Size yardımcı olmak için buradayız.",
  },
};

/** Build an hreflang `languages` map for a given sub-path (e.g. "/contact"). */
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
  const canonicalUrl = `${SITE_URL}/${locale}/contact`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguages("/contact"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      locale: LOCALE_META[locale as Locale].ogLocale,
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
