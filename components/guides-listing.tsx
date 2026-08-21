import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LocaleLink } from "@/components/locale-link";
import { guides } from "@/lib/guides-data";
import { getSubT, type SubpageKey } from "@/lib/i18n/subpages";
import { type Locale } from "@/lib/i18n/dictionary";

export function GuidesListing({ locale }: { locale: Locale }) {
  const subT = getSubT(locale);
  const t = (k: string) => subT(k as unknown as SubpageKey);
  const byAuthor = (name: string) => subT("guides.by").replace("{author}", name);

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] pb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {subT("guides.hero.title")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mt-6">
              {subT("guides.hero.sub")}
            </p>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <main className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12">
            {guides.map((guide) => (
              <div
                key={guide.slug}
                className="group relative bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="md:flex items-stretch">
                  {/* Cover Image */}
                  <div className="md:w-2/5 relative overflow-hidden min-h-[250px] md:min-h-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={guide.coverImage}
                      alt={`Cover image for ${guide.title}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10 opacity-60" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg">
                        Guide
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0 px-3 py-1">
                        {guide.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(guide.datePublished).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {guide.readTime}
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      <LocaleLink href={`/guides/${guide.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0 md:w-2/5" aria-hidden="true" />
                        {t(`guides.${guide.slug}.title`)}
                      </LocaleLink>
                    </h2>

                    <p className="text-muted-foreground text-lg leading-relaxed mb-6 line-clamp-3">
                      {t(`guides.${guide.slug}.excerpt`)}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{byAuthor(guide.author.name)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        {subT("guides.readGuide")}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
