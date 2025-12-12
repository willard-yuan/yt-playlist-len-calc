"use client"

import SearchBar from "@/components/search-bar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Star, Clock, CheckCircle, Play, Users, Zap, HelpCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 90; // Adjusted offset for the navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/20 text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/20 dark:from-purple-500/20 dark:to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-purple-500/30 dark:from-blue-500/10 dark:to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-t from-purple-500/15 to-indigo-500/20 dark:from-purple-500/10 dark:to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {/* Star Decorations */}
          <div className="absolute top-32 left-20 text-purple-500 dark:text-purple-400 animate-pulse">
            <Star className="h-6 w-6 fill-current" />
          </div>
          <div className="absolute top-48 right-32 text-purple-500 dark:text-purple-400 animate-pulse delay-500">
            <Star className="h-4 w-4 fill-current" />
          </div>
          <div className="absolute top-64 left-1/4 text-purple-500 dark:text-purple-400 animate-pulse delay-1000">
            <Star className="h-5 w-5 fill-current" />
          </div>
          <div className="absolute top-80 right-1/4 text-purple-500 dark:text-purple-400 animate-pulse delay-1500">
            <Star className="h-4 w-4 fill-current" />
          </div>
          <div className="absolute bottom-32 left-16 text-purple-500 dark:text-purple-400 animate-pulse delay-2000">
            <Star className="h-5 w-5 fill-current" />
          </div>
          <div className="absolute bottom-48 right-16 text-purple-500 dark:text-purple-400 animate-pulse delay-2500">
            <Star className="h-6 w-6 fill-current" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Title */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent pb-2">
                Youtube Playlist
                <br />
                Length Calculator
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Easily calculate the total length of any YouTube playlist with our 
                <span className="text-foreground font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"> Playlist Length Calculator</span>. 
                Ideal for planning your 
                <span className="text-foreground font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"> watch sessions efficiently</span>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <button
                  onClick={() => scrollToSection('calculate-section')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Calculating
                </button>
                
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Learn How
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Function Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar with Enhanced Design */}
          <div id="calculate-section" className="bg-gradient-to-r from-card/80 to-muted/50 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm border border-border rounded-2xl p-8 mb-16 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 pb-1">
                Calculate Your Playlist Length
              </h2>
              <p className="text-muted-foreground text-lg">
                Simply paste your YouTube playlist URL below and get instant results
              </p>
            </div>
            <SearchBar />
          </div>

          {/* Why Use Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent pb-1">
              Why Use the YouTube Playlist Length Calculator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-card/80 to-muted/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group shadow-lg">
                <Clock className="h-12 w-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Time Management</h3>
                <p className="text-muted-foreground">Plan your viewing schedule effectively by knowing exactly how long your playlists are.</p>
              </div>
              <div className="bg-gradient-to-br from-card/80 to-muted/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group shadow-lg">
                <Users className="h-12 w-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Content Planning</h3>
                <p className="text-muted-foreground">Perfect for educators, content creators, and anyone organizing video content.</p>
              </div>
              <div className="bg-gradient-to-br from-card/80 to-muted/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group shadow-lg">
                <Zap className="h-12 w-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Instant Results</h3>
                <p className="text-muted-foreground">Get accurate playlist duration calculations in seconds, not minutes.</p>
              </div>
            </div>
          </div>

          {/* How the Tool Works */}
          <div id="how-it-works" className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              How the Calculator Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Paste URL</h3>
                <p className="text-muted-foreground">Copy and paste your YouTube playlist URL into the input field above.</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Analyze</h3>
                <p className="text-muted-foreground">Our tool automatically fetches and analyzes all videos in your playlist.</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Get Results</h3>
                <p className="text-muted-foreground">View the total duration, video count, and detailed breakdown instantly.</p>
              </div>
            </div>

            {/* Mathematical Formula Section */}
            <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Mathematical Formula</h3>
              <p className="text-muted-foreground mb-8 text-center">
                The Youtube Playlist Length works by using simple math to figure out how long it will take to finish your audio or video at a certain speed. Here's how it does that:
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Formulas */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-card/80 to-muted/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h4 className="text-lg font-semibold text-purple-500 dark:text-purple-400 mb-3">Total Length (in seconds):</h4>
                    <p className="text-muted-foreground mb-3">We first convert the total time of your audiobook or video into seconds. The formula is:</p>
                    <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-black/30 dark:to-gray-900/30 rounded-lg p-4 font-mono text-purple-600 dark:text-purple-300 text-center">
                      Total Length (seconds) = (Hours × 3600) + (Minutes × 60) + Seconds
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-card/80 to-muted/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h4 className="text-lg font-semibold text-purple-500 dark:text-purple-400 mb-3">Listening Time:</h4>
                    <p className="text-muted-foreground mb-3">To calculate the new time at your selected speed, we use this formula:</p>
                    <div className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-black/30 dark:to-gray-900/30 rounded-lg p-4 font-mono text-blue-600 dark:text-purple-300 text-center">
                      Listening Time (seconds) = Total Length (seconds) / Playback Speed
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-card/80 to-muted/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h4 className="text-lg font-semibold text-purple-500 dark:text-purple-400 mb-3">Time Saved:</h4>
                    <p className="text-muted-foreground mb-3">If you choose a faster speed, you'll save time. The formula for time saved is:</p>
                    <div className="bg-gradient-to-r from-pink-100/50 to-purple-100/50 dark:from-black/30 dark:to-gray-900/30 rounded-lg p-4 font-mono text-pink-600 dark:text-purple-300 text-center">
                      Time Saved (seconds) = Total Length (seconds) − Listening Time (seconds)
                    </div>
                  </div>
                </div>

                {/* Example */}
                <div className="bg-gradient-to-br from-card/80 to-muted/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h4 className="text-xl font-semibold text-foreground mb-4">Example</h4>
                  <p className="text-muted-foreground mb-6">
                    Let's say your audiobook is 2 hours, 30 minutes, and 0 seconds long, and you choose to listen at 1.5x speed:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-purple-500 dark:text-purple-400 font-semibold mb-2">Total Length (seconds):</h5>
                      <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-black/30 dark:to-gray-900/30 rounded-lg p-3 font-mono text-sm text-purple-600 dark:text-purple-300">
                        (2 × 3600) + (30 × 60) + 0 = 9000 seconds
                      </div>
                    </div>

                    <div>
                      <h5 className="text-blue-500 dark:text-purple-400 font-semibold mb-2">Listening Time (seconds):</h5>
                      <div className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-black/30 dark:to-gray-900/30 rounded-lg p-3 font-mono text-sm text-blue-600 dark:text-purple-300">
                        9000 / 1.5 = 6000 seconds = 1 hour, 40 minutes, 0 seconds
                      </div>
                    </div>

                    <div>
                      <h5 className="text-pink-500 dark:text-purple-400 font-semibold mb-2">Time Saved (seconds):</h5>
                      <div className="bg-gradient-to-r from-pink-100/50 to-purple-100/50 dark:from-black/30 dark:to-gray-900/30 rounded-lg p-3 font-mono text-sm text-pink-600 dark:text-purple-300">
                        9000 − 6000 = 3000 seconds = 50 minutes, 0 seconds
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-500/20 dark:to-pink-500/20 rounded-lg p-4 mt-6 shadow-lg">
                      <p className="text-foreground font-semibold text-center">
                        So, by listening at 1.5x speed, you'll finish the audiobook in 1 hour and 40 minutes and save 50 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Benefits of Knowing Playlist Duration
            </h2>
            <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-center">
                Ever wanted to finish an audiobook or podcast faster? Or maybe slow down a video to catch all the details? 
                The Youtube Playlist Length lets you do just that. With this tool, you can:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4 bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/30 dark:to-gray-800/20 rounded-xl p-6 shadow-lg">
                <Zap className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Save Time</h3>
                  <p className="text-muted-foreground">Speed up audio or video and see exactly how much time you'll save.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/30 dark:to-gray-800/20 rounded-xl p-6 shadow-lg">
                <Play className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Optimize Your Listening or Viewing Experience</h3>
                  <p className="text-muted-foreground">Adjust playback speed to suit your needs, whether you're learning something new or just enjoying content.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/30 dark:to-gray-800/20 rounded-xl p-6 shadow-lg">
                <Clock className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Stay in Control</h3>
                  <p className="text-muted-foreground">Get the most out of your time by tailoring the speed to match your pace.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Usage Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Using the Youtube Playlist Length is super simple
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                No registration required, no downloads needed. Just paste your playlist URL and get instant results. 
                It's that easy!
              </p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-8 py-3 flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow">
                  <Play className="h-5 w-5 text-white" />
                                  <button onClick={() => scrollToSection('calculate-section')} className="text-white font-semibold hover:underline">
                  Try it now above!
                </button>
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              FAQs
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What is the YouTube Playlist Length Calculator?</h3>
                    <p className="text-muted-foreground">The YouTube Playlist Length Calculator is a free online tool that calculates the total duration of any YouTube playlist. Simply paste a playlist URL and get instant results with detailed analytics including total time, video count, and viewing estimates at different playback speeds.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What formats does the total duration display?</h3>
                    <p className="text-muted-foreground">The total duration is displayed in multiple formats for your convenience: hours, minutes, and seconds (HH:MM:SS), total minutes, total hours, and estimated viewing time in days, work days, and sessions. You can also see duration estimates at different playback speeds (0.25x to 2x).</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Does the calculator work with individual video links?</h3>
                    <p className="text-muted-foreground">No, this tool is specifically designed for YouTube playlists. For individual videos, you can see the duration directly on YouTube. However, you can create a playlist with a single video if you need to use our advanced analytics features.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Is there a limit to the number of videos in a playlist?</h3>
                    <p className="text-muted-foreground">There's no limit imposed by our tool. We can calculate playlists with thousands of videos. However, very large playlists (1000+ videos) may take a few extra seconds to process as we fetch data for each video to ensure accuracy.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What if the playlist is empty?</h3>
                    <p className="text-muted-foreground">If you submit an empty playlist or a playlist with no accessible videos, the tool will display a message indicating that no videos were found. Make sure the playlist is public and contains videos, or check if the playlist URL is correct.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Is my data safe when using the tool?</h3>
                    <p className="text-muted-foreground">Absolutely! We only process the playlist URL you provide and don't store any personal information. All calculations are performed in real-time, and we don't save your playlist data or viewing history. Your privacy is our priority.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What if I encounter an error when calculating?</h3>
                    <p className="text-muted-foreground">If you encounter an error, first check that the playlist URL is correct and the playlist is public. Common issues include private playlists, deleted playlists, or invalid URLs. If the problem persists, try refreshing the page or contact us through the contact page.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can I share the calculated duration?</h3>
                    <p className="text-muted-foreground">Yes! Once you get the results, you can easily copy the information and share it with others. The results include comprehensive details that you can screenshot or copy-paste to share the playlist duration and analytics with friends, colleagues, or students.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Who can benefit from using this tool?</h3>
                    <p className="text-muted-foreground">This tool is perfect for students planning study sessions, educators organizing course content, content creators managing video series, researchers analyzing video content, and anyone who wants to know how much time they'll need to watch a YouTube playlist before starting.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
