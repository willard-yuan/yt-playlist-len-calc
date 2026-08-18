import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact Us - YouTube Playlist Length Calculator Support",
  description: "Have questions, suggestions, or feedback? Contact the YouTube Playlist Length Calculator team. We are here to help.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/contact',
    languages: {
      en: 'https://ytplaylistlength.pro/contact',
      hi: 'https://ytplaylistlength.pro/hi/contact',
      tr: 'https://ytplaylistlength.pro/tr/contact',
      'x-default': 'https://ytplaylistlength.pro/contact',
    },
  },
  openGraph: {
    title: "Contact Us - YouTube Playlist Length Calculator Support",
    description: "Have questions, suggestions, or feedback? Contact the YouTube Playlist Length Calculator team.",
    url: 'https://ytplaylistlength.pro/contact',
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      <ContactContent locale="en" />
      <Footer />
    </div>
  );
}
