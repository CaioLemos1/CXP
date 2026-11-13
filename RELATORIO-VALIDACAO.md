# Relatório de validação — 12/11/2026

Todos os resultados abaixo foram **executados** neste ambiente (Node 22, Chrome estável, Linux).

| Verificação                                 | Comando                                                   | Resultado                                                                         |
| ------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Type checking                               | `npm run typecheck`                                       | ✅ sem erros                                                                      |
| Lint + formatação + imports                 | `npm run check` (Biome 2.6)                               | ✅ 63 arquivos, 0 problemas                                                       |
| Testes unitários + integração               | `npm test` (Vitest 5)                                     | ✅ 89/89 (7 arquivos)                                                             |
| Cobertura de `src/lib`, `content`, `config` | `npx vitest run --coverage`                               | ✅ 98,4% statements · 100% branches · 100% funções                                |
| Mutation testing                            | `npm run test:mutation` (Stryker 10)                      | ✅ score 99,06% (314 mortos, 3 sobreviventes equivalentes) — limite de quebra 75% |
| Build de produção                           | `npm run build`                                           | ✅ 9 rotas estáticas                                                              |
| Build estático                              | `STATIC_EXPORT=1 npm run build`                           | ✅ pasta `out/` (2,1 MB)                                                          |
| End-to-end                                  | `npm run test:e2e` (Playwright, desktop 1440px + Pixel 7) | ✅ 33 aprovados · 5 ignorados por projeto (testes só-desktop/só-mobile)           |
| Acessibilidade                              | axe-core (WCAG 2.0/2.1/2.2 A+AA) no E2E + Lighthouse      | ✅ 0 violações sérias/críticas · Lighthouse 100                                   |
| Performance (laboratório, localhost)        | Lighthouse 12                                             | Mobile 99 (LCP 1,0 s · CLS 0 · TBT 110 ms) · Desktop 100 (LCP 0,3 s · CLS 0)      |
| SEO / Boas práticas                         | Lighthouse                                                | 100 / 100                                                                         |
| Rolagem horizontal                          | E2E + varredura em 360/390/768 px                         | ✅ nenhuma                                                                        |

Os números de Lighthouse são de laboratório em servidor local. INP só pode ser medido com usuários reais (Search Console / CrUX) após a publicação.

## Cobertura dos fluxos E2E

Logo no header · hero e letras CXP (reagem ao cursor, voltam ao repouso, ficam estáticas com movimento reduzido) · ordem das seções · todos os links de WhatsApp (número, mensagem pré-preenchida, `target=_blank`, `rel=noopener noreferrer`) · clique real abrindo o popup do wa.me · "Conheça a CXP" → Quem Somos · seis matérias com links seguros · foto do Pedro carregada com lazy loading · simulador recalcula · menu mobile (abre, Esc fecha, foco volta, navega) · carrossel de imprensa · páginas legais pelo rodapé · skip link por teclado · metadados, canonical, OG, Twitter, JSON-LD, sitemap e robots.

## Não executado — e por quê

- **Disponibilidade dos links externos** (`npm run links:check`): a rede deste ambiente bloqueia newsrondonia.com.br e instagram.com (erro de proxy 403). Os links foram validados apenas estruturalmente: HTTPS, domínio correto e data da URL igual à data informada. **Rode `npm run links:check` na sua máquina.**
- **Revisão jurídica** das páginas legais: obrigatória, fora do escopo técnico.

## Mutantes sobreviventes (equivalentes)

- `press.ts` (2): variações do comparador de ordenação que não mudam o resultado em ordenação estável.
- `format.ts` (1): `startsWith("55")` em um caso em que os dois caminhos geram a mesma saída.
