import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Clock, ArrowLeft, Search, Zap, CheckCircle2, AlertCircle, Quote, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Search a Video Inside a YouTube Playlist: V1.4.4 Update",
  description: "Finally! A solution to the missing 'search in playlist' feature. Discover how our latest V1.4.4 update lets you instantly filter and find videos in massive YouTube playlists.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/blog/how-to-search-video-inside-youtube-playlist',
  },
  openGraph: {
    title: "How to Search a Video Inside a YouTube Playlist: V1.4.4 Update",
    description: "Finally! A solution to the missing 'search in playlist' feature. Discover how our latest V1.4.4 update lets you instantly filter and find videos in massive YouTube playlists.",
    url: 'https://ytplaylistlength.pro/blog/how-to-search-video-inside-youtube-playlist',
    type: 'article',
    publishedTime: '2025-12-27',
    authors: ['YouTube Playlist Length Calculator'],
    images: [
      {
        url: 'https://ytplaylistlength.pro/blog-images/How_to_Search_a_Video_Inside_Youtube_Playlist_1.webp',
        width: 1200,
        height: 630,
        alt: 'Searching for videos inside a YouTube playlist',
      }
    ]
  }
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-purple-500/30">
      <Navbar />
      <main>
      
      {/* Article Header */}
      <article className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog */}
          <div className="max-w-3xl mx-auto mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>

          {/* Article Title Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
              <Badge variant="outline" className="border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/10 px-3 py-1 text-sm">
                New Feature
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                V1.4.4 Update
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              How to Search a Video Inside a <br className="hidden md:block"/>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">YouTube Playlist</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mb-8">
              It&apos;s 2025, and YouTube still hasn&apos;t added a search bar to playlists. <br className="hidden md:block"/>We decided to fix that for you.
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground border-t border-border/40 pt-8 max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">YT</div>
                <span className="font-medium text-foreground">Team YTPLC</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Dec 27, 2025
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                5 min read
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-5xl mx-auto relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl border border-border/50 bg-secondary/30 group">
            <img 
              src="/blog-images/How_to_Search_a_Video_Inside_Youtube_Playlist_1.webp" 
              alt="Frustrated user trying to find a video in a YouTube playlist" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-6 right-6 text-center md:text-left">
              <p className="text-sm font-medium text-white/90 backdrop-blur-sm bg-black/30 inline-block px-3 py-1 rounded-full">
                The Struggle is Real: Finding one video in thousands
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg">
            
            {/* Intro Quote */}
            <div className="not-prose mb-12">
              <div className="relative pl-8 md:pl-10 py-2 border-l-4 border-purple-500/50">
                <Quote className="absolute top-0 left-0 h-6 w-6 text-purple-500/20 -translate-x-2 -translate-y-2" />
                <p className="text-xl md:text-2xl font-medium italic text-muted-foreground leading-relaxed">
                  &quot;Is it just me, or is it completely insane that in 2025, we still can&apos;t search for a video within a playlist?&quot;
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <span>— Frustrated User on</span>
                  <a href="https://www.reddit.com/r/youtube/comments/1mpkwt0/is_it_just_me_or_is_it_completely_insane_that_in/" target="_blank" rel="noopener noreferrer" className="text-[#FF4500] hover:underline inline-flex items-center gap-1">
                    Reddit
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            
            <p>
              This question has resonated with thousands of frustrated users. And honestly? They have a point.
            </p>

            {/* The Problem Section */}
            <div className="my-16 bg-red-50/50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/20">
              <h2 className="flex items-center gap-3 text-red-700 dark:text-red-400 mt-0 mb-6">
                <AlertCircle className="h-7 w-7" />
                The Problem: The Endless Scroll
              </h2>

              <p className="text-foreground/90">
                If you have a playlist with hundreds—or even thousands—of videos (think coding tutorials, historical documentaries, or music archives), finding one specific clip is a nightmare. 
              </p>

              <p className="font-semibold text-foreground/80 mt-6 mb-4">Your current options on YouTube are painful:</p>
              
              <ul className="grid gap-3 list-none pl-0 my-0">
                {[
                  { title: "Manual Scrolling", desc: "Scroll, scroll, wait for lazy loading, scroll more... until your finger hurts." },
                  { title: "Ctrl+F Fails", desc: "Browsers can't find text in videos that haven't loaded yet. Position #450? Good luck." },
                  { title: "Global Search", desc: "Takes you out of the playlist context, losing your queue and 'Up Next' flow." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start bg-background/50 p-4 rounded-xl border border-red-100/50 dark:border-red-900/10">
                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold mt-0.5">✕</span>
                    <div>
                      <strong className="block text-foreground">{item.title}</strong>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground italic mt-6 border-t border-red-200/50 dark:border-red-800/20 pt-4">
                &quot;It feels like we&apos;re being told that our video collections are important, but not important enough to be easily navigable.&quot;
              </p>
            </div>

            {/* The Solution Section */}
            <div className="relative">
              <div className="absolute -left-4 -right-4 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              
              <h2 className="flex items-center gap-3 text-purple-600 dark:text-purple-400 mt-12">
                <CheckCircle2 className="h-8 w-8" />
                The Solution: V1.4.4 Real-Time Search
              </h2>

              <p>
                At <strong>YouTube Playlist Length Calculator</strong>, we listen to our users. We realized that calculating duration is just <em>one</em> part of managing a playlist. Finding content <em>inside</em> it is just as critical.
              </p>

              <p className="text-lg font-medium text-foreground">
                That&apos;s why we are thrilled to announce <strong>Version 1.4.4</strong>, featuring a dedicated <strong>In-Playlist Video Search Engine</strong>.
              </p>

              <figure className="my-12 not-prose">
                <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl border border-purple-500/20 bg-secondary/30 group">
                  <img 
                    src="/blog-images/How_to_Search_a_Video_Inside_Youtube_Playlist_2.webp" 
                    alt="New search feature in V1.4.4 showing filtered playlist results" 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="text-center text-sm text-muted-foreground mt-4">
                  Experience instant, real-time filtering as you type.
                </figcaption>
              </figure>

              <h3 className="text-xl font-bold mb-6">How It Works</h3>
              
              <div className="not-prose space-y-4 mb-12">
                {[
                  { step: "01", title: "Analyze Your Playlist", desc: "Paste your playlist URL as usual on our homepage." },
                  { step: "02", title: "Type to Filter", desc: "Scroll to the 'Videos' list and start typing in the new search bar." },
                  { step: "03", title: "Instant Results", desc: "The list filters instantly. No reloading, no waiting." },
                  { step: "04", title: "Context Preserved", desc: "Original video numbering (e.g., #42) stays visible." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-secondary/40 transition-colors group">
                    <span className="text-3xl font-black text-muted-foreground/20 group-hover:text-purple-500/20 transition-colors">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-foreground text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="my-16">
              <h2 className="flex items-center gap-3 text-foreground mb-8">
                <Zap className="h-7 w-7 text-yellow-500" />
                More Than Just Search: V1.4.4 Highlights
              </h2>

              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <div className="bg-gradient-to-br from-secondary/50 to-secondary/20 p-8 rounded-3xl border border-border/50 hover:border-purple-500/30 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">
                    🎨
                  </div>
                  <h4 className="font-bold text-lg mb-2">Unified UI Design</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Standardized input fields with a modern &quot;Capsule&quot; design, glassmorphism, and breathing gradient glows.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-secondary/50 to-secondary/20 p-8 rounded-3xl border border-border/50 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">
                    ⚡️
                  </div>
                  <h4 className="font-bold text-lg mb-2">New Speed Slider</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Interactive gradient slider for precise playback speed control (0.25x - 2x) with haptic-like visual feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Conclusion & CTA */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-6">Why This Matters</h2>
              <p className="text-lg text-muted-foreground">
                In an era where we use YouTube for learning and research, efficiency is everything. With V1.4.4, we&apos;re not just calculating time; we&apos;re <strong>saving your time</strong> by making navigation effortless.
              </p>

              <div className="mt-16 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-600 to-blue-600 p-10 md:p-14 text-center shadow-2xl">
                {/* Decorative background circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">
                    Try the New Search Feature Now
                  </h3>
                  <p className="mb-10 text-purple-100 text-lg max-w-xl mx-auto font-medium">
                    Don&apos;t waste another minute scrolling. Paste your playlist link and find exactly what you need in seconds.
                  </p>
                  <Link href="/">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-bold text-lg h-16 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group">
                      Analyze & Search Playlist
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>

      </main>
      <Footer />
    </div>
  );
}