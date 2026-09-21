# Imagens das frutíferas

Coloque aqui as fotos das frutíferas (opcional). O nome do arquivo deve corresponder ao `slug`
da fruta, por exemplo:

- `jabuticaba.jpg`
- `pitanga-preta.jpg`
- `araca-boi.jpg`

Para exibir a imagem, adicione o campo `imagem` no objeto da fruta em
`src/data/frutiferas.ts`:

```ts
imagem: '/frutiferas/jabuticaba.jpg',
```

Enquanto não houver imagem, o site usa um visual de gradiente com o nome da fruta.
