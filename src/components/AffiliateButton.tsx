interface AffiliateButtonProps {
  href: string
  label?: string
  loja?: string
  descricao?: string
  preco?: string
  destaque?: boolean
  className?: string
}

export default function AffiliateButton({
  href,
  label = 'Onde Comprar',
  loja,
  descricao,
  preco,
  destaque,
  className = '',
}: AffiliateButtonProps) {
  const isPlaceholder = !href || href.startsWith('#')

  const base = destaque
    ? 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
    : 'bg-forest-600 hover:bg-forest-700 text-white'

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={loja ? `${label} - ${loja}` : label}
      className={`group flex items-center justify-between gap-3 rounded-xl border border-cream-200 bg-white p-3 hover:shadow-md transition ${className}`}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink-900 truncate">
          {loja || label}
        </span>
        {descricao && <span className="block text-xs text-ink-500 truncate">{descricao}</span>}
        {preco && <span className="block text-sm font-bold text-forest-700 mt-0.5">{preco}</span>}
      </span>
      <span
        className={`shrink-0 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${base}`}
      >
        {isPlaceholder ? 'Ver Oferta' : label}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
        </svg>
      </span>
    </a>
  )
}
