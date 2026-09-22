/**
 * Empacota a pasta out/ (export estatico) em frutiferas-site.zip,
 * incluindo arquivos ocultos como o .htaccess.
 *
 * Uso: npm run package
 */
import { execFileSync } from 'node:child_process'
import { existsSync, rmSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'out')
const zip = path.join(root, 'frutiferas-site.zip')

if (!existsSync(outDir)) {
  console.error('Pasta out/ nao encontrada. Rode "npm run build" primeiro.')
  process.exit(1)
}

if (existsSync(zip)) rmSync(zip)

const ps = `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${outDir.replace(/'/g, "''")}', '${zip.replace(/'/g, "''")}', [System.IO.Compression.CompressionLevel]::Optimal, $false)`

execFileSync('powershell', ['-NoProfile', '-Command', ps], { stdio: 'inherit' })

const mb = (statSync(zip).size / 1024 / 1024).toFixed(1)
console.log(`\nPacote pronto: ${zip} (${mb} MB)`)
console.log('Envie e extraia este zip dentro de public_html na Hostinger.')
