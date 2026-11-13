# Relatório de validação — 13/11/2026 (conteúdo do Portfólio Comercial 3.0)

Executado neste ambiente (Node 22, Chrome estável, Linux).

| Verificação | Comando | Resultado |
|---|---|---|
| Type checking | `npm run typecheck` | ✅ sem erros |
| Lint + formatação | `npm run check` (Biome) | ✅ 0 problemas |
| Testes unitários + integração | `npm test` (Vitest) | ✅ 85/85 |
| Mutation testing | `npm run test:mutation` (Stryker) | ✅ 98,90% (3 sobreviventes equivalentes) |
| Build de produção | `npm run build` | ✅ |
| Build Cloudflare | `WORKERS_CI=1 npm run build` + `wrangler deploy --dry-run` | ✅ 63 arquivos em `out/` |
| End-to-end + acessibilidade (axe WCAG 2.2 AA) | `npm run test:e2e` (desktop 1440px + Pixel 7) | ✅ 28/28 |
| Rolagem horizontal (390 px) | E2E | ✅ nenhuma |

Fluxos cobertos: logo, hero, ordem das seções, todos os links de WhatsApp (número, mensagem, nova aba segura), clique abrindo wa.me, âncora "Conheça nossas soluções", seis matérias, fotos do Pedro carregadas, menu mobile, páginas legais, skip link, SEO (meta, OG, JSON-LD, sitemap, robots).

Não executado: verificação online dos links externos (rede deste ambiente bloqueia os domínios) — rode `npm run links:check`.

Testes novos travam os dados do portfólio: telefones de Pedro e Matheus, Instagram, endereço, as quatro soluções, os quatro números de resultados e os três marcos da trajetória.
