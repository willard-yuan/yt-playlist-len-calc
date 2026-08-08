"use client"


import SearchBar from "@/components/search-bar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ChangelogPreview } from "@/components/changelog-preview";
import LatestPosts from "@/components/latest-posts";
import { OtherToolsSection } from "@/components/other-tools-section";
import HomeRichSections from "@/components/home-rich-sections";
import { useI18n } from "@/lib/i18n";
import { Clock, Users, Zap, HelpCircle, CheckCircle2 } from "lucide-react";

export default function HomeClient() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100 font-sans">
      <Navbar />
      <main>
      
      {/* Hero + Calculator — Compact First Screen */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-44 overflow-hidden">
        {/* Modern Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-35 dark:opacity-15 pointer-events-none">
            <div className="absolute top-[-5%] left-[20%] w-[450px] h-[450px] bg-purple-500/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal animate-pulse" />
            <div className="absolute top-[15%] right-[10%] w-[350px] h-[350px] bg-blue-500/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal animate-pulse delay-1000" />
            <div className="absolute bottom-[-5%] left-[30%] w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-normal animate-pulse delay-2000" />
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-7">
            {/* Main Title — Compact */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              {t("hero.title.line1")}
              {" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                {t("hero.title.line2")}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              {t("hero.subtitle")}
            </p>

            {/* Calculator — Integrated into Hero First Screen */}
            <div id="calculate-section" className="relative z-20 mx-auto mt-6 mb-16">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-6xl mx-auto">

          {/* How the Tool Works - Redesigned */}
          <div id="how-it-works" className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
                  {t("howItWorks.title.line1")} <br/>
                  <span className="text-purple-600 dark:text-purple-400">{t("howItWorks.title.line2")}</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  {t("howItWorks.subtitle")}
                </p>
                
                <div className="space-y-8">
                  {[
                    { step: "01", title: t("howItWorks.step1.title"), desc: t("howItWorks.step1.desc") },
                    { step: "02", title: t("howItWorks.step2.title"), desc: t("howItWorks.step2.desc") },
                    { step: "03", title: t("howItWorks.step3.title"), desc: t("howItWorks.step3.desc") }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-6 group">
                      <span className="text-4xl font-bold text-muted-foreground/20 group-hover:text-purple-500/50 transition-colors duration-300">{item.step}</span>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-[3rem] blur-3xl -z-10" />
                <div className="bg-background/80 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[3rem] shadow-2xl overflow-hidden">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                    <img
                      src="/Active_Planning.webp"
                      alt="Plan your YouTube playlist viewing schedule with our calculator — see total duration, playback speed estimates and daily watch goals"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-5 leading-relaxed">
                    Visualize your playlist timeline and plan every session with precision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Formula Section - Cleaner */}
          <div className="mb-40">
            <div className="bg-secondary/5 border border-border/50 rounded-[3rem] p-10 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("calc.title")}</h2>
                <p className="text-lg text-muted-foreground">
                  {t("calc.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="relative pl-8 border-l-2 border-purple-500">
                    <h3 className="text-xl font-bold mb-2">{t("calc.duration.title")}</h3>
                    <p className="text-muted-foreground font-mono text-sm bg-background/50 p-4 rounded-xl border border-border/50 inline-block">
                      {t("calc.duration.formula")}
                    </p>
                  </div>
                  <div className="relative pl-8 border-l-2 border-blue-500">
                    <h3 className="text-xl font-bold mb-2">{t("calc.speed.title")}</h3>
                    <p className="text-muted-foreground font-mono text-sm bg-background/50 p-4 rounded-xl border border-border/50 inline-block">
                      {t("calc.speed.formula")}
                    </p>
                  </div>
                  <div className="relative pl-8 border-l-2 border-pink-500">
                    <h3 className="text-xl font-bold mb-2">{t("calc.saved.title")}</h3>
                    <p className="text-muted-foreground font-mono text-sm bg-background/50 p-4 rounded-xl border border-border/50 inline-block">
                      {t("calc.saved.formula")}
                    </p>
                  </div>
                </div>

                <div className="bg-background rounded-3xl p-8 md:p-10 shadow-sm border border-border/50">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    {t("calc.example.title")}
                  </h3>
                  <div className="space-y-6 text-sm md:text-base">
                    <p className="text-muted-foreground">
                      {t("calc.example.desc").split("<b>").map((part, i) => {
                        if (i === 0) return <span key={i}>{part}</span>;
                        const [bold, rest] = part.split("</b>");
                        return <span key={i}><span className="text-foreground font-medium">{bold}</span>{rest}</span>;
                      })}
                    </p>
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">{t("calc.example.original")}</span>
                        <span className="font-mono font-medium">{t("calc.example.originalValue")}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">{t("calc.example.adjusted")}</span>
                        <span className="font-mono font-medium">{t("calc.example.adjustedValue")}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 pt-4">
                        <span className="font-bold text-purple-600">{t("calc.example.saved")}</span>
                        <span className="font-bold text-green-600">{t("calc.example.savedValue")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rich Content Sections (referenced from approved competitor) */}
          <HomeRichSections />

          {/* FAQs Section - Modern Accordion Style */}
          <div id="faq" className="mb-32 scroll-mt-24">
            <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
              {t("faq.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { question: t("faq.q1"), answer: t("faq.a1") },
                { question: t("faq.q2"), answer: t("faq.a2") },
                { question: t("faq.q3"), answer: t("faq.a3") },
                { question: t("faq.q4"), answer: t("faq.a4") },
                { question: t("faq.q5"), answer: t("faq.a5") },
                { question: t("faq.q6"), answer: t("faq.a6") },
                { question: t("faq.q7"), answer: t("faq.a7") },
                { question: t("faq.q8"), answer: t("faq.a8") },
                { question: t("faq.q9"), answer: t("faq.a9") },
                { question: t("faq.q10"), answer: t("faq.a10") },
                { question: t("faq.q11"), answer: t("faq.a11") },
                { question: t("faq.q12"), answer: t("faq.a12") },
                { question: t("faq.q13"), answer: t("faq.a13") },
                { question: t("faq.q14"), answer: t("faq.a14") },
                { question: t("faq.q15"), answer: t("faq.a15") },
                { question: t("faq.q16"), answer: t("faq.a16") },
              ].map((faq, index) => (
                <div key={index} className="bg-background/50 border border-border/50 rounded-2xl p-8 hover:bg-secondary/30 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-1">
                      <HelpCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Section - Moved before Other Tools */}
          <div className="mb-40">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                {t("why.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("why.subtitle")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
                  title: t("why.precision.title"),
                  desc: t("why.precision.desc"),
                  bg: "bg-purple-50 dark:bg-purple-900/10"
                },
                {
                  icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                  title: t("why.planning.title"),
                  desc: t("why.planning.desc"),
                  bg: "bg-blue-50 dark:bg-blue-900/10"
                },
                {
                  icon: <Zap className="h-8 w-8 text-pink-600 dark:text-pink-400" />,
                  title: t("why.instant.title"),
                  desc: t("why.instant.desc"),
                  bg: "bg-pink-50 dark:bg-pink-900/10"
                }
              ].map((item, i) => (
                <div key={i} className="group p-10 rounded-[2rem] bg-background border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Tools Section */}
          <OtherToolsSection />

          {/* Latest Posts Section */}
          <LatestPosts />

          {/* Changelog Section */}
          <ChangelogPreview />
        </div>
      </div>

      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the YouTube Playlist Length Calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The YouTube Playlist Length Calculator is a free online tool that calculates the total duration of any YouTube playlist. Simply paste a playlist URL and get instant results with detailed analytics including total time, video count, and viewing estimates at different playback speeds."
                }
              },
              {
                "@type": "Question",
                "name": "What formats does the total duration display?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The total duration is displayed in multiple formats for your convenience: hours, minutes, and seconds (HH:MM:SS), total minutes, total hours, and estimated viewing time in days, work days, and sessions. You can also see duration estimates at different playback speeds (0.25x to 2x)."
                }
              },
              {
                "@type": "Question",
                "name": "Does the calculator work with individual video links?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, this tool is specifically designed for YouTube playlists. For individual videos, you can see the duration directly on YouTube. However, you can create a playlist with a single video if you need to use our advanced analytics features."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a limit to the number of videos in a playlist?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There's no limit imposed by our tool. We can calculate playlists with thousands of videos. However, very large playlists (1000+ videos) may take a few extra seconds to process as we fetch data for each video to ensure accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "What if the playlist is empty?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you submit an empty playlist or a playlist with no accessible videos, the tool will display a message indicating that no videos were found. Make sure the playlist is public and contains videos, or check if the playlist URL is correct."
                }
              },
              {
                "@type": "Question",
                "name": "Is my data safe when using the tool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We only process the playlist URL you provide and don't store any personal information. All calculations are performed in real-time, and we don't save your playlist data or viewing history. Your privacy is our priority."
                }
              },
              {
                "@type": "Question",
                "name": "What if I encounter an error when calculating?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you encounter an error, first check that the playlist URL is correct and the playlist is public. Common issues include private playlists, deleted playlists, or invalid URLs. If the problem persists, try refreshing the page or contact us through the contact page."
                }
              },
              {
                "@type": "Question",
                "name": "Can I share the calculated duration?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Once the results are generated, you can easily copy the information and share it with others. The results include comprehensive details that you can screenshot or copy-paste to share the playlist duration and analytics with friends, colleagues, or students."
                }
              },
              {
                "@type": "Question",
                "name": "Why would I want to calculate playlist length?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Knowing the total length helps you plan your time effectively. Whether you're a student with a lecture playlist, a binge-watcher, or a creator analyzing competitors, our tool gives you the exact time commitment required so you can schedule your viewing sessions efficiently."
                }
              },
              {
                "@type": "Question",
                "name": "Can I exclude certain videos from the calculation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Once the playlist is loaded, you'll see a list of all videos. You can simply uncheck any videos you've already watched or don't want to include, and the total duration will update instantly to reflect your selection."
                }
              },
              {
                "@type": "Question",
                "name": "Does this work with private playlists?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, due to YouTube's privacy policies, we cannot access private playlists. However, you can use it with 'Unlisted' playlists if you have the direct link. If you own the private playlist, you can temporarily set it to 'Unlisted' to calculate the length."
                }
              },
              {
                "@type": "Question",
                "name": "What if a playlist has unavailable videos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our tool automatically detects and flags unavailable (deleted or private) videos within a public playlist. While we can't get their exact duration, we alert you to their presence so you know the calculation only includes the currently playable content."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for my own playlists?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! As long as your playlist is set to 'Public' or 'Unlisted', you can use this tool to analyze your own content duration, which is great for planning course modules or video series length."
                }
              },
              {
                "@type": "Question",
                "name": "Does this work with YouTube Music playlists?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, YouTube Music playlists work perfectly with our calculator since they share the same underlying infrastructure as regular YouTube playlists. Just paste the playlist URL to see the total listening time."
                }
              },
              {
                "@type": "Question",
                "name": "How often is the data updated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We fetch fresh data directly from YouTube every time you click 'Analyze'. This ensures you always get the most up-to-date information, including recent video additions or duration changes."
                }
              },
              {
                "@type": "Question",
                "name": "Who can benefit from using this tool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This tool is perfect for students planning study sessions, educators organizing course content, content creators managing video series, researchers analyzing video content, and anyone who wants to know how much time they'll need to watch a YouTube playlist before starting."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
