import Navbar from "@/components/navbar";
import { FileText, Scale, AlertCircle, Users, Zap, Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse dark:from-purple-500/30 dark:to-blue-500/30"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/30 dark:to-purple-500/30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500 dark:from-purple-500/20 dark:to-pink-500/20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our service.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Last Updated */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
              <p className="text-muted-foreground">
                <strong>Last updated:</strong> December 2024
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg shadow-md">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using YouTube Playlist Length Calculator ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </div>
            </div>

            {/* Use License */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Use License</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Permission is granted to temporarily use YouTube Playlist Length Calculator for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>modify or copy the materials</li>
                      <li>use the materials for any commercial purpose or for any public display</li>
                      <li>attempt to reverse engineer any software contained on the website</li>
                      <li>remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                    <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg shadow-md">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Service Description</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>YouTube Playlist Length Calculator provides:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Analysis of YouTube playlist duration and content</li>
                      <li>Statistical information about playlist videos</li>
                      <li>Time breakdown and viewing estimates</li>
                      <li>Free access to basic calculation features</li>
                    </ul>
                    <p>We reserve the right to modify, suspend, or discontinue the service at any time without notice.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg shadow-md">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">User Responsibilities</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>As a user of our service, you agree to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Provide only valid YouTube playlist URLs</li>
                      <li>Not attempt to overload or abuse our servers</li>
                      <li>Not use the service for any illegal or unauthorized purpose</li>
                      <li>Respect the intellectual property rights of others</li>
                      <li>Not interfere with or disrupt the service</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg shadow-md">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Disclaimer</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>excludes all representations and warranties relating to this website and its contents</li>
                      <li>excludes all liability for damages arising out of or in connection with your use of this website</li>
                      <li>does not guarantee the accuracy of playlist calculations</li>
                      <li>is not responsible for YouTube API changes or limitations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Limitations</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  In no event shall YouTube Playlist Length Calculator or its suppliers be liable for any damages 
                  (including, without limitation, damages for loss of data or profit, or due to business interruption) 
                  arising out of the use or inability to use the materials on this website, even if we or our authorized 
                  representative has been notified orally or in writing of the possibility of such damage.
                </p>
                <p>
                  Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability 
                  for consequential or incidental damages, these limitations may not apply to you.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-md">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Privacy</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                      to understand our practices.
                    </p>
                    <p>
                      We do not store or retain YouTube playlist data beyond the duration of your session. All calculations 
                      are performed in real-time and data is not permanently stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Governing Law</h2>
              <div className="text-muted-foreground">
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
                  submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Changes to Terms</h2>
              <div className="text-muted-foreground">
                <p>
                  We reserve the right to revise these terms of service at any time without notice. By using this website, 
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Contact Information</h2>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <ul className="space-y-2">
                  <li><strong>Email:</strong> legal@ytplaylistcalc.com</li>
                  <li><strong>Website:</strong> Contact form on our website</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-gradient-to-r from-background/80 to-muted/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 YouTube Playlist Length Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}