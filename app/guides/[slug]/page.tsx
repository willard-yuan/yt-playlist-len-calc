import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GuidesArticleFrame } from "@/components/guides-article-frame";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground">
      <Navbar />
      <GuidesArticleFrame locale="en" guide={guide} Content={Content} />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
