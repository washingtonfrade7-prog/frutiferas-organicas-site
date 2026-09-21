import Link from 'next/link'
import Image from 'next/image'

interface BannerSlotProps {
  titulo: string
  subtitulo?: string
  ctaLabel?: string
  ctaHref?: string
  imagem?: string
  variante?: 'wide' | 'compact'
  className?: string
}

export default function BannerSlot({
  titulo,
  subtitulo,
  ctaLabel,
  ctaHref,
  imagem,
  variante = 'wide',
  className = '',
}: BannerSlotProps) {
  const isExternal = !!ctaHref && /^https?:\/\//.test(ctaHref)
  const altura = variante === 'compact' ? 'py-8' : 'py-10 md:py-14'

  const conteudo = (
    <>
      {imagem ? (
        <>
          <Image src={imagem} alt={titulo} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-forest-900/55 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-forest-700 via-forest-600 to-terracotta-600" />
      )}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 ${altura} text-white`}>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-cream-200 mb-2">Frutíferas Orgânicas</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">{titulo}</h3>
          {subtitulo && <p className="text-cream-100 text-sm md:text-base mt-2">{subtitulo}</p>}
          {ctaLabel && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-sm font-semibold text-forest-700 hover:bg-cream-100 transition">
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </>
  )

  const wrapperClass = `relative block overflow-hidden rounded-2xl border border-cream-200 ${className}`

  if (ctaHref && isExternal) {
    return (
      <a href={ctaHref} target="_blank" rel="sponsored noopener noreferrer" className={wrapperClass}>
        {conteudo}
      </a>
    )
  }

  if (ctaHref) {
    return (
      <Link href={ctaHref} className={wrapperClass}>
        {conteudo}
      </Link>
    )
  }

  return <div className={wrapperClass}>{conteudo}</div>
}
