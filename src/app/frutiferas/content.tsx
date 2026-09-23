'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import FrutiferaCard from '@/components/FrutiferaCard'
import BannerSlot from '@/components/BannerSlot'
import AdSlot from '@/components/Ads'
import { categorias, getCategoria } from '@/data/categorias'
import { situacoes, getSituacao } from '@/data/situacoes'
import { frutiferas } from '@/data/frutiferas'

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const DIFICULDADES = ['Fácil', 'Média', 'Avançada']
const LUZES = ['Sol pleno', 'Meia-sombra']

export default function FrutiferasContent() {
  // O estado inicial e vazio para que o HTML estatico (SSG) inclua TODAS as
  // frutiferas (bom para indexacao). Depois de hidratar, lemos os parametros
  // da URL (?cat=, ?q=, ?sit=, ?dif=, ?luz=) e aplicamos o filtro.
  const [cat, setCat] = useState('')
  const [busca, setBusca] = useState('')
  const [termo, setTermo] = useState('')
  const [sit, setSit] = useState('')
  const [dif, setDif] = useState('')
  const [luz, setLuz] = useState('')

  useEffect(() => {
    function lerParams() {
      const params = new URLSearchParams(window.location.search)
      setCat(params.get('cat') || '')
      const q = params.get('q') || ''
      setBusca(q)
      setTermo(q)
      setSit(params.get('sit') || '')
      setDif(params.get('dif') || '')
      setLuz(params.get('luz') || '')
    }
    lerParams()
    window.addEventListener('popstate', lerParams)
    return () => window.removeEventListener('popstate', lerParams)
  }, [])

  // debounce simples da busca
  useEffect(() => {
    const t = setTimeout(() => setTermo(busca), 250)
    return () => clearTimeout(t)
  }, [busca])

  const lista = useMemo(() => {
    let itens = frutiferas
    if (cat) itens = itens.filter((f) => f.categorias.includes(cat))
    if (sit) {
      const s = getSituacao(sit)
      if (s) itens = itens.filter((f) => s.slugs.includes(f.slug))
    }
    if (dif) itens = itens.filter((f) => normalizar(f.dificuldade).includes(normalizar(dif)))
    if (luz) itens = itens.filter((f) => normalizar(f.luz).includes(normalizar(luz)))
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
  }, [cat, termo, sit, dif, luz])

  const catSelecionada = cat ? getCategoria(cat) : undefined
  const sitSelecionada = sit ? getSituacao(sit) : undefined

  function limpar() {
    setCat('')
    setBusca('')
    setSit('')
    setDif('')
    setLuz('')
  }

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
          <div className="mb-5">
            <h2 className="text-sm font-bold text-ink-900 mb-2">O que você procura?</h2>
            <div className="flex flex-wrap gap-2">
              {situacoes.map((s) => (
                <Link
                  key={s.slug}
                  href={`/frutiferas?sit=${s.slug}`}
                  onClick={() => setSit(s.slug)}
                  title={s.descricao}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${sit === s.slug ? 'bg-forest-600 text-white border-forest-600 font-medium' : 'bg-white text-ink-600 border-cream-200 hover:border-forest-300 hover:text-forest-600'}`}
                >
                  {s.nome}
                </Link>
              ))}
              {sit && (
                <button
                  type="button"
                  onClick={() => setSit('')}
                  className="px-3 py-1.5 rounded-full text-sm text-terracotta-700 hover:underline"
                >
                  limpar
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar frutífera pelo nome..."
              className="border border-cream-200 rounded-lg px-4 py-2.5 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-forest-200 focus:border-forest-600"
            />
            <select
              value={dif}
              onChange={(e) => setDif(e.target.value)}
              aria-label="Filtrar por dificuldade"
              className="border border-cream-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest-200"
            >
              <option value="">Dificuldade: todas</option>
              {DIFICULDADES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={luz}
              onChange={(e) => setLuz(e.target.value)}
              aria-label="Filtrar por luz"
              className="border border-cream-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest-200"
            >
              <option value="">Luz: todas</option>
              {LUZES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {sitSelecionada && (
            <p className="text-sm text-ink-500 mb-3">
              <strong className="text-ink-900">{sitSelecionada.nome}:</strong> {sitSelecionada.descricao}
            </p>
          )}

          <p className="text-sm text-ink-500 mb-4">{lista.length} frutífera(s) encontrada(s)</p>

          {lista.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-ink-500">Nenhuma frutífera encontrada.</p>
              <button
                type="button"
                onClick={limpar}
                className="text-forest-600 text-sm hover:underline mt-2 inline-block"
              >
                Limpar filtros
              </button>
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
