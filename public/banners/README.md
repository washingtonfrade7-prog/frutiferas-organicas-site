# Banners da marca

Coloque aqui os banners gráficos personalizados da marca Frutíferas Orgânicas.

## Como usar

Os banners são exibidos pelo componente `src/components/BannerSlot.tsx`. Para usar uma imagem
real, passe a prop `imagem` com o caminho do arquivo, por exemplo:

```tsx
<BannerSlot
  titulo="Título do banner"
  subtitulo="Texto de apoio"
  ctaLabel="Ver oferta"
  ctaHref="https://link-de-afiliado"
  imagem="/banners/meu-banner.jpg"
/>
```

Se nenhuma imagem for informada, o componente renderiza um banner com gradiente da marca.

## Tamanhos sugeridos

- Banner largo (wide): 1600 x 500 px
- Banner compacto: 1600 x 300 px

Formatos aceitos: `.jpg`, `.png`, `.webp`.
