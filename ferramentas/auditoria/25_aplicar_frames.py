# -*- coding: utf-8 -*-
"""Aplica os frames escolhidos como capa das frutiferas."""
import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

FRAMES = os.path.join(config.OUT_DIR, "_frames2")
PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")

PICKS = {
    "uvaia": 10,
    "uva-brs-vitoria": 1,
    "uva-isabel": 5,
    "saborosa-pytaya-do-serrado": 11,
    "pitanga-do-cerrado": 11,
    "manga-uba": 12,
    "jambo-rosa": 2,
    "jabuticaba-sabara": 9,
    "limao-cravo-caipira": 6,
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


for slug, idx in PICKS.items():
    src = os.path.join(FRAMES, slug, f"f{idx:02d}.jpg")
    if not os.path.exists(src):
        print(f"[sem frame] {slug} f{idx:02d}")
        continue
    otimizar(src, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
    print(f"[ok] {slug} <- f{idx:02d}")
