import { absoluteUrl, site } from '@/lib/site'
import videoDatasJson from '@/data/video-datas.json'

export function organizationJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.description,
    email: site.email,
    sameAs: [site.youtubeUrl, `https://instagram.com/${site.instagram}`],
  })
}

export function websiteJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/frutiferas?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  })
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  })
}

export function articleJsonLd(article: {
  title: string
  description: string
  path: string
  image?: string
  published?: string
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    mainEntityOfPage: absoluteUrl(article.path),
    image: article.image ? [article.image] : undefined,
    datePublished: article.published,
    dateModified: article.published,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    inLanguage: 'pt-BR',
  })
}

// Datas reais de publicacao dos videos do canal (geradas a partir da API do
// YouTube). O Google exige uploadDate no VideoObject para exibir o video nos
// resultados de busca; sem esse campo o rich result nao aparece.
const videoDatas = videoDatasJson as Record<string, string>
const DATA_FALLBACK = '2024-01-01T12:00:00+00:00'

function uploadDateDoVideo(id: string): string {
  return videoDatas[id] || DATA_FALLBACK
}

export function videoJsonLd(videos: { id: string; titulo: string }[]): string {
  const itens = videos.map((video) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.titulo,
    description: video.titulo,
    thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`],
    uploadDate: uploadDateDoVideo(video.id),
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    inLanguage: 'pt-BR',
    isFamilyFriendly: true,
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: { '@type': 'ImageObject', url: `${site.url}/logo.png` },
    },
  }))
  return JSON.stringify(itens.length === 1 ? itens[0] : itens)
}

export function faqJsonLd(faq: { pergunta: string; resposta: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  })
}

export function itemListJsonLd(items: { name: string; url: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  })
}

export function productListJsonLd(items: { name: string; url: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Product', name: item.name, url: item.url },
    })),
  })
}

export function howToJsonLd(howto: {
  nome: string
  descricao: string
  passos: { titulo: string; texto: string }[]
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howto.nome,
    description: howto.descricao,
    step: howto.passos.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: p.titulo,
      text: p.texto,
    })),
  })
}

export function fruitJsonLd(fruit: {
  nome: string
  nomeCientifico?: string
  descricao: string
  slug: string
  imagem?: string
  categoriaNome: string
  ofertas: { loja: string; url: string; preco?: string }[]
}): string {
  const hasOffer = fruit.ofertas.length > 0 && !fruit.ofertas[0].url.startsWith('#')
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: fruit.nome,
    description: fruit.descricao,
    category: fruit.categoriaNome,
    image: fruit.imagem,
    url: absoluteUrl(`/frutiferas/${fruit.slug}`),
    ...(fruit.nomeCientifico ? { alternateName: fruit.nomeCientifico } : {}),
    ...(hasOffer
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'BRL',
            lowPrice: fruit.ofertas[0].preco?.replace(/[^0-9,\.]/g, '').replace(',', '.'),
            offerCount: fruit.ofertas.length,
            availability: 'https://schema.org/InStock',
            url: fruit.ofertas[0].url,
          },
        }
      : {}),
  })
}
