import type { Metadata } from 'next'
import FrutiferasContent from '@/app/frutiferas/content'

export const metadata: Metadata = {
  title: 'Catálogo interativo',
  description: 'Catálogo de frutíferas orgânicas para vaso, com filtros por situação, luz e dificuldade.',
  robots: { index: false, follow: false },
}

// Versão sem cabeçalho e rodapé, feita para rodar dentro da área de membros
// (iframe). O layout raiz detecta /catalogo-embed e esconde o "chrome" do site.
export default function CatalogoEmbedPage() {
  return <FrutiferasContent embed />
}
