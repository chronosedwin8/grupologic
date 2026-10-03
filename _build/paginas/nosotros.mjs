// Quiénes somos, misión y cómo trabajamos.
import { SOLUCIONES, esc, icono, logotipo, migasLd, organizacionLd } from '../lib/plantilla.mjs';
import { pasos, PASOS_TRABAJO } from './inicio.mjs';

const CRITERIOS = [
  ['birrete', 'Solidez pedagógica', 'La solución debe resolver un problema real del aula o de la gestión escolar, con un enfoque pedagógico claro y no solo tecnológico.'],
  ['capas', 'Madurez técnica', 'Plataformas estables, que funcionen en la infraestructura habitual de los colegios de la región y que no exijan servidores propios cuando no es necesario.'],
  ['escudo', 'Tratamiento de datos', 'Revisamos qué declara cada fabricante sobre seguridad, roles, protección de menores y uso de la información.'],
  ['globo', 'Pertinencia regional', 'Interfaces y contenidos en español y aplicables al contexto latinoamericano: estándares, pruebas de Estado y programas como el IB.'],
];

export default function nosotros() {
  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Nosotros</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Quiénes somos</p>
      <h1 class="titulo-1" id="titulo-principal">Tecnología educativa del mundo, <em>con acompañamiento cercano</em></h1>
      <p class="hero__texto">Grupo Logic es una empresa con sede en Barranquilla, Colombia, que acerca a los colegios de Latinoamérica recursos pedagógicos de tipo tecnológico desarrollados en otras partes del mundo.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-quienes">
  <div class="contenedor dos-columnas">
    <div data-aparecer>
      <p class="ceja">Nuestra razón de ser</p>
      <h2 class="titulo-2" id="titulo-quienes">Cerrar la distancia entre <em>la innovación y el aula</em></h2>
    </div>
    <div class="prosa" data-aparecer>
      <p>En Europa y en otras regiones se desarrollan plataformas educativas de muy alto nivel que rara vez llegan a los colegios latinoamericanos, o llegan sin el acompañamiento necesario para que funcionen en el día a día.</p>
      <p>Grupo Logic nace para cerrar esa distancia. Identificamos soluciones con valor real para la gestión escolar y para el aprendizaje, y las ponemos al alcance de rectores, coordinadores y docentes de la región, con un interlocutor local que entiende su contexto.</p>
      <p>No vendemos licencias sueltas: acompañamos decisiones institucionales. Por eso cada solución llega con diagnóstico, demostración, implementación, formación docente y seguimiento.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--profunda" aria-labelledby="titulo-mision">
  <div class="contenedor">
    <p class="ceja">Misión</p>
    <h2 class="sr" id="titulo-mision">Misión</h2>
    <p class="manifiesto" data-aparecer>Poner al servicio de los colegios de Latinoamérica <em>la mejor tecnología educativa del mundo</em>, con criterio en la selección y compromiso en la implementación.</p>
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-criterios">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Cómo seleccionamos</p>
      <h2 class="titulo-2" id="titulo-criterios">Cuatro criterios para <em>entrar al portafolio</em></h2>
      <p class="entrada">Antes de presentar una solución a su institución, la revisamos con los mismos criterios con los que usted la evaluaría.</p>
    </div>
    <div class="rejilla-tarjetas rejilla-tarjetas--4" data-aparecer-grupo>
      ${CRITERIOS.map(([ic, t, d]) => `<article class="tarjeta" data-aparecer>
        <div class="tarjeta__icono">${icono(ic)}</div>
        <h3 class="tarjeta__titulo">${esc(t)}</h3>
        <p class="tarjeta__texto">${esc(d)}</p>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="seccion seccion--oscura" aria-labelledby="titulo-trabajo">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Cómo trabajamos</p>
      <h2 class="titulo-2" id="titulo-trabajo">Un proceso claro, <em>de principio a fin</em></h2>
      <p class="entrada">Su institución tiene un solo interlocutor. Nosotros coordinamos con cada fabricante.</p>
    </div>
    ${pasos(PASOS_TRABAJO)}
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-compromisos">
  <div class="contenedor dos-columnas">
    <div data-aparecer>
      <p class="ceja">Nuestros compromisos</p>
      <h2 class="titulo-2" id="titulo-compromisos">Lo que puede <em>esperar de nosotros</em></h2>
    </div>
    <ul class="lista-columnas" data-aparecer>
      <li>${icono('check')}<span>Información veraz: solo afirmamos lo que cada fabricante publica y podemos verificar.</span></li>
      <li>${icono('check')}<span>Propuestas formales y por escrito, ajustadas a su institución.</span></li>
      <li>${icono('check')}<span>Formación para su equipo docente en cada implementación.</span></li>
      <li>${icono('check')}<span>Un punto de contacto para dudas, soporte y renovaciones.</span></li>
      <li>${icono('check')}<span>Revisión conjunta del tratamiento de datos antes de contratar.</span></li>
      <li>${icono('check')}<span>Seguimiento del uso para que la inversión se convierta en resultados.</span></li>
    </ul>
  </div>
</section>

<section class="seccion seccion--profunda" aria-labelledby="titulo-cta">
  <div class="contenedor cta-simple" data-aparecer>
    <p class="ceja">Portafolio</p>
    <h2 class="titulo-2" id="titulo-cta">Seis soluciones, <em>un solo aliado</em></h2>
    <ul class="franja__logos" style="margin-top:2rem">${SOLUCIONES.map(s => `<li><a href="/soluciones/${s.slug}/">${logotipo(s.slug)}</a></li>`).join('')}</ul>
    <div class="botones">
      <a class="boton boton--primario" href="/contacto/">Solicitar demostración ${icono('flecha')}</a>
      <a class="boton boton--secundario" href="/soluciones/">Conocer el portafolio</a>
    </div>
  </div>
</section>`;

  return {
    ruta: '/nosotros/',
    titulo: 'Nosotros: tecnología educativa con criterio · Grupo Logic',
    descripcion: 'Grupo Logic acerca a los colegios de Latinoamérica tecnología educativa seleccionada en el mundo, con diagnóstico, implementación y formación docente.',
    og: 'nosotros',
    cuerpo,
    jsonld: [organizacionLd(), migasLd([['Inicio', '/'], ['Nosotros', '/nosotros/']])],
  };
}
