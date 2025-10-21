import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Star, Zap, Bug, Plus, ArrowUp, Sparkles } from "lucide-react";

export default function Changelog() {
  const changelogEntries = [
    {
      version: "v1.5.5",
      date: "2025-10-21",
      type: "feature",
      title: "YouTube Playlist Exporter & Blog Enhancement",
      changes: [
        "🎉 NEW: YouTube Playlist Exporter - Export playlists to CSV, Excel, Text, and HTML bookmark formats",
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
      version: "v1.5.0",
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
      version: "v1.4.0",
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
      version: "v1.3.0",
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
        return "from-yellow-500 to-orange-500";
      case "feature":
        return "from-green-500 to-emerald-500";
      case "bugfix":
        return "from-red-500 to-pink-500";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-purple-300/30 animate-pulse">
          <Star className="h-6 w-6 fill-current" />
        </div>
        <div className="absolute top-40 right-20 text-pink-300/30 animate-pulse delay-1000">
          <Sparkles className="h-8 w-8 fill-current" />
        </div>
        <div className="absolute bottom-40 left-20 text-purple-300/30 animate-pulse delay-2000">
          <Zap className="h-7 w-7 fill-current" />
        </div>
        <div className="absolute bottom-20 right-10 text-pink-300/30 animate-pulse delay-500">
          <Star className="h-5 w-5 fill-current" />
        </div>
      </div>

      <div className="relative pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Changelog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track all the improvements, new features, and bug fixes we've made to enhance your YouTube playlist analysis experience.
            </p>
          </div>

          {/* Changelog Entries */}
          <div className="space-y-8">
            {changelogEntries.map((entry, index) => (
              <div
                key={entry.version}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Version Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`inline-flex items-center justify-center p-2 bg-gradient-to-r ${getTypeColor(entry.type)} rounded-lg`}>
                      {getTypeIcon(entry.type)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{entry.version}</h2>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {entry.date}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(entry.type)} text-white`}>
                    {entry.type.toUpperCase()}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-4">{entry.title}</h3>

                {/* Changes List */}
                <ul className="space-y-3">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <ArrowUp className="h-4 w-4 text-green-500 transform rotate-45" />
                      </div>
                      <span className="text-muted-foreground">{change}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Message */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl">
            <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground">
              We're constantly working to improve your experience. Check back regularly for the latest updates and features!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}