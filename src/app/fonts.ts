import localFont from "next/font/local";

/** Fontes auto-hospedadas (sem requisições a terceiros, compatível com LGPD). */
export const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display-latin-wght-normal.woff2", style: "normal", weight: "400 900" },
    { path: "../fonts/playfair-display-latin-wght-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const montserrat = localFont({
  src: [{ path: "../fonts/montserrat-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
