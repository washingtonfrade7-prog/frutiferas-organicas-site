import { linkMercadoLivre, type LojaId } from '@/data/afiliados'

export interface CategoriaCompra {
  slug: string
  nome: string
  descricao: string
  resumo: string
}

export interface Produto {
  slug: string
  nome: string
  categoria: string
  resumo: string
  paraQuem: string
  pros: string[]
  contras: string[]
  faixaPreco?: string
  destaque?: boolean
  lojas: Partial<Record<LojaId, string>>
}

export const categoriasCompra: CategoriaCompra[] = [
  {
    slug: 'vasos',
    nome: 'Vasos',
    descricao: 'Vasos de 20 litros ou mais, autoirrigáveis e opções para varanda e quintal.',
    resumo:
      'O vaso é a decisão mais importante do cultivo em recipiente. Para frutíferas, o mínimo recomendado é 20 litros, com boa drenagem e largura maior que a altura.',
  },
  {
    slug: 'substratos',
    nome: 'Substratos e terras',
    descricao: 'Substratos prontos, terra vegetal, húmus e itens de drenagem.',
    resumo:
      'Frutíferas em vaso precisam de substrato fértil, leve e bem drenado. A mistura certa evita encharcamento e garante nutrientes para a frutificação.',
  },
  {
    slug: 'adubos',
    nome: 'Adubos e fertilizantes',
    descricao: 'Bokashi, húmus, organominerais e adubos líquidos para frutíferas.',
    resumo:
      'Como o vaso tem pouco volume de terra, a adubação precisa ser frequente. Adubos orgânicos como o bokashi são a base de um cultivo saudável.',
  },
  {
    slug: 'ferramentas',
    nome: 'Ferramentas',
    descricao: 'Tesouras de poda, serras, kits de jardinagem e ferramentas de mão.',
    resumo:
      'Uma tesoura de poda afiada e limpa faz toda a diferença na cicatrização dos galhos. Kits básicos resolvem o dia a dia de quem cultiva em vaso.',
  },
  {
    slug: 'irrigacao',
    nome: 'Irrigação e rega',
    descricao: 'Regadores, borrifadores, vasos autoirrigáveis e sistemas de rega.',
    resumo:
      'A rega é o erro número um de quem cultiva em vaso. Regadores precisos e sistemas autoirrigáveis reduzem perdas por excesso ou falta de água.',
  },
  {
    slug: 'kits',
    nome: 'Kits de plantio',
    descricao: 'Kits completos com terra, adubo, drenagem e ferramentas.',
    resumo:
      'Kits prontos reúnem tudo o que você precisa para montar o vaso de uma frutífera sem errar na composição do substrato.',
  },
  {
    slug: 'sementes',
    nome: 'Sementes',
    descricao: 'Sementes de frutíferas, hortaliças e temperos para começar do zero.',
    resumo:
      'Começar por sementes é mais barato, porém mais lento. Para frutíferas, mudas enxertadas frutificam muito antes.',
  },
  {
    slug: 'mudas',
    nome: 'Mudas',
    descricao: 'Mudas de frutíferas enxertadas e de rápido início de produção.',
    resumo:
      'Mudas enxertadas ou de alporque começam a produzir em 1 a 3 anos, contra 5 a 10 anos das plantas de semente.',
  },
]

const baseProdutos: Produto[] = [
  // VASOS
  {
    slug: 'vaso-polietileno-90l',
    nome: 'Vaso grande de polietileno (kit 2 un. 45x50 cm)',
    categoria: 'vasos',
    resumo:
      'Vaso de polietileno com cerca de 90 litros, indicado para frutíferas de médio a grande porte. Não racha, não desbota e pode ficar exposto ao tempo.',
    paraQuem: 'Quem quer um vaso definitivo para jabuticaba, citros, manga e outras frutíferas maiores.',
    pros: ['Volume grande, raízes se desenvolvem bem', 'Resistente ao sol e à chuva', 'Vem em kit com 2 unidades'],
    contras: ['Pesado depois de cheio', 'Ocupa bastante espaço'],
    faixaPreco: 'R$ 450 a R$ 550 (kit 2 un.)',
    destaque: true,
    lojas: {},
  },
  {
    slug: 'vaso-autoirrigavel-medio',
    nome: 'Vaso autoirrigável médio (linha gourmet)',
    categoria: 'vasos',
    resumo:
      'Vaso com reservatório de água e cordões de capilaridade que mantêm a umidade por vários dias. Prático para quem viaja ou tem rotina corrida.',
    paraQuem: 'Quem cultiva temperos e frutíferas pequenas e esquece de regar.',
    pros: ['Reduz a frequência de rega', 'Reservatório fechado evita mosquitos', 'Base transparente para ver o nível de água'],
    contras: ['Volume pequeno para frutíferas maiores', 'Precisa de limpeza periódica do reservatório'],
    faixaPreco: 'R$ 35 a R$ 60',
    lojas: {},
  },
  {
    slug: 'vaso-plastico-30l',
    nome: 'Vaso plástico 30 litros (redondo)',
    categoria: 'vasos',
    resumo:
      'Vaso plástico redondo de 30 litros, largura maior que a altura, formato que favorece o desenvolvimento lateral das raízes das frutíferas.',
    paraQuem: 'Quem quer o melhor custo-benefício para começar um mini pomar.',
    pros: ['Preço acessível', 'Formato adequado para raízes superficiais', 'Leve'],
    contras: ['Pode esquentar ao sol forte', 'Menos durável que polietileno'],
    faixaPreco: 'R$ 40 a R$ 70',
    lojas: {},
  },

  // SUBSTRATOS
  {
    slug: 'substrato-frutiferas-25kg',
    nome: 'Substrato/terra vegetal adubada 25 kg',
    categoria: 'substratos',
    resumo:
      'Base de terra vegetal com matéria orgânica para preparar o substrato de frutíferas em vaso. Rende vários vasos de médio porte.',
    paraQuem: 'Quem vai montar ou renovar o substrato de mais de um vaso.',
    pros: ['Bom custo por litro', 'Rica em matéria orgânica', 'Serve de base para misturar com areia e húmus'],
    contras: ['Pode compactar se usada pura', 'Requer mistura para drenagem'],
    faixaPreco: 'R$ 60 a R$ 120',
    destaque: true,
    lojas: {},
  },
  {
    slug: 'substrato-completo-2kg',
    nome: 'Substrato completo pronto para vasos',
    categoria: 'substratos',
    resumo:
      'Substrato já balanceado para plantio em vasos, com nutrientes, drenagem e retenção de umidade. Prático para quem está começando.',
    paraQuem: 'Iniciantes que querem evitar erro na mistura de terra.',
    pros: ['Pronto para usar', 'Boa drenagem', 'Não precisa misturar'],
    contras: ['Custo por litro maior', 'Rende pouco em vasos grandes'],
    faixaPreco: 'R$ 20 a R$ 40',
    lojas: {},
  },
  {
    slug: 'kit-perlita-vermiculita',
    nome: 'Kit perlita + vermiculita (6 litros)',
    categoria: 'substratos',
    resumo:
      'Perlita e vermiculita para melhorar aeração e drenagem do substrato das frutíferas em vaso.',
    paraQuem: 'Quem monta a própria mistura de substrato.',
    pros: ['Melhora muito a drenagem', 'Evita compactação', 'Rende bastante'],
    contras: ['Exige misturar com terra e húmus', 'Produto leve, cuidado ao manusear'],
    faixaPreco: 'R$ 30 a R$ 60',
    lojas: {},
  },

  // ADUBOS
  {
    slug: 'bokashi-dimy-1kg',
    nome: 'Bokashi farelado 1 kg (adubo orgânico)',
    categoria: 'adubos',
    resumo:
      'Adubo orgânico fermentado, rico em microrganismos, ideal para a adubação de manutenção de frutíferas em vaso.',
    paraQuem: 'Quem quer adubar de forma orgânica e segura, sem risco de queimar raízes.',
    pros: ['Orgânico e seguro', 'Melhora a vida do solo', 'Fácil de aplicar'],
    contras: ['Precisa de reaplicação periódica', 'Odor característico'],
    faixaPreco: 'R$ 20 a R$ 40',
    destaque: true,
    lojas: {},
  },
  {
    slug: 'bokashi-forth-15kg',
    nome: 'Bokashi granulado 1,5 kg',
    categoria: 'adubos',
    resumo:
      'Versão granulada do bokashi, com liberação rápida de nutrientes e aplicação limpa em vasos.',
    paraQuem: 'Quem prefere um adubo sólido de fácil dosagem.',
    pros: ['Aplicação limpa', 'Liberação rápida', 'Boa relação custo-benefício'],
    contras: ['Rende menos que o farelado', 'Pode atrair animais se ficar exposto'],
    faixaPreco: 'R$ 30 a R$ 60',
    lojas: {},
  },
  {
    slug: 'humus-minhoca',
    nome: 'Húmus de minhoca',
    categoria: 'adubos',
    resumo:
      'Adubo orgânico clássico, ótimo para misturar ao substrato no plantio e reforçar a matéria orgânica do vaso.',
    paraQuem: 'Todo cultivador — é a base da adubação orgânica.',
    pros: ['Rico em nutrientes', 'Melhora a estrutura do solo', 'Dificilmente queima as raízes'],
    contras: ['Pode vir com sementes de ervas', 'Peso alto no frete'],
    faixaPreco: 'R$ 15 a R$ 50',
    lojas: {},
  },

  // FERRAMENTAS
  {
    slug: 'tesoura-poda-bypass',
    nome: 'Tesoura de poda bypass profissional',
    categoria: 'ferramentas',
    resumo:
      'Tesoura de corte cruzado (bypass) para galhos verdes, com lâmina de aço temperado e cabo emborrachado. Corta até 17 mm.',
    paraQuem: 'Quem faz podas de formação e limpeza em frutíferas.',
    pros: ['Corte limpo, sem esmagar o galho', 'Cabo ergonômico', 'Trava de segurança'],
    contras: ['Não serve para galhos secos grossos', 'Precisa de afiação periódica'],
    faixaPreco: 'R$ 60 a R$ 120',
    destaque: true,
    lojas: {},
  },
  {
    slug: 'tesourao-poda-bypass-60cm',
    nome: 'Tesourão de poda bypass 60 cm',
    categoria: 'ferramentas',
    resumo:
      'Tesourão com cabos longos para alcançar galhos mais altos e grossos (até 30 mm) sem escada.',
    paraQuem: 'Quem tem frutíferas maiores e precisa podar galhos altos.',
    pros: ['Alcance maior', 'Potencializa a força de corte', 'Lâmina bypass de precisão'],
    contras: ['Menos preciso que a tesoura de mão', 'Ocupa mais espaço'],
    faixaPreco: 'R$ 120 a R$ 160',
    lojas: {},
  },
  {
    slug: 'kit-jardinagem-10-pecas',
    nome: 'Kit de jardinagem 10 peças com maleta',
    categoria: 'ferramentas',
    resumo:
      'Conjunto com pás, sacho, tesouras, borrifador e mini rastelo em maleta organizadora. Resolve o básico do plantio e da manutenção.',
    paraQuem: 'Iniciantes que querem começar com o kit completo.',
    pros: ['Custo-benefício alto', 'Maleta organiza tudo', 'Serve para vaso e canteiro'],
    contras: ['Ferramentas de uso leve', 'Qualidade varia entre marcas'],
    faixaPreco: 'R$ 90 a R$ 150',
    lojas: {},
  },

  // IRRIGACAO
  {
    slug: 'regador-bico-longo',
    nome: 'Regador com bico longo',
    categoria: 'irrigacao',
    resumo:
      'Regador de bico longo para molhar a base da planta sem molhar as folhas, reduzindo o risco de fungos.',
    paraQuem: 'Todo cultivador de vaso.',
    pros: ['Direciona a água para o substrato', 'Evita molhar folhas', 'Fácil de usar'],
    contras: ['Precisa reabastecer com frequência', 'Plástico pode rachar ao sol'],
    faixaPreco: 'R$ 30 a R$ 80',
    lojas: {},
  },
  {
    slug: 'borrifador-pulverizador',
    nome: 'Borrifador / pulverizador',
    categoria: 'irrigacao',
    resumo:
      'Pulverizador manual para regas delicadas, adubação foliar e aplicação de óleo de neem.',
    paraQuem: 'Quem faz adubação foliar e controle de pragas.',
    pros: ['Versátil', 'Barato', 'Bom para mudas'],
    contras: ['Não substitui a rega principal', 'Precisa limpar após usar adubo'],
    faixaPreco: 'R$ 20 a R$ 50',
    lojas: {},
  },

  // KITS
  {
    slug: 'kit-plantio-completo',
    nome: 'Kit de plantio completo (terra, argila, manta e casca de pinus)',
    categoria: 'kits',
    resumo:
      'Reúne terra adubada, argila expandida, manta de drenagem e casca de pinus — a montagem perfeita do vaso em um só pedido.',
    paraQuem: 'Quem está montando o primeiro vaso e não quer errar.',
    pros: ['Tudo em um só pedido', 'Montagem guiada', 'Ideal para iniciantes'],
    contras: ['Frete mais caro por causa do peso', 'Pode sobrar material'],
    faixaPreco: 'R$ 90 a R$ 180',
    destaque: true,
    lojas: {},
  },

  // SEMENTES
  {
    slug: 'sementes-frutiferas',
    nome: 'Sementes de frutíferas',
    categoria: 'sementes',
    resumo:
      'Sementes de frutíferas como maracujá, morango e outras espécies. Opção econômica, porém com frutificação mais lenta.',
    paraQuem: 'Quem tem paciência e quer começar do zero.',
    pros: ['Baixo custo', 'Boa para aprender', 'Variedade de espécies'],
    contras: ['Demora anos para frutificar', 'Nem sempre repete a qualidade da planta-mãe'],
    faixaPreco: 'R$ 10 a R$ 40',
    lojas: {},
  },
]

export const produtos: Produto[] = baseProdutos.map((produto) => ({
  ...produto,
  lojas: { ...produto.lojas, mercadoLivre: linkMercadoLivre(produto.slug) },
}))

export function getCategoriaCompra(slug: string): CategoriaCompra | undefined {
  return categoriasCompra.find((c) => c.slug === slug)
}

export function produtosPorCategoria(slug: string): Produto[] {
  return produtos.filter((p) => p.categoria === slug)
}

export function getProduto(slug: string): Produto | undefined {
  return produtos.find((p) => p.slug === slug)
}
