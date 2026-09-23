export interface Situacao {
  slug: string
  nome: string
  descricao: string
  slugs: string[]
}

// Filtros por situacao do cliente (a "dor" de quem procura), nao por botanica.
export const situacoes: Situacao[] = [
  {
    slug: 'primeira-frutifera',
    nome: 'Primeira frutífera (à prova de erro)',
    descricao: 'Rústicas, perdoam erros e produzem cedo.',
    slugs: ['acerola-okinawa', 'pitanga-preta', 'amora-portuguesa', 'figo', 'limao-siciliano', 'roma'],
  },
  {
    slug: 'colheita-rapida',
    nome: 'Quero colher rápido (menos de 1 ano)',
    descricao: 'Espécies de ciclo curto ou crescimento acelerado.',
    slugs: ['morango', 'maracuja-gigante', 'mamao', 'abacaxi', 'amora-portuguesa', 'uva-brs-vitoria'],
  },
  {
    slug: 'ano-todo',
    nome: 'Produz quase o ano todo',
    descricao: 'Colheita distribuída ao longo do ano.',
    slugs: ['acerola-okinawa', 'limao-cravo-caipira', 'limao-siciliano', 'limao-galeguinho', 'pitanga-preta', 'sapoti', 'carambola-mel'],
  },
  {
    slug: 'pouco-espaco',
    nome: 'Pouco espaço (varanda pequena)',
    descricao: 'Porte pequeno ou que aceita vaso médio.',
    slugs: ['morango', 'mirtilo-blueberry', 'cambui-roxo', 'pitangatuba', 'fruta-do-milagre', 'jabuticaba-hibrida'],
  },
  {
    slug: 'sol-forte',
    nome: 'Sol forte e calor',
    descricao: 'Aguentam sol pleno e altas temperaturas.',
    slugs: ['pitaya-branca', 'pitaya-vermelha', 'pitaya-amarela', 'mandacaru', 'caju', 'acerola-okinawa', 'seriguela', 'caja-manga-anao'],
  },
  {
    slug: 'meia-sombra',
    nome: 'Meia-sombra',
    descricao: 'Vão bem onde o sol direto é limitado.',
    slugs: ['cacau', 'fruta-do-milagre', 'inga-de-flores-roseas', 'tamarilho-tomate-de-arvore', 'bacupari-de-bico'],
  },
  {
    slug: 'nativas-raras',
    nome: 'Nativas raras',
    descricao: 'Para quem quer sair do comum.',
    slugs: ['cambuci', 'camu-camu', 'cabeludinha-roxa', 'grumixama-amarela', 'uvaia', 'bacupari-mirim', 'araca-boi'],
  },
  {
    slug: 'varanda-vento',
    nome: 'Varandas com vento',
    descricao: 'Porte baixo e galhos firmes, que sofrem menos com a ventania.',
    slugs: ['pitanga-preta', 'acerola-okinawa', 'roma', 'figo', 'mirtilo-blueberry'],
  },
]

export function getSituacao(slug: string): Situacao | undefined {
  return situacoes.find((s) => s.slug === slug)
}
