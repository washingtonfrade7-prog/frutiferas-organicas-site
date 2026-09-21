import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-display font-bold text-forest-600">404</p>
      <h1 className="text-2xl font-bold text-ink-900 mt-4 mb-2">Página não encontrada</h1>
      <p className="text-ink-500 mb-8">
        A página que você procura pode ter sido movida ou não existe mais.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="bg-forest-600 text-white px-6 py-3 rounded-full hover:bg-forest-700 transition font-medium">
          Voltar ao início
        </Link>
        <Link href="/frutiferas" className="border-2 border-forest-600 text-forest-700 px-6 py-3 rounded-full hover:bg-forest-50 transition font-medium">
          Ver frutíferas
        </Link>
      </div>
    </div>
  )
}
