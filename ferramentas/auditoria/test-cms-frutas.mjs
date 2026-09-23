import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const TOKEN = process.env.GH_TOKEN_TESTE
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu'] })
const page = await browser.newPage()

await page.goto('https://frutiferasorganicas.com.br/cms', { waitUntil: 'networkidle2', timeout: 60000 })
await page.evaluate((t) => {
  localStorage.setItem('decap-cms-user', JSON.stringify({ token: t, backendName: 'github', name: 'W', login: 'washingtonfrade7-prog' }))
}, TOKEN)
await page.reload({ waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 6000))

const ok = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a')].find((x) => (x.getAttribute('href') || '').includes('entries/frutiferas'))
  if (a) { a.click(); return true }
  return false
})
console.log('clicou:', ok)
await new Promise((r) => setTimeout(r, 6000))
const t = await page.evaluate(() => document.body.innerText.replace(/\n+/g, ' | ').slice(0, 400))
console.log('TELA:', t)
await browser.close()
