import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
  description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
  alternates: {
    canonical: 'https://ytplaylistlength.pro',
  },
};

export default function Home() {
  return <HomeClient />;
}