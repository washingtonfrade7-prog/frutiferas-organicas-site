import VideoEmbed from '@/components/VideoEmbed'
import type { Video } from '@/data/frutiferas'

interface YouTubeSectionProps {
  videos: Video[]
  titulo?: string
  descricao?: string
  colunas?: 1 | 2
  className?: string
}

export default function YouTubeSection({
  videos,
  titulo = 'Aprenda a cultivar em vídeo',
  descricao,
  colunas = 2,
  className = '',
}: YouTubeSectionProps) {
  if (videos.length === 0) return null

  const grid = colunas === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'

  return (
    <section className={className}>
      {(titulo || descricao) && (
        <div className="mb-6">
          {titulo && <h2 className="text-2xl font-bold text-ink-900 font-display">{titulo}</h2>}
          {descricao && <p className="text-sm text-ink-500 mt-1">{descricao}</p>}
        </div>
      )}
      <div className={`grid ${grid} gap-5`}>
        {videos.map((video) => (
          <figure key={video.id} className="bg-white rounded-xl shadow-sm border border-cream-200 overflow-hidden">
            <VideoEmbed id={video.id} titulo={video.titulo} />
            <figcaption className="p-4 text-sm font-medium text-ink-700">{video.titulo}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
