import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Playlist Randomizer - True Shuffle & Mixer Online",
  description: "The best online YouTube Playlist Randomizer. Shuffle your playlists with true randomness, filter videos, and enjoy a distraction-free player. No login required.",
  keywords: [],
  alternates: {
    canonical: "/youtube-playlist-randomizer",
  },
  openGraph: {
    title: "YouTube Playlist Randomizer - True Shuffle & Mixer Online",
    description: "Shuffle your YouTube playlists with true randomness. Filter videos, manage queue, and play without distractions.",
    url: "https://ytplaylistlength.pro/youtube-playlist-randomizer", // Assuming domain, update if needed
    siteName: "YouTube Playlist Length Calculator",
    type: "website",
    images: [
      {
        url: "/og-image-randomizer.png", // We might need to ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "YouTube Playlist Randomizer Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Playlist Randomizer - True Shuffle & Mixer Online",
    description: "Shuffle your YouTube playlists with true randomness. Filter videos, manage queue, and play without distractions.",
  },
};

export default function RandomizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "YouTube Playlist Randomizer",
            "url": "https://ytplaylistlength.pro/youtube-playlist-randomizer",
            "description": "A web-based tool to shuffle YouTube playlists with true randomness and advanced playback controls.",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "True random shuffling",
              "Filter videos by title or channel",
              "Distraction-free cinema mode",
              "No login required"
            ]
          }),
        }}
      />
      {children}
    </>
  );
}
