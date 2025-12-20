import Link from "next/link"
import { Star, Twitter, Mail } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ]

  const toolLinks = [
    { name: "YouTube Playlist Exporter", href: "/youtube-playlist-exporter" },
    { name: "YouTube Playlist Length Calculator", href: "/" },
    { name: "Tools You May Also Like", href: "/tools-you-may-also-like" },
    { name: "Changelog", href: "/changelog" },
  ]

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              YT Playlist Length
            </h3>
            <p className="text-muted-foreground text-sm">
              The best tool to calculate YouTube playlist duration. Fast, accurate, and free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/llms.txt"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  target="_blank"
                >
                  llms.txt
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/willard-yuan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm group"
                >
                  <Star className="w-4 h-4 group-hover:text-yellow-500 transition-colors" />
                  <span>Star on GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/Yong" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm group"
                >
                  <Twitter className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  <span>Follow on X</span>
                </a>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm group"
                >
                  <Mail className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                  <span>Contact Support</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} YouTube Playlist Length Calculator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
