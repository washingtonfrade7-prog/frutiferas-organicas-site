# -*- coding: utf-8 -*-
"""Baixa thumbnails de videos candidatos e monta folha de contato para revisao."""
import os
import ssl
import sys
import urllib.request

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
DEST = os.path.join(config.OUT_DIR, "_thumbs2")
os.makedirs(DEST, exist_ok=True)

CAND = {
    "uvaia": ["_vdc0qTuUvs", "HeYVx_ZhiyY", "ed7YcwyraRg", "TIOm6rxMkUs"],
    "uva-brs-vitoria": ["tNpXoFSN-kc", "Qv-oRWc_E5s", "I8mGDAFHoZ8"],
    "uva-isabel": ["LmtqJKnzuNY", "GXIdBtmzaeA", "tNpXoFSN-kc", "JxLY-utukJ0"],
    "saborosa-pytaya-do-serrado": ["zfjVmCKMUzc", "fPR-HixXFVg", "RH6sVtzQ32o"],
    "roma": ["xE9LweMa0MI", "hQTt1OGVOdc", "2pYXg2Pr21U"],
    "pinha-dos-astecas": ["49AIBxWlwm8", "S8oWJfVm4yE", "VBPLpq27hB8", "_qw-gbXyIRk"],
    "pitanga-do-cerrado": ["RFcR74X7y6k", "FmRBdQRD4Rc", "vs_hfeyUvZ0", "V-wH4Bb1kWU"],
    "pinha": ["49AIBxWlwm8", "S8oWJfVm4yE", "VBPLpq27hB8", "_qw-gbXyIRk"],
    "manga-uba": ["DxI6WyPKNNI", "kT7l4rqt8mI", "xbqxv5xNdh0", "-otVLmVX7OI"],
    "limao-imperial": ["dLDvSKQaKb4", "LtxsxIBlxmI", "s89DcLVTico", "RXkby8W0qEQ"],
    "limao-cravo-caipira": ["dLDvSKQaKb4", "LtxsxIBlxmI", "s89DcLVTico", "RXkby8W0qEQ"],
    "jambo-rosa": ["aCCjNdeJ7Ns", "t2RjNcj8zCc", "8Pt-hv4rnmE"],
    "jabuticaba-sabara": ["k5TSZVIdeuw", "Kv5XfW0Mkks", "2raa1E2ST7Y", "gg6k7TekAzQ"],
    "longan": ["L4_0nhrIPzc", "wpLy8X-f4dk", "0gsK52N31uk"],
}


def baixar_thumb(vid, dest):
    for q in ("maxresdefault", "hqdefault"):
        url = f"https://i.ytimg.com/vi/{vid}/{q}.jpg"
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=25, context=CTX) as r:
                dados = r.read()
            if len(dados) > 3000:
                open(dest, "wb").write(dados)
                return True
        except Exception:
            continue
    return False


def main():
    itens = []
    for slug, vids in CAND.items():
        for i, v in enumerate(vids):
            p = os.path.join(DEST, f"{slug}__{i}__{v}.jpg")
            if not os.path.exists(p) and not baixar_thumb(v, p):
                print(f"sem thumb: {slug} {v}")
                continue
            itens.append((slug, i, v, p))
    print("thumbs:", len(itens))

    COLS = 4
    CW, CH, LBL = 320, 180, 16
    por_folha = COLS * 6
    for k in range((len(itens) + por_folha - 1) // por_folha):
        lote = itens[k * por_folha:(k + 1) * por_folha]
        linhas = (len(lote) + COLS - 1) // COLS
        sh = Image.new("RGB", (COLS * CW, linhas * (CH + LBL)), (240, 240, 240))
        d = ImageDraw.Draw(sh)
        for idx, (slug, i, v, p) in enumerate(lote):
            c, r = idx % COLS, idx // COLS
            x, y = c * CW, r * (CH + LBL)
            try:
                sh.paste(Image.open(p).convert("RGB").resize((CW, CH), Image.LANCZOS), (x, y))
            except Exception:
                pass
            d.text((x + 3, y + CH + 2), f"{slug} #{i} {v}", fill=(0, 0, 0))
        saida = os.path.join(DEST, f"sheet_{k+1}.jpg")
        sh.save(saida, "JPEG", quality=86)
        print("salvo:", saida)


if __name__ == "__main__":
    main()
