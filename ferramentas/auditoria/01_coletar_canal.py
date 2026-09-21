# -*- coding: utf-8 -*-
"""01 - Coleta completa do canal via YouTube Data API (com fallback no catalogo local).

Uso:
    python 01_coletar_canal.py

Saida: auditoria/canal_bruto.json
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


def log(msg):
    print(f"[01] {msg}", flush=True)


def get_client():
    if not os.path.exists(config.TOKEN_PATH):
        raise SystemExit(f"token.pickle nao encontrado em {config.TOKEN_PATH}")
    with open(config.TOKEN_PATH, "rb") as f:
        creds = pickle.load(f)
    if creds and creds.expired and creds.refresh_token:
        log("renovando token expirado...")
        creds.refresh(Request())
        with open(config.TOKEN_PATH, "wb") as f:
            pickle.dump(creds, f)
    return build("youtube", "v3", credentials=creds, cache_discovery=False)


def listar_uploads(yt, playlist_id):
    ids, token = [], None
    while True:
        resp = (
            yt.playlistItems()
            .list(part="contentDetails", playlistId=playlist_id, maxResults=50, pageToken=token)
            .execute()
        )
        ids += [it["contentDetails"]["videoId"] for it in resp.get("items", [])]
        token = resp.get("nextPageToken")
        log(f"uploads: {len(ids)} videos...")
        if not token:
            break
    return ids


def listar_playlists(yt):
    playlists, token = [], None
    while True:
        resp = (
            yt.playlists()
            .list(part="snippet,contentDetails", channelId=config.CHANNEL_ID, maxResults=50, pageToken=token)
            .execute()
        )
        for it in resp.get("items", []):
            sn = it["snippet"]
            playlists.append(
                {
                    "id": it["id"],
                    "title": sn.get("title"),
                    "description": sn.get("description"),
                    "publishedAt": sn.get("publishedAt"),
                    "itemCount": it.get("contentDetails", {}).get("itemCount"),
                }
            )
        token = resp.get("nextPageToken")
        if not token:
            break
    return playlists


def coletar_videos(yt, ids):
    videos = []
    total = len(ids)
    for i in range(0, total, 50):
        lote = ids[i : i + 50]
        for tentativa in range(3):
            try:
                resp = (
                    yt.videos()
                    .list(part="snippet,contentDetails,statistics,status", id=",".join(lote), maxResults=50)
                    .execute()
                )
                break
            except HttpError as e:
                log(f"erro no lote {i}: {e}; tentando de novo...")
                time.sleep(2 + tentativa * 2)
        else:
            continue

        for it in resp.get("items", []):
            sn = it.get("snippet", {})
            cd = it.get("contentDetails", {})
            st = it.get("statistics", {})
            stt = it.get("status", {})
            videos.append(
                {
                    "id": it["id"],
                    "title": sn.get("title"),
                    "description": sn.get("description"),
                    "tags": sn.get("tags", []),
                    "publishedAt": sn.get("publishedAt"),
                    "thumbnails": sn.get("thumbnails", {}),
                    "duration": cd.get("duration"),
                    "definition": cd.get("definition"),
                    "caption": cd.get("caption"),
                    "viewCount": int(st.get("viewCount", 0) or 0),
                    "likeCount": int(st.get("likeCount", 0) or 0),
                    "commentCount": int(st.get("commentCount", 0) or 0),
                    "privacyStatus": stt.get("privacyStatus"),
                }
            )
        log(f"detalhes: {min(i + 50, total)}/{total}")
    return videos


def carregar_catalogo_local():
    if not os.path.exists(config.CATALOGO_PATH):
        return {}
    with open(config.CATALOGO_PATH, encoding="utf-8-sig") as f:
        data = json.load(f)
    base = {}
    for e in data.get("entries", []):
        if e and e.get("id"):
            base[e["id"]] = {
                "title": e.get("title"),
                "duration": e.get("duration"),
                "thumbnails": {t.get("height", 0): t.get("url") for t in e.get("thumbnails", [])},
            }
    return base


def main():
    config.ensure_out_dir()
    yt = get_client()

    log("buscando dados do canal...")
    ch = (
        yt.channels()
        .list(part="snippet,contentDetails,statistics,brandingSettings", id=config.CHANNEL_ID)
        .execute()
    )
    if not ch.get("items"):
        raise SystemExit("canal nao encontrado para o CHANNEL_ID informado")
    channel = ch["items"][0]
    uploads = channel["contentDetails"]["relatedPlaylists"]["uploads"]
    log(f"canal: {channel['snippet']['title']} | uploads: {uploads}")

    playlists = listar_playlists(yt)
    log(f"playlists: {len(playlists)}")

    ids = listar_uploads(yt, uploads)
    log(f"total de videos na playlist de uploads: {len(ids)}")

    videos = coletar_videos(yt, ids)

    # Fallback: completa o que a API nao retornou usando o catalogo local (yt-dlp)
    local = carregar_catalogo_local()
    vistos = {v["id"] for v in videos}
    faltantes = [i for i in ids if i not in vistos]
    for vid in faltantes:
        info = local.get(vid)
        if info:
            videos.append(
                {
                    "id": vid,
                    "title": info.get("title"),
                    "description": "",
                    "tags": [],
                    "publishedAt": None,
                    "thumbnails": {},
                    "duration": None,
                    "definition": None,
                    "caption": None,
                    "viewCount": 0,
                    "likeCount": 0,
                    "commentCount": 0,
                    "privacyStatus": None,
                    "_fallback": True,
                }
            )
    log(f"videos coletados: {len(videos)} (fallback: {len(faltantes)})")

    out = {
        "channel": {
            "id": channel["id"],
            "title": channel["snippet"]["title"],
            "description": channel["snippet"].get("description"),
            "customUrl": channel["snippet"].get("customUrl"),
            "publishedAt": channel["snippet"].get("publishedAt"),
            "thumbnails": channel["snippet"].get("thumbnails", {}),
            "banner": channel.get("brandingSettings", {}).get("image", {}),
            "subscribers": int(channel.get("statistics", {}).get("subscriberCount", 0) or 0),
            "videoCount": int(channel.get("statistics", {}).get("videoCount", 0) or 0),
            "viewCount": int(channel.get("statistics", {}).get("viewCount", 0) or 0),
        },
        "playlists": playlists,
        "videos": videos,
    }
    with open(config.CANAL_BRUTO, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    log(f"salvo: {config.CANAL_BRUTO}")


if __name__ == "__main__":
    main()
