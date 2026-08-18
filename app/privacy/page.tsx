import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { PrivacyContent } from "@/components/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy - YouTube Playlist Length Calculator",
  description: "Read our Privacy Policy to understand how we handle your data. Your privacy is our priority.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/privacy',
    languages: {
      en: 'https://ytplaylistlength.pro/privacy',
      hi: 'https://ytplaylistlength.pro/hi/privacy',
      tr: 'https://ytplaylistlength.pro/tr/privacy',
      'x-default': 'https://ytplaylistlength.pro/privacy',
    },
  },
  openGraph: {
    title: "Privacy Policy - YouTube Playlist Length Calculator",
    description: "Read our Privacy Policy to understand how we handle your data.",
    url: 'https://ytplaylistlength.pro/privacy',
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      <PrivacyContent locale="en" />
      <Footer />
    </div>
  );
}
