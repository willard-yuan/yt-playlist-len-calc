"use client"

import Link from "next/link";
import { Download, Shuffle, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function OtherToolsSection() {
  const { t } = useI18n()

  return (
    <section className="mb-40">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          {t("otherTools.title")}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("otherTools.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Playlist Exporter Card */}
        <Link 
          href="/youtube-playlist-exporter"
          className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            
            <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {t("otherTools.exporter.title")}
            </h3>
            
            <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
              {t("otherTools.exporter.desc")}
            </p>
            
            <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
              {t("otherTools.tryNow")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Playlist Randomizer Card */}
        <Link 
          href="/youtube-playlist-randomizer"
          className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shuffle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            
            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t("otherTools.randomizer.title")}
            </h3>
            
            <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
              {t("otherTools.randomizer.desc")}
            </p>
            
            <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
              {t("otherTools.tryNow")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
