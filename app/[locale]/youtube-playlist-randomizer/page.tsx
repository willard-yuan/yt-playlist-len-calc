import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Loader2 } from "lucide-react"
import { RandomizerContent } from "@/components/randomizer-content"
import { SUPPORTED_LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/dictionary"
import { getSubT } from "@/lib/i18n/subpages"

const SITE_URL = "https://ytplaylistlength.pro"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES
    .filter((l) => l !== "en")
    .map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const isValidLocale = SUPPORTED_LOCALES.includes(locale as Locale)
  if (!isValidLocale || locale === "en") {
    notFound()
  }
  const l = locale as Locale
  const subT = getSubT(l)
  const title = subT("seo.randomizer.title")
  const description = subT("seo.randomizer.desc")
  const canonicalUrl = `${SITE_URL}/${l}/youtube-playlist-randomizer`

  const languages: Record<string, string> = {
    en: `${SITE_URL}/youtube-playlist-randomizer`,
  }
  SUPPORTED_LOCALES.forEach((x) => {
    if (x !== "en") languages[x] = `${SITE_URL}/${x}/youtube-playlist-randomizer`
  })
  languages["x-default"] = `${SITE_URL}/youtube-playlist-randomizer`

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
    },
  }
}

export default function LocaleRandomizer({
  params,
}: {
  params: { locale: string }
}) {
  const locale = params.locale as Locale
  if (!SUPPORTED_LOCALES.includes(locale) || locale === "en") {
    notFound()
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-4 py-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div><Footer /></div>}>
      <RandomizerContent />
    </Suspense>
  )
}
