// Nosotros: Grupo Logic como empresa de software educativo.
import { SOLUCIONES, categoria, esc, icono, logotipo, migasLd, organizacionLd, N_SOLUCIONES, mayuscula, CONFIG, valido } from '../lib/plantilla.mjs';

const PRINCIPIOS = [
  ['capas', 'Productos estándar', 'Cada producto tiene funciones, planes y precios definidos y publicados, iguales para todas las instituciones.'],
  ['reemplazo', 'Actualizaciones continuas', 'Publicamos nuevas versiones de cada producto; las licencias vigentes las reciben sin costo adicional.'],
  ['escudo', 'Seguridad y privacidad', 'Control por roles, cifrado y especial protección de los datos de menores, conforme a la Ley 1581 de 2012.'],
  ['tableta', 'Pensado para el aula', 'Interfaces en español, pensadas para tabletas y equipos modestos, y fáciles de usar para docentes y estudiantes.'],
];

export default function nosotros() {
  const razon = valido(CONFIG.legal?.razonSocial) ? CONFIG.legal.razonSocial : 'Grupo Logic';
  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Nosotros</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Nosotros</p>
      <h1 class="titulo-1" id="titulo-principal">Una empresa de <em>software educativo</em></h1>
      <p class="hero__texto">${esc(razon)} diseña, desarrolla y comercializa software para instituciones educativas de Latinoamérica.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-quienes">
  <div class="contenedor dos-columnas">
    <div data-aparecer>
      <p class="ceja">Qué hacemos</p>
      <h2 class="titulo-2" id="titulo-quienes">Construimos y operamos <em>nuestros propios productos</em></h2>
    </div>
    <div class="prosa" data-aparecer>
      <p>Creamos productos de software que resuelven necesidades concretas de los colegios: gestionar horarios y ausentismo docente, enseñar programación desde preescolar hasta bachillerato y crear contenidos interactivos.</p>
      <p>Cada producto tiene su propio sitio, sus planes y su precio publicado, y se puede usar de forma independiente.</p>
      <p>Nos ocupamos del ciclo completo del software: diseño, desarrollo, operación de las plataformas web, publicación de nuevas versiones y soporte técnico a quienes lo usan.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--profunda" aria-labelledby="titulo-mision">
  <div class="contenedor">
    <p class="ceja">Misión</p>
    <h2 class="sr" id="titulo-mision">Misión</h2>
    <p class="manifiesto" data-aparecer>Construir <em>software útil para los colegios</em> de Latinoamérica, con precios claros y productos que se mantienen al día.</p>
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-principios">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Cómo construimos</p>
      <h2 class="titulo-2" id="titulo-principios">Principios de <em>nuestros productos</em></h2>
    </div>
    <div class="rejilla-tarjetas rejilla-tarjetas--4" data-aparecer-grupo>
      ${PRINCIPIOS.map(([ic, t, d]) => `<article class="tarjeta" data-aparecer>
        <div class="tarjeta__icono">${icono(ic)}</div>
        <h3 class="tarjeta__titulo">${esc(t)}</h3>
        <p class="tarjeta__texto">${esc(d)}</p>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="seccion seccion--oscura" aria-labelledby="titulo-productos">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Productos</p>
      <h2 class="titulo-2" id="titulo-productos">${mayuscula(N_SOLUCIONES)} productos <em>de Grupo Logic</em></h2>
    </div>
    <div class="relacionadas relacionadas--3" data-aparecer-grupo>
      ${SOLUCIONES.map(s => `<article class="tarjeta tarjeta--oscura relacionada" data-aparecer>
        ${logotipo(s.slug)}
        <p class="tarjeta-solucion__linea" style="color:var(--gold-500)">${esc(categoria(s.categoria).nombre)}</p>
        <p class="relacionada__lema">${esc(s.lema)}</p>
        <a class="enlace-flecha tarjeta-solucion__enlace" href="/productos/${s.slug}/">Ver ${esc(s.nombre)} ${icono('flecha')}</a>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-compromisos">
  <div class="contenedor dos-columnas">
    <div data-aparecer>
      <p class="ceja">Nuestros compromisos</p>
      <h2 class="titulo-2" id="titulo-compromisos">Lo que puede <em>esperar de nosotros</em></h2>
    </div>
    <ul class="lista-columnas" data-aparecer>
      <li>${icono('check')}<span>Información veraz sobre las funciones de cada producto.</span></li>
      <li>${icono('check')}<span>Precios publicados y condiciones claras antes de pagar.</span></li>
      <li>${icono('check')}<span>Actualizaciones incluidas durante la vigencia de la licencia.</span></li>
      <li>${icono('check')}<span>Soporte técnico del producto por correo, en español.</span></li>
      <li>${icono('check')}<span>Reembolso total dentro de los 14 días siguientes al pago.</span></li>
      <li>${icono('check')}<span>Protección de los datos personales de la comunidad educativa.</span></li>
    </ul>
  </div>
</section>

<section class="seccion seccion--profunda" aria-labelledby="titulo-cta">
  <div class="contenedor cta-simple" data-aparecer>
    <p class="ceja">Productos</p>
    <h2 class="titulo-2" id="titulo-cta">Conozca <em>nuestro software</em></h2>
    <ul class="franja__logos" style="margin-top:2rem">${SOLUCIONES.map(s => `<li><a href="/productos/${s.slug}/">${logotipo(s.slug)}</a></li>`).join('')}</ul>
    <div class="botones">
      <a class="boton boton--primario" href="/productos/">Ver productos ${icono('flecha')}</a>
      <a class="boton boton--secundario" href="/precios/">Ver precios</a>
    </div>
  </div>
</section>`;

  return {
    ruta: '/nosotros/',
    titulo: 'Nosotros: empresa de software educativo · Grupo Logic',
    descripcion: `${razon} diseña, desarrolla y comercializa software para colegios: gestión escolar, programación y contenidos interactivos.`,
    og: 'nosotros',
    cuerpo,
    jsonld: [organizacionLd(), migasLd([['Inicio', '/'], ['Nosotros', '/nosotros/']])],
  };
}
