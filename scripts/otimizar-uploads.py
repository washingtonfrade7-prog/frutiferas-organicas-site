# -*- coding: utf-8 -*-
"""Otimiza as imagens enviadas pelo CMS (public/uploads) e atualiza as referencias.

- Converte jpg/jpeg/png/jfif para WebP 800x450 (recorte central) e remove o original.
- Atualiza content/frutiferas.json e content/artigos.json com os novos caminhos.
Roda no deploy (GitHub Actions) para que fotos enviadas pelo painel fiquem leves.
"""
import json
import os

from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOADS = os.path.join(RAIZ, "public", "uploads")


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


def main():
    if not os.path.isdir(UPLOADS):
        print("sem public/uploads")
        return
    mapa = {}
    for nome in sorted(os.listdir(UPLOADS)):
        ext = os.path.splitext(nome)[1].lower()
        if ext not in (".jpg", ".jpeg", ".png", ".jfif"):
            continue
        src = os.path.join(UPLOADS, nome)
        base = os.path.splitext(nome)[0]
        dest = os.path.join(UPLOADS, base + ".webp")
        try:
            otimizar(src, dest)
            os.remove(src)
            mapa[f"/uploads/{nome}"] = f"/uploads/{base}.webp"
            print("otimizado:", nome, "->", base + ".webp")
        except Exception as e:  # noqa: BLE001
            print("erro em", nome, ":", e)

    if not mapa:
        print("nada para otimizar")
        return

    for arq in ("content/frutiferas.json", "content/artigos.json"):
        p = os.path.join(RAIZ, arq)
        if not os.path.exists(p):
            continue
        t = open(p, encoding="utf-8").read()
        for antigo, novo in mapa.items():
            t = t.replace(antigo, novo)
        open(p, "w", encoding="utf-8").write(t)
    print("referencias atualizadas:", len(mapa))


if __name__ == "__main__":
    main()
