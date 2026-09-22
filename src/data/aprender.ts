export interface Passo {
  titulo: string
  texto: string
}

export interface Faq {
  p: string
  r: string
}

export interface Topico {
  slug: string
  nome: string
  resumo: string
  intro: string[]
  passos: Passo[]
  dicas: string[]
  erros: string[]
  faq: Faq[]
}

export const topicos: Topico[] = [
  {
    slug: 'plantio',
    nome: 'Como plantar frutíferas em vaso',
    resumo: 'Escolha do vaso, substrato, drenagem e o plantio correto para a muda pegar bem.',
    intro: [
      'Plantar uma frutífera em vaso é diferente de plantar no chão. Em um espaço fechado, a planta depende totalmente de você para água, nutrientes e drenagem. A boa notícia é que, com o vaso e o substrato certos, é possível colher jabuticaba, pitanga, araçá, pitaya e dezenas de outras espécies em varandas, quintais e apartamentos.',
      'A regra de ouro é: quanto maior o vaso, mais estável é a umidade e a temperatura das raízes — e mais fácil fica o cultivo. Comece com um vaso grande e evite ficar trocando a planta de recipiente toda hora.',
      'Neste guia você encontra o passo a passo do plantio, o que colocar no fundo do vaso, como preparar o substrato orgânico e os erros mais comuns de quem está começando.',
    ],
    passos: [
      { titulo: 'Escolha o vaso e o local', texto: 'Prefira vasos de 20 a 50 litros (ou maiores), com furos de drenagem. Coloque a muda em local de sol pleno — a maioria das frutíferas precisa de 5 a 6 horas de sol por dia.' },
      { titulo: 'Prepare a drenagem', texto: 'No fundo, faça uma camada de argila expandida ou pedra britada. Sobre ela, coloque uma manta de bidim ou tecido para o substrato não entupir os furos.' },
      { titulo: 'Monte o substrato orgânico', texto: 'Misture terra vegetal, composto orgânico curtido e areia grossa (ou casca de arroz) na proporção aproximada de 2:2:1. Se quiser, acrescente húmus de minhoca e um pouco de pó de rocha.' },
      { titulo: 'Plante a muda no nível certo', texto: 'Faça um buraco no substrato e acomode a muda. O nó da enxertia deve ficar acima do solo — nunca enterrado. Firme a terra ao redor sem apertar demais.' },
      { titulo: 'Regue e proteja', texto: 'Regue bem para assentar o substrato. Nos primeiros 15 dias, mantenha a muda na meia-sombra para reduzir o estresse e depois leve ao sol pleno.' },
    ],
    dicas: [
      'Use vasos claros: esquentam menos as raízes no verão forte.',
      'Coloque o vaso sobre rodinhas ou tijolos para a água não acumular embaixo.',
      'Cubra o substrato com folhas secas ou palha (cobertura morta) para conservar a umidade.',
      'Registre a data do plantio para acompanhar o desenvolvimento da muda.',
      'Compre mudas enxertadas ou de viveiro confiável: produzem mais cedo e com qualidade.',
    ],
    erros: [
      'Vaso pequeno demais, que seca em horas no calor.',
      'Substrato pesado e sem drenagem, que apodrece as raízes.',
      'Enterrar o ponto de enxertia da muda.',
      'Plantar e já deixar no sol forte o dia inteiro sem adaptação.',
    ],
    faq: [
      { p: 'Qualquer frutífera produz em vaso?', r: 'Quase todas, desde que o vaso seja compatível com o porte da planta. Espécies naturalmente compactas, como araçá, pitanga, pitaya e goiaba, dão ótimos resultados.' },
      { p: 'Posso usar terra de jardim?', r: 'Pode, desde que misturada com composto orgânico e material drenante. Terra pura compacta e sufoca as raízes.' },
      { p: 'Quanto tempo até a primeira colheita?', r: 'Depende da espécie e do tamanho da muda. Muitas começam a produzir entre 1 e 3 anos; algumas, como a pitaya, podem frutificar no primeiro ano.' },
    ],
  },
  {
    slug: 'adubacao',
    nome: 'Adubação orgânica em vaso',
    resumo: 'O que usar, quanto colocar e de quanto em quanto tempo nutrir suas frutíferas.',
    intro: [
      'Em vaso, os nutrientes se esgotam rápido porque o volume de substrato é pequeno e cada rega leva parte deles embora. Por isso, adubar de forma regular é o que separa uma planta que apenas sobrevive de uma que produz frutas de verdade.',
      'Na linha orgânica, os adubos são, em sua maioria, de liberação lenta: eles precisam ser decompostos pelos microrganismos do substrato antes de a planta absorver. Isso torna a adubação mais segura, sem risco de queimar as raízes, mas exige constância.',
      'Neste guia você aprende a montar um calendário simples de adubação, quais produtos usar e como perceber quando a planta está pedindo comida.',
    ],
    passos: [
      { titulo: 'Entenda os 3 momentos', texto: 'Adube no crescimento (nitrogênio, para folhas e ramos), antes da floração (fósforo, para flores e raízes) e durante a frutificação (potássio, para frutos doces e firmes).' },
      { titulo: 'Escolha adubos orgânicos', texto: 'Húmus de minhoca, composto curtido, esterco bovino ou de aves bem curtido, torta de mamona, farinha de osso, cinzas (com moderação) e bokashi.' },
      { titulo: 'Aplique ao redor, não no tronco', texto: 'Espalhe o adubo na superfície do substrato, na projeção da copa, e incorpore levemente com um garfo. Nunca encoste no colo da planta.' },
      { titulo: 'Regue depois de adubar', texto: 'A água ajuda a dissolver e levar os nutrientes para as raízes. Adube sempre com o substrato já úmido, de preferência no fim da tarde.' },
      { titulo: 'Mantenha o calendário', texto: 'A cada 30 a 60 dias na primavera e no verão; a cada 60 a 90 dias no outono e no inverno, quando o crescimento desacelera.' },
    ],
    dicas: [
      'Faça adubação orgânica variada: combine fontes diferentes para cobrir todos os nutrientes.',
      'Use cobertura morta: ela vira adubo lentamente e mantém a vida do substrato.',
      'Frutas doces gostam de potássio na fase final — cinza de madeira e casca de banana curtida ajudam.',
      'Microrganismos importam: um substrato vivo decompõe o adubo e alimenta a planta.',
      'Anote as datas de adubação para não perder o ritmo.',
    ],
    erros: [
      'Adubar planta seca ou com o substrato muito seco — pode queimar as raízes.',
      'Exagerar na dose: mais adubo não significa mais frutas.',
      'Usar esterco fresco, que fermenta e aquece, queimando as raízes.',
      'Adubar só quando a planta já está amarelada, tarde demais.',
    ],
    faq: [
      { p: 'Posso usar adubo químico?', r: 'Pode, mas o foco orgânico traz frutos mais saborosos e um substrato mais saudável. Se usar químico, prefira fórmulas de liberação lenta e siga a dose da embalagem.' },
      { p: 'Minha planta tem muitas folhas e poucas flores. O que fazer?', r: 'Provavelmente há excesso de nitrogênio. Reduza as fontes nitrogenadas e aumente fósforo e potássio.' },
      { p: 'Adubo líquido funciona?', r: 'Sim, e é ótimo para reforços rápidos. Pode ser usado a cada 15 dias, diluído na rega, na primavera e no verão.' },
    ],
  },
  {
    slug: 'poda',
    nome: 'Poda de frutíferas em vaso',
    resumo: 'Poda de formação, limpeza e produção para manter a planta compacta e produtiva.',
    intro: [
      'A poda é a ferramenta que permite manter uma frutífera saudável dentro de um vaso. Sem podar, a planta cresce demais, sombreia a si mesma e produz menos. Com a poda certa, ela fica compacta, arejada e concentra energia na produção de frutos.',
      'Existem três tipos principais: a poda de formação, feita nos primeiros anos para dar estrutura à planta; a poda de limpeza, que remove galhos secos, doentes e mal posicionados; e a poda de produção, que estimula novas brotações e flores.',
      'A melhor época para podar a maioria das frutíferas é logo após a colheita, no fim do inverno ou início da primavera. Ferramentas limpas e afiadas fazem toda a diferença.',
    ],
    passos: [
      { titulo: 'Comece pela limpeza', texto: 'Remova galhos secos, doentes, tortos ou que crescem para dentro da copa. Isso abre a planta para o sol e o ar.' },
      { titulo: 'Faça a poda de formação', texto: 'Nos primeiros anos, escolha 3 a 4 ramos principais bem distribuídos e corte o restante, formando uma copa equilibrada.' },
      { titulo: 'Estimule a produção', texto: 'Corte a ponta dos ramos maduros (poda de desponta) para forçar novas brotações, que são as que vão florar.' },
      { titulo: 'Reduza a altura em vaso', texto: 'Mantenha a planta na altura que você consegue cuidar. Cortes de rebaixamento devem ser feitos em etapas, nunca de uma vez.' },
      { titulo: 'Trate os cortes', texto: 'Cortes grossos podem receber pasta cicatrizante. Entre uma planta e outra, limpe a lâmina com álcool para não transmitir doenças.' },
    ],
    dicas: [
      'Pode sempre com a lua e a planta em bom vigor, nunca em período de estresse por seca.',
      'Não remova mais de um terço da copa de uma vez.',
      'Aproveite as pontas podadas para fazer mudas de espécies que pegam por estaca.',
      'Observe o formato natural da espécie: algumas, como a pitaya, pedem poda de condução, não de copa.',
      'Anote o que podou e quando, para comparar a produção na safra seguinte.',
    ],
    erros: [
      'Podar na época errada e perder a florada do ano.',
      'Deixar galhos competindo no centro da copa, criando sombra e umidade.',
      'Usar tesoura cega, que esmaga o galho em vez de cortar.',
      'Podar demais de uma vez e deixar a planta exausta.',
    ],
    faq: [
      { p: 'Posso podar qualquer mês?', r: 'Evite podar durante a floração e nos períodos de frio intenso ou seca. O ideal é logo após a colheita.' },
      { p: 'Minha pitaya não produz. É poda?', r: 'Pode ser. A pitaya precisa de poda de condução e de ramos maduros para florar. Remova brotos novos em excesso e conduza a planta.' },
      { p: 'Poda faz a planta produzir mais rápido?', r: 'A poda direciona a energia da planta. Bem feita, antecipa e aumenta a produção.' },
    ],
  },
  {
    slug: 'colheita',
    nome: 'Colheita no ponto certo',
    resumo: 'Como saber a hora de colher cada fruta e aproveitar ao máximo o sabor.',
    intro: [
      'Colher no ponto certo é o que garante o sabor que só a fruta madura no pé tem. Cada espécie dá sinais claros de que está pronta: mudança de cor, aroma, textura ao toque e facilidade de soltar do galho.',
      'Diferente do que acontece no mercado, onde as frutas são colhidas verdes para aguentar o transporte, no seu vaso você pode esperar o ponto ideal — e é isso que torna o cultivo em casa tão recompensador.',
      'Neste guia você aprende a reconhecer os sinais de maturação, a colher sem machucar a planta e a conservar melhor o que colheu.',
    ],
    passos: [
      { titulo: 'Observe a cor', texto: 'A maioria das frutas muda de cor ao amadurecer: a jabuticaba fica preta, a pitanga preta escurece, a pitaya ganha rosa intenso, o araçá fica vermelho vivo.' },
      { titulo: 'Sinta o aroma e o toque', texto: 'Fruta madura exala perfume e cede levemente à pressão dos dedos. Se estiver dura e sem cheiro, espere mais um pouco.' },
      { titulo: 'Colha com cuidado', texto: 'Use tesoura de poda ou colha com o pedúnculo, girando levemente. Evite puxar, que machuca o galho e a fruta.' },
      { titulo: 'Colha na hora mais fresca', texto: 'As primeiras horas da manhã são ideais: a fruta está firme e mais fria, o que aumenta a durabilidade.' },
      { titulo: 'Aproveite ou conserve', texto: 'Consuma fresca ou faça geleias, sucos e licores. Frutas colhidas podem ser congeladas por porções.' },
    ],
    dicas: [
      'Colha em pequenas quantidades e com frequência, para não perder frutas maduras no pé.',
      'Proteja a produção com saquinhos ou telas contra pássaros e insetos.',
      'Frutos que caem sozinhos geralmente estão no ponto — recolha no mesmo dia.',
      'Anote a data da colheita para conhecer o calendário da sua região.',
      'Cada safra é aprendizado: compare e ajuste o manejo.',
    ],
    erros: [
      'Colher verde por ansiedade e perder o sabor.',
      'Deixar a fruta passar do ponto, atraindo insetos e apodrecendo.',
      'Puxar a fruta e quebrar galhos produtivos.',
      'Acumular frutas em sacos fechados, que aceleram o apodrecimento.',
    ],
    faq: [
      { p: 'Como sei que a pitaya está madura?', r: 'A casca fica rosa ou amarela intensa, as brácteas (folhinhas) começam a secar e o fruto cede levemente ao toque.' },
      { p: 'Jabuticaba caiu do pé, ainda serve?', r: 'Serve, se recolhida no mesmo dia. Jabuticabas maduras soltam-se facilmente do tronco.' },
      { p: 'Posso colher fruta antes de viajar?', r: 'Sim. Colha levemente antes do ponto e deixe terminar de amadurecer fora da geladeira.' },
    ],
  },
  {
    slug: 'tour',
    nome: 'Tour pelo pomar em vasos',
    resumo: 'Inspire-se com o pomar em vasos e veja como organizar o seu espaço.',
    intro: [
      'Um pomar em vasos cabe em qualquer lugar: varanda, quintal, terraço, corredor ou apartamento. O segredo está na organização do espaço e na escolha das espécies certas para cada quantidade de sol.',
      'Neste tour você conhece o pomar do canal, vê como as plantas estão dispostas, quais vasos são usados e como espécies diferentes convivem no mesmo espaço produzindo durante boa parte do ano.',
      'Use este material como inspiração: comece com poucas plantas, domine o manejo e vá ampliando sua coleção aos poucos.',
    ],
    passos: [
      { titulo: 'Mapeie o sol do seu espaço', texto: 'Observe onde bate sol pela manhã e à tarde. Frutíferas de fruto precisam de 5 a 6 horas diárias de luz.' },
      { titulo: 'Agrupe por necessidade de água', texto: 'Junte plantas que gostam de mais água e deixe as mais rústicas em outro setor. Isso facilita a rega.' },
      { titulo: 'Use suportes e níveis', texto: 'Estantes, pallets e degraus aproveitam o espaço vertical e ajudam a evitar sombra entre as plantas.' },
      { titulo: 'Diversifique as espécies', texto: 'Combine frutíferas de safras diferentes para colher quase o ano todo.' },
      { titulo: 'Crie caminhos e áreas de apoio', texto: 'Deixe espaço para circular, guardar ferramentas e apoiar o regador e os insumos.' },
    ],
    dicas: [
      'Comece pequeno e amplie conforme ganha experiência.',
      'Espécies rústicas como araçá, pitanga e gabiroba são ótimas para iniciar.',
      'Mantenha as plantas em rodízio de sol, se o espaço for limitado.',
      'Fotografe seu pomar ao longo dos meses para acompanhar a evolução.',
      'Compartilhe sua produção: pomar em vaso rende mais do que parece.',
    ],
    erros: [
      'Encher o espaço de plantas e não conseguir cuidar de todas.',
      'Deixar vasos grandes demais em locais apertados, dificultando a circulação.',
      'Misturar plantas de sol com plantas de sombra no mesmo setor.',
      'Esquecer a drenagem e encharcar o piso do terraço.',
    ],
    faq: [
      { p: 'Quantas frutíferas cabem em uma varanda?', r: 'Depende do tamanho e da luz. Em uma varanda média, 6 a 10 vasos bem organizados já formam um belo pomar.' },
      { p: 'Apartamento muito quente funciona?', r: 'Sim, com regas mais frequentes e vasos maiores, que aquecem menos. Prefira espécies rústicas.' },
      { p: 'Preciso de estufa?', r: 'Na maioria das regiões do Brasil, não. Apenas proteja as plantas jovens de geadas e ventos frios.' },
    ],
  },
  {
    slug: 'cuidados',
    nome: 'Cuidados, regas e problemas',
    resumo: 'Rega correta, pragas comuns e como recuperar uma planta em dificuldade.',
    intro: [
      'A maior parte dos problemas em frutíferas de vaso vem de dois fatores: rega errada e substrato esgotado. Folhas amarelas, queda de frutos e plantas murchas quase sempre apontam para excesso ou falta de água.',
      'Além da rega, pragas como cochonilha, pulgão, mosca-das-frutas e formigas pedem atenção constante — mas em cultivo orgânico o equilíbrio do ambiente é o melhor remédio.',
      'Este guia reúne o manejo de rega, os problemas mais comuns e o passo a passo para recuperar uma planta debilitada.',
    ],
    passos: [
      { titulo: 'Aprenda a rega certa', texto: 'Regue profundamente e espere o substrato secar na superfície antes de regar de novo. No calor, pode ser diário; no frio, a cada 2 ou 3 dias.' },
      { titulo: 'Monitore pragas', texto: 'Vire as folhas e observe brotos novos toda semana. Cochonilha, pulgão e ácaros aparecem primeiro nos brotos.' },
      { titulo: 'Controle no orgânico', texto: 'Use óleo de neem, calda de sabão neutro, álcool diluído e remoção manual. Evite inseticidas de amplo espectro.' },
      { titulo: 'Recupere a planta', texto: 'Em planta debilitada, suspenda a adubação, ajuste a rega, melhore o substrato e faça poda de limpeza dos galhos secos.' },
      { titulo: 'Previna', texto: 'Substrato vivo, boa drenagem, circulação de ar e adubação equilibrada previnem a maior parte dos problemas.' },
    ],
    dicas: [
      'O dedo é o melhor sensor: enfie no substrato; se estiver seco a 2 cm, regue.',
      'Prato com água parada é inimigo das raízes.',
      'Mantenha a cobertura morta para estabilizar a umidade.',
      'Plantas bem nutridas resistem mais a pragas.',
      'Isole plantas doentes para não contaminar as vizinhas.',
    ],
    erros: [
      'Regar um pouquinho todos os dias, deixando o fundo sempre úmido.',
      'Aplicar veneno forte e matar também os polinizadores.',
      'Adubar planta doente, agravando o problema.',
      'Ignorar formigas, que trazem e protegem pulgões e cochonilhas.',
    ],
    faq: [
      { p: 'Minha planta está com folhas amarelas. É falta de quê?', r: 'Pode ser excesso de água (o mais comum), falta de nutrientes ou luz insuficiente. Verifique a drenagem primeiro.' },
      { p: 'Como combater a mosca-das-frutas?', r: 'Use armadilhas, ensaque os frutos e recolha os caídos. A mosca ataca frutas maduras.' },
      { p: 'Posso usar neem sempre?', r: 'Use com moderação, nas horas mais frescas e evitando a floração, para não afetar polinizadores.' },
    ],
  },
  {
    slug: 'floracao',
    nome: 'Floração e polinização',
    resumo: 'Como garantir flores e frutos bem formados em vaso.',
    intro: [
      'A floração é o momento decisivo: é dela que nasce a safra. Uma planta pode estar linda e verde, mas se as flores não vingarem, não há fruto. Fatores como nutrição, luz e polinização determinam esse sucesso.',
      'Algumas espécies, como a pitaya e as anonáceas (pinha, atemoia, cherimoia), dependem de polinização manual para produzir bem em vaso e fora do seu ambiente natural.',
      'Neste guia você aprende a preparar a planta para florar, a identificar os botões florais e a ajudar na polinização.',
    ],
    passos: [
      { titulo: 'Prepare a planta', texto: 'Antes da floração, aumente fósforo e potássio e garanta sol pleno. A planta precisa de reservas para florar.' },
      { titulo: 'Identifique os botões', texto: 'Os botões florais surgem nos ramos maduros. Na pitaya, são botões grandes que abrem à noite; nas mirtáceas, botões pequenos e brancos.' },
      { titulo: 'Favoreça os polinizadores', texto: 'Evite inseticidas na floração e mantenha flores próximas para atrair abelhas e outros polinizadores.' },
      { titulo: 'Faça a polinização manual quando precisar', texto: 'Com um pincel macio ou cotonete, transfira o pólen de uma flor para outra, nas primeiras horas da manhã.' },
      { titulo: 'Cuide da frutificação', texto: 'Após a florada, mantenha a rega estável e adube com potássio. Evite estresse hídrico, que derruba os frutinhos.' },
    ],
    dicas: [
      'Plantas bem alimentadas floram mais e com flores mais viáveis.',
      'A pitaya abre a flor à noite: polinize no fim da tarde ou à noite.',
      'Não mexa nas flores no calor forte do dia.',
      'Reduza o nitrogênio quando a planta estiver formando botões.',
      'Anote o período de floração de cada espécie para se planejar.',
    ],
    erros: [
      'Adubar com muito nitrogênio e a planta só fazer folhas.',
      'Usar inseticida durante a floração e afastar os polinizadores.',
      'Deixar a planta passar sede na frutificação.',
      'Desistir da polinização manual em espécies que dependem dela.',
    ],
    faq: [
      { p: 'Minha planta flora, mas não dá fruto. Por quê?', r: 'Pode ser falta de polinização, nutrição desequilibrada ou queda por estresse hídrico. Tente polinização manual e ajuste a adubação.' },
      { p: 'Preciso de duas plantas para frutificar?', r: 'A maioria das espécies é autofértil. Algumas anonáceas e pitayas produzem melhor com polinização cruzada ou manual.' },
      { p: 'Por que os frutinhos caem?', r: 'Queda de frutinhos é comum e natural (a planta descarta o excesso), mas pode indicar rega irregular ou falta de nutrientes.' },
    ],
  },
  {
    slug: 'gastronomia',
    nome: 'Gastronomia com frutas do pomar',
    resumo: 'Sucos, geleias, licores e receitas para aproveitar a colheita.',
    intro: [
      'Colher do próprio pomar é só metade da alegria — a outra metade está na cozinha. Frutas como jabuticaba, grumixama, araçá e uvaia rendem sucos, geleias, licores, sorvetes e receitas que não se encontram no mercado.',
      'Aproveitar integralmente a produção evita desperdício e transforma o excedente em produtos que duram o ano todo.',
      'Este guia traz ideias de preparo e dicas para conservar as frutas do seu pomar.',
    ],
    passos: [
      { titulo: 'Selecione e higienize', texto: 'Use frutas maduras e firmes. Lave bem e descarte as danificadas.' },
      { titulo: 'Congele porções', texto: 'A maioria das frutas congela bem e mantém o sabor para sucos e vitaminas.' },
      { titulo: 'Faça geleias e compotas', texto: 'Frutas ácidas, como araçá e cambuci, dão geleias de sabor marcante e cor intensa.' },
      { titulo: 'Experimente licores', texto: 'Jabuticaba, grumixama e uvaia rendem licores artesanais de longa duração.' },
      { titulo: 'Registre as receitas', texto: 'Anote quantidades e resultados para repetir as melhores criações.' },
    ],
    dicas: [
      'Frutas colhidas no ponto têm mais açúcar e dispensam conservantes.',
      'Use a casca de frutas ricas em antioxidantes, como a jabuticaba.',
      'Combine frutas do pomar em sucos e sorvetes para sabores únicos.',
      'Esterilize potes para geleias durarem mais.',
      'Presenteie: produtos caseiros do pomar encantam.',
    ],
    erros: [
      'Usar frutas passadas, que comprometem o sabor.',
      'Ferver demais e perder o aroma.',
      'Não higienizar os potes, acelerando a deterioração.',
      'Descartar cascas e sementes que poderiam virar novos usos.',
    ],
    faq: [
      { p: 'Qual fruta rende a melhor geleia?', r: 'As mais ácidas e aromáticas, como araçá, cambuci, grumixama e pitanga, dão geleias de destaque.' },
      { p: 'Posso fazer licor com qualquer fruta?', r: 'Sim. As mais aromáticas, como jabuticaba e uvaia, resultam em licores excelentes.' },
      { p: 'Como conservar frutas por mais tempo?', r: 'Congelamento por porções e geleias/compotas são as formas mais práticas.' },
    ],
  },
]

export function getTopico(slug: string): Topico | undefined {
  return topicos.find((t) => t.slug === slug)
}
