import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu'] })
const page = await browser.newPage()

await page.exposeFunction('registrar', (m) => console.log('MENSAGEM:', String(m).slice(0, 200)))
await page.goto('https://frutiferasorganicas.com.br/cms', { waitUntil: 'networkidle2', timeout: 60000 })

await page.evaluate(() => {
  let popup = null
  window.addEventListener('message', (e) => {
    window.registrar('recebi: ' + e.data)
    if (String(e.data).indexOf('authorizing:') === 0 && popup) {
      // simula o painel respondendo (como o Decap faz)
      popup.postMessage('authorizing:github', e.origin)
    }
  })
  popup = window.open('/admin/oauth/callback?code=CODIGO_INVALIDO', 'teste', 'width=500,height=400')
})

await new Promise((r) => setTimeout(r, 8000))
await browser.close()
