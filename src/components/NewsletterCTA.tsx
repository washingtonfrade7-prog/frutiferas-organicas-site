import NewsletterForm from '@/components/NewsletterForm'

interface NewsletterCTAProps {
  titulo?: string
  subtitulo?: string
  origem?: string
  className?: string
}

export default function NewsletterCTA({
  titulo = 'Receba dicas de cultivo em vaso',
  subtitulo = 'Uma vez por semana: dicas práticas, novidades do canal e ofertas de mudas e insumos.',
  origem = 'site',
  className = '',
}: NewsletterCTAProps) {
  return (
    <section className={`rounded-2xl border border-cream-200 bg-cream-50 p-6 md:p-8 ${className}`}>
      <div className="max-w-2xl">
        <h2 className="text-xl md:text-2xl font-bold mb-2 font-display text-ink-900">{titulo}</h2>
        <p className="text-sm text-ink-600 mb-5">{subtitulo}</p>
        <NewsletterForm origem={origem} />
      </div>
    </section>
  )
}
