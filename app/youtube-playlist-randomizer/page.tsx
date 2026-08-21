import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Loader2 } from "lucide-react"
import { RandomizerContent } from "@/components/randomizer-content"

// English metadata is provided by ./layout.tsx. The [locale] variant supplies
// its own localized metadata via generateMetadata.
export default function YoutubePlaylistRandomizer() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-4 py-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div><Footer /></div>}>
      <RandomizerContent />
    </Suspense>
  )
}
