# -*- coding: utf-8 -*-
"""11 - Importa as 100 frutiferas do acervo (video "TOP 100 Frutiferas para vaso").

Fontes (somente leitura):
  - _colab_ml/Extrair_Frames_100_Frutas.py  -> lista mestra (timestamp, nome, slug do frame)
  - dataset_frutas/imagens/<Slug>_00X.jpg   -> frames reais de cada fruta
  - auditoria/canal_bruto.json              -> videos do canal para associar
  - auditoria/frutas.json                   -> nomes cientificos conhecidos

Saidas:
  - public/frutiferas/<slug>.jpg (+ -2, -3)
  - src/data/frutiferas-extras.ts
"""
import ast
import json
import os
import re
import sys
import unicodedata
from collections import Counter, defaultdict

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

SCRIPT_100 = os.path.join(config.AUTOMACAO_DIR, "_colab_ml", "Extrair_Frames_100_Frutas.py")
DATASET = os.path.join(config.AUTOMACAO_DIR, "dataset_frutas", "imagens")
PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
SAIDA_TS = os.path.join(config.SITE_DIR, "src", "data", "frutiferas-extras.ts")

MANUAIS = {
    "jabuticaba", "araca-vermelho", "pitanga-preta", "araca-boi", "bacupari-mirim",
    "bacupari-estalo", "abiu-amarelo", "gabiroba", "cereja-rio-grande", "grumixama-amarela",
}

# nomes do master que equivalem a fichas manuais (nao duplicar)
SKIP_NOMES = {
    "pitanga preta", "araca vermelho", "araca boi", "bacupari mirim",
    "cereja do rio grande", "grumixama amarela", "abil", "guabiroba do cerrado",
    # nao sao frutiferas
    "tomate", "costela de adao",
}

PALETA = [
    "#2E5B3A", "#4B2E5C", "#B23A2E", "#C2703D", "#7A8B3A", "#8E2B2B",
    "#D9A62E", "#4A1B2E", "#3E6B5A", "#8F4C25", "#5C6B2E", "#A8452E",
    "#2E5B5B", "#6B4C2E", "#7A2E4B", "#3B5C2E",
]

TIPOS = {
    "colheita": ["colheita", "colhendo", "harvest", "degustacao", "tasting", "brix", "colhida"],
    "plantio": ["como plantar", "plantio", "plantando", "how to plant", "cultivo", "como cultivar"],
    "poda": ["poda", "podar", "prune", "pruning"],
    "adubacao": ["adubacao", "adubar", "adubo", "fertiliz"],
    "cuidados": ["cuidado", "cuidar", "doenca", "praga", "folhas caindo", "morrendo", "recuperar", "rega", "regar", "abelha", "formiga", "lagarta"],
    "floracao": ["floracao", "flor", "flower", "poliniza"],
    "gastronomia": ["receita", "mousse", "suco", "iogurte", "caipirinha", "licor", "geleia", "wine", "vitamina", "sorvete", "cha"],
    "tour": ["tour", "pomar", "terraco", "terrace"],
}

NATIVAS_KW = [
    "jabuticaba", "grumixama", "cambuci", "cambui", "araca", "pitanga", "pitangatuba",
    "cagaita", "cabeludinha", "bacupari", "camu", "cupuacu", "guabiroba", "inga",
    "pitomba", "ubajai", "bacuri", "caja", "maracuja", "caju", "mangaba", "seriguela",
    "ajuru", "calabura", "ananas", "mana cubiu", "mangostao",
]
RARAS_KW = [
    "cambuci", "cambui", "cagaita", "cabeludinha", "camu", "cupuacu", "bacupari",
    "mangostao", "rambuta", "longan", "biriba", "pitomba", "ubajai", "jabuticaba branca",
    "jabuticaba sabara", "grumixama preta", "ajuru", "calabura", "estrela do norte",
    "mandacaru", "ananas do mato", "mana cubiu", "tamarilho", "cabeludinha roxa",
    "cabeludinha peludinha", "mirtilo", "cherimoya", "groselha",
]
CITRICAS_KW = ["laranja", "limao", "mexerica", "cidra", "tanjo", "kinkan", "serra dagua", "galeguinho", "caviar", "ponkan"]
UVAS_KW = ["uva"]


def norm(t):
    t = unicodedata.normalize("NFKD", (t or "").lower())
    return "".join(c for c in t if not unicodedata.combining(c))


def slugify(nome):
    s = norm(nome)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def carregar_lista_100():
    txt = open(SCRIPT_100, encoding="utf-8").read()
    bloco = txt.split("FRUTAS = [", 1)[1].split("\n]", 1)[0]
    return ast.literal_eval("[" + bloco + "]")


def nome_cientifico_por_nome():
    mapa = {}
    if os.path.exists(config.FRUTAS_JSON):
        for f in json.load(open(config.FRUTAS_JSON, encoding="utf-8")):
            mapa[norm(f["nome"])] = f["nomeCientifico"]
    return mapa


def categorias_para(nome):
    n = norm(nome)
    cats = []
    if any(k in n for k in NATIVAS_KW):
        cats.append("nativas")
    if any(k in n for k in CITRICAS_KW):
        cats += ["exoticas", "citricas"]
    elif any(k in n for k in UVAS_KW):
        cats += ["exoticas"]
    elif "nativas" not in cats:
        cats.append("exoticas")
    cats.append("vaso")
    if any(k in n for k in RARAS_KW):
        cats.append("raras")
    # remove duplicatas mantendo ordem
    return list(dict.fromkeys(cats))


def classificar_tipo(texto_norm):
    for tipo, chaves in TIPOS.items():
        for c in chaves:
            if norm(c) in texto_norm:
                return tipo
    return "outros"


def melhor_thumb_frames(slug_frame):
    """Retorna a lista de frames existentes para o slug do dataset."""
    achados = []
    for i in range(1, 5):
        p = os.path.join(DATASET, f"{slug_frame}_{i:03d}.jpg")
        if os.path.exists(p):
            achados.append(p)
    return achados


def otimizar(src, dest, w=800, h=450):
    im = Image.open(src).convert("RGB")
    iw, ih = im.size
    alvo = w / h
    if iw / ih > alvo:
        nw = int(ih * alvo)
        x = (iw - nw) // 2
        im = im.crop((x, 0, x + nw, ih))
    else:
        nh = int(iw / alvo)
        y = (ih - nh) // 2
        im = im.crop((0, y, iw, y + nh))
    im = im.resize((w, h), Image.LANCZOS)
    im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)


def main():
    lista = carregar_lista_100()
    print(f"[11] frutas na lista mestra: {len(lista)}")

    bruto = json.load(open(config.CANAL_BRUTO, encoding="utf-8"))
    videos = bruto["videos"]
    titulos = [(v["id"], norm(v.get("title") or ""), v.get("title") or "", v.get("definition"), v.get("viewCount", 0)) for v in videos]

    cientificos = nome_cientifico_por_nome()
    os.makedirs(PUBLIC_FRUTAS, exist_ok=True)

    entradas = []
    vistos = set()
    sem_frame = []

    for i, (ts, nome, slug_frame) in enumerate(lista):
        if norm(nome) in SKIP_NOMES:
            continue
        slug = slugify(nome)
        if slug in MANUAIS or slug in vistos:
            continue
        vistos.add(slug)

        frames = melhor_thumb_frames(slug_frame)
        if not frames:
            sem_frame.append(nome)
            continue

        # capa = frame com o fruto (002); card informativo (001) e 003 vao para a galeria
        hero_idx = 1 if len(frames) >= 2 else 0
        otimizar(frames[hero_idx], os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
        galeria = []
        gal_srcs = [f for j, f in enumerate(frames) if j != hero_idx][:2]
        for j, f in enumerate(gal_srcs, start=2):
            otimizar(f, os.path.join(PUBLIC_FRUTAS, f"{slug}-{j}.jpg"))
            galeria.append(f"/frutiferas/{slug}-{j}.jpg")

        # videos do canal (match por palavras do nome)
        palavras = [p for p in norm(nome).split() if len(p) > 3]
        rx = re.compile(r"(?<![a-z0-9])(" + "|".join(re.escape(p) for p in palavras) + r")(?![a-z0-9])") if palavras else None
        vids = []
        if rx:
            for vid, tnorm, ttitulo, defi, views in titulos:
                if rx.search(tnorm):
                    vids.append({"id": vid, "titulo": ttitulo, "tipo": classificar_tipo(tnorm), "def": defi, "views": views})
        ordem = {"colheita": 0, "plantio": 1, "poda": 2, "adubacao": 3, "cuidados": 4, "floracao": 5, "gastronomia": 6, "tour": 7, "outros": 8}
        vids.sort(key=lambda v: (ordem.get(v["tipo"], 9), -v["views"]))
        videos_out = [{"id": v["id"], "titulo": v["titulo"], "tipo": v["tipo"]} for v in vids[:8]]

        categorias = categorias_para(nome)
        tipos_presentes = sorted({v["tipo"] for v in videos_out if v["tipo"] != "outros"})
        resumo = (
            f"{nome} é uma frutífera que produz em vaso. "
            + (f"No canal Frutíferas Orgânicas há {len(vids)} vídeos sobre esta espécie." if vids else "Confira as dicas de cultivo e onde comprar mudas.")
        )

        entradas.append({
            "slug": slug,
            "nome": nome,
            "nomeCientifico": cientificos.get(norm(nome), ""),
            "familia": "",
            "categorias": categorias,
            "resumo": resumo,
            "descricao": [
                f"{nome} é uma das frutíferas selecionadas para cultivo em vaso. "
                + (f"Assista aos {len(videos_out)} vídeos abaixo para ver plantio, poda, adubação e colheita na prática." if videos_out else "Veja as dicas e onde comprar mudas e insumos nos parceiros."),
                "Confira as lojas parceiras para adquirir mudas e insumos com segurança.",
            ],
            "origem": "",
            "porte": "",
            "luz": "Sol pleno",
            "rega": "Regular, sem encharcar",
            "solo": "Fértil, bem drenado e rico em matéria orgânica",
            "vaso": "A partir de 20 litros",
            "dificuldade": "Fácil",
            "tempoProducao": "Consulte os vídeos de cultivo",
            "frutificacao": "Consulte os vídeos de cultivo",
            "curiosidades": [],
            "dicas": [f"Assista no canal: {v['titulo']}" for v in videos_out[:3]] or [f"Veja no canal os vídeos de cultivo de {nome.lower()}."],
            "videos": videos_out,
            "imagem": f"/frutiferas/{slug}.jpg",
            "galeria": galeria,
            "keywords": [],
            "cor": PALETA[i % len(PALETA)],
            "destaque": False,
        })

    entradas.sort(key=lambda e: e["nome"])
    for e in entradas[:6]:
        e["destaque"] = True

    ts_out = (
        "// GERADO AUTOMATICAMENTE por ferramentas/auditoria/11_importar_100.py\n"
        "// Nao edite a mao: rode a auditoria novamente para atualizar.\n"
        "import type { Frutifera } from '@/data/frutiferas'\n"
        "import { ofertasPadrao } from '@/data/ofertas'\n\n"
        "const base: Omit<Frutifera, 'ofertas'>[] = "
        + json.dumps(entradas, ensure_ascii=False, indent=2)
        + "\n\nexport const frutiferasExtras: Frutifera[] = base.map((f) => ({ ...f, ofertas: ofertasPadrao() }))\n"
    )
    with open(SAIDA_TS, "w", encoding="utf-8") as f:
        f.write(ts_out)

    print(f"[11] frutiferas geradas: {len(entradas)}")
    print(f"[11] sem frame: {len(sem_frame)} -> {sem_frame[:10]}")
    com_video = sum(1 for e in entradas if e["videos"])
    print(f"[11] com videos do canal: {com_video}")
    print(f"[11] salvo: {SAIDA_TS}")


if __name__ == "__main__":
    main()
