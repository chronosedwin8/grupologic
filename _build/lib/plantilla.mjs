// Piezas comunes a todas las páginas: <head>, encabezado, pie, íconos, logotipos e imágenes.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';

export const SITIO = path.resolve(import.meta.dirname, '../../sitio');
export const DOMINIO = 'https://www.grupologiclatam.com';
export const ANIO = new Date().getFullYear();

const leerSitio = (r) => fs.readFileSync(path.join(SITIO, r), 'utf8');
export const DATOS = JSON.parse(leerSitio('assets/data/soluciones.json'));
export const SOLUCIONES = DATOS.soluciones;
export const CATEGORIAS = DATOS.categorias;
export const categoria = (id) => CATEGORIAS.find(c => c.id === id);
export const solucion = (slug) => SOLUCIONES.find(s => s.slug === slug);
// Cantidades en letras (se actualizan solas al añadir soluciones o líneas al JSON)
const LETRAS = ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];
export const enLetras = (n) => LETRAS[n] || String(n);
export const N_SOLUCIONES = enLetras(SOLUCIONES.length);
export const N_LINEAS = enLetras(CATEGORIAS.length);
export const mayuscula = (t) => t.charAt(0).toUpperCase() + t.slice(1);

// Lee config.js para usar en el build (JSON-LD) los datos que ya estén completos.
const ctx = { window: {} };
vm.runInNewContext(leerSitio('assets/js/config.js'), ctx);
export const CONFIG = ctx.window.GL_CONFIG;
export const valido = (v) => typeof v === 'string' && v.trim() !== '' && !v.includes('PENDIENTE');

const CAPTURAS = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../capturas.json'), 'utf8'));
const LOGO = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../parciales-logo.json'), 'utf8'));

// Versión corta del contenido de un archivo para invalidar caché (?v=...)
const version = (r) => crypto.createHash('md5').update(leerSitio(r)).digest('hex').slice(0, 8);
const V = {
  components: version('assets/css/components.css'),
  pages: version('assets/css/pages.css'),
  config: version('assets/js/config.js'),
  main: version('assets/js/main.js'),
  form: version('assets/js/form.js'),
  portfolio: version('assets/js/portfolio.js'),
};
const BASE_CSS = leerSitio('assets/css/base.css')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .replace(/\(\s+/g, '(').trim()
  // restablecer espacios necesarios en selectores descendientes y media queries
  .replace(/and\(/g, 'and (');

export const esc = (t = '') => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------------- Íconos lineales (24×24, trazo fino) ---------------- */
const TRAZOS = {
  flecha: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  flechaArriba: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
  externo: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 8h16"/><path d="M4 16h11"/>',
  cerrar: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  candado: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  escudo: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  usuarios: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  grafica: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  comparar: '<rect x="3" y="3" width="7" height="18" rx="1.5"/><rect x="14" y="3" width="7" height="18" rx="1.5"/>',
  reemplazo: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  birrete: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  reloj: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  capas: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  chispa: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/><path d="M19 3v4M17 5h4"/>',
  libro: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  lapiz: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  mensaje: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  codigo: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  bloques: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M13 7h4a2 2 0 0 1 2 2v2"/><path d="M11 17H7a2 2 0 0 1-2-2v-2"/>',
  juego: '<rect x="2" y="6" width="20" height="12" rx="6"/><path d="M6 12h4M8 10v4"/><path d="M15 13h.01M18 11h.01"/>',
  voz: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
  tableta: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>',
  terminal: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
  robot: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 4v4"/><circle cx="12" cy="3" r="1"/><path d="M9 13v1M15 13v1"/><path d="M2 14h2M20 14h2"/>',
  rubrica: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 13 2 2 4-4"/>',
  bitacora: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M2 7h4M2 12h4M2 17h4"/><path d="M10 7h6M10 11h6M10 15h4"/>',
  mapa: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  microfono: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/>',
  pregunta: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  enlace: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  exportar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  globo: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  institucion: '<path d="M3 21h18"/><path d="M5 21V10M19 21V10M9.5 21V10M14.5 21V10"/><path d="M2 10 12 3l10 7z"/>',
  brujula: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  soporte: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M21 18v1a3 3 0 0 1-3 3h-4"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  presentacion: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="m10 7.5 4.5 2.5-4.5 2.5z"/>',
  objetivo: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  ojo: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  llave: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3"/><path d="m16 6 3 3"/><path d="m14 8 2 2"/>',
  correo: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  telefono: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  ubicacion: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  whatsapp: '<path d="M3.5 20.5l1.3-4.3A8.6 8.6 0 1 1 8 19.4z"/><path d="M9.2 8.3c.2-.5.6-.6 1-.6l.6 1.5c.1.3 0 .5-.2.7l-.5.5c.6 1.2 1.5 2.1 2.7 2.7l.5-.5c.2-.2.5-.3.7-.2l1.5.6c0 .4-.1.8-.6 1-1.7.8-6.5-2.8-5.7-5.7z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  accesibilidad: '<circle cx="12" cy="4.5" r="1.5"/><path d="M5 8.5l7 1.5 7-1.5"/><path d="M12 10v5l-3 6M12 15l3 6"/>',
  ajustes: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  nube: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  alerta: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  familia: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  documento: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/>',
  insignia: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
  ruta: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  datos: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  interruptor: '<rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="8" cy="12" r="3"/>',
  imagen: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  video: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m22 8-5 4 5 4z"/>',
  sobre: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  sello: '<path d="M12 2l2.4 2.1 3.2-.3.9 3.1 2.8 1.6-1 3 1 3-2.8 1.6-.9 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.9-3.1L2.7 15.5l1-3-1-3 2.8-1.6.9-3.1 3.2.3z"/><path d="m9 12 2 2 4-4"/>',
};
export function icono(nombre, clase = '') {
  if (!TRAZOS[nombre]) throw new Error('Ícono inexistente: ' + nombre);
  return `<svg class="icono${clase ? ' ' + clase : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${TRAZOS[nombre]}</svg>`;
}

/* ---------------- Logotipo de Grupo Logic (en línea, currentColor) ---------------- */
export const logoGrupoLogic = () =>
  `<svg viewBox="0 0 ${LOGO.ancho} 40" width="${LOGO.ancho}" height="40" aria-hidden="true" focusable="false"><g fill="none">${LOGO.isotipo}</g><path fill="currentColor" d="${LOGO.texto}"/></svg>`;

/* ---------------- Logotipos de producto (texto estilizado) ---------------- */
// Recreaciones tipográficas del nombre de cada producto. Monocromas por defecto;
// con { color: true } solo el símbolo o la parte acentuada toma el color de la marca.
const MARCAS = {
  unticloud: () => ['', '<span class="logotipo__acento">Unti</span><b>Cloud</b>'],
  'aulamagica-ia': () => [`<span class="logotipo__marca"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 6.5l1.4 4.1 4.1 1.4-4.1 1.4L12 17.5l-1.4-4.1L6.5 12l4.1-1.4z" fill="currentColor"/></svg></span>`, 'AulaMágica<b>IA</b>'],
  edunova: () => [`<span class="logotipo__marca"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg></span>`, 'EduNova'],
  codexia: () => [`<span class="logotipo__marca"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="21" height="21" rx="6"/><path d="m9.5 8.5-3.5 3.5 3.5 3.5M14.5 8.5l3.5 3.5-3.5 3.5"/></svg></span>`, 'Codexia'],
  vcodepro: () => [`<span class="logotipo__marca"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M18 30 L50 88 L82 30" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><rect x="58" y="4" width="24" height="11" rx="5.5" fill="currentColor"/></svg></span>`, 'vcode<b>pro</b>'],
  'veyon-control': () => [`<span class="logotipo__marca"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="21" height="21" rx="6.5"/><path d="M7.2 8 12 16.5 16.8 8"/></svg></span>`, 'Veyon<b>Control</b>'],
  'codenest-school': () => [`<span class="logotipo__marca"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="13" r="9.5"/><circle cx="9" cy="12" r="1.6" fill="currentColor"/><circle cx="15" cy="12" r="1.6" fill="currentColor"/><path d="M9.5 16.2q2.5 1.8 5 0"/><path d="M12 3.5V1.5M8.5 4.2 7.3 2.6M15.5 4.2l1.2-1.6"/></svg></span>`, 'CodeNest<b>School</b>'],
  bookstudio: () => [`<span class="logotipo__marca"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="12" y="16.8" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="700" font-size="13" fill="currentColor">B</text></svg></span>`, 'BookStudio'],
};
export function logotipo(slug, { color = false, etiqueta = true } = {}) {
  const s = solucion(slug);
  const clase = slug === 'aulamagica-ia' ? 'aulamagica' : slug;
  return `<span class="logotipo logotipo--${clase}${color ? ' logotipo--color' : ''}"${etiqueta ? ` role="img" aria-label="${esc(s.nombre)}"` : ' aria-hidden="true"'}>${(([m, t]) => `${m}<span class="logotipo__texto">${t}</span>`)(MARCAS[slug]())}</span>`;
}

/* ---------------- Imágenes responsivas ---------------- */
export function imagen(base, alt, { sizes = '(min-width: 1240px) 600px, 92vw', eager = false, clase = '' } = {}) {
  const m = CAPTURAS[base];
  if (!m) throw new Error('Captura inexistente: ' + base);
  const anchos = [...m.anchos].sort((a, b) => a - b);
  const mayor = anchos[anchos.length - 1];
  const srcset = anchos.map(w => `/assets/img/productos/${base}-${w}.webp ${w}w`).join(', ');
  const src = `/assets/img/productos/${base}-${anchos[Math.min(1, anchos.length - 1)]}.webp`;
  const alto = Math.round(mayor * m.ratio);
  return `<img${clase ? ` class="${clase}"` : ''} src="${src}" srcset="${srcset}" sizes="${sizes}" width="${mayor}" height="${alto}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">`;
}
export const marco = (base, alt, dominio, opciones = {}) => `
<div class="marco">
  <div class="marco__barra" aria-hidden="true"><span class="marco__puntos"><i></i><i></i><i></i></span><span class="marco__url">${icono('candado')}${esc(dominio)}</span><span class="marco__espacio"></span></div>
  ${imagen(base, alt, opciones)}
</div>`;

/* ---------------- Acordeón y JSON-LD de preguntas ---------------- */
export function acordeon(preguntas, prefijo) {
  return `<div class="acordeon" data-acordeon>
${preguntas.map(([p, r], i) => `  <div class="acordeon__item">
    <h3 class="acordeon__titulo"><button class="acordeon__boton" type="button" id="${prefijo}-b${i}" aria-expanded="false" aria-controls="${prefijo}-p${i}">${esc(p)}<span class="acordeon__signo" aria-hidden="true"></span></button></h3>
    <div class="acordeon__panel" id="${prefijo}-p${i}" role="region" aria-labelledby="${prefijo}-b${i}"><div class="acordeon__interior"><div>${r.split('\n\n').map(x => `<p>${x}</p>`).join('')}</div></div></div>
  </div>`).join('\n')}
</div>`;
}
const textoPlano = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const faqLd = (preguntas) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: preguntas.map(([p, r]) => ({ '@type': 'Question', name: p, acceptedAnswer: { '@type': 'Answer', text: textoPlano(r) } })),
});
export const migasLd = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([nombre, ruta], i) => ({ '@type': 'ListItem', position: i + 1, name: nombre, item: DOMINIO + ruta })),
});
export const organizacionLd = () => {
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': DOMINIO + '/#organizacion',
    name: 'Grupo Logic', url: DOMINIO + '/', logo: DOMINIO + '/assets/img/logo/grupologic-logo.png',
    description: 'Grupo Logic acerca a los colegios de Latinoamérica soluciones de tecnología educativa desarrolladas en otras partes del mundo, con implementación y acompañamiento.',
    areaServed: { '@type': 'Place', name: 'Latinoamérica' },
  };
  if (valido(CONFIG.direccion)) org.address = { '@type': 'PostalAddress', streetAddress: CONFIG.direccion };
  const contacto = { '@type': 'ContactPoint', contactType: 'sales', areaServed: 'Latinoamérica', availableLanguage: ['es'] };
  if (valido(CONFIG.email)) contacto.email = CONFIG.email;
  if (valido(CONFIG.telefono)) contacto.telephone = CONFIG.telefono;
  if (contacto.email || contacto.telephone) org.contactPoint = [contacto];
  const redes = Object.values(CONFIG.redes || {}).filter(valido);
  if (redes.length) org.sameAs = redes;
  return org;
};

/* ---------------- Encabezado ---------------- */
function encabezado(ruta) {
  const enSoluciones = ruta.startsWith('/soluciones/');
  const actual = (r) => (ruta === r ? ' aria-current="page"' : '');
  const grupos = CATEGORIAS.map(c => `
          <div class="desplegable__grupo">
            <p class="desplegable__titulo">${esc(c.nombre)}</p>
            <ul>${SOLUCIONES.filter(s => s.categoria === c.id).map(s => `
              <li><a class="desplegable__enlace" href="/soluciones/${s.slug}/"${actual(`/soluciones/${s.slug}/`)}><span class="desplegable__nombre">${esc(s.nombre)}</span><span class="desplegable__lema">${esc(s.lema)}</span></a></li>`).join('')}
            </ul>
          </div>`).join('');
  return `
<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="encabezado">
  <div class="contenedor encabezado__barra">
    <a class="marca" href="/" aria-label="Grupo Logic, ir al inicio">${logoGrupoLogic()}</a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__lista">
        <li class="nav__item nav__item--desplegable">
          <button class="nav__enlace" type="button" aria-expanded="false" aria-controls="menu-soluciones" data-desplegable${enSoluciones ? ' data-seccion-actual' : ''}>Soluciones ${icono('chevron')}</button>
          <div class="desplegable" id="menu-soluciones" hidden>
            <div class="contenedor">
              <div class="desplegable__rejilla">${grupos}
              </div>
              <div class="desplegable__pie"><span>${mayuscula(N_SOLUCIONES)} soluciones seleccionadas para colegios de Latinoamérica.</span><a class="enlace-flecha" href="/soluciones/"${actual('/soluciones/')}>Ver el portafolio completo ${icono('flecha')}</a></div>
            </div>
          </div>
        </li>
        <li><a class="nav__enlace" href="/nosotros/"${actual('/nosotros/')}>Nosotros</a></li>
        <li><a class="nav__enlace" href="/contacto/"${actual('/contacto/')}>Contacto</a></li>
      </ul>
    </nav>
    <a class="boton boton--primario encabezado__cta" href="/contacto/">Solicitar demostración</a>
    <button class="boton-menu" type="button" aria-expanded="false" aria-controls="menu-movil" data-abrir-menu><span class="sr">Abrir menú</span>${icono('menu')}</button>
  </div>
</header>
<div class="menu-movil" id="menu-movil" role="dialog" aria-modal="true" aria-label="Menú principal" hidden>
  <div class="contenedor menu-movil__barra">
    <a class="marca" href="/" aria-label="Grupo Logic, ir al inicio">${logoGrupoLogic()}</a>
    <button class="boton-menu" type="button" data-cerrar-menu><span class="sr">Cerrar menú</span>${icono('cerrar')}</button>
  </div>
  <div class="contenedor menu-movil__cuerpo">
    <nav aria-label="Principal (móvil)">
      <ul class="menu-movil__lista">
        <li><a class="menu-movil__enlace" href="/">Inicio</a></li>
        <li><a class="menu-movil__enlace" href="/soluciones/">Soluciones</a>
          <ul class="menu-movil__sub">${SOLUCIONES.map(s => `
            <li><a href="/soluciones/${s.slug}/"><span>${esc(s.nombre)}</span><span>${esc(categoria(s.categoria).corto)}</span></a></li>`).join('')}
          </ul>
        </li>
        <li><a class="menu-movil__enlace" href="/nosotros/">Nosotros</a></li>
        <li><a class="menu-movil__enlace" href="/contacto/">Contacto</a></li>
      </ul>
    </nav>
    <div class="botones">
      <a class="boton boton--primario" href="/contacto/">Solicitar demostración</a>
      <a class="boton boton--secundario" href="#" data-gl="whatsapp" data-gl-mensaje="Hola, quisiera hablar con un asesor de Grupo Logic." target="_blank" rel="noopener" hidden>Hablar con un asesor</a>
    </div>
  </div>
</div>`;
}

/* ---------------- Pie ---------------- */
function pie() {
  return `
<footer class="pie">
  <div class="contenedor">
    <div class="pie__rejilla">
      <div class="pie__marca">
        <a class="marca" href="/" aria-label="Grupo Logic, ir al inicio">${logoGrupoLogic()}</a>
        <p>Acercamos a los colegios de Latinoamérica tecnología educativa desarrollada en otras partes del mundo, con implementación y acompañamiento.</p>
        <div class="pie__redes">
          <a href="#" data-gl="redes.linkedin" target="_blank" rel="noopener" hidden aria-label="Grupo Logic en LinkedIn">${icono('linkedin')}</a>
          <a href="#" data-gl="redes.instagram" target="_blank" rel="noopener" hidden aria-label="Grupo Logic en Instagram">${icono('instagram')}</a>
          <a href="#" data-gl="redes.youtube" target="_blank" rel="noopener" hidden aria-label="Grupo Logic en YouTube">${icono('youtube')}</a>
        </div>
      </div>
      <nav aria-label="Soluciones">
        <p class="pie__titulo">Soluciones</p>
        <ul>${SOLUCIONES.map(s => `<li><a href="/soluciones/${s.slug}/">${esc(s.nombre)}</a></li>`).join('')}</ul>
      </nav>
      <nav aria-label="Empresa">
        <p class="pie__titulo">Empresa</p>
        <ul>
          <li><a href="/nosotros/">Nosotros</a></li>
          <li><a href="/soluciones/">Portafolio</a></li>
          <li><a href="/contacto/">Solicitar demostración</a></li>
        </ul>
      </nav>
      <nav aria-label="Legal">
        <p class="pie__titulo">Legal</p>
        <ul>
          <li><a href="/terminos/">Términos y condiciones</a></li>
          <li><a href="/privacidad/">Política de privacidad</a></li>
          <li><a href="/reembolsos/">Política de reembolsos</a></li>
        </ul>
      </nav>
      <div>
        <p class="pie__titulo">Contacto</p>
        <ul class="pie__contacto">
          <li data-gl="email" hidden><a href="#" data-gl-enlace>${icono('correo')}<span data-gl-texto></span></a></li>
          <li data-gl="telefono" hidden><a href="#" data-gl-enlace>${icono('telefono')}<span data-gl-texto></span></a></li>
          <li data-gl="whatsapp" hidden data-gl-mensaje="Hola, quisiera información sobre las soluciones de Grupo Logic."><a href="#" data-gl-enlace target="_blank" rel="noopener">${icono('whatsapp')}<span>WhatsApp</span></a></li>
          <li data-gl="direccion" hidden><span>${icono('ubicacion')}<span data-gl-texto></span></span></li>
          <li data-gl="ciudad" hidden><span>${icono('ubicacion')}<span data-gl-texto></span></span></li>
          <li><span>${icono('globo')}<span>Latinoamérica</span></span></li>
          <li><a href="/contacto/">${icono('mensaje')}<span>Formulario de contacto</span></a></li>
        </ul>
      </div>
    </div>
    <div class="pie__base">
      <p>© ${ANIO} Grupo Logic. Todos los derechos reservados.</p>
      <p>Los nombres y logotipos de los productos pertenecen a sus respectivos titulares.</p>
    </div>
  </div>
</footer>`;
}

/* ---------------- Página completa ---------------- */
export function pagina({ ruta, titulo, descripcion, og, cuerpo, jsonld = [], scripts = [], indexar = true, precargar = '', mensajeWa }) {
  const url = DOMINIO + ruta;
  const imagenOg = `${DOMINIO}/assets/img/og/${og}.jpg`;
  const ld = jsonld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const js = { form: V.form, portfolio: V.portfolio };
  return `<!DOCTYPE html>
<html lang="es-419" class="sin-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
${indexar ? `<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="es-419" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
` : ''}<meta name="robots" content="${indexar ? 'index, follow, max-image-preview:large' : 'noindex, follow'}">
<meta name="theme-color" content="#0B1B33">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Grupo Logic">
<meta property="og:locale" content="es_LA">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${imagenOg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(titulo)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(descripcion)}">
<meta name="twitter:image" content="${imagenOg}">
<link rel="preload" href="/assets/fonts/fraunces-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope-700.woff2" as="font" type="font/woff2" crossorigin>
${precargar}<script>document.documentElement.className="js";</script>
<style>${BASE_CSS}</style>
<link rel="stylesheet" href="/assets/css/components.css?v=${V.components}">
<link rel="stylesheet" href="/assets/css/pages.css?v=${V.pages}">
${ld}
<script src="/assets/js/config.js?v=${V.config}" defer></script>
<script src="/assets/js/main.js?v=${V.main}" defer></script>
${scripts.map(s => `<script src="/assets/js/${s}.js?v=${js[s]}" defer></script>`).join('\n')}
</head>
<body>
${encabezado(ruta)}
<main id="contenido" tabindex="-1">
${cuerpo}
</main>
${pie()}
<a class="flotante flotante--whatsapp" href="#" target="_blank" rel="noopener" aria-label="Escribir a Grupo Logic por WhatsApp" data-mensaje="${esc(mensajeWa || 'Hola, quisiera información sobre las soluciones de Grupo Logic.')}" hidden>${icono('whatsapp')}</a>
<button class="flotante flotante--arriba" type="button" aria-label="Volver arriba">${icono('flechaArriba')}</button>
</body>
</html>
`;
}
