# -*- coding: utf-8 -*-
"""06 - Gera src/data/frutiferas-extras.ts a partir da auditoria.

As frutiferas que ja possuem ficha manual (src/data/frutiferas.ts) sao preservadas;
as demais recebem ficha gerada a partir dos dados reais do canal.

Uso:
    python 06_gerar_catalogo.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
SAIDA_TS = os.path.join(config.SITE_DIR, "src", "data", "frutiferas-extras.ts")

# Slugs que ja possuem ficha manual (nao sobrescrever)
MANUAIS = {
    "jabuticaba",
    "araca-vermelho",
    "pitanga-preta",
    "araca-boi",
    "bacupari-mirim",
    "bacupari-estalo",
    "abiu-amarelo",
    "gabiroba",
    "cereja-rio-grande",
    "grumixama-amarela",
}

MIN_VIDEOS = 4

PALETA = [
    "#2E5B3A", "#4B2E5C", "#B23A2E", "#C2703D", "#7A8B3A",
    "#8E2B2B", "#D9A62E", "#4A1B2E", "#3E6B5A", "#8F4C25",
    "#5C6B2E", "#A8452E", "#2E5B5B", "#6B4C2E", "#7A2E4B",
]

TIPOS_ROTULO = {
    "colheita": "colheita",
    "plantio": "plantio",
    "poda": "poda",
    "adubacao": "adubação",
    "cuidados": "cuidados",
    "floracao": "floração",
    "gastronomia": "gastronomia",
    "tour": "tour",
    "outros": "cultivo",
}


def arquivo_existe(nome):
    return os.path.exists(os.path.join(PUBLIC_FRUTAS, nome))


def gerar_entrada(fruta, indice):
    slug = fruta["slug"]
    nome = fruta["nome"]
    videos = fruta.get("videos", [])
    total = fruta.get("totalVideos", len(videos))

    # videos ordenados: colheita/plantio/poda primeiro (ja vem ordenado da auditoria)
    videos_out = []
    for v in videos[:8]:
        videos_out.append(
            {
                "id": v["id"],
                "titulo": v["titulo"],
                "tipo": v.get("tipo", "outros"),
            }
        )

    # galeria
    galeria = []
    for sufixo in ("-2", "-3"):
        if arquivo_existe(f"{slug}{sufixo}.jpg"):
            galeria.append(f"/frutiferas/{slug}{sufixo}.jpg")

    # dicas a partir de videos de tecnica
    dicas = []
    for v in videos:
        if v.get("tipo") in ("poda", "adubacao", "plantio", "cuidados") and v.get("titulo"):
            dicas.append(f"Assista no canal: {v['titulo']}")
        if len(dicas) >= 4:
            break
    if not dicas:
        dicas = [f"Veja no canal os vídeos de cultivo de {nome.lower()} em vaso."]

    tipos_presentes = sorted({TIPOS_ROTULO.get(v.get("tipo", "outros"), "cultivo") for v in videos})

    resumo = (
        f"{nome} cultivada em vaso. Reunimos {total} vídeos no canal Frutíferas Orgânicas "
        f"cobrindo {', '.join(tipos_presentes[:4])} desta frutífera."
    )

    descricao = [
        f"{nome} ({fruta['nomeCientifico']}) é uma frutífera cultivada em vaso e amplamente "
        f"documentada no canal Frutíferas Orgânicas. Ao todo, são {total} vídeos mostrando "
        f"{', '.join(tipos_presentes[:5])} na prática.",
        "Assista aos vídeos abaixo para ver o passo a passo real de cultivo, e confira as lojas "
        "parceiras para adquirir mudas e insumos.",
    ]

    return {
        "slug": slug,
        "nome": nome,
        "nomeCientifico": fruta["nomeCientifico"],
        "familia": "",
        "categorias": fruta.get("categorias", []),
        "resumo": resumo,
        "descricao": descricao,
        "origem": "",
        "porte": "",
        "luz": "Sol pleno",
        "rega": "Regular, sem encharcar",
        "solo": "Fértil, bem drenado e rico em matéria orgânica",
        "vaso": "A partir de 20 litros",
        "dificuldade": "Fácil",
        "tempoProducao": "Consulte os vídeos de cultivo",
        "frutificacao": "Consulte os vídeos de cultivo",
        "curiosidades": [],
        "dicas": dicas,
        "videos": videos_out,
        "imagem": f"/frutiferas/{slug}.jpg" if arquivo_existe(f"{slug}.jpg") else None,
        "galeria": galeria,
        "keywords": fruta.get("keywords", []),
        "cor": PALETA[indice % len(PALETA)],
        "destaque": False,
    }


def main():
    with open(config.FRUTAS_JSON, encoding="utf-8") as f:
        frutas = json.load(f)

    candidatas = [fr for fr in frutas if fr["slug"] not in MANUAIS and fr.get("totalVideos", 0) >= MIN_VIDEOS]
    candidatas.sort(key=lambda fr: -fr.get("totalVideos", 0))

    entradas = [gerar_entrada(fr, i) for i, fr in enumerate(candidatas)]

    # marca as mais fortes como destaque
    for entrada in entradas[:4]:
        entrada["destaque"] = True

    ts = (
        "// GERADO AUTOMATICAMENTE por ferramentas/auditoria/06_gerar_catalogo.py\n"
        "// Nao edite a mao: rode a auditoria novamente para atualizar.\n"
        "import type { Frutifera } from '@/data/frutiferas'\n"
        "import { ofertasPadrao } from '@/data/ofertas'\n\n"
        "const base: Omit<Frutifera, 'ofertas'>[] = "
        + json.dumps(entradas, ensure_ascii=False, indent=2)
        + "\n\nexport const frutiferasExtras: Frutifera[] = base.map((f) => ({ ...f, ofertas: ofertasPadrao() }))\n"
    )

    with open(SAIDA_TS, "w", encoding="utf-8") as f:
        f.write(ts)

    print(f"[06] frutiferas extras geradas: {len(entradas)}", flush=True)
    print(f"[06] salvo: {SAIDA_TS}", flush=True)


if __name__ == "__main__":
    main()
