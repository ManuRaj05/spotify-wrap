'use client'

import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import JSZip from 'jszip'
import { WrapData } from '../types/wrap-data'

interface SpotifyDataItem {
  endTime: string
  artistName: string
  trackName: string
  msPlayed: number
}

interface FileUploadProps {
  onDataProcessed: (data: WrapData) => void
}

export default function FileUpload({ onDataProcessed }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processSpotifyData = async (jsonData: SpotifyDataItem[]): Promise<WrapData> => {
    const totalListenTime = jsonData.reduce((total, item) => total + item.msPlayed, 0) / 3600000 // convert to hours

    const artistPlayCounts: { [key: string]: number } = {}
    const songPlayCounts: { [key: string]: number } = {}
    const artistPlayTime: { [key: string]: number } = {}
    const songPlayTime: { [key: string]: number } = {}

    jsonData.forEach((item) => {
      artistPlayCounts[item.artistName] = (artistPlayCounts[item.artistName] || 0) + 1
      songPlayCounts[item.trackName] = (songPlayCounts[item.trackName] || 0) + 1
      artistPlayTime[item.artistName] = (artistPlayTime[item.artistName] || 0) + item.msPlayed
      songPlayTime[item.trackName] = (songPlayTime[item.trackName] || 0) + item.msPlayed
    })

    const topArtistsByCount = Object.entries(artistPlayCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, value: `${count} plays` }))

    const topArtistsByTime = Object.entries(artistPlayTime)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, time]) => ({ name, value: `${Math.round(time / 3600000)} hours` }))

    const topSongsByCount = Object.entries(songPlayCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, value: `${count} plays` }))

    const topSongsByTime = Object.entries(songPlayTime)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, time]) => ({ name, value: `${Math.round(time / 60000)} minutes` }))

    return {
      totalListenTime,
      topArtistsByTime,
      topArtistsByCount,
      topSongsByTime,
      topSongsByCount,
      genresExplored: 0, // This information is not available in the provided data structure
      newArtistsDiscovered: Object.keys(artistPlayCounts).length,
      playlistsCreated: 0, // This information is not available in the provided data structure
      songsLiked: 0, // This information is not available in the provided data structure
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const zip = new JSZip()
      const contents = await zip.loadAsync(file)
      
      let jsonData: SpotifyDataItem[] = []

      console.log('Files in zip:', Object.keys(contents.files))

      for (const [filename, file] of Object.entries(contents.files)) {
        if (filename.startsWith('Spotify Account Data/StreamingHistory_music_') && filename.endsWith('.json')) {
          console.log('Processing file:', filename)
          const content = await file.async('string')
          const parsed: SpotifyDataItem[] = JSON.parse(content)
          jsonData = jsonData.concat(parsed)
        }
      }

      if (jsonData.length === 0) {
        throw new Error('No streaming history files found in the uploaded zip')
      }

      console.log('Total records found:', jsonData.length)
      const processedData = await processSpotifyData(jsonData)
      onDataProcessed(processedData)
    } catch (err) {
      console.error('Error processing file:', err)
      setError(err instanceof Error ? err.message : 'Failed to process the uploaded file')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-[#1E1E1E] rounded-2xl shadow-xl">
      <Upload className="w-24 h-24 text-[#1ED760] mb-6" />
      <h2 className="text-3xl font-bold mb-4">Upload Your Spotify Data</h2>
      <p className="text-center mb-6 text-gray-300 max-w-md">
        Upload your Spotify data ZIP file requested from Spotify to generate your Spotify Wrap.
      </p>
      <label className="cursor-pointer bg-[#1ED760] hover:bg-[#1ED760] text-black font-bold py-3 px-6 rounded-full flex items-center transition-colors duration-300">
        {isUploading ? (
          <>
            <Loader2 key="loader" className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="mr-2" />
            Select File
          </>
        )}
        <input
          type="file"
          accept=".zip"
          className="hidden"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </label>
      <p className="text-sm text-gray-400 mt-2">Your data is processed in the browser and never leaves your device.</p>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  )
}
