"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Youtube, Download, FileText, FileSpreadsheet, Bookmark, Star, Loader2, Clock, X } from "lucide-react"
import Image from "next/image"
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

export default function YouTubePlaylistExporter() {
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [error, setError] = useState("")
  const [urlHistory, setUrlHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)

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

  const validatePlaylistUrl = (url: string): boolean => {
    const playlistRegex = /[?&]list=([a-zA-Z0-9_-]+)/
    return playlistRegex.test(url)
  }

  const extractPlaylistId = (url: string): string | null => {
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  const fetchPlaylistData = async () => {
    if (!playlistUrl.trim()) {
      setError("Please enter a YouTube playlist URL")
      return
    }

    if (!validatePlaylistUrl(playlistUrl)) {
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
      const apiResponse = await getPlaylist(playlistUrl)
      
      // Transform API response to our Video interface
      const videos: Video[] = apiResponse.items.map((item: any) => {
        const durationInSeconds = parseDuration(item.videoDuration)
        const durationInTimestamp = calculateTotalDuration(durationInSeconds, 'hrs')
        
        return {
          title: item.videoTitle || item.snippet.title,
          description: item.videoDescription || item.snippet.description || "",
          thumbnail: item.videoThumbnail || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || "",
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
      // Save successful URL to history
      saveToHistory(playlistUrl)
      setShowHistory(false)
    } catch (err: any) {
      console.error("Error fetching playlist:", err)
      setError(err.message || "Failed to fetch playlist data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground">
      <Navbar />
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/20 dark:from-purple-500/20 dark:to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-purple-500/30 dark:from-blue-500/10 dark:to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-t from-purple-500/15 to-indigo-500/20 dark:from-purple-500/10 dark:to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Star Decorations */}
        <div className="absolute top-32 left-20 text-purple-500 dark:text-purple-400 animate-pulse">
          <Star className="h-6 w-6 fill-current" />
        </div>
        <div className="absolute top-48 right-32 text-purple-500 dark:text-purple-400 animate-pulse delay-500">
          <Star className="h-4 w-4 fill-current" />
        </div>
        <div className="absolute top-64 left-1/4 text-purple-500 dark:text-purple-400 animate-pulse delay-1000">
          <Star className="h-5 w-5 fill-current" />
        </div>
        <div className="absolute top-80 right-1/4 text-purple-500 dark:text-purple-400 animate-pulse delay-1500">
          <Star className="h-4 w-4 fill-current" />
        </div>
      </div>

      <main className="relative pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 pb-2">
              YouTube Playlist Exporter
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Export your YouTube playlist data in multiple formats: Excel, CSV, Text, or Bookmark HTML
            </p>
          </div>

          {/* Input Section */}
          <Card className="mb-8 border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Youtube className="h-5 w-5 text-red-600" />
                <span>Enter Playlist URL</span>
              </CardTitle>
              <CardDescription>
                Paste your YouTube playlist URL to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                 <div className="flex-1 relative">
                   <Input
                     placeholder="https://www.youtube.com/playlist?list=..."
                     value={playlistUrl}
                     onChange={(e) => setPlaylistUrl(e.target.value)}
                     onFocus={() => urlHistory.length > 0 && setShowHistory(true)}
                     className="flex-1 history-trigger"
                   />
                   {urlHistory.length > 0 && (
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => setShowHistory(!showHistory)}
                       className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 history-trigger"
                     >
                       <Clock className="h-3 w-3" />
                     </Button>
                   )}
                 </div>
                <Button 
                  onClick={fetchPlaylistData}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
                     <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-2xl max-h-60 overflow-y-auto backdrop-blur-sm">
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Recent URLs
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="h-6 w-6 p-0 text-gray-500 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="py-1">
                      {urlHistory.map((url, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                        >
                          <div
                            className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate pr-2"
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
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
            </CardContent>
          </Card>

          {/* Playlist Data */}
          {playlistData && (
            <Card className="mb-8 border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{playlistData.title}</CardTitle>
                <CardDescription>{playlistData.description}</CardDescription>
                <div className="flex space-x-4 mt-4">
                  <Badge variant="secondary">
                    {playlistData.videoCount} videos
                  </Badge>
                  <Badge variant="secondary">
                    {playlistData.totalDuration} total
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Export Options</h3>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger className="w-48">
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
                  
                  <Button 
                    onClick={exportData}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Playlist
                  </Button>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Video Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {playlistData.videos.slice(0, 6).map((video, index) => (
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
                  {playlistData.videos.length > 6 && (
                    <p className="text-center text-muted-foreground text-sm mt-4">
                      ... and {playlistData.videos.length - 6} more videos
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileSpreadsheet className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-2">Excel Export</h3>
                <p className="text-sm text-muted-foreground">
                  Export as Excel spreadsheet for data analysis
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileSpreadsheet className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">CSV Export</h3>
                <p className="text-sm text-muted-foreground">
                  Export as CSV for universal compatibility
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-2">Text Export</h3>
                <p className="text-sm text-muted-foreground">
                  Export as plain text for easy reading
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Bookmark className="h-8 w-8 mx-auto mb-3 text-orange-600" />
                <h3 className="font-semibold mb-2">Bookmark HTML</h3>
                <p className="text-sm text-muted-foreground">
                  Export as HTML bookmarks for browsers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}