import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogPostBody } from "@/components/blog-post-body";
import { SUPPORTED_LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/dictionary";
import { getSubT, type SubpageKey } from "@/lib/i18n/subpages";
import { blogPosts } from "@/lib/blog-data";

const SITE_URL = "https://ytplaylistlength.pro";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === "en") continue;
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
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
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Article Not Found" };
  }
  const l = locale as Locale;
  const subT = getSubT(l);
  const t = (k: string) => subT(k as unknown as SubpageKey);
  const title = t(`blog.posts.${slug}.title`);
  const description = t(`blog.posts.${slug}.excerpt`);
  const canonicalUrl = `${SITE_URL}/${l}/blog/${slug}`;

  const languages: Record<string, string> = {
    en: `${SITE_URL}/blog/${slug}`,
  };
  SUPPORTED_LOCALES.forEach((x) => {
    if (x !== "en") languages[x] = `${SITE_URL}/${x}/blog/${slug}`;
  });
  languages["x-default"] = `${SITE_URL}/blog/${slug}`;

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
      type: "article",
      locale: LOCALE_META[l].ogLocale,
      images: [
        {
          url: `${SITE_URL}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default function LocaleBlogPost({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground font-sans selection:bg-purple-500/30">
      <Navbar />
      <BlogPostBody slug={slug} locale={locale as Locale} />
      <Footer />
    </div>
  );
}
