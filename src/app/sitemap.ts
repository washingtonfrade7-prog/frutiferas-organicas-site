import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { frutiferas } from '@/data/frutiferas'
import { categorias } from '@/data/categorias'
import { topicos } from '@/data/aprender'
import { categoriasCompra } from '@/data/produtos'
import { artigosComerciais } from '@/data/melhores'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url
  const agora = new Date()

  const estaticas: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: agora, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/frutiferas`, lastModified: agora, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/videos`, lastModified: agora, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/guias`, lastModified: agora, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/comprar`, lastModified: agora, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/melhores`, lastModified: agora, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/mudas`, lastModified: agora, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/sobre`, lastModified: agora, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contato`, lastModified: agora, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/aviso-de-afiliados`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/politica-de-privacidade`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const cats: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${base}/categorias/${cat.slug}`,
    lastModified: agora,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const frutas: MetadataRoute.Sitemap = frutiferas.map((f) => ({
    url: `${base}/frutiferas/${f.slug}`,
    lastModified: agora,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const guias: MetadataRoute.Sitemap = topicos.map((t) => ({
    url: `${base}/guias/${t.slug}`,
    lastModified: agora,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const compras: MetadataRoute.Sitemap = categoriasCompra.map((c) => ({
    url: `${base}/comprar/${c.slug}`,
    lastModified: agora,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const comerciais: MetadataRoute.Sitemap = artigosComerciais.map((a) => ({
    url: `${base}/melhores/${a.slug}`,
    lastModified: agora,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const mudas: MetadataRoute.Sitemap = frutiferas.map((f) => ({
    url: `${base}/mudas/${f.slug}`,
    lastModified: agora,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...estaticas, ...cats, ...frutas, ...guias, ...compras, ...comerciais, ...mudas]
}
