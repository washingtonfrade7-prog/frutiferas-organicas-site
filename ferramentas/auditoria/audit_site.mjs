/**
 * Auditoria funcional do site (crawl + checagem de status, links, imagens e SEO).
 *
 * Uso:
 *   node ferramentas/auditoria/audit_site.mjs [baseUrl]
 */
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

const erros = []
const avisos = []
const visitados = new Set()
const linksInternos = new Set()
const imagens = new Set()
const titulos = new Map()
let totalImgsSemAlt = 0
let totalLinksVazios = 0
let totalAninhados = 0
let totalIdsDuplicados = 0

async function req(path, method = 'GET') {
  const t0 = Date.now()
  const res = await fetch(BASE + path, { method, redirect: 'manual' })
  const ms = Date.now() - t0
  return { res, ms }
}

function extrair(html) {
  const links = [...html.matchAll(/(?:href|src)="(\/[^"#?]+)/g)].map((m) => m[1])
  const srcset = [...html.matchAll(/srcSet="([^"]+)"/g)].flatMap((m) =>
    m[1].split(',').map((s) => s.trim().split(' ')[0])
  )
  // imagens otimizadas do Next: /_next/image?url=%2Ffrutiferas%2Fx.jpg&...
  const otimizadas = [...html.matchAll(/\/_next\/image\?url=([^&"']+)/g)].map((m) => {
    try {
      return decodeURIComponent(m[1])
    } catch {
      return null
    }
  })
  return { links: [...links, ...srcset, ...otimizadas.filter(Boolean)] }
}

async function checarPagina(path) {
  if (visitados.has(path)) return
  visitados.add(path)
  try {
    const { res, ms } = await req(path)
    if (res.status !== 200) {
      erros.push(`STATUS ${res.status} em ${path}`)
      return
    }
    const tipo = res.headers.get('content-type') || ''
    if (!tipo.includes('text/html')) return
    const html = await res.text()

    // SEO básico
    const title = html.match(/<title>(.*?)<\/title>/s)
    if (!title) erros.push(`SEM <title> em ${path}`)
    else {
      const t = title[1].trim()
      if (titulos.has(t)) avisos.push(`Título duplicado: "${t}" em ${path} e ${titulos.get(t)}`)
      else titulos.set(t, path)
    }
    const desc = html.match(/name="description" content="([^"]*)"/)
    if (!desc || desc[1].length < 40) avisos.push(`Meta description curta/ausente em ${path}`)
    if (!/rel="canonical"/.test(html)) avisos.push(`Sem canonical em ${path}`)
    if (!/application\/ld\+json/.test(html)) avisos.push(`Sem JSON-LD em ${path}`)

    // Qualidade de HTML
    const semAlt = [...html.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)].length
    if (semAlt) {
      totalImgsSemAlt += semAlt
      avisos.push(`${semAlt} <img> sem alt em ${path}`)
    }
    const linksVazios = [...html.matchAll(/<a\b[^>]*>(?:\s|&nbsp;)*<\/a>/g)].length
    if (linksVazios) {
      totalLinksVazios += linksVazios
      avisos.push(`${linksVazios} link(s) vazio(s) em ${path}`)
    }
    if (/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/i.test(html)) {
      totalAninhados++
      erros.push(`<a> aninhado em <a> em ${path}`)
    }
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
    if (dup.length) {
      totalIdsDuplicados += dup.length
      avisos.push(`IDs duplicados (${[...new Set(dup)].join(', ')}) em ${path}`)
    }

    const { links } = extrair(html)
    for (const l of links) {
      if (l.startsWith('/_next/')) continue
      if (/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(l)) imagens.add(l)
      else if (!l.startsWith('/api')) linksInternos.add(l)
    }
    if (ms > 3000) avisos.push(`Lenta (${ms}ms): ${path}`)
  } catch (e) {
    erros.push(`FALHA ${path}: ${e.message}`)
  }
}

async function checarImagem(path) {
  try {
    const res = await fetch(BASE + path, { method: 'HEAD' })
    if (res.status !== 200) erros.push(`IMAGEM ${res.status} em ${path}`)
  } catch (e) {
    erros.push(`IMAGEM falha ${path}: ${e.message}`)
  }
}

async function main() {
  console.log(`Auditando ${BASE} ...`)
  const sm = await fetch(BASE + '/sitemap.xml').then((r) => r.text())
  const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/')
  console.log(`URLs no sitemap: ${urls.length}`)

  // crawl BFS a partir do sitemap
  const fila = [...new Set(['/', ...urls])]
  while (fila.length && visitados.size < 400) {
    const path = fila.shift()
    await checarPagina(path)
    for (const l of linksInternos) {
      if (!visitados.has(l) && !fila.includes(l)) fila.push(l)
    }
  }

  // checa imagens descobertas
  const listaImagens = [...imagens]
  for (let i = 0; i < listaImagens.length; i += 25) {
    await Promise.all(listaImagens.slice(i, i + 25).map(checarImagem))
  }

  console.log('\n================ RESULTADO ================')
  console.log(`Páginas verificadas : ${visitados.size}`)
  console.log(`Links internos      : ${linksInternos.size}`)
  console.log(`Imagens verificadas : ${listaImagens.length}`)
  console.log(`Títulos únicos      : ${titulos.size}`)
  console.log(`<img> sem alt       : ${totalImgsSemAlt}`)
  console.log(`Links vazios        : ${totalLinksVazios}`)
  console.log(`<a> aninhados       : ${totalAninhados}`)
  console.log(`IDs duplicados      : ${totalIdsDuplicados}`)
  console.log(`Erros               : ${erros.length}`)
  console.log(`Avisos              : ${avisos.length}`)
  if (erros.length) {
    console.log('\n--- ERROS ---')
    erros.slice(0, 60).forEach((e) => console.log('  ' + e))
  }
  if (avisos.length) {
    console.log('\n--- AVISOS (amostra) ---')
    avisos.slice(0, 40).forEach((a) => console.log('  ' + a))
  }
  process.exitCode = erros.length ? 1 : 0
}

main()
