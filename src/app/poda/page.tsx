import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_PODA_URL || ''
const precoDe = 'R$ 47'
const preco = 'R$ 27'

export const metadata: Metadata = {
  title: 'Poda de Frutíferas na Prática — mini-curso em vídeo',
  description:
    'Aprenda a podar frutíferas em vaso sem medo: formação, limpeza e produção, com as épocas certas por espécie. Mini-curso em vídeo, acesso imediato.',
  alternates: { canonical: '/poda' },
  openGraph: {
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: site.name }],
    url: '/poda',
    title: `Poda de Frutíferas na Prática - ${site.name}`,
    description: 'Formação, limpeza e produção, com as épocas certas por espécie.',
  },
}

const modulos = [
  { titulo: 'Por que podar', itens: ['Direcionar a energia da planta', 'Mais luz e ar na copa', 'Produzir em vez de só crescer'] },
  { titulo: 'Poda de formação', itens: ['Escolher os 3 a 4 ramos principais', 'Altura ideal para vaso', 'Primeiros anos da muda'] },
  { titulo: 'Poda de limpeza', itens: ['Galhos secos, doentes e tortos', 'Cortar para dentro da copa', 'Quando fazer'] },
  { titulo: 'Poda de produção', itens: ['Desponta dos ramos maduros', 'Época certa por espécie', 'Como não perder a florada'] },
]

const faq = [
  {
    pergunta: 'Preciso ter o guia completo para fazer este mini-curso?',
    resposta:
      'Não. O mini-curso é autônomo. Ele combina muito bem com o guia de frutíferas em vaso, mas não é pré-requisito.',
  },
  {
    pergunta: 'Serve para quem tem medo de matar a planta?',
    resposta:
      'Sim — e é exatamente para isso. Você aprende onde cortar, quando cortar e o que evitar, com demonstrações no pomar.',
  },
  {
    pergunta: 'Como recebo o acesso?',
    resposta:
      'Acesso imediato após a compra, em vídeo, para assistir no celular ou computador. Você tem 7 dias de garantia.',
  },
]

function podaJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Poda de Frutíferas na Prática',
    description: 'Mini-curso em vídeo de poda de frutíferas em vaso: formação, limpeza e produção.',
    url: absoluteUrl('/poda'),
    brand: { '@type': 'Organization', name: site.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '27',
      availability: 'https://schema.org/InStock',
      ...(checkoutUrl ? { url: checkoutUrl } : {}),
    },
  })
}

export default function PodaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Poda', path: '/poda' }])} />
      <JsonLd data={podaJsonLd()} />
      <JsonLd data={faqJsonLd(faq)} />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Poda de Frutíferas na Prática</span>
      </nav>

      <header className="mb-12">
        <span className="inline-block rounded-full bg-forest-50 text-forest-700 text-xs font-semibold px-3 py-1 mb-4">
          Mini-curso em vídeo
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display leading-tight">
          Poda de Frutíferas na Prática
        </h1>
        <p className="text-lg text-ink-700 mb-4 max-w-2xl">
          Pare de podar com medo. Aprenda onde e quando cortar cada espécie — e faça a planta produzir
          em vez de só crescer.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg text-ink-400 line-through">{precoDe}</span>
          <span className="text-3xl font-bold text-forest-700">{preco}</span>
          <span className="text-sm text-ink-500">Acesso imediato · 7 dias de garantia</span>
        </div>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
          >
            Quero o mini-curso de poda
          </a>
        ) : (
          <Link
            href="/guia-gratuito"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-700 px-8 py-4 text-lg font-bold text-white hover:bg-forest-800 transition"
          >
            Comece pelo guia grátis
          </Link>
        )}
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-display">O que você vai aprender</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modulos.map((m) => (
            <div key={m.titulo} className="rounded-2xl border border-cream-200 bg-white p-5">
              <h3 className="font-semibold text-ink-900 mb-3">{m.titulo}</h3>
              <ul className="space-y-1.5 text-sm text-ink-600">
                {m.itens.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>{i}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
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

      <section className="rounded-2xl bg-forest-900 text-cream-100 p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 font-display">Pode com confiança</h2>
        <p className="text-cream-200 mb-6 max-w-xl mx-auto">
          Acesso imediato, no seu ritmo, com 7 dias de garantia.
        </p>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
          >
            Quero o mini-curso de poda — {preco}
          </a>
        ) : (
          <Link
            href="/curso"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
          >
            Ver o guia completo
          </Link>
        )}
      </section>
    </div>
  )
}
