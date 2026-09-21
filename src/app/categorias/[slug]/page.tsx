import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FrutiferaCard from '@/components/FrutiferaCard'
import BannerSlot from '@/components/BannerSlot'
import JsonLd from '@/components/JsonLd'
import CategoryIcon from '@/components/CategoryIcon'
import { categorias, getCategoria } from '@/data/categorias'
import { getPorCategoria } from '@/data/frutiferas'
import { breadcrumbJsonLd } from '@/lib/seo'
import { site } from '@/lib/site'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return categorias.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cat = getCategoria(params.slug)
  if (!cat) return { title: 'Categoria não encontrada' }
  const titulo = `${cat.nome} - Frutíferas para cultivo em vaso`
  return {
    title: titulo,
    description: cat.descricao,
    alternates: { canonical: `/categorias/${cat.slug}` },
    openGraph: { title: `${titulo} - ${site.name}`, url: `/categorias/${cat.slug}`, description: cat.descricao },
  }
}

export default function CategoriaPage({ params }: PageProps) {
  const cat = getCategoria(params.slug)
  if (!cat) notFound()

  const lista = getPorCategoria(cat.slug)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Frutíferas', path: '/frutiferas' },
          { name: cat.nome, path: `/categorias/${cat.slug}` },
        ])}
      />

      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <Link href="/frutiferas" className="hover:text-forest-600">Frutíferas</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">{cat.nome}</span>
      </nav>

      <header className="flex items-start gap-4 mb-8">
        <span className="text-forest-600 shrink-0">
          <CategoryIcon category={cat.slug} size="lg" />
        </span>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{cat.nome}</h1>
          <p className="text-ink-500 max-w-3xl">{cat.descricao}</p>
        </div>
      </header>

      {lista.length === 0 ? (
        <p className="text-ink-500">Nenhuma frutífera cadastrada nesta categoria ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lista.map((fruta) => (
            <FrutiferaCard key={fruta.slug} fruta={fruta} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <BannerSlot
          variante="compact"
          titulo="Explore outras categorias"
          subtitulo="Frutas raras, nativas do Brasil e espécies ideais para vaso."
          ctaLabel="Ver catálogo completo"
          ctaHref="/frutiferas"
        />
      </div>
    </div>
  )
}
