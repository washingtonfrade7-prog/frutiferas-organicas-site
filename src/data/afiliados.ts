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
// Usado como padrao enquanto o link de um produto especifico nao for informado.
export const LISTA_MERCADO_LIVRE = 'https://mercadolivre.com/sec/2QD39UP'

// ---------------------------------------------------------------------------
// COLE AQUI os links de produto do Mercado Livre (gerados no painel de afiliados).
// Enquanto um link estiver vazio, o produto usa a lista geral acima.
// Ex.: 'vaso-polietileno-90l': 'https://mercadolivre.com/sec/XXXXXX',
// ---------------------------------------------------------------------------
export const LINKS_MERCADO_LIVRE: Record<string, string> = {
  'vaso-polietileno-90l': '',
  'vaso-autoirrigavel-medio': '',
  'vaso-plastico-30l': '',
  'substrato-frutiferas-25kg': '',
  'substrato-completo-2kg': '',
  'kit-perlita-vermiculita': '',
  'bokashi-dimy-1kg': '',
  'bokashi-forth-15kg': '',
  'humus-minhoca': '',
  'tesoura-poda-bypass': '',
  'tesourao-poda-bypass-60cm': '',
  'kit-jardinagem-10-pecas': '',
  'regador-bico-longo': '',
  'borrifador-pulverizador': '',
  'kit-plantio-completo': '',
  'sementes-frutiferas': '',
}

export function linkMercadoLivre(slug: string): string {
  return LINKS_MERCADO_LIVRE[slug] || LISTA_MERCADO_LIVRE
}

// Campanha vigente (usada nos Sub_ids quando formos gerar links por produto).
export const CAMPANHA = '2026q4'

export function lojaAtiva(id: LojaId): boolean {
  return lojas.some((l) => l.id === id && l.ativo)
}
