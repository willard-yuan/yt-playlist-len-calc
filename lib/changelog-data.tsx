import Link from "next/link";

export const changelogEntries = [
  {
    version: "v1.4.5",
    date: "2026-01-18",
    type: "feature",
    title: "Ecosystem Expansion & User Experience Polish",
    changes: [
      <span key="new-section">🚀 NEW: Added <Link href="/#tools" className="text-purple-600 hover:underline">Other Playlist Tools</Link> section on homepage for better discovery</span>,
      <span key="randomizer">🔀 NEW: Integrated quick access to <Link href="/youtube-playlist-randomizer" className="text-purple-600 hover:underline">Playlist Randomizer</Link> directly in video results</span>,
      "✨ Enhanced SEO coverage for all tool pages in sitemap",
      "🐛 Fixed text escaping issues in SEO content components",
      "🎨 Improved visual consistency for action buttons across the platform"
    ]
  },
  {
    version: "v1.4.4",
    date: "2025-12-27",
    type: "feature",
    title: "UI Unification, New Features & Navigation",
    changes: [
      <span key="ui">🎨 UI Unification: Standardized inputs with modern &apos;Capsule&apos; design & glassmorphism</span>,
      "⚡️ Speed Slider: Interactive gradient slider for precise playback control (0.25x - 2x)",
      "🔍 Video Search: Real-time keyword filtering for playlist videos",
      "📚 FAQ Update: Added 8 new comprehensive questions to help users",
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
