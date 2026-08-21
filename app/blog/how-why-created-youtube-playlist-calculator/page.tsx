import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogPostBody } from "@/components/blog-post-body";

export const metadata: Metadata = {
  title: "How & Why I Created YouTube Playlist Calculator - Development Story",
  description: "Discover the journey behind creating the YouTube Playlist Length Calculator. Learn about the technical challenges, solutions, and stack used.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/blog/how-why-created-youtube-playlist-calculator',
  },
  openGraph: {
    title: "How & Why I Created YouTube Playlist Calculator - Development Story",
    description: "Discover the journey behind creating the YouTube Playlist Length Calculator. Learn about the technical challenges, solutions, and stack used.",
    url: 'https://ytplaylistlength.pro/blog/how-why-created-youtube-playlist-calculator',
    type: 'article',
    publishedTime: '2025-01-19',
    authors: ['YouTube Playlist Length Calculator'],
    images: [
      {
        url: 'https://ytplaylistlength.pro/YouTube_Playlist_Length_Calculator_1.png',
        width: 1200,
        height: 630,
        alt: 'YouTube Playlist Length Calculator Interface',
      }
    ]
  }
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground">
      <Navbar />
      <BlogPostBody slug="how-why-created-youtube-playlist-calculator" locale="en" />
      <Footer />
    </div>
  );
}
