interface FruitVisualProps {
  nome: string
  cor: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const textSizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
}

export default function FruitVisual({ nome, cor, className = '', size = 'md' }: FruitVisualProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${cor} 0%, #14271A 100%)` }}
      role="img"
      aria-label={nome}
    >
      <svg
        className="absolute -right-4 -bottom-6 w-32 h-32 text-white/10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2C7 7 4 14 4 14s3 7 8 7 8-7 8-7-3-7-8-7z" />
        <path d="M12 2v20" />
      </svg>
      <span className={`relative z-10 px-4 text-center font-display font-semibold text-cream-50 ${textSizes[size]}`}>
        {nome}
      </span>
    </div>
  )
}
