import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WHATSAPP = "https://wa.me/5569992579620";

test.describe("Landing page", () => {
  test("carrega com título, logo e hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CXP Crédito & Investimentos/);
    await expect(page.getByRole("banner").getByRole("img", { name: "CXP Crédito & Investimentos" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Estratégia, experiência e patrimônio");
    expect(await page.locator("h1").count()).toBe(1);
  });

  test("todas as seções obrigatórias existem na ordem da jornada", async ({ page }) => {
    await page.goto("/");
    const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual(["inicio", "servicos", "sobre", "diferenciais", "imprensa", "contato"]);
    await expect(page.getByRole("heading", { name: "Nossas Soluções" })).toBeAttached();
    await expect(page.getByRole("heading", { name: "Por que escolher a CXP?" })).toBeAttached();
    await expect(page.getByRole("heading", { name: /matérias publicadas no jornal news rondônia/i })).toBeAttached();
  });

  test("CTA principal e demais botões abrem o WhatsApp oficial em nova aba", async ({ page }) => {
    await page.goto("/");
    const ctas = page.locator('a[href^="https://wa.me/"]');
    expect(await ctas.count()).toBeGreaterThanOrEqual(6);
    for (const link of await ctas.all()) {
      const href = (await link.getAttribute("href")) ?? "";
      expect(href.startsWith(WHATSAPP)).toBe(true);
      expect(new URL(href).searchParams.get("text")).toMatch(/^Olá! Conheci a CXP pelo site/);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
    const final = page.locator('[data-cta="cta-final"]');
    await expect(final).toContainText(/fale com a cxp/i);
    expect(new URL((await final.getAttribute("href")) ?? "").searchParams.get("text")).toBe(
      "Olá! Conheci a CXP pelo site e gostaria de conversar com a equipe sobre planejamento financeiro e soluções para meus objetivos.",
    );
  });

  test("clique no WhatsApp abre um popup apontando para wa.me", async ({ page, context }) => {
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, body: "ok" }));
    await page.goto("/");
    const [popup] = await Promise.all([page.waitForEvent("popup"), page.locator('[data-cta="cta-final"]').click()]);
    expect(popup.url()).toContain("wa.me/5569992579620");
  });

  test("'Conheça nossas soluções' navega até Serviços", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /conheça nossas soluções/i }).click();
    await expect(page).toHaveURL(/#servicos$/);
    await expect(page.locator("#servicos")).toBeInViewport();
  });

  test("seis matérias com links externos seguros", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("a[data-press]");
    await expect(links).toHaveCount(6);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute(
        "href",
        /^https:\/\/newsrondonia\.com\.br\/noticias\/2025\/\d{2}\/\d{2}\/.+\/$/,
      );
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toContainText(/ler matéria/i);
    }
  });

  test("fotos do Pedro carregam na hero e em Sobre", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("#inicio img");
    await expect(hero).toHaveAttribute("alt", /Pedro Fonseca/);
    await expect.poll(() => hero.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    await page.locator("#sobre").scrollIntoViewIfNeeded();
    const about = page.locator("#sobre img");
    await expect(about).toHaveAttribute("loading", "lazy");
    await expect.poll(() => about.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  });

  test("sem rolagem horizontal", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("sem violações de acessibilidade graves (axe, WCAG 2.2 AA)", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
  });

  test("SEO: metadados, canonical, OG, JSON-LD, sitemap e robots", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{80,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(jsonLd["@type"]).toBe("FinancialService");
    expect((await request.get("/sitemap.xml")).status()).toBe(200);
    expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
    expect((await request.get("/og.jpg")).status()).toBe(200);
  });
});

test.describe("Páginas legais", () => {
  for (const [path, title] of [
    ["/politica-de-privacidade", "Política de Privacidade"],
    ["/termos-e-condicoes", "Termos e Condições"],
  ] as const) {
    test(`${path} existe e é acessível pelo rodapé`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("contentinfo").getByRole("link", { name: title }).click();
      await expect(page).toHaveURL(new RegExp(`${path}/?$`));
      await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
      await expect(page.getByText(/revisão jurídica/i)).toBeVisible();
    });
  }
});

test.describe("Navegação mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "apenas mobile");

  test("menu abre, navega, fecha com Esc e devolve o foco", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Abrir menu" });
    await toggle.click();
    const menu = page.locator("#menu-mobile");
    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await menu.getByRole("link", { name: "Serviços" }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#servicos$/);
  });
});

test.describe("Desktop", () => {
  test.skip(({ isMobile }) => isMobile, "apenas desktop");

  test("navegação por teclado: link para pular conteúdo e foco visível", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });
});
