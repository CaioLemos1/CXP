import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/structured-data";
import { montserrat, playfair } from "./fonts";
import "./globals.css";

const title = "CXP Crédito & Investimentos | Antes do crédito, vem o conhecimento";
const description =
  "Soluções em crédito, consórcios, educação e planejamento financeiro em Porto Velho – RO. Converse com a CXP pelo WhatsApp sobre os seus objetivos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: "%s | CXP Crédito & Investimentos" },
  description,
  applicationName: siteConfig.name,
  keywords: [
    "CXP Crédito & Investimentos",
    "crédito Porto Velho",
    "consórcio Porto Velho",
    "educação financeira Rondônia",
    "planejamento financeiro",
    "estratégias patrimoniais",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "CXP Crédito & Investimentos" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0e1b2c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildOrganizationJsonLd(siteConfig);
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${montserrat.variable}`} data-scroll-behavior="smooth">
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-3 focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático gerado a partir da configuração
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
