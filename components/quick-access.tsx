"use client"

import { ExternalLink, ThumbsUp, Clock, Youtube, ListVideo, Music, Disc, History, Library, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"

export default function QuickAccess() {
  const { t } = useI18n()

  const playlists = [
    {
      title: t("quickAccess.liked.title"),
      description: t("quickAccess.liked.desc"),
      icon: <ThumbsUp className="h-6 w-6" />,
      url: "https://www.youtube.com/playlist?list=LL",
      linkText: t("quickAccess.liked.link"),
      color: "text-blue-500"
    },
    {
      title: t("quickAccess.watchLater.title"),
      description: t("quickAccess.watchLater.desc"),
      icon: <Clock className="h-6 w-6" />,
      url: "https://www.youtube.com/playlist?list=WL",
      linkText: t("quickAccess.watchLater.link"),
      color: "text-orange-500"
    },
    {
      title: t("quickAccess.subscriptions.title"),
      description: t("quickAccess.subscriptions.desc"),
      icon: <Users className="h-6 w-6" />,
      url: "https://www.youtube.com/feed/subscriptions",
      linkText: t("quickAccess.subscriptions.link"),
      color: "text-red-500"
    },
    {
      title: t("quickAccess.history.title"),
      description: t("quickAccess.history.desc"),
      icon: <History className="h-6 w-6" />,
      url: "https://www.youtube.com/feed/history",
      linkText: t("quickAccess.history.link"),
      color: "text-purple-500"
    },
    {
      title: t("quickAccess.music.title"),
      description: t("quickAccess.music.desc"),
      icon: <Music className="h-6 w-6" />,
      url: "https://music.youtube.com/library",
      linkText: t("quickAccess.music.link"),
      color: "text-pink-500"
    },
    {
      title: t("quickAccess.mix.title"),
      description: t("quickAccess.mix.desc"),
      icon: <Sparkles className="h-6 w-6" />,
      url: "https://music.youtube.com/playlist?list=RDTMAK5uy_kset8DisdE7LSD4TNjEVvrKRTmG7a56sY",
      linkText: t("quickAccess.mix.link"),
      color: "text-yellow-500"
    },
    {
      title: t("quickAccess.all.title"),
      description: t("quickAccess.all.desc"),
      icon: <ListVideo className="h-6 w-6" />,
      url: "https://www.youtube.com/feed/library",
      linkText: t("quickAccess.all.link"),
      color: "text-green-500"
    }
  ]

  return (
    <div className="mb-32 scroll-mt-24" id="quick-access">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">
          {t("quickAccess.title")}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("quickAccess.subtitle")}
        </p>
      </div>

      <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-lg">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-border/50 bg-secondary/20 font-medium text-muted-foreground text-sm uppercase tracking-wider">
            <div className="col-span-4 lg:col-span-3">{t("quickAccess.table.name")}</div>
            <div className="col-span-5 lg:col-span-6">{t("quickAccess.table.description")}</div>
            <div className="col-span-3 lg:col-span-3 text-right">{t("quickAccess.table.link")}</div>
          </div>
          
          <div className="divide-y divide-border/50">
            {playlists.map((playlist, index) => (
              <div 
                key={index} 
                className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-secondary/10 transition-colors duration-200 group"
              >
                <div className="col-span-4 lg:col-span-3 flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-secondary/30 group-hover:bg-secondary/50 transition-colors ${playlist.color}`}>
                    {playlist.icon}
                  </div>
                  <span className="font-semibold text-base lg:text-lg leading-tight">{playlist.title}</span>
                </div>
                <div className="col-span-5 lg:col-span-6 text-muted-foreground group-hover:text-foreground transition-colors text-sm lg:text-base leading-relaxed">
                  {playlist.description}
                </div>
                <div className="col-span-3 lg:col-span-3 text-right">
                  <a 
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors hover:underline whitespace-nowrap"
                  >
                    {playlist.linkText}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-border/50">
          {playlists.map((playlist, index) => (
            <div key={index} className="p-6 hover:bg-secondary/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-secondary/30 ${playlist.color}`}>
                    {playlist.icon}
                  </div>
                  <h3 className="font-bold text-lg">{playlist.title}</h3>
                </div>
                <a 
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {playlist.description}
              </p>
              <a 
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-secondary/30 text-sm font-medium hover:bg-secondary/50 transition-colors text-purple-600 dark:text-purple-400"
              >
                {playlist.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
