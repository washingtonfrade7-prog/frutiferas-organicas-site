'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categorias } from '@/data/categorias'
import { site, youtubeChannelUrl } from '@/lib/site'

const nav = [
  { href: '/', label: 'Início' },
  { href: '/frutiferas', label: 'Frutíferas' },
  { href: '/videos', label: 'Vídeos' },
  { href: '/guias', label: 'Guias' },
  { href: '/comprar', label: 'Onde comprar' },
  { href: '/curso', label: 'Curso' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatOpen, setIsCatOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-forest-900 text-cream-100 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex gap-4">
            <a
              href={`mailto:${site.email}`}
              className="hover:underline flex items-center gap-1 transition-colors hover:text-terracotta-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {site.email}
            </a>
          </div>
          <a
            href={youtubeChannelUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 transition-colors hover:text-terracotta-100 text-xs"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Canal no YouTube
          </a>
        </div>
      </div>

      <nav className="bg-forest-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Frutíferas Orgânicas"
                width={36}
                height={36}
                priority
                className="rounded-full"
              />
              <span>Frutíferas Orgânicas</span>
            </Link>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-forest-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>

            <div className="hidden md:flex items-center h-full gap-1">
              <Link href="/" className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium rounded-lg">
                Início
              </Link>
              <Link href="/frutiferas" className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium rounded-lg">
                Frutíferas
              </Link>

              <div className="relative group h-full flex items-center">
                <button
                  className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium flex items-center gap-1 rounded-lg"
                  onClick={() => setIsCatOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={isCatOpen}
                >
                  Categorias
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute top-full left-0 bg-white text-ink-900 shadow-lg rounded-b-lg py-2 min-w-56 transition-all z-50 border border-cream-200 group-hover:opacity-100 group-hover:visible ${
                    isCatOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  {categorias.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categorias/${cat.slug}`}
                      onClick={() => setIsCatOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-cream-50 hover:text-forest-700 transition-colors"
                    >
                      {cat.nome}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/videos" className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium rounded-lg">
                Vídeos
              </Link>
              <Link href="/guias" className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium rounded-lg">
                Guias
              </Link>
              <Link href="/comprar" className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium rounded-lg">
                Onde comprar
              </Link>
              <Link href="/sobre" className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium rounded-lg">
                Sobre
              </Link>
              <Link href="/contato" className="px-3 py-4 hover:bg-forest-600 transition-colors text-sm font-medium rounded-lg">
                Contato
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <a
                href={youtubeChannelUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-forest-600 rounded-full transition-colors"
                title="Canal no YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-forest-800 pb-4 px-4 border-t border-forest-700">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm border-b border-forest-700 hover:text-terracotta-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wide text-forest-300 mb-1">Categorias</p>
              {categorias.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categorias/${cat.slug}`}
                  className="block py-1.5 text-sm hover:text-terracotta-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.nome}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
