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
  openGraph: {
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: 'Frutíferas Orgânicas' }], url: '/curso', title: `${produto.nome} - ${site.name}`, description: produto.promessa },
}

function precoNumerico(): string {
  const n = produto.preco.replace(/[^\d,]/g, '').replace(',', '.')
  return n || '0'
}

function cursoJsonLd(): string {
  const aVenda = Boolean(produto.checkoutUrl)
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
      category: aVenda ? 'Paid' : 'PreOrder',
      availability: aVenda ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      priceCurrency: 'BRL',
      ...(aVenda ? { price: precoNumerico(), url: produto.checkoutUrl } : {}),
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

      <section className="mb-14 rounded-2xl border-l-4 border-terracotta-500 bg-cream-50 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
          A regra de ouro
        </p>
        <p className="text-lg text-ink-900 leading-relaxed">
          A maioria das frutíferas em vaso não morre por falta de cuidado — morre de{' '}
          <strong>excesso</strong>: de água, de adubo e de poda. Este guia ensina o que realmente
          importa e evita os erros que fazem você perder muda.
        </p>
      </section>

      <section className="mb-14 rounded-2xl border border-cream-200 bg-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
          Quem ensina
        </p>
        <h2 className="text-2xl font-bold mb-3 font-display">Washington Carlos Frade</h2>
        <p className="text-ink-600 leading-relaxed max-w-2xl">
          Criador do canal <strong>Frutíferas Orgânicas</strong>, onde mostra há anos o dia a dia do
          pomar em vasos — plantio, poda, adubação e colheita. Todo o material deste guia nasce da
          prática do pomar, não da teoria.
        </p>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-ink-600">
          <li className="rounded-xl border border-cream-200 px-4 py-3">
            <strong className="block text-ink-900">Canal no YouTube</strong>
            Anos ensinando cultivo em vaso
          </li>
          <li className="rounded-xl border border-cream-200 px-4 py-3">
            <strong className="block text-ink-900">100+ frutíferas</strong>
            Testadas no próprio pomar
          </li>
          <li className="rounded-xl border border-cream-200 px-4 py-3">
            <strong className="block text-ink-900">100% orgânico</strong>
            Sem agrotóxicos, do começo ao fim
          </li>
        </ul>
      </section>

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

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-3 font-display">As 8 videoaulas práticas</h2>
        <p className="text-ink-600 mb-6 max-w-2xl">
          Além do e-book, você acompanha o passo a passo em vídeo, gravado no próprio pomar — uma aula
          curta para cada etapa do cultivo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {produto.videoaulas.map((aula) => (
            <div
              key={aula}
              className="flex items-center gap-3 rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-700"
            >
              <svg className="w-5 h-5 shrink-0 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
              <span>{aula}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border border-cream-200 bg-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
          Quer ir mais fundo?
        </p>
        <h2 className="text-2xl font-bold mb-3 font-display">Multiplicação de Mudas na Prática</h2>
        <p className="text-ink-600 leading-relaxed max-w-2xl mb-4">
          Aprenda a fazer as suas próprias mudas — estaquia, alporque e enxertia — e nunca mais dependa de
          comprar planta. É o complemento ideal para quem já domina o básico.
        </p>
        <Link
          href="/multiplicacao"
          className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-6 py-3 text-sm font-bold text-white hover:bg-forest-800 transition"
        >
          Ver o módulo de multiplicação
        </Link>
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

      <section className="mb-14 rounded-2xl border border-cream-200 bg-cream-50 p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
          Identidade sonora
        </p>
        <h2 className="text-2xl font-bold mb-3 font-display">Moda de viola nas aulas práticas</h2>
        <p className="text-ink-600 leading-relaxed max-w-2xl">
          As videoaulas têm trilha sonora própria: a <strong>moda de viola</strong> que é a assinatura do
          canal. Nada de tutorial genérico — o som acompanha o cultivo orgânico e cria um ambiente que você
          reconhece de longe. Aprender a plantar, aqui, tem o ritmo do campo.
        </p>
      </section>

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

      <section className="mb-14 rounded-2xl border-2 border-forest-300 bg-white p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <h2 className="text-xl font-bold mb-1 font-display">7 dias de garantia — risco zero</h2>
          <p className="text-ink-600 text-sm leading-relaxed">
            Acesse, leia e assista. Se não gostar, é só pedir o reembolso em até 7 dias e devolvemos
            100% do valor. Sem burocracia.
          </p>
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
