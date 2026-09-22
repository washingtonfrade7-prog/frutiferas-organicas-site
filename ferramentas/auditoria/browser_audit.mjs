/**
 * Auditoria de navegador: simula usuarios reais.
 * - Carrega as principais paginas (desktop e mobile)
 * - Captura erros de console, erros de pagina e requisicoes falhas (>=400)
 * - Verifica overflow horizontal
 * - Testa o filtro de /frutiferas (categorias + busca)
 * - Verifica videos (iframes/thumbnails) e links de afiliado (rel=sponsored)
 * - Testa a validacao do formulario de newsletter
 *
 * Uso: node ferramentas/auditoria/browser_audit.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core'

const BASE = (process.argv[2] || 'http://localhost:4000').replace(/\/$/, '')
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const PAGINAS = [
  '/',
  '/frutiferas',
  '/frutiferas/jabuticaba',
  '/frutiferas/abacaxi',
  '/videos',
  '/guias',
  '/guias/plantio',
  '/categorias/nativas',
  '/comprar',
  '/comprar/vasos',
  '/melhores',
  '/melhores/melhores-vasos-para-frutiferas',
  '/mudas',
  '/mudas/jabuticaba',
  '/curso',
  '/creditos',
  '/contato',
]

const DESKTOP = { width: 1440, height: 900 }
const MOBILE = { width: 375, height: 812 }

const problemas = []
const info = []

function addProblema(pagina, msg) {
  problemas.push(`${pagina} :: ${msg}`)
}

async function abrir(browser, path, viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  const consoleErros = []
  const redeFalhas = []
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErros.push(m.text().slice(0, 200))
  })
  page.on('pageerror', (e) => consoleErros.push('pageerror: ' + e.message.slice(0, 200)))
  page.on('requestfailed', (r) => {
    const url = r.url()
    if (url.includes('googletagmanager') || url.includes('ezoic') || url.includes('doubleclick')) return
    redeFalhas.push(`${r.failure()?.errorText || 'failed'} ${url.slice(0, 120)}`)
  })
  page.on('response', (r) => {
    const url = r.url()
    if (r.status() >= 400 && !url.includes('googletagmanager') && !url.includes('ezoic') && !url.includes('doubleclick')) {
      redeFalhas.push(`HTTP ${r.status()} ${url.slice(0, 120)}`)
    }
  })
  await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 })
  return { page, consoleErros, redeFalhas }
}

async function auditarPagina(browser, path, viewport, rotulo) {
  const { page, consoleErros, redeFalhas } = await abrir(browser, path, viewport)
  try {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 2
    )
    const linksAfiliado = await page.$$eval('a[href*="mercadolivre"],a[href*="shopee"],a[href*="magalu"],a[href*="amazon"]', (as) =>
      as.map((a) => a.getAttribute('rel') || '')
    )
    const iframes = await page.$$eval('iframe[src*="youtube"]', (f) => f.length)
    const thumbs = await page.$$eval('img[src*="ytimg"],img[src*="i.ytimg"]', (i) => i.length)

    if (consoleErros.length) addProblema(`${rotulo} ${path}`, `console: ${consoleErros.slice(0, 3).join(' | ')}`)
    if (redeFalhas.length) addProblema(`${rotulo} ${path}`, `rede: ${redeFalhas.slice(0, 3).join(' | ')}`)
    if (overflow) addProblema(`${rotulo} ${path}`, 'overflow horizontal')
    const semSponsored = linksAfiliado.filter((r) => !r.includes('sponsored')).length
    if (semSponsored) addProblema(`${rotulo} ${path}`, `${semSponsored} link(s) de afiliado sem rel=sponsored`)

    info.push(`${rotulo} ${path} | iframes:${iframes} thumbs:${thumbs} afiliados:${linksAfiliado.length}`)
  } finally {
    await page.close()
  }
}

async function testarFiltro(browser) {
  const { page, consoleErros } = await abrir(browser, '/frutiferas', DESKTOP)
  try {
    const lerContagem = () =>
      page.$eval('p', (el) => el.textContent || '').catch(() => '')
    const contarCards = () => page.$$eval('a[href^="/frutiferas/"]', (a) => a.length)

    const textoInicial = await page.$$eval('p', (ps) => ps.map((p) => p.textContent).find((t) => /encontrada/.test(t || '')) || '')
    const totalInicial = await contarCards()
    info.push(`filtro /frutiferas | inicial: ${textoInicial}`)

    // clica em cada categoria do menu lateral
    const nomesCategorias = await page.$$eval('aside a', (as) => as.map((a) => a.textContent?.trim() || ''))
    for (const nome of nomesCategorias) {
      const [el] = await page.$$(`aside a`)
      // clica pelo texto
      const clicado = await page.evaluate((n) => {
        const a = [...document.querySelectorAll('aside a')].find((x) => x.textContent?.trim() === n)
        if (a) {
          a.click()
          return true
        }
        return false
      }, nome)
      if (!clicado) continue
      await new Promise((r) => setTimeout(r, 350))
      const total = await contarCards()
      const txt = await page.$$eval('p', (ps) => ps.map((p) => p.textContent).find((t) => /encontrada/.test(t || '')) || '')
      info.push(`  categoria "${nome}": ${txt}`)
      if (total > totalInicial) addProblema('filtro', `categoria "${nome}" aumentou o total (${total} > ${totalInicial})`)
    }

    // volta para todas e testa a busca
    await page.goto(BASE + '/frutiferas', { waitUntil: 'networkidle2' })
    await page.type('input[type="search"]', 'jabuticaba')
    await new Promise((r) => setTimeout(r, 500))
    const txtBusca = await page.$$eval('p', (ps) => ps.map((p) => p.textContent).find((t) => /encontrada/.test(t || '')) || '')
    const totalBusca = await contarCards()
    info.push(`  busca "jabuticaba": ${txtBusca}`)
    if (totalBusca === 0) addProblema('filtro', 'busca por "jabuticaba" retornou 0 resultados')

    if (consoleErros.length) addProblema('filtro /frutiferas', `console: ${consoleErros.slice(0, 3).join(' | ')}`)
  } finally {
    await page.close()
  }
}

async function testarNewsletter(browser) {
  const { page } = await abrir(browser, '/curso', DESKTOP)
  try {
    const input = await page.$('input[type="email"]')
    if (!input) {
      addProblema('newsletter /curso', 'campo de e-mail nao encontrado')
      return
    }
    // e-mail invalido: a validacao nativa do navegador deve barrar o envio
    await input.type('email-invalido')
    const botao = await page.$('form button[type="submit"]')
    await botao?.click()
    await new Promise((r) => setTimeout(r, 400))
    const valido = await page.$eval('input[type="email"]', (el) => el.validity.valid)
    info.push(`newsletter /curso | e-mail invalido barrado pela validacao nativa: ${!valido}`)
    if (valido) addProblema('newsletter /curso', 'e-mail invalido passou pela validacao')
  } finally {
    await page.close()
  }
}

async function testarInteracoes(browser) {
  // Menu mobile
  {
    const { page } = await abrir(browser, '/', MOBILE)
    try {
      const antes = await page.$$eval('header nav a', (a) => a.length)
      await page.click('button[aria-label="Abrir menu"]')
      await new Promise((r) => setTimeout(r, 300))
      const depois = await page.$$eval('header nav a', (a) => a.length)
      info.push(`menu mobile: links ${antes} -> ${depois}`)
      if (depois <= antes) addProblema('menu mobile', 'menu nao abriu ao clicar')
    } finally {
      await page.close()
    }
  }

  // Dropdown "Categorias" (desktop, clique)
  {
    const { page } = await abrir(browser, '/', DESKTOP)
    try {
      const antes = await page.$eval('header button[aria-haspopup="true"] + div', (el) => getComputedStyle(el).visibility)
      await page.click('header button[aria-haspopup="true"]')
      await new Promise((r) => setTimeout(r, 300))
      const depois = await page.$eval('header button[aria-haspopup="true"] + div', (el) => getComputedStyle(el).visibility)
      info.push(`dropdown categorias: ${antes} -> ${depois}`)
      if (depois !== 'visible') addProblema('dropdown categorias', 'nao abriu ao clicar')
    } finally {
      await page.close()
    }
  }

  // Video lite: clicar carrega o iframe
  {
    const { page } = await abrir(browser, '/videos', DESKTOP)
    try {
      const antes = await page.$$eval('iframe', (f) => f.length)
      const botao = await page.$('button[aria-label^="Assistir"]')
      if (!botao) {
        addProblema('video lite', 'nenhum botao de play encontrado')
      } else {
        await botao.click()
        await new Promise((r) => setTimeout(r, 1000))
        const depois = await page.$$eval('iframe', (f) => f.length)
        info.push(`video lite: iframes ${antes} -> ${depois}`)
        if (depois <= antes) addProblema('video lite', 'iframe nao carregou ao clicar')
      }
    } finally {
      await page.close()
    }
  }

  // FAQ (details)
  {
    const { page } = await abrir(browser, '/melhores/melhores-vasos-para-frutiferas', DESKTOP)
    try {
      const itens = await page.$$eval('details', (d) => d.length)
      await page.evaluate(() => {
        const d = document.querySelector('details')
        if (d) d.open = true
      })
      const respostas = await page.$$eval('details[open] p', (p) => p.length)
      info.push(`FAQ details: ${itens} itens | respostas visiveis: ${respostas}`)
      if (itens === 0) addProblema('FAQ', 'sem itens de FAQ')
    } finally {
      await page.close()
    }
  }
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  })

  for (const path of PAGINAS) {
    await auditarPagina(browser, path, DESKTOP, 'desktop')
  }
  for (const path of ['/', '/frutiferas', '/frutiferas/jabuticaba', '/curso']) {
    await auditarPagina(browser, path, MOBILE, 'mobile')
  }

  await testarFiltro(browser)
  await testarNewsletter(browser)
  await testarInteracoes(browser)

  await browser.close()

  console.log('\n================ INFO ================')
  info.forEach((i) => console.log('  ' + i))
  console.log('\n================ RESULTADO ================')
  console.log(`Problemas encontrados: ${problemas.length}`)
  if (problemas.length) {
    console.log('\n--- PROBLEMAS ---')
    problemas.forEach((p) => console.log('  ' + p))
  }
  process.exitCode = problemas.length ? 1 : 0
}

main()
