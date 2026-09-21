import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FruitVisual from '@/components/FruitVisual'
import AffiliateButton from '@/components/AffiliateButton'
import YouTubeSection from '@/components/YouTubeSection'
import BannerSlot from '@/components/BannerSlot'
import JsonLd from '@/components/JsonLd'
import { frutiferas, getFrutifera } from '@/data/frutiferas'
import { getCategoria } from '@/data/categorias'
import { breadcrumbJsonLd, fruitJsonLd, videoJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return frutiferas.map((f) => ({ slug: f.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const fruta = getFrutifera(params.slug)
  if (!fruta) return { title: 'Frutífera não encontrada' }

  const titulo = `${fruta.nome} (${fruta.nomeCientifico}) - Como cultivar em vaso`
  const descricao = fruta.resumo
  const url = `/frutiferas/${fruta.slug}`

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: site.name,
      title: `${titulo} - ${site.name}`,
      description: descricao,
    },
    twitter: { card: 'summary_large_image', title: titulo, description: descricao },
    robots: { index: true, follow: true },
  }
}

export default function FrutiferaPage({ params }: PageProps) {
  const fruta = getFrutifera(params.slug)
  if (!fruta) notFound()

  const categoriaPrincipal = getCategoria(fruta.categorias[0])
  const outras = frutiferas.filter((f) => f.slug !== fruta.slug).slice(0, 3)

  const ficha = [
    { label: 'Nome científico', valor: fruta.nomeCientifico },
    { label: 'Família', valor: fruta.familia },
    { label: 'Origem', valor: fruta.origem },
    { label: 'Porte', valor: fruta.porte },
    { label: 'Luminosidade', valor: fruta.luz },
    { label: 'Rega', valor: fruta.rega },
    { label: 'Solo', valor: fruta.solo },
    { label: 'Vaso recomendado', valor: fruta.vaso },
    { label: 'Dificuldade', valor: fruta.dificuldade },
    { label: 'Tempo até produzir', valor: fruta.tempoProducao },
    { label: 'Frutificação', valor: fruta.frutificacao },
  ]

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Frutíferas', path: '/frutiferas' },
    ...(categoriaPrincipal ? [{ name: categoriaPrincipal.nome, path: `/categorias/${categoriaPrincipal.slug}` }] : []),
    { name: fruta.nome, path: `/frutiferas/${fruta.slug}` },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <JsonLd
        data={fruitJsonLd({
          nome: fruta.nome,
          nomeCientifico: fruta.nomeCientifico,
          descricao: fruta.resumo,
          slug: fruta.slug,
          categoriaNome: categoriaPrincipal?.nome || 'Frutíferas',
          ofertas: fruta.ofertas,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {fruta.videos.length > 0 && <JsonLd data={videoJsonLd(fruta.videos)} />}

      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <Link href="/frutiferas" className="hover:text-forest-600">Frutíferas</Link>
        <span>/</span>
        {categoriaPrincipal && (
          <>
            <Link href={`/categorias/${categoriaPrincipal.slug}`} className="hover:text-forest-600">
              {categoriaPrincipal.nome}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-ink-900 font-medium">{fruta.nome}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FruitVisual nome={fruta.nome} cor={fruta.cor} className="rounded-2xl h-80 md:h-96" size="lg" />

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {fruta.destaque && <span className="bg-terracotta-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Destaque</span>}
            <span className="bg-forest-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{fruta.dificuldade}</span>
            {fruta.categorias.map((c) => (
              <Link key={c} href={`/categorias/${c}`} className="bg-cream-100 text-forest-700 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-cream-200 transition">
                {getCategoria(c)?.nome}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-1">{fruta.nome}</h1>
          <p className="text-ink-500 italic mb-4">{fruta.nomeCientifico}</p>
          <p className="text-ink-600 leading-relaxed mb-6">{fruta.resumo}</p>

          <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-4">
            <h2 className="font-semibold text-ink-900 mb-3">Onde comprar</h2>
            <div className="space-y-3">
              {fruta.ofertas.map((oferta, i) => (
                <AffiliateButton
                  key={`${oferta.loja}-${i}`}
                  href={oferta.url}
                  loja={oferta.loja}
                  descricao={oferta.descricao}
                  preco={oferta.preco}
                  destaque={oferta.destaque}
                />
              ))}
            </div>
            <p className="text-[11px] text-ink-500 mt-3 leading-relaxed">
              Links de afiliado. Ao comprar, você apoia o projeto sem pagar nada a mais por isso.
              Consulte o vendedor parceiro para disponibilidade e preços atualizados.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 font-display">Sobre a {fruta.nome}</h2>
        <div className="space-y-4 text-ink-600 leading-relaxed max-w-3xl">
          {fruta.descricao.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
          <h2 className="text-xl font-bold mb-4">Ficha de cultivo</h2>
          <dl className="divide-y divide-cream-200">
            {ficha.map((item) => (
              <div key={item.label} className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-sm text-ink-500">{item.label}</dt>
                <dd className="text-sm font-medium text-ink-900 sm:text-right">{item.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
            <h2 className="text-xl font-bold mb-4">Dicas para cultivar em vaso</h2>
            <ul className="space-y-2.5">
              {fruta.dicas.map((dica, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-600">
                  <span className="text-forest-500 font-bold">✓</span>
                  {dica}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
            <h2 className="text-xl font-bold mb-4">Você sabia?</h2>
            <ul className="space-y-2.5">
              {fruta.curiosidades.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-600">
                  <span className="text-terracotta-500 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {fruta.videos.length > 0 && (
        <div className="mt-12">
          <YouTubeSection
            videos={fruta.videos}
            titulo={`Vídeos sobre ${fruta.nome}`}
            descricao="Assista ao cultivo na prática antes de escolher sua muda."
          />
        </div>
      )}

      <div className="mt-12">
        <BannerSlot
          titulo={`Comece a cultivar ${fruta.nome} hoje mesmo`}
          subtitulo="Mudas, substrato e insumos nos parceiros selecionados."
          ctaLabel="Ver catálogo completo"
          ctaHref="/frutiferas"
        />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 font-display">Outras frutíferas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {outras.map((outra) => (
            <Link
              key={outra.slug}
              href={`/frutiferas/${outra.slug}`}
              className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-cream-200 p-4 hover:shadow-md transition group"
            >
              <FruitVisual nome={outra.nome} cor={outra.cor} className="rounded-lg w-16 h-16 shrink-0" size="sm" />
              <span>
                <span className="block font-semibold text-ink-900 group-hover:text-forest-700 transition">{outra.nome}</span>
                <span className="block text-xs italic text-ink-500">{outra.nomeCientifico}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
