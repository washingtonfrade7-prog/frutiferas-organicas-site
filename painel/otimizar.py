# -*- coding: utf-8 -*-
"""Otimiza uma imagem enviada pelo painel: recorta em 16:9, redimensiona para
800x450 e salva em WebP.

Uso: python otimizar.py <origem> <destino.webp>
"""
import sys

from PIL import Image


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
    im.save(dest, "WEBP", quality=84, method=6)


if __name__ == "__main__":
    otimizar(sys.argv[1], sys.argv[2])
    print("ok")
