/**
 * Corrige o og:image das paginas que definem `openGraph` proprio e acabam
 * perdendo a imagem do layout (o openGraph da pagina substitui o do layout).
 *
 * Para cada page.tsx em src/app com `openGraph: {` e sem `images:` no bloco,
 * insere a imagem padrao logo apos a abertura do objeto.
 *
 * Uso: node scripts/fix-og-image.mjs [--dry]
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const DRY = process.argv.includes('--dry')
const RAIZ = path.join(process.cwd(), 'src', 'app')
const IMG = "images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: 'Frutíferas Orgânicas' }],"

function arquivos(dir) {
  const out = []
  for (const nome of readdirSync(dir)) {
    const full = path.join(dir, nome)
    if (statSync(full).isDirectory()) out.push(...arquivos(full))
    else if (nome === 'page.tsx') out.push(full)
  }
  return out
}

let alterados = 0
for (const arquivo of arquivos(RAIZ)) {
  let txt = readFileSync(arquivo, 'utf8')
  const i = txt.indexOf('openGraph: {')
  if (i === -1) continue

  // janela apos a abertura do openGraph: se ja tem images, pula
  // (nao usamos indexOf('}') porque os template literals `${...}` quebram a contagem)
  const bloco = txt.slice(i, i + 600)
  if (bloco.includes('images:')) continue

  // insere logo apos `openGraph: {`
  const pos = i + 'openGraph: {'.length
  txt = txt.slice(0, pos) + '\n    ' + IMG + txt.slice(pos)
  if (!DRY) writeFileSync(arquivo, txt)
  alterados++
  console.log(`${DRY ? '[dry] ' : '[ok] '}${path.relative(process.cwd(), arquivo)}`)
}
console.log(`\n${alterados} arquivo(s) ${DRY ? 'a alterar' : 'alterado(s)'}.`)
