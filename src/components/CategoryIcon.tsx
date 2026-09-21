import type { ReactNode } from 'react'

interface CategoryIconProps {
  category: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const icons: Record<string, ReactNode> = {
  nativas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21v-8" />
      <path d="M12 13c-4.5-.5-7.5-3.5-7.5-8A8.5 8.5 0 0 1 19.5 5c0 4.5-3 7.5-7.5 8z" />
      <circle cx="8.5" cy="7" r="1" />
      <circle cx="14.5" cy="5.5" r="1" />
      <circle cx="12" cy="10.5" r="1" />
    </svg>
  ),
  raras: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 4.9L12 14.3 7.5 16.6l.9-4.9L4.8 8.2l5-.7z" />
      <path d="M12 14.3V21" />
    </svg>
  ),
  vaso: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9h12l-1.2 10.2A2 2 0 0 1 14.8 21H9.2a2 2 0 0 1-2-1.8z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
      <path d="M12 5V2" />
      <path d="M12 2c-1.5.8-2 2-2 3M12 2c1.5.8 2 2 2 3" />
    </svg>
  ),
  exoticas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="14" r="3.5" />
      <circle cx="15.5" cy="14" r="3.5" />
      <circle cx="12" cy="10.5" r="3" />
      <path d="M12 7.5c-.2-2.5 1.4-4.3 3.8-4.5-.2 2.5-1.8 4.3-3.8 4.5z" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21v-8" />
      <path d="M12 13C9 13 6.5 10.5 6.5 7.5 8.5 8 11 10 12 13z" />
      <path d="M12 13c3 0 5.5-2.5 5.5-5.5C15.5 8 13 10 12 13z" />
      <path d="M12 16c-2 0-3.5 1.5-3.5 3 1.5 0 3-1 3.5-3z" />
      <path d="M12 16c2 0 3.5 1.5 3.5 3-1.5 0-3-1-3.5-3z" />
    </svg>
  ),
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

export default function CategoryIcon({ category, size = 'md', className = '' }: CategoryIconProps) {
  const Icon = icons[category] || icons.default
  return (
    <span className={`${sizes[size]} inline-block ${className}`} aria-hidden="true">
      {Icon}
    </span>
  )
}
