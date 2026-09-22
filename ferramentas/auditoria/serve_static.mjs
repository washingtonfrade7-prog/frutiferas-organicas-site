import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.argv[2] || 'out'
const PORT = Number(process.argv[3] || 4000)

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

function resolver(urlPath) {
  let p = decodeURIComponent((urlPath || '/').split('?')[0])
  if (p.endsWith('/')) p += 'index.html'
  const full = path.join(ROOT, p)
  try {
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full
    if (fs.existsSync(full + '.html')) return full + '.html'
    const idx = path.join(full, 'index.html')
    if (fs.existsSync(idx)) return idx
  } catch {
    /* ignore */
  }
  return null
}

http
  .createServer((req, res) => {
    const file = resolver(req.url)
    if (!file) {
      const nf = path.join(ROOT, '404.html')
      if (fs.existsSync(nf)) {
        res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
        res.end(fs.readFileSync(nf))
        return
      }
      res.writeHead(404)
      res.end('404')
      return
    }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(file).toLowerCase()] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  .listen(PORT, () => console.log(`estatico em http://localhost:${PORT} (root=${ROOT})`))
