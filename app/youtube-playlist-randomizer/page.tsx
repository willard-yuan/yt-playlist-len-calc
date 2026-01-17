"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle, Volume2, Trash2, Repeat, ArrowRight, Music2, ListMusic, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbnailImage } from "@/components/thumbnail-image"

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Video {
  id: string
  title: string
  channelName: string
  thumbnail: string
  durationInSeconds: number
  resourceId: string
}

interface PlaylistData {
  title: string
  videos: Video[]
}

function RandomizerContent() {
  const searchParams = useSearchParams()
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [player, setPlayer] = useState<any>(null)
  const [isShuffled, setIsShuffled] = useState(false)
  const [originalVideos, setOriginalVideos] = useState<Video[]>([])

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const validatePlaylistUrl = (url: string): boolean => {
    const playlistRegex = /[?&]list=([a-zA-Z0-9_-]+)/
    return playlistRegex.test(url)
  }

  const fetchPlaylistData = async (urlOverride?: string) => {
    const urlToFetch = urlOverride || playlistUrl
    if (!urlToFetch.trim()) {
      setError("Please enter a YouTube playlist URL")
      return
    }

    if (!validatePlaylistUrl(urlToFetch)) {
      setError("Please enter a valid YouTube playlist URL")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const { getPlaylist } = await import("@/lib/action")
      const { parseDuration } = await import("@/lib/utils")
      
      const apiResponse = await getPlaylist(urlToFetch)
      
      const fetchedVideos: Video[] = apiResponse.items.map((item: any) => ({
        id: item.id,
        title: item.videoTitle || item.snippet.title,
        channelName: item.videoChannelTitle || item.snippet.channelTitle || "",
        thumbnail: item.videoThumbnail || 
                  item.snippet.thumbnails?.maxres?.url || 
                  item.snippet.thumbnails?.high?.url || 
                  item.snippet.thumbnails?.medium?.url || 
                  item.snippet.thumbnails?.default?.url || 
                  `https://i.ytimg.com/vi/${item.contentDetails.videoId}/hqdefault.jpg`,
        durationInSeconds: parseDuration(item.videoDuration),
        resourceId: item.contentDetails.videoId
      }))
      
      const playlistTitle = apiResponse.playlistInfo?.snippet?.title || "YouTube Playlist"
      
      const data = {
        title: playlistTitle,
        videos: fetchedVideos
      }

      setPlaylistData(data)
      setVideos(fetchedVideos)
      setOriginalVideos(fetchedVideos)
      
      // Auto shuffle on load
      const shuffled = [...fetchedVideos].sort(() => Math.random() - 0.5)
      setVideos(shuffled)
      setIsShuffled(true)
      
    } catch (err: any) {
      console.error("Error fetching playlist:", err)
      setError(err.message || "Failed to fetch playlist data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize from query param
  useEffect(() => {
    const listId = searchParams.get('list')
    if (listId) {
      const url = `https://www.youtube.com/playlist?list=${listId}`
      setPlaylistUrl(url)
      fetchPlaylistData(url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Initialize Player when videos are loaded
  useEffect(() => {
    if (videos.length > 0 && !player) {
      setTimeout(() => {
        if (window.YT && window.YT.Player) {
          new window.YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: videos[currentVideoIndex].resourceId,
            playerVars: {
              'playsinline': 1,
              'autoplay': 1,
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }
      }, 500);
    } else if (player && videos.length > 0) {
      player.loadVideoById(videos[currentVideoIndex].resourceId);
    }
  }, [videos, currentVideoIndex]);

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
    setIsPlaying(true);
  }

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      playNext();
    }
  }

  const playNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  }

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  }

  const seek = (seconds: number) => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + seconds, true);
    }
  }

  const restartVideo = () => {
    if (player) {
      player.seekTo(0, true);
      player.playVideo();
    }
  }

  const endVideo = () => {
    if (player) {
      const duration = player.getDuration();
      player.seekTo(duration - 1, true);
    }
  }

  const shuffleVideos = () => {
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    setVideos(shuffled);
    setCurrentVideoIndex(0);
    setIsShuffled(true);
  }

  const resetToOriginal = () => {
    setVideos([...originalVideos]);
    setCurrentVideoIndex(0);
    setIsShuffled(false);
  }

  const removeVideo = (id: string) => {
    const newVideos = videos.filter(v => v.id !== id);
    setVideos(newVideos);
    if (currentVideoIndex >= newVideos.length) {
      setCurrentVideoIndex(Math.max(0, newVideos.length - 1));
    }
  }

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    video.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 text-sm text-muted-foreground mb-4">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>AI-Powered Shuffle & Playlist Management</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 animate-gradient-x">
              Youtube Playlist Randomizer
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Experience your playlists in a whole new way. True random shuffling, 
            smart filtering, and a distraction-free playback interface.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-16 relative group"
        >
          <div className="relative flex items-center p-2 bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl transition-all duration-300 group-hover:border-purple-500/30 group-hover:shadow-purple-500/10">
            <div className="pl-4 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Paste YouTube Playlist URL here..."
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              className="border-none bg-transparent h-12 text-lg focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
            <Button 
              onClick={() => fetchPlaylistData()} 
              disabled={isLoading}
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <span className="flex items-center gap-2">
                  Load <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-0 right-0 text-center"
            >
              <span className="inline-block px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-sm border border-red-500/20 backdrop-blur-sm">
                {error}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Player & Playlist Interface */}
        <AnimatePresence>
          {videos.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {/* Left: Cinema Player */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative group rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 aspect-video">
                  <div id="player" className="h-full w-full"></div>
                </div>

                {/* Pro Controls Deck */}
                <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-lg">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-lg line-clamp-1">{videos[currentVideoIndex].title}</h3>
                        <p className="text-sm text-muted-foreground">{videos[currentVideoIndex].channelName}</p>
                      </div>
                      <Badge variant="outline" className="h-6 gap-1 bg-secondary/50">
                        <ListMusic className="h-3 w-3" />
                        {currentVideoIndex + 1} / {videos.length}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 sm:gap-6">
                      <Button variant="ghost" size="icon" onClick={restartVideo} className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full h-10 w-10" title="Restart">
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => seek(-10)} className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full h-10 w-10" title="-10s">
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button 
                        size="icon" 
                        onClick={togglePlay}
                        className="h-16 w-16 rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-xl scale-100 hover:scale-105 transition-all"
                      >
                        {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => seek(10)} className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full h-10 w-10" title="+10s">
                        <SkipForward className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={playNext} className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full h-10 w-10" title="Next">
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Smart Playlist */}
              <div className="lg:col-span-1 flex flex-col h-[calc(100vh-200px)] lg:h-[600px] bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
                {/* Playlist Header */}
                <div className="p-4 border-b border-border/50 bg-card/50 backdrop-blur-md z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <ListMusic className="h-4 w-4 text-purple-500" />
                      Up Next
                    </h3>
                    <div className="flex items-center gap-1">
                       <Button 
                        variant={isShuffled ? "secondary" : "ghost"} 
                        size="sm" 
                        onClick={shuffleVideos}
                        className={cn("h-8 px-2 text-xs gap-1.5", isShuffled && "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20")}
                      >
                        <Shuffle className="h-3.5 w-3.5" />
                        Shuffle
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Filter videos..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 pl-9 bg-background/50 border-border/50 focus-visible:ring-purple-500/50"
                    />
                  </div>
                </div>

                {/* Playlist Items */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {filteredVideos.map((video, index) => {
                    const isCurrent = videos.indexOf(video) === currentVideoIndex;
                    return (
                      <motion.div 
                        key={`${video.id}-${index}`}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "group flex gap-3 p-2 rounded-xl transition-all duration-200 cursor-pointer border border-transparent",
                          isCurrent 
                            ? "bg-purple-500/10 border-purple-500/20 shadow-sm" 
                            : "hover:bg-accent/50 hover:border-border/50"
                        )}
                        onClick={() => {
                          setCurrentVideoIndex(videos.indexOf(video));
                          if (player) {
                             player.loadVideoById(video.resourceId);
                          }
                        }}
                      >
                        <div className="relative w-28 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted shadow-sm group-hover:shadow-md transition-shadow">
                          <ThumbnailImage 
                            src={video.thumbnail} 
                            alt={video.title} 
                            videoId={video.resourceId}
                            className="absolute inset-0"
                            imgClassName={cn("transition-transform duration-500", isCurrent ? "scale-105" : "group-hover:scale-105")}
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                              <div className="flex gap-1">
                                <span className="w-1 h-3 bg-white rounded-full animate-[bounce_1s_infinite_0ms]" />
                                <span className="w-1 h-3 bg-white rounded-full animate-[bounce_1s_infinite_200ms]" />
                                <span className="w-1 h-3 bg-white rounded-full animate-[bounce_1s_infinite_400ms]" />
                              </div>
                            </div>
                          )}
                          <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[10px] text-white font-medium backdrop-blur-sm">
                            {formatDuration(video.durationInSeconds)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                          <h4 className={cn("text-sm font-medium line-clamp-2 leading-tight", isCurrent ? "text-purple-600 dark:text-purple-400" : "text-foreground group-hover:text-foreground/90")}>
                            {video.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1 flex items-center gap-1">
                            {video.channelName}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all self-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVideo(video.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
                
                {/* Playlist Footer Stats */}
                <div className="p-3 bg-muted/30 border-t border-border/50 text-xs text-center text-muted-foreground backdrop-blur-sm">
                  {filteredVideos.length} videos • Total duration: {formatDuration(filteredVideos.reduce((acc, v) => acc + v.durationInSeconds, 0))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Empty State / Initial Instructions */}
        {!videos.length && !isLoading && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24"
          >
            {[
              { icon: Shuffle, title: "True Random", desc: "Break out of the algorithm bubbles. Shuffle your playlists with a true randomizer." },
              { icon: ListMusic, title: "Smart Queue", desc: "Easily manage your queue. Remove videos you don't want to see without affecting your actual playlist." },
              { icon: Music2, title: "Focus Mode", desc: "Distraction-free listening experience designed for music lovers and learners." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 text-purple-500">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export default function YoutubePlaylistRandomizer() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    }>
      <RandomizerContent />
    </Suspense>
  )
}
