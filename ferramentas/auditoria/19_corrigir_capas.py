# -*- coding: utf-8 -*-
"""Corrige capas ruins usando busca por foto no Wikimedia Commons.

Busca "<termo> fruit" no Commons, pega a primeira foto em retrato/paisagem
com largura minima e salva em public/frutiferas/<slug>.jpg
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
UA = {"User-Agent": "FrutiferasOrganicas/1.0 (site de conteudo; contato@frutiferasorganicas.com.br)"}
PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
CREDITOS = os.path.join(config.OUT_DIR, "creditos_imagens.json")

FIXES = {
    "araca-amarelo": "Psidium cattleyanum fruit",
    "araca-roxo": "Psidium cattleyanum fruit",
    "banana-ouro": "Musa banana fruit bunch",
    "caja-manga-anao": "Spondias dulcis fruit",
    "cambuca-jabuticaba-amarela": "Plinia edulis fruit",
    "cambuci": "Campomanesia phaea fruit",
    "camu-camu": "Myrciaria dubia fruit",
    "cherimoya": "Annona cherimola fruit",
    "jambo-rosa": "Syzygium jambos fruit",
    "limao-doce-tanjo": "Citrus limettioides fruit",
    "mamao": "Carica papaya fruit",
    "mangostao-fruta-da-rainha": "Garcinia mangostana fruit",
    "maracuja-gigante": "Passiflora ligularis fruit",
    "melao-andino": "Solanum muricatum fruit",
    "nectarina": "nectarine fruit",
    "pessego-anao": "peach fruit tree",
    "pinha": "Annona squamosa fruit",
    "roma": "Punica granatum fruit",
    "saborosa-pytaya-do-serrado": "Selenicereus fruit",
    "seriguela": "Spondias purpurea fruit",
    "uva-brs-vitoria": "Vitis vinifera fruit",
}


def commons_fotos(termo, limite=12):
    url = (
        "https://commons.wikimedia.org/w/api.php?action=query&generator=search"
        f"&gsrsearch={urllib.parse.quote(termo)}&gsrnamespace=6&gsrlimit={limite}"
        "&prop=imageinfo&iiprop=url|size&iiurlwidth=1000&format=json"
    )
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30, context=CTX) as r:
        data = json.loads(r.read().decode("utf-8"))
    out = []
    for page in (data.get("query", {}).get("pages", {}) or {}).values():
        ii = (page.get("imageinfo") or [{}])[0]
        t = (page.get("title") or "").lower()
        if not ii.get("thumburl"):
            continue
        if not t.endswith((".jpg", ".jpeg", ".png")):
            continue
        if (ii.get("width") or 0) < 500:
            continue
        out.append(ii["thumburl"])
    return out


def baixar(url, dest):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45, context=CTX) as r, open(dest, "wb") as f:
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
    os.makedirs(os.path.join(config.OUT_DIR, "_wiki"), exist_ok=True)
    creditos = {}
    if os.path.exists(CREDITOS):
        creditos = json.load(open(CREDITOS, encoding="utf-8"))
    ok, falhas = 0, []
    for slug, termo in FIXES.items():
        try:
            fotos = commons_fotos(termo)
        except Exception as e:
            print(f"[erro busca] {slug}: {e}")
            falhas.append(slug)
            continue
        if not fotos:
            print(f"[sem foto] {slug} ({termo})")
            falhas.append(slug)
            continue
        raw = os.path.join(config.OUT_DIR, "_wiki", f"{slug}_fix.jpg")
        try:
            baixar(fotos[0], raw)
            otimizar(raw, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
            creditos[slug] = {"termo": termo, "fonte": fotos[0]}
            ok += 1
            print(f"[ok] {slug} <- {fotos[0].split('/')[-1][:70]}")
        except Exception as e:
            print(f"[erro] {slug}: {e}")
            falhas.append(slug)
        time.sleep(0.3)
    json.dump(creditos, open(CREDITOS, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"\nok: {ok} | falhas: {len(falhas)} -> {falhas}")


if __name__ == "__main__":
    main()
