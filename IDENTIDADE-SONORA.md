# Identidade sonora — Frutíferas Orgânicas

A **moda de viola** é a assinatura sonora do canal. Não é só "música de fundo": é o som que faz o
espectador reconhecer o vídeo antes de ver a imagem. Este documento define a identidade (o que é
fixo, o que varia) e o caminho concreto para montá-la. O mapa por cena de um vídeo específico está
em `TRILHA-MODA-DE-VIOLA.md`; aqui está o **sistema** que vale para todos.

> Não dá para compor/gravar a trilha automaticamente. O que este guia resolve: o que exatamente
> buscar, como testar, em que volume entra e como arquivar — para o som ficar coerente entre vídeos.

---

## 1. As três camadas do som

| Camada | O que é | Duração | Onde aparece |
|---|---|---|---|
| **Assinatura (sting)** | Frase curta de viola, sempre a mesma | 2–3 s | Abertura e encerramento de **todo** vídeo; intro/outro do curso |
| **Tema (bed)** | Loop instrumental de viola/violão | 30–90 s (em loop) | Sob a narração, do começo ao fim |
| **Ambiente** | Pássaros, água, folhas, tesoura | 1–3 s pontuais | Nas pausas, para dar vida ao pomar |

A assinatura é o que **não muda nunca**. O tema pode variar por série (plantio, poda, colheita…).
O ambiente é improviso, gravado no próprio pomar.

---

## 2. A assinatura (sting) — especificação

Desenho da frase, para o editor ou para quem for gravar:

- **Instrumento:** viola caipira (10 cordas) sozinha. Se não houver, violão de aço com afinação
  caipira.
- **Frase:** 3 notas **subindo** (ex.: tônica → terça → quinta), cordas soltas, deixando a última
  **vibrar e morrer** (sem corte seco).
- **Duração:** 2 a 3 segundos, com **fade out** de 0,4 s.
- **Andamento:** 70–84 BPM (moda de viola é narração, não dança).
- **Tom:** Ré maior ou Sol maior (brilhante, "de quintal", sem peso de música triste).
- **Textura:** uma viola só, sem bateria, sem baixo elétrico, sem palmas.
- **Assinatura de encerramento:** a **mesma frase invertida** (3 notas descendo), fechando a tônica.

Onde aplicar:

- [ ] Abertura de todo vídeo do canal (nos 3 primeiros segundos, antes da voz).
- [ ] Encerramento (o inverso), junto do CTA.
- [ ] Áudio de abertura/fechamento dos módulos do curso (pode virar MP3 junto do material).
- [ ] Bipe curto de conclusão em vídeos de aula ("fim do passo").

---

## 3. Temas por série (o que muda)

Cada série de vídeos tem um tema próprio, mas todos no mesmo "mundo" sonoro (viola + violão +
percussão leve). Assim o espectador sente a continuidade sem enjoar da mesma faixa.

| Série / momento | Clima do tema | Instrumentação | BPM |
|---|---|---|---|
| **Plantio** | Esperançoso, começo | Viola + violão, percussão de mão | 76–84 |
| **Adubação / solo** | Calmo, concentrado | Viola sola, quase só dedilhado | 66–74 |
| **Poda e condução** | Ritmado, firme | Viola + caixa leve (escovada) | 80–88 |
| **Colheita / resultado** | Alegre, festivo | Viola + violão + palmas + triângulo | 88–96 |
| **Multiplicação (mudas)** | Didático, curioso | Violão base + viola em resposta | 72–80 |
| **Calendário / lembretes** | Neutro, de fundo | Pad de violão, quase sem melodia | 60–68 |
| **Encerramento / CTA** | Emotivo, "de casa" | Viola sola, tema principal desacelerado | 64–70 |

> O **tema principal do canal** (aquele que toca na assinatura estendida de 30 s) deve ser o mesmo
> em todas as séries; só o arranjo muda. É o "jingle" da marca.

---

## 4. Onde conseguir (sem pagar direitos)

| Fonte | O que tem | Licença | Crédito |
|---|---|---|---|
| **YouTube Audio Library** | Instrumental sertanejo/viola, folk | YouTube livre / CC BY | Só quando indicado |
| **Pixabay Music** | Viola caipira, sertanejo, acoustic | Pixabay License | Não exige |
| **Free Music Archive** | Acervo amplo (CC BY / CC0) | Varia por faixa | Conferir faixa |
| **Musopen** | Domínio público | PD / CC0 | Não exige |
| **Gravação própria** | Viola/violão tocados por você | Sua | Nenhum |

> **Regra de ouro:** monetizar sem susto = **YouTube Audio Library** ou **Pixabay**. São as que não
> geram reivindicação. Moda de viola gravada por terceiros (duplas raiz) tem direitos autorais —
> não usar sem licença.

**Termos de busca:** `viola caipira instrumental` · `moda de viola instrumental` · `sertanejo raiz
instrumental` · `acoustic folk brazilian` · `chitarrina` · `country acoustic guitar` ·
`campo brasileiro`.

---

## 5. Mixagem (referência rápida)

| Elemento | Volume | Observação |
|---|---|---|
| Narração (voz) | **-6 a -3 dB** | Sempre o mais alto |
| Tema (bed) sob a voz | **-24 a -18 dB** | Fundo, nunca protagonista |
| Assinatura (sting) | **-12 dB** | Sem voz por cima |
| Tema no encerramento | **-15 dB** | Sobe quando a voz sai |
| Ambientes | **-20 dB** | Pontual |

**Ducking:** quando a voz entra, o tema cai sozinho (-10 dB). É o que separa vídeo amador de
profissional. Vale para o tema; a assinatura não leva ducking (entra limpa).

---

## 6. Arquivo e licença (prova de origem)

Nomeie e guarde tudo numa pasta `trilhas/`:

```
trilhas/
  assinatura-abertura.wav          (sting própria ou trecho editado)
  assinatura-encerramento.wav
  tema-canal-30s.mp3
  plantio-<autor>-<licenca>.mp3
  colheita-<autor>-<licenca>.mp3
  CREDITOS.md                      (fonte, autor, licença, URL, data)
```

`CREDITOS.md` deve listar, por arquivo: fonte, autor, licença, URL e data de download. Quando a
licença exigir, o crédito também vai na **descrição do vídeo**: `Música: [nome] — [autor] ([licença])`.

---

## 7. Checklist antes de publicar

- [ ] A assinatura (abertura/encerramento) é **a mesma** dos outros vídeos?
- [ ] O tema é da série certa (plantio, poda, colheita…)?
- [ ] A narração fica **claramente** acima do tema?
- [ ] Tem fade in na abertura e fade out no final?
- [ ] O tema não tem voz competindo com a narração?
- [ ] A licença é livre de reivindicação (Audio Library/Pixabay) ou é gravação própria?
- [ ] Fonte, autor e licença salvos em `trilhas/CREDITOS.md`?
- [ ] Crédito na descrição do vídeo, se a licença pedir?
