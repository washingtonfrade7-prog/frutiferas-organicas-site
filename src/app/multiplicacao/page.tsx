import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { upsell } from '@/data/upsell'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${upsell.nome} | Multiplique suas frutíferas`,
  description: upsell.promessa,
  alternates: { canonical: '/multiplicacao' },
  openGraph: {
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: 'Frutíferas Orgânicas' }],
    url: '/multiplicacao',
    title: `${upsell.nome} - ${site.name}`,
    description: upsell.promessa,
  },
}

function precoNumerico(): string {
  const n = upsell.preco.replace(/[^\d,]/g, '').replace(',', '.')
  return n || '0'
}

function upsellJsonLd(): string {
  const aVenda = Boolean(upsell.checkoutUrl)
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: upsell.nome,
    description: upsell.promessa,
    inLanguage: 'pt-BR',
    url: absoluteUrl('/multiplicacao'),
    brand: { '@type': 'Organization', name: site.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      ...(aVenda
        ? { price: precoNumerico(), url: upsell.checkoutUrl, availability: 'https://schema.org/InStock' }
        : {}),
    },
  })
}

const razoes = [
  { titulo: 'Economia', texto: 'Uma muda de frutífera custa de R$ 30 a R$ 200. Você faz de graça.' },
  { titulo: 'Qualidade', texto: 'Você reproduz exatamente a planta que já sabe que produz bem.' },
  { titulo: 'Autonomia', texto: 'Não fica preso ao que a loja tem no dia.' },
  { titulo: 'Renda extra', texto: 'Mudas de qualidade vendem fácil em grupos e feiras locais.' },
]

export default function MultiplicacaoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: upsell.nome, path: '/multiplicacao' },
        ])}
      />
      <JsonLd data={upsellJsonLd()} />
      <JsonLd data={faqJsonLd(upsell.faq)} />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">{upsell.nome}</span>
      </nav>

      <header className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
        <div>
          <span className="inline-block rounded-full bg-forest-50 text-forest-700 text-xs font-semibold px-3 py-1 mb-4">
            {upsell.formato}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display leading-tight">
            {upsell.nome}
          </h1>
          <p className="text-lg text-ink-700 mb-4">{upsell.subtitulo}</p>
          <p className="text-ink-600 leading-relaxed mb-6">{upsell.promessa}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg text-ink-400 line-through">{upsell.precoDe}</span>
            <span className="text-3xl font-bold text-forest-700">{upsell.preco}</span>
            <span className="text-sm text-ink-500">{upsell.precoObservacao}</span>
          </div>
          {upsell.checkoutUrl ? (
            <a
              href={upsell.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
            >
              Quero multiplicar minhas mudas
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
              </svg>
            </a>
          ) : (
            <Link
              href="/curso"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-700 px-8 py-4 text-lg font-bold text-white hover:bg-forest-800 transition"
            >
              Conheça o guia completo
            </Link>
          )}
        </div>

        <div className="rounded-2xl border border-cream-200 bg-white shadow-sm p-6">
          <h2 className="font-display font-bold text-lg text-ink-900 mb-2">
            Acesso e garantia
          </h2>
          <p className="text-sm text-ink-600 mb-5">
            Acesso imediato após a compra. 7 dias de garantia — se não gostar, devolvemos seu dinheiro.
          </p>
          <ul className="space-y-2 text-sm text-ink-600">
            <li className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>E-book em PDF, com fotos e diagramas</span></li>
            <li className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>Os quatro métodos de multiplicação</span></li>
            <li className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>Método por espécie e checklist</span></li>
          </ul>
        </div>
      </header>

      <section className="mb-14 rounded-2xl border-l-4 border-terracotta-500 bg-cream-50 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
          O princípio que vale para tudo
        </p>
        <p className="text-lg text-ink-900 leading-relaxed">
          Multiplique sempre uma planta que <strong>já provou que dá fruto</strong>. Não adianta
          reproduzir a planta bonita que nunca produziu nada.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 font-display">Por que multiplicar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {razoes.map((r) => (
            <div key={r.titulo} className="rounded-2xl border border-cream-200 bg-white p-5">
              <h3 className="font-semibold text-forest-700 mb-2">{r.titulo}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{r.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 font-display">O que você vai aprender</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upsell.modulos.map((mod) => (
            <div key={mod.titulo} className="rounded-2xl border border-cream-200 bg-white p-5">
              <h3 className="font-semibold text-ink-900 mb-3">{mod.titulo}</h3>
              <ul className="space-y-1.5 text-sm text-ink-600">
                {mod.itens.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-forest-600 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <section className="rounded-2xl border border-cream-200 bg-cream-50 p-6">
          <h2 className="text-xl font-bold mb-4 font-display">Para quem é</h2>
          <ul className="space-y-2 text-sm text-ink-600">
            {upsell.paraQuem.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-forest-600 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-cream-200 bg-white p-6">
          <h2 className="text-xl font-bold mb-4 font-display">O que está incluso</h2>
          <ul className="space-y-2 text-sm text-ink-600">
            {upsell.incluso.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-forest-600 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-4 font-display">Perguntas frequentes</h2>
        <div className="divide-y divide-cream-200 border-y border-cream-200">
          {upsell.faq.map((item) => (
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

      <section className="rounded-2xl bg-forest-900 text-cream-100 p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 font-display">De uma planta, faça dez</h2>
        <p className="text-cream-200 mb-6 max-w-xl mx-auto">
          Acesso imediato, no seu ritmo, com 7 dias de garantia.
        </p>
        <div className="max-w-xl mx-auto">
          {upsell.checkoutUrl ? (
            <a
              href={upsell.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
            >
              Quero multiplicar minhas mudas — {upsell.preco}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
              </svg>
            </a>
          ) : (
            <Link
              href="/curso"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
            >
              Conheça o guia completo
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
