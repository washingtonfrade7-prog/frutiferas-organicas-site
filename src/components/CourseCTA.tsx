import Link from 'next/link'
import { produto } from '@/data/produto'

interface CourseCTAProps {
  /** Contexto para variar a chamada (opcional). */
  titulo?: string
  texto?: string
  className?: string
}

/**
 * Faixa de venda do curso/e-book para as paginas de conteudo (fichas, guias,
 * mudas). O trafego chega pelo SEO/YouTube; aqui convertemos em venda.
 */
export default function CourseCTA({
  titulo = 'Quer colher frutas de verdade em vaso?',
  texto = 'O guia completo do plantio à colheita: e-book, 8 videoaulas práticas e workbook com o Desafio 90 Dias.',
  className = '',
}: CourseCTAProps) {
  return (
    <section className={`rounded-2xl bg-forest-900 text-cream-100 p-6 md:p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-terracotta-200 mb-2">
            Curso + e-book
          </p>
          <h2 className="text-xl md:text-2xl font-bold font-display mb-2">{titulo}</h2>
          <p className="text-cream-200 text-sm md:text-base leading-relaxed">{texto}</p>
          <p className="mt-3 text-sm text-cream-200">
            De <span className="line-through">{produto.precoDe}</span> por{' '}
            <strong className="text-white text-lg">{produto.preco}</strong> · 7 dias de garantia
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/curso"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-7 py-4 text-base font-bold text-white hover:bg-terracotta-700 transition"
          >
            Conhecer o curso
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
