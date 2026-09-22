import type { Frutifera } from '@/data/frutiferas'

export function faixaPrecoMuda(fruta: Frutifera): string {
  const rara = fruta.categorias.includes('raras')
  const exotica = fruta.categorias.includes('exoticas')
  const citrica = fruta.categorias.includes('citricas')
  if (rara || exotica) return 'R$ 40 a R$ 150'
  if (citrica) return 'R$ 30 a R$ 90'
  return 'R$ 25 a R$ 70'
}

export function comoEscolherMuda(fruta: Frutifera): string[] {
  return [
    `Prefira mudas enxertadas ou de alporque: a ${fruta.nome.toLowerCase()} frutifica muito mais cedo do que plantas vindas de semente.`,
    'Verifique se o torrão está firme e as raízes bem desenvolvidas, sem sinais de apodrecimento.',
    'Observe as folhas: devem estar verdes, sem manchas, furos ou teias — indicativos de pragas e doenças.',
    'Confirme a procedência: viveiros registrados no MAPA e vendedores com boa reputação reduzem o risco de receber a espécie errada.',
    `Cheque o porte da muda: uma planta de ${fruta.porte.toLowerCase()} é mais fácil de aclimatar em vaso.`,
  ]
}

export function dicasDepoisDeComprar(fruta: Frutifera): { titulo: string; texto: string }[] {
  return [
    { titulo: 'Luminosidade', texto: fruta.luz },
    { titulo: 'Rega', texto: fruta.rega },
    { titulo: 'Solo', texto: fruta.solo },
    { titulo: 'Vaso recomendado', texto: fruta.vaso },
  ]
}

export function faqMuda(fruta: Frutifera): { pergunta: string; resposta: string }[] {
  const nome = fruta.nome
  return [
    {
      pergunta: `A ${nome} produz em vaso?`,
      resposta: `${fruta.vaso} Mantendo o substrato fértil e a adubação em dia, a ${nome.toLowerCase()} frutifica bem em recipiente.`,
    },
    {
      pergunta: `Quanto tempo a ${nome} leva para produzir?`,
      resposta: `${fruta.tempoProducao} O início da produção depende do tipo de muda: as enxertadas ou de alporque frutificam bem antes das plantas de semente.`,
    },
    {
      pergunta: `De quanto sol a ${nome} precisa?`,
      resposta: `${fruta.luz} Quanto mais horas de sol direto, maior tende a ser a produção.`,
    },
    {
      pergunta: `Qual o melhor vaso para ${nome}?`,
      resposta: `${fruta.vaso} Prefira vasos com boa drenagem e largura maior que a altura, pois as raízes das frutíferas se espalham para os lados.`,
    },
  ]
}

export function introMuda(fruta: Frutifera): string {
  return `A ${fruta.nome} (${fruta.nomeCientifico}) é uma frutífera ${fruta.origem.toLowerCase()} de porte ${fruta.porte.toLowerCase()}. ${fruta.resumo} Nesta página você encontra onde comprar a muda, quanto costuma custar e como escolher uma planta saudável para começar a produzir em vaso.`
}
