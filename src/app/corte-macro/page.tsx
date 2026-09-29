import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'O corte em macro — enxertia | Frutíferas Orgânicas',
  description:
    'Vídeo curto, em macro, mostrando o corte da borbulha para enxertia de uva. Assista antes de fazer o seu.',
  alternates: { canonical: '/corte-macro' },
  robots: { index: false, follow: true },
}

export default function CorteMacroPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">O corte em macro</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display leading-tight">
        O corte em macro
      </h1>
      <p className="text-ink-600 leading-relaxed mb-6">
        A enxertia é uma habilidade de mão. Antes de tentar o seu corte, veja de perto — em macro — como a
        faca entra e abre a borbulha. São poucos segundos, sem introdução: só a lâmina e o encaixe.
      </p>

      <div className="rounded-2xl overflow-hidden border border-cream-200 bg-black shadow-sm">
        <video
          className="w-full h-auto"
          controls
          playsInline
          preload="metadata"
          poster="/videos/corte-macro-poster.jpg"
        >
          <source src="/videos/corte-macro.mp4" type="video/mp4" />
          Seu navegador não reproduz este vídeo. Baixe em{' '}
          <a href="/videos/corte-macro.mp4" className="underline">/videos/corte-macro.mp4</a>.
        </video>
      </div>

      <p className="text-sm text-ink-500 mt-4">
        Dica: assista quantas vezes precisar. Depois, corte devagar — faca afiada e limpa, e a base em
        ângulo, logo abaixo de um nó.
      </p>

      <div className="mt-8 rounded-2xl border border-cream-200 bg-cream-50 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
          Quer ir mais fundo?
        </p>
        <h2 className="text-xl font-bold mb-2 font-display">Multiplicação de Mudas na Prática</h2>
        <p className="text-sm text-ink-600 mb-4">
          Estaquia, alporque e enxertia, com o método certo para cada espécie — para você nunca mais
          depender de comprar planta.
        </p>
        <Link
          href="/multiplicacao"
          className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-6 py-3 text-sm font-bold text-white hover:bg-terracotta-700 transition"
        >
          Ver o módulo completo
        </Link>
      </div>
    </div>
  )
}
