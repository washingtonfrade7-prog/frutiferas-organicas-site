import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TabelaComparativa from '@/components/TabelaComparativa'
import BotaoAfiliado from '@/components/BotaoAfiliado'
import JsonLd from '@/components/JsonLd'
import AdSlot from '@/components/Ads'
import { LISTA_MERCADO_LIVRE } from '@/data/afiliados'
import { getProduto, getCategoriaCompra } from '@/data/produtos'
import { artigosComerciais, getArtigoComercial } from '@/data/melhores'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { site } from '@/lib/site'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return artigosComerciais.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const artigo = getArtigoComercial(params.slug)
  if (!artigo) return { title: 'Guia não encontrado' }
  return {
    title: artigo.titulo,
    description: artigo.descricao,
    alternates: { canonical: `/melhores/${artigo.slug}` },
    openGraph: {
      url: `/melhores/${artigo.slug}`,
      title: `${artigo.titulo} - ${site.name}`,
      description: artigo.descricao,
      type: 'article',
    },
  }
}

export default function ArtigoComercialPage({ params }: PageProps) {
  const artigo = getArtigoComercial(params.slug)
  if (!artigo) notFound()

  const produtos = artigo.produtos
    .map((slug) => getProduto(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const categoriasRelacionadas = Array.from(new Set(produtos.map((p) => p.categoria)))
    .map((slug) => getCategoriaCompra(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Guias de compra', path: '/melhores' },
          { name: artigo.h1, path: `/melhores/${artigo.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: artigo.titulo,
          description: artigo.descricao,
          path: `/melhores/${artigo.slug}`,
          published: `${artigo.atualizado}-01`,
        })}
      />
      <JsonLd data={faqJsonLd(artigo.faq)} />

      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <Link href="/melhores" className="hover:text-forest-600">Guias de compra</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">{artigo.h1}</span>
      </nav>

      <header className="max-w-3xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">{artigo.h1}</h1>
        <p className="text-ink-600 leading-relaxed">{artigo.resumo}</p>
        <p className="mt-3 text-xs text-ink-500">Atualizado em {artigo.atualizado}</p>
      </header>

      <TabelaComparativa produtos={produtos} pagina={artigo.slug} posicao="tabela" />

      <AdSlot rotulo ezoicId={103} className="mt-10 min-h-[90px]" />

      <div className="mt-10 space-y-8 max-w-3xl">
        {artigo.secoes.map((secao) => (
          <section key={secao.titulo}>
            <h2 className="text-2xl font-bold mb-3 font-display">{secao.titulo}</h2>
            <div className="space-y-3 text-ink-600 leading-relaxed">
              {secao.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 font-display">Perguntas frequentes</h2>
        <div className="divide-y divide-cream-200 border-y border-cream-200">
          {artigo.faq.map((item) => (
            <details key={item.pergunta} className="py-4 group">
              <summary className="cursor-pointer font-medium text-ink-900 marker:content-none flex items-center justify-between gap-3">
                {item.pergunta}
                <svg className="w-4 h-4 shrink-0 text-forest-600 group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-ink-600 leading-relaxed">{item.resposta}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-10 max-w-md">
        <BotaoAfiliado
          href={LISTA_MERCADO_LIVRE}
          loja="Mercado Livre"
          label="Ver lista"
          pagina={artigo.slug}
          posicao="cta"
          descricao="Seleção de produtos recomendados para frutíferas em vaso"
        >
          Ver produtos recomendados
        </BotaoAfiliado>
      </div>

      {categoriasRelacionadas.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-3 font-display">Categorias relacionadas</h2>
          <ul className="flex flex-wrap gap-2">
            {categoriasRelacionadas.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/comprar/${cat.slug}`}
                  className="inline-block rounded-full bg-cream-100 px-4 py-1.5 text-sm text-forest-700 hover:bg-cream-200 transition"
                >
                  {cat.nome}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-[11px] text-ink-500 leading-relaxed">
        Links de afiliado. Ao comprar por nossos links, podemos receber uma comissão sem custo
        adicional para você. Consulte sempre o vendedor parceiro para preços e disponibilidade.
      </p>
    </article>
  )
}
