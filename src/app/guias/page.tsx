import type { Metadata } from 'next'
import Link from 'next/link'
import BannerSlot from '@/components/BannerSlot'
import JsonLd from '@/components/JsonLd'
import { topicos } from '@/data/aprender'
import { guias } from '@/data/guias'
import { breadcrumbJsonLd } from '@/lib/seo'
import { site, youtubeChannelUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Guias de cultivo de frutíferas em vaso',
  description:
    'Aprenda a plantar, adubar, podar e colher frutíferas orgânicas em vaso. Guias completos com passo a passo, dicas, erros comuns e vídeos práticos.',
  alternates: { canonical: '/guias' },
  openGraph: { url: '/guias', title: `Guias de cultivo - ${site.name}` },
}

export default function GuiasPage() {
  const totalVideos = guias.reduce((acc, g) => acc + g.videos.length, 0)

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
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">Guias de cultivo</h1>
        <p className="text-ink-500">
          Tudo o que você precisa para cultivar frutíferas orgânicas em vaso: plantio, adubação,
          poda, colheita, cuidados e tour pelo pomar. Conteúdo escrito + {totalVideos} vídeos
          práticos do canal.
        </p>
        <a
          href={youtubeChannelUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-forest-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-forest-700 transition"
        >
          Inscrever-se no canal
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
          </svg>
        </a>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {topicos.map((topico) => {
          const qtd = guias.find((g) => g.slug === topico.slug)?.videos.length ?? 0
          return (
            <Link
              key={topico.slug}
              href={`/guias/${topico.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-cream-200 shadow-sm p-6 hover:shadow-md hover:border-forest-300 transition"
            >
              <span className="inline-flex w-10 h-10 rounded-xl bg-forest-50 text-forest-600 items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <h2 className="font-display font-bold text-lg text-ink-900 group-hover:text-forest-700 transition mb-2">
                {topico.nome}
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed flex-1">{topico.resumo}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-700">
                Ler o guia{qtd > 0 ? ` · ${qtd} vídeos` : ''}
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          )
        })}
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
