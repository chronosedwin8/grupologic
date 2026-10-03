// Plantilla de página de solución (especificación 5.2).
import {
  solucion, categoria, esc, icono, logotipo, imagen, marco, acordeon, faqLd, migasLd, DOMINIO,
} from '../lib/plantilla.mjs';
import { pasos } from './inicio.mjs';
import { CONTENIDO } from '../contenido/soluciones.mjs';

export default function paginaSolucion(slug) {
  const s = solucion(slug);
  const c = CONTENIDO[slug];
  const cat = categoria(s.categoria);
  const ruta = `/soluciones/${slug}/`;
  const contacto = `/contacto/?solucion=${slug}`;
  const nFunciones = c.funciones.length;

  const etiquetas = [
    `<span class="etiqueta">${icono('capas')}${esc(cat.nombre)}</span>`,
    s.origen ? `<span class="etiqueta">${icono('globo')}Origen: ${esc(s.origen)}</span>` : '',
  ].join('');

  const galeria = c.galeria.length ? `
    <div class="galeria${c.galeria.length === 1 ? ' galeria--1' : ''}" data-aparecer-grupo>
      ${c.galeria.map(([base, alt, titulo, texto]) => `<figure data-aparecer>
        <div class="galeria__imagen">${imagen(base, alt, { sizes: c.galeria.length === 1 ? '(min-width: 960px) 836px, 92vw' : '(min-width: 1240px) 580px, (min-width: 960px) 45vw, 92vw' })}</div>
        <figcaption><strong>${esc(titulo)}.</strong> ${esc(texto)}</figcaption>
      </figure>`).join('\n      ')}
    </div>` : '';

  const extra = c.extra ? `
    <div class="bloque-extra" data-aparecer>
      <h3 class="bloque-extra__titulo">${esc(c.extra.titulo)}</h3>
      <ul class="lista-columnas">${c.extra.items.map(i => `<li>${icono('check')}<span>${esc(i)}</span></li>`).join('')}</ul>
    </div>` : '';

  const relacionadas = c.relacionadas.map(r => solucion(r));

  const cuerpo = `
<section class="hero hero--pagina hero-producto" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan">
      <ol><li><a href="/">Inicio</a></li><li><a href="/soluciones/">Soluciones</a></li><li><span aria-current="page">${esc(s.nombre)}</span></li></ol>
    </nav>
    <div class="hero__contenido">
      <div class="hero-producto__cabecera">
        <span class="hero-producto__logo">${logotipo(slug, { color: true })}</span>
        <div class="etiquetas">${etiquetas}</div>
      </div>
      <h1 class="titulo-1" id="titulo-principal">${esc(c.h1)}</h1>
      <p class="hero__texto">${esc(s.resumen)}</p>
      <div class="botones">
        <a class="boton boton--primario" href="${contacto}">Solicitar demostración ${icono('flecha')}</a>
        <a class="boton boton--secundario" href="${s.urlOficial}" target="_blank" rel="noopener">Visitar sitio oficial ${icono('externo')}<span class="sr"> (se abre en una pestaña nueva)</span></a>
      </div>
    </div>
  </div>
</section>

<section class="seccion-captura" aria-label="Captura de ${esc(s.nombre)}">
  <div class="contenedor">
    <figure>
      ${marco(s.portada, c.altPortada, s.dominio, { eager: true, sizes: '(min-width: 1184px) 1120px, 92vw' })}
      <figcaption class="marco__nota">Captura del sitio oficial de ${esc(s.nombre)} (${esc(s.dominio)}).</figcaption>
    </figure>
  </div>
</section>

<section class="seccion seccion--clara" style="padding-top:0" aria-labelledby="titulo-reto">
  <div class="contenedor reto">
    <div data-aparecer>
      <p class="ceja">El reto que resuelve</p>
      <h2 class="titulo-2" id="titulo-reto">${esc(s.lema)}</h2>
    </div>
    <div data-aparecer>
      <div class="prosa">${c.reto.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      ${c.nota ? `<p class="nota-legal">${c.nota}</p>` : ''}
    </div>
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-funciones">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Funcionalidades clave</p>
      <h2 class="titulo-2" id="titulo-funciones">${esc(c.funcionesTitulo || `Lo que ${s.nombre} aporta a su institución`)}</h2>
    </div>
    <div class="rejilla-tarjetas ${nFunciones > 6 ? 'rejilla-tarjetas--4' : 'rejilla-tarjetas--3'}" data-aparecer-grupo>
      ${c.funciones.map(([ic, t, d]) => `<article class="tarjeta" data-aparecer>
        <div class="tarjeta__icono">${icono(ic)}</div>
        <h3 class="tarjeta__titulo">${esc(t)}</h3>
        <p class="tarjeta__texto">${esc(d)}</p>
      </article>`).join('\n      ')}
    </div>${galeria}${extra}
  </div>
</section>

<section class="seccion seccion--oscura" aria-labelledby="titulo-publico">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Para quién es</p>
      <h2 class="titulo-2" id="titulo-publico">Valor para <em>cada rol</em> de su institución</h2>
    </div>
    <div class="rejilla-tarjetas rejilla-tarjetas--4" data-aparecer-grupo>
      ${c.publico.map(([ic, rol, frase, lista]) => `<article class="tarjeta tarjeta--oscura" data-aparecer>
        <div class="tarjeta__icono">${icono(ic)}</div>
        <h3 class="tarjeta__titulo">${esc(rol)}</h3>
        <p class="tarjeta__texto">${esc(frase)}</p>
        <ul class="tarjeta__lista">${lista.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-implementacion">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Implementación en su institución</p>
      <h2 class="titulo-2" id="titulo-implementacion">De la decisión <em>al aula</em></h2>
      <p class="entrada">Grupo Logic coordina cada paso con el fabricante y acompaña la formación de su equipo.</p>
    </div>
    ${pasos(c.implementacion.map(([t, d]) => [t, esc(d)]))}
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-licencias">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Licenciamiento</p>
      <h2 class="titulo-2" id="titulo-licencias">Modalidades de licencia</h2>
      <p class="entrada">${esc(c.licencias.intro)}</p>
    </div>
    <div class="licencias licencias--${c.licencias.modalidades.length}" data-aparecer-grupo>
      ${c.licencias.modalidades.map(([nombre, para, items]) => `<article class="tarjeta licencia" data-aparecer>
        <h3 class="licencia__nombre">${esc(nombre)}</h3>
        <p class="licencia__para">${esc(para)}</p>
        <ul class="tarjeta__lista">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
      </article>`).join('\n      ')}
    </div>
    <div class="licencias__pie" data-aparecer>
      <p>No publicamos precios: cada propuesta se ajusta al número de usuarios, a las sedes y a la formación que requiere su institución.${c.licencias.pie ? ' ' + esc(c.licencias.pie) : ''}</p>
      <a class="boton boton--oscuro" href="${contacto}">Solicitar propuesta ${icono('flecha')}</a>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-preguntas">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Preguntas frecuentes</p>
      <h2 class="titulo-2" id="titulo-preguntas">Preguntas sobre ${esc(s.nombre)}</h2>
    </div>
    ${acordeon(c.preguntas, `faq-${slug}`)}
  </div>
</section>

<section class="seccion seccion--oscura" aria-labelledby="titulo-relacionadas">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Soluciones relacionadas</p>
      <h2 class="titulo-2" id="titulo-relacionadas">Complementan a ${esc(s.nombre)}</h2>
    </div>
    <div class="relacionadas relacionadas--3" data-aparecer-grupo>
      ${relacionadas.map(r => `<article class="tarjeta tarjeta--oscura relacionada" data-aparecer>
        ${logotipo(r.slug)}
        <p class="tarjeta-solucion__linea" style="color:var(--gold-500)">${esc(categoria(r.categoria).nombre)}</p>
        <p class="relacionada__lema">${esc(r.lema)}</p>
        <a class="enlace-flecha tarjeta-solucion__enlace" href="/soluciones/${r.slug}/">Conocer ${esc(r.nombre)} ${icono('flecha')}</a>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="seccion seccion--profunda" aria-labelledby="titulo-cta">
  <div class="contenedor cta-simple" data-aparecer>
    <p class="ceja">Demostración</p>
    <h2 class="titulo-2" id="titulo-cta">Vea ${esc(s.nombre)} <em>en funcionamiento</em></h2>
    <p class="entrada" style="margin:1.2rem auto 0">Agende una demostración con un asesor de Grupo Logic y reciba una propuesta ajustada a su institución.</p>
    <div class="botones">
      <a class="boton boton--primario" href="${contacto}">Solicitar demostración ${icono('flecha')}</a>
      <a class="boton boton--secundario" href="#" data-gl="whatsapp" data-gl-mensaje="Hola, quisiera hablar con un asesor sobre ${esc(s.nombre)}." target="_blank" rel="noopener" hidden>Hablar con un asesor</a>
    </div>
  </div>
</section>`;

  const app = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: s.nombre,
    description: s.resumen,
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: c.ld.applicationSubCategory,
    operatingSystem: c.ld.operatingSystem,
    url: s.urlOficial,
    image: `${DOMINIO}/assets/img/productos/${s.portada}-1440.webp`,
    inLanguage: 'es',
    audience: { '@type': 'EducationalAudience', educationalRole: 'administrator' },
    provider: { '@type': 'Organization', '@id': DOMINIO + '/#organizacion', name: 'Grupo Logic', url: DOMINIO + '/' },
    mainEntityOfPage: DOMINIO + ruta,
  };
  if (c.ld.softwareVersion) app.softwareVersion = c.ld.softwareVersion;

  return {
    ruta,
    titulo: c.titulo,
    descripcion: c.descripcion,
    og: slug,
    cuerpo,
    mensajeWa: `Hola, quisiera información sobre ${s.nombre}.`,
    precargar: `<link rel="preload" as="image" type="image/webp" imagesrcset="${[1440, 960, 640].map(w => `/assets/img/productos/${s.portada}-${w}.webp ${w}w`).join(', ')}" imagesizes="(min-width: 1184px) 1120px, 92vw" fetchpriority="high">\n`,
    jsonld: [app, migasLd([['Inicio', '/'], ['Soluciones', '/soluciones/'], [s.nombre, ruta]]), faqLd(c.preguntas)],
  };
}
