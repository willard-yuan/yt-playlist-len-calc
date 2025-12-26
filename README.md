# YouTube Playlist Duration Calculator

A powerful and user-friendly tool to instantly calculate the total duration of any YouTube playlist. Just paste the URL and get a detailed time breakdown of all the videos in the playlist.

Demo: <a href="https://ytplaylistlength.pro/" rel="dofollow"><strong>YouTube Playlist Length Calculator</strong></a>

## Features

- ⚡ **Instant Calculation**: Quickly fetch and calculate total duration.
- 🎯 **Precise Breakdown**: See the duration of individual videos.
- 🌗 **Dark Mode Support**: Seamlessly switch between light and dark themes.
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile.
- 🔢 **Range Selection**: Calculate duration for a specific range of videos within a playlist.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Radix UI Icons](https://icons.radix-ui.com/)
- **API**: [YouTube Data API v3](https://developers.google.com/youtube/v3)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js installed on your machine.
- A Google Cloud Project with YouTube Data API v3 enabled.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/willard-yuan/yt-playlist-len-calc
   cd yt-playlist-len-calc
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your YouTube Data API key:

   ```env
   API_KEY=your_youtube_api_key_here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Copy the URL of a YouTube playlist (e.g., `https://www.youtube.com/playlist?list=PL...`).
2. Paste it into the search bar on the homepage.
3. Click the search button.
4. View the total duration and details of the playlist.

## License

This project is licensed under the MIT License.

---

[YouTube Playlist Length](https://ytplaylistlength.pro/)
