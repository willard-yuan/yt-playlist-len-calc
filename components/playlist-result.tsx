import { PlaylistItemListResponse, videoFormat, videoSpeed } from '@/lib/types';
import { calculateTotalDuration, parseDuration } from '@/lib/utils';
import VideoCard from './video-card';
import { useState, useMemo, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, PlayCircle, User, TrendingUp, Activity, Calendar as CalendarIcon, Target, Zap, ChevronDown, ChevronUp, Sliders, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from './ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from './ui/button';
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format as formatDate } from "date-fns"
import { cn } from "@/lib/utils"

export default function PlaylistResult({ playlist, format = 'hrs' }: { playlist: PlaylistItemListResponse, format?: videoFormat }) {
    const [speed, setSpeed] = useState<videoSpeed>('1')
    
    // Active Planning State
    const [dailyInvestment, setDailyInvestment] = useState<number>(2) // Default 2 hours
    const [targetDate, setTargetDate] = useState<string>('')
    const [isDrivingDate, setIsDrivingDate] = useState(false)
    const [isOpenAdvanced, setIsOpenAdvanced] = useState(false)
    
    // Completed Videos State
    const [completedVideoIds, setCompletedVideoIds] = useState<Set<string>>(new Set())

    // Load completed videos from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('completed-videos')
        if (saved) {
            try {
                setCompletedVideoIds(new Set(JSON.parse(saved)))
            } catch (e) {
                console.error('Failed to parse completed videos', e)
            }
        }
    }, [])

    const toggleCompleted = (videoId: string) => {
        const newSet = new Set(completedVideoIds)
        if (newSet.has(videoId)) {
            newSet.delete(videoId)
        } else {
            newSet.add(videoId)
        }
        setCompletedVideoIds(newSet)
        localStorage.setItem('completed-videos', JSON.stringify(Array.from(newSet)))
    }

    // Enhanced calculations with new data
    const playlistStats = useMemo(() => {
        const durations = playlist.items.map((item) => parseDuration(item.videoDuration));
        const totalSeconds = durations.reduce((acc, curr) => acc + curr, 0);
        
        // Calculate completed stats
        let completedSeconds = 0;
        let completedCount = 0;
        
        playlist.items.forEach((item, index) => {
            if (completedVideoIds.has(item.contentDetails.videoId)) {
                completedSeconds += durations[index];
                completedCount++;
            }
        });
        
        const remainingSeconds = Math.max(0, totalSeconds - completedSeconds);

        // Calculate statistics
        const avgDuration = totalSeconds / playlist.items.length;
        const shortestVideo = Math.min(...durations);
        const longestVideo = Math.max(...durations);
        
        // Content analysis
        const shortVideos = durations.filter(d => d < 300).length; // < 5 min
        const mediumVideos = durations.filter(d => d >= 300 && d < 1200).length; // 5-20 min
        const longVideos = durations.filter(d => d >= 1200).length; // > 20 min
        
        // Viewing time estimates
        const watchingHours = totalSeconds / 3600;
        
        // New analytics
        const uniqueChannels = new Set(playlist.items.map(item => item.snippet.channelId || item.snippet.videoOwnerChannelId)).size;
        const playlistCreator = playlist.items[0]?.snippet?.channelTitle || 'Unknown';
        const totalPlaylistSize = playlist.pageInfo?.totalResults || playlist.items.length;
        const isPartialPlaylist = playlist.items.length < totalPlaylistSize;
        
        // Content freshness analysis
        const now = new Date();
        const recentVideos = playlist.items.filter(item => {
            const publishDate = new Date(item.contentDetails.videoPublishedAt);
            const monthsAgo = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
            return monthsAgo <= 6; // Videos from last 6 months
        }).length;
        
        const oldVideos = playlist.items.filter(item => {
            const publishDate = new Date(item.contentDetails.videoPublishedAt);
            const yearsAgo = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
            return yearsAgo >= 2; // Videos older than 2 years
        }).length;
        
        return {
            totalSeconds,
            remainingSeconds,
            completedSeconds,
            completedCount,
            avgDuration,
            shortestVideo,
            longestVideo,
            shortVideos,
            mediumVideos,
            longVideos,
            watchingHours,
            uniqueChannels,
            playlistCreator,
            totalPlaylistSize,
            isPartialPlaylist,
            recentVideos,
            oldVideos
        };
    }, [playlist, completedVideoIds]);

    // Initial Date Calculation
    useEffect(() => {
        if (!targetDate && playlistStats.remainingSeconds) {
            const totalHours = playlistStats.remainingSeconds / 3600 / parseFloat(speed);
            const daysNeeded = Math.ceil(totalHours / dailyInvestment);
            const date = new Date();
            date.setDate(date.getDate() + daysNeeded);
            setTargetDate(date.toISOString().split('T')[0]);
        }
    }, [playlistStats.remainingSeconds, speed, dailyInvestment, targetDate]);

    const handleInvestmentChange = (newInvestment: number) => {
        setDailyInvestment(newInvestment);
        setIsDrivingDate(false);
        
        const totalHours = playlistStats.remainingSeconds / 3600 / parseFloat(speed);
        const daysNeeded = Math.ceil(totalHours / newInvestment);
        const date = new Date();
        date.setDate(date.getDate() + daysNeeded);
        setTargetDate(date.toISOString().split('T')[0]);
    };

    const handleDateChange = (newDate: string) => {
        setTargetDate(newDate);
        setIsDrivingDate(true);
        
        const start = new Date();
        const end = new Date(newDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day
        
        const totalHours = playlistStats.remainingSeconds / 3600 / parseFloat(speed);
        let neededDaily = totalHours / diffDays;
        
        // Intelligent Suggestion Limit
        if (neededDaily > 24) neededDaily = 24; 
        
        setDailyInvestment(Number(neededDaily.toFixed(1)));
    };

    const handleSpeedChange = (newSpeed: videoSpeed) => {
        setSpeed(newSpeed);
        // Recalculate based on what's driving
        const speedVal = parseFloat(newSpeed);
        const totalHours = playlistStats.remainingSeconds / 3600 / speedVal;

        if (isDrivingDate) {
            // Keep date fixed, update investment
            const start = new Date();
            const end = new Date(targetDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            let neededDaily = totalHours / diffDays;
            if (neededDaily > 24) neededDaily = 24;
            setDailyInvestment(Number(neededDaily.toFixed(1)));
        } else {
            // Keep investment fixed, update date
            const daysNeeded = Math.ceil(totalHours / dailyInvestment);
            const date = new Date();
            date.setDate(date.getDate() + daysNeeded);
            setTargetDate(date.toISOString().split('T')[0]);
        }
    };

    const videoFormatLabel = format.charAt(0).toUpperCase() + format.slice(1)
    const totalLength = calculateTotalDuration(playlistStats.totalSeconds, format) + ' ' + videoFormatLabel
    const remainingLength = calculateTotalDuration(playlistStats.remainingSeconds, format) + ' ' + videoFormatLabel
    const completedLength = calculateTotalDuration(playlistStats.completedSeconds, format) + ' ' + videoFormatLabel
    
    // Time Saved Calculation
    const originalSeconds = playlistStats.remainingSeconds;
    const newSeconds = originalSeconds / parseFloat(speed);
    const savedSeconds = originalSeconds - newSeconds;
    const savedHours = (savedSeconds / 3600).toFixed(1);

    // Calculate progress percentages for content distribution
    const totalVideos = playlist.items.length;
    const shortPercent = (playlistStats.shortVideos / totalVideos) * 100;
    const mediumPercent = (playlistStats.mediumVideos / totalVideos) * 100;
    const longPercent = (playlistStats.longVideos / totalVideos) * 100;

    return (
        <div id="playlist-analysis" className="space-y-12 w-full mx-auto max-w-7xl">
            {/* Analysis & Planning Container */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Column 1: Playlist Analysis (Refined) */}
                <Card className="xl:col-span-1 overflow-hidden shadow-lg border-0 ring-1 ring-border/50 bg-background/50 backdrop-blur-xl">
                    <CardHeader className="bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 pb-6">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2.5 bg-blue-500/10 rounded-xl">
                                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            Playlist Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        {/* Key Stats */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
                                <div className="p-4 bg-secondary/30 rounded-2xl flex items-center justify-between group hover:bg-secondary/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium">Total</p>
                                            <p className="font-bold text-sm sm:text-base break-words">{totalLength}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-secondary/30 rounded-2xl flex items-center justify-between group hover:bg-secondary/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium">Remaining</p>
                                            <p className="font-bold text-sm sm:text-base break-words">{remainingLength}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-secondary/30 rounded-2xl flex items-center justify-between group hover:bg-secondary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground font-medium whitespace-nowrap">Watched ({playlistStats.completedCount}) videos</p>
                                        <p className="font-bold text-lg break-words">{completedLength}</p>
                                    </div>
                                </div>
                                <Progress value={(playlistStats.completedSeconds / playlistStats.totalSeconds) * 100} className="w-20 h-2" />
                            </div>

                            <div className="p-4 bg-secondary/30 rounded-2xl flex items-center justify-between group hover:bg-secondary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                                        <User className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground font-medium">Creator</p>
                                        <p className="font-bold text-lg truncate max-w-[150px]">{playlistStats.playlistCreator}</p>
                                    </div>
                                </div>
                            </div>
                            
                             <div className="p-4 bg-secondary/30 rounded-2xl flex items-center justify-between group hover:bg-secondary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground font-medium">Freshness</p>
                                        <p className="font-bold text-lg">{playlistStats.recentVideos} <span className="text-sm font-normal text-muted-foreground">Recent</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Content Distribution */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Videos Distribution
                            </h4>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>Short Videos (&lt;5mins)</span>
                                        <span className="font-medium">{playlistStats.shortVideos}</span>
                                    </div>
                                    <Progress value={shortPercent} className="h-1.5" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>Medium Videos (5-20mins)</span>
                                        <span className="font-medium">{playlistStats.mediumVideos}</span>
                                    </div>
                                    <Progress value={mediumPercent} className="h-1.5" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>Long Videos (&gt;20mins)</span>
                                        <span className="font-medium">{playlistStats.longVideos}</span>
                                    </div>
                                    <Progress value={longPercent} className="h-1.5" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Column 2 & 3: Active Planning (New) */}
                <Card className="xl:col-span-2 overflow-hidden shadow-2xl border-0 ring-1 ring-purple-500/20 bg-background/80 backdrop-blur-xl relative">
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    
                    <CardHeader className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 pb-8">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <div className="p-3 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/20">
                                <Target className="h-6 w-6" />
                            </div>
                            Active Planning
                        </CardTitle>
                        <p className="text-muted-foreground mt-2 ml-14">
                            Take control of your learning journey. Plan, optimize, and achieve your goals.
                        </p>
                    </CardHeader>
                    
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Inputs */}
                            <div className="space-y-10">
                                {/* Daily Investment Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-base font-semibold flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-purple-500" />
                                            Daily Investment
                                        </label>
                                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-lg">
                                            {dailyInvestment}h
                                        </span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0.5" 
                                        max="8" 
                                        step="0.5" 
                                        value={dailyInvestment}
                                        onChange={(e) => handleInvestmentChange(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-500 transition-all"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        How much time can you dedicate each day?
                                    </p>
                                </div>

                                {/* Target Date Picker */}
                                <div className="space-y-4">
                                    <label className="text-base font-semibold flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4 text-pink-500" />
                                        Target Completion Date
                                    </label>
                                    <div className="relative">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal p-4 h-auto text-lg border-border/50 bg-secondary/30 hover:bg-secondary/50",
                                                        !targetDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {targetDate ? formatDate(new Date(targetDate), "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={targetDate ? new Date(targetDate) : undefined}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            // Adjust for timezone offset to avoid previous day issue
                                                            const offset = date.getTimezoneOffset()
                                                            const adjustedDate = new Date(date.getTime() - (offset*60*1000))
                                                            handleDateChange(adjustedDate.toISOString().split('T')[0])
                                                        }
                                                    }}
                                                    initialFocus
                                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Select a date to reverse-calculate your daily goal.
                                    </p>
                                </div>

                                {/* Playback Speed */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-base font-semibold flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-yellow-500" />
                                            Playback Speed
                                        </label>
                                        <Badge variant="outline" className="text-sm font-mono">
                                            {speed}x
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['1', '1.25', '1.5', '1.75', '2'].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => handleSpeedChange(s as videoSpeed)}
                                                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                                                    speed === s 
                                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                                                    : 'bg-secondary/50 hover:bg-secondary text-muted-foreground'
                                                }`}
                                            >
                                                {s}x
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Results & Insights */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 rounded-3xl -z-10" />
                                <div className="h-full flex flex-col justify-center space-y-6 p-6 border border-border/50 rounded-3xl bg-background/40 backdrop-blur-sm">
                                    
                                    {/* Insight 1: Completion */}
                                    <div className="text-center space-y-2">
                                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">You will finish by</p>
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 py-1 break-words leading-tight">
                                            {new Date(targetDate).toLocaleDateString('en-US', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </div>
                                    </div>

                                    <Separator className="bg-border/50" />

                                    {/* Insight 2: Time Saved */}
                                    {parseFloat(speed) > 1 && (
                                        <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="p-3 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20">
                                                <Zap className="h-6 w-6 fill-current" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-green-700 dark:text-green-400 text-lg">
                                                    {savedHours} Hours Saved!
                                                </p>
                                                <p className="text-xs text-green-600/80 dark:text-green-400/80">
                                                    By watching at {speed}x speed
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Insight 3: Daily Commitment */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-secondary/30 rounded-2xl text-center">
                                            <p className="text-xs text-muted-foreground mb-1">Daily Goal</p>
                                            <p className="text-xl font-bold">{dailyInvestment}h</p>
                                        </div>
                                        <div className="p-4 bg-secondary/30 rounded-2xl text-center">
                                            <p className="text-xs text-muted-foreground mb-1">Remaining Hours</p>
                                            <p className="text-xl font-bold">{(playlistStats.remainingSeconds / 3600 / parseFloat(speed)).toFixed(1)}h</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Videos Grid */}
            <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <PlayCircle className="h-6 w-6 text-purple-600" />
                    Videos ({playlist.items.length})
                    {playlistStats.isPartialPlaylist && (
                        <Badge variant="outline" className="text-sm">
                            Showing {playlist.items.length} of {playlistStats.totalPlaylistSize}
                        </Badge>
                    )}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlist.items.map((item, index) => (
                        <VideoCard 
                            key={item.etag} 
                            item={{...item, index: index + 1}} 
                            format={format} 
                            speed={speed} 
                            isCompleted={completedVideoIds.has(item.contentDetails.videoId)}
                            onToggleCompleted={() => toggleCompleted(item.contentDetails.videoId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}