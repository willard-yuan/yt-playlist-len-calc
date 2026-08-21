"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FileSpreadsheet, Shield, Zap, Lock, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLocaleFromPath } from "@/lib/i18n/dictionary"
import { getSubT } from "@/lib/i18n/subpages"

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
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const subT = getSubT(locale)

  return (
    <div className="mt-24 space-y-24 max-w-4xl mx-auto text-muted-foreground">
      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{subT("exporter.why.title")}</h2>
          <p className="text-lg max-w-2xl mx-auto">
            {subT("exporter.why.sub")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-green-500/30 transition-colors">
            <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <FileSpreadsheet className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{subT("exporter.whyfeat.formats.title")}</h3>
            <p>
              {subT("exporter.whyfeat.formats.desc")}
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
            <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{subT("exporter.whyfeat.backup.title")}</h3>
            <p>
              {subT("exporter.whyfeat.backup.desc")}
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{subT("exporter.whyfeat.privacy.title")}</h3>
            <p>
              {subT("exporter.whyfeat.privacy.desc")}
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm hover:border-orange-500/30 transition-colors">
            <div className="h-10 w-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{subT("exporter.whyfeat.analytics.title")}</h3>
            <p>
              {subT("exporter.whyfeat.analytics.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* How to Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">{subT("exporter.how.title")}</h2>
        <div className="relative border-l-2 border-border/50 ml-4 md:ml-0 md:pl-0 space-y-8">
          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">01</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-green-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{subT("exporter.how.step1.title")}</h3>
              <p>{subT("exporter.how.step1.desc")}</p>
            </div>
          </div>
          
          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">02</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{subT("exporter.how.step2.title")}</h3>
              <p>{subT("exporter.how.step2.desc")}</p>
            </div>
          </div>

          <div className="relative pl-8 md:grid md:grid-cols-5 md:gap-8 md:pl-0">
            <div className="hidden md:block md:col-span-1 md:text-right font-bold text-6xl text-border/30">03</div>
            <div className="md:col-span-4">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-purple-500 ring-4 ring-background md:hidden" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{subT("exporter.how.step3.title")}</h3>
              <p>{subT("exporter.how.step3.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">{subT("exporter.faq.title")}</h2>
        <div className="w-full bg-card/30 rounded-2xl border border-border/50 backdrop-blur-sm p-6">
          <FAQItem
            question={subT("exporter.faq.q1")}
            answer={subT("exporter.faq.a1")}
          />
          <FAQItem
            question={subT("exporter.faq.q2")}
            answer={subT("exporter.faq.a2")}
          />
          <FAQItem
            question={subT("exporter.faq.q3")}
            answer={subT("exporter.faq.a3")}
          />
          <FAQItem
            question={subT("exporter.faq.q4")}
            answer={subT("exporter.faq.a4")}
          />
        </div>
      </section>
    </div>
  )
}
