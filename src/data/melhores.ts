export interface ArtigoComercial {
  slug: string
  titulo: string
  h1: string
  descricao: string
  resumo: string
  produtos: string[]
  secoes: { titulo: string; paragrafos: string[] }[]
  faq: { pergunta: string; resposta: string }[]
  atualizado: string
}

export const artigosComerciais: ArtigoComercial[] = [
  {
    slug: 'melhores-vasos-para-frutiferas',
    titulo: 'Melhores vasos para frutíferas: como escolher o tamanho certo',
    h1: 'Melhores vasos para frutíferas em vaso',
    descricao:
      'Compare os melhores vasos para frutíferas: tamanho mínimo, drenagem, material e autoirrigáveis. Veja qual escolher para jabuticaba, citros e mais.',
    resumo:
      'O vaso certo é o que mais impacta o sucesso de uma frutífera em recipiente. Antes de comprar, entenda o volume mínimo, o formato e a drenagem — depois escolha entre as opções que separamos.',
    produtos: ['vaso-polietileno-90l', 'vaso-plastico-30l', 'vaso-autoirrigavel-medio'],
    secoes: [
      {
        titulo: 'Qual o tamanho mínimo de vaso para frutíferas?',
        paragrafos: [
          'Para a maioria das frutíferas, o volume mínimo é de 20 litros. Espécies de porte maior, como jabuticabeira, mangueira e citros, produzem muito melhor a partir de 40 a 90 litros.',
          'Vasos muito pequenos limitam o sistema radicular, secam rápido e travam a frutificação. Se a ideia é manter a planta por anos, vale investir logo em um recipiente maior.',
        ],
      },
      {
        titulo: 'Largura x altura: o formato importa',
        paragrafos: [
          'As raízes das frutíferas são majoritariamente superficiais e se espalham para os lados. Por isso, prefira vasos mais largos do que altos, com boca entre 25 e 40 cm.',
          'Vasos altos e estreitos acumulam água no fundo e dificultam a aeração das raízes.',
        ],
      },
      {
        titulo: 'Drenagem: o item que mais mata frutíferas em vaso',
        paragrafos: [
          'O vaso precisa ter vários furos no fundo. Sem drenagem eficiente, a água empoça, as raízes apodrecem e a planta morre.',
          'Evite usar apenas pedras no fundo: o ideal é uma camada de argila expandida coberta por manta de drenagem, para separar a água do substrato.',
        ],
      },
      {
        titulo: 'Vaso autoirrigável vale a pena?',
        paragrafos: [
          'O autoirrigável é excelente para quem viaja ou esquece de regar, pois mantém a umidade por vários dias. Em contrapartida, a maioria dos modelos tem volume pequeno, o que limita o cultivo de frutíferas maiores.',
          'A recomendação é usar o autoirrigável para temperos e frutíferas pequenas, e os vasos grandes tradicionais para as espécies de maior porte.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Posso plantar jabuticaba em vaso de 20 litros?',
        resposta:
          'Dá para começar, mas a produção é bem melhor em vasos de 40 litros ou mais. A jabuticabeira híbrida é a mais indicada para vaso por frutificar mais cedo.',
      },
      {
        pergunta: 'Vaso de barro ou de plástico?',
        resposta:
          'O barro transpira mais e ajuda a evitar excesso de umidade, mas é mais pesado e quebra fácil. O plástico é leve e barato, porém esquenta mais ao sol. O polietileno é o mais durável.',
      },
      {
        pergunta: 'Preciso trocar o vaso depois de alguns anos?',
        resposta:
          'Sim. A cada 2 a 3 anos vale renovar parte do substrato e, se possível, aumentar o vaso para dar novo espaço às raízes.',
      },
    ],
    atualizado: '2026-09',
  },
  {
    slug: 'melhor-substrato-para-frutiferas',
    titulo: 'Melhor substrato para frutíferas em vaso: receita e opções prontas',
    h1: 'Melhor substrato para frutíferas em vaso',
    descricao:
      'Aprenda a receita ideal de substrato para frutíferas em vaso e veja substratos prontos, terra vegetal, perlita e vermiculita para comprar.',
    resumo:
      'O substrato precisa ser fértil, leve e bem drenado ao mesmo tempo. Um erro comum é usar terra compacta do jardim, que sufoca as raízes. Veja a mistura recomendada e as opções prontas.',
    produtos: ['substrato-frutiferas-25kg', 'substrato-completo-2kg', 'kit-perlita-vermiculita'],
    secoes: [
      {
        titulo: 'A receita base do substrato',
        paragrafos: [
          'Uma mistura simples e eficiente: 50% de terra vegetal adubada, 30% de matéria orgânica (húmus de minhoca ou composto) e 20% de material de drenagem (areia grossa, perlita ou vermiculita).',
          'Essa proporção garante retenção de umidade, nutrientes e boa aeração — os três pilares para raízes saudáveis.',
        ],
      },
      {
        titulo: 'Substrato pronto ou mistura caseira?',
        paragrafos: [
          'O substrato pronto é prático e perfeito para iniciantes, mas costuma sair mais caro por litro. A mistura caseira exige mais trabalho, porém rende muito mais e sai bem mais barato para vasos grandes.',
          'Para um mini pomar, o caminho mais econômico é comprar terra vegetal a granel, húmus e perlita/vermiculita e montar a mistura.',
        ],
      },
      {
        titulo: 'Não esqueça a camada de drenagem',
        paragrafos: [
          'Antes do substrato, coloque argila expandida no fundo e cubra com manta de drenagem. Isso impede que a terra entupa os furos e evita o apodrecimento das raízes.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Posso usar terra de jardim no vaso?',
        resposta:
          'Não pura. A terra de jardim compacta e racha, prejudicando a aeração. Use-a no máximo como parte da mistura, sempre com matéria orgânica e drenagem.',
      },
      {
        pergunta: 'Preciso esterilizar o substrato?',
        resposta:
          'Não é obrigatório, mas substratos muito ricos em matéria orgânica podem atrair insetos. Um substrato de boa procedência costuma ser suficiente.',
      },
      {
        pergunta: 'Com que frequência trocar o substrato?',
        resposta:
          'Em vasos, o ideal é renovar parte do substrato a cada 2 anos, aproveitando para adubar e, se necessário, aumentar o vaso.',
      },
    ],
    atualizado: '2026-09',
  },
  {
    slug: 'melhores-adubos-organicos-para-frutiferas',
    titulo: 'Melhores adubos orgânicos para frutíferas em vaso',
    h1: 'Melhores adubos orgânicos para frutíferas',
    descricao:
      'Compare bokashi, húmus de minhoca e organominerais para frutíferas em vaso. Veja quando adubar e qual produto usar em cada fase da planta.',
    resumo:
      'Em vaso, os nutrientes se esgotam rápido e a adubação é constante. Os adubos orgânicos são a base de um cultivo saudável e seguro, sem risco de queimar as raízes.',
    produtos: ['bokashi-dimy-1kg', 'bokashi-forth-15kg', 'humus-minhoca'],
    secoes: [
      {
        titulo: 'Por que adubar frutíferas em vaso é diferente',
        paragrafos: [
          'No vaso há pouca terra, e as regas frequentes lavam parte dos nutrientes. Por isso, a reposição precisa ser feita a cada 30 a 45 dias na fase de crescimento e floração.',
          'A adubação orgânica libera nutrientes de forma gradual e melhora a vida do solo, reduzindo o risco de excesso.',
        ],
      },
      {
        titulo: 'Bokashi: o adubo orgânico mais usado',
        paragrafos: [
          'O bokashi é um adubo fermentado rico em microrganismos e nutrientes. Aplicado na superfície do substrato, melhora a fertilidade e a estrutura do solo.',
          'Existe em versão farelada (mais rica) e granulada (mais prática). Ambos funcionam bem em vasos.',
        ],
      },
      {
        titulo: 'Húmus de minhoca: a base de tudo',
        paragrafos: [
          'O húmus é perfeito para misturar ao substrato no plantio e para manutenção. Dificilmente queima as raízes, mesmo em doses generosas.',
        ],
      },
      {
        titulo: 'Como e quando adubar',
        paragrafos: [
          'Aplique o adubo na borda do vaso, afastado do caule, e regue em seguida. Na floração e frutificação, aumente a frequência. Evite adubar plantas recém-transplantadas nas primeiras semanas.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Adubo orgânico ou mineral?',
        resposta:
          'Os dois podem ser combinados. O orgânico melhora o solo e é seguro; o mineral (NPK) age rápido e é útil na frutificação. Em vaso, o orgânico costuma ser a base.',
      },
      {
        pergunta: 'Posso adubar todo mês?',
        resposta:
          'Na fase de crescimento, sim, respeitando a dose do fabricante. Em períodos de dormência ou frio intenso, reduza a frequência.',
      },
      {
        pergunta: 'Bokashi farelado ou granulado?',
        resposta:
          'O farelado é mais rico e se integra melhor ao substrato. O granulado é mais prático e limpo de aplicar. Ambos funcionam bem.',
      },
    ],
    atualizado: '2026-09',
  },
  {
    slug: 'kit-de-plantio-para-frutiferas',
    titulo: 'Kit de plantio para frutíferas: o que comprar para começar',
    h1: 'Kit de plantio para frutíferas',
    descricao:
      'Monte seu kit de plantio para frutíferas em vaso: terra, adubo, drenagem, manta e ferramentas. Veja o que é essencial e onde comprar.',
    resumo:
      'Quem está começando costuma comprar itens soltos e esquecer peças importantes. Um kit bem montado reúne terra, adubo, drenagem e ferramentas — e evita retrabalho.',
    produtos: ['kit-plantio-completo', 'kit-jardinagem-10-pecas', 'substrato-completo-2kg'],
    secoes: [
      {
        titulo: 'O que não pode faltar no kit',
        paragrafos: [
          'Terra adubada, matéria orgânica (húmus ou bokashi), argila expandida, manta de drenagem e casca de pinus para cobertura morta. Esses cinco itens resolvem a montagem do vaso.',
          'Nas ferramentas, o básico é uma tesoura de poda, uma pazinha e um regador de bico longo.',
        ],
      },
      {
        titulo: 'Kit pronto vale a pena?',
        paragrafos: [
          'Para quem está começando, o kit pronto compensa pela praticidade e por evitar erros na composição. Para quem já tem vários vasos, comprar a granel costuma sair mais barato.',
        ],
      },
      {
        titulo: 'Passo a passo da montagem',
        paragrafos: [
          'Forre o fundo com argila expandida, cubra com a manta de drenagem, adicione o substrato até a altura do torrão e posicione a muda. Complete as laterais, aperte levemente e regue bem.',
          'Finalize com uma camada de casca de pinus para conservar a umidade e reduzir ervas daninhas.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Posso montar o kit por conta própria?',
        resposta:
          'Sim, e costuma ser mais econômico. Basta comprar terra vegetal, húmus, argila expandida, manta e casca de pinus nas quantidades do seu projeto.',
      },
      {
        pergunta: 'Preciso de quanta terra por vaso?',
        resposta:
          'Um vaso de 30 litros leva cerca de 25 litros de substrato. Um de 90 litros pode levar 75 litros ou mais, dependendo do torrão da muda.',
      },
      {
        pergunta: 'A manta de drenagem é obrigatória?',
        resposta:
          'Não é obrigatória, mas ajuda muito. Ela impede que a terra entupa os furos e mantém a drenagem funcionando por mais tempo.',
      },
    ],
    atualizado: '2026-09',
  },
  {
    slug: 'melhores-ferramentas-de-poda',
    titulo: 'Melhores ferramentas de poda para frutíferas em vaso',
    h1: 'Melhores ferramentas de poda',
    descricao:
      'Conheça as melhores ferramentas de poda para frutíferas: tesoura bypass, tesourão e kit de jardinagem. Veja qual usar em cada situação.',
    resumo:
      'A poda define o formato da planta e estimula a frutificação. Com a ferramenta certa, o corte cicatriza rápido e a planta sofre menos. Veja o que usar em cada caso.',
    produtos: ['tesoura-poda-bypass', 'tesourao-poda-bypass-60cm', 'kit-jardinagem-10-pecas'],
    secoes: [
      {
        titulo: 'Tesoura bypass: a ferramenta principal',
        paragrafos: [
          'A tesoura de lâmina bypass (corte cruzado) é a mais indicada para galhos verdes, pois não esmaga o tecido e facilita a cicatrização. Corta galhos de até cerca de 17 mm.',
          'Prefira modelos com cabo emborrachado e trava de segurança.',
        ],
      },
      {
        titulo: 'Quando usar o tesourão',
        paragrafos: [
          'O tesourão de cabos longos aumenta o alcance e a força, sendo ideal para galhos mais grossos e mais altos, sem precisar de escada.',
        ],
      },
      {
        titulo: 'Bigorna x bypass: qual escolher?',
        paragrafos: [
          'A bigorna (corte reto sobre uma base) é para galhos secos e duros. A bypass é para galhos verdes. Em frutíferas, a bypass é a mais usada.',
        ],
      },
      {
        titulo: 'Cuidados que prolongam a ferramenta',
        paragrafos: [
          'Limpe e seque as lâminas após o uso e aplique algumas gotas de óleo mineral nas articulações. Guarde em local seco.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Posso usar tesoura de cozinha para podar?',
        resposta:
          'Não é o ideal. O corte esmaga o galho, dificulta a cicatrização e aumenta o risco de doenças.',
      },
      {
        pergunta: 'Preciso desinfetar a tesoura entre plantas?',
        resposta:
          'Sim, principalmente se a planta anterior tiver sinais de doença. Álcool 70% na lâmina é suficiente.',
      },
      {
        pergunta: 'Qual o melhor período para podar frutíferas?',
        resposta:
          'Depende da espécie. Em geral, a poda de formação é feita após a colheita e a de limpeza em qualquer época, removendo galhos secos.',
      },
    ],
    atualizado: '2026-09',
  },
]

export function getArtigoComercial(slug: string): ArtigoComercial | undefined {
  return artigosComerciais.find((a) => a.slug === slug)
}
