// Capturas de revisión visual (movimiento reducido para mostrar todo el contenido).
import { chromium } from 'playwright';
const [,, ruta = '/', ancho = '1440', nombre = 'rev'] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +ancho, height: 900 }, reducedMotion: 'reduce' });
const errores = [];
p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
p.on('pageerror', e => errores.push(e.message));
await p.goto('http://127.0.0.1:8080' + ruta, { waitUntil: 'networkidle' });
const alto = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < alto; y += 700) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(120); }
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
const desborde = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
await p.screenshot({ path: `revision/${nombre}.png`, fullPage: true });
console.log('desborde horizontal:', desborde, 'errores:', errores);
await b.close();
