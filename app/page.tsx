'use client'

import { useState } from 'react'
import FileUpload from './components/file-upload'
import TotalListenTime from './components/total-listen-time'
import TopList from './components/top-list'
import { WrapData } from './types/wrap-data'

export default function SpotifyWrap() {
  const [wrapData, setWrapData] = useState<WrapData | null>(null)

  const handleDataUpload = (data: WrapData) => {
    setWrapData(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#181818] text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-12 text-white">Your Spotify Wrap</h1>
        {!wrapData ? (
          <FileUpload onDataProcessed={handleDataUpload} />
        ) : (
          <div className="space-y-12">
            <TotalListenTime hours={wrapData.totalListenTime} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TopList title="Top Songs by Listen Time" items={wrapData.topSongsByTime} icon="clock" />
              <TopList title="Top Songs by Play Count" items={wrapData.topSongsByCount} icon="play" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TopList title="Top Artists by Listen Time" items={wrapData.topArtistsByTime} icon="clock" />
              <TopList title="Top Artists by Play Count" items={wrapData.topArtistsByCount} icon="play" />
            </div>
            
          </div>
        )}
      </main>
    </div>
  )
}

