// Playlists temáticas do canal ligadas aos guias de cultivo.
// Mapeamento curado (ver PROGRESSO v15/v16).

export interface GuiaPlaylist {
  id: string
  titulo: string
  total: number
  url: string
}

function pl(id: string, titulo: string, total: number): GuiaPlaylist {
  return { id, titulo, total, url: `https://www.youtube.com/playlist?list=${id}` }
}

export const guiaPlaylists: Record<string, GuiaPlaylist> = {
  plantio: pl('PL25OT3jzD2Q18BFTrxhrtDLxe7OAOmD_F', 'Horta e pequeno pomar desde o início', 452),
  adubacao: pl('PL25OT3jzD2Q1B9FmqECDC2Viv2VWwR5Ug', 'Como adubar frutíferas em vasos', 25),
  poda: pl('PL25OT3jzD2Q04n7zMkIrKPiu_GmJUtQNh', 'Como podar frutíferas', 55),
  colheita: pl('PL25OT3jzD2Q13bRp1sTzdhRaXNOZcYvBh', 'Colheita no pomar orgânico', 124),
  tour: pl('PL25OT3jzD2Q1rqPgK01nPgjWDJ07oy8rf', 'Especiais: tour pelo pomar em vasos', 119),
  cuidados: pl('PL25OT3jzD2Q3vXt_nV4lMHn4cF8YmUXdz', 'Cuidados básicos com pomar em vasos', 75),
  floracao: pl('PL25OT3jzD2Q2fgwpxYtpE6PNWiFng5uBd', 'Frutas o ano inteiro', 36),
  gastronomia: pl('PL25OT3jzD2Q1AzrnRg-n9EhVaQHJT1Cuo', 'Gastronomia', 7),
}

export function getGuiaPlaylist(slug: string): GuiaPlaylist | undefined {
  return guiaPlaylists[slug]
}
