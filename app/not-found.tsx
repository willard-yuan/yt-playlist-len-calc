import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-in zoom-in duration-500">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-foreground animate-in slide-in-from-bottom-4 duration-500 delay-100">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-200">
          Oops! The page you are looking for seems to have wandered off into the YouTube algorithm.
        </p>
        
        <div className="flex gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
          <Button asChild variant="default" size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <Link href="/" className="gap-2">
              <Home className="w-4 h-4" />
              Back Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/contact" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Contact Support
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
