# -*- coding: utf-8 -*-
"""09 - Coleta os videos de cada playlist do canal e gera dados para o site.

Uso:
    python 09_playlists.py

Saidas:
    auditoria/playlists_itens.json   (playlist -> videos)
    src/data/playlists.ts            (playlists para a pagina /videos)
"""
import json
import os
import pickle
import sys
import time

from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

SAIDA_JSON = os.path.join(config.OUT_DIR, "playlists_itens.json")
SAIDA_TS = os.path.join(config.SITE_DIR, "src", "data", "playlists.ts")
LIMITE_SITE = 24


def log(msg):
    print(f"[09] {msg}", flush=True)


def get_client():
    with open(config.TOKEN_PATH, "rb") as f:
        creds = pickle.load(f)
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(config.TOKEN_PATH, "wb") as f:
            pickle.dump(creds, f)
    return build("youtube", "v3", credentials=creds, cache_discovery=False)


def itens_da_playlist(yt, playlist_id):
    ids, token = [], None
    while True:
        for tentativa in range(3):
            try:
                resp = (
                    yt.playlistItems()
                    .list(part="contentDetails", playlistId=playlist_id, maxResults=50, pageToken=token)
                    .execute()
                )
                break
            except HttpError as e:
                log(f"  erro em {playlist_id}: {e}; tentando de novo")
                time.sleep(2 + tentativa * 2)
        else:
            break
        ids += [it["contentDetails"]["videoId"] for it in resp.get("items", [])]
        token = resp.get("nextPageToken")
        if not token:
            break
    return ids


def main():
    config.ensure_out_dir()
    bruto = json.load(open(config.CANAL_BRUTO, encoding="utf-8"))
    playlists = bruto.get("playlists", [])
    yt = get_client()

    saida = []
    for i, pl in enumerate(playlists, 1):
        if not pl.get("itemCount"):
            continue
        ids = itens_da_playlist(yt, pl["id"])
        saida.append(
            {
                "id": pl["id"],
                "titulo": pl.get("title"),
                "descricao": (pl.get("description") or "").strip(),
                "total": len(ids),
                "videos": ids,
            }
        )
        log(f"{i}/{len(playlists)} - {pl.get('title')} ({len(ids)} videos)")

    with open(SAIDA_JSON, "w", encoding="utf-8") as f:
        json.dump(saida, f, ensure_ascii=False, indent=2)

    # Dados para o site (ordenados por quantidade de videos)
    do_site = sorted([p for p in saida if p["total"] >= 3], key=lambda p: -p["total"])[:LIMITE_SITE]
    ts = (
        "// GERADO AUTOMATICAMENTE por ferramentas/auditoria/09_playlists.py\n"
        "// Nao edite a mao: rode a auditoria novamente para atualizar.\n"
        "export interface Playlist {\n"
        "  id: string\n  titulo: string\n  descricao: string\n  total: number\n  url: string\n}\n\n"
        "export const playlists: Playlist[] = "
        + json.dumps(
            [
                {
                    "id": p["id"],
                    "titulo": p["titulo"],
                    "descricao": p["descricao"][:220],
                    "total": p["total"],
                    "url": f"https://www.youtube.com/playlist?list={p['id']}",
                }
                for p in do_site
            ],
            ensure_ascii=False,
            indent=2,
        )
        + "\n"
    )
    with open(SAIDA_TS, "w", encoding="utf-8") as f:
        f.write(ts)

    log(f"playlists com itens: {len(saida)} | no site: {len(do_site)}")
    log(f"salvo: {SAIDA_JSON} e {SAIDA_TS}")


if __name__ == "__main__":
    main()
