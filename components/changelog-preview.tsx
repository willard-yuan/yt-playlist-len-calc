"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Star, Zap, Bug, Plus, Sparkles } from "lucide-react";
import { changelogEntries } from "@/lib/changelog-data";

export function ChangelogPreview() {
  // Get the latest 3 entries
  const latestEntries = changelogEntries.slice(0, 3);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "major":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "feature":
        return <Plus className="h-4 w-4 text-green-500" />;
      case "bugfix":
        return <Bug className="h-4 w-4 text-red-500" />;
      default:
        return <Zap className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "major":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "feature":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "bugfix":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  return (
    <section className="mb-40" id="changelog-preview">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-6">
          <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Latest Updates
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We&apos;re constantly improving. Check out the latest features and enhancements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {latestEntries.map((entry) => (
          <div 
            key={entry.version}
            className="flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-border/50 bg-secondary/20">
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTypeColor(entry.type)} flex items-center gap-2`}>
                  {getTypeIcon(entry.type)}
                  {entry.type}
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {entry.version}
              </h3>
              <p className="text-muted-foreground font-medium line-clamp-2 min-h-[3rem]">
                {entry.title}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex-grow">
              <ul className="space-y-3">
                {entry.changes.slice(0, 3).map((change, idx) => (
                  <li key={idx} className="flex items-start text-sm text-muted-foreground leading-relaxed">
                    <span className="mr-2.5 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500/50" />
                    <span className="line-clamp-2">
                      {change}
                    </span>
                  </li>
                ))}
                {entry.changes.length > 3 && (
                  <li className="pt-2 text-xs font-medium text-muted-foreground italic">
                    + {entry.changes.length - 3} more updates...
                  </li>
                )}
              </ul>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 pt-0 mt-auto">
              <Link 
                href="/changelog" 
                className="inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
              >
                Read full notes 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link 
          href="/changelog" 
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors duration-200"
        >
          View All Updates
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
