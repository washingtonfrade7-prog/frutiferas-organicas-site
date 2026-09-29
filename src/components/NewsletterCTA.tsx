import Link from 'next/link'

interface NewsletterCTAProps {
  titulo?: string
  subtitulo?: string
  origem?: string
  className?: string
}

/**
 * Faixa de captura (isca digital) usada em home, guias e comprar.
 * Leva para /guia-gratuito, onde o PDF e liberado na hora.
 */
export default function NewsletterCTA({
  titulo = 'Baixe o guia grátis: 10 frutíferas fáceis',
  subtitulo = 'As 10 frutíferas mais fáceis de cultivar em vaso, o plantio em 5 passos e a regra de ouro da rega. Grátis em PDF.',
  className = '',
}: NewsletterCTAProps) {
  return (
    <section className={`rounded-2xl border border-cream-200 bg-cream-50 p-6 md:p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
            Guia gratuito
          </p>
          <h2 className="text-xl md:text-2xl font-bold mb-2 font-display text-ink-900">{titulo}</h2>
          <p className="text-sm text-ink-600">{subtitulo}</p>
        </div>
        <div className="shrink-0">
          <Link
            href="/guia-gratuito"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-7 py-3.5 text-base font-bold text-white hover:bg-terracotta-700 transition"
          >
            Quero o guia grátis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
