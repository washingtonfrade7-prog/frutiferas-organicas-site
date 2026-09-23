// Os artigos comerciais agora ficam em content/artigos.json para poderem ser
// editados pelo painel de administracao (npm run painel).
import artigos from '../../content/artigos.json'

export interface ArtigoComercial {
  slug: string
  titulo: string
  h1: string
  descricao: string
  resumo: string
  produtos: string[]
  secoes: { titulo: string; paragrafos: string[] }[]
  faq: { pergunta: string; resposta: string }[]
  atualizado: string
}

export const artigosComerciais: ArtigoComercial[] = (artigos as { artigos: ArtigoComercial[] }).artigos

export function getArtigoComercial(slug: string): ArtigoComercial | undefined {
  return artigosComerciais.find((a) => a.slug === slug)
}
