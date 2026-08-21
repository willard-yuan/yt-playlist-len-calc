import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/locale-link";
import { getSubT, type SubpageKey } from "@/lib/i18n/subpages";
import { type Locale } from "@/lib/i18n/dictionary";
import type { Guide } from "@/lib/guides-data";

type ContentFn = () => JSX.Element;

export function GuidesArticleFrame({
  locale,
  guide,
  Content,
}: {
  locale: Locale;
  guide: Guide;
  Content: ContentFn;
}) {
  const subT = getSubT(locale);
  const t = (k: string) => subT(k as unknown as SubpageKey);
  const title = t(`guides.${guide.slug}.title`);
  const excerpt = t(`guides.${guide.slug}.excerpt`);
  const byAuthor = subT("guides.by").replace("{author}", guide.author.name);

  const url = `https://ytplaylistlength.pro/guides/${guide.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: `https://ytplaylistlength.pro${guide.coverImage}`,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: {
      "@type": "Person",
      name: guide.author.name,
      url: guide.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: "YTPlaylistLength",
      url: "https://ytplaylistlength.pro",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Back to Guides — aligned with article content */}
            <div className="mb-8">
              <LocaleLink
                href="/guides"
                className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                {subT("guides.article.back")}
              </LocaleLink>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                Guide
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                {guide.category}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
              {excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-12 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(guide.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {guide.readTime}
              </div>
              <div className="text-purple-600 dark:text-purple-400 font-medium">
                {byAuthor}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-purple">
            {/* Cover Image */}
            <div className="w-full mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={guide.coverImage}
                alt={`${guide.title} - cover`}
                className="rounded-2xl shadow-2xl border border-border/50 w-full"
                loading="lazy"
              />
            </div>

            <div className="text-base leading-relaxed space-y-6">
              <Content />
            </div>

            {/* FAQ Section */}
            {guide.faq.length > 0 && (
              <div className="mt-16 pt-10 border-t border-border">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  {subT("guides.article.faqTitle")}
                </h2>
                <div className="space-y-6">
                  {guide.faq.map((item, i) => (
                    <div
                      key={i}
                      className="bg-secondary/40 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.q}
                      </h3>
                      <p className="text-muted-foreground m-0">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <hr className="my-12 border-border" />

            <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 my-12 text-center">
              <h3 className="text-2xl font-bold mb-4">{subT("guides.article.cta.title")}</h3>
              <p className="text-muted-foreground mb-6">
                {subT("guides.article.cta.body")}
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <LocaleLink href="/">{subT("guides.article.try")}</LocaleLink>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground italic">
              {subT("guides.article.askTitle")}{" "}
              <LocaleLink href="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">
                {subT("guides.article.reachOut")}
              </LocaleLink>{" "}
              and it may become the next FAQ entry.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
