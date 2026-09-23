// Extrai a lista completa de frutiferas (src/data/frutiferas.ts) para JSON.
// Usado para gerar o catalogo de cultivo do e-book.
//   node ferramentas/curso/extrair_frutiferas.mjs
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const DATA = path.join(ROOT, 'src', 'data')
const OUT = path.join(__dirname, 'frutiferas.json')

function carregarModulo(arquivo) {
  const fonte = fs.readFileSync(arquivo, 'utf8')
  const js = ts.transpileModule(fonte, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText

  const modulo = { exports: {} }
  const require = (id) => {
    if (id.includes('frutiferas-extras')) return carregarModulo(path.join(DATA, 'frutiferas-extras.ts'))
    if (id.includes('ofertas')) return { ofertasPadrao: () => [] }
    if (id.includes('frutiferas.json')) {
      return JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'frutiferas.json'), 'utf8'))
    }
    throw new Error('import nao suportado: ' + id)
  }

  const fn = vm.compileFunction(js, ['exports', 'require', 'module', '__filename', '__dirname'], {
    filename: arquivo,
  })
  fn(modulo.exports, require, modulo, arquivo, path.dirname(arquivo))
  return modulo.exports
}

const mod = carregarModulo(path.join(DATA, 'frutiferas.ts'))
const lista = mod.frutiferas

const enxuto = lista.map((f) => ({
  slug: f.slug,
  nome: f.nome,
  nomeCientifico: f.nomeCientifico,
  familia: f.familia,
  categorias: f.categorias,
  resumo: f.resumo,
  origem: f.origem,
  porte: f.porte,
  luz: f.luz,
  rega: f.rega,
  solo: f.solo,
  vaso: f.vaso,
  dificuldade: f.dificuldade,
  tempoProducao: f.tempoProducao,
  frutificacao: f.frutificacao,
  dicas: f.dicas || [],
  curiosidades: f.curiosidades || [],
  destaque: Boolean(f.destaque),
}))

fs.writeFileSync(OUT, JSON.stringify(enxuto, null, 2), 'utf8')
console.log(`[ok] ${enxuto.length} frutiferas -> ${OUT}`)
console.log('categorias:', [...new Set(enxuto.flatMap((f) => f.categorias))].join(', '))
