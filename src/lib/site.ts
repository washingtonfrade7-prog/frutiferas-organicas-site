export const site = {
  name: 'Frutíferas Orgânicas',
  tagline: 'Frutíferas orgânicas em vaso, direto para o seu quintal',
  description:
    'Portal de conteúdo sobre cultivo de frutíferas orgânicas em vaso. Aprenda a plantar, cuidar e colher e encontre onde comprar suas mudas e insumos nos melhores parceiros.',
  locale: 'pt_BR',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  email: process.env.NEXT_PUBLIC_EMAIL || 'contato@frutiferasorganicas.com.br',
  youtubeUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@Frut%C3%ADferasOrg%C3%A2nicas',
  youtubeLabel: '@FrutíferasOrgânicas',
  instagram: 'frutiferasorganicas',
  address: 'Ibitinga/SP - Brasil',
}

export function youtubeChannelUrl(): string {
  return site.youtubeUrl
}

export function absoluteUrl(path = '/'): string {
  return site.url + (path.startsWith('/') ? path : `/${path}`)
}

// As imagens de /frutiferas/ sao servidas com cache de 180 dias. Como o nome do
// arquivo nao muda quando a foto e trocada, usamos um selo de versao na URL para
// forcar o navegador a baixar a imagem nova.
export const ASSET_VERSION = '20260922'

export function imgUrl(src?: string | null): string {
  if (!src) return ''
  if (!src.startsWith('/frutiferas/')) return src
  return `${src}${src.includes('?') ? '&' : '?'}v=${ASSET_VERSION}`
}
