export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  datePublished: string;
  dateModified: string;
  coverImage: string;
  author: {
    name: string;
    url: string;
  };
  faq: GuideFaq[];
}

export const guides: Guide[] = [
  {
    slug: "how-to-calculate-youtube-playlist-length",
    title: "How to Calculate the Total Length of Any YouTube Playlist",
    excerpt:
      "A step-by-step guide to finding the exact total runtime of any YouTube playlist — including private, unlisted, and 500+ video lists — without adding up durations by hand.",
    category: "Getting Started",
    readTime: "14 min read",
    datePublished: "2026-02-01",
    dateModified: "2026-08-08",
    coverImage: "/guide-calculate-length.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "Can I calculate a private or unlisted playlist?",
        a: "Yes. Paste the playlist URL and the calculator reads the public metadata YouTube exposes. Private playlists you do not own will not return data, but unlisted links you have access to work normally.",
      },
      {
        q: "Is there a limit on playlist size?",
        a: "The tool handles playlists of any length, including 500+ video marathons. Very large lists may take a few extra seconds because each video duration is fetched individually, but the result stays complete and exact.",
      },
      {
        q: "Why does my number differ slightly from YouTube's estimate?",
        a: "YouTube rounds displayed durations, while the calculator sums exact seconds. The calculator is more precise, which is why totals can differ by a minute or two on long playlists.",
      },
      {
        q: "Do I need to log in or create an account?",
        a: "No. The calculator is free to use and requires no sign-up. You simply paste a public or unlisted playlist link and read the result.",
      },
      {
        q: "Which playlist URL formats are supported?",
        a: "Any link that carries the playlist ID works: a classic youtube.com/playlist?list=PL… link, a youtu.be share link that includes &list=PL…, or a channel's Videos/Uploads playlist URL. A plain video URL with no list parameter is treated as a one-item playlist.",
      },
      {
        q: "What does the result actually include?",
        a: "Beyond the total hours/minutes/seconds, you get the video count, the average length per video, and (where shown) the adjusted time at common playback speeds such as 1.5x or 2x.",
      },
      {
        q: "The result looks incomplete or zero — what should I check?",
        a: "Confirm the link includes a valid list= parameter, that the playlist is public or unlisted (not private to someone else), and that it isn't an auto-generated Mix/Radio stream, which isn't a stable playlist.",
      },
      {
        q: "Is my playlist data private?",
        a: "Yes. The tool only reads the public metadata YouTube exposes for the playlist you provide. It does not store your playlists, require a login, or modify your account.",
      },
    ],
  },
  {
    slug: "youtube-playback-speed-watch-time",
    title: "YouTube Playback Speed Calculator: How 1.25x, 1.5x, 2x Changes Watch Time",
    excerpt:
      "Learn the exact formula behind YouTube playback speeds and see real examples of how watching at 1.5x or 2x shrinks a 10-hour course into a manageable schedule.",
    category: "Time Planning",
    readTime: "15 min read",
    datePublished: "2026-02-03",
    dateModified: "2026-08-08",
    coverImage: "/guide-playback-speed.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "What is the formula for playback speed time savings?",
        a: "Divide the original duration by the speed factor. A 6-hour playlist at 1.5x takes 6 ÷ 1.5 = 4 hours. At 2x it takes 3 hours. The saved time equals original duration × (1 − 1/speed).",
      },
      {
        q: "Does faster playback lose information?",
        a: "At 1.25x–1.5x most speech stays clear. Above 1.75x comprehension drops for dense material. Use 1.5x for lectures and 2x only for content you already partially know.",
      },
      {
        q: "Can the calculator show time at a specific speed?",
        a: "Calculate the total length first, then divide by your chosen speed. Many users pair the total with a playback-speed table to build a study plan.",
      },
      {
        q: "How do I change playback speed on YouTube?",
        a: "On desktop, click the gear (Settings) → Playback speed and pick a rate; the keyboard shortcuts < and > nudge it by 0.25x. On mobile, tap the gear icon on the video then Playback speed.",
      },
      {
        q: "Does faster speed affect subtitles or captions?",
        a: "Captions stay in sync because they are tied to the video timeline, not wall-clock time. This makes speeding up while reading subtitles perfectly usable for language learners.",
      },
      {
        q: "What speed is best for different types of content?",
        a: "Lectures and tutorials work well at 1.5x; podcasts and interviews at 1.75–2x; foreign-language lessons at 1.25x to preserve nuance; and music or performances at 1x where pitch and feel matter.",
      },
      {
        q: "Does watching at 2x use more data?",
        a: "No. The same video file is simply decoded faster, so bandwidth usage is unchanged regardless of playback speed.",
      },
      {
        q: "Can I set a default playback speed permanently?",
        a: "YouTube remembers your last chosen speed for the current session, and several browser extensions can force a default speed across videos. The calculator handles the math either way.",
      },
    ],
  },
  {
    slug: "plan-online-course-playlist-schedule",
    title: "How to Plan Watching a Long Online Course Playlist (and Actually Finish It)",
    excerpt:
      "Turn a 40-hour tutorial playlist into a realistic daily or weekly study plan using total duration, playback speed, and a simple consistency rule.",
    category: "Time Planning",
    readTime: "16 min read",
    datePublished: "2026-02-05",
    dateModified: "2026-08-08",
    coverImage: "/guide-course-schedule.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "How do I split a long playlist across weeks?",
        a: "Take the total duration, divide by your target speed, then divide by the number of study days. A 40-hour course at 1.5x is ~26.7 hours; over 30 days that is about 53 minutes a day.",
      },
      {
        q: "Should I watch in order or skip around?",
        a: "For structured courses watch in order — later videos assume earlier concepts. Use the calculator to confirm you have enough time before committing to a pacing.",
      },
      {
        q: "What if I fall behind?",
        a: "Recalculate with a slightly higher playback speed (1.5x → 1.75x) or add weekend blocks. The key is knowing the true remaining total, which the calculator provides instantly.",
      },
      {
        q: "What if the course has mixed video lengths?",
        a: "Don't plan from video count — plan from the total duration. The calculator gives you the real number to the second, so a 100-video course that is actually 40 hours is treated correctly.",
      },
      {
        q: "How do I track progress without losing my place?",
        a: "Note the last video number you finished, recalculate the remaining total periodically, and pair watching with active recall — pause and summarize each video in one sentence.",
      },
      {
        q: "Is there an ideal single-session length?",
        a: "Focus research favors ~25–50 minute blocks with a short break (the Pomodoro pattern). One or two videos per sitting tends to stick better than marathoning ten.",
      },
      {
        q: "How should I handle free days or vacations?",
        a: "Build a 10–15% buffer into your plan, or schedule a catch-up weekend block. If you plan 53 minutes a day, treat 60 minutes as your realistic window.",
      },
      {
        q: "Should I take notes or just watch?",
        a: "Active recall beats passive watching. Pausing to summarize each video dramatically improves retention and makes the time you calculated actually pay off.",
      },
    ],
  },
  {
    slug: "calculate-partial-playlist-duration",
    title: "How to Calculate the Duration of Part of a YouTube Playlist",
    excerpt:
      "Need the runtime of just the first 20 videos or a middle section? Here is how to sum a subset of a playlist accurately instead of guessing.",
    category: "Advanced Tips",
    readTime: "13 min read",
    datePublished: "2026-02-07",
    dateModified: "2026-08-08",
    coverImage: "/guide-partial-duration.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "Can I calculate only the first N videos?",
        a: "Yes. Get the full playlist total and the average video length (total ÷ video count), then multiply the average by N. For precision, sum the exact durations of the specific videos you care about.",
      },
      {
        q: "How do I get a middle range, like videos 30–50?",
        a: "There is no direct YouTube range filter, so calculate the cumulative total up to video 50 and subtract the cumulative total up to video 29. The calculator's per-video breakdown makes this practical.",
      },
      {
        q: "Why not just estimate?",
        a: "Playlist videos vary wildly in length. Estimating a 20-video slice can be off by hours. Subset math using real durations removes the guesswork.",
      },
      {
        q: "Does the calculator show per-video durations?",
        a: "Yes — the detailed result lists each video with its own length. Export or copy that list into a spreadsheet and you can sum any arbitrary slice with a single formula.",
      },
      {
        q: "How do I size a playlist for a specific trip?",
        a: "Take the average length, multiply by the number of videos you want, then add ~10% for safety. For a 3-hour drive at an 8-minute average, you need about 22–25 videos.",
      },
      {
        q: "Can I account for skipped intros and outros?",
        a: "If you reliably skip them, subtract roughly (intro + outro) × N from your subset estimate. On a 20-video slice with 30s of filler each, that reclaims about 10 minutes.",
      },
      {
        q: "Can I combine two partial playlists?",
        a: "Yes. Calculate each subset's exact duration, then add them. For example, 3h 10m of lectures plus 1h 45m of demos gives a 4h 55m custom study block.",
      },
    ],
  },
  {
    slug: "music-playlist-total-runtime",
    title: "How Long Is Your Music Playlist? Calculating Total Runtime for Marathons & DJ Sets",
    excerpt:
      "From a chill 2-hour mix to an all-night 8-hour set, learn how to total your music playlist runtime and compare it to vinyl, CDs, and streaming sessions.",
    category: "Music & Leisure",
    readTime: "14 min read",
    datePublished: "2026-02-08",
    dateModified: "2026-08-08",
    coverImage: "/guide-music-runtime.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "How long is the average music playlist?",
        a: "Casual listening playlists often run 1.5–3 hours. Workout mixes are 45–90 minutes. All-night DJ or road-trip playlists commonly exceed 6–8 hours.",
      },
      {
        q: "Does a music playlist runtime beat a CD or vinyl?",
        a: "A standard CD holds 74–80 minutes and a vinyl LP about 40–50 minutes per side. A single YouTube music playlist can easily surpass dozens of albums in one continuous runtime.",
      },
      {
        q: "Can I export the track list with durations?",
        a: "Yes — use the YouTube Playlist Exporter to download the full list with each song's length, then total them or plan a set order.",
      },
      {
        q: "How do I build a DJ set by energy curve?",
        a: "Order tracks by BPM and intensity rather than by preference: warm-up, build, peak, cool-down. Calculate the total runtime first, then shape the energy across it.",
      },
      {
        q: "What runtime matches a typical attention span?",
        a: "Focus or study mixes work well at 60–90 minutes; parties at 3–4 hours; road trips at 6+ hours with a backup playlist queued.",
      },
      {
        q: "How do I make a workout playlist by BPM?",
        a: "Cardio thrives around 120–140 BPM. After calculating the total, check the average song length to know how many tracks fit a 45-minute session (about 13 at 3m 30s each, plus buffer).",
      },
      {
        q: "How do I avoid repetition on long mixes?",
        a: "After calculating the total, scan the track list for duplicates and rotate genres every 30–45 minutes. A varied runtime feels shorter than a repetitive one.",
      },
      {
        q: "Does looping a playlist count toward runtime?",
        a: "Only the single pass counts in the total. If you loop manually, multiply the runtime by the number of loops you actually play.",
      },
    ],
  },
  {
    slug: "how-many-videos-fit-in-x-hours",
    title: "How Many YouTube Videos Fit in X Hours? (Reverse Duration Planning)",
    excerpt:
      "Flip the question: given a 2-hour flight or a 30-minute workout, how many average-length videos fit? A practical reverse-planning method with examples.",
    category: "Advanced Tips",
    readTime: "13 min read",
    datePublished: "2026-02-09",
    dateModified: "2026-08-08",
    coverImage: "/guide-videos-fit-hours.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "What is the average YouTube video length?",
        a: "In 2025 the global average sits around 11–12 minutes, but it varies by niche: music videos ~4 minutes, tutorials 15–25 minutes, vlogs 8–15 minutes. Use your playlist's real average for accuracy.",
      },
      {
        q: "How do I calculate videos per hour?",
        a: "Divide 60 minutes by the average video length. At 12 minutes average, one hour fits 5 videos. A 2-hour block fits about 10.",
      },
      {
        q: "Should I plan with a buffer?",
        a: "Always add 10–15% for intros, ads, and pauses. If you have 60 minutes, plan for ~50 minutes of actual video to stay realistic.",
      },
      {
        q: "Can you show worked scenarios?",
        a: "A 2-hour flight at 12-min average fits ~9 videos (plan 8 with buffer); a 30-min workout of 4-min songs fits ~7; a 60-min kids' limit at 10-min average fits ~5.",
      },
      {
        q: "Should I use the average or the median?",
        a: "For mixed lists (short songs + long documentaries), the average misleads. Sort by length and use the median as your anchor, or split into short and long buckets and plan each separately.",
      },
      {
        q: "How does this differ for podcasts?",
        a: "Audio podcasts often average 30–60 minutes, so the same hour fits far fewer episodes than short videos. Match the medium to the math or you'll run out of material mid-flight.",
      },
      {
        q: "Can I reverse-plan screen time for kids?",
        a: "Yes. A 60-minute limit at a 10-minute average means about 5 videos. Calculate your child's actual playlist average rather than assuming the global one.",
      },
    ],
  },
  {
    slug: "video-count-vs-playlist-duration",
    title: "Video Count vs. Playlist Duration: Why 100 Videos ≠ 100 Minutes",
    excerpt:
      "A playlist with 100 videos could be 2 hours or 30 hours. Understand why video count is a poor proxy for watch time and when to trust duration instead.",
    category: "Understanding the Basics",
    readTime: "13 min read",
    datePublished: "2026-02-10",
    dateModified: "2026-08-08",
    coverImage: "/guide-count-vs-duration.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "Why can't I estimate time from video count?",
        a: "Video length is not standardized. A 100-video playlist of 4-minute songs is ~6.7 hours, while 100 ten-minute tutorials is ~16.7 hours. Count alone says almost nothing.",
      },
      {
        q: "When is video count useful?",
        a: "Count helps gauge commitment and pacing (how many sessions), while duration tells you the actual time cost. Use both together for planning.",
      },
      {
        q: "Does YouTube show total duration anywhere?",
        a: "YouTube shows a rough total only in some views and rounds it. The calculator returns the exact summed duration, which is what matters for scheduling.",
      },
      {
        q: "How different can two 100-video playlists be?",
        a: "Up to 5x apart. 100 four-minute songs total 6h 40m, while 100 twenty-minute lectures total 33h 20m. Same count, completely different time commitment.",
      },
      {
        q: "What about a 1,000-video playlist?",
        a: "It could be 66+ hours of short music or 200 hours of 12-minute videos — over eight full days of watching. Only the duration tells you the real cost.",
      },
      {
        q: "Why does YouTube emphasize the video count?",
        a: "Count is a vanity metric that signals 'lots of content' and encourages bingeing. Duration is the commitment metric that actually matters for planning your time.",
      },
      {
        q: "How can I quickly sanity-check a plan?",
        a: "Multiply the video count by a reasonable average (10–12 min) and compare to the calculator's total. If they differ by 2x or more, your average assumption is wrong — recalculate with the real average.",
      },
    ],
  },
  {
    slug: "how-the-calculator-gets-accurate-durations",
    title: "How the YouTube Playlist Length Calculator Gets Accurate Durations (and Its Limits)",
    excerpt:
      "A transparent look at how durations are fetched, why results are exact to the second, and the edge cases (live streams, premieres, region locks) to watch for.",
    category: "Behind the Tool",
    readTime: "15 min read",
    datePublished: "2026-02-10",
    dateModified: "2026-08-08",
    coverImage: "/guide-accurate-durations.png",
    author: {
      name: "Willard Yuan",
      url: "https://github.com/willard-yuan",
    },
    faq: [
      {
        q: "Where does the duration data come from?",
        a: "The tool reads each video's published length from YouTube's public metadata. It sums exact seconds rather than relying on rounded displays, which is why totals are precise.",
      },
      {
        q: "How are 500+ video playlists handled?",
        a: "YouTube returns playlist items in pages (about 50 at a time). The calculator walks every page, collecting each duration, until the list is fully covered. Very large lists take a little longer but stay complete and exact.",
      },
      {
        q: "Are live streams and premieres counted?",
        a: "Completed streams and premieres have a fixed length and are counted. Ongoing or unscheduled live streams have no final duration yet and are excluded from the total.",
      },
      {
        q: "Why might a video be missing from the total?",
        a: "Region-locked, age-restricted, or removed videos may not return metadata. The calculator reports what YouTube exposes publicly for the playlist you provide.",
      },
      {
        q: "Is my playlist data stored or shared?",
        a: "No. The tool only reads public metadata for the playlist you paste. It does not store playlists, require login, or modify your account.",
      },
      {
        q: "How accurate is it versus YouTube Studio or a manual count?",
        a: "Manual stopwatches are error-prone; YouTube Studio shows duration only for playlists you own and still rounds. The calculator works on any public/unlisted playlist and is exact to the second.",
      },
      {
        q: "Are YouTube Shorts included correctly?",
        a: "Yes. Shorts are just videos under 60 seconds; the calculator counts them by their real length, so a mix of Shorts and long-form videos still totals correctly.",
      },
      {
        q: "Does it work on mobile?",
        a: "Yes. The calculator is a responsive web app that runs in any modern browser on desktop, tablet, or phone, returning the same exact-to-the-second result.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
