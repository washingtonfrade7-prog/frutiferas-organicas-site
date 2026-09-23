import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import FrutiferaCard from '@/components/FrutiferaCard'
import CategoryIcon from '@/components/CategoryIcon'
import BannerSlot from '@/components/BannerSlot'
import YouTubeSection from '@/components/YouTubeSection'
import NewsletterCTA from '@/components/NewsletterCTA'
import AdSlot from '@/components/Ads'
import { categorias } from '@/data/categorias'
import { getDestaques, frutiferas, todosOsVideos } from '@/data/frutiferas'
import { site, youtubeChannelUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: `${site.name} - Frutíferas orgânicas em vaso` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: 'Frutíferas Orgânicas' }],
  },
}

export default function HomePage() {
  const destaques = getDestaques()
  const videosDestaque = todosOsVideos().slice(0, 2)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-700 via-forest-500 to-forest-700 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-terracotta-500/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-100 ring-1 ring-white/15">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21v-8M12 13C9 13 6.5 10.5 6.5 7.5 8.5 8 11 10 12 13zM12 13c3 0 5.5-2.5 5.5-5.5C15.5 8 13 10 12 13z" />
                </svg>
                Cultivo orgânico em vaso
              </span>

              <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.08] font-display text-balance">
                Frutíferas orgânicas<br className="hidden sm:block" /> na sua varanda ou quintal
              </h1>

              <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-cream-100/90">
                Aprenda a plantar, cuidar e colher {frutiferas.length}+ frutíferas em vaso e descubra
                onde comprar mudas e insumos com nossos parceiros.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/frutiferas"
                  className="inline-flex items-center gap-2 bg-cream-50 text-forest-700 font-semibold px-7 py-3 rounded-full hover:bg-cream-100 transition shadow-lg"
                >
                  Explorar frutíferas
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 border-2 border-cream-100/70 text-cream-50 font-semibold px-7 py-3 rounded-full hover:bg-cream-100/10 transition"
                >
                  Ver vídeos de cultivo
                </Link>
              </div>

              <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-cream-100/80">
                <div>
                  <dt className="sr-only">Frutíferas</dt>
                  <dd><span className="font-display text-xl font-bold text-white">{frutiferas.length}+</span> frutíferas</dd>
                </div>
                <div>
                  <dt className="sr-only">Vídeos</dt>
                  <dd><span className="font-display text-xl font-bold text-white">2.500+</span> vídeos</dd>
                </div>
                <div>
                  <dt className="sr-only">Inscritos</dt>
                  <dd><span className="font-display text-xl font-bold text-white">88 mil</span> inscritos</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/logo.webp"
                  alt="Logo Frutíferas Orgânicas"
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 320px"
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

      <div className="max-w-7xl mx-auto px-4 pb-4">
        <AdSlot rotulo ezoicId={101} className="min-h-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <BannerSlot
          titulo="Seu kit de cultivo orgânico começa aqui"
          subtitulo="Substratos, adubos e ferramentas selecionados pelos nossos parceiros para você produzir frutas de verdade em casa."
          ctaLabel="Ver ofertas dos parceiros"
          ctaHref="/frutiferas"
          imagem="/banners/banner-final.webp"
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

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <NewsletterCTA origem="home" />
      </section>

      <section className="bg-gradient-to-r from-forest-700 to-forest-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2 font-display">Ficou com alguma dúvida?</h2>
          <p className="text-cream-100 text-sm mb-6">
            Fale com a gente por e-mail ou acompanhe o canal para mais dicas de cultivo orgânico.
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
