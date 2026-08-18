import { Play, Clock, Code2, Users, Github, Twitter, Linkedin, Mail, MapPin } from "lucide-react"
import { getT, localeBasePath, type Locale } from "@/lib/i18n/dictionary"

const AUTHOR = {
  name: "Willard Yuan",
  handle: "@Yong",
  title: "Full-stack Developer & Indie Maker",
  location: "China",
  avatar: "https://github.com/willard-yuan.png",
  github: "https://github.com/willard-yuan",
  twitter: "https://twitter.com/Yong",
  linkedin: "https://www.linkedin.com/in/willard-yuan",
  email: "contact@ytplaylistlength.pro",
}

export function AboutContent({ locale }: { locale: Locale }) {
  const t = getT(locale)
  const base = localeBasePath(locale)

  return (
    <>
      <main>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse dark:from-purple-500/30 dark:to-blue-500/30"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/30 dark:to-purple-500/30"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000 dark:from-purple-500/30 dark:to-pink-500/30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
              {t("about.hero.eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Author Card */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-3xl p-8 lg:p-12 shadow-lg flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <img
                src={AUTHOR.avatar}
                alt={`${AUTHOR.name} - creator of YouTube Playlist Length Calculator`}
                width={112}
                height={112}
                className="w-28 h-28 rounded-full shadow-lg border-4 border-background object-cover shrink-0"
              />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-1">{AUTHOR.name}</h2>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">{AUTHOR.title}</p>
                <p className="flex items-center justify-center md:justify-start gap-1.5 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" /> {AUTHOR.location}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t("about.bio")}
                </p>

                {/* Social links */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href={AUTHOR.github}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Github className="w-4 h-4" /> {t("about.social.github")}
                  </a>
                  <a
                    href={AUTHOR.twitter}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Twitter className="w-4 h-4" /> {t("about.social.twitter")}
                  </a>
                  <a
                    href={AUTHOR.linkedin}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Linkedin className="w-4 h-4" /> {t("about.social.linkedin")}
                  </a>
                  <a
                    href={`mailto:${AUTHOR.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border hover:border-purple-500/50 transition-colors text-sm font-medium"
                  >
                    <Mail className="w-4 h-4" /> {t("about.social.email")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("about.story.title")}
            </h2>
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 shadow-lg space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.story.p1")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.story.p2")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.story.p3")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission / Principles */}
      <div className="py-16 bg-gradient-to-r from-muted/20 to-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("about.mission.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("about.mission.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Play className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{t("about.principle.accurate.title")}</h4>
                <p className="text-muted-foreground text-sm">{t("about.principle.accurate.desc")}</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Clock className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{t("about.principle.time.title")}</h4>
                <p className="text-muted-foreground text-sm">{t("about.principle.time.desc")}</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Code2 className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{t("about.principle.notracking.title")}</h4>
                <p className="text-muted-foreground text-sm">{t("about.principle.notracking.desc")}</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Users className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{t("about.principle.withyou.title")}</h4>
                <p className="text-muted-foreground text-sm">{t("about.principle.withyou.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-10 lg:p-14 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{t("about.cta.title")}</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              {t("about.cta.desc")}
            </p>
            <a
              href={`${base}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-700 font-semibold hover:scale-105 transition-transform duration-300"
            >
              <Mail className="w-5 h-5" /> {t("about.cta.button")}
            </a>
          </div>
        </div>
      </div>

      </main>

      {/* Person structured data for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": AUTHOR.name,
            "url": AUTHOR.github,
            "image": AUTHOR.avatar,
            "jobTitle": AUTHOR.title,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": AUTHOR.location
            },
            "sameAs": [
              AUTHOR.github,
              AUTHOR.twitter,
              AUTHOR.linkedin
            ]
          })
        }}
      />
    </>
  )
}
