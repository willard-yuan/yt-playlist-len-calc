import Link from "next/link"
import { Star } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ]

  return (
    <footer className="border-t border-border bg-gradient-to-r from-card/50 to-muted/20 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-sm relative">
      {/* Star Decorations for Footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-16 text-purple-400/40 animate-pulse">
          <Star className="h-2 w-2 fill-current" />
        </div>
        <div className="absolute top-6 right-24 text-purple-400/40 animate-pulse delay-500">
          <Star className="h-1.5 w-1.5 fill-current" />
        </div>
        <div className="absolute top-3 left-1/3 text-purple-400/40 animate-pulse delay-1000">
          <Star className="h-2 w-2 fill-current" />
        </div>
        <div className="absolute top-5 right-1/3 text-purple-400/40 animate-pulse delay-1500">
          <Star className="h-1.5 w-1.5 fill-current" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              &copy; 2025 YouTube Playlist Length Calculator. All rights reserved.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}