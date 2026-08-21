import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogPostBody } from "@/components/blog-post-body";

export const metadata: Metadata = {
  title: "How to Search a Video Inside a YouTube Playlist: V1.4.4 Update",
  description: "Finally! A solution to the missing 'search in playlist' feature. Discover how our latest V1.4.4 update lets you instantly filter and find videos in massive YouTube playlists.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/blog/how-to-search-video-inside-youtube-playlist',
  },
  openGraph: {
    title: "How to Search a Video Inside a YouTube Playlist: V1.4.4 Update",
    description: "Finally! A solution to the missing 'search in playlist' feature. Discover how our latest V1.4.4 update lets you instantly filter and find videos in massive YouTube playlists.",
    url: 'https://ytplaylistlength.pro/blog/how-to-search-video-inside-youtube-playlist',
    type: 'article',
    publishedTime: '2025-12-27',
    authors: ['YouTube Playlist Length Calculator'],
    images: [
      {
        url: 'https://ytplaylistlength.pro/blog-images/How_to_Search_a_Video_Inside_Youtube_Playlist_1.webp',
        width: 1200,
        height: 630,
        alt: 'Searching for videos inside a YouTube playlist',
      }
    ]
  }
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-purple-500/30">
      <Navbar />
      <BlogPostBody slug="how-to-search-video-inside-youtube-playlist" locale="en" />
      <Footer />
    </div>
  );
}
