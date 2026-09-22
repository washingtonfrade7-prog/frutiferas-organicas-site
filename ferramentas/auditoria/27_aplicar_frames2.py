# -*- coding: utf-8 -*-
"""Aplica os frames escolhidos (2a rodada) como capa das frutiferas."""
import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

FRAMES = os.path.join(config.OUT_DIR, "_frames3")
PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")

PICKS = {
    "jambo-rosa": ("aCCjNdeJ7Ns", 1),
    "jabuticaba-sabara": ("2raa1E2ST7Y", 7),
    "bacupari-mirim": ("hBSCmJcSzVA", 4),
    "amora-portuguesa": ("scxp14TGUxQ", 4),
    "araca-roxo": ("CSqEbkBbClg", 0),
    "caja-manga-anao": ("kT7l4rqt8mI", 9),
    "goiaba-amarela": ("mLz9dScQHAI", 9),
    "laranja-champagne": ("-BpmfmSzV9o", 7),
}


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


for slug, (vid, idx) in PICKS.items():
    src = os.path.join(FRAMES, f"{slug}__{vid}", f"f{idx:02d}.jpg")
    if not os.path.exists(src):
        print(f"[sem frame] {slug}")
        continue
    otimizar(src, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
    print(f"[ok] {slug} <- {vid} f{idx:02d}")
