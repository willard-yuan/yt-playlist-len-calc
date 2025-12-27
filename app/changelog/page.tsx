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

export default function Changelog() {
  const changelogEntries = [
    {
      version: "v1.4.4",
      date: "2025-12-27",
      type: "feature",
      title: "Enhanced Navigation & Social Proof",
      changes: [
        <span key="layout">Optimized homepage layout: Prioritized <Link href="/#quick-access" className="text-purple-600 hover:underline">Quick Access</Link> section for faster workflow</span>,
        <span key="testimonials">✨ NEW: Added <Link href="/#testimonials" className="text-purple-600 hover:underline">Testimonials</Link> section featuring user success stories</span>,
        "Expanded navigation menu with direct links to 'Playlists' and 'Testimonials'",
        "Improved mobile responsiveness for section ordering and navigation"
      ]
    },
    {
      version: "v1.4.3",
      date: "2025-12-20",
      type: "feature",
      title: "UI Optimization & Performance Improvements",
      changes: [
        <span key="faq">✨ NEW: Added <Link href="/#faq" className="text-purple-600 hover:underline">FAQs section</Link> to navigation bar with smooth scrolling support</span>,
        "Optimized 'Active Planning' and 'Playlist Analysis' sections with wider responsive layout",
        "Fixed 'Watch on YouTube' button text overflow on mobile devices",
        <span key="nav">Reorganized navigation menu for better accessibility: <Link href="/" className="text-purple-600 hover:underline">Home</Link> {"->"} <Link href="/#faq" className="text-purple-600 hover:underline">FAQs</Link> {"->"} <Link href="/blog" className="text-purple-600 hover:underline">Blog</Link> {"->"} Other Tools {"->"} Changelog</span>,
        "Resolved hydration warnings and optimized font loading performance",
        "Fixed missing grid background asset to eliminate 404 errors"
      ]
    },
    {
      version: "v1.4.2",
      date: "2025-12-12",
      type: "feature",
      title: "New Tools Page & UI Improvements",
      changes: [
        <span key="tools">✨ NEW: Added <Link href="/tools-you-may-also-like" className="text-purple-600 hover:underline">Tools You May Also Like</Link> page featuring curated developer tools</span>,
        "Improved navigation structure by moving 'About Us' to footer",
        "Enhanced UI consistency for buttons and tool cards with refined styling",
        "Fixed text clipping issues in hero section gradients across all pages"
      ]
    },
    {
      version: "v1.4.1",
      date: "2025-10-26",
      type: "feature",
      title: "Enhanced Loading Experience & User Interface",
      changes: [
        "🎨 NEW: Progressive loading indicators with meaningful step-by-step messages",
        "Added dynamic loading messages: 'Connecting to YouTube...', 'Fetching playlist data...', 'Analyzing video information...', 'Calculating durations...', 'Almost ready!'",
        "Implemented skeleton loading components that preview the actual results layout",
        "Enhanced submit button with animated progress bar and real-time loading feedback",
        "Added elegant form loading states with subtle animations and visual feedback",
        "Improved auto-scroll functionality with precise positioning to playlist analysis results",
        "Added loading message component with animated spinner and bouncing dots",
        "Implemented smart loading flow that transitions from messages to skeleton loading",
        "Enhanced user experience with disabled form states and visual overlays during processing",
        "Added comprehensive loading state management with proper cleanup and error handling"
      ]
    },
    {
      version: "v1.4.0",
      date: "2025-10-21",
      type: "feature",
      title: "YouTube Playlist Exporter & Blog Enhancement",
      changes: [
        <span key="exporter">🎉 NEW: <Link href="/youtube-playlist-exporter" className="text-purple-600 hover:underline">YouTube Playlist Exporter</Link> - Export playlists to CSV, Excel, Text, and HTML bookmark formats</span>,
        "Added comprehensive playlist data export including video titles, descriptions, durations, and metadata",
        "Implemented smart URL history with dropdown interface for quick access to recent playlists",
        "Added multiple export format support: CSV for data analysis, Excel for spreadsheets, Text for simple lists, HTML bookmarks for browsers",
        "Enhanced playlist analysis with detailed video information including views, likes, comments, and upload dates",
        "Added high-quality screenshots to blog articles for better visual storytelling",
        "Implemented dynamic cover images for blog posts in listing page",
        "Enhanced blog post layout with properly positioned images and captions",
        "Improved SEO metadata for YouTube Playlist Exporter page",
        "Optimized image loading and responsive design across all blog components"
      ]
    },
    {
      version: "v1.3.0",
      date: "2025-10-19",
      type: "feature",
      title: "Enhanced User Experience",
      changes: [
        "Added beautiful gradient backgrounds and animations",
        "Improved theme switching with optimized dark/light modes",
        "Enhanced logo design with YouTube and duration calculation integration",
        "Added smooth scrolling navigation between sections",
        "Optimized page loading performance"
      ]
    },
    {
      version: "v1.2.0",
      date: "2025-09-10",
      type: "major",
      title: "Complete UI Redesign",
      changes: [
        "Redesigned entire user interface with modern aesthetics",
        "Added responsive design for all screen sizes",
        "Implemented new color scheme and typography",
        "Enhanced accessibility features",
        "Added interactive elements and hover effects"
      ]
    },
    {
      version: "v1.1.0",
      date: "2025-09-01",
      type: "bugfix",
      title: "Bug Fixes and Improvements",
      changes: [
        "Fixed playlist calculation accuracy issues",
        "Improved error handling for invalid URLs",
        "Enhanced loading states and user feedback",
        "Fixed mobile responsiveness issues",
        "Optimized API response times"
      ]
    },
    {
      version: "v1.0.0",
      date: "2024-12-20",
      type: "feature",
      title: "Advanced Analytics",
      changes: [
        "Added detailed playlist statistics",
        "Implemented playback speed calculations",
        "Added duration estimates for different viewing scenarios",
        "Enhanced result display with comprehensive metrics",
        "Added export functionality for playlist data"
      ]
    },
    {
      version: "v0.5.0",
      date: "2024-12-10",
      type: "feature",
      title: "Performance Enhancements",
      changes: [
        "Improved playlist processing speed by 40%",
        "Added caching for frequently accessed playlists",
        "Optimized YouTube API usage",
        "Enhanced error recovery mechanisms",
        "Added progress indicators for long operations"
      ]
    },
    {
      version: "v0.0.1",
      date: "2024-11-25",
      type: "feature",
      title: "Core Features Launch",
      changes: [
        "Initial release of YouTube Playlist Length Calculator",
        "Basic playlist duration calculation",
        "Support for public YouTube playlists",
        "Simple and intuitive user interface",
        "Real-time playlist analysis"
      ]
    }
  ];

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