import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { TermsContent } from "@/components/terms-content";

export const metadata: Metadata = {
  title: "Terms of Service - YouTube Playlist Length Calculator",
  description: "Read the Terms of Service for using the YouTube Playlist Length Calculator. Understand your rights and responsibilities.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/terms',
  },
  openGraph: {
    title: "Terms of Service - YouTube Playlist Length Calculator",
    description: "Read the Terms of Service for using the YouTube Playlist Length Calculator.",
    url: 'https://ytplaylistlength.pro/terms',
  }
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      <TermsContent locale="en" />
      <Footer />
    </div>
  );
}
