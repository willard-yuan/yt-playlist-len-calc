import {
  Layers,
  ListOrdered,
  Gauge,
  Video,
  CalendarClock,
  FileSpreadsheet,
  GraduationCap,
  Music,
  Tv,
  BookOpen,
  Scissors,
  Presentation,
  Clapperboard,
  AlertTriangle,
  Timer,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

/**
 * Homepage rich-content sections — original copy describing the calculator's
 * features, use cases and benefits. Serves the primary (English) locale;
 * secondary locales (hi/tr) fall back to this English copy.
 */

const features = [
  {
    icon: Layers,
    title: "Multiple Playlists Support",
    desc: "Calculate several YouTube playlist lengths at once. Paste a few links and get the combined total duration for all of them in a single view.",
    tint: "from-purple-500/15 to-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    icon: ListOrdered,
    title: "Video Range Calculator",
    desc: "Measure only a specific slice of a playlist. Perfect for planning study sessions, course modules, or rewatching a middle section.",
    tint: "from-blue-500/15 to-blue-500/5 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Gauge,
    title: "Playback Speed Calculator",
    desc: "See watch time at 1.25x, 1.5x, 1.75x and 2x. Plan exactly how fast you can finish a playlist without guessing.",
    tint: "from-pink-500/15 to-pink-500/5 text-pink-600 dark:text-pink-400",
  },
  {
    icon: Video,
    title: "Single Video Duration",
    desc: "Works with individual YouTube videos too. Get the duration and speed-adjusted watch time for any video, not just playlists.",
    tint: "from-indigo-500/15 to-indigo-500/5 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: CalendarClock,
    title: "Daily Watch Planner",
    desc: "Set your daily watch time and playback speed to see how many days it takes to finish. Ideal for online courses and study schedules.",
    tint: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: FileSpreadsheet,
    title: "Export to Excel",
    desc: "Download playlist data as a spreadsheet with video titles, channels, durations and clickable YouTube links for your own planning.",
    tint: "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400",
  },
];

const speedRows = [
  { original: "1 hour", s125: "48 min", s150: "40 min", s175: "34 min", s200: "30 min" },
  { original: "5 hours", s125: "4h", s150: "3h 20m", s175: "2h 51m", s200: "2h 30m" },
  { original: "10 hours", s125: "8h", s150: "6h 40m", s175: "5h 43m", s200: "5h" },
  { original: "20 hours", s125: "16h", s150: "13h 20m", s175: "11h 26m", s200: "10h" },
  { original: "50 hours", s125: "40h", s150: "33h 20m", s175: "28h 34m", s200: "25h" },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Online Course Planning",
    desc: "Found a free programming course with 150 videos? Get the total duration — a 45-hour course at 2x speed is about 22.5 hours of real watching.",
    tint: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Music,
    title: "Music Playlist Duration",
    desc: "Building a workout or road-trip mix? See the exact runtime so you always have enough music — a 3-hour playlist fits a long drive perfectly.",
    tint: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Tv,
    title: "Binge-Watching Planning",
    desc: "Want to finish a documentary series this weekend? If it is 12 hours, plan 6 hours a day or watch at 1.5x to wrap up sooner.",
    tint: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: BookOpen,
    title: "Exam Preparation",
    desc: "Your professor shared review lectures and exams are in 5 days. Check the total time, divide by your available study hours, and build a realistic schedule.",
    tint: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Scissors,
    title: "Partial Playlist Calculation",
    desc: "Already watched the first 30 of a 100-video playlist? Calculate only videos 31 to 100 and know exactly how much time remains.",
    tint: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "YouTube Content Research & Comparison",
    desc: "Research competitor playlists or analyze content gaps in your niche. Compare total watch time across multiple YouTube channels to benchmark your own content strategy.",
    tint: "text-orange-600 dark:text-orange-400",
  },
];

const personas = [
  {
    icon: GraduationCap,
    title: "Students & Online Learners",
    desc: "Estimate study time before starting a new course and know precisely how many hours you need to dedicate.",
    tint: "from-purple-500/15 to-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Presentation,
    title: "Teachers & Educators",
    desc: "Provide accurate time estimates when assigning video homework so students can plan their sessions effectively.",
    tint: "from-blue-500/15 to-blue-500/5 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Clapperboard,
    title: "Content Creators",
    desc: "Analyze your own playlists or compare with competitors to understand how much content you offer viewers.",
    tint: "from-pink-500/15 to-pink-500/5 text-pink-600 dark:text-pink-400",
  },
  {
    icon: Tv,
    title: "Entertainment Enthusiasts",
    desc: "Plan a binge session, commute mix or weekend marathon and see exactly how long your favorite playlist will take.",
    tint: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
];

export default function HomeRichSections() {
  return (
    <>
      {/* ===== Section A: Everything You Need to Calculate Playlist Time ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase mb-3">
            All-in-one toolkit
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Everything You Need to Calculate Playlist Time
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful YouTube playlist length calculator — completely free, with every feature you need to plan your watching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group p-8 rounded-3xl bg-background border border-border/50 hover:border-purple-500/40 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.tint} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Section B: Playlist Length Calculator Speed Comparison ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
            Watch smarter, not longer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Playlist Length Calculator Speed Comparison
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how much time you save by watching at different speeds with our playlist length calculator.
          </p>
        </div>

        <div className="bg-background border border-border/50 rounded-3xl p-6 md:p-10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">Original Duration</th>
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">1.25x</th>
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">1.5x</th>
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">1.75x</th>
                  <th className="py-4 px-4 text-sm font-semibold text-green-600 dark:text-green-400">2x</th>
                </tr>
              </thead>
              <tbody>
                {speedRows.map((r) => (
                  <tr key={r.original} className="border-b border-border/40 last:border-0">
                    <td className="py-4 px-4 font-medium">{r.original}</td>
                    <td className="py-4 px-4 text-muted-foreground">{r.s125}</td>
                    <td className="py-4 px-4 text-muted-foreground">{r.s150}</td>
                    <td className="py-4 px-4 text-muted-foreground">{r.s175}</td>
                    <td className="py-4 px-4 font-semibold text-green-600 dark:text-green-400 bg-green-500/5 rounded-l-lg">{r.s200}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-50/70 to-blue-50/70 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200/60 dark:border-purple-800/40 p-6">
            <Timer className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <p className="text-base leading-relaxed">
              At <strong>2x speed you save 50%</strong> of your viewing time. A 50-hour course becomes just{" "}
              <strong className="text-purple-600 dark:text-purple-400">25 hours</strong> — use our playlist length calculator to plan it precisely.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Section C: Common Use Cases for Playlist Length Calculator ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-pink-600 dark:text-pink-400 uppercase mb-3">
            Real-world applications
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Common Use Cases for Playlist Length Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real scenarios where knowing your playlist length makes a difference in daily planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((u) => {
            const Icon = u.icon;
            return (
              <div
                key={u.title}
                className="group p-8 rounded-3xl bg-secondary/5 border border-border/50 hover:bg-secondary/10 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-5 ${u.tint}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-3">{u.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{u.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Section D: Who Uses the YouTube Playlist Length Calculator? ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase mb-3">
            Built for everyone
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Who Uses the YouTube Playlist Length Calculator?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Students, educators, content creators and anyone who wants to manage their YouTube viewing time effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group p-8 rounded-3xl bg-background border border-border/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.tint} flex items-center justify-center mb-6`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold mb-3 leading-snug">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Section E: Why Use a YouTube Playlist Length Calculator? ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase mb-3">
            Why it matters
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Why Use a YouTube Playlist Length Calculator?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            YouTube doesn&apos;t show total playlist duration. Our calculator solves this problem instantly — so you can plan your time with confidence.
          </p>
        </div>

        {/* Card 1: The Core Problem */}
        <div className="relative p-10 md:p-12 rounded-3xl bg-background border border-border/50 overflow-hidden mb-8 hover:border-red-500/30 transition-colors duration-300">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/8 rounded-full blur-3xl" />
          <div className="flex items-start gap-6 mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/15 to-orange-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-7 w-7 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">The Problem: YouTube Doesn&apos;t Show Total Playlist Time</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg mb-5">
            Have you ever found a YouTube playlist for an online course, tutorial series, or music collection and wondered: &ldquo;How long will this take to watch?&rdquo; Unfortunately, YouTube only shows the number of videos in a playlist &mdash; not the total duration. This makes it nearly impossible to plan your viewing schedule or estimate how much time you need to complete a course before a deadline.
          </p>
          <div className="rounded-2xl bg-red-500/5 border border-red-200/50 dark:border-red-900/30 p-6">
            <p className="text-base leading-relaxed">
              Our <strong>YouTube Playlist Length Calculator</strong> solves this problem by instantly calculating the total duration of any playlist. Simply paste the URL, and you&apos;ll know exactly how many hours, minutes, and seconds of content you&apos;re looking at &mdash; no manual adding required.
            </p>
          </div>
        </div>

        {/* Card 2: Playback Speed Deep Dive */}
        <div className="relative p-10 md:p-12 rounded-3xl bg-background border border-border/50 overflow-hidden mb-8 hover:border-green-500/30 transition-colors duration-300">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-500/8 rounded-full blur-3xl" />
          <div className="flex items-start gap-6 mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/15 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <Gauge className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Save Time with Playback Speed Calculations</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            Most people don&apos;t watch videos at normal speed anymore. If you&apos;re a student trying to get through lecture videos quickly, or someone who prefers faster playback, knowing the actual watch time at different speeds is crucial for planning. Our playlist time calculator shows you exactly how long it takes to finish a playlist at every common playback rate:
          </p>

          {/* Speed breakdown list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                speed: "1.25x speed",
                benefit: "Save 20% of your time while maintaining good comprehension",
                tint: "from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-300",
              },
              {
                speed: "1.5x speed",
                benefit: "Cut viewing time by one-third, ideal for review sessions and familiar topics",
                tint: "from-indigo-500/10 to-indigo-500/5 text-indigo-700 dark:text-indigo-300",
              },
              {
                speed: "1.75x speed",
                benefit: "For experienced speed-watchers who want maximum efficiency without losing context",
                tint: "from-purple-500/10 to-purple-500/5 text-purple-700 dark:text-purple-300",
              },
              {
                speed: "2x speed",
                benefit: "Finish in half the time — perfect for rewatching familiar content or skimming known material",
                tint: "from-green-500/10 to-green-500/5 text-green-700 dark:text-green-300 font-semibold",
              },
            ].map((item) => (
              <div
                key={item.speed}
                className={`flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br ${item.tint} border border-border/40`}
              >
                <Timer className="h-5 w-5 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="font-semibold text-sm">{item.speed}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.benefit}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-green-50/70 to-emerald-50/70 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/60 dark:border-green-800/40 p-6">
            <p className="text-base leading-relaxed">
              For example, a <strong>10-hour playlist becomes just 5 hours at 2x speed</strong>. That&apos;s a significant time saving when you&apos;re trying to complete an online course before a deadline, catch up on a long tutorial series over a weekend, or fit a music mix into your commute. Our calculator shows these numbers instantly so you can make informed decisions about how to allocate your viewing time.
            </p>
          </div>
        </div>

        {/* Card 3: Learning Schedule Planning */}
        <div className="relative p-10 md:p-12 rounded-3xl bg-background border border-border/50 overflow-hidden hover:border-blue-500/30 transition-colors duration-300">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/8 rounded-full blur-3xl" />
          <div className="flex items-start gap-6 mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <CalendarClock className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Plan Your Learning Schedule Effectively</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            Whether you&apos;re studying for an exam, learning a new skill, or planning your entertainment time, knowing the exact playlist duration helps you take control of your schedule instead of guessing. Here is what our calculator enables you to do:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: GraduationCap,
                title: "Set realistic daily or weekly viewing goals",
                desc: "Break down a 40-hour course into manageable 2-hour daily sessions across three weeks.",
              },
              {
                icon: Timer,
                title: "Estimate when you'll complete a course or series",
                desc: "Know your finish date upfront so you can plan around exams, work deadlines, or travel.",
              },
              {
                icon: BookOpen,
                title: "Decide if a playlist fits your available time",
                desc: "Quickly determine whether a 25-hour tutorial fits into your free weekend or needs to wait.",
              },
              {
                icon: ListOrdered,
                title: "Track your progress through long playlists",
                desc: "Use partial range calculation to measure remaining time after you've already watched the first batch.",
              },
              {
                icon: FileSpreadsheet,
                title: "Compare different courses by total time commitment",
                desc: "Choose between competing tutorials based on actual content hours, not just video count.",
              },
              {
                icon: Gauge,
                title: "Optimize playback speed per difficulty level",
                desc: "Watch introductory material at 2x and complex topics at 1.25x — calculate the blended total.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-border/40 hover:bg-secondary/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-snug">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Section F: Related Guides (internal links for SEO + UX) ===== */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase mb-3">
            Learn more
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Helpful Guides &amp; Calculators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guides to get the most out of playlist length planning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "How to Calculate YouTube Playlist Length",
              desc: "Paste a URL and read total hours, minutes and seconds in seconds.",
              href: "/guides/how-to-calculate-youtube-playlist-length",
            },
            {
              title: "YouTube Playback Speed & Watch Time",
              desc: "See how 1.25x–2x changes your total watch time.",
              href: "/guides/youtube-playback-speed-watch-time",
            },
            {
              title: "Plan an Online Course Playlist Schedule",
              desc: "Turn a long course into a daily study plan.",
              href: "/guides/plan-online-course-playlist-schedule",
            },
            {
              title: "Calculate Partial Playlist Duration",
              desc: "Measure only the videos you haven't watched yet.",
              href: "/guides/calculate-partial-playlist-duration",
            },
          ].map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group p-6 rounded-3xl bg-background border border-border/50 hover:border-purple-500/40 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-base font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {g.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{g.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 dark:text-purple-400">
                Read guide
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
