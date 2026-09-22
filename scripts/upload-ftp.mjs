/**
 * Envia a pasta out/ para a Hostinger via FTP (usando o curl do Windows).
 *
 * Variaveis de ambiente necessarias:
 *   FTP_HOST  ex.: ftp.frutiferasorganicas.com.br  (ou o IP da hospedagem)
 *   FTP_USER  ex.: u123456789
 *   FTP_PASS  senha da conta FTP
 *   FTP_DIR   pasta destino (padrao: /public_html)
 *
 * Uso:
 *   node scripts/upload-ftp.mjs
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const HOST = process.env.FTP_HOST
const USER = process.env.FTP_USER
const PASS = process.env.FTP_PASS
const DIR = (process.env.FTP_DIR || '/public_html').replace(/\/$/, '')
const OUT = 'out'

if (!HOST || !USER || !PASS) {
  console.error('Defina FTP_HOST, FTP_USER e FTP_PASS antes de rodar.')
  process.exit(1)
}

function listar(dir, base = '') {
  const itens = []
  for (const nome of readdirSync(dir)) {
    const full = path.join(dir, nome)
    const rel = base ? `${base}/${nome}` : nome
    if (statSync(full).isDirectory()) itens.push(...listar(full, rel))
    else itens.push({ full, rel })
  }
  return itens
}

const arquivos = listar(OUT)
console.log(`Enviando ${arquivos.length} arquivos para ftp://${HOST}${DIR} ...`)

let ok = 0
let falhas = 0
const CONCORRENCIA = 4

async function enviar(item) {
  const destino = `ftp://${HOST}${DIR}/${item.rel}`
  try {
    execFileSync(
      'curl',
      ['-sS', '-g', '--ftp-create-dirs', '--connect-timeout', '30', '--retry', '2', '--user', `${USER}:${PASS}`, '-T', item.full, destino],
      { stdio: 'pipe' }
    )
    ok++
    if (ok % 25 === 0) console.log(`  ${ok}/${arquivos.length}`)
  } catch (e) {
    falhas++
    console.error(`  FALHA: ${item.rel} - ${e.message}`)
  }
}

async function main() {
  for (let i = 0; i < arquivos.length; i += CONCORRENCIA) {
    await Promise.all(arquivos.slice(i, i + CONCORRENCIA).map(enviar))
  }
  console.log(`\nConcluido: ${ok} enviados, ${falhas} falhas.`)
  if (falhas) process.exitCode = 1
}

main()
