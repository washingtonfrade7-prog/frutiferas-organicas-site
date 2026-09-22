/**
 * Teste de carga: simula dezenas de usuarios simultaneos navegando no site.
 *
 * Uso:
 *   node ferramentas/auditoria/load_test.mjs [baseUrl] [concorrencia] [total]
 * Ex.:
 *   node ferramentas/auditoria/load_test.mjs http://localhost:3000 30 600
 */
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
const CONCORRENCIA = Number(process.argv[3] || 30)
const TOTAL = Number(process.argv[4] || 600)

let caminhos = []

async function carregarRotas() {
  const sm = await fetch(BASE + '/sitemap.xml').then((r) => r.text())
  const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/')
  caminhos = urls.length ? urls : ['/']
}

async function umPedido(i) {
  const path = caminhos[i % caminhos.length]
  const t0 = Date.now()
  try {
    const res = await fetch(BASE + path)
    const ms = Date.now() - t0
    const body = await res.text()
    return { path, status: res.status, ms, bytes: body.length }
  } catch (e) {
    return { path, status: 0, ms: Date.now() - t0, erro: e.message }
  }
}

async function main() {
  await carregarRotas()
  console.log(`Carga: ${TOTAL} requisicoes | concorrencia ${CONCORRENCIA} | ${caminhos.length} rotas | ${BASE}`)

  const latencias = []
  const status = {}
  const erros = []
  let concluidas = 0
  let proximo = 0

  async function worker() {
    while (proximo < TOTAL) {
      const i = proximo++
      const r = await umPedido(i)
      concluidas++
      latencias.push(r.ms)
      status[r.status] = (status[r.status] || 0) + 1
      if (r.status !== 200) erros.push(`${r.status} ${r.path}${r.erro ? ' - ' + r.erro : ''}`)
    }
  }

  const t0 = Date.now()
  await Promise.all(Array.from({ length: CONCORRENCIA }, worker))
  const dur = (Date.now() - t0) / 1000

  latencias.sort((a, b) => a - b)
  const p = (q) => latencias[Math.min(latencias.length - 1, Math.floor(latencias.length * q))]
  const media = latencias.reduce((a, b) => a + b, 0) / latencias.length

  console.log('\n================ RESULTADO ================')
  console.log(`Requisicoes   : ${concluidas} em ${dur.toFixed(1)}s (${(concluidas / dur).toFixed(1)} req/s)`)
  console.log(`Status        : ${JSON.stringify(status)}`)
  console.log(`Latencia media: ${media.toFixed(0)} ms`)
  console.log(`p50 / p95 / p99 / max: ${p(0.5)} / ${p(0.95)} / ${p(0.99)} / ${latencias[latencias.length - 1]} ms`)
  console.log(`Erros         : ${erros.length}`)
  if (erros.length) {
    console.log('\n--- ERROS (amostra) ---')
    ;[...new Set(erros)].slice(0, 30).forEach((e) => console.log('  ' + e))
  }
  process.exitCode = erros.length ? 1 : 0
}

main()
