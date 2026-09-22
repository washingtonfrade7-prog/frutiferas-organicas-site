# -*- coding: utf-8 -*-
"""Baixa imagens livres (Wikipedia/Wikimedia) para as frutiferas com capa ruim.

- Tenta pt.wikipedia pelo nome popular; depois en.wikipedia pelo nome cientifico.
- Salva em public/frutiferas/<slug>.jpg (800x450)
- Registra a fonte/credito em auditoria/creditos_imagens.json
"""
import json
import os
import ssl
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

ALVOS = [
    "abacaxi", "acerola-okinawa", "amora-portuguesa", "araca-amarelo", "araca-roxo",
    "atemoia", "bacupari-de-bico", "banana-ouro", "cacau", "caja-manga-anao",
    "cambuca-jabuticaba-amarela", "cambuci", "cambui-roxo", "camu-camu", "carambola-mel",
    "cherimoya", "goiaba-amarela", "graviola", "jabuticaba-sabara", "jambo-rosa",
    "laranja-serra-dagua", "lichia", "limao-cravo-caipira", "limao-galeguinho",
    "limao-imperial", "limao-doce-tanjo", "maca-eva", "mamao", "manga-palmer",
    "manga-uba", "mangostao-fruta-da-rainha", "maracuja-gigante", "melancia",
    "melao-andino", "morango", "nectarina", "pessego-anao", "pinha",
    "pinha-dos-astecas", "pitanga-do-cerrado", "pitaya-branca", "rambuta", "roma",
    "saborosa-pytaya-do-serrado", "seriguela", "uva-brs-vitoria", "uva-isabel", "uvaia",
]

PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
CREDITOS = os.path.join(config.OUT_DIR, "creditos_imagens.json")
UA = {"User-Agent": "FrutiferasOrganicas/1.0 (site de conteudo; contato@frutiferasorganicas.com.br)"}

# termos alternativos para os que nao acham imagem direto
FALLBACK = {
    "araca-amarelo": ["Psidium cattleianum", "Araçá"],
    "cambuca-jabuticaba-amarela": ["Plinia edulis", "Cambucá"],
    "jabuticaba-sabara": ["Plinia cauliflora", "Jabuticaba"],
    "laranja-serra-dagua": ["Citrus sinensis", "Laranja"],
    "limao-galeguinho": ["Citrus aurantifolia", "Limão"],
    "limao-imperial": ["Citrus limon", "Limão siciliano"],
    "manga-palmer": ["Mangifera indica", "Manga (fruta)"],
    "manga-uba": ["Mangifera indica", "Manga (fruta)"],
    "mangostao-fruta-da-rainha": ["Garcinia mangostana", "Mangostão"],
    "pinha-dos-astecas": ["Annona reticulata", "Pinha (fruta)"],
    "saborosa-pytaya-do-serrado": ["Selenicereus", "Pitaya"],
    "uva-brs-vitoria": ["Vitis", "Uva"],
    "uva-isabel": ["Vitis labrusca", "Uva"],
}


def carregar_extras():
    txt = open(os.path.join(config.SITE_DIR, "src", "data", "frutiferas-extras.ts"), encoding="utf-8").read()
    ini = txt.index("[] = [") + len("[] = ")
    fim = txt.index("\n\nexport const", ini)
    return {f["slug"]: f for f in json.loads(txt[ini:fim].rstrip())}


def api_image(lang, titulo, tamanho=1000):
    url = (
        f"https://{lang}.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(titulo)}"
        f"&prop=pageimages&pithumbsize={tamanho}&format=json&redirects=1"
    )
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=25, context=CTX) as r:
        data = json.loads(r.read().decode("utf-8"))
    for page in data.get("query", {}).get("pages", {}).values():
        if page.get("thumbnail"):
            return page["thumbnail"]["source"], page.get("title")
    return None, None


def baixar(url, dest):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40, context=CTX) as r, open(dest, "wb") as f:
        f.write(r.read())


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
    im.save(dest, "JPEG", quality=86, optimize=True, progressive=True)


def main():
    os.makedirs(PUBLIC_FRUTAS, exist_ok=True)
    os.makedirs(os.path.join(config.OUT_DIR, "_wiki"), exist_ok=True)
    extras = carregar_extras()
    creditos = {}
    ok = 0
    falhas = []

    for slug in ALVOS:
        fruta = extras.get(slug)
        if not fruta:
            falhas.append(slug)
            continue
        nome = fruta["nome"]
        cientifico = fruta.get("nomeCientifico") or ""
        url = titulo = None
        termos = []
        for t in FALLBACK.get(slug, []):
            termos.append(("en", t))
            termos.append(("pt", t))
        termos += [("pt", nome), ("en", cientifico), ("pt", cientifico), ("en", nome)]
        for lang, termo in termos:
            if not termo:
                continue
            try:
                url, titulo = api_image(lang, termo)
            except Exception:
                url = None
            if url:
                break
            time.sleep(0.2)
        if not url:
            print(f"[sem imagem] {slug} ({nome})")
            falhas.append(slug)
            continue
        raw = os.path.join(config.OUT_DIR, "_wiki", f"{slug}.jpg")
        try:
            baixar(url, raw)
            otimizar(raw, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
            creditos[slug] = {"nome": nome, "titulo": titulo, "fonte": url}
            ok += 1
            print(f"[ok] {slug} <- {titulo}")
        except Exception as e:
            print(f"[erro] {slug}: {e}")
            falhas.append(slug)
        time.sleep(0.3)

    with open(CREDITOS, "w", encoding="utf-8") as f:
        json.dump(creditos, f, ensure_ascii=False, indent=2)
    print(f"\nok: {ok} | falhas: {len(falhas)} -> {falhas}")


if __name__ == "__main__":
    main()
