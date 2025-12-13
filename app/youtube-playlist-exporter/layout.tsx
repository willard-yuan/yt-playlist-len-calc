import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YouTube Playlist Exporter - One-click to Export Your YouTube Playlists',
  description: 'Export your YouTube playlists or YouTube Music playlists to CSV/Excel quickly. Create a backup in case videos from the playlist are deleted or made private.',
  keywords: 'YouTube playlist exporter, export Youtube playlist, export Youtube playlist to csv',
  openGraph: {
    title: 'YouTube Playlist Exporter - One-click to Export Your YouTube Playlists',
    description: 'Export your YouTube playlists or YouTube Music playlists to CSV/Excel quickly. Create a backup in case videos from the playlist are deleted or made private.',
    type: 'website',
    url: 'https://ytplaylistlength.pro/youtube-playlist-exporter',
    siteName: 'YTPlaylistLength',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Playlist Exporter - One-click to Export Your YouTube Playlists',
    description: 'Export your YouTube playlists or YouTube Music playlists to CSV/Excel quickly. Create a backup in case videos from the playlist are deleted or made private.',
  },
  alternates: {
    canonical: 'https://ytplaylistlength.pro/youtube-playlist-exporter',
  },
}

export default function YouTubePlaylistExporterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}