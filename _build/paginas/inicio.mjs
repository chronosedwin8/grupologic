// Página de inicio: Grupo Logic como empresa que desarrolla y comercializa su propio software.
import {
  SOLUCIONES, CATEGORIAS, esc, N_SOLUCIONES, N_LINEAS, mayuscula, icono, logotipo, imagen, acordeon, faqLd, organizacionLd, DOMINIO,
} from '../lib/plantilla.mjs';
import { pasos, ctaFinal } from '../lib/bloques.mjs';

const DESCRIPCION_LINEA = {
  gestion: 'Software para dirigir la institución con datos: horarios, guardias, reemplazos, ausentismo docente e indicadores académicos.',
  ia: 'Inteligencia artificial bajo control de la institución, para que el equipo docente recupere tiempo y los estudiantes aprendan con apoyo.',
  programacion: 'Una ruta completa de programación: de los primeros bloques en preescolar a la creación de agentes de IA en bachillerato.',
  contenidos: 'Una plataforma para que estudiantes y docentes creen contenido propio, interactivo y accesible.',
};

export const ALT_PANEL = {
  unticloud: 'Panel de administración de UntiCloud con totales de docentes, cursos, materias, guardias y sustituciones',
  'aulamagica-ia': 'Buscador de herramientas de AulaMágica IA con accesos a presentaciones, plan de clase, rúbricas y quices',
  edunova: 'Módulo de planeación de EduNova generando una clase de Ciencias Naturales con inteligencia artificial',
  codexia: 'Ventana de Codexia con instrucciones de programación por bloques para mover al personaje',
  'codenest-school': 'Actividad de CodeNest School: tablero con el personaje, una estrella y una bandera, y el programa armado con flechas',
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
            <a class="enlace-flecha" href="/productos/${s.slug}/">Ver producto<span class="sr">: ${esc(s.nombre)}</span> ${icono('flecha')}</a>
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
        <p class="entrada">${esc(DESCRIPCION_LINEA[c.id] || '')}</p>
      </div>
      <div class="vitrinas${productos.length > 1 ? ' vitrinas--' + Math.min(productos.length, 3) : ''}">
        ${productos.map(s => vitrina(s, productos.length === 1)).join('\n        ')}
      </div>
    </div>`;
  }).join('\n    ');
  return `<div data-pestanas>
    <div class="pestanas__lista" role="tablist" aria-label="Líneas de producto">${tabs}</div>
    ${paneles}
  </div>`;
}

const ROLES = [
  {
    id: 'rectoria', nombre: 'Rectoría', titulo: 'Rectoría y dirección general',
    gana: [
      'Indicadores para decidir con datos: ausentismo docente y cumplimiento académico.',
      'Un programa de programación e inteligencia artificial que diferencia a su colegio.',
      'Licencias anuales con precios publicados.',
    ],
    productos: [['unticloud', 'Ausentismo y KPIs'], ['edunova', 'Indicadores por sede'], ['codexia', 'Programa STEM'], ['vcodepro', 'IA en bachillerato']],
  },
  {
    id: 'administrativa', nombre: 'Dirección administrativa', titulo: 'Dirección administrativa y financiera',
    gana: [
      'Precios publicados y licencias anuales por institución.',
      'Planes desde un docente hasta toda la institución.',
      'Reembolso total dentro de los 14 días siguientes al pago.',
    ],
    productos: [['aulamagica-ia', 'Licencia Escuela o por Volumen'], ['bookstudio', 'Desde un docente hasta todo el colegio'], ['codenest-school', 'Sin renovación automática'], ['unticloud', 'Planes según el tamaño del colegio']],
  },
  {
    id: 'tic', nombre: 'Coordinación TIC', titulo: 'Coordinación TIC',
    gana: [
      'Plataformas web, sin servidores propios que mantener.',
      'Usuarios y roles bien definidos, con registros para auditoría.',
      'Instalación silenciosa del editor de escritorio en las salas de cómputo.',
    ],
    productos: [['unticloud', 'Importación directa desde Untis'], ['aulamagica-ia', 'Integraciones y control por roles'], ['vcodepro', 'Despliegue en salas y modo examen']],
  },
  {
    id: 'academica', nombre: 'Coordinación académica', titulo: 'Coordinación académica e IB',
    gana: [
      'Seguimiento de horas IB y del núcleo EE·TdC·CAS.',
      'Rúbricas con criterios A–D y bitácora de diseño MYP.',
      'Evaluaciones tipo prueba de Estado y planes de recuperación por estudiante.',
    ],
    productos: [['unticloud', 'Indicadores IB'], ['vcodepro', 'Rúbricas IB y bitácora MYP'], ['edunova', 'Evaluación y recuperación'], ['bookstudio', 'Proyectos y portafolios']],
  },
];

function roles() {
  const tabs = ROLES.map((r, i) => `<button class="pestana" type="button" role="tab" id="tab-rol-${r.id}" aria-controls="panel-rol-${r.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${esc(r.nombre)}</button>`).join('');
  const paneles = ROLES.map((r, i) => `<div class="panel-pestana" role="tabpanel" id="panel-rol-${r.id}" aria-labelledby="tab-rol-${r.id}" tabindex="0"${i ? ' hidden' : ''}>
        <div class="rol">
          <h3 class="rol__titulo">${esc(r.titulo)}</h3>
          <div class="rol__bloque">
            <h4>Lo que obtiene</h4>
            <ul class="lista-check">${r.gana.map(g => `<li>${icono('check')}<span>${esc(g)}</span></li>`).join('')}</ul>
          </div>
          <div class="rol__bloque">
            <h4>Productos recomendados</h4>
            <ul class="lista-soluciones">${r.productos.map(([slug, nota]) => `<li><a href="/productos/${slug}/">${logotipo(slug)}<small>${esc(nota)}</small></a></li>`).join('')}</ul>
          </div>
        </div>
      </div>`).join('\n      ');
  return `<div class="roles" data-pestanas>
      <div class="pestanas__lista" role="tablist" aria-label="Perfiles de la institución" aria-orientation="vertical">${tabs}</div>
      <div>${paneles}</div>
    </div>`;
}

export const PASOS_COMPRA = [
  ['Explore los productos', 'Revise las funcionalidades, las capturas y las preguntas frecuentes de cada producto.'],
  ['Elija su plan', 'Cada producto publica sus planes y precios, desde un usuario hasta toda la institución.'],
  ['Active su licencia', 'Tras confirmarse el pago, recibe el acceso a la plataforma o la clave de licencia en su correo.'],
  ['Úselo con soporte', 'Las licencias incluyen las actualizaciones del producto y soporte técnico durante su vigencia.'],
];

const nombres = SOLUCIONES.map(s => s.nombre);
const lista = nombres.slice(0, -1).join(', ') + ' y ' + nombres[nombres.length - 1];

export const PREGUNTAS_INICIO = [
  ['¿Quién desarrolla estos productos?', `Grupo Logic SAS Latinoamerica diseña, desarrolla y comercializa todos los productos de este sitio: ${lista}.`],
  ['¿Qué compro exactamente?', 'Una licencia de uso del software por un período definido, generalmente un año. Incluye el acceso al producto, las actualizaciones y el soporte técnico durante la vigencia.'],
  ['¿Dónde veo los precios?', 'En la página de <a href="/precios/">precios</a> y en la sección de planes de cada producto. Los precios están en pesos colombianos (COP) y los impuestos aplicables se calculan al momento del pago.'],
  ['¿Puedo probar antes de comprar?', 'Sí. BookStudio permite usar el editor sin registrarse, VCodePro se descarga gratis, CodeNest School tiene una actividad de prueba en su sitio y Codexia ofrece una prueba de 24 horas. También puede solicitar una demostración.'],
  ['¿Cómo recibo el producto?', 'Todos nuestros productos son digitales. Tras confirmarse el pago, recibe el acceso a la plataforma o la clave de licencia en el correo indicado en la compra. No hay envíos físicos.'],
  ['¿Puedo cancelar o pedir un reembolso?', 'Sí. Puede solicitar el reembolso total dentro de los 14 días siguientes al pago y cancelar la renovación en cualquier momento. Consulte la <a href="/reembolsos/">política de reembolsos</a>.'],
  ['¿Qué soporte técnico incluye la licencia?', 'Soporte técnico del producto por correo durante toda la vigencia: dudas de uso, incidencias y problemas de acceso. Más información en <a href="/soporte/">soporte</a>.'],
  ['¿Cómo se tratan los datos de los estudiantes?', 'Conforme a la Ley 1581 de 2012 y a nuestra <a href="/privacidad/">política de privacidad</a>. Nuestros productos no muestran publicidad ni venden datos a terceros.'],
];

export default function inicio() {
  const cuerpo = `
<section class="hero hero--inicio" aria-labelledby="titulo-principal">
  <canvas class="hero__lienzo" aria-hidden="true"></canvas>
  <div class="hero__velo" aria-hidden="true"></div>
  <div class="contenedor">
    <div class="hero__contenido">
      <p class="ceja">Software educativo</p>
      <h1 class="titulo-1" id="titulo-principal">Software para colegios, <em>desarrollado por Grupo Logic</em></h1>
      <p class="hero__texto">Desarrollamos y comercializamos plataformas web y aplicaciones para la gestión escolar, la inteligencia artificial en el aula, la enseñanza de la programación y los contenidos interactivos.</p>
      <div class="botones">
        <a class="boton boton--primario" href="/productos/">Ver productos ${icono('flecha')}</a>
        <a class="boton boton--secundario" href="/precios/">Ver precios</a>
      </div>
      <ul class="hero__lineas" aria-label="Líneas de producto">${CATEGORIAS.map(c => `<li class="etiqueta">${esc(c.nombre)}</li>`).join('')}</ul>
    </div>
  </div>
  <a class="hero__desplazar" href="#empresa" aria-label="Ir a la siguiente sección"><span></span></a>
</section>

<section class="franja" aria-label="Productos de Grupo Logic">
  <div class="contenedor">
    <p class="franja__texto">Productos desarrollados por Grupo Logic</p>
    <ul class="franja__logos">${SOLUCIONES.map(s => `<li><a href="/productos/${s.slug}/">${logotipo(s.slug)}</a></li>`).join('')}</ul>
  </div>
</section>

<section class="seccion seccion--clara" id="empresa" aria-labelledby="titulo-empresa">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Empresa de software</p>
      <h2 class="titulo-2" id="titulo-empresa">Productos propios, <em>listos para usar</em></h2>
      <p class="entrada">Cada producto resuelve una necesidad concreta del colegio y se puede usar de forma independiente.</p>
    </div>
    <div class="valores" data-aparecer-grupo>
      <article class="valor" data-aparecer>
        <p class="valor__numero">01</p>
        <h3 class="valor__titulo">Desarrollo propio</h3>
        <p class="valor__texto">Diseñamos, desarrollamos y mantenemos cada producto. Usted trata directamente con quien construye el software.</p>
      </article>
      <article class="valor" data-aparecer>
        <p class="valor__numero">02</p>
        <h3 class="valor__titulo">Listo para usar</h3>
        <p class="valor__texto">Plataformas web que no requieren servidores propios y un editor de escritorio que se instala en minutos. Active la licencia y empiece.</p>
      </article>
      <article class="valor" data-aparecer>
        <p class="valor__numero">03</p>
        <h3 class="valor__titulo">Actualizaciones y soporte incluidos</h3>
        <p class="valor__texto">Todas las licencias incluyen las nuevas versiones del producto y soporte técnico durante su vigencia.</p>
      </article>
    </div>
  </div>
</section>

<section class="seccion seccion--oscura cifras-seccion" aria-label="Nuestros productos en cifras">
  <div class="contenedor">
    <div class="cifras" data-aparecer-grupo>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="${SOLUCIONES.length}">${SOLUCIONES.length}</p><p class="cifra__texto">productos de software para colegios</p></div>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="${CATEGORIAS.length}">${CATEGORIAS.length}</p><p class="cifra__texto">líneas: gestión, IA, programación y contenidos</p></div>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="80" data-prefijo="+">+80</p><p class="cifra__texto">herramientas de IA para docentes en AulaMágica IA</p></div>
      <div class="cifra" data-aparecer><p class="cifra__valor" data-contador="120" data-prefijo="+">+120</p><p class="cifra__texto">proyectos de programación listos para el aula en VCodePro</p></div>
    </div>
  </div>
</section>

<section class="seccion seccion--blanca" id="productos" aria-labelledby="titulo-portafolio">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Nuestros productos</p>
      <h2 class="titulo-2" id="titulo-portafolio">${mayuscula(N_SOLUCIONES)} productos, <em>${N_LINEAS} líneas</em></h2>
      <p class="entrada">Software para la gestión escolar, la inteligencia artificial en el aula, la enseñanza de la programación y los contenidos interactivos. Explore cada línea.</p>
    </div>
    ${portafolio()}
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-roles">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Productos por perfil</p>
      <h2 class="titulo-2" id="titulo-roles">El producto adecuado para <em>cada área</em></h2>
      <p class="entrada">Qué producto sirve a cada perfil de la institución.</p>
    </div>
    ${roles()}
  </div>
</section>

<section class="seccion seccion--oscura" aria-labelledby="titulo-compra">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Cómo comprar</p>
      <h2 class="titulo-2" id="titulo-compra">De la elección <em>al primer uso</em></h2>
    </div>
    ${pasos(PASOS_COMPRA)}
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-seguridad">
  <div class="contenedor seguridad">
    <div data-aparecer>
      <p class="ceja">Seguridad y protección de datos</p>
      <h2 class="titulo-2" id="titulo-seguridad">Datos de la comunidad educativa, <em>protegidos</em></h2>
      <p class="entrada" style="margin-top:1.2rem">Nuestros productos se construyen pensando en la información de estudiantes y docentes, con especial cuidado de los datos de menores.</p>
      <p class="nota-legal">Tratamos los datos personales conforme a la Ley 1581 de 2012. Consulte nuestra <a href="/privacidad/">política de privacidad</a>.</p>
    </div>
    <ul class="compromisos" data-aparecer-grupo>
      <li class="compromiso" data-aparecer>${icono('llave')}<div><h3>Control por roles</h3><p>Cada perfil ve solo lo que necesita: en UntiCloud, rectoría, coordinaciones y docentes tienen permisos distintos.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('ojo')}<div><h3>IA con supervisión</h3><p>En VCodePro, cada conversación con la IA queda registrada para el docente y el modo examen la desactiva.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('escudo')}<div><h3>Datos que no entrenan modelos</h3><p>En AulaMágica IA, los datos de docentes y estudiantes no se usan para entrenar modelos de IA, y las actividades de los estudiantes las crea y supervisa el docente.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('codigo')}<div><h3>Ejecución aislada</h3><p>En Codexia, el código de los estudiantes se ejecuta en un entorno aislado, con límites de tiempo y de instrucciones.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('candado')}<div><h3>Cifrado y respaldo</h3><p>AulaMágica IA cifra la información en tránsito y en reposo; BookStudio cifra en tránsito y hace copia de seguridad diaria, sin seguimiento publicitario.</p></div></li>
      <li class="compromiso" data-aparecer>${icono('familia')}<div><h3>Datos de menores</h3><p>En CodeNest School, los niños entran sin correo, con un PIN de dibujos; el consentimiento del tutor queda registrado y todo acceso a sus datos queda auditado.</p></div></li>
    </ul>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-preguntas">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Preguntas frecuentes</p>
      <h2 class="titulo-2" id="titulo-preguntas">Preguntas sobre <em>compra y licencias</em></h2>
    </div>
    ${acordeon(PREGUNTAS_INICIO, 'faq')}
  </div>
</section>

${ctaFinal()}`;

  return {
    ruta: '/',
    titulo: 'Grupo Logic · Software educativo para colegios de Latinoamérica',
    descripcion: 'Grupo Logic desarrolla software para colegios: gestión escolar, IA para la enseñanza, programación y contenidos interactivos. Precios publicados.',
    og: 'inicio',
    cuerpo,
    scripts: ['form'],
    jsonld: [
      organizacionLd(),
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': DOMINIO + '/#sitio', name: 'Grupo Logic', url: DOMINIO + '/', inLanguage: 'es-419', publisher: { '@id': DOMINIO + '/#organizacion' } },
      faqLd(PREGUNTAS_INICIO),
    ],
  };
}
