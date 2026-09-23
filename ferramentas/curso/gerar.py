# -*- coding: utf-8 -*-
"""Gera os PDFs do produto a partir dos markdowns:
   - CURSO-EBOOK.md  -> Frutiferas-em-Vaso-ebook.pdf
       (o placeholder <!-- CATALOGO --> e substituido pelas fichas)
   - CURSO-BONUS.md  -> Frutiferas-em-Vaso-bonus.pdf  (checklist + fichas)

Converte markdown -> HTML (com CSS de impressao) e usa o Microsoft Edge em
modo headless para imprimir em PDF.

Antes de rodar, atualize o JSON das frutiferas:
   node ferramentas/curso/extrair_frutiferas.mjs
"""
import base64
import io
import json
import os
import re
import subprocess
import sys

import markdown

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "auditoria"))
import config  # noqa: E402

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
CURSO_DIR = os.path.join(config.SITE_DIR, "ferramentas", "curso")
OUT_DIR = os.path.join(CURSO_DIR, "out")
os.makedirs(OUT_DIR, exist_ok=True)

NOME_PRODUTO = "Cultivo de Frutíferas Orgânicas em Vasos"

# --- Correcoes de dados -------------------------------------------------------
# Nomes de exibicao corrigidos (acentos e formatacao).
NOMES = {
    "Ajuru preto branco": "Ajuru Preto Branco",
    "Ameixa Japao": "Ameixa Japão",
    "Ameixa vermelha": "Ameixa Vermelha",
    "Ananas do mato": "Ananás do Mato",
    "Araca Amarelo": "Araçá Amarelo",
    "Araca Pera": "Araçá Pera",
    "Araca Roxo": "Araçá Roxo",
    "Bacupari de bico": "Bacupari de Bico",
    "Banana ouro": "Banana Ouro",
    "Biriba": "Biribá",
    "Cabeludinha roxa": "Cabeludinha Roxa",
    "Cagaita": "Cagaitá",
    "Caja manga Anao": "Cajá-Manga Anão",
    "Cambuca Jabuticaba amarela": "Cambucá (Jabuticaba Amarela)",
    "Cambui Roxo": "Cambuí Roxo",
    "Cupuacu": "Cupuaçu",
    "Dovyalis doce campari": "Dovyalis Doce (Campari)",
    "Grumixama preta": "Grumixama Preta",
    "Inga de flores roseas": "Ingá de Flores Rosas",
    "Jabuticaba Sabara": "Jabuticaba Sabará",
    "Jabuticaba hibrida": "Jabuticaba Híbrida",
    "Laranja Serra Dagua": "Laranja Serra d'Água",
    "Laranja abacaxi": "Laranja Abacaxi",
    "Laranja kinkan": "Laranja Kinkan",
    "Limao Cravo caipira": "Limão Cravo Caipira",
    "Limao Galeguinho": "Limão Galeguinho",
    "Limao Imperial": "Limão Imperial",
    "Limao Siciliano": "Limão Siciliano",
    "Limao caviar": "Limão Caviar",
    "Limao doce Tanjo": "Limão Doce Tanjo",
    "Maca Eva": "Maçã Eva",
    "Mamao": "Mamão",
    "Manga uba": "Manga Ubá",
    "Mangostao fruta da rainha": "Mangostão (Fruta da Rainha)",
    "Maracuja Gigante": "Maracujá Gigante",
    "Melao Andino": "Melão Andino",
    "Mirtilo Blueberry": "Mirtilo (Blueberry)",
    "Pera Dagua": "Pera d'Água",
    "Pessego Anao": "Pêssego Anão",
    "Pinha dos astecas": "Pinha dos Astecas",
    "Pitanga do cerrado": "Pitanga do Cerrado",
    "Pitaya amarela": "Pitaya Amarela",
    "Pitaya vermelha": "Pitaya Vermelha",
    "Rambuta": "Rambutã",
    "Roma": "Romã",
    "Saborosa Pytaya do serrado": "Saborosa (Pitaya do Cerrado)",
    "Tamarilho Tomate de arvore": "Tamarilho (Tomate de Árvore)",
    "Ubajai Pessego do mato": "Ubaia (Pêssego do Mato)",
    "Uva BRS Vitoria": "Uva BRS Vitória",
}

# Nomes cientificos faltantes.
CIENTIFICO = {
    "Cambuca Jabuticaba amarela": "Plinia aureana",
    "Mangostao fruta da rainha": "Garcinia mangostana",
    "Tamarilho Tomate de arvore": "Solanum betaceum",
}

# Entradas duplicadas/incompletas que nao entram no catalogo.
DESCARTAR = {"Araca Boi fruta iogurte"}

# Tempo ate produzir e epoca de frutificacao (especies mais cultivadas).
PRODUCAO = {
    "Abacate": ("3 a 5 anos (muda enxertada)", "Floresce na primavera; frutifica no verão"),
    "Abacaxi": ("12 a 18 meses", "Uma safra por ano"),
    "Acerola Okinawa": ("1 a 2 anos", "Produz quase o ano todo"),
    "Ameixa Japao": ("3 a 4 anos", "Primavera e verão"),
    "Amora Portuguesa": ("1 ano", "Primavera"),
    "Amora Preta Tupy": ("1 ano", "Primavera e verão"),
    "Atemoia": ("3 a 4 anos", "Outono e inverno"),
    "Banana ouro": ("1 a 2 anos", "O ano todo, conforme o manejo"),
    "Cacau": ("3 a 5 anos", "O ano todo, com pico no verão"),
    "Caju": ("3 a 4 anos", "Inverno e primavera"),
    "Carambola Mel": ("2 a 3 anos", "Quase o ano todo"),
    "Cupuacu": ("4 a 5 anos", "Verão"),
    "Figo": ("2 a 3 anos", "Verão e outono"),
    "Framboesa Silvestre": ("1 a 2 anos", "Primavera e outono"),
    "Fruta do Milagre": ("2 a 3 anos", "Verão"),
    "Goiaba Amarela": ("2 a 3 anos", "Verão"),
    "Goiaba Paluma": ("2 a 3 anos", "Verão"),
    "Graviola": ("3 a 4 anos", "Verão"),
    "Jabuticaba": ("3 a 5 anos (enxertada)", "Floresce na primavera; frutifica no verão"),
    "Jabuticaba Branca": ("3 a 5 anos", "Verão"),
    "Jabuticaba Sabara": ("3 a 5 anos", "Verão"),
    "Jabuticaba hibrida": ("2 a 3 anos", "Primavera e verão"),
    "Laranja kinkan": ("1 a 2 anos", "Outono e inverno"),
    "Lichia": ("4 a 5 anos", "Verão"),
    "Limao Cravo caipira": ("2 a 3 anos", "O ano todo, com pico no inverno"),
    "Limao Galeguinho": ("2 a 3 anos", "Quase o ano todo"),
    "Limao Imperial": ("2 a 3 anos", "Quase o ano todo"),
    "Limao Siciliano": ("2 a 3 anos", "Quase o ano todo"),
    "Maca Eva": ("3 a 4 anos", "Verão"),
    "Mamao": ("8 a 12 meses", "O ano todo"),
    "Manga Palmer": ("3 a 5 anos (enxertada)", "Primavera e verão"),
    "Maracuja Gigante": ("6 a 12 meses", "Primavera e verão"),
    "Mirtilo Blueberry": ("2 a 3 anos", "Primavera e verão"),
    "Morango": ("3 a 4 meses", "Inverno e primavera"),
    "Nectarina": ("2 a 3 anos", "Verão"),
    "Pera Dagua": ("3 a 4 anos", "Verão"),
    "Pessego Anao": ("2 a 3 anos", "Primavera e verão"),
    "Pinha": ("3 a 4 anos", "Verão"),
    "Pitanga Preta": ("2 a 3 anos", "Quase o ano todo"),
    "Pitaya Branca": ("1 a 2 anos", "Verão"),
    "Pitaya amarela": ("2 a 3 anos", "Verão e outono"),
    "Pitaya vermelha": ("1 a 2 anos", "Verão"),
    "Roma": ("2 a 3 anos", "Verão e outono"),
    "Sapoti": ("3 a 5 anos", "Quase o ano todo"),
    "Seriguela": ("2 a 3 anos", "Verão"),
    "Uva BRS Vitoria": ("1 a 2 anos", "Verão e outono"),
    "Uva Isabel": ("2 a 3 anos", "Verão"),
    "Uva Goethe": ("2 a 3 anos", "Verão"),
}

PLACEHOLDER = "consulte os v"

# Resumos reais para as especies cujo texto de origem era generico.
RESUMOS = {
    "Abacate": "Fruta cremosa e rica em gorduras boas. Há variedades anãs e enxertadas que produzem em vaso grande, com sol e poda de controle.",
    "Abacaxi": "Ciclo curto e cultivo fácil: dá fruto em 12 a 18 meses e ainda rebrota depois da colheita. Ideal para vaso grande e sol pleno.",
    "Acerola Okinawa": "Uma das frutíferas mais generosas para vaso: rústica, produtiva e com altíssimo teor de vitamina C. Produz quase o ano todo.",
    "Ajuru preto branco": "Nativa de restinga e manguezal, com frutos doces de casca escura. Rústica e ótima para quem quer uma nativa pouco comum.",
    "Ananas do mato": "Bromélia nativa parecida com o abacaxi, mas de frutos menores e muito perfumados. Ornamental e comestível.",
    "Atemoia": "Híbrido de pinha com cherimoia, de polpa cremosa e adocicada. Precisa de sol e de polinização manual para produzir bem.",
    "Bacupari de bico": "Nativa de frutos amarelos e doces, com casca firme. Gosta de meia-sombra e de solo rico em matéria orgânica.",
    "Bacuri": "Fruta amazônica de aroma marcante e polpa cremosa, muito usada em doces. Exige calor e umidade.",
    "Banana ouro": "Banana de porte baixo e sabor intenso, que se adapta bem a vaso grande. Precisa de muita água e adubação constante.",
    "Biriba": "Parente da pinha, de frutos grandes e polpa agridoce. Precisa de espaço e sol para se desenvolver bem.",
    "Cacau": "A planta do chocolate, cultivável em vaso grande em clima quente e úmido. Gosta de meia-sombra.",
    "Caja manga Anao": "Parente da seriguela, de frutos ácidos e aromáticos, ótimos para sucos. Porte anão, ideal para vaso.",
    "Caju": "O cajueiro anão produz bem em vaso grande e gosta de sol pleno e calor. A castanha e o pedúnculo são os frutos.",
    "Cambuca Jabuticaba amarela": "Myrtaceae nativa de frutos amarelos e doces, parecidos com a jabuticaba. Rústica e ornamental.",
    "Cambui Roxo": "Nativa de porte pequeno, com frutinhas roxas doces e casca fina. Excelente para vaso pela rusticidade.",
    "Camu-Camu": "Famosa por ter uma das maiores concentrações de vitamina C do mundo. Frutos ácidos, ideais para sucos.",
    "Canistel": "Conhecida como fruta-ovo pela polpa amarela e cremosa, parecida com gema cozida. Doce e nutritiva.",
    "Carambola Mel": "Variedade de carambola doce, que dispensa o azedume. Árvore pequena e muito produtiva.",
    "Cidra": "Citros de casca grossa e aromática, usado em doces e licores. Árvore vigorosa que aceita bem o vaso.",
    "Cupuacu": "Fruta amazônica de polpa ácida e muito aromática, símbolo do Norte. Exige calor, umidade e solo fértil.",
    "Dovyalis doce campari": "Conhecida como groselha-do-cabo, dá frutos vermelhos e ácidos, ótimos para geleias e sucos.",
    "Estrela do Norte": "Frutífera de frutos doces e produtivos, com boa adaptação ao cultivo em vaso em regiões quentes.",
    "Figo": "Uma das frutíferas mais fáceis em vaso: cresce rápido, produz cedo e aceita poda forte. Sol pleno é essencial.",
    "Framboesa Silvestre": "Pequeno fruto de sabor intenso, que produz em hastes novas. Prefere clima ameno e solo bem drenado.",
    "Fruta do Milagre": "Famosa por transformar o azedo em doce na boca. Planta de porte pequeno, ótima para vaso em meia-sombra.",
    "Graviola": "Fruta grande e cremosa, muito usada em sucos e sorvetes. Precisa de calor, sol e polinização manual.",
    "Inga de flores roseas": "Nativa de vagens doces e flores vistosas, muito ornamental. Gosta de umidade e meia-sombra.",
    "Jambo Rosa": "Fruta crocante e levemente adocicada, com aroma suave. Árvore de porte médio, boa para vaso grande.",
    "Jambo Vermelho": "Também chamado de jambo-da-índia, de frutos vermelhos e polpa crocante. Gosta de calor e sol.",
    "Lichia": "Fruta chinesa de casca rosada e polpa doce e suculenta. Precisa de alguns anos e de frio leve para frutificar bem.",
    "Longan": "Parente da lichia, de frutos pequenos, doces e muito aromáticos. Adapta-se bem a vaso grande e sol pleno.",
    "Maca Eva": "Maçã de clima quente, que frutifica mesmo sem frio intenso. Precisa de sol e de poda de formação.",
    "Mamao": "Cresce rápido e produz em menos de um ano, mas exige vaso grande e muita água. Ótimo para quem tem pressa.",
    "Mana Cubiu": "Nativa amazônica de frutos alaranjados e ácidos, usados em sucos e molhos. Rústica e produtiva.",
    "Mandacaru": "Cacto do sertão que dá frutos doces e vistosos. Precisa de sol pleno, pouca água e solo muito drenado.",
    "Mangostao fruta da rainha": "Considerada uma das frutas mais finas do mundo. Exige clima quente e úmido e paciência: demora anos.",
    "Maracuja Gigante": "Trepadeira vigorosa de frutos grandes e polpa aromática. Precisa de tutor, sol e poda frequente.",
    "Melancia": "Apesar de rasteira e de ciclo curto, dá para cultivar em vaso grande com tutoramento. Exige muita água e sol.",
    "Mexerica Ponkan": "Tangerina fácil de descascar e muito doce. Citros que produz bem em vaso com sol pleno.",
    "Mirtilo Blueberry": "Frutinha azul rica em antioxidantes. Precisa de solo ácido e clima ameno — o pH é o ponto de atenção.",
    "Morango": "Dá frutos em poucos meses e ocupa pouco espaço, ideal para vasos e jardineiras. Gosta de sol e solo leve.",
    "Nectarina": "Pêssego de casca lisa e sabor marcante. Precisa de frio leve, sol e poda anual para produzir bem.",
    "Pera Dagua": "Pera de polpa suculenta e refrescante. Precisa de clima ameno e de outra variedade por perto para polinizar.",
    "Pessego Anao": "Variedade de porte pequeno, feita para vaso. Produz em poucos anos e fica linda na primavera florida.",
    "Pinha dos astecas": "Annona de polpa doce e cremosa, parente da pinha. Precisa de calor e de polinização manual.",
    "Rambuta": "Fruta asiática de casca peluda e polpa doce e suculenta. Exige clima quente e úmido.",
    "Roma": "Árvore pequena e ornamental, com frutos cheios de sementes doces e suculentas. Muito rústica em vaso.",
    "Saborosa Pytaya do serrado": "Cacto nativo de frutos doces e coloridos, parente da pitaya. Gosta de sol pleno e solo drenado.",
    "Sapoti": "Fruta de polpa marrom, doce e muito energética. Precisa de calor e de alguns anos para produzir.",
    "Seriguela": "Fruta vermelha de sabor agridoce, excelente para sucos e sorvetes. Rústica e produtiva em vaso.",
    "Tamarilho Tomate de arvore": "Fruta andina de sabor agridoce, usada em sucos e molhos. Gosta de clima ameno e meia-sombra.",
    "Uvaia": "Nativa de frutos amarelos e ácidos, com aroma intenso. Ótima para sucos, geleias e para atrair pássaros.",
}

RESUMO_GENERICO = re.compile(
    r"produz em vaso\.|Confira as dicas de cultivo|onde comprar mudas", re.I
)

CSS = """
@page { size: A4; margin: 20mm 18mm; }
* { box-sizing: border-box; }
body { font-family: Georgia, 'Times New Roman', serif; color: #222; line-height: 1.55; font-size: 12pt; }
h1 { font-size: 26pt; line-height: 1.15; margin: 0 0 10px; color: #1f3d2b; }
h2 { font-size: 18pt; margin: 28px 0 10px; color: #1f3d2b; page-break-before: always; border-bottom: 2px solid #d9a62e; padding-bottom: 6px; }
h3 { font-size: 14pt; margin: 22px 0 8px; color: #2e5b3a; page-break-after: avoid; }
h4 { font-size: 12.5pt; margin: 15px 0 3px; color: #1f3d2b; page-break-after: avoid; }
p { margin: 0 0 9px; }
ul, ol { margin: 0 0 11px; padding-left: 22px; }
li { margin-bottom: 3px; }
hr { border: none; border-top: 1px solid #ddd; margin: 22px 0; }
strong { color: #111; }
em { color: #444; }
blockquote { border-left: 4px solid #d9a62e; margin: 12px 0; padding: 4px 14px; color: #555; }
table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 10.5pt; }
th, td { border: 1px solid #ddd; padding: 5px 8px; text-align: left; }
th { background: #f3f3ee; }
.ficha { page-break-inside: avoid; }
.ficha h4 { margin-top: 13px; }
.receita { margin: 14px 0; page-break-inside: avoid; }
.receita .barra { display: flex; height: 32px; border-radius: 6px; overflow: hidden; }
.receita .seg { display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 10pt; }
.receita .s1 { background: #6b4f2a; }
.receita .s2 { background: #2e5b3a; }
.receita .s3 { background: #b98a2f; }
.receita .legenda { list-style: none; padding: 0; margin: 9px 0 0; font-size: 10.5pt; }
.receita .legenda li { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.receita .dot { width: 11px; height: 11px; border-radius: 50%; display: inline-block; flex: 0 0 auto; }
.receita .d1 { background: #6b4f2a; }
.receita .d2 { background: #2e5b3a; }
.receita .d3 { background: #b98a2f; }
.destaque { border: 2px solid #d9a62e; background: #fdf8ec; border-radius: 8px; padding: 10px 14px; margin: 14px 0; page-break-inside: avoid; font-size: 11pt; }
.qrbox { display: flex; align-items: center; gap: 14px; border: 1px solid #e3e3dc; background: #faf9f4; border-radius: 8px; padding: 10px 14px; margin: 12px 0; page-break-inside: avoid; }
.qrbox .qr { width: 76px; height: 76px; flex: 0 0 auto; }
.qrbox .qrtext { font-size: 10.5pt; line-height: 1.45; }
.qrbox .qrtext a { color: #1f3d2b; word-break: break-all; }
.fotos { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
.foto { border: 2px dashed #c9c9bd; border-radius: 8px; width: 48%; height: 58mm; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 6px; color: #8a8a7d; font-size: 10pt; page-break-inside: avoid; }
.diario { font-size: 10pt; }
.diario td { height: 26px; }
.oferta { border: 2px solid #2e5b3a; border-radius: 10px; padding: 14px 16px; margin: 16px 0; page-break-inside: avoid; }
.oferta .otag { font-size: 9pt; text-transform: uppercase; letter-spacing: 2px; color: #8f4c25; font-weight: bold; margin-bottom: 4px; }
.oferta h3 { margin: 0 0 6px; color: #1f3d2b; font-size: 15pt; page-break-after: avoid; }
.oferta ul { margin: 8px 0 10px; padding-left: 20px; font-size: 10.5pt; }
.oferta .oobs { font-size: 10pt; color: #8f4c25; font-style: italic; margin: 0 0 10px; }
.botao { display: inline-block; background: #2e5b3a; color: #fff !important; text-decoration: none; font-weight: bold; font-size: 11pt; padding: 9px 18px; border-radius: 22px; margin: 6px 0 12px; }
.botao .seta { margin-left: 8px; }
.qrurl { font-size: 10pt; color: #1f3d2b; word-break: break-all; }
.figura { margin: 14px 0; page-break-inside: avoid; text-align: center; }
.figura img { width: 100%; max-width: 150mm; border-radius: 8px; }
.figura figcaption { font-size: 9.5pt; color: #6b6559; margin-top: 5px; font-style: italic; }
.diagrama { display: block; width: 100%; max-width: 150mm; margin: 14px auto; page-break-inside: avoid; }
.diagrama text { font-family: Georgia, 'Times New Roman', serif; }
.diagrama .dt { font-size: 15px; font-weight: bold; fill: #1f3d2b; }
.diagrama .lb { font-size: 12px; fill: #2b2720; }
.diagrama .lg { font-size: 11px; fill: #6b6559; }
.cover { height: 250mm; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
.cover .tag { letter-spacing: 3px; text-transform: uppercase; font-size: 10pt; color: #8f4c25; margin-bottom: 18px; }
.cover h1 { font-size: 32pt; margin-bottom: 16px; }
.cover .sub { font-size: 13pt; color: #555; }
.cover .by { margin-top: 40px; font-size: 12pt; color: #333; }
"""

COVER = """
<div class="cover">
  <div class="tag">Frutíferas Orgânicas</div>
  <h1>{titulo}</h1>
  <div class="sub">{subtitulo}</div>
  <div class="by">por Washington Frade<br/>canal Frutíferas Orgânicas</div>
</div>
"""

# --- QR codes (pontes multimidia) ---------------------------------------------
QRS = {}
_caminho_qr = os.path.join(CURSO_DIR, "qrcodes.json")
if os.path.exists(_caminho_qr):
    QRS = json.load(open(_caminho_qr, encoding="utf-8"))

QR_RE = re.compile(r"<!--\s*QR:([a-z0-9-]+)\s*-->")

QR_HTML = (
    "<div class=\"qrbox\">"
    "<img class=\"qr\" src=\"{src}\" alt=\"QR code\"/>"
    "<div class=\"qrtext\"><strong>{rotulo}</strong><br/>"
    "Aponte a câmera do celular para o código:<br/>"
    "<span class=\"qrurl\">{curta}</span></div></div>"
)

# Botao clicavel: o leitor de PDF abre o link direto, sem QR e sem URL crua.
BOTAO_HTML = (
    "<a class=\"botao\" href=\"{url}\">{rotulo}"
    "<span class=\"seta\">&#8594;</span></a>"
)


def substituir_qr(texto, modo="botao"):
    """modo='botao' -> botoes clicaveis (tela). modo='qr' -> QR code (material impresso)."""
    def repl(m):
        info = QRS.get(m.group(1))
        if not info:
            return ""
        if modo == "qr":
            caminho = os.path.join(CURSO_DIR, info["arquivo"])
            if not os.path.exists(caminho):
                return ""
            b64 = base64.b64encode(open(caminho, "rb").read()).decode("ascii")
            return QR_HTML.format(
                src=f"data:image/png;base64,{b64}",
                rotulo=info["rotulo"],
                curta=info["url"].replace("https://", ""),
            )
        return BOTAO_HTML.format(url=info["url"], rotulo=info["rotulo"])

    return QR_RE.sub(repl, texto)


def icone_luz(luz):
    l = (luz or "").lower()
    if "pleno" in l and "meia" in l:
        return "☀◐"
    if "pleno" in l:
        return "☀"
    if "meia" in l or "sombra" in l:
        return "◐"
    return "☀"


# --- Ofertas complementares (order bump e upsell) -----------------------------
OFERTAS = [
    {
        "qr": "oferta-bump",
        "tag": "Order bump · oferta do checkout",
        "nome": "Adubação Orgânica Descomplicada",
        "de": "R$ 27",
        "por": "R$ 9,90",
        "pitch": (
            "O guia prático de adubação: as receitas caseiras (o chá de húmus de 24 a 48 h), o bokashi "
            "sem erro, o calendário por fase da planta e o diagnóstico do que a folha está dizendo."
        ),
        "itens": [
            "Adubo líquido caseiro passo a passo",
            "Calendário de adubação por fase",
            "Tabela de adubação por espécie",
            "Diagnóstico de deficiências",
        ],
    },
    {
        "qr": "oferta-upsell",
        "tag": "Upsell · oferta pós-compra",
        "nome": "Multiplicação de Mudas na Prática",
        "de": "R$ 97",
        "por": "R$ 67",
        "pitch": (
            "O módulo imersivo para você fazer suas próprias mudas: estaquia, alporque e enxertia, com o "
            "método certo para cada espécie — e nunca mais depender de comprar planta."
        ),
        "itens": [
            "Estaquia passo a passo + hormônios caseiros",
            "Alporque (o método da jabuticaba e dos citros)",
            "Enxertia: garfagem, borbulhia e encostia",
            "Tabela de método por espécie",
        ],
    },
]

OFERTAS_RE = re.compile(r"<!--\s*OFERTAS\s*-->")


def oferta_html(o):
    itens = "".join(f"<li>{i}</li>" for i in o["itens"])
    return (
        "<div class=\"oferta\">"
        f"<div class=\"otag\">{o['tag']}</div>"
        f"<h3>{o['nome']}</h3>"
        f"<p>{o['pitch']}</p>"
        f"<ul>{itens}</ul>"
        f"<p class=\"oobs\">Disponível como oferta especial dentro do seu Hotmart Club.</p>"
        f"<!-- QR:{o['qr']} -->"
        "</div>"
    )


def substituir_ofertas(texto):
    bloco = "\n\n".join(oferta_html(o) for o in OFERTAS)
    return OFERTAS_RE.sub(bloco, texto)


def link_video(f):
    vids = f.get("videos") or []
    if not vids:
        return ""
    v = vids[0]
    titulo = re.sub(r"[\[\]<>]", "", limpar_dica(v.get("titulo", "")) or v.get("titulo", ""))
    url = f"https://www.youtube.com/watch?v={v['id']}"
    return f"▶ **[Assistir no canal: {titulo}]({url})**"


# --- Figuras de abertura de capitulo (fotos do site) ---------------------------
IMG_RE = re.compile(r"<!--\s*IMG:([a-z0-9-]+)\s*\|\s*(.+?)\s*-->")

IMG_HTML = (
    "<figure class=\"figura\">"
    "<img src=\"{src}\" alt=\"{legenda}\"/>"
    "<figcaption>{legenda}</figcaption>"
    "</figure>"
)


def _imagem_b64(caminho, largura=1000, qualidade=78):
    """Redimensiona e recomprime a imagem antes de embutir no PDF."""
    try:
        from PIL import Image
    except ImportError:
        return base64.b64encode(open(caminho, "rb").read()).decode("ascii"), "image/webp"
    img = Image.open(caminho).convert("RGB")
    if img.width > largura:
        altura = int(img.height * largura / img.width)
        img = img.resize((largura, altura), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=qualidade, optimize=True)
    return base64.b64encode(buf.getvalue()).decode("ascii"), "image/jpeg"


def substituir_imagens(texto):
    def repl(m):
        slug = m.group(1)
        legenda = m.group(2)
        caminho = os.path.join(config.SITE_DIR, "public", "frutiferas", slug + ".webp")
        if not os.path.exists(caminho):
            return ""
        b64, mime = _imagem_b64(caminho)
        return IMG_HTML.format(src=f"data:{mime};base64,{b64}", legenda=legenda)

    return IMG_RE.sub(repl, texto)


def md_para_pdf(md_path, pdf_nome, titulo, subtitulo, extra_md=None, modo="botao"):
    texto = open(md_path, encoding="utf-8").read()
    if extra_md is not None:
        texto = texto.replace("<!-- CATALOGO -->", extra_md)
    texto = substituir_imagens(texto)
    texto = substituir_ofertas(texto)
    texto = substituir_qr(texto, modo)
    corpo = markdown.markdown(texto, extensions=["extra", "sane_lists", "toc"])
    html = (
        "<!DOCTYPE html><html lang='pt-BR'><head><meta charset='utf-8'>"
        f"<title>{titulo}</title><style>{CSS}</style></head><body>"
        + COVER.format(titulo=titulo, subtitulo=subtitulo)
        + corpo
        + "</body></html>"
    )
    html_path = os.path.join(OUT_DIR, pdf_nome.replace(".pdf", ".html"))
    open(html_path, "w", encoding="utf-8").write(html)

    pdf_path = os.path.join(OUT_DIR, pdf_nome)
    if os.path.exists(pdf_path):
        os.remove(pdf_path)
    subprocess.run(
        [EDGE, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
         f"--print-to-pdf={pdf_path}", "file:///" + html_path.replace("\\", "/")],
        capture_output=True, timeout=240,
    )
    ok = os.path.exists(pdf_path)
    print(f"[{'ok' if ok else 'falhou'}] {pdf_nome} -> {pdf_path if ok else html_path}")
    return ok


def limpar_dica(t):
    """Limpa titulos de video usados como dica. Devolve '' para dicas genericas."""
    if re.match(r"^\s*(assista|veja)\s+no\s+canal", t, flags=re.I):
        return ""
    if re.search(r"v[ií]deos de cultivo", t, flags=re.I):
        return ""
    t = re.sub(r"[\U0001F000-\U0001FAFF\u2190-\u27BF\u2B00-\u2BFF\uFE0F]", "", t)
    t = re.sub(r"\b4\s?[kK]\b", "", t)
    t = re.sub(r"\s*[|·-]\s*$", "", t)
    return re.sub(r"\s{2,}", " ", t).strip(" -·|")


def limpar_frutiferas(dados):
    """Normaliza nomes, remove placeholders e entradas incompletas."""
    saida = []
    for f in dados:
        orig = f["nome"]
        if orig in DESCARTAR:
            continue
        f = dict(f)
        if not f.get("nomeCientifico") and orig in CIENTIFICO:
            f["nomeCientifico"] = CIENTIFICO[orig]
        if orig in PRODUCAO:
            f["tempoProducao"], f["frutificacao"] = PRODUCAO[orig]
        for campo in ("tempoProducao", "frutificacao", "solo", "vaso", "luz", "rega"):
            valor = (f.get(campo) or "").strip()
            f[campo] = "" if valor.lower().startswith(PLACEHOLDER) else valor
        resumo = (f.get("resumo") or "").strip()
        if RESUMO_GENERICO.search(resumo):
            resumo = RESUMOS.get(orig, "")
        f["resumo"] = resumo
        f["dicas"] = [d for d in (limpar_dica(x) for x in (f.get("dicas") or [])) if len(d) > 15]
        f["nome"] = NOMES.get(orig, orig)
        saida.append(f)
    return saida


def carregar_frutiferas():
    caminho = os.path.join(CURSO_DIR, "frutiferas.json")
    if not os.path.exists(caminho):
        raise SystemExit(
            "frutiferas.json nao encontrado. Rode antes:\n"
            "  node ferramentas/curso/extrair_frutiferas.mjs"
        )
    return limpar_frutiferas(json.load(open(caminho, encoding="utf-8")))


CATEGORIAS = [
    ("nativas", "Frutíferas nativas do Brasil"),
    ("citricas", "Cítricas"),
    ("exoticas", "Frutíferas exóticas"),
    ("raras", "Frutíferas raras"),
    ("vaso", "Outras frutíferas para vaso"),
]


def gerar_catalogo(frutiferas):
    """Monta o catalogo markdown, cada frutifera em uma unica categoria."""
    usados = set()
    partes = []
    for chave, titulo in CATEGORIAS:
        grupo = [f for f in frutiferas if chave in (f.get("categorias") or []) and f["slug"] not in usados]
        if not grupo:
            continue
        usados.update(f["slug"] for f in grupo)
        partes.append(f"### {titulo} ({len(grupo)})\n")
        for f in sorted(grupo, key=lambda x: x["nome"]):
            nome_cien = f.get("nomeCientifico") or ""
            cabeca = f"#### {f['nome']}" + (f" — *{nome_cien}*" if nome_cien else "")
            linha1 = " · ".join(
                x for x in [
                    f"{icone_luz(f.get('luz'))} **Luz:** {f['luz']}" if f.get("luz") else "",
                    f"💧 **Rega:** {f['rega']}" if f.get("rega") else "",
                    f"**Vaso:** {f['vaso']}" if f.get("vaso") else "",
                ] if x
            )
            linha2 = " · ".join(
                x for x in [
                    f"**Dificuldade:** {f['dificuldade']}" if f.get("dificuldade") else "",
                    f"**Produz em:** {f['tempoProducao']}" if f.get("tempoProducao") else "",
                    f"**Frutificação:** {f['frutificacao']}" if f.get("frutificacao") else "",
                ] if x
            )
            blocos = [f"<div class='ficha' markdown='1'>\n", cabeca, "", linha1, ""]
            if linha2:
                blocos += [linha2, ""]
            if f.get("solo"):
                blocos += [f"**Solo:** {f['solo']}", ""]
            if f.get("resumo"):
                blocos += [f["resumo"], ""]
            dicas = f.get("dicas") or []
            if dicas:
                blocos += [f"**Dica:** {dicas[0]}", ""]
            vid = link_video(f)
            if vid:
                blocos += [vid, ""]
            blocos.append("</div>")
            partes.append("\n".join(blocos))

    restantes = [f for f in frutiferas if f["slug"] not in usados]
    if restantes:
        partes.append(f"### Outras ({len(restantes)})\n")
        for f in sorted(restantes, key=lambda x: x["nome"]):
            partes.append(f"#### {f['nome']}\n\n{f.get('resumo', '')}\n")

    return "\n\n".join(partes)


def gerar_bonus(frutiferas):
    """Workbook do aluno: plano, diario de cultivo, registro fotografico e fichas."""
    destaques = sorted((f for f in frutiferas if f.get("destaque")), key=lambda x: x["nome"])[:16]

    linhas = [
        "# Workbook do Aluno",
        "",
        f"Caderno de acompanhamento do guia **{NOME_PRODUTO}**.",
        "",
        "Este material é seu: escreva, cole fotos e marque o que funcionou. É ele que transforma a "
        "leitura em resultado — porque o que muda a sua planta não é o que você leu, é o que você fez.",
        "",
        "---",
        "",
        "## 1. Meu plano de vaso",
        "",
        "| O que definir | Minha anotação |",
        "|---|---|",
        "| Local do vaso | |",
        "| Horas de sol direto por dia | |",
        "| Frutífera escolhida | |",
        "| Tamanho do vaso (litros) | |",
        "| Substrato usado | |",
        "| Data do plantio | |",
        "| Previsão da 1ª colheita | |",
        "| Data da próxima renovação (2 anos) | |",
        "",
        "---",
        "",
        "## 2. Diário de cultivo — 13 semanas",
        "",
        "Anote uma vez por semana, sempre no mesmo dia. Em três meses você vai enxergar o padrão da "
        "sua planta — e vai saber exatamente o que mudou quando algo der errado.",
        "",
        "| Semana | Data | Altura / nº de folhas | Rega | Adubação | O que observei |",
        "|---|---|---|---|---|---|",
    ]
    for i in range(1, 14):
        linhas.append(f"| {i} | | | | | |")

    linhas += [
        "",
        "---",
        "",
        "## 3. Registro fotográfico",
        "",
        "Imprima esta página, cole as fotos ou escreva ao lado o que mudou. A foto do **dia do plantio** "
        "é a mais importante: é a sua linha de base.",
        "",
        '<div class="fotos">',
        '  <div class="foto">Dia do plantio</div>',
        '  <div class="foto">Mês 1</div>',
        '  <div class="foto">Mês 2</div>',
        '  <div class="foto">Mês 3</div>',
        "</div>",
        "",
        "---",
        "",
        "## 4. Checklist de rega e adubação",
        "",
        "### Rega (teste do dedo)",
        "",
        "- [ ] Enfiar o dedo 2 cm no substrato antes de regar",
        "- [ ] Só regar se estiver seco",
        "- [ ] Regar pela manhã, na base (nunca nas folhas)",
        "- [ ] Esvaziar o pratinho depois da rega",
        "- [ ] Reduzir a frequência em dias frios e aumentar em dias quentes",
        "",
        "### Adubação (por fase)",
        "",
        "| Fase | Produto | Frequência | Feito? |",
        "|---|---|---|---|",
        "| Plantio | Húmus de minhoca misturado ao substrato | 1 vez | |",
        "| Crescimento | Bokashi na borda do vaso | A cada 30-45 dias | |",
        "| Floração | Organomineral com mais fósforo/potássio | A cada 30 dias | |",
        "| Frutificação | Adubo líquido diluído na rega | A cada 15-20 dias | |",
        "| Repouso (frio/pós-colheita) | Suspender ou reduzir | — | |",
        "",
        "---",
        "",
        "## 5. Inspeção semanal de pragas",
        "",
        "Cinco minutos por semana evitam uma infestação de meses. Olhe o **verso das folhas**, as "
        "**pontas novas** e o **caule**.",
        "",
        "| Semana | Data | O que encontrei | O que fiz |",
        "|---|---|---|---|",
    ]
    for i in range(1, 14):
        linhas.append(f"| {i} | | | |")

    linhas += [
        "",
        "---",
        "",
        "## 6. Meu calendário de adubação",
        "",
        "Preencha o mês e o produto que você vai usar. Marque quando fizer.",
        "",
        "| Mês | Produto / dose | Feito? |",
        "|---|---|---|",
    ]
    for mes in ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]:
        linhas.append(f"| {mes} | | |")

    linhas += [
        "",
        "---",
        "",
        "## 7. Minhas anotações",
        "",
        "Use este espaço para registrar o que deu certo, o que não deu e o que você quer testar na "
        "próxima safra. O que você escreve aqui vale mais do que qualquer manual.",
        "",
        '<div class="fotos">',
        '  <div class="foto">O que deu certo</div>',
        '  <div class="foto">O que vou mudar</div>',
        "</div>",
        "",
        "---",
        "",
        "*Dica: consulte o catálogo do guia principal para os dados técnicos de cada espécie.*",
        "",
        "---",
        "",
        "## Continue com a gente",
        "",
        "Dúvida no cultivo? No canal e no site você encontra o passo a passo em vídeo e as fichas "
        "completas de cada frutífera. Aponte a câmera do celular:",
        "",
        "<!-- QR:canal -->",
        "",
        "<!-- QR:site -->",
        "",
    ]

    caminho = os.path.join(config.SITE_DIR, "CURSO-BONUS.md")
    open(caminho, "w", encoding="utf-8").write("\n".join(linhas))
    print(f"workbook gerado: {caminho} ({len(destaques)} destaques disponiveis)")


def main():
    frutiferas = carregar_frutiferas()
    print(f"catalogo: {len(frutiferas)} frutiferas")
    gerar_bonus(frutiferas)
    catalogo = gerar_catalogo(frutiferas)
    md_para_pdf(
        os.path.join(config.SITE_DIR, "CURSO-EBOOK.md"),
        "Frutiferas-em-Vaso-ebook.pdf",
        NOME_PRODUTO,
        "Guia completo: do plantio à colheita",
        extra_md=catalogo,
    )
    md_para_pdf(
        os.path.join(config.SITE_DIR, "CURSO-BONUS.md"),
        "Frutiferas-em-Vaso-bonus.pdf",
        "Workbook do Aluno",
        "diário de cultivo, checklist e fichas de bolso",
        modo="qr",
    )
    md_para_pdf(
        os.path.join(config.SITE_DIR, "CURSO-BUMP.md"),
        "Adubacao-Organica-Descomplicada.pdf",
        "Adubação Orgânica",
        "Descomplicada — receitas, doses e calendário",
    )
    md_para_pdf(
        os.path.join(config.SITE_DIR, "CURSO-UPSELL.md"),
        "Multiplicacao-de-Mudas-na-Pratica.pdf",
        "Multiplicação de Mudas",
        "na prática — estaquia, alporque e enxertia",
    )


if __name__ == "__main__":
    main()
