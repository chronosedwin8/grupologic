// Visita los sitios oficiales, guarda su texto visible y toma capturas 1440×900.
import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const sitios = {
  unticloud: 'https://www.unticloud.de/',
  'aulamagica-ia': 'https://www.magicschools.es/',
  edunova: 'https://www.teachy.es/',
  codexia: 'https://codexialab.com/',
  vcodepro: 'https://www.vcodepro.de/',
  bookstudio: 'https://bookstudio.uk/',
  servivps: 'https://www.servivps.com/',
};

const navegador = await chromium.launch();
const contexto = await navegador.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-ES' });
for (const [slug, url] of Object.entries(sitios)) {
  const pagina = await contexto.newPage();
  try {
    await pagina.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (e) { console.log(slug, 'aviso:', e.message.split('\n')[0]); }
  await pagina.waitForTimeout(2500);
  // Desplazar para activar animaciones de aparición
  const alto = await pagina.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < alto; y += 600) { await pagina.evaluate(v => window.scrollTo(0, v), y); await pagina.waitForTimeout(150); }
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.waitForTimeout(800);
  const texto = await pagina.evaluate(() => document.body.innerText);
  const meta = await pagina.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name=description]')?.content,
    imgs: [...document.querySelectorAll('img')].map(i => i.currentSrc || i.src).filter(Boolean).slice(0, 40),
    links: [...document.querySelectorAll('a')].map(a => a.href).filter(h => h.startsWith('http')).slice(0, 80),
  }));
  await fs.writeFile(`investigacion/${slug}.txt`, `URL: ${url}\n${JSON.stringify(meta, null, 1)}\n\n${texto}`);
  await pagina.screenshot({ path: `capturas/${slug}-hero.png` });
  await pagina.screenshot({ path: `capturas/${slug}-full.png`, fullPage: true });
  console.log(slug, 'ok', alto, texto.length);
  await pagina.close();
}
await navegador.close();
