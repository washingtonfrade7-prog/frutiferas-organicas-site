import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import NewsletterForm from '@/components/NewsletterForm'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_COMUNIDADE_URL || ''
const preco = 'R$ 19,90/mês'

export const metadata: Metadata = {
  title: 'Clube Frutíferas Orgânicas — comunidade e suporte para quem cultiva em vaso',
  description:
    'Entre no Clube: comunidade de cultivadores, lives mensais, tira-dúvidas e conteúdos exclusivos para quem quer colher frutas em casa. Cancele quando quiser.',
  alternates: { canonical: '/comunidade' },
  openGraph: {
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: site.name }],
    url: '/comunidade',
    title: `Clube Frutíferas Orgânicas - ${site.name}`,
    description: 'Comunidade, lives e suporte para cultivar frutíferas em vaso. Cancele quando quiser.',
  },
}

const beneficios = [
  'Comunidade fechada de cultivadores (Hotmart Club) para trocar experiências',
  'Lives mensais de tira-dúvidas ao vivo comigo',
  'Conteúdos exclusivos: calendário de manejo, diagnósticos e novos vídeos antes de todos',
  'Sorteios de mudas e insumos entre os membros',
  'Acesso a todas as atualizações do curso sem custo adicional',
]

const faq = [
  {
    pergunta: 'Preciso ter o curso para entrar no Clube?',
    resposta:
      'Não. O Clube é independente — mas quem já fez o curso aproveita ainda mais, porque tira dúvidas específicas do seu cultivo.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'É uma assinatura mensal, cobrada no cartão. Você pode cancelar quando quiser, sem multa e sem burocracia.',
  },
  {
    pergunta: 'Por onde acesso a comunidade?',
    resposta:
      'Após a confirmação do pagamento, você recebe o acesso à área de membros (Hotmart Club), onde fica a comunidade e o conteúdo exclusivo.',
  },
  {
    pergunta: 'Serve para quem está começando agora?',
    resposta:
      'Sim. Boa parte dos membros começou do zero. A comunidade é justamente para tirar dúvidas antes que a planta morra.',
  },
]

function comunidadeJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Clube Frutíferas Orgânicas',
    description:
      'Comunidade, lives mensais e suporte para cultivar frutíferas orgânicas em vaso.',
    url: absoluteUrl('/comunidade'),
    brand: { '@type': 'Organization', name: site.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '19.90',
      availability: 'https://schema.org/InStock',
      ...(checkoutUrl ? { url: checkoutUrl } : {}),
    },
  })
}

export default function ComunidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Clube', path: '/comunidade' }])} />
      <JsonLd data={comunidadeJsonLd()} />
      <JsonLd data={faqJsonLd(faq)} />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Clube Frutíferas Orgânicas</span>
      </nav>

      <header className="mb-12">
        <span className="inline-block rounded-full bg-forest-50 text-forest-700 text-xs font-semibold px-3 py-1 mb-4">
          Comunidade · assinatura mensal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display leading-tight">
          Clube Frutíferas Orgânicas
        </h1>
        <p className="text-lg text-ink-700 mb-4 max-w-2xl">
          Cultivar sozinho é difícil. No Clube, você tem a comunidade, o suporte e o conteúdo para
          nunca mais perder uma planta por dúvida.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold text-forest-700">{preco}</span>
          <span className="text-sm text-ink-500">Cancele quando quiser · 7 dias de garantia</span>
        </div>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
          >
            Entrar no Clube
          </a>
        ) : (
          <div className="mt-6 max-w-lg">
            <p className="text-sm text-ink-600 mb-3">
              Estamos abrindo as primeiras vagas. Entre na lista e seja avisado primeiro:
            </p>
            <NewsletterForm origem="comunidade" />
          </div>
        )}
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5 font-display">O que você recebe</h2>
        <ul className="space-y-3 text-ink-700">
          {beneficios.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-forest-600 shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
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
        <h2 className="text-2xl font-bold mb-3 font-display">Cultive acompanhado</h2>
        <p className="text-cream-200 mb-6 max-w-xl mx-auto">
          Junte-se a quem está colhendo frutas em casa agora. {preco}, cancele quando quiser.
        </p>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
          >
            Entrar no Clube
          </a>
        ) : (
          <Link
            href="/guia-gratuito"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
          >
            Comece pelo guia grátis
          </Link>
        )}
      </section>
    </div>
  )
}
