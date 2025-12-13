import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools You May Also Like - Useful Developer & Social Media Tools',
  description: 'Check out these other useful tools for Discord, Social Media, and more.',
  keywords: [
    'discord tools', 
    'avatar cropper', 
    'discord fonts generator', 
    'markdown previewer', 
    'gif frame extractor', 
    'emoji to image'
  ],
  openGraph: {
    title: 'Tools You May Also Like - Useful Developer & Social Media Tools',
    description: 'Check out these other useful tools for Discord, Social Media, and more.',
    url: 'https://ytplaylistlength.pro/tools-you-may-also-like',
    siteName: 'YTPlaylistLength',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools You May Also Like - Useful Developer & Social Media Tools',
    description: 'Check out these other useful tools for Discord, Social Media, and more.',
  },
  alternates: {
    canonical: 'https://ytplaylistlength.pro/tools-you-may-also-like',
  },
}

export default function ToolsYouMayAlsoLikeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
