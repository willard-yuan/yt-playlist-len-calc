import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogPostBody } from "@/components/blog-post-body";

export const metadata: Metadata = {
  title: "How to Shuffle YouTube Playlists (2026 Update): Randomizer V1.4.5",
  description: "Discover the true way to shuffle YouTube playlists with our V1.4.5 update. Featuring true randomness, persistent sorting, and enhanced privacy.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/blog/how-to-shuffle-youtube-playlists-2026-update',
  },
  openGraph: {
    title: "How to Shuffle YouTube Playlists (2026 Update): Randomizer V1.4.5",
    description: "Discover the true way to shuffle YouTube playlists with our V1.4.5 update. Featuring true randomness, persistent sorting, and enhanced privacy.",
    url: 'https://ytplaylistlength.pro/blog/how-to-shuffle-youtube-playlists-2026-update',
    type: 'article',
    publishedTime: '2026-01-18',
    authors: ['YouTube Playlist Length Calculator'],
    images: [
      {
        url: 'https://ytplaylistlength.pro/blog-images/2026_Songs_Playlist_Top_Most_Played_Music_2026_(Best_Hits_2026_Right_Now)_shuffile.webp',
        width: 1200,
        height: 630,
        alt: 'YouTube Playlist Randomizer V1.4.5 Interface',
      }
    ]
  }
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-purple-500/30">
      <Navbar />
      <BlogPostBody slug="how-to-shuffle-youtube-playlists-2026-update" locale="en" />
      <Footer />
    </div>
  );
}
