import Link from 'next/link'
import Image from 'next/image'
import { categorias } from '@/data/categorias'
import { site, youtubeChannelUrl } from '@/lib/site'

export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="bg-forest-900 text-cream-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-cream-100 font-bold text-lg mb-4 flex items-center gap-2">
              <Image src="/logo.png" alt="Frutíferas Orgânicas" width={32} height={32} className="rounded-full ring-1 ring-white/20" />
              <span>Frutíferas Orgânicas</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Portal de conteúdo e vitrine de frutíferas orgânicas em vaso. Aprenda a cultivar e
              encontre onde comprar nos melhores parceiros.
            </p>
            <div className="flex gap-3 mt-4">
              <a href={youtubeChannelUrl()} target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-terracotta-100 transition" title="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-terracotta-100 transition" title="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.175 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-cream-100 font-bold mb-4">Frutíferas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/frutiferas" className="hover:text-terracotta-100 transition">Todas as frutíferas</Link></li>
              {categorias.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categorias/${cat.slug}`} className="hover:text-terracotta-100 transition">{cat.nome}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-cream-100 font-bold mb-4">Conteúdo</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/videos" className="hover:text-terracotta-100 transition">Vídeos de cultivo</Link></li>
              <li><Link href="/guias" className="hover:text-terracotta-100 transition">Guias de cultivo</Link></li>
              <li><Link href="/sobre" className="hover:text-terracotta-100 transition">Sobre o projeto</Link></li>
              <li><Link href="/contato" className="hover:text-terracotta-100 transition">Contato</Link></li>
              <li><a href={youtubeChannelUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta-100 transition">Canal no YouTube</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-cream-100 font-bold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/aviso-de-afiliados" className="hover:text-terracotta-100 transition">Aviso de afiliados</Link></li>
              <li><Link href="/politica-de-privacidade" className="hover:text-terracotta-100 transition">Política de privacidade</Link></li>
              <li className="flex items-center gap-2 pt-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href={`mailto:${site.email}`} className="hover:text-terracotta-100 transition break-all">{site.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{site.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-800 py-6 text-center text-xs text-cream-200">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p>Frutíferas Orgânicas - Conteúdo e vitrine de frutíferas orgânicas. © {ano}. Todos os direitos reservados.</p>
          <p>Este site participa de programas de afiliados. Ao comprar por nossos links, podemos receber uma comissão sem custo adicional para você.</p>
          <p>Fotos e informações meramente ilustrativas. Consulte sempre o vendedor parceiro.</p>
        </div>
      </div>
    </footer>
  )
}
