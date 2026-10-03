// Capturas definitivas: portada oficial (1440×810) y paneles de interfaz a 2x.
import { chromium } from 'playwright';
const D = 'capturas/final/';
const paneles = {
  unticloud: ['https://www.unticloud.de/', { panel: '.hero-dashboard', ib: '.ib-compliance-mockup', ausentismo: '.monthly-chart-container', importaciones: '.import-history-mockup' }],
  'aulamagica-ia': ['https://www.magicschools.es/', { panel: '.mock-window' }],
  edunova: ['https://www.teachy.es/', { panel: '.mock', libros: '.panel-art' }],
  codexia: ['https://codexialab.com/', { panel: '.demo-window' }],
  vcodepro: ['https://www.vcodepro.de/', { panel: '.editor-shot', agentes: '.agent-studio' }],
  bookstudio: ['https://bookstudio.uk/', {}],
};
const b = await chromium.launch();
async function recorrer(p) {
  const alto = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < alto; y += 500) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(120); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(900);
}
for (const [slug, [url, sel]] of Object.entries(paneles)) {
  const c1 = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p1 = await c1.newPage();
  await p1.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
  await recorrer(p1);
  await p1.screenshot({ path: `${D}${slug}-portada.png`, clip: { x: 0, y: 0, width: 1440, height: 810 } });
  await c1.close();
  if (!Object.keys(sel).length) continue;
  const c2 = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p2 = await c2.newPage();
  await p2.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
  await recorrer(p2);
  for (const [nombre, s] of Object.entries(sel)) {
    const el = p2.locator(s).first();
    await el.scrollIntoViewIfNeeded(); await p2.waitForTimeout(1200);
    await el.screenshot({ path: `${D}${slug}-${nombre}.png`, animations: 'disabled' });
    console.log(slug, nombre, 'ok');
  }
  await c2.close();
}
await b.close();
