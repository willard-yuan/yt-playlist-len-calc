"use server";
import axios from "axios";
import { chunk } from "./utils";
import { HttpsProxyAgent } from "https-proxy-agent";

const proxyUrl = process.env.PROXY_URL;

const client = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  timeout: 120000,
  httpsAgent: proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined,
});

export async function getPlaylist(url: string) {
  const playlistURL = new URL(url);
  const playlistId = playlistURL.searchParams.get("list");
  let nextPageToken = "";
  let allItems: any = [];
  let res;
  let index = 1; // Add a counter for the index
  try {
    // First, get playlist details
    const playlistRes = await client.get(
      `/playlists?part=snippet&id=${playlistId}&key=${process.env.API_KEY}`
    );
    
    do {
      res = await client.get(
        `/playlistItems?part=snippet&part=contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${nextPageToken}&key=${process.env.API_KEY}`
      );
      res.data.items.forEach((item: any) => {
        item.index = index++;
        allItems.push(item);
      });
      nextPageToken = res.data.nextPageToken;
    } while (nextPageToken);

    // Split the video IDs into chunks of 50
    const videoIdChunks = chunk(
      allItems.map((item: any) => item.contentDetails.videoId),
      50
    );

    // Fetch the video details for each chunk
    for (const videoIds of videoIdChunks) {
      const videoRes = await client.get(
        `/videos?part=snippet&part=contentDetails&part=statistics&maxResults=50&id=${videoIds.join(
          ","
        )}&key=${process.env.API_KEY}`
      );
      videoRes.data.items.forEach((video: any, index: number) => {
        const item = allItems.find(
          (item: any) => item.contentDetails.videoId === video.id
        );
        if (item) {
          item.videoTitle = video.snippet.title;
          item.videoDescription = video.snippet.description;
          item.videoThumbnail = video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url;
          item.videoDuration = video.contentDetails.duration;
          item.videoChannelTitle = video.snippet.channelTitle;
          item.videoPublishedAt = video.snippet.publishedAt;
          item.videoViewCount = video.statistics?.viewCount || 0;
          item.videoLikeCount = video.statistics?.likeCount || 0;
          item.videoCommentCount = video.statistics?.commentCount || 0;
        }
      });
    }

    const { items, ...result } = res.data;
    const playlistInfo = playlistRes.data.items[0] || {};
    return { 
      items: allItems, 
      playlistInfo: playlistInfo,
      ...result 
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(
      `Failed to fetch playlist: ${error.response?.data?.error?.message || error.message}`
    );
  }
}

export async function getPlaylistByParams(
  url: string,
  start: number,
  end: number
) {
  const playlistURL = new URL(url);
  const playlistId = playlistURL.searchParams.get("list");
  let nextPageToken = "";
  let allItems: any = [];
  let itemIndex = 1;
  let res;

  try {
    do {
      res = await client.get(
        `/playlistItems?part=snippet&part=contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${nextPageToken}&key=${process.env.API_KEY}`
      );
      res.data.items.forEach((item: any) => {
        if (itemIndex >= start && itemIndex <= end) {
          item.index = itemIndex;
          allItems.push(item);
        }
        itemIndex++;
      });
      nextPageToken = res.data.nextPageToken;
    } while (nextPageToken && itemIndex <= end);

    // Split the video IDs into chunks of 50
    const videoIdChunks = chunk(
      allItems.map((item: any) => item.contentDetails.videoId),
      50
    );

    // Fetch the video details for each chunk
    for (const videoIds of videoIdChunks) {
      const videoRes = await client.get(
        `/videos?part=snippet&part=contentDetails&part=statistics&maxResults=50&id=${videoIds.join(
          ","
        )}&key=${process.env.API_KEY}`
      );
      videoRes.data.items.forEach((video: any) => {
        const item = allItems.find(
          (item: any) => item.contentDetails.videoId === video.id
        );
        if (item) {
          item.videoTitle = video.snippet.title;
          item.videoDescription = video.snippet.description;
          item.videoThumbnail = video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url;
          item.videoDuration = video.contentDetails.duration;
          item.videoChannelTitle = video.snippet.channelTitle;
          item.videoPublishedAt = video.snippet.publishedAt;
          item.videoViewCount = video.statistics?.viewCount || 0;
          item.videoLikeCount = video.statistics?.likeCount || 0;
          item.videoCommentCount = video.statistics?.commentCount || 0;
        }
      });
    }

    const { items, ...result } = res.data;
    return { items: allItems, ...result };
  } catch (error: any) {
    console.error(error);
    throw new Error(
      `Failed to fetch playlist by params: ${error.response?.data?.error?.message || error.message}`
    );
  }
}