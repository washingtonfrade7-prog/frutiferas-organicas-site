interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <svg
      className={`${sizes[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C7 7 4 14 4 14s3 7 8 7 8-7 8-7-3-7-8-7z" />
      <path d="M12 2v20" />
      <path d="M8 14l4-4 4 4" />
      <path d="M12 14v8" />
    </svg>
  )
}
