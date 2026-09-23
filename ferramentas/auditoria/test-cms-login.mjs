import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const TOKEN = process.env.GH_TOKEN_TESTE
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu'] })
const page = await browser.newPage()

page.on('console', (m) => {
  const t = m.text()
  if (/config|error|Error|auth|login/i.test(t)) console.log('CONSOLE ' + m.type() + ': ' + t.slice(0, 250))
})
page.on('request', (r) => {
  if (r.url().includes('api.github.com')) console.log('REQ  ' + r.method() + ' ' + r.url().slice(0, 120))
})
page.on('response', (r) => {
  if (r.url().includes('api.github.com')) console.log('RESP ' + r.status() + ' ' + r.url().slice(0, 120))
})

await page.goto('https://frutiferasorganicas.com.br/cms', { waitUntil: 'networkidle2', timeout: 60000 })
await page.evaluate((t) => {
  localStorage.setItem('decap-cms-user', JSON.stringify({ token: t, backendName: 'github', name: 'Washington', login: 'washingtonfrade7-prog' }))
}, TOKEN)
console.log('=== RELOAD ===')
await page.reload({ waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 8000))
console.log('--- texto ---', (await page.evaluate(() => document.body.innerText.slice(0, 150))).replace(/\n/g, ' | '))
await browser.close()

