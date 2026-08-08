import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Play, Clock, BarChart3, Zap, Users, Target, Lightbulb, Github, Twitter, Linkedin, Mail, MapPin, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About - YouTube Playlist Length Calculator by Willard Yuan",
  description: "Meet Willard Yuan, the developer behind the YouTube Playlist Length Calculator. Learn why it was built, how it works, and how to get in touch.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/about',
  },
  openGraph: {
    title: "About - YouTube Playlist Length Calculator by Willard Yuan",
    description: "Meet the developer behind the YouTube Playlist Length Calculator and learn why it was built.",
    url: 'https://ytplaylistlength.pro/about',
  }
};

// NOTE: Confirm/adjust the LinkedIn URL and email below before deploying.
const AUTHOR = {
  name: "Willard Yuan",
  handle: "@Yong",
  title: "Full-stack Developer & Indie Maker",
  location: "China",
  avatar: "https://github.com/willard-yuan.png",
  github: "https://github.com/willard-yuan",
  twitter: "https://twitter.com/Yong",
  // TODO: verify your real LinkedIn profile URL
  linkedin: "https://www.linkedin.com/in/willard-yuan",
  // TODO: replace with your real contact email
  email: "contact@ytplaylistlength.pro",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      <main>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse dark:from-purple-500/30 dark:to-blue-500/30"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/30 dark:to-purple-500/30"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000 dark:from-purple-500/30 dark:to-pink-500/30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
              About the Creator
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hi, I&apos;m Willard
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I&apos;m an independent full-stack developer, and I built this YouTube Playlist Length
              Calculator to solve a problem I kept hitting myself.
            </p>
          </div>
        </div>
      </div>

      {/* Author Card */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-3xl p-8 lg:p-12 shadow-lg flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <img
                src={AUTHOR.avatar}
                alt={`${AUTHOR.name} - creator of YouTube Playlist Length Calculator`}
                width={112}
                height={112}
                className="w-28 h-28 rounded-full shadow-lg border-4 border-background object-cover shrink-0"
              />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-1">{AUTHOR.name}</h2>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">{AUTHOR.title}</p>
                <p className="flex items-center justify-center md:justify-start gap-1.5 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" /> {AUTHOR.location}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I build small, focused web tools that do one thing well. I care about clean interfaces,
                  accurate results, and respecting your privacy — no accounts, no tracking, no nonsense.
                  When I&apos;m not coding, I&apos;m usually down a YouTube rabbit hole myself.
                </p>

                {/* Social links */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href={AUTHOR.github}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href={AUTHOR.twitter}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Twitter className="w-4 h-4" /> X (Twitter)
                  </a>
                  <a
                    href={AUTHOR.linkedin}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    href={`mailto:${AUTHOR.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why I Built This
            </h2>
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 shadow-lg space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Like a lot of people, I learn from YouTube. Before starting a long lecture series or a
                &quot;watch later&quot; list, I always had the same question: <span className="text-foreground font-medium">how much of my life is this going to take?</span>
                YouTube shows the duration of a single video, but never the total time of an entire playlist.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                So in 2025 I built a small tool to answer exactly that. Paste a playlist link, get the total
                hours and minutes back, and — because I watch most things at 1.5x or 2x — see how long it
                really takes at different playback speeds. It started as a personal weekend project and grew
                from there based on what people told me they wanted.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today it&apos;s used by students planning study schedules, teachers assigning video homework,
                and creators auditing their own channels. That feedback loop is the whole point — the tool
                gets better because real people use it and tell me what&apos;s missing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission / Principles */}
      <div className="py-16 bg-gradient-to-r from-muted/20 to-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              What I Care About
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles I build every feature around
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Play className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">Accurate Results</h4>
                <p className="text-muted-foreground text-sm">Real durations fetched directly, down to the second.</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Clock className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">Time Saved</h4>
                <p className="text-muted-foreground text-sm">Plan watch time at 1.25x–2x speeds.</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Code2 className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">No Tracking</h4>
                <p className="text-muted-foreground text-sm">No account, no storage of your playlists.</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Users className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">Built With You</h4>
                <p className="text-muted-foreground text-sm">Shaped by real user feedback.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-10 lg:p-14 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Let&apos;s Talk</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Found a bug? Have a feature idea? Want to say hi? I read every message.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-700 font-semibold hover:scale-105 transition-transform duration-300"
            >
              <Mail className="w-5 h-5" /> Contact Me
            </a>
          </div>
        </div>
      </div>

      </main>
      <Footer />

      {/* Person structured data for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": AUTHOR.name,
            "url": AUTHOR.github,
            "image": AUTHOR.avatar,
            "jobTitle": AUTHOR.title,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": AUTHOR.location
            },
            "sameAs": [
              AUTHOR.github,
              AUTHOR.twitter,
              AUTHOR.linkedin
            ]
          })
        }}
      />
    </div>
  );
}
