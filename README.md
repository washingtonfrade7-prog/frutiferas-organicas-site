# Frutíferas Orgânicas

Portal de conteúdo e vitrine de marketing de afiliados sobre **cultivo de frutíferas orgânicas em
vaso**. O site não possui carrinho nem checkout: os botões "Onde Comprar" / "Ver Oferta"
direcionam para lojas parceiras via links de afiliado, abrindo em nova aba.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Fontes: Fraunces (display) e Inter (corpo)
- Catálogo 100% estático (sem backend/banco)

Identidade visual reaproveitada do projeto `loja-virtual` (paleta forest/cream/terracotta).

## Rodando o projeto

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servidor de produção
npm run lint     # análise estática
```

Copie `.env.example` para `.env.local` e ajuste a URL pública e os contatos.

## Estrutura

```
src/
  app/
    page.tsx                     # Home
    frutiferas/page.tsx          # Catálogo
    frutiferas/[slug]/page.tsx   # Ficha da frutífera (galeria, vídeos, ofertas)
    categorias/[slug]/page.tsx   # Categoria
    videos/page.tsx              # Central de vídeos do YouTube
    guias/page.tsx               # Guias por tema (poda, adubação, cuidados...)
    sobre, contato, aviso-de-afiliados, politica-de-privacidade
    sitemap.ts, robots.ts, icon.png, apple-icon.png
  components/                    # Header, Footer, cards, banners, vídeos, etc.
  data/
    frutiferas.ts                # Fichas manuais (10 frutíferas) + merge
    frutiferas-extras.ts         # GERADO pela auditoria (demais frutíferas)
    guias.ts                     # GERADO pela auditoria (vídeos por tema)
    categorias.ts                # Categorias
    ofertas.ts                   # Links de afiliado (EDITE AQUI)
  lib/
    site.ts                      # Configuração geral
    seo.ts                       # JSON-LD
    video.ts                     # Helpers de embed do YouTube
public/
  banners/                       # Banners da marca
  frutiferas/                    # Hero, galeria e frames das frutas
ferramentas/auditoria/           # Scripts de auditoria do canal (Python)
auditoria/                       # Resultados da auditoria (frutas, videos, keywords)
```

## Auditoria do canal

O catálogo é alimentado por uma auditoria do canal `@FrutíferasOrgânicas`
(YouTube Data API + transcrições locais). Veja `ferramentas/auditoria/README.md`.

```powershell
& "C:\Users\Micro\Downloads\Projeto automação youtube\.venv\Scripts\python.exe" -X utf8 ferramentas/auditoria/sincronizar.py
& "C:\Users\Micro\Downloads\Projeto automação youtube\.venv\Scripts\python.exe" -X utf8 ferramentas/auditoria/03_assets.py
& "C:\Users\Micro\Downloads\Projeto automação youtube\.venv\Scripts\python.exe" -X utf8 ferramentas/auditoria/06_gerar_catalogo.py
& "C:\Users\Micro\Downloads\Projeto automação youtube\.venv\Scripts\python.exe" -X utf8 ferramentas/auditoria/07_gerar_guias.py
```

## Como editar conteúdo

- **Links de afiliado:** `src/data/ofertas.ts` (substitua as URLs `#`).
- **Frutas, textos, vídeos e dicas:** `src/data/frutiferas.ts`.
- **Banners da marca:** veja `public/banners/README.md`.
- **Fotos das frutas:** veja `public/frutiferas/README.md`.

## SEO

- `generateMetadata` dinâmico em todas as páginas.
- Open Graph e Twitter Cards por frutífera.
- JSON-LD: Organization, WebSite, Product/Offer, BreadcrumbList, VideoObject, Article.
- `sitemap.xml` e `robots.txt` automáticos.

## Aviso

Este é um site de afiliados. Consulte `/aviso-de-afiliados`.
