import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import IscaForm from '@/components/IscaForm'
import { breadcrumbJsonLd } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Guia grátis: 10 frutíferas fáceis para começar em vaso',
  description:
    'Baixe grátis o guia com as 10 frutíferas mais fáceis de cultivar em vaso, o plantio em 5 passos e a rega certa (teste do dedo).',
  alternates: { canonical: '/guia-gratuito' },
  openGraph: {
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: 'Frutíferas Orgânicas' }],
    url: '/guia-gratuito',
    title: `Guia grátis: 10 frutíferas fáceis para começar em vaso - ${site.name}`,
    description: 'As 10 frutíferas mais fáceis, o plantio em 5 passos e a rega certa. Grátis em PDF.',
  },
}

const frutiferasFaceis = [
  { nome: 'Acerola', nota: 'Produz quase o ano todo' },
  { nome: 'Pitanga', nota: 'Nativa e resistente' },
  { nome: 'Amora', nota: 'Enraíza fácil por estaquia' },
  { nome: 'Figo', nota: 'Ótimo para varanda' },
  { nome: 'Romã', nota: 'Bonita e produtiva' },
  { nome: 'Uva', nota: 'Dá certo em vaso com poda' },
  { nome: 'Jabuticaba híbrida', nota: 'Produz mais cedo' },
  { nome: 'Citros (limão, laranja)', nota: 'Reis da varanda' },
  { nome: 'Pitaya', nota: 'Adora sol e perdoa a rega' },
  { nome: 'Maracujá', nota: 'Frutos no 1º ano' },
]

export default function GuiaGratuitoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Guia grátis', path: '/guia-gratuito' },
        ])}
      />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Guia grátis</span>
      </nav>

      <header className="mb-10">
        <span className="inline-block rounded-full bg-forest-50 text-forest-700 text-xs font-semibold px-3 py-1 mb-4">
          PDF gratuito
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display leading-tight">
          10 frutíferas fáceis para começar em vaso
        </h1>
        <p className="text-lg text-ink-700 mb-6">
          Escolha a frutífera certa, plante do jeito certo e colha em casa — mesmo em varanda,
          quintal pequeno ou apartamento.
        </p>
        <IscaForm />
      </header>

      <section className="mb-12 rounded-2xl border-l-4 border-terracotta-500 bg-cream-50 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta-700 mb-2">
          A regra de ouro
        </p>
        <p className="text-lg text-ink-900 leading-relaxed">
          A maioria das frutíferas em vaso não morre por falta de cuidado — morre de{' '}
          <strong>excesso</strong>: de água, de adubo e de poda.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 font-display">O que você vai receber</h2>
        <ul className="space-y-2 text-ink-700">
          <li className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>As <strong>10 frutíferas mais fáceis</strong> — com vaso, luz e tempo até produzir</span></li>
          <li className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>O <strong>plantio em 5 passos</strong> (drenagem, substrato, nível certo, rega e sol)</span></li>
          <li className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>A <strong>rega certa</strong> com o teste do dedo</span></li>
          <li className="flex gap-2"><span className="text-forest-600 shrink-0">✓</span><span>Um PDF prático para consultar no celular ou imprimir</span></li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 font-display">As 10 frutíferas do guia</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {frutiferasFaceis.map((f) => (
            <div key={f.nome} className="rounded-xl border border-cream-200 bg-white px-4 py-3">
              <p className="font-semibold text-ink-900">{f.nome}</p>
              <p className="text-sm text-ink-600">{f.nota}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-forest-900 text-cream-100 p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 font-display">Quer o passo a passo completo?</h2>
        <p className="text-cream-200 mb-6 max-w-xl mx-auto">
          No curso <strong>Cultivo de Frutíferas Orgânicas em Vasos</strong>, você tem o e-book
          completo, 8 videoaulas práticas e o Workbook com o Desafio 90 Dias.
        </p>
        <Link
          href="/curso"
          className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-8 py-4 text-lg font-bold text-white hover:bg-terracotta-700 transition"
        >
          Conhecer o curso
        </Link>
        <p className="mt-4 text-sm text-cream-200">
          <a href={absoluteUrl('/guia-gratuito')} className="underline">
            frutiferasorganicas.com.br/guia-gratuito
          </a>
        </p>
      </section>
    </div>
  )
}
