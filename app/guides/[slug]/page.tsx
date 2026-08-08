import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { guides, getGuideBySlug } from "@/lib/guides-data";
import { guideContent } from "@/lib/guides-content";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return { title: "Guide Not Found" };
  }
  const url = `https://ytplaylistlength.pro/guides/${guide.slug}`;
  return {
    title: `${guide.title} - YouTube Playlist Guides`,
    description: guide.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url,
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [guide.author.name],
      images: [
        {
          url: `https://ytplaylistlength.pro${guide.coverImage}`,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
  };
}

export default function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    notFound();
  }

  const Content = guideContent[guide.slug];
  if (!Content) {
    notFound();
  }

  const url = `https://ytplaylistlength.pro/guides/${guide.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />
      <main>
        <article className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              {/* Back to Guides — aligned with article content */}
              <div className="mb-8">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                  Back to Guides
                </Link>
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
                {guide.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                {guide.excerpt}
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
                  By {guide.author.name}
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
                    Frequently Asked Questions
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
                <h3 className="text-2xl font-bold mb-4">Ready to Calculate?</h3>
                <p className="text-muted-foreground mb-6">
                  Put this guide into practice — get the exact length of any YouTube playlist in seconds.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Link href="/">Try the Calculator</Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Have a question this guide didn&apos;t answer?{" "}
                <Link href="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">
                  Reach out
                </Link>{" "}
                and it may become the next FAQ entry.
              </p>
            </div>
          </div>
        </article>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
