import type { NextConfig } from "next";

/**
 * Configuração do Next.js. Autoriza o <Image> (next/image) a otimizar as
 * imagens vindas do CDN do Sanity e serve formatos modernos (AVIF/WebP).
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
