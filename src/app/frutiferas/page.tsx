import type { Metadata } from 'next'
import Link from 'next/link'
import FrutiferaCard from '@/components/FrutiferaCard'
import BannerSlot from '@/components/BannerSlot'
import AdSlot from '@/components/Ads'
import { categorias, getCategoria } from '@/data/categorias'
import { frutiferas } from '@/data/frutiferas'
import { site } from '@/lib/site'

interface PageProps {
  searchParams: { cat?: string; q?: string }
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const cat = searchParams.cat ? getCategoria(searchParams.cat) : undefined
  const titulo = cat ? `Frutíferas: ${cat.nome}` : 'Catálogo de frutíferas orgânicas'
  return {
    title: titulo,
    description:
      cat?.descricao ||
      'Catálogo completo de frutíferas orgânicas para cultivo em vaso. Fichas de cultivo, vídeos e onde comprar as melhores mudas.',
    alternates: { canonical: cat ? `/frutiferas?cat=${cat.slug}` : '/frutiferas' },
    openGraph: {
      title: `${titulo} - ${site.name}`,
      url: cat ? `/frutiferas?cat=${cat.slug}` : '/frutiferas',
    },
  }
}

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function FrutiferasPage({ searchParams }: PageProps) {
  const catSelecionada = searchParams.cat || ''
  const busca = (searchParams.q || '').trim()

  let lista = frutiferas
  if (catSelecionada) lista = lista.filter((f) => f.categorias.includes(catSelecionada))
  if (busca) {
    const termo = normalizar(busca)
    lista = lista.filter(
      (f) =>
        normalizar(f.nome).includes(termo) ||
        normalizar(f.nomeCientifico).includes(termo) ||
        normalizar(f.resumo).includes(termo)
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Frutíferas</span>
        {catSelecionada && getCategoria(catSelecionada) && (
          <>
            <span>/</span>
            <span className="text-ink-900 font-medium">{getCategoria(catSelecionada)?.nome}</span>
          </>
        )}
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {catSelecionada && getCategoria(catSelecionada)
          ? getCategoria(catSelecionada)?.nome
          : 'Catálogo de frutíferas orgânicas'}
      </h1>
      <p className="text-ink-500 mb-6 max-w-3xl">
        {catSelecionada && getCategoria(catSelecionada)
          ? getCategoria(catSelecionada)?.descricao
          : 'Explore fichas completas de cultivo, com dicas, vídeos e onde comprar mudas e insumos.'}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-4 lg:sticky lg:top-20">
            <h2 className="font-bold text-ink-900 mb-3">Categorias</h2>
            <Link
              href="/frutiferas"
              className={`block px-3 py-1.5 rounded text-sm mb-1 transition ${!catSelecionada ? 'bg-forest-600 text-white' : 'text-ink-600 hover:text-forest-600'}`}
            >
              Todas
            </Link>
            {categorias.map((cat) => (
              <Link
                key={cat.slug}
                href={`/frutiferas?cat=${cat.slug}`}
                className={`block px-3 py-1.5 rounded text-sm mb-1 transition ${catSelecionada === cat.slug ? 'bg-forest-600 text-white font-medium' : 'text-ink-600 hover:text-forest-600'}`}
              >
                {cat.nome}
              </Link>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <form method="get" className="flex gap-3 mb-6" action="/frutiferas">
            {catSelecionada && <input type="hidden" name="cat" value={catSelecionada} />}
            <input
              type="search"
              name="q"
              defaultValue={busca}
              placeholder="Buscar frutífera pelo nome..."
              className="border border-cream-200 rounded-lg px-4 py-2.5 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-forest-200 focus:border-forest-600"
            />
            <button type="submit" className="bg-forest-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-forest-700 transition">
              Buscar
            </button>
          </form>

          <p className="text-sm text-ink-500 mb-4">{lista.length} frutífera(s) encontrada(s)</p>

          {lista.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-ink-500">Nenhuma frutífera encontrada.</p>
              <Link href="/frutiferas" className="text-forest-600 text-sm hover:underline mt-2 inline-block">
                Limpar filtros
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lista.map((fruta) => (
                <FrutiferaCard key={fruta.slug} fruta={fruta} />
              ))}
            </div>
          )}

          <div className="mt-10">
            <AdSlot rotulo ezoicId={105} className="mb-8 min-h-[90px]" />
            <BannerSlot
              variante="compact"
              titulo="Não sabe por onde começar?"
              subtitulo="Veja nossas frutíferas mais fáceis de cultivar em vaso e comece sua horta orgânica hoje."
              ctaLabel="Ver vídeos de cultivo"
              ctaHref="/videos"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
