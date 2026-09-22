import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BotaoAfiliado from '@/components/BotaoAfiliado'
import { frutiferas } from '@/data/frutiferas'
import { categorias } from '@/data/categorias'
import { LISTA_MERCADO_LIVRE } from '@/data/afiliados'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mudas de frutíferas: onde comprar muda de cada espécie',
  description:
    'Guia de mudas de frutíferas: onde comprar muda de jabuticaba, acerola, citros, pitanga e mais de 100 espécies, com faixa de preço e dicas para escolher.',
  alternates: { canonical: '/mudas' },
  openGraph: { url: '/mudas', title: `Mudas de frutíferas - ${site.name}` },
}

export default function MudasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Mudas', path: '/mudas' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          frutiferas.map((f) => ({ name: `Muda de ${f.nome}`, url: absoluteUrl(`/mudas/${f.slug}`) }))
        )}
      />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Mudas</span>
      </nav>

      <header className="max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">
          Onde comprar muda de frutíferas
        </h1>
        <p className="text-ink-600 leading-relaxed">
          Escolha a espécie e veja onde comprar a muda, quanto costuma custar e como escolher uma
          planta saudável. São {frutiferas.length} frutíferas com página dedicada de muda.
        </p>
        <div className="mt-5 max-w-md">
          <BotaoAfiliado
            href={LISTA_MERCADO_LIVRE}
            loja="Mercado Livre"
            label="Ver mudas"
            categoria="mudas"
            pagina="mudas"
            posicao="topo"
            descricao="Mudas enxertadas e insumos com envio para todo o Brasil"
          >
            Ver mudas disponíveis
          </BotaoAfiliado>
        </div>
      </header>

      {categorias.map((cat) => {
        const lista = frutiferas.filter((f) => f.categorias.includes(cat.slug))
        if (lista.length === 0) return null
        return (
          <section key={cat.slug} className="mb-10">
            <h2 className="text-xl font-bold mb-3 font-display">{cat.nome}</h2>
            <ul className="flex flex-wrap gap-2">
              {lista.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/mudas/${f.slug}`}
                    className="inline-block rounded-full border border-cream-200 bg-white px-4 py-1.5 text-sm text-ink-700 hover:border-forest-300 hover:text-forest-700 transition"
                  >
                    Muda de {f.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <p className="mt-10 text-[11px] text-ink-500 leading-relaxed">
        Links de afiliado. Ao comprar por nossos links, podemos receber uma comissão sem custo
        adicional para você.
      </p>
    </div>
  )
}
