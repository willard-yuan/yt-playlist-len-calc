import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const blogPosts = [
    {
      id: 3,
      title: "How to Search a Video Inside a YouTube Playlist: V1.4.4 New Version Release!",
      slug: "how-to-search-video-inside-youtube-playlist",
      excerpt: "Struggling to find a specific video in a massive YouTube playlist? You're not alone. Discover how our latest V1.4.4 update solves this 8-year-old problem with instant playlist searching.",
      coverImage: "/blog-images/How_to_Search_a_Video_Inside_Youtube_Playlist_1.webp",
      publishDate: "2025-12-27",
      readTime: "5 min read",
      category: "New Features",
      tags: ["YouTube Tips", "Product Update", "Search"],
      featured: true
    },
    {
      id: 2,
      title: "Conquer the 46-Hour Marathon: How to Master Your Time and Finish the World's Most Popular YouTube Playlist",
      slug: "conquer-46-hour-marathon-youtube-most-viewed-playlist",
      excerpt: "A strategic guide to navigating the 500+ videos that define internet culture. Learn how to use our calculator and active planning to finish the 'Most Viewed' playlist.",
      coverImage: "/blog-images/youtube-most-viewed-videos-of-all-time.webp",
      publishDate: "2025-12-20",
      readTime: "10 min read",
      category: "Productivity",
      tags: ["YouTube Trends", "Time Management", "Guide"],
      featured: true
    },
    {
      id: 1,
      title: "How & Why I Have Created Youtube Playlist Length Calculator Web Application?",
      slug: "how-why-created-youtube-playlist-calculator",
      excerpt: "Discover the journey behind creating this powerful YouTube playlist calculator tool. Learn about the challenges, solutions, and technologies used to build a seamless user experience for calculating playlist durations.",
      coverImage: "/YouTube_Playlist_Length_Calculator_1.png",
      publishDate: "2025-01-19",
      readTime: "8 min read",
      category: "Development",
      tags: ["YouTube", "Web Development", "React", "Next.js"],
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] pb-4">
              Our
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent ml-4">
                Blog
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mt-6">
              Insights, tutorials, and stories about YouTube Playlist Length Calculator, YouTube Playlist Exporter, and digital productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <main className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="group relative bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="md:flex items-stretch">
                  {/* Cover Image */}
                  <div className="md:w-2/5 relative overflow-hidden min-h-[250px] md:min-h-0">
                    <Image
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10 opacity-60" />
                    
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0 px-3 py-1">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0 md:w-2/5" aria-hidden="true" />
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs font-medium text-muted-foreground bg-background/50 px-2.5 py-1 rounded-full border border-border/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State for Future Posts */}
          <div className="text-center py-24">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-300">
                <Star className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">More Articles Coming Soon!</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We&apos;re working on more insightful articles about YouTube playlist management and web development.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}