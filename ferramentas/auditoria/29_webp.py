# -*- coding: utf-8 -*-
"""Converte as imagens do site para WebP (mantendo qualidade visual).

- public/frutiferas/*.jpg  -> .webp
- public/banners/*.jpg|png -> .webp
- public/logo.png          -> public/logo.webp

Os JPG/PNG originais sao removidos apos a conversao (o codigo e atualizado
para apontar para os .webp).
"""
import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

PUBLIC = os.path.join(config.SITE_DIR, "public")


def converter(src, dest, qualidade=82):
    im = Image.open(src).convert("RGBA" if src.lower().endswith(".png") else "RGB")
    im.save(dest, "WEBP", quality=qualidade, method=6)
    return os.path.getsize(src), os.path.getsize(dest)


def main():
    total_antes = total_depois = 0
    convertidos = 0

    # /frutiferas
    pasta = os.path.join(PUBLIC, "frutiferas")
    for nome in sorted(os.listdir(pasta)):
        if not nome.lower().endswith(".jpg"):
            continue
        src = os.path.join(pasta, nome)
        dest = os.path.join(pasta, nome.rsplit(".", 1)[0] + ".webp")
        a, d = converter(src, dest)
        total_antes += a
        total_depois += d
        convertidos += 1
        os.remove(src)

    # /banners
    pasta = os.path.join(PUBLIC, "banners")
    if os.path.isdir(pasta):
        for nome in sorted(os.listdir(pasta)):
            if nome.lower().endswith((".jpg", ".jpeg", ".png")):
                src = os.path.join(pasta, nome)
                dest = os.path.join(pasta, nome.rsplit(".", 1)[0] + ".webp")
                a, d = converter(src, dest)
                total_antes += a
                total_depois += d
                convertidos += 1
                os.remove(src)

    # logo
    logo = os.path.join(PUBLIC, "logo.png")
    if os.path.exists(logo):
        dest = os.path.join(PUBLIC, "logo.webp")
        a, d = converter(logo, dest, qualidade=88)
        total_antes += a
        total_depois += d
        convertidos += 1

    print(f"convertidos: {convertidos}")
    print(f"antes: {total_antes/1024/1024:.2f} MB -> depois: {total_depois/1024/1024:.2f} MB")
    if total_antes:
        print(f"reducao: {100*(1-total_depois/total_antes):.1f}%")


if __name__ == "__main__":
    main()
