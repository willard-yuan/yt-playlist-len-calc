import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools You May Also Like - Useful Developer & Social Media Tools',
  description: 'Check out these other useful tools for Discord, Social Media, and more.',
  keywords: 'developer tools, social media tools, discord tools, avatar cropper, fonts generator',
  openGraph: {
    title: 'Tools You May Also Like - Useful Developer & Social Media Tools',
    description: 'Check out these other useful tools for Discord, Social Media, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools You May Also Like - Useful Developer & Social Media Tools',
    description: 'Check out these other useful tools for Discord, Social Media, and more.',
  },
}

export default function ToolsYouMayAlsoLikeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
