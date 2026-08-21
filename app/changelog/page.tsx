import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ChangelogContent } from "@/components/changelog-content";

export const metadata: Metadata = {
  title: "Changelog - YouTube Playlist Length Calculator Updates",
  description: "See the latest features, updates, and improvements to our YouTube Playlist Calculator. We are constantly improving.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/changelog',
  },
  openGraph: {
    title: "Changelog - YouTube Playlist Length Calculator Updates",
    description: "See the latest features, updates, and improvements to our YouTube Playlist Calculator.",
    url: 'https://ytplaylistlength.pro/changelog',
  }
};

export default function Changelog() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      <ChangelogContent locale="en" />
      <Footer />
    </div>
  );
}
