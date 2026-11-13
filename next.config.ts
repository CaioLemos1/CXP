import type { NextConfig } from "next";

/**
 * Exportação 100% estática em /out quando:
 * - STATIC_EXPORT=1 (qualquer hospedagem estática), ou
 * - WORKERS_CI=1 / CF_PAGES=1 (variáveis injetadas automaticamente nos builds da Cloudflare).
 * Sem elas, o build usa o servidor do Next.js (ex.: Vercel), com otimização de imagens.
 */
const isStaticExport =
  process.env.STATIC_EXPORT === "1" || process.env.WORKERS_CI === "1" || process.env.CF_PAGES === "1";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: isStaticExport,
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders },
            {
              source: "/images/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
          ];
        },
      }),
};

export default nextConfig;
