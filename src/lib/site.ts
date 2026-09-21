export const site = {
  name: 'Frutíferas Orgânicas',
  tagline: 'Frutíferas orgânicas em vaso, direto para o seu quintal',
  description:
    'Portal de conteúdo sobre cultivo de frutíferas orgânicas em vaso. Aprenda a plantar, cuidar e colher e encontre onde comprar suas mudas e insumos nos melhores parceiros.',
  locale: 'pt_BR',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  email: process.env.NEXT_PUBLIC_EMAIL || 'frutiferasorganicas@gmail.com',
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
