// Catálogo de productos con filtro por línea: /productos/
import { SOLUCIONES, CATEGORIAS, categoria, esc, icono, logotipo, imagen, migasLd, DOMINIO, N_SOLUCIONES, N_LINEAS, mayuscula } from '../lib/plantilla.mjs';
import { ctaFinal } from '../lib/bloques.mjs';
import { CONTENIDO } from '../contenido/soluciones.mjs';

const ALT = {
  unticloud: 'Panel de UntiCloud con los totales de la institución importados desde Untis',
  codexia: 'Reto de programación por bloques en Codexia',
  'codenest-school': 'Actividad de programación con flechas en CodeNest School',
  vcodepro: 'Editor de código VCodePro con un proyecto evaluado con criterios IB',
  bookstudio: 'Editor de libros interactivos de BookStudio',
};

// Precio más bajo publicado de un producto, para mostrar «Desde …».
export function precioDesde(slug) {
  const valores = CONTENIDO[slug].licencias.modalidades.filter(m => m.precio);
  if (!valores.length) return '';
  const minimo = valores.reduce((a, b) => (+b.precio.replace(/\D/g, '') < +a.precio.replace(/\D/g, '') ? b : a));
  return `Desde ${minimo.precio} ${minimo.periodo}`;
}

export default function portafolio() {
  const filtros = [{ id: 'todas', corto: 'Todos', nombre: 'todos los productos' }, ...CATEGORIAS].map((c, i) => {
    const n = c.id === 'todas' ? SOLUCIONES.length : SOLUCIONES.filter(s => s.categoria === c.id).length;
    return `<button class="filtro" type="button" data-filtro="${c.id}" data-nombre="${esc(c.nombre)}" aria-pressed="${i === 0}">${esc(c.corto)}<span class="filtro__cuenta" aria-hidden="true">${n}</span></button>`;
  }).join('');

  const tarjetas = SOLUCIONES.map(s => `<li class="tarjeta tarjeta-solucion" data-categoria="${s.categoria}">
        <div class="tarjeta-solucion__imagen">${imagen(s.imagen, ALT[s.slug], { sizes: '(min-width: 1240px) 380px, (min-width: 1100px) 30vw, (min-width: 640px) 45vw, 92vw' })}</div>
        <div class="tarjeta-solucion__cuerpo">
          <p class="tarjeta-solucion__linea">${esc(categoria(s.categoria).nombre)}</p>
          <h3>${logotipo(s.slug)}</h3>
          <p class="tarjeta-solucion__lema">${esc(s.lema)}</p>
          <p class="tarjeta-solucion__resumen">${esc(s.resumen)}</p>
          <p class="tarjeta-solucion__precio">${esc(precioDesde(s.slug))}</p>
          <a class="enlace-flecha tarjeta-solucion__enlace" href="/productos/${s.slug}/">Ver producto<span class="sr">: ${esc(s.nombre)}</span> ${icono('flecha')}</a>
        </div>
      </li>`).join('\n      ');

  const programacion = ['codexia', 'codenest-school'].map(slug => {
    const s = SOLUCIONES.find(x => x.slug === slug);
    return `<article class="tarjeta tarjeta--oscura" data-aparecer>
          <p class="ruta__edad">4 – 12 años</p>
          <h3>${logotipo(slug)}</h3>
          <p class="tarjeta__texto">${slug === 'codexia'
            ? 'Diez materias —programación, lógica, matemáticas, inteligencia artificial y más— con retos gamificados, voz natural y más de 200 juegos.'
            : 'Solo programación, en tres etapas: flechas sin texto, bloques con código a la vista y JavaScript o Python reales, con voz en español en cada reto.'}</p>
          <a class="enlace-flecha" href="/productos/${slug}/">Ver ${esc(s.nombre)} ${icono('flecha')}</a>
        </article>`;
  }).join('\n        ');

  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Productos</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Productos</p>
      <h1 class="titulo-1" id="titulo-principal">Software para colegios <em>de Grupo Logic</em></h1>
      <p class="hero__texto">${mayuscula(N_SOLUCIONES)} productos propios en ${N_LINEAS} líneas: gestión escolar, programación y pensamiento computacional, y contenidos digitales interactivos. Cada uno con sus planes y precios publicados.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-catalogo">
  <div class="contenedor">
    <h2 class="sr" id="titulo-catalogo">Catálogo de productos</h2>
    <div class="filtros" role="group" aria-label="Filtrar por línea">${filtros}</div>
    <p class="sr" id="resultado-filtro" role="status" aria-live="polite"></p>
    <ul class="catalogo" role="list">
      ${tarjetas}
    </ul>
  </div>
</section>

<section class="seccion seccion--oscura" aria-labelledby="titulo-ruta">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Ruta de programación</p>
      <h2 class="titulo-2" id="titulo-ruta">Del primer bloque <em>al primer agente de IA</em></h2>
      <p class="entrada">Codexia o CodeNest School en preescolar y primaria, y VCodePro desde los 12 años, forman una ruta continua de programación hasta el final del bachillerato.</p>
    </div>
    <div class="ruta" data-aparecer-grupo>
      <div class="ruta__grupo">
        ${programacion}
      </div>
      <div class="ruta__flecha" aria-hidden="true">${icono('flecha')}</div>
      <article class="tarjeta tarjeta--oscura" data-aparecer>
        <p class="ruta__edad">Desde 12 años</p>
        <h3>${logotipo('vcodepro')}</h3>
        <p class="tarjeta__texto">Editor profesional con IA en modo pedagógico, estudio de agentes, rúbricas IB y plan de aula de 6.º a 12.º con más de 120 proyectos.</p>
        <a class="enlace-flecha" href="/productos/vcodepro/">Ver VCodePro ${icono('flecha')}</a>
      </article>
    </div>
  </div>
</section>

${ctaFinal()}`;

  return {
    ruta: '/productos/',
    titulo: 'Productos de software para colegios · Grupo Logic',
    descripcion: 'Software de Grupo Logic para colegios: gestión escolar, programación para niños y jóvenes y libros interactivos. Planes y precios publicados.',
    og: 'productos',
    cuerpo,
    scripts: ['portfolio', 'form'],
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'Productos de software de Grupo Logic',
        itemListElement: SOLUCIONES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.nombre, url: `${DOMINIO}/productos/${s.slug}/` })),
      },
      migasLd([['Inicio', '/'], ['Productos', '/productos/']]),
    ],
  };
}
