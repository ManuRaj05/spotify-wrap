export interface WrapData {
  
  totalListenTime: number
  topArtistsByTime: { name: string; value: string }[]
  topArtistsByCount: { name: string; value: string }[]
  topSongsByTime: { name: string; value: string }[]
  topSongsByCount: { name: string; value: string }[]
  genresExplored: number
  newArtistsDiscovered: number
  playlistsCreated: number
  songsLiked: number
}

