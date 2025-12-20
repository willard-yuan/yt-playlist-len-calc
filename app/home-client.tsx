"use client"

import Link from "next/link";
import SearchBar from "@/components/search-bar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Clock, Play, Users, Zap, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeClient() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100 font-sans">
      <Navbar />
      <main>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden">
        {/* Modern Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto opacity-40 dark:opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal animate-pulse" />
            <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal animate-pulse delay-1000" />
            <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-normal animate-pulse delay-2000" />
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            {/* Version Badge */}
            <div className="flex justify-center -mb-4">
              <Link 
                href="/changelog"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-300 group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                v1.4.3
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform opacity-50 group-hover:opacity-100" />
              </Link>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
              Youtube Playlist
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                Length Calculator
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Master your time. Get precise duration analytics for any YouTube playlist instantly.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <button
                onClick={() => scrollToSection('calculate-section')}
                className="group relative px-10 py-5 bg-foreground text-background font-semibold rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Start Calculating
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-10 py-5 text-muted-foreground hover:text-foreground font-medium transition-colors duration-300 flex items-center gap-2 text-lg"
              >
                Learn How
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Function Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar Container */}
          <div id="calculate-section" className="relative z-20 bg-background/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-16 mb-32 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.05)] border border-white/20 dark:border-white/5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">
                Analyze Your Playlist
              </h2>
              <p className="text-muted-foreground text-lg">
                Paste your YouTube playlist URL below to get comprehensive insights
              </p>
            </div>
            <SearchBar />
          </div>

          {/* Why Use Section - Redesigned */}
          <div className="mb-40">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Why Choose Us?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help you manage your content consumption efficiently.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
                  title: "Precision Timing",
                  desc: "Get exact duration calculations down to the second for any playlist size.",
                  bg: "bg-purple-50 dark:bg-purple-900/10"
                },
                {
                  icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                  title: "Smart Planning",
                  desc: "Calculate exactly how long it will take to watch at different playback speeds.",
                  bg: "bg-blue-50 dark:bg-blue-900/10"
                },
                {
                  icon: <Zap className="h-8 w-8 text-pink-600 dark:text-pink-400" />,
                  title: "Instant Analysis",
                  desc: "No waiting time. Get comprehensive insights about your playlist immediately.",
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

          {/* How the Tool Works - Redesigned */}
          <div id="how-it-works" className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
                  Simple Process, <br/>
                  <span className="text-purple-600 dark:text-purple-400">Powerful Results</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  We've streamlined the process to make it as effortless as possible. No sign-ups, no complex steps. Just insights.
                </p>
                
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Copy URL", desc: "Copy the link of any YouTube playlist you want to analyze." },
                    { step: "02", title: "Paste & Calculate", desc: "Paste it into our tool and hit the calculate button." },
                    { step: "03", title: "Get Insights", desc: "View detailed duration breakdowns and planning tools." }
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
                <div className="bg-background/80 backdrop-blur-xl border border-white/20 p-10 rounded-[3rem] shadow-2xl">
                  {/* Abstract visual representation of the tool */}
                  <div className="space-y-6">
                    <div className="h-14 bg-secondary/50 rounded-2xl w-full animate-pulse" />
                    <div className="flex gap-4">
                      <div className="h-32 bg-purple-500/10 rounded-2xl flex-1" />
                      <div className="h-32 bg-blue-500/10 rounded-2xl flex-1" />
                    </div>
                    <div className="space-y-3 pt-4">
                      <div className="h-4 bg-secondary/30 rounded-full w-3/4" />
                      <div className="h-4 bg-secondary/30 rounded-full w-1/2" />
                      <div className="h-4 bg-secondary/30 rounded-full w-5/6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Formula Section - Cleaner */}
          <div className="mb-40">
            <div className="bg-secondary/5 border border-border/50 rounded-[3rem] p-10 md:p-16">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Calculate</h2>
                <p className="text-lg text-muted-foreground">
                  Transparency is key. Here's the math behind our precise duration and time-saving calculations.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="relative pl-8 border-l-2 border-purple-500">
                    <h3 className="text-xl font-bold mb-2">Total Duration</h3>
                    <p className="text-muted-foreground font-mono text-sm bg-background/50 p-4 rounded-xl border border-border/50 inline-block">
                      (Hours × 3600) + (Minutes × 60) + Seconds
                    </p>
                  </div>
                  <div className="relative pl-8 border-l-2 border-blue-500">
                    <h3 className="text-xl font-bold mb-2">Playback Speed Adjustment</h3>
                    <p className="text-muted-foreground font-mono text-sm bg-background/50 p-4 rounded-xl border border-border/50 inline-block">
                      Original Duration / Playback Speed
                    </p>
                  </div>
                  <div className="relative pl-8 border-l-2 border-pink-500">
                    <h3 className="text-xl font-bold mb-2">Time Saved</h3>
                    <p className="text-muted-foreground font-mono text-sm bg-background/50 p-4 rounded-xl border border-border/50 inline-block">
                      Original Duration - New Duration
                    </p>
                  </div>
                </div>

                <div className="bg-background rounded-3xl p-8 md:p-10 shadow-sm border border-border/50">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Real-world Example
                  </h3>
                  <div className="space-y-6 text-sm md:text-base">
                    <p className="text-muted-foreground">
                      For a <span className="text-foreground font-medium">2h 30m</span> playlist at <span className="text-foreground font-medium">1.5x speed</span>:
                    </p>
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Original Seconds</span>
                        <span className="font-mono font-medium">9,000s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Adjusted Seconds</span>
                        <span className="font-mono font-medium">6,000s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 pt-4">
                        <span className="font-bold text-purple-600">Time Saved</span>
                        <span className="font-bold text-green-600">50 mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section - Modern Accordion Style */}
          <div id="faq" className="mb-32 scroll-mt-24">
            <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "What is the YouTube Playlist Length Calculator?",
                  answer: "The YouTube Playlist Length Calculator is a free online tool that calculates the total duration of any YouTube playlist. Simply paste a playlist URL and get instant results with detailed analytics including total time, video count, and viewing estimates at different playback speeds."
                },
                {
                  question: "What formats does the total duration display?",
                  answer: "The total duration is displayed in multiple formats for your convenience: hours, minutes, and seconds (HH:MM:SS), total minutes, total hours, and estimated viewing time in days, work days, and sessions. You can also see duration estimates at different playback speeds (0.25x to 2x)."
                },
                {
                  question: "Does the calculator work with individual video links?",
                  answer: "No, this tool is specifically designed for YouTube playlists. For individual videos, you can see the duration directly on YouTube. However, you can create a playlist with a single video if you need to use our advanced analytics features."
                },
                {
                  question: "Is there a limit to the number of videos in a playlist?",
                  answer: "There's no limit imposed by our tool. We can calculate playlists with thousands of videos. However, very large playlists (1000+ videos) may take a few extra seconds to process as we fetch data for each video to ensure accuracy."
                },
                {
                  question: "What if the playlist is empty?",
                  answer: "If you submit an empty playlist or a playlist with no accessible videos, the tool will display a message indicating that no videos were found. Make sure the playlist is public and contains videos, or check if the playlist URL is correct."
                },
                {
                  question: "Is my data safe when using the tool?",
                  answer: "Absolutely! We only process the playlist URL you provide and don't store any personal information. All calculations are performed in real-time, and we don't save your playlist data or viewing history. Your privacy is our priority."
                },
                {
                  question: "What if I encounter an error when calculating?",
                  answer: "If you encounter an error, first check that the playlist URL is correct and the playlist is public. Common issues include private playlists, deleted playlists, or invalid URLs. If the problem persists, try refreshing the page or contact us through the contact page."
                },
                {
                  question: "Can I share the calculated duration?",
                  answer: "Yes! Once you get the results, you can easily copy the information and share it with others. The results include comprehensive details that you can screenshot or copy-paste to share the playlist duration and analytics with friends, colleagues, or students."
                },
                {
                  question: "Who can benefit from using this tool?",
                  answer: "This tool is perfect for students planning study sessions, educators organizing course content, content creators managing video series, researchers analyzing video content, and anyone who wants to know how much time they'll need to watch a YouTube playlist before starting."
                }
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
                  "text": "Yes! Once you get the results, you can easily copy the information and share it with others. The results include comprehensive details that you can screenshot or copy-paste to share the playlist duration and analytics with friends, colleagues, or students."
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