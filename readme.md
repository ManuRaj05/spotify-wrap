# Spotify Wrap
**Spotify Wrapped, not yearly but whenever you want**
## Deployment
You can access the deployed version of the project at [GitHub Pages](https://agilarasu.github.io/spotify-wrap).


## Features

- Upload and process Spotify data export files
- Display total listening time in days and hours
- Show top artists by listen time and play count
- Show top songs by listen time and play count
- Dark-themed UI inspired by Spotify's design

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- JSZip (for processing ZIP files)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/agilarasu/spotify-wrap.git
   cd spotify-wrap
   ```

2. Install the dependencies:
   ```
   npm install
   # or
   yarn install
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Click on the "Select File" button and choose your Spotify data export ZIP file

4. Wait for the data to be processed and view your personalized Spotify Wrap

## How to Get Your Spotify Data

1. Go to your Spotify account page: https://www.spotify.com/account
2. Navigate to Privacy settings
3. Scroll down to "Download your data" and request your data
4. Wait for an email from Spotify (this may take up to 30 days)
5. Download your data ZIP file

## Disclaimer

This project is not affiliated with, endorsed, or sponsored by Spotify. It is an independent tool created for educational purposes and personal use.