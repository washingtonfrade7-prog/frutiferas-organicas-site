import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import YouTubeSection from '@/components/YouTubeSection'
import BannerSlot from '@/components/BannerSlot'
import AdSlot from '@/components/Ads'
import { frutiferas } from '@/data/frutiferas'
import { playlists } from '@/data/playlists'
import { site, youtubeChannelUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Vídeos de cultivo de frutíferas em vaso',
  description:
    'Coleção de vídeos sobre plantio, poda, adubação e colheita de frutíferas orgânicas em vaso. Aprenda antes de comprar suas mudas.',
  alternates: { canonical: '/videos' },
  openGraph: { url: '/videos', title: `Vídeos de cultivo - ${site.name}` },
}

export default function VideosPage() {
  const porFruta = frutiferas.filter((f) => f.videos.length > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Vídeos</span>
      </nav>

      <header className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-10">
        <div className="lg:col-span-2 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Vídeos de cultivo</h1>
          <p className="text-ink-500">
            Aprenda na prática como plantar, podar e colher frutíferas orgânicas em vaso. Conteúdo do
            nosso canal no YouTube, organizado por espécie.
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
        </div>
        <div className="hidden lg:block">
          <Image
            src="/banners/inscreva-se.png"
            alt="Inscreva-se no canal Frutíferas Orgânicas"
            width={700}
            height={466}
            className="w-full h-auto"
          />
        </div>
      </header>

      <AdSlot rotulo className="mb-10 min-h-[90px]" />

      <div className="space-y-14">
        {porFruta.map((fruta) => (          <section key={fruta.slug}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-display">{fruta.nome}</h2>
              <Link href={`/frutiferas/${fruta.slug}`} className="text-sm text-forest-600 font-medium hover:underline">
                Ver ficha →
              </Link>
            </div>
            <YouTubeSection videos={fruta.videos.slice(0, 3)} titulo="" />
          </section>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold font-display mb-1">Playlists do canal</h2>
        <p className="text-sm text-ink-500 mb-5">
          Coleções organizadas por frutífera e por técnica. Abra no YouTube para assistir na sequência.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((pl) => (
            <a
              key={pl.id}
              href={pl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-sm border border-cream-200 p-5 hover:shadow-md hover:border-forest-300 transition"
            >
              <div className="flex items-center gap-2 text-xs text-terracotta-600 font-semibold uppercase tracking-wide mb-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h10v2H4zm0 5h10v2H4zm0 5h10v2H4zm14-5-4 3 4 3z" />
                </svg>
                Playlist · {pl.total} vídeos
              </div>
              <h3 className="font-semibold text-ink-900 group-hover:text-forest-700 transition leading-snug">
                {pl.titulo}
              </h3>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <BannerSlot
          titulo="Quer começar sua coleção?"
          subtitulo="Veja as frutíferas disponíveis e onde comprar as melhores mudas."
          ctaLabel="Ver frutíferas"
          ctaHref="/frutiferas"
        />
      </div>
    </div>
  )
}
