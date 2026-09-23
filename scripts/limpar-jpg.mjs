/**
 * Remove do servidor os arquivos .jpg antigos que foram substituidos por .webp.
 *
 * Uso: node scripts/limpar-jpg.mjs
 * Env: FTP_HOST, FTP_USER, FTP_PASS, FTP_DIR (padrao /public_html)
 */
import { execFile } from 'node:child_process'
import { readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const HOST = process.env.FTP_HOST
const USER = process.env.FTP_USER
const PASS = process.env.FTP_PASS
const DIR = (process.env.FTP_DIR || '/public_html').replace(/\/$/, '')
const CONC = Number(process.env.FTP_CONCURRENCY || 4)
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

if (!HOST || !USER || !PASS) {
  console.error('Defina FTP_HOST, FTP_USER e FTP_PASS.')
  process.exit(1)
}

const alvos = []
const pasta = 'public/frutiferas'
if (existsSync(pasta)) {
  for (const nome of readdirSync(pasta)) {
    if (nome.endsWith('.webp')) alvos.push(`/frutiferas/${nome.replace(/\.webp$/, '.jpg')}`)
  }
}
// banners antigos
alvos.push('/banners/banner-final.jpg')
alvos.push('/banners/inscreva-se.png')

async function deletar(rel) {
  const alvo = `${DIR}${rel}`
  for (let t = 1; t <= 3; t++) {
    try {
      await execFileAsync('curl', [
        '-sS', '--user', `${USER}:${PASS}`, '-Q', `DELE ${alvo}`, `ftp://${HOST}/`,
      ])
      return true
    } catch {
      if (t < 3) await dormir(400 * t)
    }
  }
  return false
}

let ok = 0
for (let i = 0; i < alvos.length; i += CONC) {
  const lote = alvos.slice(i, i + CONC)
  const r = await Promise.all(lote.map(deletar))
  ok += r.filter(Boolean).length
  if (i % 40 === 0) console.log(`  ${i + lote.length}/${alvos.length}`)
}
console.log(`Removidos/confirmados: ${ok} de ${alvos.length}`)
