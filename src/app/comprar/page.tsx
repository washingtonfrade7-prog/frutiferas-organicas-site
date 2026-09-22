import type { Metadata } from 'next'
import Link from 'next/link'
import BotaoAfiliado from '@/components/BotaoAfiliado'
import JsonLd from '@/components/JsonLd'
import { LISTA_MERCADO_LIVRE } from '@/data/afiliados'
import { categoriasCompra } from '@/data/produtos'
import { artigosComerciais } from '@/data/melhores'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Onde comprar: vasos, substratos, adubos e ferramentas para frutíferas',
  description:
    'Guia de compras para cultivar frutíferas em vaso: vasos, substratos, adubos orgânicos, ferramentas, irrigação e kits de plantio. Compare e compre com segurança.',
  alternates: { canonical: '/comprar' },
  openGraph: { url: '/comprar', title: `Onde comprar - ${site.name}` },
}

export default function ComprarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Onde comprar', path: '/comprar' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          categoriasCompra.map((c) => ({ name: c.nome, url: absoluteUrl(`/comprar/${c.slug}`) }))
        )}
      />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Onde comprar</span>
      </nav>

      <header className="max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">
          Onde comprar para cultivar frutíferas em vaso
        </h1>
        <p className="text-ink-600 leading-relaxed">
          Reunimos os produtos que realmente importam para quem cultiva frutíferas em vaso: vasos,
          substratos, adubos orgânicos, ferramentas, irrigação e kits de plantio. Compare as opções
          e compre pelos nossos parceiros.
        </p>
        <div className="mt-5 max-w-md">
          <BotaoAfiliado
            href={LISTA_MERCADO_LIVRE}
            loja="Mercado Livre"
            label="Ver lista"
            categoria="hub"
            pagina="comprar"
            posicao="topo"
            descricao="Seleção de vasos, substratos e adubos com envio para todo o Brasil"
          >
            Lista de produtos recomendados
          </BotaoAfiliado>
        </div>
      </header>

      <h2 className="text-2xl font-bold mb-4 font-display">Categorias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categoriasCompra.map((cat) => (
          <Link
            key={cat.slug}
            href={`/comprar/${cat.slug}`}
            className="group flex flex-col bg-white rounded-2xl border border-cream-200 shadow-sm p-5 hover:shadow-md hover:border-forest-300 transition"
          >
            <h3 className="font-display font-bold text-base text-ink-900 group-hover:text-forest-700 transition mb-2">
              {cat.nome}
            </h3>
            <p className="text-sm text-ink-500 leading-relaxed flex-1">{cat.descricao}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-700">
              Ver produtos
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-4 font-display">Guias de compra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {artigosComerciais.map((artigo) => (
            <Link
              key={artigo.slug}
              href={`/melhores/${artigo.slug}`}
              className="group block bg-white rounded-2xl border border-cream-200 shadow-sm p-6 hover:shadow-md hover:border-forest-300 transition"
            >
              <h3 className="font-display font-bold text-lg text-ink-900 group-hover:text-forest-700 transition mb-2">
                {artigo.titulo}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">{artigo.resumo}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-700">
                Ler o guia
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-[11px] text-ink-500 leading-relaxed max-w-3xl">
        Links de afiliado. Ao comprar por nossos links, podemos receber uma comissão sem nenhum custo
        adicional para você. Preços e disponibilidade são de responsabilidade do vendedor parceiro.
      </p>
    </div>
  )
}
