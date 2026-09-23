/**
 * Gera content/frutiferas.json a partir dos dados atuais (frutiferas.ts + extras),
 * para que o CMS remoto possa editar foto e textos das frutiferas.
 *
 * Uso: node ferramentas/auditoria/gerar_frutiferas_json.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAIZ = path.resolve(__dirname, '..', '..')
const DATA = path.join(RAIZ, 'src', 'data')
const TEMP = path.join(RAIZ, 'src', 'data', '_tmp_json')

mkdirSync(TEMP, { recursive: true })

function copiar(nome) {
  let t = readFileSync(path.join(DATA, nome), 'utf8')
  t = t.replace(/from '@\/data\/([a-zA-Z0-9-]+)'/g, "from './$1.ts'")
  writeFileSync(path.join(TEMP, nome), t)
}

for (const f of ['ofertas.ts', 'frutiferas-extras.ts', 'frutiferas.ts']) copiar(f)

const mod = await import(pathToFileURL(path.join(TEMP, 'frutiferas.ts')).href)
const frutiferas = mod.frutiferas

const dados = frutiferas.map((f) => ({
  slug: f.slug,
  nome: f.nome,
  imagem: f.imagem || '',
  galeria: f.galeria || [],
  resumo: f.resumo || '',
}))

mkdirSync(path.join(RAIZ, 'content'), { recursive: true })
writeFileSync(path.join(RAIZ, 'content', 'frutiferas.json'), JSON.stringify({ frutiferas: dados }, null, 2))
rmSync(TEMP, { recursive: true, force: true })

console.log('frutiferas.json gerado com', dados.length, 'frutiferas')
console.log('exemplo (jabuticaba):', JSON.stringify(dados.find((d) => d.slug === 'jabuticaba')))
