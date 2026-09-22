import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TabelaComparativa from '@/components/TabelaComparativa'
import JsonLd from '@/components/JsonLd'
import AdSlot from '@/components/Ads'
import {
  categoriasCompra,
  getCategoriaCompra,
  produtosPorCategoria,
} from '@/data/produtos'
import { artigosComerciais } from '@/data/melhores'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

interface PageProps {
  params: { categoria: string }
}

export function generateStaticParams() {
  return categoriasCompra.map((c) => ({ categoria: c.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cat = getCategoriaCompra(params.categoria)
  if (!cat) return { title: 'Categoria não encontrada' }
  return {
    title: `${cat.nome} para frutíferas em vaso: onde comprar`,
    description: cat.descricao,
    alternates: { canonical: `/comprar/${cat.slug}` },
    openGraph: { url: `/comprar/${cat.slug}`, title: `${cat.nome} - ${site.name}` },
  }
}

export default function CategoriaCompraPage({ params }: PageProps) {
  const cat = getCategoriaCompra(params.categoria)
  if (!cat) notFound()

  const lista = produtosPorCategoria(cat.slug)
  const guiasRelacionados = artigosComerciais.filter((a) =>
    a.produtos.some((p) => lista.some((prod) => prod.slug === p))
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Onde comprar', path: '/comprar' },
          { name: cat.nome, path: `/comprar/${cat.slug}` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          lista.map((p) => ({ name: p.nome, url: absoluteUrl(`/comprar/${cat.slug}`) }))
        )}
      />

      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <Link href="/comprar" className="hover:text-forest-600">Onde comprar</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">{cat.nome}</span>
      </nav>

      <header className="max-w-3xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">
          {cat.nome} para frutíferas em vaso
        </h1>
        <p className="text-ink-600 leading-relaxed">{cat.resumo}</p>
      </header>

      <TabelaComparativa produtos={lista} pagina={`comprar-${cat.slug}`} posicao="tabela" />

      <AdSlot rotulo ezoicId={104} className="mt-10 min-h-[90px]" />

      {guiasRelacionados.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 font-display">Guias de compra relacionados</h2>
          <ul className="space-y-3">
            {guiasRelacionados.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/melhores/${a.slug}`}
                  className="text-forest-700 font-medium hover:underline"
                >
                  {a.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-[11px] text-ink-500 leading-relaxed">
        Links de afiliado. Ao comprar por nossos links, podemos receber uma comissão sem custo
        adicional para você.
      </p>
    </div>
  )
}
