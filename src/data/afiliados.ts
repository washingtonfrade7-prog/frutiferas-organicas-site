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
// Identificacao de afiliado do Mercado Livre (extraida do link da lista).
// matt_word = sua tag/palavra; matt_tool = id numerico da ferramenta.
// ---------------------------------------------------------------------------
export const ML_AFILIADO = {
  palavra: 'washingtonfrade',
  ferramenta: '42700408',
}

// Monta o link rastreado do Mercado Livre a partir da URL do anuncio.
export function linkMLProduto(urlAnuncio: string): string {
  if (!urlAnuncio) return LISTA_MERCADO_LIVRE
  const separador = urlAnuncio.includes('?') ? '&' : '?'
  return `${urlAnuncio}${separador}matt_word=${ML_AFILIADO.palavra}&matt_tool=${ML_AFILIADO.ferramenta}`
}

// ---------------------------------------------------------------------------
// Links de produto do Mercado Livre (montados com a identificacao acima).
// Para trocar por um link curto gerado no painel, basta colar a URL completa.
// ---------------------------------------------------------------------------
export const LINKS_MERCADO_LIVRE: Record<string, string> = {
  'vaso-polietileno-90l': linkMLProduto(
    'https://produto.mercadolivre.com.br/MLB-1963562618-2-vasos-grande-largo-planta-muda-frutifera-polietileno-45x50-_JM'
  ),
  'vaso-autoirrigavel-medio': linkMLProduto(
    'https://produto.mercadolivre.com.br/MLB-2150099639-vaso-autoirrigavel-medio-n03-preto-linha-gourmet-plantei-_JM'
  ),
  'vaso-plastico-30l': linkMLProduto(
    'https://www.mercadolivre.com.br/vaso-redondo-cores-rattan-30-litros-para-varias-plantas-cor-preto/p/MLB29382307'
  ),
  'substrato-frutiferas-25kg': linkMLProduto(
    'https://produto.mercadolivre.com.br/MLB-2034428175-substrato-ha-viva-verde-25kg-plantar-bandeja-mudas-horta-_JM'
  ),
  'substrato-completo-2kg': '',
  'kit-perlita-vermiculita': '',
  'bokashi-dimy-1kg': linkMLProduto(
    'https://www.mercadolivre.com.br/fertilizante-dimy-bokashi-1kg-adubo-orgnico-farelado/p/MLB26661878'
  ),
  'bokashi-forth-15kg': '',
  'humus-minhoca': linkMLProduto(
    'https://www.mercadolivre.com.br/humus-de-minhoca-adubo-organico-100-natural-jardinagem-20kg/up/MLBU3155207335'
  ),
  'tesoura-poda-bypass': linkMLProduto(
    'https://www.mercadolivre.com.br/tesoura-de-poda-profissional-com-lamina-em-aco-bypass-e-cabo-emborrachado-laranja-tramontina/p/MLB23806114'
  ),
  'tesourao-poda-bypass-60cm': linkMLProduto(
    'https://www.mercadolivre.com.br/tesoura-de-poda-com-cabo-extensivel-bypass-tramontina/p/MLB31757767'
  ),
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
