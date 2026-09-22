import { absoluteUrl, site } from '@/lib/site'
import { youtubeThumbnail } from '@/lib/video'

export function organizationJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
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
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    inLanguage: 'pt-BR',
  })
}

export function videoJsonLd(videos: { id: string; titulo: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: videos.map((video, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: video.titulo,
        embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
        thumbnailUrl: youtubeThumbnail(`https://www.youtube.com/watch?v=${video.id}`),
        uploadDate: undefined,
        description: video.titulo,
      },
    })),
  })
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
