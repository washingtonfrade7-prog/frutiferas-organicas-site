/**
 * Auditoria de acessibilidade (axe-core injetado na pagina) — WCAG 2.1 A/AA.
 * Uso: node ferramentas/auditoria/a11y_audit.mjs [baseUrl]
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const BASE = (process.argv[2] || 'http://localhost:4000').replace(/\/$/, '')
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const AXE_SRC = readFileSync(
  path.join(process.cwd(), 'node_modules', 'axe-core', 'axe.min.js'),
  'utf8'
)

const PAGINAS = [
  '/',
  '/frutiferas',
  '/frutiferas/jabuticaba',
  '/videos',
  '/guias',
  '/guias/plantio',
  '/comprar',
  '/comprar/vasos',
  '/melhores',
  '/melhores/melhores-vasos-para-frutiferas',
  '/mudas',
  '/mudas/jabuticaba',
  '/categorias/nativas',
  '/curso',
  '/calendario',
  '/catalogo-embed',
  '/creditos',
  '/politica-de-privacidade',
  '/aviso-de-afiliados',
  '/sobre',
  '/contato',
]

const porRegra = new Map()

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  })

  for (const path_ of PAGINAS) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })
    try {
      await page.goto(BASE + path_, { waitUntil: 'networkidle2', timeout: 60000 })
      await page.addScriptTag({ content: AXE_SRC })
      const resultado = await page.evaluate(async () => {
        // @ts-ignore
        return await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] })
      })
      const viol = resultado.violations
      console.log(`${path_}: ${viol.length} violacao(oes)`)
      for (const v of viol) {
        const chave = `${v.id} :: ${v.help}`
        if (!porRegra.has(chave)) {
          porRegra.set(chave, {
            id: v.id,
            help: v.help,
            impacto: v.impact,
            paginas: [],
            exemplo: (v.nodes[0]?.html || '').slice(0, 140),
          })
        }
        porRegra.get(chave).paginas.push(path_)
      }
    } catch (e) {
      console.log(`${path_}: ERRO ${e.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()

  console.log('\n================ RESUMO POR REGRA ================')
  const regras = [...porRegra.values()].sort((a, b) => b.paginas.length - a.paginas.length)
  if (regras.length === 0) console.log('Nenhuma violacao encontrada.')
  for (const r of regras) {
    console.log(`\n[${r.impacto}] ${r.id} - ${r.help}`)
    console.log(`  paginas: ${r.paginas.length} (${[...new Set(r.paginas)].slice(0, 6).join(', ')})`)
    console.log(`  exemplo: ${r.exemplo}`)
  }
  process.exitCode = regras.length ? 1 : 0
}

main()
