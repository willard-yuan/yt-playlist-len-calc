import { PlaylistItemListResponse, videoFormat, videoSpeed } from '@/lib/types'
import { Card, CardContent } from "@/components/ui/card"
import { calculateTotalDuration, parseDuration } from '@/lib/utils'
import { ExternalLink, Clock, Calendar, Play, Eye, TrendingUp, Timer, Hash, User2, Sparkles, CheckCircle, Circle } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ThumbnailImage } from './thumbnail-image'

export default function VideoCard({ item, format, speed, isCompleted = false, onToggleCompleted, onPlay }: { 
    item: PlaylistItemListResponse['items'][0] & { index: number }, 
    format: videoFormat, 
    speed: videoSpeed,
    isCompleted?: boolean,
    onToggleCompleted?: () => void,
    onPlay?: () => void
}) {
    const videoTitle = item.snippet.title.length > 70 ? 
        item.snippet.title.substring(0, 70) + '...' : 
        item.snippet.title
    
    const thumbnails = item?.snippet?.thumbnails;
    const imageUrl =
      thumbnails?.default?.url ||
      thumbnails?.medium?.url ||
      thumbnails?.standard?.url ||
      thumbnails?.high?.url ||
      item.videoThumbnail;
    const videoLength = parseDuration(item.videoDuration)
    const videoFormat = format.charAt(0).toUpperCase() + format.slice(1)
    const originalLength = calculateTotalDuration(videoLength, format)
    const playbackDuration = calculateTotalDuration(videoLength / parseFloat(speed), format)
    
    const publishDate = new Date(item.contentDetails.videoPublishedAt).toLocaleDateString('en-US', { 
        month: "short", 
        day: "numeric",
        year: 'numeric' 
    });
    
    const addedToPlaylistDate = new Date(item.snippet.publishedAt).toLocaleDateString('en-US', { 
        month: "short", 
        day: "numeric",
        year: 'numeric' 
    });

    // Determine video length category
    const getVideoCategory = (seconds: number) => {
        if (seconds < 300) return { label: 'Quick', color: 'bg-purple-500', textColor: 'text-purple-700' };
        if (seconds < 1200) return { label: 'Standard', color: 'bg-purple-500', textColor: 'text-purple-700' };
        return { label: 'Deep Dive', color: 'bg-purple-500', textColor: 'text-purple-700' };
    };

    const category = getVideoCategory(videoLength);

    // Content freshness indicator
    const getContentFreshness = () => {
        const now = new Date();
        const publishedDate = new Date(item.contentDetails.videoPublishedAt);
        const monthsAgo = (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
        
        if (monthsAgo <= 1) return { label: 'New', color: 'bg-purple-100 text-purple-700', icon: Sparkles };
        if (monthsAgo <= 6) return { label: 'Recent', color: 'bg-purple-100 text-purple-700', icon: TrendingUp };
        if (monthsAgo <= 24) return { label: 'Standard', color: 'bg-purple-100 text-purple-700', icon: Clock };
        return { label: 'Classic', color: 'bg-purple-100 text-purple-700', icon: Timer };
    };

    const freshness = getContentFreshness();

    return (
        <Card className={cn(
            "group hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-purple-200 dark:hover:border-purple-800 flex flex-col",
            isCompleted && "opacity-75 bg-secondary/10 border-green-500/20 dark:border-green-500/20"
        )}>
            <div className="relative">
                {/* Thumbnail */}
                <div 
                    className={cn(
                        "relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 cursor-pointer group/thumb",
                        isCompleted && "grayscale-[0.3]"
                    )}
                    onClick={onPlay}
                >
                    <ThumbnailImage 
                        src={imageUrl} 
                        alt={item.snippet.title} 
                        videoId={item.contentDetails.videoId}
                        className="absolute inset-0"
                        imgClassName="group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover/thumb:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                        <div className="h-14 w-14 rounded-full bg-white/90 dark:bg-white/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                            <Play className="h-7 w-7 text-purple-600 fill-purple-600 ml-1" />
                        </div>
                    </div>
                    
                    {/* Video Number Badge */}
                    <Badge 
                        variant="secondary" 
                        className={cn(
                            "absolute top-2 left-2 md:top-3 md:left-3 bg-black/90 text-white border-none font-bold px-2 py-1 md:px-3 text-xs",
                            isCompleted && "bg-green-600"
                        )}
                    >
                        #{item.index} {isCompleted && <CheckCircle className="ml-1 h-3 w-3 inline" />}
                    </Badge>
                    
                    {/* Category Badge - Hidden on mobile */}
                    <Badge 
                        variant="secondary" 
                        className={`absolute top-2 right-2 md:top-3 md:right-3 ${category.color} text-white border-none px-2 py-1 text-xs hidden sm:inline-flex`}
                    >
                        {category.label}
                    </Badge>
                    
                    {/* Duration Badge */}
                    <Badge 
                        variant="secondary" 
                        className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-black/90 text-white border-none flex items-center gap-1 text-xs"
                    >
                        <Clock className="h-3 w-3" />
                        {originalLength}
                    </Badge>

                    {/* Freshness Badge - Hidden on mobile */}
                    <Badge 
                        variant="secondary" 
                        className={`absolute bottom-2 left-2 md:bottom-3 md:left-3 ${freshness.color} border-none items-center gap-1 text-xs hidden sm:flex`}
                    >
                        <freshness.icon className="h-3 w-3" />
                        {freshness.label}
                    </Badge>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                            <Play className="h-6 w-6 md:h-8 md:w-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <CardContent className="p-3 md:p-5 space-y-3 md:space-y-4 flex-1 flex flex-col">
                {/* Title */}
                <h4 className={cn(
                    "font-semibold text-sm md:text-base leading-tight line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors",
                    isCompleted && "text-muted-foreground line-through decoration-green-500/50"
                )}>
                    {videoTitle}
                </h4>

                {/* Mobile: Show category and freshness inline */}
                <div className="flex items-center gap-2 sm:hidden">
                    <Badge variant="outline" className={`${category.textColor} text-xs px-2 py-1`}>
                        {category.label}
                    </Badge>
                    <Badge variant="outline" className={`${freshness.color} text-xs px-2 py-1 flex items-center gap-1`}>
                        <freshness.icon className="h-3 w-3" />
                        {freshness.label}
                    </Badge>
                </div>

                {/* Video Metadata Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 text-xs flex-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="sm:hidden">Pub {publishDate}</span>
                        <span className="hidden sm:inline">Published {publishDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Timer className="h-3 w-3" />
                        <span>{originalLength} {videoFormat.toLowerCase()}</span>
                    </div>
                    {/* Hide position on mobile to save space */}
                    <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                        <Hash className="h-3 w-3" />
                        <span>Pos #{item.snippet.position + 1}</span>
                    </div>
                    {/* Hide added date on mobile */}
                    <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                        <User2 className="h-3 w-3" />
                        <span>Added {addedToPlaylistDate}</span>
                    </div>
                </div>

                {/* Speed Comparison */}
                {speed !== '1' && (
                    <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <div className="flex items-center justify-between text-xs md:text-sm">
                            <span className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                                <TrendingUp className="h-3 w-3" />
                                At {speed}x speed
                            </span>
                            <span className="font-semibold text-purple-700 dark:text-purple-300">
                                {playbackDuration} {videoFormat.toLowerCase()}
                            </span>
                        </div>
                    </div>
                )}

                {/* Channel Info */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span className="truncate">
                        {item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle || 'Unknown Channel'}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto pt-2">
                    {/* Primary Play Action & External Link */}
                    <div className="flex items-center gap-2">
                        <Button
                            className={cn(
                                "flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-sm transition-all hover:shadow-md group/play h-9",
                                isCompleted && "opacity-90 saturate-50"
                            )}
                            onClick={onPlay}
                        >
                            <Play className="h-4 w-4 mr-2 fill-white/20 transition-transform group-hover/play:scale-110" />
                            Watch Now
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="shrink-0 h-9 w-9 text-muted-foreground hover:text-red-600 hover:border-red-200 dark:hover:border-red-900/50 transition-colors"
                            title="Open in YouTube"
                        >
                            <a
                                href={`https://youtube.com/watch?v=${item.contentDetails.videoId}&list=${item.snippet.playlistId}&index=${item.snippet.position + 1}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Watch on YouTube</span>
                            </a>
                        </Button>
                    </div>

                    {onToggleCompleted && (
                        <Button
                            variant={isCompleted ? "secondary" : "ghost"}
                            size="sm"
                            className={cn(
                                "w-full gap-1.5 h-8 border border-transparent hover:bg-secondary/50",
                                isCompleted 
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" 
                                    : "text-muted-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                onToggleCompleted();
                            }}
                        >
                            {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                            <span className="text-xs font-medium">{isCompleted ? "Completed" : "Mark as Watched"}</span>
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}