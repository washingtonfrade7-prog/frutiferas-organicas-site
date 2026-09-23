import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu'] })
const page = await browser.newPage()
const logs = []
page.on('console', (m) => logs.push('[console] ' + m.type() + ': ' + m.text().slice(0, 200)))
page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message.slice(0, 200)))
page.on('response', (r) => {
  const u = r.url()
  if (r.status() >= 400) logs.push('[HTTP ' + r.status() + '] ' + u.slice(0, 140))
})

console.log('Abrindo /cms ...')
await page.goto('https://frutiferasorganicas.com.br/cms', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 2500))

// texto visivel
const texto = await page.evaluate(() => document.body.innerText.slice(0, 300))
console.log('--- texto da pagina ---')
console.log(texto)

// procura o botao de login
const botoes = await page.$$eval('button, a', (els) => els.map((e) => e.innerText.trim()).filter(Boolean).slice(0, 12))
console.log('--- botoes/links ---')
console.log(JSON.stringify(botoes))

// clica em "GitHub"
const clicou = await page.evaluate(() => {
  const el = [...document.querySelectorAll('button, a')].find((e) => /github/i.test(e.innerText))
  if (el) { el.click(); return true }
  return false
})
console.log('clicou no GitHub:', clicou)

await new Promise((r) => setTimeout(r, 4000))
const paginas = await browser.pages()
console.log('--- abas abertas ---')
for (const p of paginas) {
  console.log('  URL:', p.url().slice(0, 160))
  try {
    const t = await p.title()
    console.log('  titulo:', t)
  } catch {}
}

console.log('--- logs ---')
logs.forEach((l) => console.log('  ' + l))

await browser.close()
