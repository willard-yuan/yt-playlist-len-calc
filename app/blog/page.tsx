import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogContent } from "@/components/blog-content";

export const metadata: Metadata = {
  title: "Blog - YouTube Playlist Length Calculator Insights",
  description: "Read articles about YouTube tips, playlist management, and development insights from the creator of YouTube Playlist Length Calculator.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/blog',
  },
  openGraph: {
    title: "Blog - YouTube Playlist Length Calculator Insights",
    description: "Read articles about YouTube tips, playlist management, and development insights.",
    url: 'https://ytplaylistlength.pro/blog',
  }
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      <BlogContent locale="en" />
      <Footer />
    </div>
  );
}
