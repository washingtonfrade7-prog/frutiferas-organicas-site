import type { Metadata } from 'next'
import Link from 'next/link'
import YouTubeSection from '@/components/YouTubeSection'
import BannerSlot from '@/components/BannerSlot'
import JsonLd from '@/components/JsonLd'
import { guias } from '@/data/guias'
import { breadcrumbJsonLd } from '@/lib/seo'
import { site, youtubeChannelUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Guias de cultivo de frutíferas em vaso',
  description:
    'Guias práticos de plantio, poda, adubação orgânica, cuidados, floração e gastronomia para cultivar frutíferas em vaso.',
  alternates: { canonical: '/guias' },
  openGraph: { url: '/guias', title: `Guias de cultivo - ${site.name}` },
}

export default function GuiasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Guias', path: '/guias' },
        ])}
      />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Guias</span>
      </nav>

      <header className="max-w-3xl mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Guias de cultivo</h1>
        <p className="text-ink-500">
          Aprenda as técnicas essenciais para cultivar frutíferas orgânicas em vaso. Vídeos do nosso
          canal organizados por tema.
        </p>
        <a
          href={youtubeChannelUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-forest-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-forest-700 transition"
        >
          Inscrever-se no canal
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
          </svg>
        </a>
      </header>

      <div className="space-y-16">
        {guias.map((guia) => (
          <section key={guia.slug} id={guia.slug}>
            <h2 className="text-xl font-bold font-display mb-1">{guia.nome}</h2>
            <p className="text-sm text-ink-500 mb-5">{guia.descricao}</p>
            <YouTubeSection videos={guia.videos.slice(0, 4)} titulo="" />
          </section>
        ))}
      </div>

      <div className="mt-14">
        <BannerSlot
          titulo="Aprenda e comece a plantar hoje"
          subtitulo="Escolha sua frutífera e veja onde comprar mudas e insumos."
          ctaLabel="Ver frutíferas"
          ctaHref="/frutiferas"
        />
      </div>
    </div>
  )
}
