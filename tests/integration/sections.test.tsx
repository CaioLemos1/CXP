// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { PressSection } from "@/components/sections/PressSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/config/site";

afterEach(cleanup);

const withMotion = (ui: React.ReactNode) => render(<MotionProvider>{ui}</MotionProvider>);

describe("WhatsAppButton", () => {
  it("aponta para o WhatsApp oficial com a mensagem padrão e abre em nova aba com segurança", () => {
    render(<WhatsAppButton trackingId="teste">Fale com um especialista</WhatsAppButton>);
    const link = screen.getByRole("link", { name: /fale com um especialista/i });
    const url = new URL(link.getAttribute("href") ?? "");
    expect(url.origin + url.pathname).toBe(`https://wa.me/${siteConfig.contact.whatsapp}`);
    expect(url.searchParams.get("text")).toBe(siteConfig.messages.default);
    expect(link).toHaveProperty("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
  });
});

describe("PressSection", () => {
  it("renderiza as seis matérias com link externo seguro e botão LER MATÉRIA", () => {
    withMotion(<PressSection />);
    const section = screen.getByRole("region", { name: /matérias publicadas no jornal news rondônia/i });
    const links = within(section).getAllByRole("link");
    expect(links).toHaveLength(6);
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^https:\/\/newsrondonia\.com\.br\/noticias\/2025\//);
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      expect(link.textContent).toMatch(/ler matéria/i);
    }
    expect(within(links[0] as HTMLElement).getByText("11/03/2025")).toBeTruthy();
  });
});

describe("SolutionsSection", () => {
  it("cada solução tem link de WhatsApp com mensagem contextual", () => {
    withMotion(<SolutionsSection />);
    const ctas = screen.getAllByRole("link", { name: /saiba mais/i });
    expect(ctas).toHaveLength(4);
    const messages = ctas.map((a) => new URL(a.getAttribute("href") ?? "").searchParams.get("text"));
    expect(new Set(messages).size).toBe(4);
    expect(messages[2]).toContain("Consórcios");
  });
});

describe("Footer", () => {
  it("exibe contatos oficiais, links legais e avisos financeiros", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /política de privacidade/i }).getAttribute("href")).toBe(
      "/politica-de-privacidade",
    );
    expect(screen.getByRole("link", { name: /termos e condições/i }).getAttribute("href")).toBe("/termos-e-condicoes");
    expect(screen.getByText(siteConfig.contact.email)).toBeTruthy();
    expect(screen.getByText(/consórcio não é investimento/i)).toBeTruthy();
    expect(screen.getByText(String(new Date().getFullYear()))).toBeTruthy();
    expect(screen.queryByText(/CNPJ/)).toBeNull();
  });
});
