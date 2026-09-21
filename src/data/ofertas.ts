export interface Oferta {
  loja: string
  url: string
  preco?: string
  destaque?: boolean
  descricao?: string
}

// ---------------------------------------------------------------------------
// EDITE AQUI: substitua as URLs "#" pelos seus links de afiliado reais.
// O atributo rel="sponsored noopener noreferrer" é aplicado automaticamente.
// ---------------------------------------------------------------------------

export const parceiros: Oferta[] = [
  {
    loja: 'Mercado Livre',
    url: '#',
    descricao: 'Mudas e insumos com envio para todo o Brasil',
    destaque: true,
  },
  {
    loja: 'Shopee',
    url: '#',
    descricao: 'Kit de cultivo e acessórios para vasos',
  },
  {
    loja: 'Amazon',
    url: '#',
    descricao: 'Substratos, adubos orgânicos e ferramentas',
  },
]

export function ofertasPadrao(): Oferta[] {
  return parceiros.map((p) => ({ ...p }))
}
