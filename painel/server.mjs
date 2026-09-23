/**
 * Painel de administracao local do site Frutiferas Organicas.
 *
 *   npm run painel   -> abre http://localhost:5050
 *
 * Permite: criar/editar/excluir artigos, editar textos das frutiferas,
 * enviar fotos (otimizadas para WebP) e publicar (build + upload FTP).
 */
import { createServer } from 'node:http'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAIZ = path.resolve(__dirname, '..')
const PORTA = Number(process.env.PAINEL_PORTA || 5050)

const ARQ_ARTIGOS = path.join(RAIZ, 'content', 'artigos.json')
const ARQ_EXTRAS = path.join(RAIZ, 'src', 'data', 'frutiferas-extras.ts')
const FTP_CFG = path.join(__dirname, 'ftp.json')

// Descobre um Python com Pillow (para otimizar as fotos enviadas).
function acharPython() {
  const candidatos = [
    process.env.PAINEL_PYTHON,
    'C:\\Users\\Micro\\Downloads\\Projeto automação youtube\\.venv\\Scripts\\python.exe',
    'C:\\Users\\Micro\\Downloads\\Projeto automação youtube\\.venv\\Scripts\\python3.exe',
  ].filter(Boolean)
  for (const c of candidatos) if (existsSync(c)) return c
  return 'python'
}
const PYTHON = acharPython()

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
function lerJson(arquivo, padrao) {
  try {
    return JSON.parse(readFileSync(arquivo, 'utf8'))
  } catch {
    return padrao
  }
}

function lerExtras() {
  const t = readFileSync(ARQ_EXTRAS, 'utf8')
  const marca = "const base: Omit<Frutifera, 'ofertas'>[] = "
  const i = t.indexOf(marca) + marca.length
  const resto = t.slice(i)
  const m = resto.match(/\r?\n\]\r?\n/)
  if (!m) throw new Error('nao encontrei o fim do array em frutiferas-extras.ts')
  const fim = i + m.index + m[0].length
  return { json: JSON.parse(t.slice(i, fim)), antes: t.slice(0, i), depois: t.slice(fim) }
}

function corpo(req) {
  return new Promise((resolve) => {
    let dados = ''
    req.on('data', (c) => (dados += c))
    req.on('end', () => {
      try {
        resolve(dados ? JSON.parse(dados) : {})
      } catch {
        resolve({})
      }
    })
  })
}

function responder(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(obj))
}

// ---------------------------------------------------------------------------
// Publicacao (build + upload) com log ao vivo
// ---------------------------------------------------------------------------
let logPublicacao = ''
let publicando = false

function rodar(comando, args, env, usarShell = true) {
  return new Promise((resolve) => {
    logPublicacao += `\n$ ${comando} ${args.join(' ')}\n`
    const p = spawn(comando, args, { cwd: RAIZ, env: { ...process.env, ...env }, shell: usarShell })
    p.stdout.on('data', (d) => (logPublicacao += d.toString()))
    p.stderr.on('data', (d) => (logPublicacao += d.toString()))
    p.on('error', (e) => {
      logPublicacao += `\n[erro] ${e.message}\n`
      resolve(1)
    })
    p.on('close', (code) => resolve(code))
  })
}

async function publicar() {
  if (publicando) return
  publicando = true
  logPublicacao = 'Iniciando publicacao...\n'
  try {
    const code = await rodar('npm', ['run', 'build'])
    if (code !== 0) {
      logPublicacao += '\n>> FALHOU no build. Nada foi enviado.\n'
      return
    }
    const cfg = lerJson(FTP_CFG, null)
    const env = cfg
      ? { FTP_HOST: cfg.host, FTP_USER: cfg.user, FTP_PASS: cfg.pass, FTP_DIR: cfg.dir || '/public_html' }
      : {}
    if (!env.FTP_HOST) {
      logPublicacao += '\n>> Sem painel/ftp.json: build feito, mas o envio nao configurado.\n'
      return
    }
    const code2 = await rodar('node', ['scripts/upload-ftp.mjs'], env)
    logPublicacao += code2 === 0 ? '\n>> PUBLICADO COM SUCESSO!\n' : '\n>> Falha no envio.\n'
  } finally {
    publicando = false
  }
}

// ---------------------------------------------------------------------------
// Servidor
// ---------------------------------------------------------------------------
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORTA}`)
  const rota = url.pathname

  // Pagina
  if (rota === '/' || rota === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(readFileSync(path.join(__dirname, 'index.html')))
    return
  }

  // Artigos
  if (rota === '/api/artigos' && req.method === 'GET') {
    return responder(res, 200, lerJson(ARQ_ARTIGOS, []))
  }
  if (rota === '/api/artigos' && req.method === 'POST') {
    const dados = await corpo(req)
    if (!Array.isArray(dados)) return responder(res, 400, { erro: 'formato invalido' })
    writeFileSync(ARQ_ARTIGOS, JSON.stringify(dados, null, 2))
    return responder(res, 200, { ok: true, total: dados.length })
  }

  // Frutiferas (extras)
  if (rota === '/api/frutiferas' && req.method === 'GET') {
    const { json } = lerExtras()
    return responder(
      res,
      200,
      json.map((f) => ({
        slug: f.slug,
        nome: f.nome,
        resumo: f.resumo,
        descricao: f.descricao,
        dicas: f.dicas,
        imagem: f.imagem,
      }))
    )
  }
  if (rota === '/api/frutifera' && req.method === 'POST') {
    const { slug, campos } = await corpo(req)
    const { json, antes, depois } = lerExtras()
    const alvo = json.find((f) => f.slug === slug)
    if (!alvo) return responder(res, 404, { erro: 'frutifera nao encontrada' })
    Object.assign(alvo, campos)
    writeFileSync(ARQ_EXTRAS, antes + JSON.stringify(json, null, 2) + depois)
    return responder(res, 200, { ok: true })
  }

  // Upload de foto -> otimiza para WebP em public/<pasta>
  if (rota === '/api/upload' && req.method === 'POST') {
    const { nome, dados, pasta } = await corpo(req)
    if (!nome || !dados) return responder(res, 400, { erro: 'dados ausentes' })
    const destino = path.join(RAIZ, 'public', pasta || 'frutiferas')
    mkdirSync(destino, { recursive: true })
    const base = nome.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9\-]/g, '-').toLowerCase()
    const ext = (nome.match(/\.[^.]+$/) || ['.jpg'])[0]
    const temp = path.join(destino, `${base}-temp${ext}`)
    writeFileSync(temp, Buffer.from(dados, 'base64'))

    const final = `${base}.webp`
    const destinoFinal = path.join(destino, final)
    const code = await rodar(PYTHON, [path.join(__dirname, 'otimizar.py'), temp, destinoFinal], {}, false)
    let arquivo = `/frutiferas/${final}`.replace('/frutiferas/', `/${pasta || 'frutiferas'}/`)

    if (code !== 0 || !existsSync(destinoFinal)) {
      // sem otimizador: salva o original
      const original = path.join(destino, `${base}${ext}`)
      writeFileSync(original, Buffer.from(dados, 'base64'))
      arquivo = `/${pasta || 'frutiferas'}/${base}${ext}`
    }
    try {
      if (existsSync(temp)) rmSync(temp, { force: true })
    } catch {
      /* noop */
    }
    return responder(res, 200, { ok: true, arquivo })
  }

  // Publicar
  if (rota === '/api/publicar' && req.method === 'POST') {
    if (publicando) return responder(res, 200, { ok: true, jaRodando: true })
    publicar()
    return responder(res, 200, { ok: true })
  }
  if (rota === '/api/publicar/log' && req.method === 'GET') {
    return responder(res, 200, { log: logPublicacao, publicando })
  }

  responder(res, 404, { erro: 'rota nao encontrada' })
})

server.listen(PORTA, () => {
  console.log(`\n  Painel do site no ar:  http://localhost:${PORTA}\n`)
})
