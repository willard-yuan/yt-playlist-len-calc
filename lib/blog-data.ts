export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 3,
    title: "How to Search a Video Inside a YouTube Playlist: V1.4.4 New Version Release!",
    slug: "how-to-search-video-inside-youtube-playlist",
    excerpt: "Struggling to find a specific video in a massive YouTube playlist? You're not alone. Discover how our latest V1.4.4 update solves this 8-year-old problem with instant playlist searching.",
    coverImage: "/blog-images/How_to_Search_a_Video_Inside_Youtube_Playlist_1.webp",
    publishDate: "2025-12-27",
    readTime: "5 min read",
    category: "New Features",
    tags: ["YouTube Tips", "Product Update", "Search"],
    featured: true
  },
  {
    id: 2,
    title: "Conquer the 46-Hour Marathon: How to Master Your Time and Finish the World's Most Popular YouTube Playlist",
    slug: "conquer-46-hour-marathon-youtube-most-viewed-playlist",
    excerpt: "A strategic guide to navigating the 500+ videos that define internet culture. Learn how to use our calculator and active planning to finish the 'Most Viewed' playlist.",
    coverImage: "/blog-images/youtube-most-viewed-videos-of-all-time.webp",
    publishDate: "2025-12-20",
    readTime: "10 min read",
    category: "Productivity",
    tags: ["YouTube Trends", "Time Management", "Guide"],
    featured: true
  },
  {
    id: 1,
    title: "How & Why I Have Created Youtube Playlist Length Calculator Web Application?",
    slug: "how-why-created-youtube-playlist-calculator",
    excerpt: "Discover the journey behind creating this powerful YouTube playlist calculator tool. Learn about the challenges, solutions, and technologies used to build a seamless user experience for calculating playlist durations.",
    coverImage: "/YouTube_Playlist_Length_Calculator_1.png",
    publishDate: "2025-01-19",
    readTime: "8 min read",
    category: "Development",
    tags: ["YouTube", "Web Development", "React", "Next.js"],
    featured: false
  }
];
