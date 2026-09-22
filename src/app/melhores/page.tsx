import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { artigosComerciais } from '@/data/melhores'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Guias de compra para frutíferas em vaso',
  description:
    'Comparativos e guias de compra para quem cultiva frutíferas em vaso: vasos, substratos, adubos, kits de plantio e ferramentas de poda.',
  alternates: { canonical: '/melhores' },
  openGraph: { url: '/melhores', title: `Guias de compra - ${site.name}` },
}

export default function MelhoresPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Guias de compra', path: '/melhores' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          artigosComerciais.map((a) => ({ name: a.titulo, url: absoluteUrl(`/melhores/${a.slug}`) }))
        )}
      />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Guias de compra</span>
      </nav>

      <header className="max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">Guias de compra</h1>
        <p className="text-ink-600 leading-relaxed">
          Comparativos honestos dos produtos que fazem diferença no cultivo de frutíferas em vaso.
          Sem enrolação: o que funciona, para quem serve e quanto custa.
        </p>
      </header>

      <div className="space-y-5">
        {artigosComerciais.map((artigo) => (
          <Link
            key={artigo.slug}
            href={`/melhores/${artigo.slug}`}
            className="group block bg-white rounded-2xl border border-cream-200 shadow-sm p-6 hover:shadow-md hover:border-forest-300 transition"
          >
            <h2 className="font-display font-bold text-xl text-ink-900 group-hover:text-forest-700 transition mb-2">
              {artigo.titulo}
            </h2>
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
    </div>
  )
}
