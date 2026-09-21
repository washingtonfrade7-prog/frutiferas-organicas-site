# -*- coding: utf-8 -*-
"""02 - Le as transcricoes .vtt do acervo local (D:\\Frutiferas_ColdStorage).

Uso:
    python 02_ler_transcricoes.py

Saida: auditoria/transcricoes.json  -> { videoId: {texto, caracteres, arquivo} }
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

RE_TIME = re.compile(r"^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->")
RE_TAG = re.compile(r"<[^>]+>")


def limpar_vtt(conteudo):
    linhas = []
    for linha in conteudo.splitlines():
        linha = linha.strip()
        if not linha:
            continue
        if linha.upper().startswith("WEBVTT"):
            continue
        if linha.startswith("Kind:") or linha.startswith("Language:"):
            continue
        if RE_TIME.match(linha):
            continue
        if linha.isdigit():
            continue
        linha = RE_TAG.sub("", linha)
        if linha:
            linhas.append(linha)
    # remove repeticoes consecutivas (comum em legendas automaticas)
    saida = []
    for l in linhas:
        if not saida or saida[-1] != l:
            saida.append(l)
    return " ".join(saida)


def main():
    config.ensure_out_dir()
    if not os.path.isdir(config.COLDSTORAGE_DIR):
        raise SystemExit(f"coldstorage nao encontrado: {config.COLDSTORAGE_DIR}")

    resultado = {}
    total = 0
    for nome in os.listdir(config.COLDSTORAGE_DIR):
        if not nome.lower().endswith(".vtt"):
            continue
        video_id = nome.split(".")[0]
        caminho = os.path.join(config.COLDSTORAGE_DIR, nome)
        try:
            with open(caminho, encoding="utf-8", errors="ignore") as f:
                texto = limpar_vtt(f.read())
        except Exception as e:
            print(f"[02] erro em {nome}: {e}", flush=True)
            continue
        if texto:
            resultado[video_id] = {
                "texto": texto,
                "caracteres": len(texto),
                "arquivo": nome,
            }
        total += 1
        if total % 50 == 0:
            print(f"[02] {total} arquivos .vtt processados...", flush=True)

    with open(config.TRANSCRICOES, "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)
    print(f"[02] transcricoes com texto: {len(resultado)} | salvo: {config.TRANSCRICOES}", flush=True)


if __name__ == "__main__":
    main()
