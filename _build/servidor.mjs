// Servidor local de vista previa con compresión gzip, caché de estáticos y página 404.
// Uso: node servidor.mjs [puerto]   → http://127.0.0.1:8080
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { SITIO } from './lib/plantilla.mjs';

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };
const COMPRIMIBLE = /\.(html|css|js|json|svg|xml|txt|webmanifest)$/;
const puerto = +process.argv[2] || 8080;

http.createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (ruta.endsWith('/')) ruta += 'index.html';
  let archivo = path.join(SITIO, path.normalize(ruta));
  let estado = 200;
  if (!archivo.startsWith(SITIO) || !fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) {
    if (fs.existsSync(path.join(archivo, 'index.html'))) { res.writeHead(301, { Location: ruta + '/' }); return res.end(); }
    archivo = path.join(SITIO, '404.html'); estado = 404;
  }
  const ext = path.extname(archivo);
  const cabeceras = { 'Content-Type': TIPOS[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' };
  let cuerpo = fs.readFileSync(archivo);
  if (COMPRIMIBLE.test(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) { cuerpo = zlib.gzipSync(cuerpo, { level: 9 }); cabeceras['Content-Encoding'] = 'gzip'; cabeceras.Vary = 'Accept-Encoding'; }
  res.writeHead(estado, cabeceras);
  res.end(cuerpo);
}).listen(puerto, '127.0.0.1', () => console.log(`Vista previa en http://127.0.0.1:${puerto}`));
