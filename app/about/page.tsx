import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About - YouTube Playlist Length Calculator by Willard Yuan",
  description: "Meet Willard Yuan, the developer behind the YouTube Playlist Length Calculator. Learn why it was built, how it works, and how to get in touch.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/about',
    languages: {
      en: 'https://ytplaylistlength.pro/about',
      hi: 'https://ytplaylistlength.pro/hi/about',
      tr: 'https://ytplaylistlength.pro/tr/about',
      'x-default': 'https://ytplaylistlength.pro/about',
    },
  },
  openGraph: {
    title: "About - YouTube Playlist Length Calculator by Willard Yuan",
    description: "Meet the developer behind the YouTube Playlist Length Calculator and learn why it was built.",
    url: 'https://ytplaylistlength.pro/about',
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      <AboutContent locale="en" />
      <Footer />
    </div>
  );
}
