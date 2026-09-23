/**
 * Envia a pasta out/ para a Hostinger via FTP (usando o curl do Windows).
 *
 * - Pula arquivos que nao mudaram desde o ultimo envio (manifesto local).
 * - Resiliente a bloqueios do servidor: cada arquivo tem retry e, no fim,
 *   os pendentes entram em rodadas de retry com pausa.
 *
 * Variaveis de ambiente:
 *   FTP_HOST, FTP_USER, FTP_PASS, FTP_DIR (padrao: /public_html)
 *   FTP_CONCURRENCY (padrao: 4)
 *   FTP_FORCE=1  -> reenvia tudo (ignora o manifesto)
 *
 * Uso: node scripts/upload-ftp.mjs
 */
import { execFile } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

const HOST = process.env.FTP_HOST
const USER = process.env.FTP_USER
const PASS = process.env.FTP_PASS
const DIR = (process.env.FTP_DIR || '/public_html').replace(/\/$/, '')
const OUT = 'out'
const CONCORRENCIA = Number(process.env.FTP_CONCURRENCY || 4)
const FORCE = process.env.FTP_FORCE === '1'
const MANIFESTO = '.upload-manifest.json'

if (!HOST || !USER || !PASS) {
  console.error('Defina FTP_HOST, FTP_USER e FTP_PASS antes de rodar.')
  process.exit(1)
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

function listar(dir, base = '') {
  const itens = []
  for (const nome of readdirSync(dir)) {
    const full = path.join(dir, nome)
    const rel = base ? `${base}/${nome}` : nome
    if (statSync(full).isDirectory()) itens.push(...listar(full, rel))
    else itens.push({ full, rel, size: statSync(full).size, mtime: Math.round(statSync(full).mtimeMs) })
  }
  return itens
}

const todos = listar(OUT)
const manifesto = existsSync(MANIFESTO) ? JSON.parse(readFileSync(MANIFESTO, 'utf8')) : {}
const novos = {}

const arquivos = todos.filter((a) => {
  const antigo = manifesto[a.rel]
  const inalterado = antigo && antigo.size === a.size && antigo.mtime === a.mtime
  if (!FORCE && inalterado) {
    novos[a.rel] = { size: a.size, mtime: a.mtime }
    return false
  }
  return true
})

console.log(
  `Total: ${todos.length} arquivos | a enviar: ${arquivos.length} (pulando ${todos.length - arquivos.length} inalterados)`
)
if (arquivos.length === 0) {
  console.log('Nada a fazer — tudo ja esta publicado.')
  process.exit(0)
}

let ok = 0
let enviados = 0

async function enviarUma(item) {
  const destino = `ftp://${HOST}${DIR}/${item.rel}`
  await execFileAsync(
    'curl',
    [
      '-sS', '-g', '--ftp-create-dirs',
      '--connect-timeout', '30',
      '--max-time', '180',
      '--user', `${USER}:${PASS}`,
      '-T', item.full, destino,
    ],
    { maxBuffer: 4 * 1024 * 1024 }
  )
}

async function enviar(item) {
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      await enviarUma(item)
      ok++
      enviados++
      novos[item.rel] = { size: item.size, mtime: item.mtime }
      if (ok % 50 === 0) console.log(`  ${ok}/${arquivos.length}`)
      return null
    } catch {
      if (tentativa < 3) await dormir(400 * tentativa)
    }
  }
  return item
}

async function rodada(lista, concorrencia) {
  const falhas = []
  for (let i = 0; i < lista.length; i += concorrencia) {
    const lote = lista.slice(i, i + concorrencia)
    const resultados = await Promise.all(lote.map(enviar))
    for (const r of resultados) if (r) falhas.push(r)
    if (falhas.length >= 20 && falhas.length > lote.length) await dormir(20000)
    // grava o manifesto periodicamente (permite retomar de onde parou)
    if (enviados > 0 && enviados % 100 === 0) writeFileSync(MANIFESTO, JSON.stringify(novos))
  }
  return falhas
}

async function main() {
  let pendentes = await rodada(arquivos, CONCORRENCIA)

  let volta = 0
  while (pendentes.length > 0 && volta < 6) {
    volta++
    const pausa = Math.min(60000, 15000 * volta)
    console.log(`\n[retry ${volta}] ${pendentes.length} pendentes — aguardando ${pausa / 1000}s...`)
    await dormir(pausa)
    pendentes = await rodada(pendentes, Math.max(1, Math.floor(CONCORRENCIA / 2)))
  }

  writeFileSync(MANIFESTO, JSON.stringify(novos, null, 0))
  console.log(`\nConcluido: ${ok} enviados, ${pendentes.length} falhas.`)
  if (pendentes.length) {
    console.log('Pendentes:')
    pendentes.slice(0, 20).forEach((p) => console.log('  ' + p.rel))
    process.exitCode = 1
  }
}

main()
