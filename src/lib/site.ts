export const site = {
  name: 'Frutíferas Orgânicas',
  tagline: 'Frutíferas orgânicas em vaso, direto para o seu quintal',
  description:
    'Portal de conteúdo sobre cultivo de frutíferas orgânicas em vaso. Aprenda a plantar, cuidar e colher e encontre onde comprar suas mudas e insumos nos melhores parceiros.',
  locale: 'pt_BR',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  email: process.env.NEXT_PUBLIC_EMAIL || 'contato@frutiferasorganicas.com.br',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '5521989297468',
  whatsappLabel: '(21) 98929-7468',
  youtubeHandle: process.env.NEXT_PUBLIC_YOUTUBE_HANDLE || 'hortomeireles7038',
  instagram: 'frutiferasorganicas',
  address: 'Ibitinga/SP - Brasil',
}

export function whatsappLink(message?: string): string {
  const base = `https://api.whatsapp.com/send?phone=${site.whatsapp}`
  return message ? `${base}&text=${encodeURIComponent(message)}` : base
}

export function youtubeChannelUrl(): string {
  return `https://youtube.com/@${site.youtubeHandle}`
}

export function absoluteUrl(path = '/'): string {
  return site.url + (path.startsWith('/') ? path : `/${path}`)
}
