export interface Categoria {
  slug: string
  nome: string
  descricao: string
  cor: string
}

export const categorias: Categoria[] = [
  {
    slug: 'nativas',
    nome: 'Nativas do Brasil',
    descricao:
      'Frutíferas brasileiras adaptadas ao nosso clima: jabuticaba, araçá, pitanga, gabiroba e muito mais. Rústicas, produtivas e cheias de história.',
    cor: '#2E5B3A',
  },
  {
    slug: 'raras',
    nome: 'Frutas Raras',
    descricao:
      'Espécies difíceis de encontrar no mercado, como bacupari, grumixama amarela e pitanga preta. Uma coleção para quem busca exclusividade.',
    cor: '#8F4C25',
  },
  {
    slug: 'vaso',
    nome: 'Para Cultivo em Vaso',
    descricao:
      'Frutíferas que produzem muito mesmo em pequenos espaços. Perfeitas para quintais, varandas, apartamentos e estufas.',
    cor: '#6B9A6B',
  },
  {
    slug: 'exoticas',
    nome: 'Exóticas Aclimatadas',
    descricao:
      'Espécies vindas de outros países e plenamente adaptadas ao cultivo orgânico brasileiro, como o abiu amarelo.',
    cor: '#C2703D',
  },
  {
    slug: 'citricas',
    nome: 'Cítricas',
    descricao:
      'Laranjas, limões, mexericas e kinkans: cítricos que produzem muito em vaso com poucos cuidados.',
    cor: '#D9A62E',
  },
]

export function getCategoria(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug)
}
