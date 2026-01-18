import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Star, Zap, Bug, Plus, ArrowUp, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog - YouTube Playlist Length Calculator Updates",
  description: "See the latest features, updates, and improvements to our YouTube Playlist Calculator. We are constantly improving.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/changelog',
  },
  openGraph: {
    title: "Changelog - YouTube Playlist Length Calculator Updates",
    description: "See the latest features, updates, and improvements to our YouTube Playlist Calculator.",
    url: 'https://ytplaylistlength.pro/changelog',
  }
};

import { changelogEntries } from "@/lib/changelog-data";

export default function Changelog() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "major":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "feature":
        return <Plus className="h-5 w-5 text-green-500" />;
      case "bugfix":
        return <Bug className="h-5 w-5 text-red-500" />;
      default:
        return <Zap className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "major":
        return "from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400";
      case "feature":
        return "from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400";
      case "bugfix":
        return "from-red-500/20 to-pink-500/20 text-red-600 dark:text-red-400";
      default:
        return "from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-secondary/50 backdrop-blur-sm rounded-3xl mb-8 shadow-sm">
              <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] pb-4">
              Changelog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mt-6">
              Track all the improvements, new features, and bug fixes we&apos;ve made to enhance your YouTube playlist analysis experience.
            </p>
          </div>
        </div>
      </div>

      <main className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Changelog Entries */}
          <div className="space-y-12">
            {changelogEntries.map((entry) => (
              <div
                key={entry.version}
                className="group relative bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Version Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-br ${getTypeColor(entry.type)} rounded-2xl`}>
                      {getTypeIcon(entry.type)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">{entry.version}</h2>
                      <p className="text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className={`self-start sm:self-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${getTypeColor(entry.type)}`}>
                    {entry.type}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-6">{entry.title}</h3>

                {/* Changes List */}
                <ul className="space-y-4">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start space-x-3 text-lg text-muted-foreground leading-relaxed">
                      <div className="flex-shrink-0 mt-1.5">
                        <ArrowUp className="h-5 w-5 text-green-500 transform rotate-45" />
                      </div>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Message */}
          <div className="text-center mt-24 p-12 bg-secondary/30 backdrop-blur-sm rounded-3xl">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              We&apos;re constantly working to improve your experience. Check back regularly for the latest updates and features!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}