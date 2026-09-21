export function embedVideoUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const trimmed = url.trim()
  const yt = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  )
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`
  const vimeo = trimmed.match(/(?:vimeo\.com\/)(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return null
}

export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null
  const match = url.trim().match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  )
  return match ? match[1] : null
}

export function youtubeThumbnail(url: string | null | undefined): string | null {
  const id = youtubeId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}
