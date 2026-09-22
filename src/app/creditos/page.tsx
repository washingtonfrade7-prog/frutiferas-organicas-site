import type { Metadata } from 'next'
import Link from 'next/link'
import creditos from '@/data/creditos-imagens.json'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Créditos de imagens',
  description:
    'Créditos e fontes das imagens de frutíferas utilizadas no site Frutíferas Orgânicas.',
  alternates: { canonical: '/creditos' },
  robots: { index: false, follow: true },
}

type Credito = { nome?: string; titulo?: string; termo?: string; fonte: string }

const dados = creditos as Record<string, Credito>

export default function CreditosPage() {
  const itens = Object.entries(dados)
    .map(([slug, c]) => ({
      slug,
      nome: c.nome || c.termo || slug,
      fonte: c.fonte,
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Créditos de imagens</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Créditos de imagens</h1>

      <div className="prose prose-sm max-w-none text-ink-600 leading-relaxed [&_p]:mb-4">
        <p>
          As fotografias abaixo são provenientes de acervos livres (Wikimedia Commons e Wikipédia) e
          utilizadas sob suas respectivas licenças (Creative Commons ou domínio público). O crédito
          completo, com o arquivo original, está disponível em cada link.
        </p>
        <p>
          Imagens do canal <strong>{site.name}</strong> no YouTube são de nossa própria produção.
        </p>
      </div>

      <ul className="mt-8 divide-y divide-cream-200 border-y border-cream-200">
        {itens.map((it) => (
          <li key={it.slug} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="font-medium text-ink-900">{it.nome}</span>
            <a
              href={it.fonte}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-xs text-forest-600 underline break-all"
            >
              Fonte no Wikimedia
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
