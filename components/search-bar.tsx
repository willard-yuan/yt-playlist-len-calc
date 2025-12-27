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
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { parseDuration } from "@/lib/utils";

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

  const loadingMessages = [
    "Connecting to YouTube...",
    "Fetching playlist data...",
    "Analyzing video information...",
    "Calculating durations...",
    "Almost ready!"
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
            title: "Invalid URL",
            description: "Please enter a valid YouTube URL",
          });
          return;
        }

        if (!playlistId) {
          toast({
            variant: "destructive",
            title: "Invalid Playlist URL",
            description:
              "Please enter a valid YouTube playlist URL containing a 'list' parameter",
          });
          return;
        }
      } catch (urlError) {
        toast({
          variant: "destructive",
          title: "Invalid URL",
          description: "Please enter a valid URL format",
        });
        return;
      }

      if (isAdvanced && data.start >= data.end) {
        toast({
          variant: "destructive",
          title: "Invalid Range",
          description: "Start position must be less than end position",
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
          title: "Success!",
          description: `Loaded ${response.items.length} videos, showing ${filtered.items.length} after filters`,
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
          title: "Error",
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
              "Unknown"
          )
        )
      ).filter((channel) => channel !== "Unknown")
    : [];

  return (
    <div className="space-y-12 w-full mx-auto max-w-4xl">
      {/* Enhanced Search Form */}
      <div className={`transition-all duration-500 ease-in-out transform ${
        isPending ? 'scale-[0.98] opacity-90' : 'scale-100 opacity-100'
      }`}>
        <div className="relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Main Search Area */}
              <div className="space-y-4">
              <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="relative z-10">
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 pointer-events-none group-focus-within:text-purple-500 transition-colors duration-300" />
                          <Input
                            type="url"
                            placeholder="Paste YouTube Playlist URL..."
                            className="h-16 text-lg bg-background/80 backdrop-blur-sm border-2 border-border/40 hover:border-purple-500/30 focus:border-purple-500 rounded-full pl-14 pr-40 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg focus:ring-4 focus:ring-purple-500/10 w-full"
                            disabled={isPending}
                            {...field}
                          />
                          <div className="absolute right-2 top-2 bottom-2">
                            <Button
                              type="submit"
                              disabled={isPending}
                              className="h-full px-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-base shadow-md transition-all duration-300"
                            >
                              {isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                "Calculate"
                              )}
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="pl-6 mt-2" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Secondary Actions Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-2 gap-4">
                   {/* Example Link */}
                  <button
                    type="button"
                    onClick={() => {
                      form.setValue("url", "https://www.youtube.com/playlist?list=PLK6HsuHeltDnKkWgAQMmck7x5ghgugu78");
                    }}
                    className="group flex items-center gap-2 text-sm text-muted-foreground/80 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 px-3 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/10"
                  >
                    <Sparkles className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Try with an example playlist</span>
                  </button>

                  {/* Advanced Options Toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-muted-foreground hover:text-foreground group transition-all duration-300 ${isAdvanced ? 'bg-secondary/50 text-foreground' : ''}`}
                    type="button"
                    onClick={() => setIsAdvanced(!isAdvanced)}
                  >
                    <Settings2 className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-500" />
                    Advanced Options
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isAdvanced ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
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
                          <h4 className="font-semibold text-lg">Configuration</h4>
                          <p className="text-sm text-muted-foreground">Customize how you want to analyze the playlist</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                        {/* Range Selection */}
                        <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                          <h5 className="text-sm font-medium flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            Playlist Range
                          </h5>
                          <div className="flex gap-4 items-center">
                            <FormField
                              control={form.control}
                              name="start"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">Start</span>
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
                                    <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">End</span>
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
                            Display Format
                          </h5>
                          <div className="space-y-2">
                             <Select value={format} onValueChange={(v: videoFormat) => setFormat(v)}>
                              <SelectTrigger className="h-12 bg-background/50 border-border/40 focus:ring-purple-500/20 text-center font-medium">
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hrs">Hours, Minutes, Seconds</SelectItem>
                                <SelectItem value="min">Minutes only</SelectItem>
                                <SelectItem value="sec">Seconds only</SelectItem>
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
                                Filters & Sorting
                                {activeFilters.length > 0 && (
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                                    {activeFilters.length} active
                                  </Badge>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground">Refine your results</p>
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
                            Reset Filters
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Left Column: Duration & Content Type */}
                           <div className="space-y-6">
                              {/* Duration */}
                              <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-border/20">
                                <h5 className="text-sm font-medium flex items-center gap-2">
                                  <Timer className="h-4 w-4 text-muted-foreground" />
                                  Duration (seconds)
                                </h5>
                                <div className="flex gap-4 items-center">
                                  <FormField
                                    control={form.control}
                                    name="minDuration"
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <div className="relative">
                                          <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">Min</span>
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
                                          <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">Max</span>
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
                                  Content Type
                                </h5>
                                <FormField
                                  control={form.control}
                                  name="contentType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="flex flex-wrap gap-2">
                                        {[
                                          { id: "shorts", label: "Shorts" },
                                          { id: "standard", label: "Standard" },
                                          { id: "long", label: "Long" },
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
                                  Keywords
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
                                            placeholder="Filter by title..."
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
                                  Sorting
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
                                            <SelectItem value="position">Position</SelectItem>
                                            <SelectItem value="duration">Duration</SelectItem>
                                            <SelectItem value="publishDate">Date</SelectItem>
                                            <SelectItem value="title">Title</SelectItem>
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
                                            <SelectItem value="asc">Asc</SelectItem>
                                            <SelectItem value="desc">Desc</SelectItem>
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
                              Channels
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
                                      <SelectValue placeholder="Add channel filter..." />
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
      </div>
      {/* Results */}
      {isPending && loadingStep < 3 && (
        <LoadingMessage 
          step={loadingStep} 
          message={loadingMessages[loadingStep] || "Processing..."} 
        />
      )}
      {isPending && loadingStep >= 3 && <PlaylistSkeleton />}
      {!isPending && filteredPlaylist && <PlaylistResult playlist={filteredPlaylist} format={format} />}
    </div>
  );
}