import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import YouTubeSection from '@/components/YouTubeSection'
import BannerSlot from '@/components/BannerSlot'
import JsonLd from '@/components/JsonLd'
import AdSlot from '@/components/Ads'
import { topicos, getTopico } from '@/data/aprender'
import { guias } from '@/data/guias'
import { breadcrumbJsonLd } from '@/lib/seo'
import { site, youtubeChannelUrl } from '@/lib/site'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return topicos.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const topico = getTopico(params.slug)
  if (!topico) return { title: 'Guia não encontrado' }
  return {
    title: topico.nome,
    description: topico.resumo,
    alternates: { canonical: `/guias/${topico.slug}` },
    openGraph: {
      url: `/guias/${topico.slug}`,
      title: `${topico.nome} - ${site.name}`,
      description: topico.resumo,
    },
  }
}

export default function TopicoPage({ params }: PageProps) {
  const topico = getTopico(params.slug)
  if (!topico) notFound()

  const guia = guias.find((g) => g.slug === topico.slug)
  const videos = guia?.videos ?? []
  const outros = topicos.filter((t) => t.slug !== topico.slug).slice(0, 4)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Guias', path: '/guias' },
          { name: topico.nome, path: `/guias/${topico.slug}` },
        ])}
      />

      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <Link href="/guias" className="hover:text-forest-600">Guias</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">{topico.nome}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">{topico.nome}</h1>
        <p className="text-lg text-ink-500">{topico.resumo}</p>
      </header>

      <article className="prose prose-sm max-w-none text-ink-600 leading-relaxed [&_p]:mb-4">
        {topico.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      <AdSlot rotulo ezoicId={104} className="my-10 min-h-[90px]" />

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-5 font-display">Passo a passo</h2>
        <ol className="space-y-4">
          {topico.passos.map((passo, i) => (
            <li key={i} className="flex gap-4 bg-white rounded-xl border border-cream-200 shadow-sm p-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-forest-600 text-white font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-ink-900 mb-1">{passo.titulo}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{passo.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-forest-50 rounded-xl border border-forest-200 p-6">
          <h2 className="text-xl font-bold mb-3 text-forest-800">Dicas de ouro</h2>
          <ul className="space-y-2.5">
            {topico.dicas.map((dica, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-700">
                <span className="text-forest-500 font-bold">✓</span>
                {dica}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-terracotta-50 rounded-xl border border-terracotta-200 p-6">
          <h2 className="text-xl font-bold mb-3 text-terracotta-700">Evite estes erros</h2>
          <ul className="space-y-2.5">
            {topico.erros.map((erro, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-700">
                <span className="text-terracotta-500 font-bold">×</span>
                {erro}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="mt-12">
          <YouTubeSection
            videos={videos.slice(0, 6)}
            titulo="Assista na prática"
            descricao="Vídeos do canal Frutíferas Orgânicas sobre este tema."
          />
          <div className="mt-5 text-center">
            <a
              href={youtubeChannelUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-forest-700 font-semibold hover:text-terracotta-600 transition"
            >
              Ver mais no canal
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
              </svg>
            </a>
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-5 font-display">Perguntas frequentes</h2>
        <div className="space-y-3">
          {topico.faq.map((item, i) => (
            <details key={i} className="bg-white rounded-xl border border-cream-200 shadow-sm p-5 group">
              <summary className="font-semibold text-ink-900 cursor-pointer list-none flex items-center justify-between gap-3">
                {item.p}
                <span className="text-forest-500 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-sm text-ink-600 leading-relaxed mt-3">{item.r}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <BannerSlot
          titulo="Pronto para começar seu pomar?"
          subtitulo="Veja as frutíferas disponíveis e onde comprar mudas e insumos."
          ctaLabel="Ver frutíferas"
          ctaHref="/frutiferas"
        />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-5 font-display">Continue aprendendo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {outros.map((t) => (
            <Link
              key={t.slug}
              href={`/guias/${t.slug}`}
              className="bg-white rounded-xl border border-cream-200 shadow-sm p-5 hover:shadow-md hover:border-forest-300 transition"
            >
              <h3 className="font-semibold text-ink-900 hover:text-forest-700 transition">{t.nome}</h3>
              <p className="text-sm text-ink-500 mt-1">{t.resumo}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
