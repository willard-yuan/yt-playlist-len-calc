import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GuidesListing } from "@/components/guides-listing";

export const metadata: Metadata = {
  title: "Guides - YouTube Playlist Length Calculator Tutorials",
  description:
    "Step-by-step guides on calculating YouTube playlist length, planning watch time with playback speed, scheduling courses, and understanding playlist duration.",
  alternates: {
    canonical: "https://ytplaylistlength.pro/guides",
  },
  openGraph: {
    title: "Guides - YouTube Playlist Length Calculator Tutorials",
    description:
      "Practical tutorials for calculating and planning YouTube playlist watch time.",
    url: "https://ytplaylistlength.pro/guides",
    type: "website",
  },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      <GuidesListing locale="en" />
      <Footer />
    </div>
  );
}
