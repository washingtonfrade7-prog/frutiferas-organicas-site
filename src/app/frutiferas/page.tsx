import type { Metadata } from 'next'
import FrutiferasContent from './content'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Catálogo de frutíferas orgânicas para cultivo em vaso',
  description:
    'Catálogo completo de frutíferas orgânicas para cultivo em vaso: fichas de cultivo, vídeos, dicas e onde comprar mudas e insumos nos parceiros.',
  alternates: { canonical: '/frutiferas' },
  openGraph: {
    url: '/frutiferas',
    title: `Catálogo de frutíferas - ${site.name}`,
    description:
      'Explore 100+ frutíferas orgânicas para vaso com fichas, vídeos e onde comprar.',
  },
}

export default function FrutiferasPage() {
  return <FrutiferasContent />
}
