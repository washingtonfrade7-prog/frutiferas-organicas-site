import Link from 'next/link'
import FruitVisual from '@/components/FruitVisual'
import type { Frutifera } from '@/data/frutiferas'
import { getCategoria } from '@/data/categorias'

interface FrutiferaCardProps {
  fruta: Frutifera
}

export default function FrutiferaCard({ fruta }: FrutiferaCardProps) {
  const categoriaPrincipal = getCategoria(fruta.categorias[0])
  const temOferta = fruta.ofertas.some((o) => !o.url.startsWith('#'))

  return (
    <Link
      href={`/frutiferas/${fruta.slug}`}
      className="block relative bg-white rounded-xl shadow-sm hover:shadow-md transition group border border-cream-200 overflow-hidden"
    >
      <FruitVisual nome={fruta.nome} cor={fruta.cor} className="h-48" />

      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {fruta.destaque && (
          <span className="bg-terracotta-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Destaque</span>
        )}
        {fruta.dificuldade === 'Fácil' && (
          <span className="bg-forest-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Fácil de cultivar</span>
        )}
      </div>

      <div className="p-4">
        <p className="text-[11px] text-ink-500 uppercase tracking-wide mb-1">
          {categoriaPrincipal?.nome || 'Frutífera'}
        </p>
        <h3 className="font-display font-semibold text-base leading-snug mb-1 text-ink-900 group-hover:text-forest-700 transition">
          {fruta.nome}
        </h3>
        <p className="text-xs italic text-ink-500 mb-2">{fruta.nomeCientifico}</p>
        <p className="text-sm text-ink-600 leading-relaxed line-clamp-3">{fruta.resumo}</p>

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest-700 group-hover:text-terracotta-600 transition">
          {temOferta ? 'Ver ficha e onde comprar' : 'Ver ficha de cultivo'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
