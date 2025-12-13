import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Play, Clock, BarChart3, Zap, Users, Target, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - YouTube Playlist Length Calculator",
  description: "Learn about the mission and team behind the best YouTube Playlist Duration Calculator. We help you optimize your watch time.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/about',
  },
  openGraph: {
    title: "About Us - YouTube Playlist Length Calculator",
    description: "Learn about the mission and team behind the best YouTube Playlist Duration Calculator.",
    url: 'https://ytplaylistlength.pro/about',
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse dark:from-purple-500/30 dark:to-blue-500/30"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/30 dark:to-purple-500/30"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000 dark:from-purple-500/30 dark:to-pink-500/30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're passionate about making YouTube playlist analysis 
              <span className="text-foreground font-semibold"> simple</span>, 
              <span className="text-foreground font-semibold"> fast</span>, and 
              <span className="text-foreground font-semibold"> accurate</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg w-fit mb-6 shadow-lg">
                  <Target className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide the most accurate and efficient YouTube playlist duration calculator, 
                  helping content creators, educators, and viewers better manage their time and content consumption.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg w-fit mb-6 shadow-lg">
                  <Lightbulb className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We continuously innovate to bring you advanced features like speed calculations, 
                  filtering options, and detailed analytics to enhance your YouTube experience.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg w-fit mb-6 shadow-lg">
                  <Users className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built for the community, by the community. We listen to user feedback and 
                  constantly improve our platform to meet your evolving needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-r from-muted/20 to-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground">
              We offer the most comprehensive YouTube playlist analysis tools available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Play className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">Instant Results</h4>
                <p className="text-muted-foreground text-sm">Get playlist duration in seconds</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Clock className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">Speed Control</h4>
                <p className="text-muted-foreground text-sm">Calculate time at different speeds</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <BarChart3 className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">Detailed Analytics</h4>
                <p className="text-muted-foreground text-sm">Comprehensive playlist insights</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-card/60 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg w-fit mx-auto mb-4 shadow-md">
                  <Zap className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">Lightning Fast</h4>
                <p className="text-muted-foreground text-sm">Optimized for performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 shadow-lg">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                YouTube Playlist Length Calculator was born from a simple need: to quickly understand 
                how much time a playlist would take to watch. What started as a personal project has 
                evolved into a comprehensive tool used by thousands of users worldwide.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe in the power of efficient content consumption and time management. 
                Our tool helps students plan their study sessions, content creators organize their work, 
                and viewers make informed decisions about their entertainment time.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Thank you for being part of our journey. We're committed to continuously improving 
                and adding new features that make your YouTube experience better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}