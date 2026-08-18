"use client"

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
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

/**
 * Homepage rich-content sections. All user-facing copy is translated through
 * the i18n dictionary (en/hi/tr) via t(). Module-level data keeps only the
 * locale-agnostic bits (icons, gradient tints, URLs); the visible text is
 * resolved per-locale using type-safe key unions so missing keys fail the build.
 */

type FeatureId =
  | "multiPlaylists"
  | "videoRange"
  | "playbackSpeed"
  | "singleVideo"
  | "dailyPlanner"
  | "exportExcel";

const features: { id: FeatureId; icon: LucideIcon; tint: string }[] = [
  { id: "multiPlaylists", icon: Layers, tint: "from-purple-500/15 to-purple-500/5 text-purple-600 dark:text-purple-400" },
  { id: "videoRange", icon: ListOrdered, tint: "from-blue-500/15 to-blue-500/5 text-blue-600 dark:text-blue-400" },
  { id: "playbackSpeed", icon: Gauge, tint: "from-pink-500/15 to-pink-500/5 text-pink-600 dark:text-pink-400" },
  { id: "singleVideo", icon: Video, tint: "from-indigo-500/15 to-indigo-500/5 text-indigo-600 dark:text-indigo-400" },
  { id: "dailyPlanner", icon: CalendarClock, tint: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400" },
  { id: "exportExcel", icon: FileSpreadsheet, tint: "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400" },
];

// Duration values are numeric — kept as-is (locale-independent).
const speedRows = [
  { original: "1 hour", s125: "48 min", s150: "40 min", s175: "34 min", s200: "30 min" },
  { original: "5 hours", s125: "4h", s150: "3h 20m", s175: "2h 51m", s200: "2h 30m" },
  { original: "10 hours", s125: "8h", s150: "6h 40m", s175: "5h 43m", s200: "5h" },
  { original: "20 hours", s125: "16h", s150: "13h 20m", s175: "11h 26m", s200: "10h" },
  { original: "50 hours", s125: "40h", s150: "33h 20m", s175: "28h 34m", s200: "25h" },
];

type UseCaseId =
  | "onlineCourse"
  | "music"
  | "bingeWatching"
  | "exam"
  | "partial"
  | "research";

const useCases: { id: UseCaseId; icon: LucideIcon; tint: string }[] = [
  { id: "onlineCourse", icon: GraduationCap, tint: "text-purple-600 dark:text-purple-400" },
  { id: "music", icon: Music, tint: "text-blue-600 dark:text-blue-400" },
  { id: "bingeWatching", icon: Tv, tint: "text-pink-600 dark:text-pink-400" },
  { id: "exam", icon: BookOpen, tint: "text-indigo-600 dark:text-indigo-400" },
  { id: "partial", icon: Scissors, tint: "text-emerald-600 dark:text-emerald-400" },
  { id: "research", icon: TrendingUp, tint: "text-orange-600 dark:text-orange-400" },
];

type PersonaId = "students" | "educators" | "creators" | "enthusiasts";

const personas: { id: PersonaId; icon: LucideIcon; tint: string }[] = [
  { id: "students", icon: GraduationCap, tint: "from-purple-500/15 to-purple-500/5 text-purple-600 dark:text-purple-400" },
  { id: "educators", icon: Presentation, tint: "from-blue-500/15 to-blue-500/5 text-blue-600 dark:text-blue-400" },
  { id: "creators", icon: Clapperboard, tint: "from-pink-500/15 to-pink-500/5 text-pink-600 dark:text-pink-400" },
  { id: "enthusiasts", icon: Tv, tint: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400" },
];

const speedBenefits: { id: "125" | "150" | "175" | "200"; tint: string }[] = [
  { id: "125", tint: "from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-300" },
  { id: "150", tint: "from-indigo-500/10 to-indigo-500/5 text-indigo-700 dark:text-indigo-300" },
  { id: "175", tint: "from-purple-500/10 to-purple-500/5 text-purple-700 dark:text-purple-300" },
  { id: "200", tint: "from-green-500/10 to-green-500/5 text-green-700 dark:text-green-300 font-semibold" },
];

const scheduleItems: { id: 1 | 2 | 3 | 4 | 5 | 6; icon: LucideIcon }[] = [
  { id: 1, icon: GraduationCap },
  { id: 2, icon: Timer },
  { id: 3, icon: BookOpen },
  { id: 4, icon: ListOrdered },
  { id: 5, icon: FileSpreadsheet },
  { id: 6, icon: Gauge },
];

const guides: { id: 1 | 2 | 3 | 4; href: string }[] = [
  { id: 1, href: "/guides/how-to-calculate-youtube-playlist-length" },
  { id: 2, href: "/guides/youtube-playback-speed-watch-time" },
  { id: 3, href: "/guides/plan-online-course-playlist-schedule" },
  { id: 4, href: "/guides/calculate-partial-playlist-duration" },
];

/** Render text containing a single inline tag (<b> or <strong>) as bold spans. */
function renderRich(text: string, tag: "b" | "strong", className = "font-semibold") {
  const open = `<${tag}>`;
  const close = `</${tag}>`;
  return text.split(open).map((part, i) => {
    if (i === 0) return <span key={i}>{part}</span>;
    const [bold, rest] = part.split(close);
    return (
      <span key={i}>
        <span className={className}>{bold}</span>
        {rest}
      </span>
    );
  });
}

export default function HomeRichSections() {
  const { t } = useI18n();

  return (
    <>
      {/* ===== Section A: Everything You Need to Calculate Playlist Time ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase mb-3">
            {t("rich.allInOne.eyebrow")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("rich.features.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("rich.features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className="group p-8 rounded-3xl bg-background border border-border/50 hover:border-purple-500/40 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.tint} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t(`rich.feature.${f.id}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`rich.feature.${f.id}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Section B: Playlist Length Calculator Speed Comparison ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
            {t("rich.speed.eyebrow")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("rich.speed.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("rich.speed.subtitle")}
          </p>
        </div>

        <div className="bg-background border border-border/50 rounded-3xl p-6 md:p-10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">{t("rich.speed.colOriginal")}</th>
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">{t("rich.speed.col125")}</th>
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">{t("rich.speed.col150")}</th>
                  <th className="py-4 px-4 text-sm font-semibold text-muted-foreground">{t("rich.speed.col175")}</th>
                  <th className="py-4 px-4 text-sm font-semibold text-green-600 dark:text-green-400">{t("rich.speed.col200")}</th>
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
              {renderRich(t("rich.speed.note"), "b", "font-semibold text-purple-600 dark:text-purple-400")}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Section C: Common Use Cases for Playlist Length Calculator ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-pink-600 dark:text-pink-400 uppercase mb-3">
            {t("rich.useCases.eyebrow")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("rich.useCases.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("rich.useCases.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((u) => {
            const Icon = u.icon;
            return (
              <div
                key={u.id}
                className="group p-8 rounded-3xl bg-secondary/5 border border-border/50 hover:bg-secondary/10 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-5 ${u.tint}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-3">{t(`rich.useCase.${u.id}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{t(`rich.useCase.${u.id}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Section D: Who Uses the YouTube Playlist Length Calculator? ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase mb-3">
            {t("rich.personas.eyebrow")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("rich.personas.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("rich.personas.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="group p-8 rounded-3xl bg-background border border-border/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.tint} flex items-center justify-center mb-6`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold mb-3 leading-snug">{t(`rich.persona.${p.id}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{t(`rich.persona.${p.id}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Section E: Why Use a YouTube Playlist Length Calculator? ===== */}
      <div className="mb-40">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase mb-3">
            {t("rich.why.eyebrow")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("rich.why.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("rich.why.subtitle")}
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
              <h3 className="text-2xl font-bold mb-3">{t("rich.why.problem.title")}</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg mb-5">
            {t("rich.why.problem.body1")}
          </p>
          <div className="rounded-2xl bg-red-500/5 border border-red-200/50 dark:border-red-900/30 p-6">
            <p className="text-base leading-relaxed">
              {renderRich(t("rich.why.problem.body2"), "strong")}
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
              <h3 className="text-2xl font-bold mb-3">{t("rich.why.speed.title")}</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            {t("rich.why.speed.body")}
          </p>

          {/* Speed breakdown list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {speedBenefits.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br ${item.tint} border border-border/40`}
              >
                <Timer className="h-5 w-5 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="font-semibold text-sm">{t(`rich.why.speed.item${item.id}`)}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(`rich.why.speed.benefit${item.id}`)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-green-50/70 to-emerald-50/70 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/60 dark:border-green-800/40 p-6">
            <p className="text-base leading-relaxed">
              {renderRich(t("rich.why.speed.note"), "strong")}
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
              <h3 className="text-2xl font-bold mb-3">{t("rich.why.schedule.title")}</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            {t("rich.why.schedule.body")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduleItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-border/40 hover:bg-secondary/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-snug">{t(`rich.why.schedule.item${item.id}.title`)}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(`rich.why.schedule.item${item.id}.desc`)}</p>
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
            {t("rich.guides.eyebrow")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t("rich.guides.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("rich.guides.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group p-6 rounded-3xl bg-background border border-border/50 hover:border-purple-500/40 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-base font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {t(`rich.guides.item${g.id}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t(`rich.guides.item${g.id}.desc`)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 dark:text-purple-400">
                {t("rich.guides.cta")}
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
