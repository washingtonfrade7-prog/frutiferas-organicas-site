'use client'

import { useState } from 'react'

interface VideoEmbedProps {
  id: string
  titulo: string
  className?: string
}

/**
 * Embed leve do YouTube: mostra a miniatura e so carrega o player (iframe)
 * quando o usuario clica. Evita dezenas de players carregando de uma vez.
 */
export default function VideoEmbed({ id, titulo, className = '' }: VideoEmbedProps) {
  const [ativo, setAtivo] = useState(false)
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

  if (ativo) {
    return (
      <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setAtivo(true)}
      aria-label={`Assistir: ${titulo}`}
      className={`relative block w-full group ${className}`}
      style={{ paddingBottom: '56.25%' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={titulo}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg">
          <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
