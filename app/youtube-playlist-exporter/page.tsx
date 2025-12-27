"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Youtube, Download, FileText, FileSpreadsheet, Bookmark, Loader2, Clock, X, Search, Video as VideoIcon, ChevronDown } from "lucide-react"
import VideoCard from "@/components/video-card"

interface Video {
  title: string
  description: string
  thumbnail: string
  channelName: string
  views: number
  likes: number
  comments: number
  durationInSeconds: number
  durationInTimestamp: string
  duration: string
  uploadedTime: string
  url: string
}

interface PlaylistData {
  title: string
  description: string
  videoCount: number
  totalDuration: string
  videos: Video[]
}

function ExporterContent() {
  const searchParams = useSearchParams()
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [error, setError] = useState("")
  const [urlHistory, setUrlHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  const validatePlaylistUrl = (url: string): boolean => {
    const playlistRegex = /[?&]list=([a-zA-Z0-9_-]+)/
    return playlistRegex.test(url)
  }

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('youtube-playlist-history')
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory)
        setUrlHistory(history)
      } catch (error) {
        console.error('Failed to parse history from localStorage:', error)
      }
    }
  }, [])

  // Close history when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.history-container') && !target.closest('.history-trigger')) {
        setShowHistory(false)
      }
    }

    if (showHistory) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showHistory])

  // Save URL to history
  const saveToHistory = (url: string) => {
    if (!url.trim() || !validatePlaylistUrl(url)) return
    
    const newHistory = [url, ...urlHistory.filter(item => item !== url)].slice(0, 10) // Keep only last 10 items
    setUrlHistory(newHistory)
    localStorage.setItem('youtube-playlist-history', JSON.stringify(newHistory))
  }

  // Clear history
  const clearHistory = () => {
    setUrlHistory([])
    localStorage.removeItem('youtube-playlist-history')
    setShowHistory(false)
  }

  // Remove single item from history
  const removeFromHistory = (urlToRemove: string) => {
    const newHistory = urlHistory.filter(url => url !== urlToRemove)
    setUrlHistory(newHistory)
    localStorage.setItem('youtube-playlist-history', JSON.stringify(newHistory))
  }

  // Initialize from query param
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
      // Import the API function
      const { getPlaylist } = await import("@/lib/action")
      const { parseDuration, calculateTotalDuration } = await import("@/lib/utils")
      
      // Call the real YouTube API
      const apiResponse = await getPlaylist(urlToFetch)
      
      // Transform API response to our Video interface
      const videos: Video[] = apiResponse.items.map((item: any) => {
        const durationInSeconds = parseDuration(item.videoDuration)
        const durationInTimestamp = calculateTotalDuration(durationInSeconds, 'hrs')
        
        return {
          title: item.videoTitle || item.snippet.title,
          description: item.videoDescription || item.snippet.description || "",
          thumbnail: item.snippet.thumbnails?.default?.url || item.snippet.thumbnails?.medium?.url || item.videoThumbnail || item.snippet.thumbnails?.default?.url || "",
          channelName: item.videoChannelTitle || item.snippet.channelTitle || "",
          views: parseInt(item.videoViewCount) || 0,
          likes: parseInt(item.videoLikeCount) || 0,
          comments: parseInt(item.videoCommentCount) || 0,
          durationInSeconds: durationInSeconds,
          durationInTimestamp: durationInTimestamp || "0:00",
          duration: durationInTimestamp || "0:00",
          uploadedTime: item.videoPublishedAt ? new Date(item.videoPublishedAt).toLocaleDateString() : "",
          url: `https://youtube.com/watch?v=${item.contentDetails.videoId}`
        }
      })
      
      // Calculate total duration
      const totalSeconds = videos.reduce((acc, video) => acc + video.durationInSeconds, 0)
      const totalDuration = calculateTotalDuration(totalSeconds, 'hrs')
      
      // Get playlist info from API response
       const playlistTitle = apiResponse.playlistInfo?.snippet?.title || "YouTube Playlist"
       const playlistDescription = apiResponse.playlistInfo?.snippet?.description || `Exported playlist with ${videos.length} videos`
       
       const playlistData: PlaylistData = {
         title: playlistTitle,
         description: playlistDescription,
         videoCount: videos.length,
         totalDuration: totalDuration || "0:00:00",
         videos: videos
       }

      setPlaylistData(playlistData)
      setVisibleCount(6)
      // Save successful URL to history
      saveToHistory(urlToFetch)
      setShowHistory(false)
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
  }, [searchParams])

  const exportData = () => {
    if (!playlistData) return

    const { title, videos } = playlistData
    const timestamp = new Date().toISOString().split('T')[0]
    
    switch (exportFormat) {
      case "csv":
        exportAsCSV(title, videos, timestamp)
        break
      case "excel":
        exportAsExcel(title, videos, timestamp)
        break
      case "text":
        exportAsText(title, videos, timestamp)
        break
      case "bookmark":
        exportAsBookmarkHTML(title, videos, timestamp)
        break
    }
  }

  const exportAsCSV = (title: string, videos: Video[], timestamp: string) => {
    const headers = [
      "Title",
      "Description", 
      "Thumbnail url",
      "Channel name",
      "Views",
      "Likes",
      "Comments",
      "Duration in seconds",
      "Duration in timestamp",
      "Duration",
      "Uploaded Time",
      "Video url"
    ]
    const csvContent = [
      headers.join(","),
      ...videos.map(video => [
        `"${video.title.replace(/"/g, '""')}"`,
        `"${video.description.replace(/"/g, '""')}"`,
        video.thumbnail,
        `"${video.channelName.replace(/"/g, '""')}"`,
        video.views,
        video.likes,
        video.comments,
        video.durationInSeconds,
        video.durationInTimestamp,
        video.duration,
        video.uploadedTime,
        video.url
      ].join(","))
    ].join("\n")

    downloadFile(csvContent, `${title}_${timestamp}.csv`, "text/csv")
  }

  const exportAsExcel = (title: string, videos: Video[], timestamp: string) => {
    // For simplicity, we'll export as CSV with .xlsx extension
    // In a real implementation, you'd use a library like xlsx
    const headers = [
      "Title",
      "Description", 
      "Thumbnail url",
      "Channel name",
      "Views",
      "Likes",
      "Comments",
      "Duration in seconds",
      "Duration in timestamp",
      "Duration",
      "Uploaded Time",
      "Video url"
    ]
    const csvContent = [
      headers.join("\t"),
      ...videos.map(video => [
        video.title,
        video.description,
        video.thumbnail,
        video.channelName,
        video.views,
        video.likes,
        video.comments,
        video.durationInSeconds,
        video.durationInTimestamp,
        video.duration,
        video.uploadedTime,
        video.url
      ].join("\t"))
    ].join("\n")

    downloadFile(csvContent, `${title}_${timestamp}.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  }

  const exportAsText = (title: string, videos: Video[], timestamp: string) => {
    const textContent = [
      `Playlist: ${title}`,
      `Exported on: ${new Date().toLocaleDateString()}`,
      `Total videos: ${videos.length}`,
      "",
      "Videos:",
      ...videos.map((video, index) => 
        `${index + 1}. ${video.title}
   Description: ${video.description}
   Thumbnail url: ${video.thumbnail}
   Channel name: ${video.channelName}
   Views: ${video.views.toLocaleString()}
   Likes: ${video.likes.toLocaleString()}
   Comments: ${video.comments.toLocaleString()}
   Duration in seconds: ${video.durationInSeconds}
   Duration in timestamp: ${video.durationInTimestamp}
   Duration: ${video.duration}
   Uploaded Time: ${video.uploadedTime}
   Video url: ${video.url}
`
      )
    ].join("\n")

    downloadFile(textContent, `${title}_${timestamp}.txt`, "text/plain")
  }

  const exportAsBookmarkHTML = (title: string, videos: Video[], timestamp: string) => {
    const htmlContent = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3>${title}</H3>
    <DL><p>
${videos.map(video => 
  `        <DT><A HREF="${video.url}">${video.title}</A>`
).join("\n")}
    </DL><p>
</DL><p>`

    downloadFile(htmlContent, `${title}_bookmarks_${timestamp}.html`, "text/html")
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] animate-pulse delay-2000" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] pb-2">
              YouTube Playlist
              <br />
              <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Exporter
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mt-8">
              Export your YouTube playlist data in multiple formats: Excel, CSV, Text, or Bookmark HTML
            </p>
          </div>
        </div>
      </div>

      <main className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Input Section */}
          <div className="relative z-20 bg-background/50 backdrop-blur-2xl rounded-3xl p-8 md:p-12 mb-24 shadow-[0_0_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] ring-1 ring-border/50">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3">
                <Youtube className="h-8 w-8 text-red-600" />
                Enter Playlist URL
              </h2>
              <p className="text-muted-foreground text-lg">
                Paste your YouTube playlist URL to get started
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch">
                 <div className="w-full relative group">
                   <div className="relative flex items-center">
                     <Search className="absolute left-6 text-muted-foreground h-5 w-5 pointer-events-none group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      placeholder="https://www.youtube.com/playlist?list=..."
                      value={playlistUrl}
                      onChange={(e) => setPlaylistUrl(e.target.value)}
                      onFocus={() => urlHistory.length > 0 && setShowHistory(true)}
                      className="h-16 text-base sm:text-lg bg-background border-0 ring-1 ring-border/50 hover:ring-purple-500/30 focus:ring-2 focus:ring-purple-500 focus-visible:ring-purple-500 rounded-full pl-14 pr-12 transition-all duration-300 shadow-sm history-trigger"
                    />
                    {urlHistory.length > 0 && (
                       <Button
                         variant="ghost"
                         size="sm"
                         onClick={() => setShowHistory(!showHistory)}
                         className="absolute right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-secondary/50 rounded-full history-trigger"
                       >
                         <Clock className="h-4 w-4 text-muted-foreground" />
                       </Button>
                     )}
                   </div>
                 </div>
                <Button 
                  onClick={() => fetchPlaylistData()}
                  disabled={isLoading}
                  size="lg"
                  className="h-16 px-8 sm:px-10 rounded-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 min-w-[180px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Fetch Playlist"
                  )}
                </Button>
              </div>
              
              {/* History Dropdown */}
                 {showHistory && urlHistory.length > 0 && (
                   <div className="relative history-container">
                     <div className="absolute top-2 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-xl z-10">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        Recent URLs
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-2">
                      {urlHistory.map((url, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 rounded-xl cursor-pointer group transition-colors"
                        >
                          <div
                            className="flex-1 text-sm truncate pr-4"
                            onClick={() => {
                              setPlaylistUrl(url)
                              setShowHistory(false)
                            }}
                          >
                            {url}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromHistory(url)
                            }}
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl text-center font-medium">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Playlist Data */}
          {playlistData && (
            <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="bg-secondary/30 rounded-3xl p-8 md:p-12 border border-border/50 backdrop-blur-sm">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">{playlistData.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6 max-w-3xl mx-auto">{playlistData.description}</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Badge variant="secondary" className="px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0">
                      {playlistData.videoCount} videos
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                      {playlistData.totalDuration} total
                    </Badge>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="w-full sm:w-auto">
                        <h3 className="text-lg font-semibold mb-1">Export Options</h3>
                        <p className="text-sm text-muted-foreground">Choose your preferred format</p>
                      </div>
                      <Select value={exportFormat} onValueChange={setExportFormat}>
                        <SelectTrigger className="w-full sm:w-56 h-12 rounded-xl bg-secondary/50 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">
                            <div className="flex items-center space-x-2">
                              <FileSpreadsheet className="h-4 w-4" />
                              <span>CSV Format</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="excel">
                            <div className="flex items-center space-x-2">
                              <FileSpreadsheet className="h-4 w-4" />
                              <span>Excel Format</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="text">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4" />
                              <span>Text Format</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bookmark">
                            <div className="flex items-center space-x-2">
                              <Bookmark className="h-4 w-4" />
                              <span>Bookmark HTML</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        onClick={exportData}
                        size="lg"
                        className="w-full h-14 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Export Playlist
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-12 opacity-50" />

                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <VideoIcon className="h-6 w-6 text-purple-500" />
                    Video Preview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {playlistData.videos.slice(0, visibleCount).map((video, index) => (
                      <VideoCard
                        key={index}
                        item={{
                          kind: "youtube#playlistItem",
                          etag: `video-${index}`,
                          snippet: {
                            publishedAt: video.uploadedTime,
                            channelId: "",
                            title: video.title,
                            description: video.description,
                            thumbnails: {
                              default: { url: video.thumbnail, width: 120, height: 90 },
                              medium: { url: video.thumbnail, width: 320, height: 180 },
                              high: { url: video.thumbnail, width: 480, height: 360 },
                              standard: { url: video.thumbnail, width: 640, height: 480 },
                              maxres: { url: video.thumbnail, width: 1280, height: 720 }
                            },
                            channelTitle: video.channelName,
                            playlistId: "",
                            position: index,
                            resourceId: {
                              kind: "youtube#video",
                              videoId: `video-${index}`
                            },
                            videoOwnerChannelTitle: video.channelName,
                            videoOwnerChannelId: ""
                          },
                          contentDetails: {
                            videoId: `video-${index}`,
                            videoPublishedAt: video.uploadedTime
                          },
                          videoTitle: video.title,
                          videoThumbnail: video.thumbnail,
                          videoDuration: video.durationInTimestamp,
                          index: index + 1
                        }}
                        format="hrs"
                        speed="1"
                      />
                    ))}
                  </div>
                  {playlistData.videos.length > visibleCount && (
                    <div className="text-center mt-8">
                      <Button
                        variant="ghost"
                        onClick={() => setVisibleCount(prev => Math.min(prev + 12, playlistData.videos.length))}
                        className="text-muted-foreground text-sm bg-secondary/50 hover:bg-secondary/80 inline-flex items-center px-6 py-2 rounded-full h-auto transition-all hover:scale-105"
                      >
                        ... and {playlistData.videos.length - visibleCount} more videos
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 rounded-3xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileSpreadsheet className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excel Export</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Export as Excel spreadsheet for data analysis
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileSpreadsheet className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">CSV Export</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Export as CSV for universal compatibility
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Text Export</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Export as plain text for easy reading
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bookmark className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bookmark HTML</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Export as HTML bookmarks for browsers
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function YouTubePlaylistExporter() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-4 py-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div><Footer /></div>}>
      <ExporterContent />
    </Suspense>
  )
}
