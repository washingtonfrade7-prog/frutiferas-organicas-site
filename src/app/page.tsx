import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import FrutiferaCard from '@/components/FrutiferaCard'
import CategoryIcon from '@/components/CategoryIcon'
import BannerSlot from '@/components/BannerSlot'
import YouTubeSection from '@/components/YouTubeSection'
import { categorias } from '@/data/categorias'
import { getDestaques, frutiferas, todosOsVideos } from '@/data/frutiferas'
import { site, youtubeChannelUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: `${site.name} - Frutíferas orgânicas em vaso` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
}

export default function HomePage() {
  const destaques = getDestaques()
  const videosDestaque = todosOsVideos().slice(0, 2)

  return (
    <>
      <section className="relative bg-gradient-to-br from-forest-700 via-forest-500 to-forest-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-cream-200 mb-3">
                Cultivo orgânico em vaso
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 font-display">
                Frutíferas orgânicas<br />na sua varanda ou quintal
              </h1>
              <p className="text-base md:text-lg text-cream-100 mb-8">
                Aprenda a plantar, cuidar e colher {frutiferas.length}+ frutíferas em vaso e descubra
                onde comprar mudas e insumos com nossos parceiros.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/frutiferas" className="bg-cream-50 text-forest-700 font-semibold px-8 py-3 rounded-full hover:bg-cream-100 transition shadow-lg">
                  Explorar frutíferas
                </Link>
                <Link href="/videos" className="border-2 border-cream-100 text-cream-100 font-semibold px-8 py-3 rounded-full hover:bg-cream-100/10 transition">
                  Ver vídeos de cultivo
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src="/banners/pomar.jpg"
                  alt="Pai e filho caminhando em um pomar de frutíferas orgânicas"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-50 to-transparent" />
      </section>

      <section id="categorias" className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="bg-white rounded-xl shadow-sm border border-cream-200 p-5 text-center hover:shadow-md hover:border-forest-300 transition group flex flex-col items-center justify-center"
            >
              <CategoryIcon category={cat.slug} size="lg" className="mb-3 text-forest-500 group-hover:text-terracotta-500 transition" />
              <span className="text-sm font-semibold text-ink-900 group-hover:text-forest-600 transition">{cat.nome}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-ink-900 font-display">Frutíferas em destaque</h2>
          <Link href="/frutiferas" className="text-sm text-forest-600 font-medium hover:underline">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destaques.map((fruta) => (
            <FrutiferaCard key={fruta.slug} fruta={fruta} />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <BannerSlot
          titulo="Seu kit de cultivo orgânico começa aqui"
          subtitulo="Substratos, adubos e ferramentas selecionados pelos nossos parceiros para você produzir frutas de verdade em casa."
          ctaLabel="Ver ofertas dos parceiros"
          ctaHref="/frutiferas"
          imagem="/banners/pomar-wide.jpg"
        />
      </div>

      <section className="bg-white py-12 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-ink-900 text-center mb-10 font-display">
            Por que cultivar frutíferas orgânicas em vaso?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { titulo: 'Espaço reduzido', desc: 'Produza frutas mesmo em varandas e apartamentos, com vasos a partir de 20 litros.' },
              { titulo: 'Sem agrotóxicos', desc: 'Controle total sobre o que você consome, usando adubação orgânica e manejo natural.' },
              { titulo: 'Colheita na porta', desc: 'Frutas frescas e maduras no ponto, colhidas na hora de consumir.' },
              { titulo: 'Aprendizado guiado', desc: 'Vídeos e fichas de cultivo passo a passo para cada espécie.' },
            ].map((item) => (
              <div key={item.titulo} className="bg-cream-50 rounded-xl p-6 border border-cream-200">
                <h3 className="font-semibold text-base text-ink-900 mb-2">{item.titulo}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <YouTubeSection
          videos={videosDestaque}
          titulo="Assista e aprenda antes de comprar"
          descricao="Vídeos do nosso canal sobre plantio, poda e colheita de frutíferas orgânicas em vaso."
        />
        <div className="mt-6 text-center">
          <a
            href={youtubeChannelUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest-700 font-semibold hover:text-terracotta-600 transition"
          >
            Ver todos os vídeos no canal
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
            </svg>
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <BannerSlot
          variante="compact"
          titulo="Encontre a muda certa para o seu espaço"
          subtitulo="Comparamos lojas parceiras para você comprar com segurança, sem sair de casa."
          ctaLabel="Onde comprar"
          ctaHref="/frutiferas"
        />
      </section>

      <section className="bg-gradient-to-r from-forest-700 to-forest-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2 font-display">Ficou com alguma dúvida?</h2>
          <p className="text-cream-100 text-sm mb-6">
            Fale com a gente pelo WhatsApp ou acompanhe o canal para mais dicas de cultivo orgânico.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contato" className="bg-white text-forest-700 font-semibold px-6 py-2.5 rounded-full hover:bg-cream-100 transition text-sm">
              Falar com a gente
            </Link>
            <a
              href={youtubeChannelUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-cream-100 text-cream-100 font-semibold px-6 py-2.5 rounded-full hover:bg-cream-100/10 transition text-sm"
            >
              Inscrever-se no canal
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
