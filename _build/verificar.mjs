// Verificación estática: HTML válido, enlaces y recursos internos, anclas y JSON-LD.
// Uso: node verificar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { HtmlValidate } from 'html-validate';
import { SITIO } from './lib/plantilla.mjs';

const archivos = [];
(function recorrer(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const r = path.join(d, f.name);
    if (f.isDirectory()) recorrer(r); else if (f.name.endsWith('.html')) archivos.push(r);
  }
})(SITIO);

const validador = new HtmlValidate({
  extends: ['html-validate:recommended'],
  rules: {
    'no-inline-style': 'off',          // estilos puntuales en pocas secciones
    'long-title': 'off',               // títulos indicados por la especificación
    'no-trailing-whitespace': 'off',
    'attribute-boolean-style': 'off',
    'svg-focusable': 'off',
    'prefer-native-element': ['error', { exclude: ['region', 'img'] }],
    'no-redundant-role': 'off',
    'tel-non-breaking': 'off',
    'valid-id': ['error', { relaxed: true }],
    'form-dup-name': ['error', { shared: ['radio', 'button', 'reset', 'submit', 'checkbox'] }],
  },
});

let errores = 0;
for (const a of archivos) {
  const rel = path.relative(SITIO, a).split(path.sep).join('/');
  const html = fs.readFileSync(a, 'utf8');
  const informe = await validador.validateString(html, rel);
  for (const r of informe.results) for (const m of r.messages) { errores++; console.log(`HTML ${rel}:${m.line} [${m.ruleId}] ${m.message}`); }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  for (const [, attr, valor] of html.matchAll(/\s(href|src|srcset|imagesrcset)="([^"]+)"/g)) {
    const urls = attr.includes('srcset') ? valor.split(',').map(s => s.trim().split(' ')[0]) : [valor];
    for (const u of urls) {
      if (u === '#') continue;
      if (u.startsWith('#')) { if (!ids.has(u.slice(1))) { errores++; console.log(`ANCLA ${rel}: ${u}`); } continue; }
      if (!u.startsWith('/') || u.startsWith('//')) continue;
      let destino = u.split('#')[0].split('?')[0];
      if (destino.endsWith('/')) destino += 'index.html';
      if (!fs.existsSync(path.join(SITIO, destino))) { errores++; console.log(`ROTO ${rel}: ${u}`); }
    }
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { errores++; console.log(`JSON-LD inválido en ${rel}`); }
  }
}
// Sitemap: cada URL debe existir
for (const [, loc] of fs.readFileSync(path.join(SITIO, 'sitemap.xml'), 'utf8').matchAll(/<loc>https:\/\/www\.grupologiclatam\.com([^<]*)<\/loc>/g)) {
  if (!fs.existsSync(path.join(SITIO, loc, 'index.html'))) { errores++; console.log('SITEMAP sin página:', loc); }
}
console.log(`${archivos.length} archivos HTML revisados · ${errores} problema(s)`);
process.exit(errores ? 1 : 0);
