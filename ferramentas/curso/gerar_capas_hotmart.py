# -*- coding: utf-8 -*-
"""Gera as capas de produto para a Hotmart (miniatura quadrada e banner 16:9).

Nas capas dos PDFs o texto fica sobre fundo branco. Aqui, na miniatura da
plataforma, o texto vai SOBRE a foto — entao entra um gradiente escuro
translucido para garantir contraste em qualquer tela.

Saida: ferramentas/curso/capas/<slug>-1200.jpg e <slug>-1920.jpg
"""
import os

from PIL import Image, ImageDraw, ImageFont

CURSO = r"D:\SITE FRUTÍFERAS ORGÂNICAS\ferramentas\curso"
OUT = os.path.join(CURSO, "capas")
os.makedirs(OUT, exist_ok=True)

FONTES = {
    "serif_b": r"C:\Windows\Fonts\georgiab.ttf",
    "serif": r"C:\Windows\Fonts\georgia.ttf",
    "sans_b": r"C:\Windows\Fonts\segoeuib.ttf",
    "sans": r"C:\Windows\Fonts\segoeui.ttf",
}

VERDE = (31, 61, 43)
BRANCO = (255, 255, 255)
CREME = (243, 237, 224)

PRODUTOS = [
    {
        "slug": "ebook",
        "foto": os.path.join(CURSO, "imagens", "autor-capa.jpg"),
        "chancela": "GUIA COMPLETO",
        "titulo": ["Cultivo de Frutíferas", "Orgânicas em Vasos"],
        "sub": "do plantio à colheita",
        "cor": (31, 61, 43),
    },
    {
        "slug": "workbook",
        "foto": os.path.join(CURSO, "imagens", "pomar", "vasos-e-pitaya.jpg"),
        "chancela": "CADERNO DE ACOMPANHAMENTO",
        "titulo": ["Workbook do Aluno"],
        "sub": "diário de cultivo e checklists",
        "cor": (122, 92, 46),
    },
    {
        "slug": "adubacao",
        "foto": os.path.join(CURSO, "imagens", "pomar", "limoes-na-mao.jpg"),
        "chancela": "MATERIAL COMPLEMENTAR",
        "titulo": ["Adubação Orgânica", "Descomplicada"],
        "sub": "receitas, doses e calendário",
        "cor": (143, 76, 37),
    },
    {
        "slug": "multiplicacao",
        "foto": os.path.join(CURSO, "imagens", "pomar", "cacho-uva-no-pe.jpg"),
        "chancela": "MÓDULO AVANÇADO",
        "titulo": ["Multiplicação de Mudas"],
        "sub": "estaquia, alporque e enxertia",
        "cor": (31, 91, 91),
    },
]


def fonte(chave, tamanho):
    caminho = FONTES.get(chave)
    if caminho and os.path.exists(caminho):
        return ImageFont.truetype(caminho, tamanho)
    return ImageFont.load_default()


def recortar(im, larg, alt):
    """Cover crop: preenche o quadro sem distorcer."""
    alvo = larg / alt
    atual = im.width / im.height
    if atual > alvo:
        nova_l = int(im.height * alvo)
        x = (im.width - nova_l) // 2
        im = im.crop((x, 0, x + nova_l, im.height))
    else:
        nova_a = int(im.width / alvo)
        y = (im.height - nova_a) // 2
        im = im.crop((0, y, im.width, y + nova_a))
    return im.resize((larg, alt), Image.LANCZOS)


def gradiente(larg, alt, alpha_max, fracao, de_baixo=True, curva=2.0):
    """Camada preta com alfa maximo na ponta escolhida e zero no fim da faixa.

    Calcula linha por linha em toda a altura, entao nao ha salto no fim da faixa.
    """
    camada = Image.new("RGBA", (larg, alt), (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    faixa = max(1, int(alt * fracao))
    for y in range(alt):
        dist = (alt - 1 - y) if de_baixo else y
        p = max(0.0, 1.0 - dist / faixa)
        a = int(alpha_max * (p ** curva))
        if a:
            d.line([(0, y), (larg, y)], fill=(0, 0, 0, a))
    return camada


def pilula(d, xy, texto, f, cor_fundo, cor_texto, padding=22, raio=None):
    x, y = xy
    cx0, cy0, cx1, cy1 = d.textbbox((0, 0), texto, font=f)
    larg, alt = cx1 - cx0, cy1 - cy0
    caixa = [x, y, x + larg + padding * 2, y + alt + padding * 1.4]
    r = raio if raio is not None else (caixa[3] - caixa[1]) // 2
    d.rounded_rectangle(caixa, radius=r, fill=cor_fundo)
    d.text((x + padding, y + padding * 0.7 - cy0), texto, font=f, fill=cor_texto)
    return caixa[3] - caixa[1]


def quebrar(d, texto, f, largura_max):
    palavras = texto.split()
    linhas, atual = [], ""
    for p in palavras:
        teste = f"{atual} {p}".strip()
        if d.textlength(teste, font=f) <= largura_max:
            atual = teste
        else:
            if atual:
                linhas.append(atual)
            atual = p
    if atual:
        linhas.append(atual)
    return linhas


def gerar(produto, larg, alt, sufixo):
    foto = Image.open(produto["foto"]).convert("RGB")
    base = recortar(foto, larg, alt).convert("RGBA")

    # gradiente suave: escurece a base (titulo) e um pouco o topo (marca)
    base.alpha_composite(gradiente(larg, alt, 240, 0.70, de_baixo=True, curva=2.0))
    base.alpha_composite(gradiente(larg, alt, 110, 0.28, de_baixo=False, curva=2.2))

    d = ImageDraw.Draw(base)
    margem = int(larg * 0.065)
    esc = larg / 1200  # escala em relacao ao quadrado

    f_tag = fonte("sans_b", int(26 * esc))
    f_chancela = fonte("sans_b", int(27 * esc))
    f_titulo = fonte("serif_b", int(76 * esc))
    f_sub = fonte("serif", int(34 * esc))
    f_autor = fonte("sans", int(30 * esc))

    # marca no topo
    d.text((margem, int(alt * 0.07)), "FRUTÍFERAS ORGÂNICAS", font=f_tag, fill=(255, 255, 255, 210))

    # bloco de texto ancorado na base
    y = alt - margem
    altura_autor = int(38 * esc)
    y -= altura_autor
    d.text((margem, y), "por Washington Carlos Frade", font=f_autor, fill=(255, 255, 255, 225))

    y -= int(16 * esc)
    altura_sub = int(40 * esc)
    y -= altura_sub
    d.text((margem, y), produto["sub"], font=f_sub, fill=(255, 255, 255, 210))

    y -= int(18 * esc)
    for linha in reversed(produto["titulo"]):
        altura = int(86 * esc)
        y -= altura
        d.text((margem, y), linha, font=f_titulo, fill=BRANCO)

    y -= int(22 * esc)
    altura_pil = pilula(d, (margem, y - int(56 * esc)), produto["chancela"], f_chancela,
                        produto["cor"], CREME, padding=int(20 * esc))

    destino = os.path.join(OUT, f"{produto['slug']}-{sufixo}.jpg")
    base.convert("RGB").save(destino, "JPEG", quality=90, optimize=True, progressive=True)
    return destino, os.path.getsize(destino) // 1024


print("--- miniaturas 1200x1200 (Hotmart) ---")
for p in PRODUTOS:
    caminho, kb = gerar(p, 1200, 1200, "1200")
    print(f"  [ok] {os.path.basename(caminho):<28} {kb:>4} KB")

print("--- banners 1920x1080 ---")
for p in PRODUTOS:
    caminho, kb = gerar(p, 1920, 1080, "1920")
    print(f"  [ok] {os.path.basename(caminho):<28} {kb:>4} KB")
