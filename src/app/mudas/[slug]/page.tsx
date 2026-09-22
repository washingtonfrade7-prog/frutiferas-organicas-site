import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BotaoAfiliado from '@/components/BotaoAfiliado'
import JsonLd from '@/components/JsonLd'
import AdSlot from '@/components/Ads'
import { frutiferas, getFrutifera } from '@/data/frutiferas'
import { getCategoria } from '@/data/categorias'
import { LISTA_MERCADO_LIVRE } from '@/data/afiliados'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { imgUrl, site } from '@/lib/site'
import {
  comoEscolherMuda,
  dicasDepoisDeComprar,
  faixaPrecoMuda,
  faqMuda,
  introMuda,
} from '@/lib/mudas'

interface PageProps {
  params: { slug: string }
}

const GUIAS = [
  { slug: 'plantio', nome: 'Como plantar' },
  { slug: 'adubacao', nome: 'Adubação' },
  { slug: 'poda', nome: 'Poda' },
  { slug: 'colheita', nome: 'Colheita' },
]

export function generateStaticParams() {
  return frutiferas.map((f) => ({ slug: f.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const fruta = getFrutifera(params.slug)
  if (!fruta) return { title: 'Frutífera não encontrada' }
  const titulo = `Mudas de ${fruta.nome}: onde comprar e como escolher`
  return {
    title: titulo,
    description: `Onde comprar muda de ${fruta.nome} (${fruta.nomeCientifico}), quanto custa e como escolher uma muda saudável para cultivar em vaso.`,
    alternates: { canonical: `/mudas/${fruta.slug}` },
    openGraph: {
      url: `/mudas/${fruta.slug}`,
      title: `${titulo} - ${site.name}`,
      images: fruta.imagem ? [imgUrl(fruta.imagem)] : undefined,
    },
  }
}

export default function MudaPage({ params }: PageProps) {
  const fruta = getFrutifera(params.slug)
  if (!fruta) notFound()

  const faq = faqMuda(fruta)
  const comoEscolher = comoEscolherMuda(fruta)
  const cuidados = dicasDepoisDeComprar(fruta)
  const categoriaPrincipal = getCategoria(fruta.categorias[0])

  const relacionadas = frutiferas
    .filter((f) => f.slug !== fruta.slug && f.categorias.some((c) => fruta.categorias.includes(c)))
    .slice(0, 6)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Mudas', path: '/mudas' },
          { name: `Mudas de ${fruta.nome}`, path: `/mudas/${fruta.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(faq)} />

      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <Link href="/mudas" className="hover:text-forest-600">Mudas</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">{fruta.nome}</span>
      </nav>

      <header className="max-w-3xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">
          Mudas de {fruta.nome}: onde comprar e como escolher
        </h1>
        <p className="text-ink-600 leading-relaxed">{introMuda(fruta)}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {fruta.imagem && (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-cream-200 bg-cream-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgUrl(fruta.imagem)}
              alt={`Muda de ${fruta.nome} (${fruta.nomeCientifico})`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5">
          <h2 className="font-display font-bold text-lg text-ink-900 mb-2">
            Onde comprar muda de {fruta.nome}
          </h2>
          <p className="text-sm text-ink-500 mb-4">
            Mudas enxertadas e insumos com envio para todo o Brasil. Confira a disponibilidade com o
            vendedor parceiro.
          </p>
          <BotaoAfiliado
            href={LISTA_MERCADO_LIVRE}
            loja="Mercado Livre"
            label="Ver mudas"
            categoria="mudas"
            pagina={`muda-${fruta.slug}`}
            posicao="topo"
            descricao={`Mudas de ${fruta.nome} e itens de cultivo`}
          >
            Ver mudas disponíveis
          </BotaoAfiliado>
          <p className="mt-3 text-[11px] text-ink-500">
            Faixa de preço de referência: <strong>{faixaPrecoMuda(fruta)}</strong>
          </p>
        </div>
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-3 font-display">
          Quanto custa uma muda de {fruta.nome}?
        </h2>
        <p className="text-ink-600 leading-relaxed mb-3">
          O preço de uma muda de {fruta.nome} varia conforme o tipo (enxertada, de alporque ou de
          semente), o tamanho da planta e a reputação do viveiro. Como referência de mercado, mudas
          de {fruta.nome.toLowerCase()} costumam ficar na faixa de <strong>{faixaPrecoMuda(fruta)}</strong>.
        </p>
        <p className="text-ink-600 leading-relaxed">
          Mudas maiores e já em fase de produção custam mais, mas encurtam bastante o tempo até a
          primeira colheita — o que costuma valer a pena para quem quer resultado mais rápido.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-3 font-display">Como escolher uma boa muda</h2>
        <ul className="list-disc pl-5 space-y-2 text-ink-600 leading-relaxed">
          {comoEscolher.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <AdSlot rotulo ezoicId={105} className="mt-10 min-h-[90px]" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-3 font-display">Depois de comprar: como cuidar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cuidados.map((c) => (
            <div key={c.titulo} className="rounded-xl border border-cream-200 bg-white p-4">
              <h3 className="font-semibold text-ink-900 mb-1">{c.titulo}</h3>
              <p className="text-sm text-ink-600">{c.texto}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {GUIAS.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="inline-block rounded-full bg-cream-100 px-4 py-1.5 text-sm text-forest-700 hover:bg-cream-200 transition"
            >
              {g.nome}
            </Link>
          ))}
          <Link
            href={`/frutiferas/${fruta.slug}`}
            className="inline-block rounded-full bg-forest-600 px-4 py-1.5 text-sm text-white hover:bg-forest-700 transition"
          >
            Ficha completa de {fruta.nome}
          </Link>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 font-display">Perguntas frequentes</h2>
        <div className="divide-y divide-cream-200 border-y border-cream-200">
          {faq.map((item) => (
            <details key={item.pergunta} className="py-4 group">
              <summary className="cursor-pointer font-medium text-ink-900 flex items-center justify-between gap-3">
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

      {relacionadas.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-3 font-display">
            Outras mudas de {categoriaPrincipal?.nome || 'frutíferas'}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {relacionadas.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/mudas/${f.slug}`}
                  className="inline-block rounded-full bg-cream-100 px-4 py-1.5 text-sm text-forest-700 hover:bg-cream-200 transition"
                >
                  Muda de {f.nome}
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
    </div>
  )
}
