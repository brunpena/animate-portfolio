import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Todas as imagens saem em WebP, em tamanhos proporcionais à tela
    formats: ["image/webp"],
    // As imagens de /public quase nunca mudam: cache de 31 dias para as versões otimizadas
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
