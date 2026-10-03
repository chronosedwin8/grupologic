// Portafolio completo con filtro por línea.
import { SOLUCIONES, CATEGORIAS, categoria, esc, icono, logotipo, imagen, migasLd, DOMINIO, N_SOLUCIONES, N_LINEAS, mayuscula } from '../lib/plantilla.mjs';
import { ctaFinal } from './inicio.mjs';

const ALT = {
  unticloud: 'Panel de UntiCloud con los totales de la institución importados desde Untis',
  'veyon-control': 'Panel Veyon Master con las pantallas de los equipos del aula',
  'aulamagica-ia': 'Herramientas de inteligencia artificial de AulaMágica IA para docentes',
  edunova: 'Planeación de una clase con inteligencia artificial en EduNova',
  codexia: 'Reto de programación por bloques en Codexia',
  vcodepro: 'Editor de código VCodePro con un proyecto evaluado con criterios IB',
  bookstudio: 'Editor de libros interactivos de BookStudio',
};

export default function portafolio() {
  const filtros = [{ id: 'todas', corto: 'Todas', nombre: 'todo el portafolio' }, ...CATEGORIAS].map((c, i) => {
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
          <a class="enlace-flecha tarjeta-solucion__enlace" href="/soluciones/${s.slug}/">Ver solución<span class="sr">: ${esc(s.nombre)}</span> ${icono('flecha')}</a>
        </div>
      </li>`).join('\n      ');

  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Soluciones</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Portafolio</p>
      <h1 class="titulo-1" id="titulo-principal">Soluciones tecnológicas <em>para colegios</em></h1>
      <p class="hero__texto">${mayuscula(N_SOLUCIONES)} plataformas seleccionadas en ${N_LINEAS} líneas: gestión institucional, inteligencia artificial para la enseñanza, programación y contenidos digitales interactivos.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-catalogo">
  <div class="contenedor">
    <h2 class="sr" id="titulo-catalogo">Catálogo de soluciones</h2>
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
      <p class="entrada">Codexia y VCodePro forman una ruta continua de pensamiento computacional, desde preescolar hasta el final del bachillerato.</p>
    </div>
    <div class="ruta" data-aparecer-grupo>
      <article class="tarjeta tarjeta--oscura" data-aparecer>
        <p class="ruta__edad">4 – 12 años</p>
        <h3>${logotipo('codexia')}</h3>
        <p class="tarjeta__texto">Retos gamificados con bloques y código real, voz natural para quienes aún no leen y diez materias que incluyen lógica, matemáticas e inteligencia artificial.</p>
        <a class="enlace-flecha" href="/soluciones/codexia/">Conocer Codexia ${icono('flecha')}</a>
      </article>
      <div class="ruta__flecha" aria-hidden="true">${icono('flecha')}</div>
      <article class="tarjeta tarjeta--oscura" data-aparecer>
        <p class="ruta__edad">Desde 12 años</p>
        <h3>${logotipo('vcodepro')}</h3>
        <p class="tarjeta__texto">Editor profesional con IA en modo pedagógico, estudio de agentes, rúbricas IB y plan de aula de 6.º a 12.º con más de 120 proyectos.</p>
        <a class="enlace-flecha" href="/soluciones/vcodepro/">Conocer VCodePro ${icono('flecha')}</a>
      </article>
    </div>
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-comparar">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Inteligencia artificial para la enseñanza</p>
      <h2 class="titulo-2" id="titulo-comparar">AulaMágica IA y EduNova: <em>¿cuál necesita?</em></h2>
      <p class="entrada">Las dos usan inteligencia artificial, pero resuelven necesidades distintas. Esta comparación le ayuda a orientar la conversación con su equipo.</p>
    </div>
    <div class="tabla-envoltura" data-aparecer>
      <table class="tabla">
        <caption>Comparación según la información publicada por cada fabricante.</caption>
        <thead><tr><th scope="col">Aspecto</th><th scope="col">AulaMágica IA</th><th scope="col">EduNova</th></tr></thead>
        <tbody>
          <tr><th scope="row">Qué es</th><td>Caja de herramientas de IA para docentes y estudiantes.</td><td>Sistema integrado para todo el ciclo de aprendizaje.</td></tr>
          <tr><th scope="row">Alcance</th><td>Más de 80 herramientas para docentes y más de 50 para estudiantes.</td><td>Ocho módulos conectados, del libro de texto al boletín.</td></tr>
          <tr><th scope="row">Perfiles</th><td>Directivos, docentes y estudiantes.</td><td>Directivos, docentes, estudiantes y familias.</td></tr>
          <tr><th scope="row">Ideal cuando</th><td>Quiere llevar IA segura al trabajo diario del docente, con control institucional.</td><td>Quiere unificar planeación, evaluación, recuperación y comunicación en un solo sistema.</td></tr>
          <tr><th scope="row">Contenidos propios</th><td>Herramientas personalizadas para su red (Licencia por Volumen).</td><td>Studio: libros de texto con la identidad de su institución (Licencia por Volumen).</td></tr>
        </tbody>
      </table>
    </div>
    <div class="botones" style="margin-top:28px">
      <a class="enlace-flecha" href="/soluciones/aulamagica-ia/">Conocer AulaMágica IA ${icono('flecha')}</a>
      <a class="enlace-flecha" href="/soluciones/edunova/">Conocer EduNova ${icono('flecha')}</a>
    </div>
  </div>
</section>

${ctaFinal()}`;

  return {
    ruta: '/soluciones/',
    titulo: 'Soluciones tecnológicas para colegios · Grupo Logic',
    descripcion: 'Software para colegios en cuatro líneas: gestión institucional, inteligencia artificial, programación y contenidos interactivos. Conozca el portafolio.',
    og: 'soluciones',
    cuerpo,
    scripts: ['portfolio', 'form'],
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'Portafolio de soluciones de Grupo Logic',
        itemListElement: SOLUCIONES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.nombre, url: `${DOMINIO}/soluciones/${s.slug}/` })),
      },
      migasLd([['Inicio', '/'], ['Soluciones', '/soluciones/']]),
    ],
  };
}
