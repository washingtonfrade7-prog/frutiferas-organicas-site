'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import FrutiferaCard from '@/components/FrutiferaCard'
import BannerSlot from '@/components/BannerSlot'
import AdSlot from '@/components/Ads'
import { categorias, getCategoria } from '@/data/categorias'
import { frutiferas } from '@/data/frutiferas'

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function FrutiferasContent() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') || ''
  const qParam = searchParams.get('q') || ''

  const [cat, setCat] = useState(catParam)
  const [busca, setBusca] = useState(qParam)
  const [termo, setTermo] = useState(qParam)

  useEffect(() => setCat(catParam), [catParam])
  useEffect(() => {
    setBusca(qParam)
    setTermo(qParam)
  }, [qParam])

  // debounce simples da busca
  useEffect(() => {
    const t = setTimeout(() => setTermo(busca), 250)
    return () => clearTimeout(t)
  }, [busca])

  const lista = useMemo(() => {
    let itens = frutiferas
    if (cat) itens = itens.filter((f) => f.categorias.includes(cat))
    if (termo.trim()) {
      const t = normalizar(termo)
      itens = itens.filter(
        (f) =>
          normalizar(f.nome).includes(t) ||
          normalizar(f.nomeCientifico).includes(t) ||
          normalizar(f.resumo).includes(t)
      )
    }
    return itens
  }, [cat, termo])

  const catSelecionada = cat ? getCategoria(cat) : undefined

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Frutíferas</span>
        {catSelecionada && (
          <>
            <span>/</span>
            <span className="text-ink-900 font-medium">{catSelecionada.nome}</span>
          </>
        )}
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {catSelecionada ? catSelecionada.nome : 'Catálogo de frutíferas orgânicas'}
      </h1>
      <p className="text-ink-500 mb-6 max-w-3xl">
        {catSelecionada
          ? catSelecionada.descricao
          : 'Explore fichas completas de cultivo, com dicas, vídeos e onde comprar mudas e insumos.'}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-4 lg:sticky lg:top-20">
            <h2 className="font-bold text-ink-900 mb-3">Categorias</h2>
            <Link
              href="/frutiferas"
              onClick={() => setCat('')}
              className={`block px-3 py-1.5 rounded text-sm mb-1 transition ${!cat ? 'bg-forest-600 text-white' : 'text-ink-600 hover:text-forest-600'}`}
            >
              Todas
            </Link>
            {categorias.map((c) => (
              <Link
                key={c.slug}
                href={`/frutiferas?cat=${c.slug}`}
                onClick={() => setCat(c.slug)}
                className={`block px-3 py-1.5 rounded text-sm mb-1 transition ${cat === c.slug ? 'bg-forest-600 text-white font-medium' : 'text-ink-600 hover:text-forest-600'}`}
              >
                {c.nome}
              </Link>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar frutífera pelo nome..."
              className="border border-cream-200 rounded-lg px-4 py-2.5 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-forest-200 focus:border-forest-600"
            />
          </div>

          <p className="text-sm text-ink-500 mb-4">{lista.length} frutífera(s) encontrada(s)</p>

          {lista.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-ink-500">Nenhuma frutífera encontrada.</p>
              <Link
                href="/frutiferas"
                onClick={() => {
                  setCat('')
                  setBusca('')
                }}
                className="text-forest-600 text-sm hover:underline mt-2 inline-block"
              >
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
