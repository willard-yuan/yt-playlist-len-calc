import { Metadata } from "next";
import HomeClient from "./home-client";

const SITE_URL = "https://ytplaylistlength.pro";

export const metadata: Metadata = {
  title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
  description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "hi": `${SITE_URL}/hi`,
      "tr": `${SITE_URL}/tr`,
      "x-default": SITE_URL,
    },
  },
};

export default function Home() {
  return <HomeClient />;
}