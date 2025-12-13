import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Mail, MessageSquare, Phone, MapPin, Send, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact Us - YouTube Playlist Length Calculator Support",
  description: "Have questions, suggestions, or feedback? Contact the YouTube Playlist Length Calculator team. We are here to help.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro/contact',
  },
  openGraph: {
    title: "Contact Us - YouTube Playlist Length Calculator Support",
    description: "Have questions, suggestions, or feedback? Contact the YouTube Playlist Length Calculator team.",
    url: 'https://ytplaylistlength.pro/contact',
  }
};

// Force TypeScript to recognize the Textarea component

export default function ContactPage() {
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
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help you?"
                      className="bg-background/50 border-border focus:border-purple-500 text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      className="bg-background/50 border-border focus:border-purple-500 text-foreground resize-none"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 shadow-lg">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We're here to help and answer any questions you might have. 
                    We look forward to hearing from you!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg shadow-md">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">Email</h3>
                      <p className="text-muted-foreground">support@ytplaylistcalc.com</p>
                      <p className="text-muted-foreground text-sm mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">Live Chat</h3>
                      <p className="text-muted-foreground">Available 9 AM - 6 PM EST</p>
                      <p className="text-muted-foreground text-sm mt-1">Monday through Friday</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">GitHub</h3>
                      <p className="text-muted-foreground">Report bugs or contribute</p>
                      <p className="text-muted-foreground text-sm mt-1">Open source contributions welcome</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Quick FAQ
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">How accurate are the calculations?</h4>
                      <p className="text-muted-foreground text-sm">Our calculations are 99.9% accurate, using official YouTube API data.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Is the service free?</h4>
                      <p className="text-muted-foreground text-sm">Yes! Our basic service is completely free with no hidden costs.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Do you store my data?</h4>
                      <p className="text-muted-foreground text-sm">We don't store any personal data or playlist information.</p>
                    </div>
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