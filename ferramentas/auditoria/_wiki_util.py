# -*- coding: utf-8 -*-
"""Utilitarios de download de imagens livres (Wikimedia)."""
import json
import ssl
import urllib.parse
import urllib.request

from PIL import Image

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE
UA = {"User-Agent": "FrutiferasOrganicas/1.0 (site de conteudo; contato@frutiferasorganicas.com.br)"}


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
        if not ii.get("thumburl") or not t.endswith((".jpg", ".jpeg", ".png")):
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
