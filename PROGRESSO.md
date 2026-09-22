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
