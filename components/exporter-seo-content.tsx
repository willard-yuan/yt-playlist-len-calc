"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileSpreadsheet, Shield, Zap, Lock, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-green-500 w-full text-left"
      >
        {question}
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="pb-4 pt-0 text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ExporterSeoContent() {
  return (
    <div className="mt-24 space-y-24 max-w-4xl mx-auto text-muted-foreground">
      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Why Use Our YouTube Playlist Exporter?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Securely backup your playlists and analyze video data with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-green-500/30 transition-colors">
            <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <FileSpreadsheet className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Multiple Formats</h3>
            <p>
              Export your playlist data to Excel (.xlsx), CSV, plain text, or even HTML bookmarks. Perfect for spreadsheets or migrating to other platforms.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
            <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure Backup</h3>
            <p>
              Don&apos;t lose your curated collections. Create a local backup of your playlists in case videos get deleted, made private, or your account is suspended.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Privacy First</h3>
            <p>
              No login required. We don&apos;t track your watch history or ask for channel permissions. Your data export happens directly in your browser.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-orange-500/30 transition-colors">
            <div className="h-10 w-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Detailed Analytics</h3>
            <p>
              Get more than just links. Our export includes video titles, channel names, duration, and view counts, allowing for detailed data analysis.
            </p>
          </div>
        </div>
      </section>

      {/* How to Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Export YouTube Playlists to Excel/CSV</h2>
        <div className="relative border-l-2 border-border/50 ml-4 md:ml-0 md:pl-0 space-y-8">
          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">01</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-green-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Get Playlist Link</h3>
              <p>Navigate to the YouTube playlist you want to export and copy the URL from your browser&apos;s address bar.</p>
            </div>
          </div>
          
          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">02</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Load Data</h3>
              <p>Paste the URL into our tool and click &quot;Analyze&quot;. We&apos;ll fetch all the video metadata for you instantly.</p>
            </div>
          </div>

          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">03</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-purple-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Download File</h3>
              <p>Choose your preferred format (Excel, CSV, Text) and click the download button to save the file to your device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Frequently Asked Questions</h2>
        <div className="w-full bg-card/30 rounded-2xl border border-border/50 backdrop-blur-sm p-6">
          <FAQItem 
            question="Is this YouTube Playlist Exporter free?" 
            answer="Yes, it's completely free. You can export as many playlists as you want without any hidden costs or subscriptions."
          />
          <FAQItem 
            question="Can I export private playlists?" 
            answer="We can only access public or unlisted playlists. If you want to export a private playlist, you'll need to temporarily change its visibility to 'Unlisted'."
          />
          <FAQItem 
            question="What information is included in the export?" 
            answer="The export file typically includes the video title, video URL, channel name, video duration, and view count (if available)."
          />
          <FAQItem 
            question="Does it work with YouTube Music playlists?" 
            answer="Yes! As long as the playlist is public or unlisted, our tool can fetch and export data from YouTube Music playlists as well."
          />
        </div>
      </section>
    </div>
  )
}
