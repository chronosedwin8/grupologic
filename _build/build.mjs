// Generador del sitio estático de Grupo Logic.
// Ensambla cada página (encabezado + contenido + pie) y escribe HTML completo en ../sitio.
// Uso: node build.mjs   (requiere haber ejecutado antes: node imagenes.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { pagina, SITIO, DOMINIO, SOLUCIONES } from './lib/plantilla.mjs';
import inicio from './paginas/inicio.mjs';
import portafolio from './paginas/portafolio.mjs';
import paginaSolucion from './paginas/solucion.mjs';
import nosotros from './paginas/nosotros.mjs';
import contacto from './paginas/contacto.mjs';
import { privacidad, terminos, reembolsos } from './paginas/legales.mjs';
import error404 from './paginas/error404.mjs';

const HOY = new Date().toISOString().slice(0, 10);

const paginas = [
  inicio(),
  portafolio(),
  ...SOLUCIONES.map(s => paginaSolucion(s.slug)),
  nosotros(),
  contacto(),
  privacidad(),
  terminos(),
  reembolsos(),
  error404(),
];

for (const p of paginas) {
  const destino = p.ruta.endsWith('.html')
    ? path.join(SITIO, p.ruta)
    : path.join(SITIO, p.ruta, 'index.html');
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, pagina(p));
  // Validaciones rápidas de SEO
  const avisos = [];
  if (p.titulo.length > 70) avisos.push(`título de ${p.titulo.length} caracteres`);
  if (p.descripcion.length < 120 || p.descripcion.length > 160) avisos.push(`descripción de ${p.descripcion.length} caracteres`);
  console.log(`✓ ${p.ruta.padEnd(30)} ${avisos.join(', ')}`);
}

// sitemap.xml (todas las páginas indexables)
const indexables = paginas.filter(p => p.indexar !== false);
const prioridad = (r) => (r === '/' ? '1.0' : r.startsWith('/soluciones/') ? '0.9' : r === '/contacto/' ? '0.8' : r === '/nosotros/' ? '0.7' : '0.3');
fs.writeFileSync(path.join(SITIO, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexables.map(p => `  <url>
    <loc>${DOMINIO}${p.ruta}</loc>
    <xhtml:link rel="alternate" hreflang="es-419" href="${DOMINIO}${p.ruta}"/>
    <lastmod>${HOY}</lastmod>
    <priority>${prioridad(p.ruta)}</priority>
  </url>`).join('\n')}
</urlset>
`);

fs.writeFileSync(path.join(SITIO, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${DOMINIO}/sitemap.xml
`);

fs.writeFileSync(path.join(SITIO, 'site.webmanifest'), JSON.stringify({
  name: 'Grupo Logic',
  short_name: 'Grupo Logic',
  description: 'Tecnología educativa para colegios de Latinoamérica',
  lang: 'es-419',
  start_url: '/',
  display: 'standalone',
  background_color: '#06101F',
  theme_color: '#0B1B33',
  icons: [
    { src: '/assets/img/iconos/icono-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/img/iconos/icono-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
  ],
}, null, 2) + '\n');

// Lista para el generador de imágenes Open Graph
fs.writeFileSync('paginas.json', JSON.stringify(paginas.map(p => ({ og: p.og, ruta: p.ruta, titulo: p.titulo })), null, 1));
console.log(`\n${paginas.length} páginas generadas en ${SITIO}`);
