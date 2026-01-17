"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";

export default function LatestPosts() {
  // Get the latest 3 posts
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="pb-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Latest Posts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check out our latest articles and tutorials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <div 
              key={post.id} 
              className="group flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishDate}>
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>

                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mt-auto"
                >
                  Read more 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="rounded-full px-8 py-6 text-base group hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
            <Link href="/blog" className="flex items-center gap-2">
              Read More Posts
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
