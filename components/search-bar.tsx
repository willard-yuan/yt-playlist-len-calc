"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { getPlaylist, getPlaylistByParams } from "@/lib/action";
import { PlaylistItemListResponse, videoFormat } from "@/lib/types";
import PlaylistResult from "./playlist-result";
import { PlaylistSkeleton, LoadingMessage } from "./skeleton-loader";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
} from "./ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronRight,
  X,
  RotateCcw,
  ArrowRight,
  Search,
  Loader2,
  Filter,
  SlidersHorizontal,
  Timer,
  Tag,
  User,
  Hash,
  Clock,
  Settings2,
  Sparkles,
  Youtube,
  Share2,
  Link as LinkIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { parseDuration } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const FormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid YouTube playlist URL" }),
  start: z.number().min(1, { message: "Start must be at least 1" }),
  end: z.number().min(1, { message: "End must be at least 1" }),
  // New filter fields
  minDuration: z.number().min(0).optional(),
  maxDuration: z.number().min(0).optional(),
  channels: z.array(z.string()).optional(),
  dateRange: z
    .object({
      from: z.string().optional(),
      to: z.string().optional(),
    })
    .optional(),
  keywords: z.string().optional(),
  contentType: z.array(z.string()).optional(),
  sortBy: z
    .enum(["position", "duration", "publishDate", "title", "addedDate"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export default function SearchBar() {
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [format, setFormat] = useState<videoFormat>('hrs');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [playlist, setPlaylist] = useState<PlaylistItemListResponse | null>(
    null
  );
  const [filteredPlaylist, setFilteredPlaylist] =
    useState<PlaylistItemListResponse | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();
  const { t } = useI18n();

  const loadingMessages = [
    t("search.loading.connecting"),
    t("search.loading.fetching"),
    t("search.loading.analyzing"),
    t("search.loading.calculating"),
    t("search.loading.ready")
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      start: 1,
      end: 50,
      minDuration: 0,
      maxDuration: 3600, // 1 hour
      channels: [],
      keywords: "",
      contentType: [],
      sortBy: "position",
      sortOrder: "asc",
    },
  });

  // Apply filters to playlist
  const applyFilters = (
    originalPlaylist: PlaylistItemListResponse,
    filters: z.infer<typeof FormSchema>
  ) => {
    let filtered = [...originalPlaylist.items];
    const appliedFilters: string[] = [];

    // Duration filter
    if (filters.minDuration !== undefined && filters.minDuration > 0) {
      filtered = filtered.filter((item) => {
        const duration = parseDuration(item.videoDuration);
        return duration >= filters.minDuration!;
      });
      appliedFilters.push(`Min duration: ${filters.minDuration}s`);
    }

    if (filters.maxDuration !== undefined && filters.maxDuration < 3600) {
      filtered = filtered.filter((item) => {
        const duration = parseDuration(item.videoDuration);
        return duration <= filters.maxDuration!;
      });
      appliedFilters.push(`Max duration: ${filters.maxDuration}s`);
    }

    // Channel filter
    if (filters.channels && filters.channels.length > 0) {
      filtered = filtered.filter((item) =>
        filters.channels!.includes(
          item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle || ""
        )
      );
      appliedFilters.push(`Channels: ${filters.channels.length} selected`);
    }

    // Keywords filter
    if (filters.keywords && filters.keywords.trim()) {
      const keywords = filters.keywords
        .toLowerCase()
        .split(",")
        .map((k) => k.trim());
      filtered = filtered.filter((item) =>
        keywords.some(
          (keyword) =>
            item.snippet.title.toLowerCase().includes(keyword) ||
            (item.snippet.description &&
              item.snippet.description.toLowerCase().includes(keyword))
        )
      );
      appliedFilters.push(`Keywords: "${filters.keywords}"`);
    }

    // Date range filter
    if (filters.dateRange?.from || filters.dateRange?.to) {
      filtered = filtered.filter((item) => {
        const publishDate = new Date(item.contentDetails.videoPublishedAt);
        const fromDate = filters.dateRange?.from
          ? new Date(filters.dateRange.from)
          : new Date("1900-01-01");
        const toDate = filters.dateRange?.to
          ? new Date(filters.dateRange.to)
          : new Date();

        return publishDate >= fromDate && publishDate <= toDate;
      });
      appliedFilters.push("Date range applied");
    }

    // Content type filter (based on duration categories)
    if (filters.contentType && filters.contentType.length > 0) {
      filtered = filtered.filter((item) => {
        const duration = parseDuration(item.videoDuration);
        const isShort =
          duration < 300 && filters.contentType!.includes("shorts");
        const isStandard =
          duration >= 300 &&
          duration < 1200 &&
          filters.contentType!.includes("standard");
        const isLong =
          duration >= 1200 && filters.contentType!.includes("long");

        return isShort || isStandard || isLong;
      });
      appliedFilters.push(
        `Content types: ${filters.contentType.length} selected`
      );
    }

    // Sorting
    if (filters.sortBy && filters.sortBy !== "position") {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (filters.sortBy) {
          case "duration":
            aValue = parseDuration(a.videoDuration);
            bValue = parseDuration(b.videoDuration);
            break;
          case "publishDate":
            aValue = new Date(a.contentDetails.videoPublishedAt);
            bValue = new Date(b.contentDetails.videoPublishedAt);
            break;
          case "addedDate":
            aValue = new Date(a.snippet.publishedAt);
            bValue = new Date(b.snippet.publishedAt);
            break;
          case "title":
            aValue = a.snippet.title.toLowerCase();
            bValue = b.snippet.title.toLowerCase();
            break;
          default:
            return 0;
        }

        const order = filters.sortOrder === "desc" ? -1 : 1;
        if (aValue < bValue) return -1 * order;
        if (aValue > bValue) return 1 * order;
        return 0;
      });
      appliedFilters.push(`Sorted by ${filters.sortBy} (${filters.sortOrder})`);
    }

    setActiveFilters(appliedFilters);

    return {
      ...originalPlaylist,
      items: filtered.map((item, index) => ({ ...item, index: index + 1 })),
    };
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      // Better URL validation for YouTube playlist URLs
      try {
        const url = new URL(data.url);
        const playlistId = url.searchParams.get("list");

        // Check if it's a YouTube URL and has a playlist ID
        if (
          !url.hostname.includes("youtube.com") &&
          !url.hostname.includes("youtu.be")
        ) {
          toast({
            variant: "destructive",
            title: t("toast.invalidUrl.title"),
            description: t("toast.invalidUrl.desc"),
          });
          return;
        }

        if (!playlistId) {
          toast({
            variant: "destructive",
            title: t("toast.invalidPlaylist.title"),
            description: t("toast.invalidPlaylist.desc"),
          });
          return;
        }
      } catch (urlError) {
        toast({
          variant: "destructive",
          title: t("toast.invalidFormat.title"),
          description: t("toast.invalidFormat.desc"),
        });
        return;
      }

      if (isAdvanced && data.start >= data.end) {
        toast({
          variant: "destructive",
          title: t("toast.invalidRange.title"),
          description: t("toast.invalidRange.desc"),
        });
        return;
      }

      try {
        // Progressive loading steps
        setLoadingStep(0);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setLoadingStep(1);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        setLoadingStep(2);
        const response = isAdvanced
          ? await getPlaylistByParams(data.url, data.start, data.end)
          : await getPlaylist(data.url);

        setLoadingStep(3);
        setPlaylist(response);
        await new Promise(resolve => setTimeout(resolve, 300));

        setLoadingStep(4);
        // Apply filters
        const filtered = applyFilters(response, data);
        setFilteredPlaylist(filtered);
        await new Promise(resolve => setTimeout(resolve, 200));

        toast({
          title: t("toast.success.title"),
          description: t("toast.success.desc").replace("{total}", String(response.items.length)).replace("{filtered}", String(filtered.items.length)),
        });

        setTimeout(() => {
          const element = document.getElementById("playlist-analysis");
          if (element) {
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const offset = 80; // Navbar height + some spacing
            window.scrollTo({
              top: absoluteElementTop - offset,
              behavior: "smooth"
            });
          }
        }, 100);
        
        // Reset loading step
        setLoadingStep(0);
      } catch (error) {
        // Reset loading step on error
        setLoadingStep(0);
        toast({
          variant: "destructive",
          title: t("toast.error.title"),
          description: (error as Error).message,
        });
      }
    });
  };

  const clearFilters = () => {
    form.setValue("minDuration", 0);
    form.setValue("maxDuration", 3600);
    form.setValue("channels", []);
    form.setValue("keywords", "");
    form.setValue("contentType", []);
    form.setValue("dateRange", {});
    form.setValue("sortBy", "position");
    form.setValue("sortOrder", "asc");

    if (playlist) {
      setFilteredPlaylist(playlist);
    }
    setActiveFilters([]);
  };

  const reapplyFilters = () => {
    if (playlist) {
      const filtered = applyFilters(playlist, form.getValues());
      setFilteredPlaylist(filtered);
    }
  };

  // Get unique channels for filter dropdown
  const availableChannels = playlist
    ? Array.from(
        new Set(
          playlist.items.map(
            (item) =>
              item.snippet.videoOwnerChannelTitle ||
              item.snippet.channelTitle ||
              t("search.unknownChannel")
          )
        )
      ).filter((channel) => channel !== t("search.unknownChannel"))
    : [];

  // Inline social icon components
  const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
  const PinIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M12 2C10.34 2 9 3.34 9 5c0 1.03.52 1.93 1.31 2.47L7 16H5v2h14v-2h-2l-3.31-8.53C14.48 6.93 15 6.03 15 5c0-1.66-1.34-3-3-3z"/>
    </svg>
  );
  const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" />
    </svg>
  );

  return (
    <div className="w-full mx-auto max-w-6xl">
      {/* Card Container — matches screenshot style, kept compact for focus */}
      <div className={`max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.3)] border border-gray-200/60 dark:border-gray-700/40 transition-all duration-500 ease-in-out transform ${
        isPending ? 'scale-[0.99] opacity-95' : 'scale-100 opacity-100'
      }`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Title — left-aligned bold */}
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              {t("analyze.title")}
            </h2>

            {/* Textarea Input — multi-line like screenshot */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      placeholder={"Paste a YouTube playlist URL here…\n\nExamples:\n• youtube.com/playlist?list=PLxxxxxxx\n• youtu.be/watch?v=xxx&list=PLxxxxxxx\n\nWorks with any public or unlisted playlist"}
                      className="w-full min-h-[100px] px-4 py-3.5 text-[15px] bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-gray-300 dark:hover:border-gray-500 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 focus:outline-none resize-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-1.5" />
                </FormItem>
              )}
            />

            {/* Secondary Actions Row — Try example (subtle) + Advanced options (prominent pill) */}
            <div className="flex items-center justify-between gap-3">
              {/* Try Example — warm-toned pill button, balanced with Advanced Options */}
              <button
                type="button"
                onClick={() => {
                  form.setValue("url", "https://www.youtube.com/playlist?list=PLK6HsuHeltDnKkWgAQMmck7x5ghgugu78");
                }}
                className="group flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/15 border border-amber-200/70 dark:border-amber-700/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/25 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 cursor-pointer shrink-0"
              >
                <Sparkles className="h-4 w-4 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
                <span>{t("search.tryExample")}</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-0.5 text-[11px] font-sans font-normal text-amber-500/70 bg-amber-100/60 dark:bg-amber-800/30 rounded-md px-1.5 py-0.5">↵</kbd>
              </button>

              {/* Advanced Options Toggle — bordered pill button, more prominent */}
              <button
                type="button"
                onClick={() => setIsAdvanced(!isAdvanced)}
                className={`group flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  isAdvanced
                    ? 'border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>{t("search.advancedOptions")}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isAdvanced ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Full-width Dark CTA Button — YouTube icon + Calculate Duration */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-13 rounded-xl bg-gray-900 dark:bg-gray-950 hover:bg-gray-800 dark:hover:bg-gray-800 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Youtube className="h-5 w-5" />
              )}
              {t("search.calculate")} Duration
            </Button>

            {/* Footer Note */}
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 pt-1">
              No sign-up required · Supports playlists &amp; single videos
            </p>

            {/* Social Share Icons Row */}
            <div className="flex items-center justify-center gap-1.5 pt-1 pb-2">
              <span className="text-xs text-gray-400 dark:text-gray-500 mr-1">Share:</span>
              {[
                { icon: <Share2 className="h-4 w-4" />, label: "X / Twitter" },
                { icon: <span className="text-sm font-bold">f</span>, label: "Facebook" },
                { icon: <span className="text-sm font-bold">in</span>, label: "LinkedIn" },
                { icon: <span className="text-sm font-bold">📌</span>, label: "Reddit" },
                { icon: <Share2 className="h-4 w-4" />, label: "WhatsApp" },
                { icon: <SendIcon />, label: "Telegram" },
                { icon: <PinIcon />, label: "Pinterest" },
                { icon: <MailIcon />, label: "Email" },
                { icon: <LinkIcon className="h-4 w-4" />, label: "Copy link" },
              ].map((social, i) => (
                <button
                  key={i}
                  type="button"
                  title={social.label}
                  onClick={() => {
                    if (social.label === "Copy link") {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
                >
                  {social.icon}
                </button>
              ))}
            </div>

              {/* Advanced Options Panel */}
              <Collapsible open={isAdvanced} onOpenChange={setIsAdvanced} className="w-full">
                <CollapsibleContent className="animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
                  <div className="mt-4 bg-background/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-border/40 shadow-xl ring-1 ring-white/10">
                    
                    {/* Section 1: Configuration */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <SlidersHorizontal className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{t("search.configuration")}</h4>
                          <p className="text-sm text-muted-foreground">{t("search.configDesc")}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                        {/* Range Selection */}
                        <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                          <h5 className="text-sm font-medium flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            {t("search.playlistRange")}
                          </h5>
                          <div className="flex gap-4 items-center">
                            <FormField
                              control={form.control}
                              name="start"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">{t("search.start")}</span>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        className="h-12 pt-5 text-center font-medium bg-background/50 border-border/40 focus:border-purple-500/50"
                                        {...field}
                                        onChange={(e) => form.setValue("start", parseInt(e.target.value) || 1)}
                                      />
                                    </FormControl>
                                  </div>
                                </FormItem>
                              )}
                            />
                            <div className="h-px w-4 bg-border" />
                            <FormField
                              control={form.control}
                              name="end"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">{t("search.end")}</span>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        className="h-12 pt-5 text-center font-medium bg-background/50 border-border/40 focus:border-purple-500/50"
                                        {...field}
                                        onChange={(e) => form.setValue("end", parseInt(e.target.value) || 50)}
                                      />
                                    </FormControl>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Display Format */}
                        <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                          <h5 className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {t("search.displayFormat")}
                          </h5>
                          <div className="space-y-2">
                             <Select value={format} onValueChange={(v: videoFormat) => setFormat(v)}>
                              <SelectTrigger className="h-12 bg-background/50 border-border/40 focus:ring-purple-500/20 text-center font-medium">
                                <SelectValue placeholder={t("search.formatSelect")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hrs">{t("search.formatHrs")}</SelectItem>
                                <SelectItem value="min">{t("search.formatMin")}</SelectItem>
                                <SelectItem value="sec">{t("search.formatSec")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Filters (Visible only when playlist loaded) */}
                    {playlist && (
                      <div className="mt-8 pt-8 border-t border-border/40">
                         <div className="flex items-center justify-between pb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                              <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg flex items-center gap-2">
                                {t("search.filtersTitle")}
                                {activeFilters.length > 0 && (
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                                    {t("search.filtersActive").replace("{count}", String(activeFilters.length))}
                                  </Badge>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground">{t("search.refineResults")}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            className="text-xs h-9 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                          >
                            <RotateCcw className="h-3 w-3 mr-2" />
                            {t("search.resetFilters")}
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Left Column: Duration & Content Type */}
                           <div className="space-y-6">
                              {/* Duration */}
                              <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                                <h5 className="text-sm font-medium flex items-center gap-2">
                                  <Timer className="h-4 w-4 text-muted-foreground" />
                                  {t("search.durationTitle")}
                                </h5>
                                <div className="flex gap-4 items-center">
                                  <FormField
                                    control={form.control}
                                    name="minDuration"
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <div className="relative">
                                          <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">{t("search.min")}</span>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              className="h-10 pl-10 text-center font-medium bg-background/50 border-border/40 focus:border-purple-500/50"
                                              {...field}
                                              onChange={(e) => {
                                                form.setValue("minDuration", parseInt(e.target.value) || 0);
                                                reapplyFilters();
                                              }}
                                            />
                                          </FormControl>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                  <div className="h-px w-4 bg-border" />
                                  <FormField
                                    control={form.control}
                                    name="maxDuration"
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <div className="relative">
                                          <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">{t("search.max")}</span>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              className="h-10 pl-10 text-center font-medium bg-background/50 border-border/40 focus:border-purple-500/50"
                                              {...field}
                                              onChange={(e) => {
                                                form.setValue("maxDuration", parseInt(e.target.value) || 3600);
                                                reapplyFilters();
                                              }}
                                            />
                                          </FormControl>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              {/* Content Type */}
                              <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                                <h5 className="text-sm font-medium flex items-center gap-2">
                                  <Tag className="h-4 w-4 text-muted-foreground" />
                                  {t("search.contentType")}
                                </h5>
                                <FormField
                                  control={form.control}
                                  name="contentType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="flex flex-wrap gap-2">
                                        {[
                                          { id: "shorts", label: t("search.typeShorts") },
                                          { id: "standard", label: t("search.typeStandard") },
                                          { id: "long", label: t("search.typeLong") },
                                        ].map((type) => (
                                          <div key={type.id} className="relative">
                                            <Checkbox
                                              id={type.id}
                                              className="peer sr-only"
                                              checked={field.value?.includes(type.id)}
                                              onCheckedChange={(checked) => {
                                                const current = field.value || [];
                                                if (checked) form.setValue("contentType", [...current, type.id]);
                                                else form.setValue("contentType", current.filter((i) => i !== type.id));
                                                reapplyFilters();
                                              }}
                                            />
                                            <label
                                              htmlFor={type.id}
                                              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 cursor-pointer transition-all peer-data-[state=checked]:bg-purple-500/10 peer-data-[state=checked]:border-purple-500/50 peer-data-[state=checked]:text-purple-600 dark:peer-data-[state=checked]:text-purple-300"
                                            >
                                              <span className={`w-2 h-2 rounded-full ${field.value?.includes(type.id) ? 'bg-purple-500' : 'bg-muted-foreground/30'}`} />
                                              <span className="text-xs font-medium">{type.label}</span>
                                            </label>
                                          </div>
                                        ))}
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </div>
                           </div>

                           {/* Right Column: Channels, Keywords, Sorting */}
                           <div className="space-y-6">
                              {/* Keywords */}
                              <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                                <h5 className="text-sm font-medium flex items-center gap-2">
                                  <Search className="h-4 w-4 text-muted-foreground" />
                                  {t("search.keywords")}
                                </h5>
                                <FormField
                                  control={form.control}
                                  name="keywords"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <div className="relative">
                                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
                                          <Input
                                            placeholder={t("search.keywordsPlaceholder")}
                                            className="h-10 pl-9 text-sm bg-background/50 border-border/40 focus:border-purple-500/50"
                                            {...field}
                                            onChange={(e) => {
                                              field.onChange(e);
                                              setTimeout(() => reapplyFilters(), 500);
                                            }}
                                          />
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>

                              {/* Sorting */}
                              <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                                <h5 className="text-sm font-medium flex items-center gap-2">
                                  <Hash className="h-4 w-4 text-muted-foreground" />
                                  {t("search.sorting")}
                                </h5>
                                <div className="flex gap-3">
                                  <FormField
                                    control={form.control}
                                    name="sortBy"
                                    render={({ field }) => (
                                      <FormItem className="flex-[2]">
                                        <Select
                                          onValueChange={(value) => { field.onChange(value); reapplyFilters(); }}
                                          defaultValue={field.value}
                                        >
                                          <SelectTrigger className="h-10 text-xs bg-background/50 border-border/40">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="position">{t("search.sortPosition")}</SelectItem>
                                            <SelectItem value="duration">{t("search.sortDuration")}</SelectItem>
                                            <SelectItem value="publishDate">{t("search.sortDate")}</SelectItem>
                                            <SelectItem value="title">{t("search.sortTitle")}</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="sortOrder"
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <Select
                                          onValueChange={(value) => { field.onChange(value); reapplyFilters(); }}
                                          defaultValue={field.value}
                                        >
                                          <SelectTrigger className="h-10 text-xs bg-background/50 border-border/40">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="asc">{t("search.sortAsc")}</SelectItem>
                                            <SelectItem value="desc">{t("search.sortDesc")}</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                           </div>
                        </div>

                        {/* Channels (Full Width) */}
                        {availableChannels.length > 0 && (
                          <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                            <h5 className="text-sm font-medium flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {t("search.channels")}
                            </h5>
                            <FormField
                              control={form.control}
                              name="channels"
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={(value) => {
                                      const current = field.value || [];
                                      if (!current.includes(value)) {
                                        form.setValue("channels", [...current, value]);
                                        reapplyFilters();
                                      }
                                    }}
                                  >
                                    <SelectTrigger className="h-10 text-xs bg-background/50 border-border/40 w-full md:w-1/2">
                                      <SelectValue placeholder={t("search.addChannel")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {availableChannels.map((channel) => (
                                        <SelectItem key={channel} value={channel} className="text-xs">
                                          {channel}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  {field.value && field.value.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/40">
                                      {field.value.map((channel) => (
                                        <Badge key={channel} variant="secondary" className="flex items-center gap-1.5 text-xs py-1.5 px-3 bg-white/50 dark:bg-black/20 border border-border/50 shadow-sm transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 cursor-pointer group"
                                          onClick={() => {
                                            const updated = field.value?.filter((c) => c !== channel) || [];
                                            form.setValue("channels", updated);
                                            reapplyFilters();
                                          }}
                                        >
                                          {channel}
                                          <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </form>
          </Form>
        </div>
      {/* Results — with generous top spacing from card */}
      <div className="mt-12">
      {isPending && loadingStep < 3 && (
        <LoadingMessage 
          step={loadingStep} 
          message={loadingMessages[loadingStep] || t("search.processing")} 
        />
      )}
      {isPending && loadingStep >= 3 && <PlaylistSkeleton />}
      {!isPending && filteredPlaylist && <PlaylistResult playlist={filteredPlaylist} format={format} />}
      </div>{/* End Results spacing wrapper */}
    </div>
  );
}