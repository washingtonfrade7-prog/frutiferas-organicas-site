export interface ModuloProduto {
  titulo: string
  itens: string[]
}

export const produto = {
  nome: 'Cultivo de Frutíferas Orgânicas em Vasos: Guia Completo',
  subtitulo:
    'O guia completo para produzir frutas de verdade em vaso — mesmo em varanda, quintal pequeno ou apartamento.',
  promessa:
    'Aprenda o passo a passo que usamos no canal para plantar, adubar, podar e colher frutíferas orgânicas em vaso, sem depender de sorte nem de produtos caros.',
  formato: 'E-book + videoaulas práticas',
  // Precos (edite conforme a estrategia de lancamento)
  precoDe: 'R$ 97',
  preco: 'R$ 47',
  // Link de checkout (Hotmart/Kiwify). Enquanto vazio, a pagina mostra a lista de espera.
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || '',
  precoObservacao: 'Oferta de lançamento — pagamento único, acesso imediato e 7 dias de garantia.',
  modulos: [
    {
      titulo: '1. Comece certo',
      itens: ['Como escolher a frutífera ideal para o seu espaço', 'Muda enxertada, de alporque ou semente: o que muda', 'Vaso, drenagem e substrato na medida certa'],
    },
    {
      titulo: '2. Plantio que pega',
      itens: ['Passo a passo do plantio em vaso', 'A primeira rega e a aclimatação', 'Erros que matam a muda nas primeiras semanas'],
    },
    {
      titulo: '3. Rega sem erro',
      itens: ['Quanto, quando e como regar', 'Como evitar encharcamento e apodrecimento', 'Autoirrigáveis: quando valem a pena'],
    },
    {
      titulo: '4. Adubação orgânica',
      itens: ['A rotina de adubação por fase da planta', 'Bokashi, húmus e organominerais na prática', 'Sinais de falta e de excesso de nutrientes'],
    },
    {
      titulo: '5. Poda que faz produzir',
      itens: ['Poda de formação, limpeza e frutificação', 'Ferramentas certas e como usar', 'Épocas ideais por espécie'],
    },
    {
      titulo: '6. Floração e frutificação',
      itens: ['Como estimular a florada', 'Polinização e queda de frutos', 'O que fazer quando a planta não produz'],
    },
    {
      titulo: '7. Pragas e doenças',
      itens: ['Controle orgânico das pragas mais comuns', 'Receitas caseiras seguras', 'Prevenção no dia a dia'],
    },
    {
      titulo: '8. Colheita e renovação',
      itens: ['Ponto certo de colheita por fruta', 'Troca de vaso e renovação do substrato', 'Multiplicação de mudas'],
    },
  ] as ModuloProduto[],
  paraQuem: [
    'Quem mora em apartamento ou tem quintal pequeno e quer colher frutas em casa',
    'Quem já tentou plantar e perdeu a muda por erro de rega ou substrato',
    'Quem quer cultivar de forma orgânica, sem agrotóxicos',
    'Quem já acompanha o canal e quer um material organizado para consultar',
  ],
  incluso: [
    'Guia completo em PDF — mais de 60 páginas, em 10 capítulos com ação prática',
    'Catálogo com mais de 100 frutíferas (luz, rega, solo, vaso, dificuldade e época de produção)',
    'Workbook do aluno: diário de cultivo de 90 dias, registro fotográfico e checklists',
    'Alerta de peso para sacadas e varandas de prédio (com a norma NBR 6120)',
    'QR codes e links para os vídeos e guias de cada etapa',
    'Videoaulas práticas gravadas no pomar, mostrando cada etapa',
    'Atualizações futuras sem custo adicional',
  ],
  faq: [
    {
      pergunta: 'Serve para quem nunca plantou nada?',
      resposta:
        'Sim. O material começa do zero: escolha da muda, vaso, substrato e primeira rega. Você aprende o porquê de cada passo, não só a receita.',
    },
    {
      pergunta: 'Funciona em apartamento e varanda de prédio?',
      resposta:
        'Sim — e o guia trata isso com seriedade. Além do cultivo, você aprende a calcular o peso do vaso cheio e a respeitar o limite da laje (NBR 6120), com um mix de substrato leve para varandas. É o cuidado que quase nenhum material do mercado ensina.',
    },
    {
      pergunta: 'Qual a diferença entre o curso e o conteúdo gratuito do canal?',
      resposta:
        'O canal mostra os vídeos soltos. No material, o conteúdo está organizado em ordem, com checklist, fichas e o passo a passo completo — para consultar sempre que precisar.',
    },
    {
      pergunta: 'Quando será lançado?',
      resposta:
        'Estamos finalizando as gravações. Quem entrar na lista de espera é avisado primeiro e garante o desconto de lançamento.',
    },
  ],
}
