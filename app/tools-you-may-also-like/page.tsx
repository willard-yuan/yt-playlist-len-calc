"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  Crop, 
  Type, 
  FileCode, 
  Film, 
  Smile, 
  Image as ImageIcon, 
  ExternalLink
} from "lucide-react"
import Link from "next/link"

interface Tool {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
  gradient: string
}

const tools: Tool[] = [
  {
    title: "Avatar Cropper",
    description: "Quick and accurate avatar cropper tool. Crop perfect avatar for Discord, X (Twitter), etc. No signup required.",
    icon: <Crop className="h-6 w-6 text-white" />,
    href: "https://avatarcropper.app",
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Discord Fonts Generator",
    description: "Generate stylish Discord fonts and text with various styles and effects for your profile and messages.",
    icon: <Type className="h-6 w-6 text-white" />,
    href: "https://discord-decoration.art/discord_front",
    color: "bg-slate-600",
    gradient: "from-slate-500/20 to-gray-500/20"
  },
  {
    title: "Discord Markdown Previewer",
    description: "Real-time Discord markdown editor with live preview. Test your formatting before posting.",
    icon: <FileCode className="h-6 w-6 text-white" />,
    href: "https://discord-markdown-previewer.pro",
    color: "bg-indigo-600",
    gradient: "from-indigo-500/20 to-purple-500/20"
  },
  {
    title: "GIF Frame Extractor",
    description: "Extract individual frames from animated GIFs easily. View and save specific moments from any animation.",
    icon: <Film className="h-6 w-6 text-white" />,
    href: "https://discord-decoration.art/gif-extractor",
    color: "bg-yellow-600",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    title: "EmojiFace Privacy Tool",
    description: "Best Free Tool to Hide Your Face with Emoji, Blur or Pixelation for Privacy with just one click.",
    icon: <Smile className="h-6 w-6 text-white" />,
    href: "https://emojiface.us",
    color: "bg-pink-600",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    title: "Emoji to Image Converter",
    description: "Convert an emoji to a high-quality image with the click of a button. Great for thumbnails and designs.",
    icon: <ImageIcon className="h-6 w-6 text-white" />,
    href: "https://emojitoimage.com",
    color: "bg-green-600",
    gradient: "from-green-500/20 to-emerald-500/20"
  }
]

export default function ToolsYouMayAlsoLike() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] pb-4">
              Tools You May
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Also Like
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mt-6">
              Discover other useful tools for developers, content creators, and social media users.
            </p>
          </div>
        </div>
      </div>

      <main className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col h-full bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative z-10 flex-grow">
                  <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    {tool.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-auto">
                  <Button 
                    asChild 
                    className="w-full h-12 rounded-xl bg-background hover:bg-background/80 text-foreground border border-border/50 hover:border-purple-500/50 shadow-sm hover:shadow-md transition-all group/btn"
                    variant="outline"
                  >
                    <Link href={tool.href} target={tool.href.startsWith('http') ? "_blank" : undefined} className="flex items-center justify-between px-4">
                      <span>View Tool</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/btn:text-purple-500 transition-colors" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
