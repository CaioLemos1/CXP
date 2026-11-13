import localFont from "next/font/local";

/** Fontes auto-hospedadas (sem requisições a terceiros, compatível com LGPD). */
export const bodoni = localFont({
  src: [
    { path: "../fonts/bodoni-moda-latin-wght-normal.woff2", style: "normal", weight: "400 900" },
    { path: "../fonts/bodoni-moda-latin-wght-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  preload: true,
  fallback: ["Didot", "Georgia", "serif"],
});

export const archivo = localFont({
  src: [{ path: "../fonts/archivo-latin-standard-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
