# -*- coding: utf-8 -*-
"""04 - Normaliza a auditoria: taxonomia de frutiferas, tipos de video e keywords.

Uso:
    python 04_normalizar.py

Entrada: auditoria/canal_bruto.json, auditoria/transcricoes.json
Saida:   auditoria/frutas.json, auditoria/videos.json, auditoria/keywords.json
"""
import json
import os
import re
import sys
import unicodedata
from collections import Counter, defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

# ---------------------------------------------------------------------------
# Taxonomia de frutiferas (aliases sao comparados sem acento e em minusculas)
# ---------------------------------------------------------------------------
FRUTAS = [
    {"slug": "jabuticaba", "nome": "Jabuticaba", "nomeCientifico": "Plinia cauliflora", "categorias": ["nativas", "vaso"], "aliases": ["jabuticaba", "jabuticabeira", "jabuticaba hibrida", "jabuticaba branca", "jabuticaba amarela", "jabuticaba azul"]},
    {"slug": "araca-vermelho", "nome": "Araçá Vermelho", "nomeCientifico": "Psidium cattleianum", "categorias": ["nativas", "vaso"], "aliases": ["araca vermelho", "araca-vermelho", "araca roxo"]},
    {"slug": "araca-amarelo", "nome": "Araçá Amarelo", "nomeCientifico": "Psidium cattleianum", "categorias": ["nativas", "vaso"], "aliases": ["araca amarelo", "araca do campo"]},
    {"slug": "araca-boi", "nome": "Araçá Boi (Fruta Iogurte)", "nomeCientifico": "Psidium guineense", "categorias": ["nativas", "raras", "vaso"], "aliases": ["araca boi", "fruta iogurte", "araca-boi"]},
    {"slug": "araca-pera", "nome": "Araçá Pera", "nomeCientifico": "Psidium acutangulum", "categorias": ["nativas", "raras"], "aliases": ["araca pera", "psidium acutangulun", "araca-pera"]},
    {"slug": "pitanga-preta", "nome": "Pitanga Preta", "nomeCientifico": "Eugenia uniflora", "categorias": ["nativas", "raras", "vaso"], "aliases": ["pitanga preta", "pitanga-preta", "black pitanga"]},
    {"slug": "pitanga", "nome": "Pitanga", "nomeCientifico": "Eugenia uniflora", "categorias": ["nativas", "vaso"], "aliases": ["pitanga", "pitangueira", "pitanga do cerrado"]},
    {"slug": "pitangatuba", "nome": "Pitangatuba", "nomeCientifico": "Eugenia selloi", "categorias": ["nativas", "raras"], "aliases": ["pitangatuba"]},
    {"slug": "grumixama", "nome": "Grumixama", "nomeCientifico": "Eugenia brasiliensis", "categorias": ["nativas", "vaso"], "aliases": ["grumixama", "grumixameira"]},
    {"slug": "grumixama-amarela", "nome": "Grumixama Amarela", "nomeCientifico": "Eugenia brasiliensis", "categorias": ["nativas", "raras", "vaso"], "aliases": ["grumixama amarela"]},
    {"slug": "bacupari", "nome": "Bacupari", "nomeCientifico": "Garcinia gardneriana", "categorias": ["nativas", "raras"], "aliases": ["bacupari", "bacupari de bico", "bacupari mirim", "bacupari do cerrado"]},
    {"slug": "bacupari-estalo", "nome": "Bacupari Estalo", "nomeCientifico": "Garcinia brasiliensis", "categorias": ["nativas", "raras"], "aliases": ["bacupari estalo", "bacupari de estalo"]},
    {"slug": "bacuri", "nome": "Bacuri", "nomeCientifico": "Platonia insignis", "categorias": ["nativas", "raras"], "aliases": ["bacuri", "bacuri pari"]},
    {"slug": "abiu-amarelo", "nome": "Abiu Amarelo", "nomeCientifico": "Pouteria caimito", "categorias": ["exoticas", "vaso"], "aliases": ["abiu"]},
    {"slug": "gabiroba", "nome": "Gabiroba", "nomeCientifico": "Campomanesia pubescens", "categorias": ["nativas", "vaso"], "aliases": ["gabiroba", "guabiroba"]},
    {"slug": "cereja-rio-grande", "nome": "Cereja do Rio Grande", "nomeCientifico": "Eugenia involucrata", "categorias": ["nativas", "raras", "vaso"], "aliases": ["cereja do rio grande", "cereja brasileira"]},
    {"slug": "uvaia", "nome": "Uvaia", "nomeCientifico": "Eugenia pyriformis", "categorias": ["nativas", "vaso"], "aliases": ["uvaia", "uvaia orvalho"]},
    {"slug": "goiaba", "nome": "Goiaba", "nomeCientifico": "Psidium guajava", "categorias": ["exoticas", "vaso"], "aliases": ["goiaba", "goiabeira", "goiaba tailandesa", "goiaba paluma", "goiaba amarela"]},
    {"slug": "pitaya", "nome": "Pitaya", "nomeCientifico": "Hylocereus undatus", "categorias": ["exoticas", "vaso"], "aliases": ["pitaya", "pitayas", "dragon fruit", "pitaia"]},
    {"slug": "graviola", "nome": "Graviola", "nomeCientifico": "Annona muricata", "categorias": ["exoticas", "vaso"], "aliases": ["graviola", "gravioleira"]},
    {"slug": "atemoia", "nome": "Atemoia", "nomeCientifico": "Annona x atemoya", "categorias": ["exoticas", "vaso"], "aliases": ["atemoia"]},
    {"slug": "pinha", "nome": "Pinha / Fruta do Conde", "nomeCientifico": "Annona squamosa", "categorias": ["exoticas"], "aliases": ["pinha", "fruta do conde", "biriba", "condessa"]},
    {"slug": "canistel", "nome": "Canistel (Fruta Ovo)", "nomeCientifico": "Pouteria campechiana", "categorias": ["exoticas", "raras"], "aliases": ["canistel", "fruta ovo"]},
    {"slug": "caja-manga", "nome": "Cajá Manga Anã", "nomeCientifico": "Spondias dulcis", "categorias": ["nativas", "vaso"], "aliases": ["caja manga", "caja-manga", "cajá manga"]},
    {"slug": "manga", "nome": "Manga", "nomeCientifico": "Mangifera indica", "categorias": ["exoticas"], "aliases": ["manga", "mangueira", "manga uba", "manga abacaxi"]},
    {"slug": "acerola", "nome": "Acerola", "nomeCientifico": "Malpighia emarginata", "categorias": ["exoticas", "vaso"], "aliases": ["acerola", "acerola okinawa"]},
    {"slug": "carambola", "nome": "Carambola", "nomeCientifico": "Averrhoa carambola", "categorias": ["exoticas", "vaso"], "aliases": ["carambola", "carambola mel"]},
    {"slug": "figo", "nome": "Figo", "nomeCientifico": "Ficus carica", "categorias": ["exoticas", "vaso"], "aliases": ["figo", "figueira"]},
    {"slug": "amora", "nome": "Amora", "nomeCientifico": "Rubus spp.", "categorias": ["exoticas", "vaso"], "aliases": ["amora", "amoreira"]},
    {"slug": "laranja", "nome": "Laranja", "nomeCientifico": "Citrus sinensis", "categorias": ["exoticas", "vaso"], "aliases": ["laranja", "laranja champagne", "laranja kinkan", "laranja abacaxi", "laranjeira"]},
    {"slug": "limao", "nome": "Limão", "nomeCientifico": "Citrus limon", "categorias": ["exoticas", "vaso"], "aliases": ["limao", "limao siciliano", "limao capeta", "limao cravo", "limao imperial", "limoeiro"]},
    {"slug": "nectarina", "nome": "Nectarina", "nomeCientifico": "Prunus persica", "categorias": ["exoticas", "vaso"], "aliases": ["nectarina"]},
    {"slug": "pessego", "nome": "Pêssego", "nomeCientifico": "Prunus persica", "categorias": ["exoticas", "vaso"], "aliases": ["pessego", "pessegueiro"]},
    {"slug": "pera", "nome": "Pera", "nomeCientifico": "Pyrus spp.", "categorias": ["exoticas", "vaso"], "aliases": ["pera", "pereira", "pera hossui", "pera smith", "nespera", "melao andino"]},
    {"slug": "dovyalis", "nome": "Dovyalis Doce", "nomeCientifico": "Dovyalis hebecarpa", "categorias": ["exoticas", "raras", "vaso"], "aliases": ["dovyalis"]},
    {"slug": "seriguela", "nome": "Seriguela", "nomeCientifico": "Spondias purpurea", "categorias": ["nativas"], "aliases": ["seriguela", "ciriguela"]},
    {"slug": "maracuja", "nome": "Maracujá", "nomeCientifico": "Passiflora spp.", "categorias": ["exoticas", "vaso"], "aliases": ["maracuja", "maracuja doce", "passiflora"]},
    {"slug": "fruta-do-milagre", "nome": "Fruta do Milagre", "nomeCientifico": "Synsepalum dulcificum", "categorias": ["raras"], "aliases": ["fruta do milagre", "fruta dos milagres"]},
    {"slug": "cabeludinha", "nome": "Cabeludinha", "nomeCientifico": "Myrciaria glazioviana", "categorias": ["nativas", "raras"], "aliases": ["cabeludinha"]},
    {"slug": "camu-camu", "nome": "Camu Camu", "nomeCientifico": "Myrciaria dubia", "categorias": ["nativas", "raras"], "aliases": ["camu camu", "camu-camu", "araca d agua", "araca dagua"]},
    {"slug": "longan", "nome": "Longan", "nomeCientifico": "Dimocarpus longan", "categorias": ["exoticas", "raras"], "aliases": ["longan", "longana", "olho do dragao"]},
    {"slug": "mangaba", "nome": "Mangaba", "nomeCientifico": "Hancornia speciosa", "categorias": ["nativas", "raras"], "aliases": ["mangaba"]},
    {"slug": "abacate", "nome": "Abacate", "nomeCientifico": "Persea americana", "categorias": ["exoticas"], "aliases": ["abacate", "abacateiro"]},
    {"slug": "caqui", "nome": "Caqui", "nomeCientifico": "Diospyros kaki", "categorias": ["exoticas", "vaso"], "aliases": ["caqui", "caquizeiro"]},
    {"slug": "cacau", "nome": "Cacau", "nomeCientifico": "Theobroma cacao", "categorias": ["exoticas"], "aliases": ["cacau", "cacaueiro"]},
    {"slug": "roma", "nome": "Romã", "nomeCientifico": "Punica granatum", "categorias": ["exoticas", "vaso"], "aliases": ["roma", "romazeira", "romã"]},
    {"slug": "maca", "nome": "Maçã Eva", "nomeCientifico": "Malus domestica", "categorias": ["exoticas"], "aliases": ["maca eva", "macieira", "maca"]},
]

TIPOS = {
    "colheita": ["colheita", "colhendo", "harvest", "degustacao", "degustando", "tasting", "brix", "colhida"],
    "plantio": ["como plantar", "plantio", "plantando", "how to plant", "growing guide", "cultivo", "como cultivar"],
    "poda": ["poda", "podar", "prune", "pruning", "podas"],
    "adubacao": ["adubacao", "adubar", "adubo", "fertiliz", "nutricao"],
    "cuidados": ["cuidado", "cuidar", "doenca", "pragas", "praga", "folhas caindo", "morrendo", "recuperar", "rega", "regar", "gotejador", "abelha", "formiga", "lagarta"],
    "floracao": ["floracao", "flor", "flower", "botao floral", "poliniza"],
    "gastronomia": ["receita", "mousse", "suco", "iogurte", "caipirinha", "licor", "geleia", "wine", "vitamina", "doce", "sorvete", "cha"],
    "tour": ["tour", "pomar", "terraco", "terrace", "tour pelo"],
}

STOPWORDS = set(
    """a o e de da do das dos em um uma para com por no na nos nas ao aos as os que se sua seu suas seus
    como mais muito mais sem sobre entre ate apos antes depois quando onde qual quais quem isso isto aquilo
    ja nao sim tambem so apenas cada todos todas todo toda outro outra outros outras este esta esse essa
    eu voce ele ela nos vos eles elas meu minha teu tua nosso nossa video canal inscreva se compartilhe
    like subscribe the and for with you your how what when where this that from into out our their they
    are was were will can just about aqui hoje agora ainda sempre nunca bem mal
    frutiferas frutifera organico organica vaso vasos planta plantar cultivo pomar colheita
    https http www youtube watch list facebook instagram com br organicas frutiferasorganicas
    frutiferasorganicasemvasos playlist videos aprenda tudo fazer facil rapido voce
    caminhoparaumavidamelhor jardim plantas""".split()
)

RE_URL = re.compile(r"https?://\S+|www\.\S+")
RE_DUR = re.compile(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?")
RE_WORD = re.compile(r"[a-zà-ÿ0-9]{3,}")


def limpar_urls(texto):
    return RE_URL.sub(" ", texto or "")


def normalizar(texto):
    if not texto:
        return ""
    texto = unicodedata.normalize("NFKD", texto.lower())
    return "".join(c for c in texto if not unicodedata.combining(c))


def dur_seg(valor):
    if valor is None:
        return 0
    if isinstance(valor, (int, float)):
        return int(valor)
    m = RE_DUR.match(str(valor))
    if not m:
        return 0
    h, mi, s = (int(x or 0) for x in m.groups())
    return h * 3600 + mi * 60 + s


def melhor_thumb(thumbs):
    if not thumbs:
        return None
    if isinstance(thumbs, dict):
        for chave in ["maxres", "standard", "high", "medium", "default"]:
            if chave in thumbs:
                t = thumbs[chave]
                return t.get("url") if isinstance(t, dict) else t
        # fallback: maior valor
        valores = [v.get("url") if isinstance(v, dict) else v for v in thumbs.values()]
        return valores[-1] if valores else None
    return None


def classificar_tipo(texto_norm):
    for tipo, chaves in TIPOS.items():
        for chave in chaves:
            if normalizar(chave) in texto_norm:
                return tipo
    return "outros"


def compilar_aliases():
    """Compila regex com limites de palavra para evitar falsos positivos
    (ex.: 'pera' em 'espera', 'maca' em 'macaco', 'roma' em 'aroma')."""
    compilados = {}
    for fruta in FRUTAS:
        padroes = []
        for alias in fruta["aliases"]:
            a = normalizar(alias)
            padroes.append(re.escape(a))
        compilados[fruta["slug"]] = re.compile(r"(?<![a-z0-9])(" + "|".join(padroes) + r")(?![a-z0-9])")
    return compilados


def extrair_keywords(texto, limite=14):
    palavras = [p for p in RE_WORD.findall(normalizar(texto)) if p not in STOPWORDS and len(p) > 2]
    return [p for p, _ in Counter(palavras).most_common(limite)]


def carregar_json(caminho, padrao):
    if os.path.exists(caminho):
        with open(caminho, encoding="utf-8") as f:
            return json.load(f)
    return padrao


def main():
    config.ensure_out_dir()
    bruto = carregar_json(config.CANAL_BRUTO, None)
    if not bruto:
        raise SystemExit("rode 01_coletar_canal.py antes")
    transcricoes = carregar_json(config.TRANSCRICOES, {})

    videos = bruto["videos"]
    print(f"[04] videos para normalizar: {len(videos)}", flush=True)

    aliases = compilar_aliases()
    por_fruta = defaultdict(list)
    videos_norm = []
    keywords_por_fruta = defaultdict(Counter)

    for v in videos:
        vid = v["id"]
        # Associacao de fruta: SOMENTE titulo (tags do canal sao genericas e
        # descricao contem bloco fixo com links; ambos inflam falsos positivos)
        texto_match = normalizar(v.get("title") or "")
        # Keywords usam titulo + tags + descricao (sem URLs) + transcricao
        texto_keywords = " ".join(
            [
                texto_match,
                " ".join(v.get("tags") or []),
                limpar_urls(v.get("description") or "")[:2000],
                transcricoes.get(vid, {}).get("texto", "")[:4000],
            ]
        )
        dur = dur_seg(v.get("duration"))
        tipo = classificar_tipo(texto_match)
        frutas_video = []
        for fruta in FRUTAS:
            if aliases[fruta["slug"]].search(texto_match):
                frutas_video.append(fruta["slug"])
                por_fruta[fruta["slug"]].append(vid)
                keywords_por_fruta[fruta["slug"]].update(extrair_keywords(texto_keywords, 10))

        videos_norm.append(
            {
                "id": vid,
                "titulo": v.get("title"),
                "tipo": tipo,
                "frutas": frutas_video,
                "duracaoSeg": dur,
                "curto": 0 < dur < 61,
                "definicao": v.get("definition"),
                "publicadoEm": v.get("publishedAt"),
                "views": v.get("viewCount", 0),
                "likes": v.get("likeCount", 0),
                "comentarios": v.get("commentCount", 0),
                "thumb": melhor_thumb(v.get("thumbnails")),
                "temTranscricao": vid in transcricoes,
            }
        )

    # Monta catalogo por fruta
    frutas_out = []
    for fruta in FRUTAS:
        ids = por_fruta.get(fruta["slug"], [])
        ids_unicos = list(dict.fromkeys(ids))
        if not ids_unicos:
            continue
        itens = [x for x in videos_norm if x["id"] in set(ids_unicos)]
        # relevancia: colheita/plantio primeiro, depois views
        ordem = {"colheita": 0, "plantio": 1, "poda": 2, "adubacao": 3, "cuidados": 4, "floracao": 5, "gastronomia": 6, "tour": 7, "outros": 8}
        itens.sort(key=lambda x: (ordem.get(x["tipo"], 9), -x["views"]))
        hero = next((x for x in itens if x["thumb"]), None)
        galeria = [x["thumb"] for x in itens if x["thumb"]][:6]
        frutas_out.append(
            {
                "slug": fruta["slug"],
                "nome": fruta["nome"],
                "nomeCientifico": fruta["nomeCientifico"],
                "categorias": fruta["categorias"],
                "aliases": fruta["aliases"],
                "totalVideos": len(itens),
                "videosColheita": sum(1 for x in itens if x["tipo"] == "colheita"),
                "videos": itens,
                "hero": hero,
                "galeria": galeria,
                "keywords": [k for k, _ in keywords_por_fruta[fruta["slug"]].most_common(12)],
            }
        )

    frutas_out.sort(key=lambda f: -f["totalVideos"])

    keywords_out = {f["slug"]: f["keywords"] for f in frutas_out}
    sem_fruta = [x for x in videos_norm if not x["frutas"]]

    with open(config.FRUTAS_JSON, "w", encoding="utf-8") as f:
        json.dump(frutas_out, f, ensure_ascii=False, indent=2)
    with open(config.VIDEOS_JSON, "w", encoding="utf-8") as f:
        json.dump(videos_norm, f, ensure_ascii=False, indent=2)
    with open(config.KEYWORDS_JSON, "w", encoding="utf-8") as f:
        json.dump(keywords_out, f, ensure_ascii=False, indent=2)

    print(f"[04] frutiferas com conteudo: {len(frutas_out)}", flush=True)
    print(f"[04] videos sem fruta identificada: {len(sem_fruta)}", flush=True)
    print(f"[04] salvo: {config.FRUTAS_JSON}", flush=True)


if __name__ == "__main__":
    main()
