import { chromium } from "@playwright/test";

const [, , url, out, w, h, full] = process.argv;
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: "networkidle" });
if (full === "1") {
  // rolar para disparar reveals
  for (let y = 0; y < 20000; y += 600) {
    await p.mouse.wheel(0, 600);
    await p.waitForTimeout(120);
  }
  await p.waitForTimeout(1200);
}
await p.screenshot({ path: out, fullPage: full === "1" });
await b.close();
