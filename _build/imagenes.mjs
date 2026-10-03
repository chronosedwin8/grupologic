// Genera los activos gráficos del sitio:
//  1. Logotipo provisional de Grupo Logic (texto convertido a trazos) en versión clara y oscura.
//  2. Favicons SVG y PNG.
//  3. Mapa de puntos (Américas y Europa) para la sección "Del mundo a su colegio".
//  4. Capturas de producto optimizadas en WebP con dos o más tamaños.
// Uso: node imagenes.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import opentype from 'opentype.js';
import { feature } from 'topojson-client';

const SITIO = path.resolve('../sitio');
const IMG = path.join(SITIO, 'assets/img');
const ORO = '#C8A45C';

// ---------- 1. Logotipo ----------
const fuente = opentype.parse((await fs.readFile('descargas/fraunces-500.woff')).buffer);

function textoATrazo(texto, tamano, tracking, x0, base) {
  let x = x0;
  const escala = tamano / fuente.unitsPerEm;
  let d = '';
  for (const c of texto) {
    const glifo = fuente.charToGlyph(c);
    d += glifo.getPath(x, base, tamano).toPathData(2);
    x += glifo.advanceWidth * escala + tracking;
  }
  return { d, ancho: x - tracking - x0 };
}

// Isotipo: cuadrado de línea dorada con una "L" formada por dos trazos.
const isotipo = (color) => `
  <rect x="1" y="1" width="38" height="38" rx="2" fill="none" stroke="${ORO}" stroke-width="1.6"/>
  <path d="M14 9.5V25.5" stroke="${color}" stroke-width="2.6" stroke-linecap="square"/>
  <path d="M18 30.5H30.5" stroke="${color}" stroke-width="2.6" stroke-linecap="square"/>`;

const marca = textoATrazo('GRUPO LOGIC', 17, 2.6, 54, 26.5);
const anchoLogo = Math.ceil(54 + marca.ancho + 2);
const svgLogo = (color, titulo) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${anchoLogo} 40" width="${anchoLogo}" height="40" role="img" aria-label="${titulo}"><title>${titulo}</title>${isotipo(color)}<path fill="${color}" d="${marca.d}"/></svg>\n`;

await fs.writeFile(path.join(IMG, 'logo/grupologic-claro.svg'), svgLogo('#F7F4EE', 'Grupo Logic'));
await fs.writeFile(path.join(IMG, 'logo/grupologic-oscuro.svg'), svgLogo('#0B1B33', 'Grupo Logic'));
// Versión con currentColor para insertar en línea en el encabezado y el pie.
await fs.writeFile('parciales-logo.json', JSON.stringify({ ancho: anchoLogo, isotipo: isotipo('currentColor'), texto: marca.d }));

// ---------- 2. Favicons ----------
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#06101F"/>${isotipo('#F7F4EE').replace('x="1" y="1" width="38" height="38"', 'x="4" y="4" width="32" height="32"')}</svg>\n`;
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="7" fill="#06101F"/><rect x="5" y="5" width="30" height="30" rx="1.5" fill="none" stroke="${ORO}" stroke-width="1.8"/><path d="M15 11V25" stroke="#F7F4EE" stroke-width="3" stroke-linecap="square"/><path d="M18.5 29H29" stroke="#F7F4EE" stroke-width="3" stroke-linecap="square"/></svg>\n`;
await fs.writeFile(path.join(SITIO, 'favicon.svg'), faviconSvg);
for (const [nombre, t] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icono-192.png', 192], ['icono-512.png', 512]]) {
  await sharp(Buffer.from(faviconSvg), { density: 72 * t / 40 * 2 }).resize(t, t).png().toFile(path.join(SITIO, nombre === 'favicon-32.png' || nombre === 'apple-touch-icon.png' ? nombre : `assets/img/iconos/${nombre}`));
}

// ---------- 3. Mapa de puntos ----------
// Proyección equirectangular recortada: longitudes -125..45, latitudes 62..-56.
const mundo = JSON.parse(await fs.readFile('node_modules/world-atlas/land-110m.json', 'utf8'));
const tierra = feature(mundo, mundo.objects.land);
const poligonos = tierra.features.flatMap(f => f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates);
function dentroAnillo([x, y], anillo) {
  let dentro = false;
  for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
    const [xi, yi] = anillo[i], [xj, yj] = anillo[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) dentro = !dentro;
  }
  return dentro;
}
const esTierra = (p) => poligonos.some(([ext, ...huecos]) => dentroAnillo(p, ext) && !huecos.some(h => dentroAnillo(p, h)));
const MAPA = { lon0: -125, lon1: 45, lat0: 62, lat1: -56, escala: 6 };
const proyectar = (lon, lat) => [((lon - MAPA.lon0) * MAPA.escala), ((MAPA.lat0 - lat) * MAPA.escala)];
const paso = 1.8;
let puntos = '';
for (let lat = MAPA.lat0; lat >= MAPA.lat1; lat -= paso) {
  for (let lon = MAPA.lon0; lon <= MAPA.lon1; lon += paso) {
    if (esTierra([lon, lat])) {
      const [x, y] = proyectar(lon, lat);
      puntos += `M${x.toFixed(1)} ${y.toFixed(1)}h0`;
    }
  }
}
const ancho = (MAPA.lon1 - MAPA.lon0) * MAPA.escala, alto = (MAPA.lat0 - MAPA.lat1) * MAPA.escala;
await fs.writeFile(path.join(IMG, 'mapa-puntos.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}" width="${ancho}" height="${alto}"><path d="${puntos}" stroke="#3A5378" stroke-width="4.2" stroke-linecap="round" fill="none"/></svg>\n`);
const ciudades = {
  berlin: [13.4, 52.5], londres: [-0.13, 51.5], madrid: [-3.7, 40.4],
  latam: [-74.8, 11.0], mexico: [-99.1, 19.4], bogota: [-74.1, 4.7], lima: [-77.0, -12.0],
  santiago: [-70.6, -33.4], buenosaires: [-58.4, -34.6], saopaulo: [-46.6, -23.5], panama: [-79.5, 9.0],
};
const proy = Object.fromEntries(Object.entries(ciudades).map(([k, v]) => [k, proyectar(...v).map(n => +n.toFixed(1))]));
await fs.writeFile('mapa.json', JSON.stringify({ ancho, alto, ciudades: proy }));
console.log('Mapa', ancho, 'x', alto, 'longitud de ruta', puntos.length);

// ---------- 4. Capturas ----------
// portada: 1440×810 (1x). paneles: capturas a 2x.
const CAP = 'capturas/final';
const destino = path.join(IMG, 'productos');
const archivos = (await fs.readdir(CAP)).filter(f => f.endsWith('.png') && !f.startsWith('bs-') && f !== 'bookstudio-demo.png');
const manifiesto = {};
for (const f of archivos) {
  const base = f.replace('.png', '');
  let img = sharp(path.join(CAP, f));
  if (base === 'bookstudio-editor') img = img.extract({ left: 0, top: 63, width: 1440, height: 810 });
  const buf = await img.toBuffer();
  const meta = await sharp(buf).metadata();
  const anchos = base.endsWith('portada') || base === 'bookstudio-editor' ? [1440, 960, 640] : [Math.min(meta.width, 1100), 560];
  manifiesto[base] = { anchos, ratio: +(meta.height / meta.width).toFixed(4) };
  for (const w of anchos) {
    await sharp(buf).resize({ width: w }).webp({ quality: 78 }).toFile(path.join(destino, `${base}-${w}.webp`));
  }
}
await fs.writeFile('capturas.json', JSON.stringify(manifiesto, null, 1));
console.log('Capturas', Object.keys(manifiesto).length);
