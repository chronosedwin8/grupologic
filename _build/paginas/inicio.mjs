// Página de inicio: las once secciones de la especificación (5.1).
import fs from 'node:fs';
import path from 'node:path';
import {
  SOLUCIONES, CATEGORIAS, categoria, solucion, esc, icono, logotipo, imagen, acordeon, faqLd, organizacionLd, DOMINIO,
} from '../lib/plantilla.mjs';
import { formularioCorto } from '../lib/formularios.mjs';

const MAPA = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../mapa.json'), 'utf8'));

const DESCRIPCION_LINEA = {
  gestion: 'Información confiable para dirigir: horarios, ausentismo docente e indicadores académicos, al alcance de rectoría y coordinación.',
  ia: 'Inteligencia artificial bajo control institucional, para que el equipo docente recupere tiempo y los estudiantes aprendan con acompañamiento.',
  programacion: 'Una ruta completa de pensamiento computacional: de los primeros bloques en preescolar a la creación de agentes de IA en bachillerato.',
  contenidos: 'Herramientas para que estudiantes y docentes creen contenido propio, interactivo y accesible.',
};

const ALT_PANEL = {
  unticloud: 'Panel de administración de UntiCloud con totales de docentes, cursos, materias, guardias y sustituciones',
  'aulamagica-ia': 'Buscador de herramientas de AulaMágica IA con accesos a presentaciones, plan de clase, rúbricas y quices',
  edunova: 'Módulo de planeación de EduNova generando una clase de Ciencias Naturales con inteligencia artificial',
  codexia: 'Ventana de Codexia con instrucciones de programación por bloques para mover al personaje',
  vcodepro: 'Editor VCodePro con un proyecto en Python y el panel del aula evaluado con criterios IB',
  bookstudio: 'Editor de BookStudio con una página de plantilla de mapa del cuento',
};

function vitrina(s, ancha) {
  return `<article class="vitrina${ancha ? ' vitrina--ancha' : ''}">
          <div class="vitrina__imagen">${imagen(s.imagen, ALT_PANEL[s.slug], { sizes: ancha ? '(min-width: 1240px) 700px, (min-width: 960px) 56vw, 92vw' : '(min-width: 1240px) 560px, (min-width: 960px) 45vw, 92vw' })}</div>
          <div class="vitrina__cuerpo">
            ${logotipo(s.slug)}
            <h4 class="vitrina__lema">${esc(s.lema)}</h4>
            <p class="vitrina__resumen">${esc(s.resumen)}</p>
            <ul class="tarjeta__lista">${s.beneficios.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
            <a class="enlace-flecha" href="/soluciones/${s.slug}/">Ver solución<span class="sr">: ${esc(s.nombre)}</span> ${icono('flecha')}</a>
          </div>
        </article>`;
}

function portafolio() {
  const tabs = CATEGORIAS.map((c, i) => `<button class="pestana" type="button" role="tab" id="tab-linea-${c.id}" aria-controls="panel-linea-${c.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}><span class="pestana__num">0${i + 1}</span>${esc(c.corto)}</button>`).join('');
  const paneles = CATEGORIAS.map((c, i) => {
    const productos = SOLUCIONES.filter(s => s.categoria === c.id);
    return `<div class="panel-pestana" role="tabpanel" id="panel-linea-${c.id}" aria-labelledby="tab-linea-${c.id}" tabindex="0"${i ? ' hidden' : ''}>
      <div class="linea__cabecera">
        <h3 class="titulo-3">${esc(c.nombre)}</h3>
        <p class="entrada">${esc(DESCRIPCION_LINEA[c.id])}</p>
      </div>
      <div class="vitrinas${productos.length > 1 ? ' vitrinas--2' : ''}">
        ${productos.map(s => vitrina(s, productos.length === 1)).join('\n        ')}
      </div>
    </div>`;
  }).join('\n    ');
  return `<div data-pestanas>
    <div class="pestanas__lista" role="tablist" aria-label="Líneas del portafolio">${tabs}</div>
    ${paneles}
  </div>`;
}

// Arco cuadrático entre dos puntos; el punto de control se desplaza en perpendicular.
function arco(a, b, factor) {
  const [x1, y1] = MAPA.ciudades[a], [x2, y2] = MAPA.ciudades[b];
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
  const cx = (x1 + x2) / 2 - (dy / d) * d * factor, cy = (y1 + y2) / 2 + (dx / d) * d * factor;
  return `M${x1} ${y1}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}
function mapa() {
  const c = MAPA.ciudades;
  const origenes = [['berlin', 0.3], ['londres', 0.26], ['madrid', 0.22]];
  const destinos = ['mexico', 'lima', 'santiago', 'buenosaires', 'saopaulo'];
  let orden = 0;
  const arcos = origenes.map(([o, k]) => `<path class="mapa__arco" style="--orden:${orden++}" d="${arco(o, 'latam', k)}"/>`).join('')
    + destinos.map(d => `<path class="mapa__arco mapa__arco--local" style="--orden:${orden++ + 1}" d="${arco('latam', d, 0.18)}"/>`).join('');
  const punto = (k, r = 5) => `<circle class="mapa__punto" cx="${c[k][0]}" cy="${c[k][1]}" r="${r}"/>`;
  const halo = (k, o) => `<circle class="mapa__halo" style="--orden:${o}" cx="${c[k][0]}" cy="${c[k][1]}" r="12"/>`;
  return `<div class="mapa" data-aparecer>
        <img src="/assets/img/mapa-puntos.svg" width="${MAPA.ancho}" height="${MAPA.alto}" alt="" loading="lazy" decoding="async">
        <svg viewBox="0 0 ${MAPA.ancho} ${MAPA.alto}" role="img" aria-labelledby="mapa-titulo mapa-desc">
          <title id="mapa-titulo">Del mundo a su colegio</title>
          <desc id="mapa-desc">Mapa con arcos que parten de Alemania, Reino Unido y España, llegan a Latinoamérica y desde allí se extienden a los países de la región.</desc>
          ${arcos}
          ${['berlin', 'londres', 'madrid'].map(k => punto(k)).join('')}
          ${destinos.map(k => punto(k, 3.5)).join('')}
          ${punto('latam', 7)}${halo('latam', 0)}${halo('berlin', 1)}${halo('londres', 2)}${halo('madrid', 3)}
          <text class="mapa__etiqueta" x="${c.berlin[0] + 14}" y="${c.berlin[1] + 26}">Alemania</text>
          <text class="mapa__etiqueta" x="${c.londres[0] - 14}" y="${c.londres[1] - 14}" text-anchor="end">Reino Unido</text>
          <text class="mapa__etiqueta" x="${c.madrid[0] - 16}" y="${c.madrid[1] + 6}" text-anchor="end">España</text>
          <text class="mapa__etiqueta" x="${c.latam[0] - 18}" y="${c.latam[1] - 12}" text-anchor="end">Latinoamérica</text>
          <text class="mapa__etiqueta mapa__etiqueta--sec" x="${c.latam[0] - 18}" y="${c.latam[1] + 12}" text-anchor="end">Grupo Logic</text>
        </svg>
      </div>`;
}

const ROLES = [
  {
    id: 'rectoria', nombre: 'Rectoría', titulo: 'Rectoría y dirección general',
    gana: [
      'Indicadores para decidir con datos: ausentismo docente, cumplimiento académico y adopción tecnológica.',
      'Un programa de programación e inteligencia artificial que diferencia a su colegio.',
      'Un solo aliado que responde por la implementación completa.',
    ],
    soluciones: [['unticloud', 'Ausentismo y KPIs'], ['edunova', 'Indicadores por sede'], ['codexia', 'Programa STEM'], ['vcodepro', 'IA en bachillerato']],
  },
  {
    id: 'administrativa', nombre: 'Dirección administrativa', titulo: 'Dirección administrativa y financiera',
    gana: [
      'Licenciamiento anual claro: por institución, por número de usuarios o por volumen.',
      'Un único interlocutor comercial para varias plataformas.',
      'Propuestas formales ajustadas al tamaño y las sedes de su institución.',
    ],
    soluciones: [['aulamagica-ia', 'Licencia Escuela o por Volumen'], ['edunova', 'Studio: libros propios'], ['bookstudio', 'Desde un docente hasta todo el colegio']],
  },
  {
    id: 'tic', nombre: 'Coordinación TIC', titulo: 'Coordinación TIC',
    gana: [
      'Plataformas web, sin servidores propios que mantener.',
      'Inicio de sesión con cuentas institucionales e integraciones con Google Workspace y Microsoft 365, según la solución.',
      'Usuarios y roles bien definidos, con registros para auditoría.',
    ],
    soluciones: [['unticloud', 'Importación directa desde Untis'], ['aulamagica-ia', 'Integraciones y control por roles'], ['vcodepro', 'Despliegue en salas y modo examen']],
  },
  {
    id: 'academica', nombre: 'Coordinación académica', titulo: 'Coordinación académica e IB',
    gana: [
      'Menos tiempo del equipo docente en planeación, evaluación y boletines.',
      'Seguimiento de horas IB y del núcleo EE·TdC·CAS, y rúbricas con criterios A–D.',
      'Evaluaciones tipo prueba de Estado y planes de recuperación por estudiante.',
    ],
    soluciones: [['unticloud', 'Indicadores IB'], ['vcodepro', 'Rúbricas IB y bitácora MYP'], ['edunova', 'Evaluación y recuperación'], ['bookstudio', 'Proyectos y portafolios']],
  },
];

function roles() {
  const tabs = ROLES.map((r, i) => `<button class="pestana" type="button" role="tab" id="tab-rol-${r.id}" aria-controls="panel-rol-${r.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${esc(r.nombre)}</button>`).join('');
  const paneles = ROLES.map((r, i) => `<div class="panel-pestana" role="tabpanel" id="panel-rol-${r.id}" aria-labelledby="tab-rol-${r.id}" tabindex="0"${i ? ' hidden' : ''}>
        <div class="rol">
          <h3 class="rol__titulo">${esc(r.titulo)}</h3>
          <div class="rol__bloque">
            <h4>Lo que gana</h4>
            <ul class="lista-check">${r.gana.map(g => `<li>${icono('check')}<span>${esc(g)}</span></li>`).join('')}</ul>
          </div>
          <div class="rol__bloque">
            <h4>Soluciones recomendadas</h4>
            <ul class="lista-soluciones">${r.soluciones.map(([slug, nota]) => `<li><a href="/soluciones/${slug}/">${logotipo(slug)}<small>${esc(nota)}</small></a></li>`).join('')}</ul>
          </div>
        </div>
      </div>`).join('\n      ');
  return `<div class="roles" data-pestanas>
      <div class="pestanas__lista" role="tablist" aria-label="Perfiles de su institución" aria-orientation="vertical">${tabs}</div>
      <div>${paneles}</div>
    </div>`;
}

export const PASOS_TRABAJO = [
  ['Diagnóstico', 'Conversamos con su equipo directivo para entender sus prioridades, su infraestructura y el momento de su institución.'],
  ['Demostración', 'Presentamos en funcionamiento las soluciones pertinentes, con ejemplos de su contexto, y preparamos una propuesta formal.'],
  ['Implementación y formación docente', 'Coordinamos con cada fabricante la activación, la configuración de usuarios y la formación de su equipo docente.'],
  ['Acompañamiento continuo', 'Hacemos seguimiento al uso, resolvemos dudas y le ayudamos a medir la adopción durante toda la vigencia.'],
];
export const pasos = (lista) => `<ol class="pasos" data-aparecer-grupo>${lista.map(([t, d]) => `
        <li class="paso" data-aparecer><h3 class="paso__titulo">${esc(t)}</h3><p class="paso__texto">${d}</p></li>`).join('')}
      </ol>`;

export const PREGUNTAS_INICIO = [
  ['¿Cómo funciona el licenciamiento?', 'Cada solución tiene sus propias modalidades: licencias por institución, por número de usuarios, por volumen o por sede, en general con vigencia anual. Después del diagnóstico le enviamos una propuesta formal con la modalidad que corresponde al tamaño de su institución.'],
  ['¿Por qué no publican precios?', 'Porque acompañamos colegios de varios países y cada propuesta depende del número de usuarios, de sedes y del alcance de la formación. Preferimos entregarle una cifra exacta y por escrito, en lugar de una referencia que no aplique a su caso.'],
  ['¿Cuánto tarda la implementación?', 'Depende de la solución. Las plataformas web no requieren instalación y su puesta en marcha es ágil: los fabricantes de UntiCloud y de VCodePro, por ejemplo, la describen como el trabajo de una tarde. En cada propuesta incluimos un cronograma de implementación.'],
  ['¿Incluyen formación para los docentes?', 'Sí. Nuestras propuestas contemplan la formación del equipo docente. Su alcance depende de la solución y de la modalidad: desde capacitaciones virtuales de arranque hasta planes de formación por sede.'],
  ['¿Qué soporte recibimos?', 'Grupo Logic es su primer punto de contacto: recibimos sus solicitudes, resolvemos las dudas de uso y escalamos al fabricante los casos técnicos. Los niveles de servicio de cada solución se detallan en la propuesta.'],
  ['¿Cómo se factura?', 'Las condiciones de facturación, la moneda y los medios de pago se definen en la propuesta según su país y la modalidad de contratación. Si su institución tiene un proceso de compras propio —registro de proveedores, órdenes de compra o documentación específica—, lo acompañamos.'],
  ['¿Qué pasa con los datos de nuestros estudiantes?', 'Antes de contratar le compartimos lo que declara cada fabricante sobre el tratamiento de datos y le ayudamos a revisarlo con su área jurídica. Como referencia, en Colombia aplica la Ley 1581 de 2012. Puede consultar también nuestra <a href="/privacidad/">política de tratamiento de datos</a>.'],
  ['¿Podemos empezar con una sola solución o una sola sede?', 'Sí. Varias soluciones tienen modalidades para una institución o para un grupo reducido de docentes, que después pueden ampliarse a más usuarios o sedes.'],
];

export function ctaFinal() {
  return `<section class="seccion seccion--oscura" aria-labelledby="titulo-cta">
  <div class="contenedor cta-final">
    <div data-aparecer>
      <p class="ceja">Demostración</p>
      <h2 class="titulo-2" id="titulo-cta">Conozca las soluciones <em>en funcionamiento</em></h2>
      <p class="entrada" style="margin-top:1.2rem">Cuéntenos sobre su institución y coordinaremos una demostración con las soluciones que respondan a sus prioridades.</p>
      <div class="cta-final__alternativas">
        <a class="boton boton--secundario" href="#" data-gl="whatsapp" data-gl-mensaje="Hola, quisiera hablar con un asesor de Grupo Logic." target="_blank" rel="noopener" hidden>${icono('whatsapp')} Hablar con un asesor</a>
        <a class="enlace-flecha" href="/soluciones/">Conocer el portafolio ${icono('flecha')}</a>
      </div>
    </div>
    <div class="cta-final__panel oscuro" data-aparecer>
      ${formularioCorto('fc')}
    </div>
  </div>
</section>`;
}

export default function inicio() {
  const cuerpo = `
<section class="hero hero--inicio" aria-labelledby="titulo-principal">
  <canvas class="hero__lienzo" aria-hidden="true"></canvas>
  <div class="hero__velo" aria-hidden="true"></div>
  <div class="contenedor">
    <div class="hero__contenido">
      <p class="ceja">Tecnología educativa de clase mundial</p>
      <h1 class="titulo-1" id="titulo-principal">Las mejores soluciones educativas del mundo, <em>al servicio de los colegios de Latinoamérica</em></h1>
      <p class="hero__texto">Grupo Logic selecciona tecnología educativa desarrollada en otras partes del mundo y la pone al alcance de su institución, con implementación y acompañamiento cercanos.</p>
      <div class="botones">
        <a class="boton boton--primario" href="/contacto/">Solicitar demostración ${icono('flecha')}</a>
        <a class="boton boton--secundario" href="/soluciones/">Conocer el portafolio</a>
      </div>
      <ul class="hero__lineas" aria-label="Líneas del portafolio">${CATEGORIAS.map(c => `<li class="etiqueta">${esc(c.nombre)}</li>`).join('')}</ul>
    </div>
  </div>
  <a class="hero__desplazar" href="#propuesta" aria-label="Ir a la siguiente sección"><span></span></a>
</section>

<section class="franja" aria-label="Soluciones del portafolio">
  <div class="contenedor">
    <p class="franja__texto">Un portafolio seleccionado en Alemania, Reino Unido y España</p>
    <ul class="franja__logos">${SOLUCIONES.map(s => `<li><a href="/soluciones/${s.slug}/">${logotipo(s.slug)}</a></li>`).join('')}</ul>
  </div>
</section>

<section class="seccion seccion--clara" id="propuesta" aria-labelledby="titulo-propuesta">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Por qué Grupo Logic</p>
      <h2 class="titulo-2" id="titulo-propuesta">Un aliado para incorporar tecnología educativa <em>con criterio</em></h2>
      <p class="entrada">La oferta de software para colegios crece cada año. Nuestro trabajo es ayudarle a elegir bien, implementar sin tropiezos y sostener el uso en el tiempo.</p>
    </div>
    <div class="valores" data-aparecer-grupo>
      <article class="valor" data-aparecer>
        <p class="valor__numero">01</p>
        <h3 class="valor__titulo">Selección rigurosa</h3>
        <p class="valor__texto">Elegimos cada solución por su solidez pedagógica, su madurez técnica y la forma en que trata los datos de la comunidad educativa. A su institución solo llega lo que supera ese filtro.</p>
      </article>
      <article class="valor" data-aparecer>
        <p class="valor__numero">02</p>
        <h3 class="valor__titulo">Implementación acompañada</h3>
        <p class="valor__texto">Diagnóstico, configuración, formación docente y seguimiento: acompañamos a su equipo desde la primera demostración hasta el uso cotidiano en el aula.</p>
      </article>
      <article class="valor" data-aparecer>
        <p class="valor__numero">03</p>
        <h3 class="valor__titulo">Un solo interlocutor para su institución</h3>
        <p class="valor__texto">Una sola relación comercial y de soporte para varias plataformas. Su institución habla con Grupo Logic; nosotros coordinamos con cada fabricante.</p>
      </article>
    </div>
  </div>
</section>

<section class="seccion seccion--oscura cifras-seccion" aria-label="El portafolio en cifras">
  <div class="contenedor">
    <div class="cifras" data-aparecer-grupo>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="6">6</p><p class="cifra__texto">soluciones especializadas para colegios</p></div>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="4">4</p><p class="cifra__texto">líneas: gestión, IA, programación y contenidos</p></div>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="80" data-prefijo="+">+80</p><p class="cifra__texto">herramientas de IA para docentes en AulaMágica IA<span class="cifra__fuente">Fuente: magicschools.es</span></p></div>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="120" data-prefijo="+">+120</p><p class="cifra__texto">proyectos de programación listos para el aula en VCodePro<span class="cifra__fuente">Fuente: vcodepro.de</span></p></div>
    </div>
  </div>
</section>

<section class="seccion seccion--blanca" id="portafolio" aria-labelledby="titulo-portafolio">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Portafolio</p>
      <h2 class="titulo-2" id="titulo-portafolio">Seis soluciones, <em>cuatro líneas</em> de trabajo</h2>
      <p class="entrada">Software para colegios que cubre la gestión institucional, la inteligencia artificial en el aula, la programación y los contenidos interactivos. Explore cada línea.</p>
    </div>
    ${portafolio()}
  </div>
</section>

<section class="seccion seccion--profunda" aria-labelledby="titulo-mapa">
  <div class="contenedor mapa-seccion">
    <div data-aparecer>
      <p class="ceja">Nuestro modelo</p>
      <h2 class="titulo-2" id="titulo-mapa">Del mundo <em>a su colegio</em></h2>
      <p class="entrada" style="margin-top:1.2rem">Recorremos el ecosistema internacional de tecnología educativa para identificar soluciones que respondan a los retos de los colegios de la región, y las acercamos a su institución con acompañamiento local.</p>
      <ul class="mapa-leyenda">
        <li><strong>Origen</strong><span>Plataformas desarrolladas en Alemania, Reino Unido y España, entre otros países.</span></li>
        <li><strong>Selección</strong><span>Revisamos su propuesta pedagógica, su madurez técnica y su tratamiento de datos.</span></li>
        <li><strong>Llegada</strong><span>Acompañamos a colegios de toda Latinoamérica, con un equipo cercano a la región.</span></li>
      </ul>
    </div>
    ${mapa()}
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-roles">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Soluciones por rol</p>
      <h2 class="titulo-2" id="titulo-roles">Lo que gana <em>cada área</em> de su institución</h2>
      <p class="entrada">Una decisión de tecnología educativa involucra a varias personas. Esto es lo que cada una obtiene.</p>
    </div>
    ${roles()}
  </div>
</section>

<section class="seccion seccion--oscura" aria-labelledby="titulo-trabajo">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Cómo trabajamos</p>
      <h2 class="titulo-2" id="titulo-trabajo">Cuatro pasos, <em>un mismo equipo</em> a su lado</h2>
    </div>
    ${pasos(PASOS_TRABAJO)}
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-seguridad">
  <div class="contenedor seguridad">
    <div data-aparecer>
      <p class="ceja">Seguridad y protección de datos</p>
      <h2 class="titulo-2" id="titulo-seguridad">La información de su comunidad, <em>tratada con cuidado</em></h2>
      <p class="entrada" style="margin-top:1.2rem">Los datos de estudiantes y docentes exigen un cuidado especial. Por eso revisamos cómo los trata cada solución antes de presentarla a su institución.</p>
      <p class="nota-legal"><strong>Marco de referencia.</strong> En Colombia, la Ley 1581 de 2012 regula el tratamiento de datos personales y da especial protección a los datos de niñas, niños y adolescentes. Los compromisos de esta sección son los que declara cada fabricante en su sitio oficial; le recomendamos revisarlos con su área jurídica antes de contratar.</p>
    </div>
    <ul class="compromisos" data-aparecer-grupo>
      <li class="compromiso" data-aparecer>${icono('llave')}<div><h3>Control por roles</h3><p>Cada perfil ve solo lo que necesita: directivos, coordinadores, docentes y estudiantes tienen permisos distintos en UntiCloud, AulaMágica IA y EduNova.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('ojo')}<div><h3>Supervisión docente</h3><p>En AulaMágica IA, las actividades de los estudiantes las crea y supervisa el docente; en VCodePro, cada conversación con la IA queda registrada para la coordinación.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('escudo')}<div><h3>Datos que no entrenan modelos</h3><p>AulaMágica IA declara que no usa los datos de docentes ni estudiantes para entrenar modelos de inteligencia artificial y que trata la información conforme al RGPD europeo.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('candado')}<div><h3>Cifrado y respaldo</h3><p>AulaMágica IA declara cifrado en tránsito y en reposo; BookStudio, cifrado en tránsito, copia de seguridad diaria y ningún seguimiento publicitario.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('familia')}<div><h3>Datos de menores</h3><p>Codexia declara cumplir normas de protección de datos de menores, como la Ley 1581 en Colombia, con consentimiento de los tutores; EduNova indica tratar los datos conforme a esa misma ley.</p></div></li>
    </ul>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-preguntas">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Preguntas frecuentes</p>
      <h2 class="titulo-2" id="titulo-preguntas">Lo que suelen preguntarnos <em>antes de decidir</em></h2>
    </div>
    ${acordeon(PREGUNTAS_INICIO, 'faq')}
  </div>
</section>

${ctaFinal()}`;

  return {
    ruta: '/',
    titulo: 'Grupo Logic · Tecnología educativa para colegios de Latinoamérica',
    descripcion: 'Software para colegios seleccionado en Alemania, Reino Unido y España: gestión, IA, programación y contenidos, con implementación y acompañamiento.',
    og: 'inicio',
    cuerpo,
    precargar: '',
    scripts: ['form'],
    jsonld: [
      organizacionLd(),
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': DOMINIO + '/#sitio', name: 'Grupo Logic', url: DOMINIO + '/', inLanguage: 'es-419', publisher: { '@id': DOMINIO + '/#organizacion' } },
      faqLd(PREGUNTAS_INICIO),
    ],
  };
}
void categoria; void solucion;
