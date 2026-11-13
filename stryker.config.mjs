// @ts-check
/**
 * Mutation testing apenas nas funções críticas (lógica pura).
 * Componentes visuais ficam de fora intencionalmente.
 * @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
 */
export default {
  testRunner: "vitest",
  vitest: { configFile: "vitest.config.ts" },
  mutate: [
    "src/lib/whatsapp.ts",
    "src/lib/format.ts",
    "src/lib/finance.ts",
    "src/lib/press.ts",
    "src/lib/config-validation.ts",
    "src/lib/structured-data.ts",
  ],
  reporters: ["clear-text", "progress", "html", "json"],
  htmlReporter: { fileName: "reports/mutation/index.html" },
  jsonReporter: { fileName: "reports/mutation/mutation.json" },
  coverageAnalysis: "perTest",
  thresholds: { high: 90, low: 80, break: 75 },
  tempDirName: ".stryker-tmp",
  cleanTempDir: "always",
};
