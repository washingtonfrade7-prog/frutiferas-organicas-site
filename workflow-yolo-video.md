# Workflow — YOLO-World nos vídeos do canal

Como usar **detecção de objetos** para achar sozinho, dentro dos vídeos brutos, os três elementos
que mais importam numa aula de cultivo:

1. **Gemas** (broto/olho dormente que vira enxerto ou nova brotação);
2. **Pulgões** (e outras pragas) sobre folha e broto;
3. **Corte em "V"** da enxertia (o corte em bisel no garfo).

O objetivo não é "vigilância": é **marcar o quadro certo** para virar close, thumbnail ou prova no
vídeo (caixa/zoom no ponto exato), sem assistir às horas de bruto no olho.

> Roda no `.venv` do projeto de automação (`C:\Users\Micro\Downloads\Projeto automação youtube`),
> que já tem `ultralytics`, `opencv-python` e `moviepy`. Os pesos **YOLO-World** já estão na pasta:
> `yolov8l-world.pt` (mais preciso) e `yolov8s-world.pt` (mais rápido).

---

## 1. Por que YOLO-World (e quando treinar o próprio modelo)

| Situação | Caminho | Arquivo |
|---|---|---|
| **Não tenho dataset rotulado** | **YOLO-World** — detecta por **texto**, sem treino | `yolov8l-world.pt` |
| **Classe fixa e recorrente** (fruta, praga específica) | **Fine-tune** com as próprias fotos | `treinador_makesense.py` → `models/frutas_canal.pt` |

YOLO-World aceita **prompts em texto** (`set_classes`). É o jeito certo de começar: em minutos você
testa "gemas", "pulgões" e "corte em V" sem rotular nada. Quando o resultado ficar bom e a classe
for fixa, aí vale treinar um modelo enxuto com `fotos_para_treinar/`.

**Prompt em inglês funciona melhor** (o modelo foi treinado assim). Use frases descritivas:

| Alvo | Prompts que funcionam |
|---|---|
| **Gemas** | `a green bud on a woody stem` · `grafting bud` · `axillary bud` · `swollen bud on branch` |
| **Pulgões** | `a cluster of aphids on a leaf` · `aphid` · `small insects on plant` |
| **Corte em "V"** | `V-shaped cut on a branch` · `grafting cut` · `wound on a stem` · `bevel cut on wood` |

---

## 2. Passo 1 — tirar quadros candidatos do vídeo

Não rode o modelo em 30 fps à toa. Varra **1 quadro a cada 0,5–1 s** (a cena não muda tanto assim) e
guarde em `temp_frames/`.

```python
import cv2, os

def extrair_frames(video, destino, passo_seg=1.0):
    os.makedirs(destino, exist_ok=True)
    cap = cv2.VideoCapture(video)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    passo = int(fps * passo_seg)
    i = salvo = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if i % passo == 0:
            cv2.imwrite(os.path.join(destino, f"f{salvo:05d}.jpg"), frame)
            salvo += 1
        i += 1
    cap.release()
    return salvo
```

> Alternativa em uma linha com ffmpeg (mais rápido):
> `ffmpeg -i video.mp4 -vf fps=1 temp_frames/f%05d.jpg`

---

## 3. Passo 2 — rodar o YOLO-World com os prompts

```python
from ultralytics import YOLOWorld
import os

PROMPTS = [
    "a green bud on a woody stem",
    "a cluster of aphids on a leaf",
    "a V-shaped cut on a branch",
]

modelo = YOLOWorld("yolov8l-world.pt")
modelo.set_classes(PROMPTS)

def detectar(pasta):
    achados = []
    for nome in sorted(os.listdir(pasta)):
        if not nome.lower().endswith(".jpg"):
            continue
        r = modelo.predict(os.path.join(pasta, nome), conf=0.25, imgsz=1280, verbose=False)[0]
        for caixa in r.boxes:
            achados.append({
                "frame": nome,
                "classe": PROMPTS[int(caixa.cls)],
                "conf": float(caixa.conf),
                "xyxy": [round(v, 1) for v in caixa.xyxy[0].tolist()],
            })
    return achados
```

Pontos que decidem a qualidade:

- **`imgsz=1280`** (não 640): gema e pulgão são **pequenos**; em 640 o modelo não vê.
- **`conf=0.25`** para varrer largo; depois filtre. Suba para **0.4** se vier muito falso positivo.
- **`iou=0.5`** (padrão) resolve caixas sobrepostas.
- **GPU:** se o `.venv` enxergar CUDA (`torch.cuda.is_available()`), o YOLO-World L roda em tempo real.
  Em CPU, use `yolov8s-world.pt` e varra menos quadros.

---

## 4. Passo 3 — limpar e consolidar (evitar 200 caixas do mesmo broto)

Uma gema aparece em dezenas de quadros seguidos. Consolide por **IoU + proximidade temporal** para
sobrar "um evento por gema":

```python
def iou(a, b):
    xa, ya = max(a[0], b[0]), max(a[1], b[1])
    xb, yb = min(a[2], b[2]), min(a[3], b[3])
    inter = max(0, xb - xa) * max(0, yb - ya)
    area_a = (a[2]-a[0]) * (a[3]-a[1])
    area_b = (b[2]-b[0]) * (b[3]-b[1])
    return inter / (area_a + area_b - inter + 1e-6)

def consolidar(achados, limiar=0.5):
    # mantém só a maior confiança de cada grupo sobreposto, ordenando por confiança
    achados = sorted(achados, key=lambda d: -d["conf"])
    finais = []
    for d in achados:
        if all(iou(d["xyxy"], f["xyxy"]) < limiar for f in finais):
            finais.append(d)
    return finais
```

Descarte caixas **pequenas demais** (ruído) e **grandes demais** (o modelo confundiu a planta toda):

```python
# fração da área do quadro (quadro 1920x1080)
area_frame = 1920 * 1080
achados = [d for d in achados
           if 0.001 <= ((d["xyxy"][2]-d["xyxy"][0])*(d["xyxy"][3]-d["xyxy"][1])) / area_frame <= 0.6]
```

---

## 5. Passo 4 — saída útil: folha de contato + timeline JSON

Dois artefatos, no padrão já usado no projeto (`validacao_contact_sheet*.jpg`,
`validacao_timeline*.json`):

**a) Folha de contato** — recorta cada acerto e monta uma grade, para revisar num olhar:

```python
import cv2, numpy as np, math

def folha_de_contato(achados, pasta, saida="validacao_yolo.jpg", por_linha=5):
    recortes = []
    for d in achados[:50]:
        img = cv2.imread(os.path.join(pasta, d["frame"]))
        x1, y1, x2, y2 = map(int, d["xyxy"])
        margem = 20
        recorte = img[max(0, y1-margem):y2+margem, max(0, x1-margem):x2+margem]
        recorte = cv2.resize(recorte, (240, 240))
        cv2.putText(recorte, f'{d["classe"][:14]} {d["conf"]:.2f}', (5, 20),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        recortes.append(recorte)
    linhas = math.ceil(len(recortes) / por_linha)
    grade = np.zeros((linhas*240, por_linha*240, 3), dtype=np.uint8)
    for i, r in enumerate(recortes):
        l, c = divmod(i, por_linha)
        grade[l*240:(l+1)*240, c*240:(c+1)*240] = r
    cv2.imwrite(saida, grade)
```

**b) Timeline JSON** — lista ordenada de `{segundo, classe, confiança, xyxy}` para o editor pular
direto ao ponto bom:

```python
import json
def salvar_timeline(achados, fps_amostragem, saida="validacao_timeline_yolo.json"):
    for d in achados:
        d["segundo"] = int(d["frame"].replace("f", "").replace(".jpg", "")) * fps_amostragem
    json.dump(sorted(achados, key=lambda d: d["segundo"]),
              open(saida, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
```

---

## 6. Passo 5 — desenhar no vídeo (quando quiser mostrar a marcação)

Para inserir a caixa/zoom no vídeo final, reabra o quadro e desenhe, ou use o `r.plot()` do
Ultralytics (devolve o quadro já anotado):

```python
r = modelo.predict("quadro.jpg", conf=0.35, imgsz=1280, verbose=False)[0]
cv2.imwrite("quadro_anotado.jpg", r.plot())
```

Para o **zoom no ponto** (o que prende no Short), recorte a caixa com margem e redimensione para
1080p antes de encaixar na timeline. O `moviepy`/`editor.py` do projeto já faz o encaixe.

---

## 7. Custo e limites (para não se decepcionar)

- **Gemas e pulgões são minúsculos.** Sem `imgsz=1280` e, de preferência, **um recorte de ROI**
  (o galho em foco) antes da detecção, o resultado é fraco.
- **YOLO-World é open-vocabulary, não mágico.** Ele erra em oclusão (folha na frente) e em ângulo
  ruim. Para uso de produção em **uma** praga/órgão específico, **fine-tune** com
  `fotos_para_treinar/` → `models/frutas_canal.pt` (o pipeline já existe em
  `treinador_makesense.py`).
- **CPU x GPU:** sem CUDA, rode só `yolov8s-world.pt` e 1 quadro a cada 2 s.
- **Sempre revise** a folha de contato antes de publicar — o modelo marca, você aprova.

---

## 8. Checklist

- [ ] Quadros extraídos em `temp_frames/` (1 a cada 0,5–1 s)?
- [ ] Prompts em inglês, descritivos, um por alvo?
- [ ] `imgsz=1280` (e ROI quando o alvo é gema/pulgão)?
- [ ] Caixas consolidadas por IoU e filtradas por área?
- [ ] Folha de contato + timeline JSON geradas e revisadas?
- [ ] Classe fixa com muitos erros? → treinar `models/frutas_canal.pt` e comparar.
