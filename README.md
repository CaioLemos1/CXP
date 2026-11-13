# CXP Crédito & Investimentos — Landing Page

Landing page institucional e de conversão (WhatsApp) da **CXP Crédito & Investimentos**.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Biome · Vitest · Stryker · Playwright.
A escolha segue o briefing (Next.js + TypeScript + Tailwind + Motion). Nenhuma dependência de runtime além de `next`, `react`, `react-dom` e `motion`.

---

## 1. Antes de publicar (pendências)

Tudo o que é configurável fica em **`src/config/site.ts`**. Itens que não constavam nos materiais enviados:

| Campo                                                          | Situação                                                                                                                                                          | O que fazer                                                                                                                                                        |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `images.hero` / `images.about` | ✅ Fotos do Pedro Fonseca (`public/images/pedro-hero.jpg`, `pedro-leitura.jpg`). | — |
| `images.logo` | ✅ Logo oficial branca com fundo transparente (`public/images/logo-cxp.png`, 709×362 px). Para nitidez máxima em telas grandes, a versão SVG pode substituí-la no futuro. | — |
| `contact.whatsappConfirmed`                                    | O número (69) 99257-9620 vem do portfólio.                                                                                                                        | Confirmar que é o WhatsApp de atendimento e mudar para `true`.                                                                                                     |
| `url`                                                          | Usa `NEXT_PUBLIC_SITE_URL`.                                                                                                                                       | Definir o domínio oficial (ver `.env.example`).                                                                                                                    |
| `legal.cnpj`, `legal.dataProtectionOfficer`, `contact.address` | Não informados.                                                                                                                                                   | Preencher. Enquanto `null`, ficam fora da interface e aparecem como `[a preencher]` nas páginas legais.                                                            |
| Instagram                                                      | O slide grafa `@cpxinvestimentos`; o perfil ativo é `cxpinvestimentos`.                                                                                           | Confirmar.                                                                                                                                                         |
| Páginas legais                                                 | Minutas.                                                                                                                                                          | **Revisão jurídica obrigatória** antes da publicação.                                                                                                              |

O teste `tests/unit/config.test.ts` lista essas pendências e falha se algum dado ficar inválido (telefone, e-mail, URL, CNPJ).

### Conteúdo editável

- `src/content/press.ts` — matérias do News Rondônia (adicione `excerpt` ou `image` só com confirmação e autorização).
- `src/content/solutions.ts` — soluções e diferenciais (textos curtos).

---

## 2. Execução local

Requisitos: Node.js 20.9+ (testado com Node 22).

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Comando                               | Função                                                       |
| ------------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                         | Servidor de desenvolvimento                                  |
| `npm run build` / `npm start`         | Build de produção e servidor                                 |
| `npm run typecheck`                   | Verificação de tipos (tsc)                                   |
| `npm run check` / `npm run check:fix` | Biome: lint + formatação + organização de imports            |
| `npm test`                            | Testes unitários e de integração (Vitest)                    |
| `npm run test:mutation`               | Mutation testing (Stryker) nas funções críticas de `src/lib` |
| `npm run test:e2e`                    | Testes end-to-end (Playwright, desktop + mobile, com axe)    |
| `npm run links:check`                 | Verifica a disponibilidade dos links externos                |
| `npm run validate`                    | typecheck + Biome + testes + build                           |

Para os testes E2E: `npx playwright install chromium` (uma vez) **ou** aponte um Chrome já instalado com `PW_CHROME_PATH=/caminho/do/chrome npm run test:e2e`. Rode `npm run build` antes.

---

## 3. Publicação

**Cloudflare Workers (recomendado, plano gratuito permite uso comercial):** o repositório já tem `wrangler.jsonc` e `public/_headers`.
Em *Workers & Pages → cxp-investimentos → Settings → Build*:

- Build command: `npm run build` (nos builds da Cloudflare a exportação estática é ativada automaticamente pela variável `WORKERS_CI`)
- Deploy command: `npx wrangler deploy`
- Build variable: `NEXT_PUBLIC_SITE_URL` = URL pública (o endereço `*.workers.dev` enquanto não houver domínio)

Teste local do mesmo pacote: `WORKERS_CI=1 npm run build && npx wrangler dev`.


**Vercel (recomendado):** importe o repositório, defina `NEXT_PUBLIC_SITE_URL` e publique. Imagens otimizadas (AVIF/WebP) e cabeçalhos de segurança/cache já estão configurados em `next.config.ts`.

**Hospedagem estática (CDN, S3, Netlify, cPanel):**

```bash
STATIC_EXPORT=1 NEXT_PUBLIC_SITE_URL=https://www.seudominio.com.br npm run build
# envie o conteúdo da pasta out/
```

No modo estático as imagens são servidas sem otimização em tempo real (já estão comprimidas), e os cabeçalhos de segurança devem ser configurados no servidor.

Depois de publicar: rode `npm run links:check`, envie o `sitemap.xml` ao Google Search Console e teste o compartilhamento do link (imagem `public/og.jpg`).

---

## 4. Estrutura

```
src/
  app/                    rotas (App Router), metadados, sitemap, robots, ícones, CSS global
    politica-de-privacidade/  termos-e-condicoes/
  components/
    layout/               Header, Footer, LegalPage
    sections/             HeroSection, SolutionsSection, AboutSection,
                          DifferentialsSection, PressSection, FinalCTA
    ui/                   WhatsAppButton, Reveal, MotionProvider, Icon, Logo, CurrentYear
  config/site.ts          configuração central (contato, WhatsApp, imagens, dados legais)
  content/                textos e dados das seções
  lib/                    lógica pura testada: whatsapp, format, press,
                          config-validation, structured-data
  fonts/                  Playfair Display + Montserrat auto-hospedadas (SIL OFL 1.1)
tests/
  unit/  integration/  e2e/
scripts/                  check-links.mjs, screenshot.mjs
```

### Decisões técnicas

- **Fontes auto-hospedadas** (`next/font/local`): sem requisições ao Google Fonts, melhor LCP e conformidade com a LGPD.
- **Hero sem JavaScript bloqueante:** texto renderizado no servidor com animação CSS; foto do Pedro com prioridade de carregamento.
- **Motion** carregado via `LazyMotion` + `domAnimation` (pacote mínimo); `MotionConfig reducedMotion="user"`.
- **Imprensa sem imagens de capa:** não há autorização confirmada de uso; os cards são tipográficos.
- **Visual:** azul-marinho + dourado, seguindo o modelo de referência aprovado em 13/11/2026, com textos curtos.
