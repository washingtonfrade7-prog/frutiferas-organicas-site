'use client'

import type { ReactNode } from 'react'

interface BotaoAfiliadoProps {
  href?: string | null
  loja: string
  label?: string
  categoria?: string
  pagina?: string
  posicao?: string
  descricao?: string
  preco?: string
  className?: string
  children?: ReactNode
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default function BotaoAfiliado({
  href,
  loja,
  label = 'Ver oferta',
  categoria = '',
  pagina = '',
  posicao = '',
  descricao,
  preco,
  className = '',
  children,
}: BotaoAfiliadoProps) {
  if (!href || href.startsWith('#')) return null

  function registrarClique() {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'clique_afiliado', {
        loja,
        categoria,
        pagina,
        posicao,
        link_url: href,
      })
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={registrarClique}
      aria-label={`${label} - ${loja}`}
      className={`group inline-flex items-center justify-between gap-3 rounded-xl border border-cream-200 bg-white p-3 hover:shadow-md transition ${className}`}
    >
      <span className="min-w-0 text-left">
        <span className="block text-sm font-semibold text-ink-900">{children || loja}</span>
        {descricao && <span className="block text-xs text-ink-500">{descricao}</span>}
        {preco && <span className="block text-sm font-bold text-forest-700 mt-0.5">{preco}</span>}
      </span>
      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-forest-600 group-hover:bg-forest-700 text-white px-4 py-2 text-sm font-medium transition">
        {label}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
        </svg>
      </span>
    </a>
  )
}
