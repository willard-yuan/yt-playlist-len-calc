"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Shuffle, Filter, MonitorOff, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-purple-500 w-full text-left"
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

export function RandomizerSeoContent() {
  return (
    <div className="mt-24 space-y-24 max-w-4xl mx-auto text-muted-foreground">
      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Why Use Our YouTube Playlist Randomizer?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            YouTube&apos;s native shuffle often repeats the same songs. We fixed that.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Shuffle className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">True Random Shuffle</h3>
            <p>
              We use a mathematically correct Fisher-Yates shuffle algorithm to ensure every video has an equal chance of being played. No more hearing the same 10 songs on repeat.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
            <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Filter className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Smart Filtering</h3>
            <p>
              Want to skip the skits or intros? Use our real-time search to filter your playlist by title or channel name instantly without modifying the original playlist.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-green-500/30 transition-colors">
            <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <MonitorOff className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Distraction-Free</h3>
            <p>
              Our cinema mode interface removes sidebar recommendations, comments, and ads, letting you focus entirely on your content.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-orange-500/30 transition-colors">
            <div className="h-10 w-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p>
              Load playlists with hundreds of videos in seconds. No login required, no data collection. Just paste your link and play.
            </p>
          </div>
        </div>
      </section>

      {/* How to Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Shuffle a YouTube Playlist Properly</h2>
        <div className="relative border-l-2 border-border/50 ml-4 md:ml-0 md:pl-0 space-y-8">
          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">01</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-purple-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Copy Playlist URL</h3>
              <p>Go to YouTube and copy the URL of the playlist you want to shuffle. It usually contains `list=ID`.</p>
            </div>
          </div>
          
          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">02</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Paste & Load</h3>
              <p>Paste the link into the box above and hit &quot;Load&quot;. We&apos;ll fetch all video details instantly.</p>
            </div>
          </div>

          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">03</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-green-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Shuffle & Enjoy</h3>
              <p>The playlist is automatically shuffled. Use the player controls to skip, or the sidebar to filter specific tracks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Frequently Asked Questions</h2>
        <div className="w-full bg-card/30 rounded-2xl border border-border/50 backdrop-blur-sm p-6">
          <FAQItem 
            question="Is this YouTube Playlist Randomizer free?" 
            answer="Yes, this tool is 100% free to use. You don't need to create an account or sign in with your YouTube account."
          />
          <FAQItem 
            question="Does it work with private playlists?" 
            answer="No, due to YouTube's privacy settings, we can only access public or unlisted playlists. If your playlist is private, please change it to unlisted to use this tool."
          />
          <FAQItem 
            question="Why is this better than YouTube's shuffle?" 
            answer="YouTube's native shuffle algorithm is known to be repetitive and often favors popular videos or recently added ones. Our randomizer uses a pure mathematical algorithm to ensure a truly random order every time."
          />
          <FAQItem 
            question="Is there a limit to the playlist size?" 
            answer="We can handle playlists with hundreds of videos. However, extremely large playlists (thousands of videos) might take a few extra seconds to load initially."
          />
        </div>
      </section>
    </div>
  )
}
