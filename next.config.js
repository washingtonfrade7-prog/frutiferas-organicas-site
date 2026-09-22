/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exportação estática para hospedagem compartilhada (Hostinger)
  output: 'export',
  images: {
    // Em export estático o otimizador do Next não roda; servimos as imagens otimizadas em /public
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
}

module.exports = nextConfig
