import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogPostBody } from "@/components/blog-post-body";

export const metadata: Metadata = {
  title: "Conquer the 46-Hour Marathon: Finish the World's Most Popular YouTube Playlist",
  description: "Master your time and finish the 'Most Viewed Videos of All Time' YouTube playlist using our playlist length calculator and active planning strategies.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/blog/conquer-46-hour-marathon-youtube-most-viewed-playlist',
  },
  openGraph: {
    title: "Conquer the 46-Hour Marathon: Finish the World's Most Popular YouTube Playlist",
    description: "Master your time and finish the 'Most Viewed Videos of All Time' YouTube playlist using our playlist length calculator and active planning strategies.",
    url: 'https://ytplaylistlength.pro/blog/conquer-46-hour-marathon-youtube-most-viewed-playlist',
    type: 'article',
    publishedTime: '2025-12-20',
    authors: ['YouTube Playlist Length Calculator'],
    images: [
      {
        url: 'https://ytplaylistlength.pro/blog-images/youtube-most-viewed-videos-of-all-time.webp',
        width: 1200,
        height: 630,
        alt: 'YouTube Most Viewed Videos of All Time Playlist Analysis',
      }
    ]
  }
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground font-sans selection:bg-purple-500/30">
      <Navbar />
      <BlogPostBody slug="conquer-46-hour-marathon-youtube-most-viewed-playlist" locale="en" />
      <Footer />
    </div>
  );
}
