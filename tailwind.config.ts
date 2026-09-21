import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F1F5F0',
          100: '#E2EAE1',
          200: '#C4D6C4',
          300: '#6B9A6B',
          400: '#4A804A',
          500: '#2E5B3A',
          600: '#23512E',
          700: '#1E3A27',
          800: '#193020',
          900: '#14271A',
        },
        cream: {
          50: '#FAF7F0',
          100: '#F3EDE0',
          200: '#E7DFCE',
        },
        terracotta: {
          50: '#F9EFE7',
          100: '#F2DED0',
          200: '#E5C8AF',
          300: '#D4A680',
          400: '#C2703D',
          500: '#C2703D',
          600: '#A85A2E',
          700: '#8F4C25',
        },
        ink: {
          500: '#6B6559',
          600: '#5A554C',
          700: '#4A463E',
          900: '#2B2720',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
