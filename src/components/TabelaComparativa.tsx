import BotaoAfiliado from '@/components/BotaoAfiliado'
import { lojas } from '@/data/afiliados'
import type { Produto } from '@/data/produtos'

interface TabelaComparativaProps {
  produtos: Produto[]
  pagina: string
  posicao?: string
}

function primeiraLoja(produto: Produto): { nome: string; url: string } | null {
  for (const loja of lojas) {
    const url = produto.lojas[loja.id]
    if (loja.ativo && url) return { nome: loja.nome, url }
  }
  return null
}

export default function TabelaComparativa({
  produtos,
  pagina,
  posicao = 'tabela',
}: TabelaComparativaProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cream-200">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-cream-100 text-left text-ink-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Produto</th>
            <th className="px-4 py-3 font-semibold">Pontos fortes</th>
            <th className="px-4 py-3 font-semibold">Faixa de preço</th>
            <th className="px-4 py-3 font-semibold">Onde comprar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-200 bg-white">
          {produtos.map((produto) => {
            const loja = primeiraLoja(produto)
            return (
              <tr key={produto.slug} className={produto.destaque ? 'bg-forest-50/40' : undefined}>
                <td className="px-4 py-4 align-top">
                  <span className="block font-semibold text-ink-900">{produto.nome}</span>
                  {produto.destaque && (
                    <span className="mt-1 inline-block rounded-full bg-terracotta-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      Recomendado
                    </span>
                  )}
                  <span className="mt-2 block text-xs text-ink-500">{produto.resumo}</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <ul className="list-disc pl-4 text-xs text-ink-600 space-y-1">
                    {produto.pros.slice(0, 3).map((pro) => (
                      <li key={pro}>{pro}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4 align-top text-ink-700">{produto.faixaPreco || 'Consulte'}</td>
                <td className="px-4 py-4 align-top">
                  {loja ? (
                    <BotaoAfiliado
                      href={loja.url}
                      loja={loja.nome}
                      label="Ver"
                      categoria={produto.categoria}
                      pagina={pagina}
                      posicao={posicao}
                      className="w-full"
                    >
                      {loja.nome}
                    </BotaoAfiliado>
                  ) : (
                    <span className="text-xs text-ink-500">Em breve</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
