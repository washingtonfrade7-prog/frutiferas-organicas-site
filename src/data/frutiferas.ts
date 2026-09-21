import { ofertasPadrao, type Oferta } from '@/data/ofertas'

export interface Video {
  id: string
  titulo: string
}

export interface Frutifera {
  slug: string
  nome: string
  nomeCientifico: string
  familia: string
  categorias: string[]
  resumo: string
  descricao: string[]
  origem: string
  porte: string
  luz: string
  rega: string
  solo: string
  vaso: string
  dificuldade: 'Fácil' | 'Média' | 'Avançada'
  tempoProducao: string
  frutificacao: string
  curiosidades: string[]
  dicas: string[]
  videos: Video[]
  ofertas: Oferta[]
  imagem?: string
  cor: string
  destaque?: boolean
}

const videos = (fruta: string): Video[] => {
  const mapa: Record<string, Video[]> = {
    jabuticaba: [
      { id: 'gyzTLk5ni4Y', titulo: 'Mega colheita de jabuticaba híbrida' },
      { id: 'cQAsGpzPlk0', titulo: 'Como podar jabuticaba fácil e rápido passo a passo' },
      { id: 'GJdd2j_uXhI', titulo: 'Jabuticaba caindo frutos: veja como resolver' },
    ],
    araca_vermelho: [
      { id: '7BlqNvySrFs', titulo: 'Colheita de araçá vermelho e amarelo' },
      { id: 'yjdzKwUxTRg', titulo: 'Colheita de araçá vermelho' },
    ],
    pitanga_preta: [
      { id: 'c3LEcZrARlI', titulo: 'Colheita fácil: pitanga preta orgânica em vaso' },
      { id: 'cYLajSBoOKM', titulo: 'Colheita da raríssima pitanga preta em vaso' },
      { id: 'RFcR74X7y6k', titulo: 'Pitanga preta top para vaso: 24 graus Brix' },
    ],
    araca_boi: [
      { id: 'g-iusR1X8og', titulo: 'Colheita e vitamina da fruta iogurte' },
      { id: 'FVyNmJuF250', titulo: 'Colheita de fruta iogurte' },
      { id: 'G9p38FLJQnw', titulo: 'Colheita e degustação de araçá boi orgânico em vaso 4k' },
      { id: 'eZWauYHBk_M', titulo: 'Fruta iogurte produzindo' },
      { id: 'a-bxUvEddCM', titulo: 'Fruta iogurte quase no ponto da colheita' },
      { id: 'd1i68duFJJ8', titulo: 'Araçá boi em floração' },
      { id: 'hhOUShVpSs4', titulo: 'Harvesting and tasting araçá boi organic yogurt in a pot' },
    ],
    bacupari_mirim: [
      { id: 'MvfDp1kJVwo', titulo: 'Colheita de bacupari de bico orgânico em vaso' },
      { id: '6Y7x_KigbZ4', titulo: 'Colheita fácil: bacupari de bico' },
      { id: '1xlIJTL-K7Q', titulo: 'Você sabe que frutífera é esta? Bacupari de bico' },
      { id: 'fJfZrVReY3c', titulo: 'Conhece a frutífera nativa do Brasil bacupari?' },
    ],
    bacupari_estalo: [
      { id: 'MvfDp1kJVwo', titulo: 'Colheita de bacupari de bico orgânico em vaso' },
      { id: '6Y7x_KigbZ4', titulo: 'Colheita fácil: bacupari de bico' },
      { id: '1xlIJTL-K7Q', titulo: 'Você sabe que frutífera é esta? Bacupari de bico' },
      { id: 'fJfZrVReY3c', titulo: 'Conhece a frutífera nativa do Brasil bacupari?' },
    ],
    abiu_amarelo: [
      { id: 'doAr8IvIzuk', titulo: 'Como plantar abiu amarelo orgânico em vaso' },
    ],
    gabiroba: [
      { id: 'QKCZqcRit7M', titulo: 'Como plantar gabiroba do cerrado em vaso' },
    ],
    cereja_rio_grande: [
      { id: 'gHWp3oKDm1o', titulo: 'As propriedades medicinais da cereja do Rio Grande' },
      { id: '-Miw_cyFPEA', titulo: 'Como plantar cereja do Rio Grande orgânica em vaso' },
    ],
    grumixama_amarela: [
      { id: 'QRcLDBTsyZc', titulo: 'Colheita de grumixama em vaso' },
      { id: 'nKMIWfsMMdk', titulo: 'Rara grumixama amarela produzindo em vaso de 30 litros' },
    ],
  }
  return mapa[fruta] || []
}

export const frutiferas: Frutifera[] = [
  {
    slug: 'jabuticaba',
    imagem: '/frutiferas/jabuticaba.jpg',
    nome: 'Jabuticaba',
    nomeCientifico: 'Plinia cauliflora',
    familia: 'Myrtaceae',
    categorias: ['nativas', 'vaso'],
    resumo:
      'A fruta símbolo do Brasil, que floresce e frutifica direto no tronco. Existem variedades híbridas que produzem em vaso em poucos anos.',
    descricao: [
      'A jabuticabeira é uma árvore nativa da Mata Atlântica e um dos maiores patrimônios da fruticultura brasileira. Seu nome vem do tupi e significa "fruta em botão", uma referência aos frutos que nascem grudados no tronco e nos galhos.',
      'Com o manejo correto e o uso de variedades híbridas selecionadas, é totalmente possível ter uma jabuticabeira produzindo em vaso. A planta prefere clima quente e úmido, mas se adapta bem a diferentes regiões quando protegida de geadas.',
      'Os frutos podem ser consumidos frescos ou transformados em geleias, licores e sucos. Além disso, a casca é rica em antocianinas, poderosos antioxidantes.',
    ],
    origem: 'Mata Atlântica (Brasil)',
    porte: 'Árvore de 3 a 8 m (pode ser mantida menor em vaso)',
    luz: 'Sol pleno a meia-sombra',
    rega: 'Frequente, mantendo o solo úmido sem encharcar',
    solo: 'Fértil, rico em matéria orgânica e bem drenado',
    vaso: 'Vasos a partir de 30 litros para plantas adultas',
    dificuldade: 'Fácil',
    tempoProducao: '3 a 5 anos a partir da muda (híbridas podem produzir antes)',
    frutificacao: 'Floresce na primavera e frutifica no verão',
    curiosidades: [
      'A jabuticaba pode ser colhida até 3 vezes por ano em plantas bem manejadas.',
      'A casca contém mais antioxidantes que a própria polpa.',
      'Existem variedades de jabuticaba com frutos que chegam a 4 cm de diâmetro.',
    ],
    dicas: [
      'Plante em substrato com 30% de matéria orgânica bem curtida.',
      'Faça podas de limpeza após a colheita para estimular nova floração.',
      'Evite deixar o vaso secar completamente entre as regas no período de floração.',
      'Use cobertura morta (palha) sobre o substrato para manter a umidade.',
    ],
    videos: videos('jabuticaba'),
    ofertas: ofertasPadrao(),
    cor: '#4B2E5C',
    destaque: true,
  },
  {
    slug: 'araca-vermelho',
    imagem: '/frutiferas/araca-vermelho.jpg',
    nome: 'Araçá Vermelho',
    nomeCientifico: 'Psidium cattleianum',
    familia: 'Myrtaceae',
    categorias: ['nativas', 'vaso'],
    resumo:
      'Pequeno, rústico e muito produtivo. O araçá vermelho é ideal para vasos e rende uma colheita abundante de frutos doces e aromáticos.',
    descricao: [
      'O araçá vermelho é parente próximo da goiaba e ocorre naturalmente no litoral brasileiro. É uma planta extremamente rústica, resistente ao vento e à maresia, e produz frutos pequenos de sabor agridoce muito agradável.',
      'Por ser uma planta compacta, é uma das frutíferas nativas mais indicadas para o cultivo em vaso. Produz cedo e em grande quantidade, sendo ótima para quem tem pouco espaço.',
      'Os frutos podem ser consumidos frescos, em sucos, sorvetes e geleias. A planta também é muito usada em paisagismo por seu valor ornamental.',
    ],
    origem: 'Litoral do Brasil',
    porte: 'Arbusto de 1 a 3 m',
    luz: 'Sol pleno',
    rega: 'Moderada a frequente',
    solo: 'Adapta-se a solos pobres, mas prefere bem drenados',
    vaso: 'Vasos a partir de 20 litros',
    dificuldade: 'Fácil',
    tempoProducao: '2 a 3 anos a partir da muda',
    frutificacao: 'Primavera e verão',
    curiosidades: [
      'O araçá é muito resistente à maresia, sendo comum em jardins litorâneos.',
      'Existem variedades de casca vermelha e amarela.',
      'Os frutos atraem pássaros e são ótimos para o paisagismo ecológico.',
    ],
    dicas: [
      'Pode ser conduzido como pequeno arbusto ou árvore com poda de formação.',
      'Suporta bem a poda, que estimula a produção de novos ramos.',
      'É uma excelente planta para iniciantes pela sua rusticidade.',
    ],
    videos: videos('araca_vermelho'),
    ofertas: ofertasPadrao(),
    cor: '#B23A2E',
    destaque: true,
  },
  {
    slug: 'pitanga-preta',
    imagem: '/frutiferas/pitanga-preta.jpg',
    nome: 'Pitanga Preta',
    nomeCientifico: 'Eugenia uniflora',
    familia: 'Myrtaceae',
    categorias: ['nativas', 'raras', 'vaso'],
    resumo:
      'Variedade raríssima de pitanga, com frutos escuros, doces e de altíssimo teor de açúcar, que produz muito bem em vaso.',
    descricao: [
      'A pitanga preta é uma variedade rara da pitangueira comum, com frutos de coloração escura e sabor mais doce e menos ácido. É considerada uma das frutíferas mais interessantes para colecionadores.',
      'A pitangueira é nativa da Mata Atlântica e extremamente versátil. Produz bem em vaso e pode alcançar índices de açúcar (graus Brix) impressionantes quando bem cultivada sob sol pleno.',
      'Além do consumo fresco, os frutos rendem sucos, licores, sorvetes e geleias de cor intensa.',
    ],
    origem: 'Mata Atlântica (Brasil)',
    porte: 'Arbusto de 2 a 4 m',
    luz: 'Sol pleno',
    rega: 'Frequente durante a floração e frutificação',
    solo: 'Fértil, bem drenado e levemente ácido',
    vaso: 'Vasos a partir de 25 litros',
    dificuldade: 'Média',
    tempoProducao: '2 a 3 anos a partir da muda',
    frutificacao: 'Pode frutificar mais de uma vez ao ano',
    curiosidades: [
      'A pitanga preta é uma variedade difícil de encontrar à venda em mudas.',
      'Frutos bem manejados podem ultrapassar 20 graus Brix de doçura.',
      'As folhas da pitangueira são usadas na medicina popular.',
    ],
    dicas: [
      'Exige sol pleno para expressar o máximo de doçura nos frutos.',
      'Faça poda de limpeza após cada colheita.',
      'Fique atento à mosca-das-frutas, principal praga da cultura.',
    ],
    videos: videos('pitanga_preta'),
    ofertas: ofertasPadrao(),
    cor: '#4A1B2E',
    destaque: true,
  },
  {
    slug: 'araca-boi',
    imagem: '/frutiferas/araca-boi.jpg',
    nome: 'Araçá Boi (Fruta Iogurte)',
    nomeCientifico: 'Psidium guineense',
    familia: 'Myrtaceae',
    categorias: ['nativas', 'raras', 'vaso'],
    resumo:
      'Também conhecida como fruta iogurte, tem polpa cremosa e sabor que lembra iogurte. Uma das nativas mais produtivas em vaso.',
    descricao: [
      'O araçá boi, popularmente chamado de fruta iogurte, é uma frutífera nativa muito valorizada pela polpa espessa e cremosa, de sabor único que remete ao iogurte natural.',
      'É uma planta extremamente produtiva, que se adapta muito bem ao cultivo em vaso e rende colheitas generosas. As flores são grandes e vistosas, um espetáculo à parte na floração.',
      'Os frutos são consumidos frescos e também usados em sobremesas, vitaminas e sorvetes artesanais.',
    ],
    origem: 'Cerrado e América Tropical',
    porte: 'Arbusto de 2 a 4 m',
    luz: 'Sol pleno',
    rega: 'Frequente, sem encharcar',
    solo: 'Fértil e bem drenado, com boa matéria orgânica',
    vaso: 'Vasos a partir de 30 litros',
    dificuldade: 'Fácil',
    tempoProducao: '2 a 3 anos a partir da muda',
    frutificacao: 'Primavera e verão, com florações recorrentes',
    curiosidades: [
      'O nome "fruta iogurte" vem da textura e do sabor da polpa.',
      'É uma das frutíferas nativas mais produtivas em vaso.',
      'As flores atraem polinizadores e abelhas nativas.',
    ],
    dicas: [
      'Adube regularmente durante a frutificação para não perder produção.',
      'Suporta poda de formação para manter porte compacto.',
      'Colha os frutos quando ficarem levemente macios ao toque.',
    ],
    videos: videos('araca_boi'),
    ofertas: ofertasPadrao(),
    cor: '#C2703D',
    destaque: true,
  },
  {
    slug: 'bacupari-mirim',
    imagem: '/frutiferas/bacupari-mirim.jpg',
    nome: 'Bacupari Mirim',
    nomeCientifico: 'Garcinia gardneriana',
    familia: 'Clusiaceae',
    categorias: ['nativas', 'raras'],
    resumo:
      'Fruta nativa rara, doce e apreciada por colecionadores. O bacupari mirim é uma joia da fruticultura brasileira.',
    descricao: [
      'O bacupari mirim é uma frutífera nativa pouco conhecida, mas muito valorizada por quem aprecia frutas raras. Seus frutos têm polpa doce e envolvente, consumidos frescos.',
      'A espécie ocorre em várias regiões do Brasil e vem ganhando espaço em coleções de frutíferas raras pela sua beleza e sabor.',
      'É uma planta de crescimento moderado, que se dá bem em meia-sombra e pode ser cultivada em vasos grandes.',
    ],
    origem: 'Brasil (Cerrado e Mata Atlântica)',
    porte: 'Árvore de 4 a 8 m',
    luz: 'Meia-sombra a sol pleno (jovem)',
    rega: 'Moderada, mantendo o solo levemente úmido',
    solo: 'Fértil, ácido e rico em matéria orgânica',
    vaso: 'Vasos a partir de 40 litros',
    dificuldade: 'Avançada',
    tempoProducao: '4 a 6 anos a partir da muda',
    frutificacao: 'Verão',
    curiosidades: [
      'Pertence ao mesmo gênero do bacuri e do mangostão.',
      'É considerada uma fruta rara, difícil de encontrar em feiras.',
      'As folhas são ornamentais e a planta é muito usada em coleções.',
    ],
    dicas: [
      'Prefere sombra parcial quando jovem, evoluindo para sol pleno.',
      'Use substrato ácido e rico em matéria orgânica.',
      'Tenha paciência: é uma planta de crescimento mais lento.',
    ],
    videos: videos('bacupari_mirim'),
    ofertas: ofertasPadrao(),
    cor: '#C9A227',
  },
  {
    slug: 'bacupari-estalo',
    imagem: '/frutiferas/bacupari-estalo.jpg',
    nome: 'Bacupari Estalo',
    nomeCientifico: 'Garcinia brasiliensis',
    familia: 'Clusiaceae',
    categorias: ['nativas', 'raras'],
    resumo:
      'Conhecido pelo som característico do fruto ao ser aberto. Uma frutífera rara e saborosa do Cerrado brasileiro.',
    descricao: [
      'O bacupari estalo recebe esse nome pelo estalo característico que o fruto faz ao ser aberto. É uma espécie nativa do Cerrado e da Mata Atlântica, com polpa suculenta e sabor agradável.',
      'Assim como outros bacuparis, é uma fruta rara e muito buscada por colecionadores e apreciadores de sabores brasileiros.',
      'A árvore é ornamental, de copa densa, e pode ser cultivada em vasos grandes ou em quintais.',
    ],
    origem: 'Cerrado e Mata Atlântica (Brasil)',
    porte: 'Árvore de 4 a 8 m',
    luz: 'Meia-sombra a sol pleno',
    rega: 'Moderada',
    solo: 'Fértil, ácido e bem drenado',
    vaso: 'Vasos a partir de 40 litros',
    dificuldade: 'Avançada',
    tempoProducao: '4 a 6 anos a partir da muda',
    frutificacao: 'Verão',
    curiosidades: [
      'O nome "estalo" vem do som que o fruto faz ao ser aberto.',
      'É parente do bacuri, uma das frutas mais valorizadas do Norte.',
      'A casca do fruto é resistente e protege bem a polpa.',
    ],
    dicas: [
      'Ofereça meia-sombra nos primeiros anos de vida.',
      'Mantenha o substrato rico em matéria orgânica.',
      'Proteja a planta de geadas e ventos frios.',
    ],
    videos: videos('bacupari_estalo'),
    ofertas: ofertasPadrao(),
    cor: '#D4A017',
  },
  {
    slug: 'abiu-amarelo',
    imagem: '/frutiferas/abiu-amarelo.jpg',
    nome: 'Abiu Amarelo',
    nomeCientifico: 'Pouteria caimito',
    familia: 'Sapotaceae',
    categorias: ['exoticas', 'vaso'],
    resumo:
      'Fruta exótica de polpa cremosa e muito doce, com sabor que lembra caramelo. Produz bem em vaso com os cuidados certos.',
    descricao: [
      'O abiu é uma frutífera originária da Amazônia, com frutos de casca amarela e polpa translúcida, cremosa e adocicada, lembrando caramelo. É uma das frutas exóticas mais apreciadas.',
      'Embora seja uma árvore de porte médio, o abiu amarelo pode ser cultivado em vasos grandes e mantido compacto com podas, produzindo frutos de excelente qualidade.',
      'É uma planta de crescimento relativamente rápido e muito ornamental, com folhagem verde-brilhante.',
    ],
    origem: 'Amazônia',
    porte: 'Árvore de 5 a 10 m (controlável em vaso)',
    luz: 'Sol pleno',
    rega: 'Frequente, sem encharcar',
    solo: 'Fértil, profundo e bem drenado',
    vaso: 'Vasos a partir de 50 litros',
    dificuldade: 'Média',
    tempoProducao: '3 a 5 anos a partir da muda',
    frutificacao: 'Verão',
    curiosidades: [
      'A polpa do abiu pode ser consumida com colher, como um pudim natural.',
      'É uma das poucas frutas que não deve ser consumida muito verde, pois a casca solta látex.',
      'O abiu é muito popular em países amazônicos como Peru e Colômbia.',
    ],
    dicas: [
      'Colha apenas quando o fruto estiver bem amarelo e levemente macio.',
      'Faça podas de formação para manter o porte reduzido em vaso.',
      'Proteja a planta jovem de ventos fortes.',
    ],
    videos: videos('abiu_amarelo'),
    ofertas: ofertasPadrao(),
    cor: '#E0A81E',
  },
  {
    slug: 'gabiroba',
    imagem: '/frutiferas/gabiroba.jpg',
    nome: 'Gabiroba do Cerrado',
    nomeCientifico: 'Campomanesia pubescens',
    familia: 'Myrtaceae',
    categorias: ['nativas', 'vaso'],
    resumo:
      'Fruta típica do Cerrado, aromática e rica em vitamina C. Rústica e ideal para quem quer começar com nativas.',
    descricao: [
      'A gabiroba é uma frutífera nativa do Cerrado, de sabor marcante e aroma intenso. É muito rústica e resistente, sendo uma ótima opção para iniciantes no cultivo de nativas.',
      'A planta é compacta, o que a torna perfeita para vasos e pequenos espaços. Produz frutos ricos em vitamina C e antioxidantes.',
      'Os frutos são consumidos frescos e também usados em sucos, licores e doces típicos do Cerrado.',
    ],
    origem: 'Cerrado brasileiro',
    porte: 'Arbusto de 1 a 3 m',
    luz: 'Sol pleno',
    rega: 'Moderada',
    solo: 'Adapta-se a solos ácidos e pobres, mas responde bem à adubação orgânica',
    vaso: 'Vasos a partir de 20 litros',
    dificuldade: 'Fácil',
    tempoProducao: '2 a 3 anos a partir da muda',
    frutificacao: 'Primavera e verão',
    curiosidades: [
      'A gabiroba é uma das frutas mais típicas do Cerrado.',
      'É extremamente resistente à seca e ao calor.',
      'Suas flores brancas são muito ornamentais.',
    ],
    dicas: [
      'Excelente escolha para quem está começando com frutíferas nativas.',
      'Suporta bem períodos de seca, mas produz mais com regas regulares.',
      'Use substrato levemente ácido e bem drenado.',
    ],
    videos: videos('gabiroba'),
    ofertas: ofertasPadrao(),
    cor: '#7A8B3A',
  },
  {
    slug: 'cereja-rio-grande',
    imagem: '/frutiferas/cereja-rio-grande.jpg',
    nome: 'Cereja do Rio Grande',
    nomeCientifico: 'Eugenia involucrata',
    familia: 'Myrtaceae',
    categorias: ['nativas', 'raras', 'vaso'],
    resumo:
      'Conhecida como cereja brasileira, tem frutos vermelhos doces e propriedades medicinais, além de grande valor ornamental.',
    descricao: [
      'A cereja do Rio Grande, também chamada de cerejeira brasileira, é uma frutífera nativa de grande valor ornamental e alimentar. Seus frutos vermelhos brilhantes são doces e muito apreciados.',
      'Além do sabor, a espécie é conhecida por propriedades medicinais, sendo usada na medicina popular. É uma planta versátil, que produz bem em vaso.',
      'A floração branca é um espetáculo e a planta é excelente para paisagismo e para atrair pássaros.',
    ],
    origem: 'Sul e Sudeste do Brasil',
    porte: 'Árvore de 3 a 6 m',
    luz: 'Sol pleno a meia-sombra',
    rega: 'Moderada a frequente',
    solo: 'Fértil e bem drenado',
    vaso: 'Vasos a partir de 30 litros',
    dificuldade: 'Fácil',
    tempoProducao: '3 a 4 anos a partir da muda',
    frutificacao: 'Primavera e verão',
    curiosidades: [
      'É chamada de cereja brasileira por sua semelhança com a cereja europeia.',
      'Possui propriedades medicinais reconhecidas na medicina popular.',
      'Os frutos podem ser consumidos frescos ou em geleias e licores.',
    ],
    dicas: [
      'Faça poda de limpeza anual para estimular a produção.',
      'Mantenha o solo úmido durante a frutificação.',
      'É uma ótima planta para atrair pássaros ao quintal.',
    ],
    videos: videos('cereja_rio_grande'),
    ofertas: ofertasPadrao(),
    cor: '#8E2B2B',
  },
  {
    slug: 'grumixama-amarela',
    imagem: '/frutiferas/grumixama-amarela.jpg',
    nome: 'Grumixama Amarela',
    nomeCientifico: 'Eugenia brasiliensis',
    familia: 'Myrtaceae',
    categorias: ['nativas', 'raras', 'vaso'],
    resumo:
      'Variedade rara da grumixama, com frutos amarelos doces e produção surpreendente mesmo em vasos de 30 litros.',
    descricao: [
      'A grumixama amarela é uma variedade rara da grumixama comum, muito buscada por colecionadores. Seus frutos amarelos são doces, suculentos e de sabor delicado.',
      'A espécie é nativa da Mata Atlântica e produz surpreendentemente bem em vaso. Há relatos de plantas produzindo abundantemente em vasos de 30 litros com o manejo adequado.',
      'É uma frutífera ornamental, com folhagem bonita e flores brancas perfumadas, além de ser ótima para consumo fresco, sucos e geleias.',
    ],
    origem: 'Mata Atlântica (Brasil)',
    porte: 'Árvore de 5 a 15 m (reduzida em vaso)',
    luz: 'Sol pleno a meia-sombra',
    rega: 'Frequente, mantendo o solo úmido',
    solo: 'Fértil, ácido e rico em matéria orgânica',
    vaso: 'Vasos a partir de 30 litros',
    dificuldade: 'Média',
    tempoProducao: '3 a 5 anos a partir da muda',
    frutificacao: 'Primavera e verão',
    curiosidades: [
      'A variedade amarela é bem mais rara que a grumixama roxa.',
      'A grumixama é parente da jabuticaba e da pitanga.',
      'Produz bem em vaso, sendo uma das nativas mais indicadas para pequenos espaços.',
    ],
    dicas: [
      'Use substrato ácido, com boa dose de matéria orgânica.',
      'Mantenha a planta sob sol pleno para frutos mais doces.',
      'Faça podas leves para manter o porte compacto em vaso.',
    ],
    videos: videos('grumixama_amarela'),
    ofertas: ofertasPadrao(),
    cor: '#D9A62E',
    destaque: true,
  },
]

export function getFrutifera(slug: string): Frutifera | undefined {
  return frutiferas.find((f) => f.slug === slug)
}

export function getDestaques(): Frutifera[] {
  return frutiferas.filter((f) => f.destaque)
}

export function getPorCategoria(slug: string): Frutifera[] {
  return frutiferas.filter((f) => f.categorias.includes(slug))
}

export function todosOsVideos(): { id: string; titulo: string; fruta: string; slug: string }[] {
  return frutiferas.flatMap((f) =>
    f.videos.map((v) => ({ id: v.id, titulo: v.titulo, fruta: f.nome, slug: f.slug }))
  )
}
