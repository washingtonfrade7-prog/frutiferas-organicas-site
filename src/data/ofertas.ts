export interface Oferta {
  loja: string
  url: string
  preco?: string
  destaque?: boolean
  descricao?: string
}

// ---------------------------------------------------------------------------
// EDITE AQUI: links de afiliado. O atributo rel="sponsored noopener noreferrer"
// é aplicado automaticamente nos botões.
// ---------------------------------------------------------------------------

export const parceiros: Oferta[] = [
  {
    loja: 'Mercado Livre',
    url: 'https://mercadolivre.com/sec/2QD39UP',
    descricao: 'Mudas e insumos com envio para todo o Brasil',
    destaque: true,
  },
  // Adicione novos parceiros aqui quando tiver os links:
  // {
  //   loja: 'Shopee',
  //   url: 'https://...',
  //   descricao: 'Kit de cultivo e acessórios para vasos',
  // },
  // {
  //   loja: 'Amazon',
  //   url: 'https://...',
  //   descricao: 'Substratos, adubos orgânicos e ferramentas',
  // },
]

export function ofertasPadrao(): Oferta[] {
  return parceiros.map((p) => ({ ...p }))
}
