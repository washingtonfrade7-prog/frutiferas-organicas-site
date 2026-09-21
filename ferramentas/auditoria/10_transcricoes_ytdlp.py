# -*- coding: utf-8 -*-
"""10 - Amplia as transcricoes via yt-dlp (somente legendas, sem baixar video).

Coleta legendas automaticas/manuais em portugues para os principais videos
de cada frutifera que ainda nao possuem transcricao local.

Uso:
    python 10_transcricoes_ytdlp.py [--por-fruta 2] [--sleep 4]

Atualiza: auditoria/transcricoes.json
"""
import argparse
import json
import os
import re
import subprocess
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

RE_TIME = re.compile(r"^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->")
RE_TAG = re.compile(r"<[^>]+>")


def limpar_vtt(conteudo):
    linhas = []
    for linha in conteudo.splitlines():
        linha = linha.strip()
        if not linha or linha.upper().startswith("WEBVTT"):
            continue
        if linha.startswith("Kind:") or linha.startswith("Language:") or linha.isdigit():
            continue
        if RE_TIME.match(linha):
            continue
        linha = RE_TAG.sub("", linha)
        if linha:
            linhas.append(linha)
    saida = []
    for l in linhas:
        if not saida or saida[-1] != l:
            saida.append(l)
    return " ".join(saida)


def baixar_legenda(video_id, pasta):
    cmd = [
        sys.executable, "-m", "yt_dlp", "--no-warnings", "--skip-download",
        "--write-subs", "--write-auto-subs", "--sub-langs", "pt",
        "--sub-format", "vtt", "-o", os.path.join(pasta, "%(id)s.%(ext)s"),
        f"https://www.youtube.com/watch?v={video_id}",
    ]
    try:
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=90)
    except Exception:
        return None
    for nome in os.listdir(pasta):
        if nome.startswith(video_id) and nome.endswith(".vtt"):
            caminho = os.path.join(pasta, nome)
            try:
                with open(caminho, encoding="utf-8", errors="ignore") as f:
                    texto = limpar_vtt(f.read())
                os.remove(caminho)
                return texto or None
            except Exception:
                return None
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--por-fruta", type=int, default=2)
    ap.add_argument("--sleep", type=float, default=4.0)
    args = ap.parse_args()

    config.ensure_out_dir()
    frutas = json.load(open(config.FRUTAS_JSON, encoding="utf-8"))
    transcricoes = json.load(open(config.TRANSCRICOES, encoding="utf-8")) if os.path.exists(config.TRANSCRICOES) else {}

    pasta = os.path.join(config.OUT_DIR, "_subs")
    os.makedirs(pasta, exist_ok=True)

    alvos = []
    for fruta in frutas:
        faltando = [v["id"] for v in fruta.get("videos", []) if v["id"] not in transcricoes][: args.por_fruta]
        for vid in faltando:
            if vid not in alvos:
                alvos.append(vid)

    print(f"[10] videos alvo: {len(alvos)}", flush=True)
    novos = 0
    for i, vid in enumerate(alvos, 1):
        texto = baixar_legenda(vid, pasta)
        if texto:
            transcricoes[vid] = {"texto": texto, "caracteres": len(texto), "arquivo": f"{vid}.pt.vtt"}
            novos += 1
            print(f"[10] {i}/{len(alvos)} OK {vid} ({len(texto)} chars)", flush=True)
        else:
            print(f"[10] {i}/{len(alvos)} -- {vid} sem legenda", flush=True)
        time.sleep(args.sleep)

    with open(config.TRANSCRICOES, "w", encoding="utf-8") as f:
        json.dump(transcricoes, f, ensure_ascii=False, indent=2)
    print(f"[10] novas transcricoes: {novos} | total: {len(transcricoes)}", flush=True)


if __name__ == "__main__":
    main()
