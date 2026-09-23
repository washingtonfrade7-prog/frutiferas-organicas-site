import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import NewsletterForm from '@/components/NewsletterForm'
import { produto } from '@/data/produto'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${produto.nome} | Curso e e-book de frutíferas em vaso`,
  description: produto.promessa,
  alternates: { canonical: '/curso' },
  openGraph: { url: '/curso', title: `${produto.nome} - ${site.name}`, description: produto.promessa },
}

function cursoJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: produto.nome,
    description: produto.promessa,
    inLanguage: 'pt-BR',
    url: absoluteUrl('/curso'),
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    offers: {
      '@type': 'Offer',
      category: 'PreOrder',
      availability: 'https://schema.org/PreOrder',
      priceCurrency: 'BRL',
    },
  })
}

export default function CursoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: produto.nome, path: '/curso' },
        ])}
      />
      <JsonLd data={cursoJsonLd()} />
      <JsonLd data={faqJsonLd(produto.faq)} />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">{produto.nome}</span>
      </nav>

      <header className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
        <div>
          <span className="inline-block rounded-full bg-forest-50 text-forest-700 text-xs font-semibold px-3 py-1 mb-4">
            {produto.formato}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display leading-tight">
            {produto.nome}
          </h1>
          <p className="text-lg text-ink-700 mb-4">{produto.subtitulo}</p>
          <p className="text-ink-600 leading-relaxed mb-6">{produto.promessa}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg text-ink-400 line-through">{produto.precoDe}</span>
            <span className="text-3xl font-bold text-forest-700">{produto.preco}</span>
            <span className="text-sm text-ink-500">{produto.precoObservacao}</span>
          </div>
          {produto.checkoutUrl && (
            <a
              href={produto.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
            >
              Quero começar agora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
              </svg>
            </a>
          )}
        </div>

        <div className="rounded-2xl border border-cream-200 bg-white shadow-sm p-6">
          <h2 className="font-display font-bold text-lg text-ink-900 mb-2">
            {produto.checkoutUrl ? 'Acesso e garantia' : 'Entre na lista de espera'}
          </h2>
          <p className="text-sm text-ink-600 mb-5">
            {produto.checkoutUrl
              ? 'Acesso imediato após a compra. 7 dias de garantia — se não gostar, devolvemos seu dinheiro.'
              : 'Seja avisado no lançamento e garanta o desconto de primeira turma.'}
          </p>
          {!produto.checkoutUrl && <NewsletterForm origem="curso" />}
        </div>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 font-display">O que você vai aprender</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {produto.modulos.map((mod) => (
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
            {produto.paraQuem.map((item) => (
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
            {produto.incluso.map((item) => (
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
          {produto.faq.map((item) => (
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
        <h2 className="text-2xl font-bold mb-3 font-display">Comece a produzir frutas em casa</h2>
        <p className="text-cream-200 mb-6 max-w-xl mx-auto">
          {produto.checkoutUrl
            ? 'Acesso imediato, no seu ritmo, com 7 dias de garantia.'
            : 'Entre na lista de espera e seja avisado assim que o material for lançado.'}
        </p>
        <div className="max-w-xl mx-auto">
          {produto.checkoutUrl ? (
            <a
              href={produto.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
            >
              Quero começar agora — {produto.preco}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
              </svg>
            </a>
          ) : (
            <NewsletterForm origem="curso-final" escuro />
          )}
        </div>
      </section>
    </div>
  )
}
