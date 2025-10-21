"use client"

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const blogPosts = [
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
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/20 dark:from-purple-500/20 dark:to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-purple-500/30 dark:from-blue-500/10 dark:to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {/* Star Decorations */}
          <div className="absolute top-32 left-20 text-purple-500 dark:text-purple-400 animate-pulse">
            <Star className="h-6 w-6 fill-current" />
          </div>
          <div className="absolute top-48 right-32 text-purple-500 dark:text-purple-400 animate-pulse delay-500">
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>

        {/* Blog Header */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Insights, tutorials, and stories about YouTube playlist management, web development, and digital productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:gap-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/30 dark:to-gray-800/20 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <div className="md:flex">
                {/* Cover Image */}
                <div className="md:w-1/3 relative overflow-hidden">
                  <div className="aspect-video md:aspect-square relative">
                    <Image
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {post.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6 md:p-8">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <CardDescription className="text-base leading-relaxed mb-6">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors group"
                    >
                      Read Full Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for Future Posts */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">More Articles Coming Soon!</h3>
            <p className="text-muted-foreground">
              We're working on more insightful articles about YouTube playlist management and web development.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}