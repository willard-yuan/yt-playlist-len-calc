"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { 
  Crop, 
  Type, 
  FileCode, 
  Film, 
  Smile, 
  Image as ImageIcon, 
  Youtube, 
  ExternalLink 
} from "lucide-react"
import Link from "next/link"
import { Star } from "lucide-react"

interface Tool {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

const tools: Tool[] = [
  {
    title: "Avatar Cropper - Quickly Crop Avatar for Discord, X, etc.",
    description: "Quick and accurate avatar cropper tool. Crop perfect avatar for Discord, X (Twitter), etc. No signup required.",
    icon: <Crop className="h-8 w-8 text-white" />,
    href: "https://avatarcropper.app",
    color: "bg-blue-500"
  },
  {
    title: "Discord Fonts Generator",
    description: "Generate stylish Discord fonts and text",
    icon: <Type className="h-8 w-8 text-white" />,
    href: "https://discord-decoration.art/discord_front",
    color: "bg-slate-600"
  },
  {
    title: "Discord Markdown Live Previewer",
    description: "Discord markdown editor with live preview",
    icon: <FileCode className="h-8 w-8 text-white" />,
    href: "https://discord-markdown-previewer.pro",
    color: "bg-gray-700"
  },
  {
    title: "GIF Frame Extractor",
    description: "Extract frames from animated GIFs",
    icon: <Film className="h-8 w-8 text-white" />,
    href: "https://discord-decoration.art/gif-extractor",
    color: "bg-yellow-600"
  },
  {
    title: "EmojiFace - Hide your Face with One Click",
    description: "Best Free Tool to Hide Your Face with Emoji, Blur or Pixelation for Privacy, and All You Need is One Click",
    icon: <Smile className="h-8 w-8 text-white" />,
    href: "https://emojiface.us",
    color: "bg-pink-600"
  },
  {
    title: "Emoji to Image Converter",
    description: "Convert an emoji to an image with the click of a button",
    icon: <ImageIcon className="h-8 w-8 text-white" />,
    href: "https://emojitoimage.com",
    color: "bg-green-600"
  }
  // {
  //   title: "Youtube Playlist Length Calculator",
  //   description: "Easily Calculate The Total Length of Any Playlist",
  //   icon: <Youtube className="h-8 w-8 text-white" />,
  //   href: "/",
  //   color: "bg-red-600"
  // }
]

export default function ToolsYouMayAlsoLike() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
        <div className="absolute top-20 left-10 text-purple-500 dark:text-purple-400 animate-pulse delay-0">
          <Star className="h-6 w-6 fill-current" />
        </div>
        <div className="absolute top-40 right-20 text-purple-500 dark:text-purple-400 animate-pulse delay-700">
          <Star className="h-8 w-8 fill-current" />
        </div>
        <div className="absolute bottom-20 left-1/3 text-purple-500 dark:text-purple-400 animate-pulse delay-1000">
          <Star className="h-5 w-5 fill-current" />
        </div>
      </div>

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 pb-2">
              Tools You May Also Like
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover other useful tools for developers, content creators, and social media users.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full overflow-hidden group">
                <CardContent className="p-6 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${tool.color} shadow-lg shrink-0`}>
                      {tool.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-purple-500 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-900/20 border-0">
                    <Link href={tool.href} target={tool.href.startsWith('http') ? "_blank" : undefined}>
                      View Tool
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
