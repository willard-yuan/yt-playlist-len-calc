import { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "../home-client";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_META,
  type Locale,
} from "@/lib/i18n/dictionary";

const SITE_URL = "https://ytplaylistlength.pro";

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
  if (
    !SUPPORTED_LOCALES.includes(locale as Locale) ||
    locale === DEFAULT_LOCALE
  ) {
    notFound();
  }

  const meta = LOCALE_META[locale as Locale];
  const canonicalUrl = `${SITE_URL}/${locale}`;

  const languages: Record<string, string> = {};
  SUPPORTED_LOCALES.forEach((l) => {
    languages[l] = l === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}/${l}`;
  });
  languages["x-default"] = SITE_URL;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      locale: meta.ogLocale,
    },
  };
}

export default function LocaleHome() {
  return <HomeClient />;
}
