// Investiga un sitio oficial: guarda texto visible, metadatos y capturas.
// Uso: node investigar-uno.mjs <slug> <url>
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const [,, slug, url] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, locale: 'es-ES' });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.log('aviso', e.message.split('\n')[0]));
await p.waitForTimeout(2500);
const alto = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < alto; y += 600) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(150); }
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
const meta = await p.evaluate(() => ({
  title: document.title, description: document.querySelector('meta[name=description]')?.content, lang: document.documentElement.lang,
  imgs: [...document.querySelectorAll('img')].map(i => i.currentSrc || i.src).filter(Boolean).slice(0, 40),
  links: [...new Set([...document.querySelectorAll('a')].map(a => a.href))].slice(0, 80),
}));
// Incluye texto oculto en pestañas o acordeones
const texto = await p.evaluate(() => document.body.innerText);
const oculto = await p.evaluate(() => [...document.querySelectorAll('[hidden], details:not([open]), [aria-hidden="true"]')].map(e => e.textContent.replace(/\s+/g, ' ').trim()).filter(t => t.length > 40).join('\n'));
await fs.mkdir('investigacion', { recursive: true }); await fs.mkdir('capturas', { recursive: true });
await fs.writeFile(`investigacion/${slug}.txt`, `URL: ${url}\n${JSON.stringify(meta, null, 1)}\n\n${texto}\n\n== Texto oculto (pestañas/acordeones) ==\n${oculto}`);
await p.screenshot({ path: `capturas/${slug}-hero.png` });
await p.screenshot({ path: `capturas/${slug}-full.png`, fullPage: true });
console.log(slug, 'alto', alto, 'texto', texto.length, 'oculto', oculto.length);
await b.close();
