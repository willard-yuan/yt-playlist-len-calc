import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ytplaylistlength.pro'),
  title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
  description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
  generator: "Next.js",
  applicationName: "Youtube Playlist Length Calculator",
  keywords: [
    "Youtube Playlist Length", "Youtube Playlist Duration", "Youtube Playlist Lenth calculator"],
  authors: [{ name: 'Uttam Likhiya', url: 'https://puli.vercel.app' }],
  alternates: {
    canonical: 'https://ytplaylistlength.pro',
  },
  openGraph: {
    title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
    description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
    url: 'https://ytplaylistlength.pro',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary',
    title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
    description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
    creator: 'Uttam Likhiya',
    creatorId: 'L1KH1YAUTTAM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="overflow-x-hidden">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W1834E98M7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W1834E98M7');
            `,
          }}
        />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="6ca316a7-d64d-405a-951e-73b43ae66a89"></script>
      </head>
      <body className={`${inter.className} relative overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />

        </ThemeProvider>
      </body>
    </html>
  );
}
