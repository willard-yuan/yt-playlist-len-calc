import { Metadata } from "next";
import HomeClient from "./home-client";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
} from "@/lib/i18n/dictionary";

const SITE_URL = "https://ytplaylistlength.pro";

const languages: Record<string, string> = {};
SUPPORTED_LOCALES.forEach((l) => {
  languages[l] = l === DEFAULT_LOCALE ? SITE_URL : `${SITE_URL}/${l}`;
});
languages["x-default"] = SITE_URL;

export const metadata: Metadata = {
  title: "YTPlaylistLength - Best Youtube Playlist Length Calculator",
  description: "Calculate the total length of any YouTube playlists quickly! Paste playlist URL to get instant result on how long it takes to watch all the videos in one go.",
  alternates: {
    canonical: SITE_URL,
    languages,
  },
};

export default function Home() {
  return <HomeClient />;
}