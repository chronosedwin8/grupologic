// Genera una imagen Open Graph de 1200×630 por página y el logotipo PNG de la organización.
// Uso: node og.mjs   (después de node build.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { SITIO, SOLUCIONES, categoria, logoGrupoLogic } from './lib/plantilla.mjs';

const TEXTOS = {
  inicio: ['Software educativo', 'Software para colegios, desarrollado por Grupo Logic'],
  productos: ['Productos', 'Software para colegios de Grupo Logic'],
  precios: ['Precios', 'Planes y precios de nuestros productos'],
  soporte: ['Soporte', 'Soporte técnico de nuestros productos'],
  nosotros: ['Nosotros', 'Una empresa de software educativo'],
  contacto: ['Contacto', 'Demostraciones, licencias y soporte'],
  privacidad: ['Privacidad', 'Política de privacidad y tratamiento de datos'],
  terminos: ['Legal', 'Términos y condiciones de servicio'],
  reembolsos: ['Legal', 'Política de reembolsos'],
};
for (const s of SOLUCIONES) TEXTOS[s.slug] = [categoria(s.categoria).nombre, s.nombre, s.lema];

const fuente = (f) => pathToFileURL(path.join(SITIO, 'assets/fonts', f)).href;
const mapa = pathToFileURL(path.join(SITIO, 'assets/img/mapa-puntos.svg')).href;
const html = ([ceja, titulo, lema]) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:F;src:url(${fuente('fraunces-500.woff2')})}
@font-face{font-family:FI;src:url(${fuente('fraunces-400-italic.woff2')})}
@font-face{font-family:M;src:url(${fuente('manrope-700.woff2')})}
@font-face{font-family:MR;src:url(${fuente('manrope-400.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#06101F;color:#F7F4EE;position:relative;overflow:hidden}
.mapa{position:absolute;right:-120px;top:-40px;width:900px;opacity:.55}
.velo{position:absolute;inset:0;background:linear-gradient(90deg,#06101F 38%,rgba(6,16,31,.55) 75%,rgba(6,16,31,.2))}
.marco{position:absolute;inset:28px;border:1px solid rgba(200,164,92,.35)}
.c{position:absolute;left:84px;right:180px;top:72px;bottom:72px;display:flex;flex-direction:column}
.logo{color:#F7F4EE;height:44px}.logo svg{height:44px;width:auto}
.ceja{margin-top:auto;font-family:M;font-size:20px;letter-spacing:.2em;text-transform:uppercase;color:#C8A45C;display:flex;align-items:center;gap:16px}
.ceja:before{content:"";width:40px;height:1px;background:#C8A45C}
h1{font-family:F;font-weight:500;font-size:${titulo.length > 60 ? 54 : titulo.length > 30 ? 64 : 92}px;line-height:1.08;letter-spacing:-.02em;margin-top:22px}
.lema{font-family:FI;font-size:34px;color:#E3CD9A;margin-top:18px;line-height:1.25}
.dom{margin-top:34px;font-family:MR;font-size:20px;color:#A9B6C6;letter-spacing:.04em}
</style></head><body><img class="mapa" src="${mapa}"><div class="velo"></div><div class="marco"></div>
<div class="c"><div class="logo">${logoGrupoLogic()}</div><p class="ceja">${ceja}</p><h1>${titulo}</h1>${lema ? `<p class="lema">${lema}</p>` : ''}<p class="dom">grupologiclatam.com</p></div></body></html>`;

const destino = path.join(SITIO, 'assets/img/og');
fs.mkdirSync(destino, { recursive: true });
const tmp = path.resolve('og-tmp.html');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const [clave, t] of Object.entries(TEXTOS)) {
  fs.writeFileSync(tmp, html(t));
  await p.goto(pathToFileURL(tmp).href);
  await p.evaluate(() => document.fonts.ready);
  const png = await p.screenshot({ type: 'png' });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(destino, `${clave}.jpg`));
  console.log('og', clave);
}
await b.close();
fs.unlinkSync(tmp);

// Logotipo PNG para datos estructurados (Organization.logo)
await sharp(path.join(SITIO, 'assets/img/logo/grupologic-oscuro.svg'), { density: 300 })
  .resize({ width: 600 }).flatten({ background: '#FFFFFF' }).extend({ top: 40, bottom: 40, left: 40, right: 40, background: '#FFFFFF' })
  .png().toFile(path.join(SITIO, 'assets/img/logo/grupologic-logo.png'));
console.log('logo png');
