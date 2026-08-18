import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { HreflangUpdater } from "@/components/hreflang-updater";
import { GlobalStructuredData } from "@/components/global-structured-data";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ytplaylistlength.pro'),
  title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
  description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
  generator: "Next.js",
  applicationName: "Youtube Playlist Length Calculator",
  keywords: [
    "Youtube Playlist Length", "Youtube Playlist Duration", "Youtube Playlist Length calculator"],
  authors: [{ name: 'Willard Yuan', url: 'https://github.com/willard-yuan' }],
  openGraph: {
    title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
    description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
    url: 'https://ytplaylistlength.pro',
    siteName: 'YTPlaylistLength',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ytplaylistlength.pro/og-image.png', // Assuming you have one or will add one
        width: 1200,
        height: 630,
        alt: 'YouTube Playlist Length Calculator Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "YouTube Playlist Length Calculator",
    description: "Calculate YouTube playlist duration instantly. Optimize your watch time.",
    creator: '@Yong', // Assuming handle
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
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="overflow-x-hidden">
    <body className={`${inter.className} relative overflow-x-hidden`} suppressHydrationWarning={true}>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var p=location.pathname;var m=p.match(/^\\/(hi|tr)(?:\\/|$)/);document.documentElement.lang=m?m[1]:'en';})();`,
        }}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-W1834E98M7"
        strategy="afterInteractive"
      />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W1834E98M7');
          `}
        </Script>
        <script
          type="application/ld+json"
          data-global="true"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "YouTube Playlist Length Calculator",
              "url": "https://ytplaylistlength.pro",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ytplaylistlength.pro/?url={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          data-global="true"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "YouTube Playlist Length Calculator",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        <Script src="https://cloud.umami.is/script.js" data-website-id="6ca316a7-d64d-405a-951e-73b43ae66a89" strategy="lazyOnload" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <HreflangUpdater />
            <GlobalStructuredData />
            {children}
            <Toaster />
            <Analytics />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
