import Link from 'next/link'

const atalhos = [
  { href: '/frutiferas', label: 'Catálogo de frutíferas' },
  { href: '/mudas', label: 'Onde comprar mudas' },
  { href: '/comprar', label: 'Vasos, substratos e adubos' },
  { href: '/guias', label: 'Guias de cultivo' },
  { href: '/videos', label: 'Vídeos de cultivo' },
  { href: '/curso', label: 'Curso: do plantio à colheita' },
]

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl font-display font-bold text-forest-600">404</p>
      <h1 className="text-2xl font-bold text-ink-900 mt-4 mb-2">Página não encontrada</h1>
      <p className="text-ink-500 mb-8">
        A página que você procura pode ter sido movida ou não existe mais. Veja por onde continuar:
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <Link href="/" className="bg-forest-600 text-white px-6 py-3 rounded-full hover:bg-forest-700 transition font-medium">
          Voltar ao início
        </Link>
        <Link href="/frutiferas" className="border-2 border-forest-600 text-forest-700 px-6 py-3 rounded-full hover:bg-forest-50 transition font-medium">
          Ver frutíferas
        </Link>
      </div>

      <ul className="flex flex-wrap gap-2 justify-center">
        {atalhos.map((a) => (
          <li key={a.href}>
            <Link
              href={a.href}
              className="inline-block rounded-full bg-cream-100 px-4 py-1.5 text-sm text-forest-700 hover:bg-cream-200 transition"
            >
              {a.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
