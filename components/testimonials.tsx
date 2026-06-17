"use client"

import { Star, Quote, User } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function Testimonials() {
  const { t } = useI18n()

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: t("testimonials.role.student"),
      content: t("testimonials.sarah"),
      initials: "SJ",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      name: "Mark Thompson",
      role: t("testimonials.role.creator"),
      content: t("testimonials.mark"),
      initials: "MT",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: t("testimonials.role.educator"),
      content: t("testimonials.emily"),
      initials: "ER",
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
    },
    {
      name: "Alex Chen",
      role: t("testimonials.role.learner"),
      content: t("testimonials.alex"),
      initials: "AC",
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
      name: "Jessica Lee",
      role: t("testimonials.role.pm"),
      content: t("testimonials.jessica"),
      initials: "JL",
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    },
    {
      name: "David Kim",
      role: t("testimonials.role.developer"),
      content: t("testimonials.david"),
      initials: "DK",
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
    }
  ]

  return (
    <div className="mb-32 scroll-mt-24" id="testimonials">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">
          {t("testimonials.title")}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("testimonials.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div 
            key={index} 
            className="group relative bg-background border border-border/50 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-muted-foreground/10 group-hover:text-purple-500/10 transition-colors">
              <Quote className="h-12 w-12 fill-current" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>

            {/* Content */}
            <p className="text-muted-foreground leading-relaxed mb-8 relative z-10">
              &quot;{item.content}&quot;
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-auto">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${item.color}`}>
                {item.initials}
              </div>
              <div>
                <h4 className="font-bold text-foreground">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
