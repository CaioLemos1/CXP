#!/usr/bin/env node
/**
 * Verifica a disponibilidade dos links externos do site (matérias, Instagram, WhatsApp).
 * Uso: npm run links:check
 */
import { readFileSync } from "node:fs";

const sources = ["src/content/press.ts", "src/config/site.ts"].map((f) => readFileSync(f, "utf8")).join("\n");
const urls = [...new Set(sources.match(/https:\/\/[^\s"'`)]+/g) ?? [])];

let failures = 0;
for (const url of urls) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 CXP-link-check" },
    });
    const ok = res.status < 400;
    if (!ok) failures++;
    console.log(`${ok ? "OK  " : "FAIL"} ${res.status}  ${url}`);
  } catch (error) {
    failures++;
    console.log(`FAIL ---  ${url}  (${error instanceof Error ? error.message : error})`);
  }
}
console.log(`\n${urls.length - failures}/${urls.length} links disponíveis.`);
process.exit(failures ? 1 : 0);
