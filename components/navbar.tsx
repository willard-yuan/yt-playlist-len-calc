"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Play, Youtube, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/model-toggle"
import Logo from "@/components/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const getLogoText = () => {
    if (pathname === '/youtube-playlist-exporter') {
      return 'YouTube Playlist Exporter'
    }
    return 'YouTube Playlist Length Calculator'
  }

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Changelog", href: "/changelog" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md">
      {/* Star Decorations for Navbar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-16 text-purple-400/60 animate-pulse">
          <Star className="h-3 w-3 fill-current" />
        </div>
        <div className="absolute top-3 right-24 text-purple-400/60 animate-pulse delay-500">
          <Star className="h-2 w-2 fill-current" />
        </div>
        <div className="absolute top-1 left-1/3 text-purple-400/60 animate-pulse delay-1000">
          <Star className="h-2.5 w-2.5 fill-current" />
        </div>
        <div className="absolute top-2 right-1/3 text-purple-400/60 animate-pulse delay-1500">
          <Star className="h-2 w-2 fill-current" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-red-600 to-purple-700 p-2 rounded-full">
                <Youtube className="h-7 w-7 text-white" />
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
               {getLogoText()}
             </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Other Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group flex items-center space-x-1 h-auto p-0 font-normal">
                  <span>Other Tools</span>
                  <ChevronDown className="h-4 w-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/youtube-playlist-exporter" className="flex items-center space-x-2">
                    <Youtube className="h-4 w-4" />
                    <span>YouTube Playlist Exporter</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Other menu items */}
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-muted"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/90 backdrop-blur-md rounded-lg mt-2 border border-border">
              {/* Home */}
              <Link
                href="/"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Other Tools Section for Mobile */}
              <div className="border-t border-border pt-2 mt-2">
                <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Other Tools
                </div>
                <Link
                  href="/youtube-playlist-exporter"
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube Playlist Exporter</span>
                </Link>
              </div>
              
              {/* Other menu items */}
              {menuItems.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}