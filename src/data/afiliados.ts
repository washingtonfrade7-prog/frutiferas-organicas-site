// ---------------------------------------------------------------------------
// Configuracao central de afiliados.
// ---------------------------------------------------------------------------

export type LojaId = 'mercadoLivre' | 'magalu' | 'amazon' | 'shopee'

export interface LojaAfiliado {
  id: LojaId
  nome: string
  ativo: boolean
  comissao?: string
}

export const lojas: LojaAfiliado[] = [
  { id: 'mercadoLivre', nome: 'Mercado Livre', ativo: true, comissao: 'ate 12%' },
  { id: 'magalu', nome: 'Magalu', ativo: false },
  { id: 'amazon', nome: 'Amazon', ativo: false },
  { id: 'shopee', nome: 'Shopee', ativo: false },
]

// Link de afiliado (lista de produtos) do Mercado Livre.
// Substitua/expanda pelos links de produto individuais quando estiverem gerados.
export const LISTA_MERCADO_LIVRE = 'https://mercadolivre.com/sec/2QD39UP'

// Campanha vigente (usada nos Sub_ids quando formos gerar links por produto).
export const CAMPANHA = '2026q4'

export function lojaAtiva(id: LojaId): boolean {
  return lojas.some((l) => l.id === id && l.ativo)
}
