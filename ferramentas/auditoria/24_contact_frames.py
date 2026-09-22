# -*- coding: utf-8 -*-
"""Folha de contato: linhas = frutifera, colunas = frames."""
import os
import sys

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

FRAMES = os.path.join(config.OUT_DIR, "_frames2")
SLUGS = [
    "uvaia", "uva-brs-vitoria", "uva-isabel", "saborosa-pytaya-do-serrado",
    "roma", "pitanga-do-cerrado", "manga-uba", "jambo-rosa", "jabuticaba-sabara",
    "pinha", "limao-imperial", "limao-cravo-caipira", "longan",
]
CW, CH, LBL = 150, 84, 14
POR_FOLHA = 5


def main():
    for k in range((len(SLUGS) + POR_FOLHA - 1) // POR_FOLHA):
        lote = SLUGS[k * POR_FOLHA:(k + 1) * POR_FOLHA]
        ncols = 14
        sh = Image.new("RGB", (ncols * CW, len(lote) * (CH + LBL)), (235, 235, 235))
        d = ImageDraw.Draw(sh)
        for r, slug in enumerate(lote):
            pasta = os.path.join(FRAMES, slug)
            arquivos = sorted(f for f in os.listdir(pasta) if f.endswith(".jpg")) if os.path.isdir(pasta) else []
            for c, arq in enumerate(arquivos[:ncols]):
                x, y = c * CW, r * (CH + LBL)
                try:
                    sh.paste(Image.open(os.path.join(pasta, arq)).convert("RGB").resize((CW, CH), Image.LANCZOS), (x, y))
                except Exception:
                    pass
                d.text((x + 2, y + 2), f"{c:02d}", fill=(255, 0, 0))
            d.text((2, r * (CH + LBL) + CH + 1), f"{slug}  ({len(arquivos)} frames)", fill=(0, 0, 0))
        saida = os.path.join(FRAMES, f"sheet_{k+1}.jpg")
        sh.save(saida, "JPEG", quality=88)
        print("salvo:", saida)


if __name__ == "__main__":
    main()
