/* eslint-disable react/no-unescaped-entities */
import {
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  Calculator,
  Clock,
  ListOrdered,
  Target,
  Sparkles,
  Gauge,
  Filter,
  ShieldCheck,
  Layers,
  Globe,
  Timer,
  BarChart3,
  PlayCircle,
  Info,
} from "lucide-react";

type GuideContent = () => JSX.Element;

export const guideContent: Record<string, GuideContent> = {
  "how-to-calculate-youtube-playlist-length": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        You found a 300-video playlist you want to binge — but how long will it actually take? YouTube never shows a reliable total, and adding up durations by hand is hopeless. Here is the exact, repeatable way to get the true runtime of any playlist in seconds, plus what to do with that number once you have it.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Why YouTube Won't Tell You</h2>
      <p>
        YouTube displays a playlist length only in a few views, and even then it rounds aggressively. On a 300-video list, that rounding error can be off by an hour or more. The platform was built to keep you watching, not to help you plan your watch time — which is exactly the gap this calculator fills. Think of it as the difference between a fuel gauge that says "about half" and one that tells you precisely how many miles you have left.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">What You Actually Get in the Result</h2>
      <p>
        A single paste returns far more than a clock reading. Understanding each field helps you plan better:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Total duration</strong> — hours, minutes, and seconds summed exactly, not rounded.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Video count</strong> — how many items the playlist actually contains (handy for pacing).</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Average length per video</strong> — the single most useful number for reverse planning (see our "How many videos fit in X hours" guide).</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Adjusted time at common speeds</strong> — many results also show what the total becomes at 1.25x, 1.5x, or 2x.</span></li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <Lightbulb className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          Tip: keep the <strong>average video length</strong> handy. It powers the reverse-planning math in our "How many videos fit in X hours" guide and the weekly schedule in our course-planning guide.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Which Playlist Links Work</h2>
      <p>
        The calculator reads the playlist identifier (<code>list=PL…</code>), so almost any link that carries it will work:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Classic playlist URL:</strong> <code>https://www.youtube.com/playlist?list=PLxxxx</code></span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Share link with playlist param:</strong> <code>https://youtu.be/VIDEO_ID?list=PLxxxx</code> — the <code>list</code> part is what matters.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Channel Uploads / Videos tab:</strong> open a channel, go to the "Videos" playlist, and copy that URL.</span></li>
      </ul>
      <p className="mt-4">
        A plain video URL (no <code>list</code> parameter) is treated as a one-item playlist, so you can check a single video's exact length too. Note that auto-generated "Mix" or "Radio" streams are not stable playlists and usually won't resolve.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Step-by-Step: Get the Exact Total</h2>
      <ol className="space-y-4">
        <li className="flex items-start gap-3">
          <ListOrdered className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
          <span><strong>Open the playlist</strong> on YouTube and copy its URL. A typical link looks like <code>https://www.youtube.com/playlist?list=PLxxxx</code>.</span>
        </li>
        <li className="flex items-start gap-3">
          <ListOrdered className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
          <span><strong>Paste the URL</strong> into the calculator's input field on the homepage.</span>
        </li>
        <li className="flex items-start gap-3">
          <ListOrdered className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
          <span><strong>Wait a few seconds</strong> while each video's length is fetched and summed.</span>
        </li>
        <li className="flex items-start gap-3">
          <ListOrdered className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
          <span><strong>Read the result</strong> — total hours/minutes/seconds, video count, and average length per video.</span>
        </li>
      </ol>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">A Worked Example</h2>
      <p>
        Say a tutorial series has 84 videos. YouTube shows "84 videos" and nothing useful about time. The calculator returns:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Total duration: <strong>19h 12m</strong></span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Average video: <strong>13m 43s</strong></span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>At 1.5x speed: <strong>12h 48m</strong></span></li>
      </ul>
      <p className="mt-4">
        The same method looks very different for a music playlist. A 120-song chill mix averaging 3m 50s totals <strong>7h 40m</strong> — long enough for a full road trip. Same tool, two completely different planning stories. That contrast is the whole point: never trust the count alone.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Troubleshooting: When a Playlist Won't Load</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span><strong>Empty or zero result:</strong> the link may be a video without a playlist parameter, or a private playlist you don't own.</span></li>
        <li className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span><strong>Total seems short:</strong> some videos may be region-locked, age-restricted, or removed, so they return no duration.</span></li>
        <li className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span><strong>Slow on huge lists:</strong> 500+ videos are fetched one by one; give it a little longer before retrying.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Estimating from video count alone — 84 short clips and 84 long lectures are worlds apart in time.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Trusting YouTube's rounded display on huge lists.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Forgetting that region-locked or removed videos won't return a duration.</span></div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">What You Can Do Next</h2>
      <p>
        Once you know the true total, the interesting part begins: planning. Use the playback-speed guide to shrink it, the course-scheduling guide to spread it across weeks, or the partial-playlist guide to tackle just a section. Either way, you are now working from facts instead of guesses.
      </p>
    </>
  ),

  "youtube-playback-speed-watch-time": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        Watching at 1.5x is the single easiest productivity hack on YouTube. But how much time does it actually save, and when does "faster" start costing you comprehension? Here is the exact math, a reusable table, and practical guidance for every device.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">The Formula</h2>
      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8">
        <p className="m-0 font-mono text-base">adjusted_time = original_duration ÷ speed</p>
        <p className="m-0 mt-3 text-sm text-muted-foreground">saved_time = original_duration × (1 − 1/speed)</p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Speed Reference Table</h2>
      <p>Instead of recalculating, use this cheat sheet for common playlist lengths:</p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Original</th>
              <th className="py-2 pr-4 font-semibold">1.25x</th>
              <th className="py-2 pr-4 font-semibold">1.5x</th>
              <th className="py-2 pr-4 font-semibold">1.75x</th>
              <th className="py-2 pr-4 font-semibold">2x</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">5 hours</td><td className="py-2 pr-4">4h 00m</td><td className="py-2 pr-4">3h 20m</td><td className="py-2 pr-4">2h 51m</td><td className="py-2 pr-4">2h 30m</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">10 hours</td><td className="py-2 pr-4">8h 00m</td><td className="py-2 pr-4">6h 40m</td><td className="py-2 pr-4">5h 43m</td><td className="py-2 pr-4">5h 00m</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">20 hours</td><td className="py-2 pr-4">16h 00m</td><td className="py-2 pr-4">13h 20m</td><td className="py-2 pr-4">11h 26m</td><td className="py-2 pr-4">10h 00m</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Real Examples</h2>
      <p>A 10-hour course watched at different speeds:</p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>1.25x → <strong>8h 00m</strong> (save 2h)</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>1.5x → <strong>6h 40m</strong> (save 3h 20m)</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>1.75x → <strong>5h 43m</strong> (save 4h 17m)</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>2x → <strong>5h 00m</strong> (save 5h)</span></li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <Calculator className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          Quick rule of thumb: at 1.5x you save one third of the time; at 2x you save half. Always calculate the <em>adjusted</em> total before committing to a schedule.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">How to Change Playback Speed</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><PlayCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" /><span><strong>Desktop:</strong> click the gear (Settings) → "Playback speed" → choose 1.5x or 2x.</span></li>
        <li className="flex items-start gap-3"><PlayCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" /><span><strong>Mobile:</strong> tap the video, then the gear icon, then "Playback speed."</span></li>
        <li className="flex items-start gap-3"><PlayCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" /><span><strong>Keyboard:</strong> on desktop, <code>&lt;</code> and <code>&gt;</code> nudge speed down/up by 0.25x.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Does Speed Affect Subtitles or Data?</h2>
      <p>
        Captions stay perfectly in sync because they're tied to the video timeline, not wall-clock time — handy for language learners who speed up but still read subtitles. Data usage is unchanged: the same file is simply decoded faster, so 2x doesn't double your bandwidth.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Best Speed by Content Type</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Content</th>
              <th className="py-2 pr-4 font-semibold">Recommended</th>
              <th className="py-2 pr-4 font-semibold">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Lectures / tutorials</td><td className="py-2 pr-4">1.5x</td><td className="py-2 pr-4">Clear speech, saves 33%</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Podcasts / interviews</td><td className="py-2 pr-4">1.75–2x</td><td className="py-2 pr-4">Conversational, easy to follow</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Foreign-language lessons</td><td className="py-2 pr-4">1.25x</td><td className="py-2 pr-4">Preserves nuance</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Music / performances</td><td className="py-2 pr-4">1x</td><td className="py-2 pr-4">Pitch & feel matter</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">When Faster Becomes Worse</h2>
      <p>
        Speech stays intelligible up to about 1.5x for most narration. Past 1.75x, dense technical content — proofs, code explanations, foreign-language lessons — loses comprehension fast. Use 1.5x for lectures, 1.25x for anything subtle, and reserve 2x for material you already half-know.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Planning a week of study using the original duration, then burning out when 2x proves too fast to learn from.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Assuming 2x always means half the effort — retention often drops, so you re-watch.</span></div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Pair It With the Calculator</h2>
      <p>
        Step one: get the exact total length. Step two: divide by your speed. That two-step combo turns a vague "it's a big course" into a concrete "6h 40m at 1.5x" you can actually schedule.
      </p>
    </>
  ),

  "plan-online-course-playlist-schedule": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        A 40-hour course feels impossible until you break it into daily chunks. This guide shows how to turn any long playlist into a finishable plan using only its total duration, a playback speed, and a little consistency.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Step 1 — Know the True Total</h2>
      <p>
        Before planning, calculate the exact playlist length. Guessing "around 30 hours" leads to plans that collapse in week two. The calculator gives you the real number to the second, so your plan is built on facts, not hope.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Step 2 — Apply Your Speed</h2>
      <p>
        If you will watch at 1.5x, divide the total by 1.5. A 40-hour course becomes ~26.7 hours of real watching time. This adjusted number — not the raw total — is what you schedule against.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Step 3 — Spread It Across Days</h2>
      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8">
        <p className="m-0 font-mono text-base">daily_minutes = (adjusted_hours × 60) ÷ study_days</p>
      </div>
      <p>Example: 26.7 hours over 30 days = 53.4 minutes a day. That is one commute, one lunch break, or one evening session.</p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Weekly Schedule Template</h2>
      <p>Pick a pace that fits your life, then stick to it:</p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Goal</th>
              <th className="py-2 pr-4 font-semibold">Days</th>
              <th className="py-2 pr-4 font-semibold">Daily block</th>
              <th className="py-2 pr-4 font-semibold">Feels like</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Relaxed</td><td className="py-2 pr-4">60</td><td className="py-2 pr-4">~27 min</td><td className="py-2 pr-4">A short daily habit</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Steady</td><td className="py-2 pr-4">30</td><td className="py-2 pr-4">~53 min</td><td className="py-2 pr-4">One session a day</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Intensive</td><td className="py-2 pr-4">14</td><td className="py-2 pr-4">~1h 54m</td><td className="py-2 pr-4">Two sessions a day</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <Target className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          The "consistency rule": 50 minutes daily beats 6 hours once a week. Small daily blocks keep the material fresh and avoid the weekend-cram burnout.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">A Sample 8-Week Plan</h2>
      <p>
        For a 40-hour course at 1.5x (≈26.7 adjusted hours), studying 5 days a week:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Weeks 1–2: build the habit — 40 min, 5 days (≈3.3h/week).</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Weeks 3–6: settle into 60 min, 5 days (≈5h/week).</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Weeks 7–8: add a Saturday catch-up block to finish strong.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Tracking Progress Without Losing Your Place</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Note the last video number you finished in a notes app or spreadsheet.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Recalculate the <em>remaining</em> total periodically so your daily target stays accurate.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Pair watching with active recall — pause and summarize each video in one sentence.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Step 4 — Build in a Buffer</h2>
      <p>
        Life happens. Add 10–15% slack by either extending the deadline a few days or planning slightly shorter daily blocks. If you plan 53 minutes, treat 60 as your window.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">How Long Should One Session Be?</h2>
      <p>
        Research on focus favors ~25–50 minute blocks with a short break (the Pomodoro pattern). For video courses, one or two videos per sitting tends to stick better than marathoning ten. Quality of attention beats quantity of hours.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">If You Fall Behind</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Bump speed from 1.5x to 1.75x to recover time without adding days.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Add a longer weekend block to reset the baseline.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Recalculate the remaining total — don't guess how far behind you are.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Planning from video count instead of duration — a 100-video course might be 10 or 40 hours.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>No buffer, so the first missed day spirals into giving up.</span></div>
      </div>
    </>
  ),

  "calculate-partial-playlist-duration": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        Sometimes you only care about part of a playlist — the first 20 videos for a trip, or a middle section for exam review. Here is how to get that subset's runtime precisely, plus a few shortcuts for common cases.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Method 1 — Average × Count (Fast Estimate)</h2>
      <p>
        The calculator shows the average video length. Multiply it by the number of videos you want:
      </p>
      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8">
        <p className="m-0 font-mono text-base">subset_time ≈ average_length × N</p>
      </div>
      <p>Example: average 9m 30s × first 20 videos ≈ 3h 10m. Good enough for packing a road trip.</p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Method 2 — Exact Cumulative Subtraction</h2>
      <p>
        For exams or precise planning, estimate is not enough. Use the calculator's per-video breakdown:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Get the cumulative total up to the <strong>end</strong> video (e.g. video 50).</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Get the cumulative total up to the video <strong>before</strong> your start (e.g. video 29).</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Subtract: total(50) − total(29) = the exact range duration.</span></li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <Calculator className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          There is no native YouTube "play videos 30–50" filter, so cumulative subtraction is the reliable workaround when precision matters.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Getting the Per-Video Breakdown</h2>
      <p>
        The detailed result lists each video with its own length. Export it (or copy it into a spreadsheet) and you can sum any arbitrary slice with a formula like <code>=SUM(B30:B50)</code>. This turns "videos 30–50" into an exact number in seconds.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">First N Videos for a Trip</h2>
      <p>
        Heading out for a 3-hour drive? Take the average length, multiply by N, and add ~10% for safety. If the average is 8 minutes, you need about 22–25 videos to fill the ride without hunting for more at mile 150.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Skipping Intros and Outros</h2>
      <p>
        Many creators open and close with 20–40 seconds of filler. If you reliably skip them, subtract roughly <code>(intro + outro) × N</code> from your subset estimate. On a 20-video slice with 30s of filler each, that's about 10 minutes reclaimed.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Combining Partial Playlists</h2>
      <p>
        Want a custom mix from two sources? Calculate each subset's exact duration, then add them. For example, 3h 10m of lectures plus 1h 45m of demos gives a 4h 55m study block — easier to plan than guessing from two counts.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Using the average for a section with unusually long or short videos — a "lecture 30–50" block may skew far from the mean.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Off-by-one errors: remember to subtract the total <em>before</em> your start, not at it.</span></div>
      </div>
    </>
  ),

  "music-playlist-total-runtime": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        Whether you are building a gym mix or an all-night set, the runtime decides everything. Here is how to total your music playlist, what those numbers mean next to physical media, and how to design a mix that actually fits the moment.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Typical Music Playlist Lengths</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Chill / focus mix: <strong>1.5–3 hours</strong></span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Workout set: <strong>45–90 minutes</strong></span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Road trip / all-nighter: <strong>6–10+ hours</strong></span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">How It Compares to Physical Media</h2>
      <p>
        A standard audio CD holds 74–80 minutes. A vinyl LP gives you about 40–50 minutes per side. A single YouTube music playlist can surpass <strong>dozens of albums</strong> in one continuous runtime — which is exactly why knowing the total matters before you hit play on a long drive.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Format</th>
              <th className="py-2 pr-4 font-semibold">Typical runtime</th>
              <th className="py-2 pr-4 font-semibold">Songs (≈4 min)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Vinyl LP (1 side)</td><td className="py-2 pr-4">40–50 min</td><td className="py-2 pr-4">~12</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Audio CD</td><td className="py-2 pr-4">74–80 min</td><td className="py-2 pr-4">~19</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">YouTube playlist</td><td className="py-2 pr-4">1–10+ hours</td><td className="py-2 pr-4">15–150+</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <Clock className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          Planning a 6-hour drive? Build a playlist of at least 6h 30m so you are not scrambling to find music at mile 200.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Building a DJ Set by Energy Curve</h2>
      <p>
        Great sets tell a story: warm-up, build, peak, cool-down. Order tracks by BPM and intensity rather than by what you like best. A 3-hour set might open at 118 BPM, climb to 128 at the peak, then ease back to 120 to close. The total runtime is your canvas; the energy curve is the art.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">A Workout Playlist by BPM</h2>
      <p>
        Cardio thrives around 120–140 BPM; warm-ups and stretches sit lower at 90–110. Calculate your playlist total, then check the average song length to know how many tracks fit a 45-minute session. If the average is 3m 30s, you need about 13 tracks — plus a couple of buffer songs in case you go long.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Runtime vs. Attention Span</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Focus / study:</strong> 60–90 min before a refresh helps.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Party:</strong> 3–4 hours keeps energy without fatigue.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Road trip:</strong> 6+ hours, with a backup playlist queued.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Avoiding Repetition on Long Mixes</h2>
      <p>
        An 8-hour set risks repeating artists and killing the vibe. After calculating the total, scan the track list for duplicates and rotate genres every 30–45 minutes. A varied runtime feels shorter than a repetitive one.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Export for DJing or Archiving</h2>
      <p>
        Use the YouTube Playlist Exporter to download the full track list with each song's length. That lets you reorder for energy curves or archive an exact runtime snapshot.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Assuming "100 songs" fits a short trip — at 4 minutes each that is 6h 40m.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Forgetting intros and outro silences that inflate real listening time.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Building a set longer than the event — you'll never reach the best tracks.</span></div>
      </div>
    </>
  ),

  "how-many-videos-fit-in-x-hours": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        Planning a 2-hour flight or a 30-minute workout? Flip the usual question: instead of "how long is this playlist," ask "how many videos fit in my available time?" Here is the reverse-planning method, with real scenarios.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">The Reverse Formula</h2>
      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8">
        <p className="m-0 font-mono text-base">videos = available_minutes ÷ average_video_length</p>
      </div>
      <p>
        At a 12-minute average, one hour fits 5 videos; a 2-hour block fits about 10.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Average Length by Niche (2025)</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Music videos: ~4 minutes</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Vlogs: 8–15 minutes</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Tutorials / lectures: 15–25 minutes</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Global blended average: ~11–12 minutes</span></li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <Lightbulb className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          Always use your <em>playlist's</em> real average from the calculator, not the global average — niche makes a huge difference.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Worked Scenarios</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Scenario</th>
              <th className="py-2 pr-4 font-semibold">Time</th>
              <th className="py-2 pr-4 font-semibold">Avg length</th>
              <th className="py-2 pr-4 font-semibold">Videos (with buffer)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Flight</td><td className="py-2 pr-4">2h</td><td className="py-2 pr-4">12 min</td><td className="py-2 pr-4">~9 (use ~8)</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Workout</td><td className="py-2 pr-4">30 min</td><td className="py-2 pr-4">4 min (music)</td><td className="py-2 pr-4">~7</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Commute</td><td className="py-2 pr-4">25 min</td><td className="py-2 pr-4">20 min (lecture)</td><td className="py-2 pr-4">~1</td></tr>
            <tr className="border-b border-border/60"><td className="py-2 pr-4">Kids' screen time</td><td className="py-2 pr-4">60 min</td><td className="py-2 pr-4">10 min</td><td className="py-2 pr-4">~5</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Use the Median, Not the Average, for Mixed Lists</h2>
      <p>
        If a playlist mixes 4-minute songs with 40-minute documentaries, the average misleads. Sort by length and use the median video as your planning anchor, or split the list into "short" and "long" buckets and plan each separately.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Always Add a Buffer</h2>
      <p>
        Intros, ads, and pauses eat time. If you have 60 minutes, plan for ~50 minutes of actual video. For a 30-minute workout, target 25–27 minutes of content so you are not cutting reps short.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Podcasts vs. Video</h2>
      <p>
        Audio podcasts often average 30–60 minutes, so the same hour fits far fewer "episodes" than short videos. When reverse-planning, match the medium to the math or you'll run out of material halfway through a flight.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Using the global average for a tutorial-heavy playlist — you'll run out of time fast.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>No buffer, so the last video gets cut off mid-way.</span></div>
      </div>
    </>
  ),

  "video-count-vs-playlist-duration": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        "It's only 100 videos" — said about a playlist that is actually 30 hours long. Video count is one of the most misleading signals on YouTube. Here is why duration wins, when count still helps, and how to sanity-check either number.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">The Same Count, Wildly Different Time</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>100 × 4-minute songs = <strong>6h 40m</strong></span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>100 × 10-minute tutorials = <strong>16h 40m</strong></span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>100 × 20-minute lectures = <strong>33h 20m</strong></span></li>
      </ul>
      <p className="mt-4">Same number. Up to a 5x difference in actual time. Count alone tells you almost nothing.</p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Scale It Up: The 1,000-Video Playlist</h2>
      <p>
        Big counts get dangerous fast. A 1,000-video playlist could be:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>1,000 × 4 min = <strong>66h 40m</strong> (a music archive)</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>1,000 × 12 min = <strong>200h</strong> (over 8 full days of watching)</span></li>
      </ul>
      <p className="mt-4">Without the duration, "1,000 videos" is meaningless for planning. The calculator collapses that uncertainty into one number you can act on.</p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Why YouTube Emphasizes Count</h2>
      <p>
        Count is a vanity metric — it signals "lots of content" and encourages bingeing. Duration, by contrast, is a commitment metric. YouTube optimizes for watch time overall, but per-playlist it surfaces the count because it feels more impressive. Knowing this helps you ignore the bait and plan with the number that actually costs you time.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">When Count Is Still Useful</h2>
      <p>
        Count helps with <strong>commitment and pacing</strong> — "100 videos" tells you this is a multi-session project. Duration tells you the <strong>time cost</strong>. Use both: count for "how many sittings," duration for "how long each sitting."
      </p>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <Calculator className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          The calculator reports both numbers side by side, plus the average length — so you never have to guess the relationship.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">A Quick Sanity Check</h2>
      <p>
        Before trusting any plan, do a 10-second check: take the video count, multiply by a reasonable average (say 10–12 minutes), and see if the result is in the ballpark of the calculator's total. If it's off by 2x or more, your average assumption is wrong — recalculate with the real average.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Quoting "only N videos" to a friend as if it implies short — it doesn't.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Planning study time from count and running out of hours.</span></div>
      </div>
    </>
  ),

  "how-the-calculator-gets-accurate-durations": () => (
    <>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        Curious what happens when you hit "Calculate"? This transparent look explains where the numbers come from, how 500+ video lists are handled, why results are exact to the second, and the edge cases worth knowing.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Where the Data Comes From</h2>
      <p>
        The tool reads each video's published length from YouTube's public metadata. Rather than trusting rounded on-screen displays, it sums the <strong>exact seconds</strong> of every video — which is why totals are precise even on 500+ video lists.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">How 500+ Video Lists Are Handled</h2>
      <p>
        YouTube returns playlist items in pages (typically 50 at a time). The calculator walks through every page, collecting each video's duration, until the whole list is covered. On very large playlists this takes a little longer and explains why a 1,000-video marathon may need a few extra seconds — but the result stays complete and exact.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Why Exact Seconds Matter</h2>
      <p>
        YouTube rounds. The calculator doesn't. On a long playlist those rounding differences compound into minutes, sometimes an hour. If you are scheduling study time, you want the real number — not a friendly approximation that quietly costs you a study session.
      </p>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 my-8 flex gap-4">
        <ShieldCheck className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="m-0 text-base">
          Transparency note: the tool only uses data YouTube exposes publicly for the playlist you provide. It does not store your playlists, require a login, or modify your account.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Accuracy vs. YouTube Studio vs. Manual</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Manual stopwatch:</strong> error-prone and impossible at scale.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>YouTube Studio:</strong> shows duration only for playlists you own, and still rounds.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>This calculator:</strong> works on any public/unlisted playlist, no ownership required, exact to the second.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Edge Cases to Expect</h2>
      <ul className="space-y-2">
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Completed live streams & premieres:</strong> have a fixed length and are counted.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Ongoing / unscheduled streams:</strong> have no final duration yet, so they are excluded.</span></li>
        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Region-locked / age-restricted / removed:</strong> may not return metadata and are skipped.</span></li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">What About Shorts?</h2>
      <p>
        YouTube Shorts are just short videos under 60 seconds. The calculator counts them by their real length, so a playlist mixing Shorts and long-form videos still totals correctly — no special handling needed on your end.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Works Everywhere</h2>
      <p>
        The calculator is a responsive web app, so it runs in any modern browser on desktop, tablet, or phone. Paste a link on your laptop, check a total on your phone — same result, exact to the second.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Common Mistakes</h2>
      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8 space-y-3">
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Assuming a missing video means the tool failed — usually it's a region or removal issue on YouTube's side.</span></div>
        <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" /><span>Comparing the precise total to YouTube's rounded display and thinking one is wrong.</span></div>
      </div>
    </>
  ),
};
