export interface MetodoUpsell {
  titulo: string
  itens: string[]
}

export const upsell = {
  nome: 'Multiplicação de Mudas na Prática',
  subtitulo:
    'Pare de comprar muda: aprenda a produzir as suas — estaquia, alporque e enxertia, passo a passo.',
  promessa:
    'O módulo imersivo para quem quer transformar uma planta que já dá certo em dez. Você aprende as quatro formas de multiplicar frutíferas, qual usar em cada espécie e como não perder a muda.',
  formato: 'E-book prático com fotos e diagramas',
  // Precos (edite conforme a estrategia de lancamento)
  precoDe: 'R$ 97',
  preco: 'R$ 67',
  // Link de checkout do upsell (Hotmart). Enquanto vazio, a pagina mostra o guia principal.
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_UPSELL_URL || '',
  precoObservacao: 'Pagamento único, acesso imediato e 7 dias de garantia.',
  modulos: [
    {
      titulo: '1. Estaquia — o método mais fácil',
      itens: [
        'Como cortar o galho certo (nós, ângulo e número de folhas)',
        'Substrato e a mini-estufa com garrafa PET',
        'Hormônios de enraizamento caseiros: salgueiro, mel e canela',
        'Espécies que pegam fácil — e as que não pegam',
      ],
    },
    {
      titulo: '2. Alporque — enraizar no próprio pé',
      itens: [
        'O anelamento: os dois cortes e a casca removida',
        'Substrato, amarração e o "bolo" no galho',
        'Quando separar a muda (as raízes brancas)',
        'O método tradicional para jabuticaba, lichia, citros e manga',
      ],
    },
    {
      titulo: '3. Enxertia — igual à planta-mãe',
      itens: [
        'Garfagem em "V": o encaixe que cicatriza',
        'Borbulhia, a técnica dos citros',
        'Encostia, passo a passo',
        'Como escolher o cavalo e a copa',
      ],
    },
    {
      titulo: '4. Sementes e transplante',
      itens: [
        'Quando a semente vale a pena (e por que demora)',
        'Como acelerar a germinação',
        'Transplante sem perder a muda',
        'Do vasinho ao vaso definitivo',
      ],
    },
  ] as MetodoUpsell[],
  paraQuem: [
    'Quem já cultiva e quer multiplicar o pomar sem gastar com mudas',
    'Quem quer reproduzir uma planta que já sabe que produz bem',
    'Quem quer fazer mudas para presentear, trocar ou vender',
    'Quem quer dominar a enxertia de citros, manga e abacate',
  ],
  incluso: [
    'E-book completo em PDF, com fotos e diagramas das técnicas',
    'Os quatro métodos: estaquia, alporque, enxertia e sementes',
    'Passo a passo de cada método, com época e substrato ideais',
    'Hormônios de enraizamento caseiros que funcionam',
    'Método por espécie: o que usar em cada frutífera',
    'Os 12 erros que fazem a muda não pegar',
    'FAQ e checklist de cada método',
    'Acesso imediato, para ler no celular ou imprimir',
  ],
  faq: [
    {
      pergunta: 'Preciso ter experiência para acompanhar?',
      resposta:
        'Não. O material começa pela estaquia, que é o método mais fácil, e só depois avança para o alporque e a enxertia. Cada passo é demonstrado do zero.',
    },
    {
      pergunta: 'Serve para quem não comprou o guia principal?',
      resposta:
        'Serve. Este material é autônomo e ensina a multiplicação do começo. Ele combina muito bem com o guia de frutíferas em vaso, mas não é pré-requisito.',
    },
    {
      pergunta: 'Funciona para jabuticaba e citros?',
      resposta:
        'Sim. Para essas espécies, a estaquia é difícil — o material indica alporque e enxertia, com o passo a passo completo de cada uma.',
    },
    {
      pergunta: 'Como recebo o material?',
      resposta:
        'O acesso é imediato após a compra: um PDF para ler no celular ou imprimir. Você tem 7 dias de garantia — se não gostar, devolvemos o valor.',
    },
  ],
}
