# LOG DE EXECUÇÃO — Frutíferas Orgânicas

> Atualizado a cada etapa. Em caso de queda de energia, retomar pela primeira tarefa `[ ]`.

## Estado atual
- Site Next.js 14 + TS + Tailwind em `D:\SITE FRUTÍFERAS ORGÂNICAS`
- 102 frutíferas no catálogo (10 manuais + 92 do acervo TOP 100)
- Repo: https://github.com/washingtonfrade7-prog/frutiferas-organicas-site (branch `main`)
- Último commit conhecido: `dbac269`

## Fila de tarefas

### FASE A — Correção de identificação (espécies)
- [x] A1. Criar registro de espécies (`ferramentas/auditoria/especies.json`)
- [x] A2. Desambiguar famílias com nomes repetidos (limão, laranja, araçá, pitanga, uva, amora, goiaba, pitaya, jabuticaba, grumixama, manga, ameixa, cabeludinha...)
- [x] A3. Pesquisar no canal + web nome científico e características distintas
- [x] A4. Gerar textos de "como diferenciar" por variedade
- [x] A5. Regenerar catálogo com dados corretos (91 geradas + 10 manuais = 101)
- Correções-chave: limão cravo = *Citrus × limonia*; galego = *C. × aurantifolia*; caviar = *C. australasica*; tanjo = *C. limettioides*; kinkan = *C. japonica*; jabuticaba branca = *Plinia aureana*; cambuí roxo = *Eugenia candolleana*; groselha = *Phyllanthus acidus*; cabeludinha roxa/peludinha = mesma espécie (mesclada)

### FASE B — Páginas de ensino (conteúdo + vídeos)
- [x] B1. Adubação
- [x] B2. Poda
- [x] B3. Como plantar
- [x] B4. Colheita
- [x] B5. Tour pelo pomar
- [x] B6. Texto explicativo das espécies (leitura) + vídeos
- 8 guias em `/guias/[slug]`: plantio, adubacao, poda, colheita, tour, cuidados, floracao, gastronomia (texto + passo a passo + dicas + erros + FAQ + vídeos)

### FASE C — Estilo / UX (referências de grandes sites)
- [x] C1. Navegação e breadcrumbs
- [x] C2. Cards e detalhes (galeria, badges, CTA afiliado)
- [x] C3. Links internos guias <-> frutíferas (SEO/descoberta)
- [ ] C4. Revisão fina de acessibilidade e Lighthouse

### FASE D — Monetização
- [x] D1. Google AdSense (script + slots + env `NEXT_PUBLIC_ADSENSE_CLIENT`/`_SLOT`)
- [x] D2. `ads.txt` e política de privacidade com seção de publicidade
- [x] D3. CTA de afiliados e banners
- [x] D5. **Ezoic pronto** (script unificado + placeholders 101-105; ativar com `NEXT_PUBLIC_EZOIC=1`, tem prioridade sobre o AdSense)
- [ ] D4. Ativar AdSense/Ezoic após aprovação (inserir o client ID / habilitar Ezoic)

### FASE E — SEO / Performance / Deploy
- [x] E1. Sitemap/robots/JSON-LD atualizados (inclui guias)
- [x] E2. Auditoria funcional + teste de carga (3 rodadas, 3.100 requisições, 0 erros)
- [x] E3. **Conversão para export estático** (`output: 'export'`) — catálogo com filtro no cliente
- [x] E4. `.htaccess` (URLs limpas, 404, cache, compressão) + pacote `frutiferas-site.zip`
- [x] E5. Domínio configurado: `https://frutiferasorganicas.com.br`
- [x] E6. Upload do pacote para a Hostinger (public_html) — 582 arquivos via FTP
- [x] E7. **AdSense ativado** (client `ca-pub-8236074301379246`, slot `6872562467`) — script + meta + slot no ar
- [x] E8. HTTPS confirmado (certificado ativo)
- [x] E9. Auditoria no domínio ao vivo: 122 páginas, 288 imagens, 0 erros
- [x] E11. **Google Analytics (GA4)** ativado (`G-8G7HQFV303`) — gtag no ar em todas as páginas
- [x] E12. **Ezoic ativado em paralelo** (`NEXT_PUBLIC_EZOIC=1`) — script `g.ezoic.net` + placeholders (AdSense segue como primário nos slots)
- [x] E13. **Deploy automático** (`.github/workflows/deploy.yml`) — build + FTP a cada push na `main`
- [x] E14. Auditoria do canal reexecutada + catálogo atualizado para **106 frutíferas** (novas: Sapoti, Lichia, Caju, Melancia, Morango)
- [x] E15. Novo pacote publicado (597 arquivos) e auditoria no ar: 127 páginas, 0 erros
- [x] E16. **Correção das imagens**: prioriza o frame do vídeo "TOP 100" (correto por espécie); cards para os frames ruins; thumbnails revisadas para extras (lichia/caju/melancia/sapoti/morango)
- [x] E17. **Galeria revisada**: mantém apenas o card informativo (sempre correto) em todas as frutíferas, incluindo as 10 manuais; 94 imagens ruins removidas
- [x] E18. **48 capas corrigidas**: lista enviada pelo usuário (flores/ilustrações/assunto errado) substituída por fotos reais do fruto via Wikimedia Commons/Wikipédia (licença livre) — scripts `17_avaliar_capas.py` a `21_refinar_capas.py`; página `/creditos` com atribuição das fontes
- [x] E19. **15 capas finais com frames dos vídeos do canal**: uvaia, uva-brs-vitória, uva-isabel, saborosa-pitaya, pitanga-do-cerrado, manga-ubá, jambo-rosa, jabuticaba-sabará e limão-cravo (frames limpos extraídos com ffmpeg, `22` a `25_*.py`); romã, rambutã, pinha, pinha-dos-astecas, limão-imperial e longan sem fruto no vídeo → imagem livre do fruto
- [x] E20. **8 capas re-corrigidas com frames de colheita/degustação** (vídeos certos identificados por título): jambo-rosa (fruto rosado), jabuticaba-sabará (bem iluminada), bacupari-mirim, amora-portuguesa, araçá-roxo, cajá-manga-anão, goiaba-amarela (polpa amarela) e laranja-champagne — scripts `26_frames2.py` e `27_aplicar_frames2.py`; créditos limpos (essas agora são do canal)
- [x] E21. **Correção de cache de imagens**: as imagens de `/frutiferas/` eram servidas com `max-age=180 dias`, então trocar a foto não mudava nada no navegador. Adicionado selo de versão `imgUrl()` (`?v=ASSET_VERSION` em `src/lib/site.ts`) aplicado em cards, hero, galeria e "outras frutíferas". Longan também trocado por foto nítida do fruto
- [x] E22. **Módulo comercial de monetização** (foco afiliados + conteúdo comercial):
  - Rotas novas: `/comprar` (hub), `/comprar/[categoria]` (8 categorias), `/melhores` (índice) e `/melhores/[slug]` (5 guias de compra piloto)
  - Dados: `src/data/afiliados.ts` (lojas + `LISTA_MERCADO_LIVRE`), `src/data/produtos.ts` (18 produtos + 8 categorias), `src/data/melhores.ts` (5 artigos com seções e FAQ)
  - Componentes: `BotaoAfiliado.tsx` (client, `rel="sponsored"`, evento GA4 `clique_afiliado` com loja/categoria/pagina/posicao) e `TabelaComparativa.tsx`
  - SEO: JSON-LD `ItemList`, `Product`, `FAQPage`, `Article`; sitemap e rodapé atualizados
  - Pendente: links de produto individuais do Mercado Livre (hoje todos usam a lista `mercadolivre.com/sec/2QD39UP`)
- [x] E23. **Fase 3 — páginas "onde comprar muda de X"** (106 páginas):
  - Rota `/mudas` (hub, agrupado por categoria) e `/mudas/[slug]` (uma por frutífera)
  - Conteúdo gerado a partir dos dados da espécie (`src/lib/mudas.ts`): intro, faixa de preço, como escolher a muda, cuidados (luz/rega/solo/vaso) e FAQ (produz em vaso? tempo até produzir? sol? vaso?)
  - SEO: JSON-LD `FAQPage` + breadcrumb; link "onde comprar muda" na ficha de cada frutífera; sitemap e rodapé atualizados
  - Auditoria: 250 páginas, 0 erros
- [x] E24. **Fase 4 (parte 1) — landing do produto + captura de newsletter**:
  - Rota `/curso`: landing "Frutíferas em Vaso: do plantio à colheita" com 8 módulos, para quem é, o que inclui, FAQ e CTA de lista de espera
  - `src/data/produto.ts` (conteúdo do produto), `src/components/NewsletterForm.tsx` (client; POST para `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` ou fallback por e-mail; evento GA4 `newsletter_signup`) e `NewsletterCTA.tsx`
  - Captura inserida na home, `/guias` e `/comprar`; link no rodapé e no sitemap
  - SEO: JSON-LD `Course` + `FAQPage` + breadcrumb
  - Pendente: criar o e-book/videoaulas e plugar o endpoint real (Brevo/Mailchimp/Formspree)
- [x] E25. **Roteiro de produção do produto** (`CURSO-ROTEIRO.md`): estrutura do e-book (8 capítulos + glossário + bônus), roteiro capítulo a capítulo (tópicos, vídeos do canal, exercícios e falas-chave), plano das 8 videoaulas, produção, publicação na Hotmart/Kiwify, cronograma e checklist de lançamento
- [x] E26. **Manuscrito do e-book** (`CURSO-EBOOK.md`): texto completo dos 8 capítulos, introdução, sobre o autor, glossário e checklist final — pronto para revisão, diagramação em PDF e gravação das videoaulas
- [x] E27. **Bônus + PDFs do produto** (`ferramentas/curso/gerar.py`):
  - `CURSO-BONUS.md`: checklist de rega/adubação/inspeção + 12 fichas rápidas de cultivo (geradas dos dados do site)
  - PDFs gerados com markdown + Microsoft Edge headless: `ferramentas/curso/out/Frutiferas-em-Vaso-ebook.pdf` e `...-bonus.pdf` (capa + CSS de impressão, capítulos com quebra de página)
  - Regerar a qualquer momento: `python ferramentas/curso/gerar.py`
- [x] E28. **Integração de newsletter com o Brevo**:
  - `public/newsletter.php` (endpoint no próprio domínio): valida e-mail, cadastra o contato no Brevo via API v3 e responde JSON
  - `public/_brevo-key.php` (não versionado, no `.gitignore`): guarda a API key e o ID da lista
  - `NewsletterForm` agora envia para `/newsletter.php` (fallback por e-mail se a integração ainda não estiver configurada)
  - Testado no ar: e-mail inválido → 400, GET → 405. Falta apenas colar a API key + ID da lista
- [x] E29. **E-mail de boas-vindas** (`CURSO-EMAIL-BOAS-VINDAS.md`): sequência de 3 e-mails (boas-vindas, valor, lançamento), assuntos/preheader, versão texto e **versão HTML pronta** para colar no Brevo, além do passo a passo de configuração da automação
- [x] E30. **Mega auditoria + correções** (navegador, HTTP e carga):
  - Ferramentas: `audit_site.mjs` (crawl), `load_test.mjs` (carga) e **novo `browser_audit.mjs`** (puppeteer-core + Edge): erros de console/rede, overflow, filtro de `/frutiferas`, menu mobile, dropdown, vídeo-lite, FAQ e formulário. Scripts `npm run audit|loadtest|browser-audit`
  - Resultados: **251 páginas, 0 erros/avisos**; carga **600 req / 30 usuários, 0 erros, 45 ms**; interações todas OK
  - **Bugs corrigidos:**
    1. **AdSense nunca carregava** — o `<Script>` tinha `crossOrigin="anonymous"` e o AdSense não envia cabeçalhos CORS (script bloqueado). Atributo removido
    2. **269 iframes do YouTube** na página `/videos` (pesadíssimo) — criado `VideoEmbed.tsx` (miniatura + clique para carregar). Agora: **0 iframes** até o clique
    3. **Ezoic ligado sem integração** gerava erros de CORS — desativado no `.env.local`
    4. **Dropdown "Categorias"** do header só abria no hover (inacessível em touch) — agora abre por clique, com `aria-expanded`
    5. **Vídeos trocados do Abacaxi** (mostrava "laranja abacaxi") — dados corrigidos e importador ajustado para não casar nomes compostos
  - Novos links no menu (Onde comprar, Curso)
- [x] E31. **Captura de newsletter blindada**: o Brevo suspendeu a conta (conformidade), então `newsletter.php` agora **salva TODO contato em `newsletter-lista.csv` no servidor** (fora do `public_html`) além de tentar o Brevo. Testado no ar: `{"ok":true,"local":true}`. Nenhum e-mail se perde enquanto a conta não é liberada; depois basta exportar/importar no Brevo
- [x] E32. **E-mail de contato do domínio**: trocado `frutiferasorganicas@gmail.com` por `contato@frutiferasorganicas.com.br` (site.ts, `.env.local`, `.env.example`) — ajuda na conformidade/entregabilidade do Brevo. Adicionado aviso de consentimento no formulário de newsletter
- [x] E33. **Endpoint com suporte a Brevo E MailerLite**: `newsletter.php` agora lê `public/_newsletter-config.php` (não versionado) com `provider` (`brevo` ou `mailerlite`), `api_key` e `list_id`. Sempre salva no CSV local; tenta o provedor em paralelo. Alternativa ao Brevo (conta suspensa por conformidade)
- [x] E34. **MailerLite conectado e testado** ✅: configurado `provider=mailerlite` + grupo `Lista de espera - Curso` (ID `199353375184127184`). Inscrição de teste no site retornou `{"ok":true,"local":true,"provedor":true,"status":201}` e o contato apareceu no grupo com **status `active`**. Teste removido depois. **A captura de newsletter está 100% funcional** (site → CSV no servidor + MailerLite)
- [x] E35. **Links de produto do Mercado Livre** (5 produtos): montados a partir da identificação de afiliado extraída do link da lista — `matt_word=washingtonfrade` + `matt_tool=42700408`. Centralizados em `LINKS_MERCADO_LIVRE` (`src/data/afiliados.ts`) com o helper `linkMLProduto()`. Produtos: vaso 90L, vaso autoirrigável, substrato 25kg, bokashi 1kg e tesoura de poda. O hub `/comprar` mantém a **lista** (rede de segurança). ⚠️ Verificar no painel do ML se os cliques estão sendo registrados
- [x] E36. **Rastreamento confirmado** ✅: o painel do Mercado Livre registrou **1 clique** nos últimos 7 dias, comprovando que os links montados (`matt_word`/`matt_tool`) são atribuídos corretamente. Adicionados mais 3 produtos com link direto: **vaso 30L Rattan**, **húmus de minhoca** e **tesourão de poda** (total: 8 produtos com link direto; os demais usam a lista rastreada)
- [x] E37. **Mega auditoria + melhorias gerais**:
  - Ferramenta nova: `a11y_audit.mjs` (axe-core/WCAG 2.1 AA) e script `npm run a11y`
  - **Acessibilidade**: 0 violações em 12 páginas-chave (corrigido contraste do texto de consentimento no fundo escuro do `/curso`; `NewsletterForm` ganhou a prop `escuro`)
  - **Acessibilidade/UX**: adicionado **skip link** "Pular para o conteúdo" (`<main id="conteudo">`)
  - **Performance**: `preconnect`/`dns-prefetch` para `i.ytimg.com`, `youtube-nocookie`, AdSense e GA
  - **Segurança**: headers `Strict-Transport-Security`, `X-Frame-Options`, `Permissions-Policy` + `Cache-Control` de 10 min para HTML
  - **SEO**: FAQ nas **fichas de frutíferas** (JSON-LD `FAQPage` + seção visível) e cross-links para `/comprar/*`
  - **UX**: página 404 melhorada com atalhos para os hubs
  - Resultados finais: 251 páginas/0 erros · carga 600 req/30 usuários em 40 ms/0 erros · a11y 0 violações · navegador sem erros próprios
- [x] E38. **Fase 2 de conteúdo + infraestrutura** (autônomo):
  - **+6 artigos comerciais**: vasos autoirrigáveis, substratos, adubos líquidos, kits de jardinagem, melhores mudas de jabuticaba, como escolher muda de citros (total: **11 artigos**)
  - **+6 produtos** no catálogo (mudas de jabuticaba/acerola/citros, vaso autoirrigável grande, adubo líquido, serra de poda)
  - **+2 guias informacionais**: "Problemas comuns das frutíferas em vaso" e "Como escolher a frutífera para o seu espaço" (total: **10 guias**)
  - **JSON-LD `HowTo` + `FAQPage`** nos guias (rich results) e cross-links `/mudas` → `/comprar`
  - **Upload FTP resiliente**: manifesto local (pula arquivos inalterados) + retry com backoff e circuit breaker
  - Auditoria final no ar: **259 páginas, 0 erros** · carga **600 req/30 usuários em 28 ms** · **a11y 0 violações** · navegador OK
- [x] E39. **Auditoria de indexação/SEO + correção crítica**:
  - **BUG CORRIGIDO**: o catálogo `/frutiferas` estava atrás de `useSearchParams` + `Suspense`, então o HTML estático trazia apenas "Carregando..." e **nenhuma frutífera** (0 links). Removido o `useSearchParams`; os filtros agora leem a URL após a hidratação (`useEffect` + `popstate`). O HTML agora traz **as 106 frutíferas** (106 links) — indexável
  - **JSON-LD**: `datePublished`/`dateModified` nos artigos; `Product` dentro do `ItemList` nas categorias de compra; `logo` na Organization
  - **SSG x SSR**: o site usa Static Site Generation (`output: 'export'`), que entrega HTML completo no build — **equivalente/melhor que SSR para SEO** (crawler recebe tudo sem JS, e é mais rápido). Não é necessária migração para SSR
  - Verificado no ar: `/frutiferas` com 106 links, sem "Carregando"
- [x] E40. **WebP + Search Console**:
  - **Imagens convertidas para WebP**: 210 arquivos, **13,05 MB → 8,75 MB (−32,9%)**; referências atualizadas (frutiferas, banners, logo) e JPGs antigos removidos do servidor (`scripts/limpar-jpg.mjs`). OG image mantida em JPG
  - **Google Search Console**: suporte a `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` no `layout.tsx`; meta tag `google-site-verification` publicada e verificada no ar (token do usuário). Sitemap acessível (258 URLs)
- [x] E41. **Painel de administração local** (`npm run painel` → http://localhost:5050):
  - **Artigos**: criar, editar e excluir os guias de compra (agora em `content/artigos.json`, lido por `melhores.ts`)
  - **Frutíferas**: editar resumo/descrição/dicas das 96 espécies (grava em `frutiferas-extras.ts`)
  - **Fotos**: upload de imagem → recorte 16:9 + 800x450 + **WebP** automático (`painel/otimizar.py`, usa o Python do projeto)
  - **Publicar**: roda build + envio FTP com log ao vivo (credenciais em `painel/ftp.json`, não versionado)
  - Testado de ponta a ponta: gravação, upload e **publicação OK** ("PUBLICADO COM SUCESSO!")
- [x] E42. **CMS remoto (`/admin`) — editar de qualquer lugar**:
  - **Decap CMS** instalado em `public/admin/` (index.html + config.yml) → acessível em `https://frutiferasorganicas.com.br/admin/` (celular também)
  - Coleção de **Artigos** editando `content/artigos.json` (mesmo arquivo do painel local)
  - **OAuth próprio em PHP** no domínio (`public/admin/oauth/auth.php` + `callback.php`), sem serviço externo; credenciais em `public/admin/_oauth-config.php` (não versionado)
  - **Correções de `.htaccess`**: exclusão de `/admin` da remoção de barra final + `DirectorySlash Off` (resolvia um loop de redirecionamento)
  - Pendente: usuário criar o **GitHub OAuth App** e preencher o `_oauth-config.php`
  - ⚠️ A CDN da Hostinger guardou em cache o 301 antigo de `/admin/`; usar `/admin/index.html` ou limpar o cache no hPanel
- [x] E43. **CMS remoto FUNCIONANDO** ✅ (`https://frutiferasorganicas.com.br/cms`):
  - Bugs resolvidos: `/admin` em loop (CDN) → caminho `/cms`; `auth_endpoint` sem `.php` → 404; `config.yml` como `text/plain` → `AddType text/yaml`; **`base_url` precisa ser a origem** (o Decap compara `r.origin === base_url`); **script do Decap hospedado localmente** (`/admin/decap-cms.js`) porque o *Tracking Prevention* do navegador bloqueava o storage de script de terceiros; **callback grava o login direto no `localStorage` do painel** (`decap-cms-user` com `backendName: github`) e recarrega
  - Resultado: login pelo GitHub → painel abre com **Conteúdo → Guias de compra (artigos)** (11 artigos), criar/editar e **Publish**
- [ ] E10. Aguardar aprovação do AdSense (análise do Google)

### Deploy automático (GitHub Actions) — CONFIGURADO
- Secrets adicionados no repositório: `FTP_HOST`, `FTP_USER`, `FTP_PASS`
- A cada `git push` na `main` (ou disparo manual) o workflow publica sozinho no ar
- Testado com sucesso (workflow run `35744956172`) em **3min17s** (upload com 10 paralelos)
- Repositório: https://github.com/washingtonfrade7-prog/frutiferas-organicas-site/actions

### Ezoic
- Conta Ezoic deve ser criada em ezoic.com e o site adicionado para os anúncios começarem a preencher.
- Código pronto: script + placeholders 101-105.

### Deploy — feito
- Host FTP: `89.117.7.170` · usuário `u813221921` · pasta `/domains/frutiferasorganicas.com.br/public_html`
- 582 arquivos enviados (`scripts/upload-ftp.mjs`, com `-g` para caminhos com `[slug]`)
- `default.php` removido; `.htaccess` corrigido (prioriza `.html` antes de diretórios → resolve `/frutiferas` e `/guias`)
- Testes HTTP (Host header): `/`, `/frutiferas`, `/guias`, `/videos`, `/frutiferas/jabuticaba`, `/guias/adubacao`, `/categorias/nativas` → **200**; inexistente → **404**
- Domínio resolve (A: 89.116.213.4 / 77.37.42.3); **SSL ainda instalando**

## Deploy Hostinger (plano Unlimited)
1. hPanel → **Gerenciador de Arquivos** → entrar em `public_html`
2. Apagar o arquivo padrão (`default.php` / `index.html` de exemplo)
3. Enviar **`frutiferas-site.zip`** e **extrair** na `public_html` (o `.htaccess` incluso)
4. Em **Domínios**, apontar `frutiferasorganicas.com.br` para a hospedagem
5. Ativar **SSL grátis** (Let's Encrypt) no hPanel
6. Testar: home, `/frutiferas`, uma fruta, um guia, `/sitemap.xml`

Reconstruir o pacote após mudanças:
```
npm run build
# zipar a pasta out/ (incluindo .htaccess) para public_html
```

## Auditoria de qualidade (3 rodadas)

Ferramentas: `ferramentas/auditoria/audit_site.mjs` e `load_test.mjs`.

| Rodada | Páginas | Imagens | Erros | Carga | Concorrência | p95 |
|---|---|---|---|---|---|---|
| 1 | 122 | 288 | 0 | 600 req | 30 | 66 ms |
| 2 | 122 | 288 | 0 | 1000 req | 50 | 118 ms |
| 3 | 122 | 288 | 0 | 1500 req | 80 | 184 ms |

- Títulos únicos, sem `<img>` sem alt, sem `<a>` aninhado, sem IDs duplicados.
- 404 correto; robots, sitemap, ads.txt, favicons e OG respondendo 200.
- Total: 3.100 requisições simultâneas simuladas, **0 falhas**.

## Histórico
- (ver commits do repositório)

## Produto (Hotmart) — 2026-09
- Produto criado no Hotmart: **Cultivo de Frutíferas Orgânicas em Vasos: Guia Completo**, R$ 47,00.
- Nome do produto no site alinhado ao do Hotmart (`src/data/produto.ts`).
- Página `/curso`: preço (de ~~R$ 97~~ por **R$ 47**) + botão "Quero começar agora".
  O botão só aparece quando `NEXT_PUBLIC_CHECKOUT_URL` estiver definido; sem ele, mostra a lista de espera.
- JSON-LD do curso passa a `Offer` com `Paid`/`InStock` e preço quando há checkout.
- E-book expandido de 14 para **53 páginas**:
  - `CURSO-EBOOK.md`: 10 capítulos + 5 apêndices (calendário anual, diagnóstico rápido, 10 erros, glossário, checklist de 90 dias).
  - Catálogo de **105 frutíferas** gerado automaticamente (`ferramentas/curso/extrair_frutiferas.mjs` → `frutiferas.json` → `gerar.py`).
  - Nomes corrigidos (acentos/formatacão), placeholders e textos genéricos removidos, 53 resumos reescritos.
- Bônus: 7 páginas (checklist de rega/adubação + 11 fichas de bolso).
- Gerar novamente:
  ```
  node ferramentas/curso/extrair_frutiferas.mjs
  .venv\Scripts\python.exe -X utf8 ferramentas\curso\gerar.py
  ```
- Pendente: subir os PDFs no Hotmart e informar o link de checkout para ativar o botão.

## Produto — rodada de melhorias (v2)
Pesquisa com fontes: NBR 6120 (sobrecarga de sacadas residenciais = 2,5 kN/m² ≈ 250 kg/m²), densidade
de substrato úmido (~0,9–1,2 kg/L; fibra de coco ~0,2 kg/L), boas práticas de Order Bump/Upsell da Hotmart.

- **E-book: 53 → 65 páginas**
  - Novo alerta de peso para sacadas/varandas, com contas e NBR 6120 + mix leve de substrato
  - Receita de substrato apresentada como gráfico (barra 50/30/20 + legenda)
  - **14 QR codes** (guias `/guias/*` + vídeos) e **96 links clicáveis** para o canal
  - Catálogo com ícones (☀ sol, ◐ meia-sombra, 💧 rega) e link ▶ de vídeo por espécie
  - Índice "Comece por aqui" por situação do cliente (primeira frutífera, colheita rápida, sol forte,
    meia-sombra, pouco espaço, nativas raras, **varandas com vento**)
- **Bônus → Workbook do Aluno: 7 → 12 páginas** (plano de vaso, diário de 13 semanas, registro
  fotográfico com molduras, checklists, calendário de adubação, fichas de bolso)
- **Página `/curso`**: bloco "A regra de ouro" (morre de excesso), FAQ de apartamento com o alerta de
  peso, lista "o que está incluso" atualizada
- Novos scripts: `ferramentas/curso/gerar_qrcodes.py` (segno, rodar com `py`), QR em `ferramentas/curso/qrcodes/`
- Ordem de geração:
  ```
  node ferramentas/curso/extrair_frutiferas.mjs
  py ferramentas/curso/gerar_qrcodes.py
  .venv\Scripts\python.exe -X utf8 ferramentas\curso\gerar.py
  ```

### Esteira comercial sugerida (Hotmart)- **Order bump** (checkout, 1 clique): mini-curso "Adubação Orgânica Descomplicada" por **R$ 9,90**
  (faixa recomendada: 10–25% do produto principal). Order bumps elevam o faturamento em ~30%.
- **Upsell** (pós-compra, 1 clique): **Módulo Imersivo de Multiplicação** (estaquia, alporque e enxertia)
  ou **Comunidade VIP** por **R$ 67** (referência: 15–30% acima do produto principal; aceitação saudável 3–8%).
- Taxa Hotmart atualizada: **9,9% + R$ 2,49** por venda.

## Produto — esteira comercial (v3)
Dois materiais novos, escritos e gerados em PDF, para a esteira de vendas:

- **Order bump** — `CURSO-BUMP.md` → `Adubacao-Organica-Descomplicada.pdf` (**17 páginas**), R$ 9,90
  (de R$ 27). Conteúdo: N-P-K, matérias-primas, chá de húmus (24-48 h), bokashi sem erro, calendário
  por fase, aplicação sem queimar, diagnóstico por folha, adubação por espécie, FAQ e checklist.
- **Upsell** — `CURSO-UPSELL.md` → `Multiplicacao-de-Mudas-na-Pratica.pdf` (**18 páginas**), R$ 67
  (de R$ 97). Conteúdo: estaquia + hormônios caseiros, alporque passo a passo, enxertia (garfagem,
  borbulhia, encostia), sementes, transplante, método por espécie, 12 erros, FAQ e checklist.
- **Página de oferta no e-book**, logo após o Cap 10 (multiplicação): seção "Quer ir mais fundo?" com
  os dois blocos (`<!-- OFERTAS -->`), preço ancorado, bullets e QR code de cada oferta.
  O e-book passou de 65 para **67 páginas**.
- Novos QR codes: `oferta-bump` e `oferta-upsell` (apontam para `/curso` até os links do Hotmart existirem).
- Preços e textos das ofertas ficam em `OFERTAS` (em `gerar.py`) — trocar o link do Hotmart é editar
  `gerar_qrcodes.py` e rodar de novo.

Saída completa em `ferramentas/curso/out/`:
| Arquivo | Páginas | Papel |
|---|---|---|
| `Frutiferas-em-Vaso-ebook.pdf` | 67 | produto principal |
| `Frutiferas-em-Vaso-bonus.pdf` | 12 | workbook do aluno |
| `Adubacao-Organica-Descomplicada.pdf` | 17 | order bump (R$ 9,90) |
| `Multiplicacao-de-Mudas-na-Pratica.pdf` | 18 | upsell (R$ 67) |



