// Política de tratamiento de datos personales (Ley 1581 de 2012) y términos de uso.
// IMPORTANTE: textos generales. Deben ser revisados por un asesor legal antes de publicarse.
import { migasLd } from '../lib/plantilla.mjs';

const ACTUALIZACION = '3 de octubre de 2026';

const hero = (ruta, ceja, titulo, texto) => `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">${ceja}</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">${ceja}</p>
      <h1 class="titulo-1" id="titulo-principal">${titulo}</h1>
      <p class="hero__texto">${texto}</p>
      <p class="legal__fecha">Última actualización: ${ACTUALIZACION}</p>
    </div>
  </div>
</section>`;

// Responsable: los datos se completan desde config.js (legal.razonSocial, legal.nit, legal.emailDatos).
// Mientras falten, se muestra "Grupo Logic" y se ocultan NIT y correo.
const RESPONSABLE = `<ul>
        <li><strong>Razón social:</strong> <span data-gl="legal.razonSocial" data-gl-modo="texto">Grupo Logic</span></li>
        <li data-gl="legal.nit" hidden><strong>NIT:</strong> <span data-gl-texto></span></li>
        <li><strong>Domicilio:</strong> Barranquilla, Colombia</li>
        <li data-gl="direccion" hidden><strong>Dirección:</strong> <span data-gl-texto></span></li>
        <li data-gl="legal.emailDatos" hidden><strong>Correo para consultas y reclamos:</strong> <a href="#" data-gl-enlace><span data-gl-texto></span></a></li>
        <li data-gl="telefono" hidden><strong>Teléfono:</strong> <a href="#" data-gl-enlace><span data-gl-texto></span></a></li>
        <li><strong>Canal en línea:</strong> <a href="/contacto/">formulario de contacto</a></li>
      </ul>`;

export function privacidad() {
  const secciones = [
    ['responsable', 'Responsable del tratamiento', `<p>El responsable del tratamiento de los datos personales recolectados a través de este sitio web es:</p>${RESPONSABLE}`],
    ['marco', 'Marco normativo', `<p>Esta política se adopta en cumplimiento de la Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales en Colombia, y de sus normas reglamentarias, en particular el Decreto 1377 de 2013, compilado en el Decreto Único Reglamentario 1074 de 2015.</p>`],
    ['definiciones', 'Definiciones', `<ul>
        <li><strong>Autorización:</strong> consentimiento previo, expreso e informado del titular para llevar a cabo el tratamiento de sus datos personales.</li>
        <li><strong>Base de datos:</strong> conjunto organizado de datos personales que sea objeto de tratamiento.</li>
        <li><strong>Dato personal:</strong> cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</li>
        <li><strong>Dato sensible:</strong> aquel que afecta la intimidad del titular o cuyo uso indebido puede generar su discriminación.</li>
        <li><strong>Encargado del tratamiento:</strong> persona natural o jurídica que realiza el tratamiento de datos personales por cuenta del responsable.</li>
        <li><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</li>
        <li><strong>Tratamiento:</strong> cualquier operación sobre datos personales, como la recolección, almacenamiento, uso, circulación o supresión.</li>
      </ul>`],
    ['datos', 'Datos que recolectamos', `<p>A través de los formularios de este sitio recolectamos datos de contacto de carácter profesional que usted nos entrega voluntariamente: nombre y apellido, cargo, institución, país, ciudad, correo electrónico, teléfono, soluciones de interés, número aproximado de estudiantes de la institución y el mensaje que decida escribir.</p>
      <p>No solicitamos datos sensibles. Si su mensaje incluyera información de ese tipo, le pedimos no enviarla por este medio.</p>
      <p>Si el sitio tiene activada una herramienta de analítica web, también se recolectan datos de navegación de forma agregada, únicamente después de que usted lo acepte en el aviso de cookies.</p>`],
    ['finalidades', 'Finalidades del tratamiento', `<p>Los datos personales se tratarán para las siguientes finalidades:</p>
      <ol>
        <li>Responder sus solicitudes de información, demostración o propuesta.</li>
        <li>Contactarle para coordinar demostraciones y reuniones.</li>
        <li>Elaborar y enviar propuestas comerciales para su institución.</li>
        <li>Gestionar la relación comercial, la implementación, la formación y el soporte de las soluciones contratadas.</li>
        <li>Enviarle información sobre las soluciones del portafolio, eventos o novedades, siempre con la posibilidad de solicitar que no le enviemos más comunicaciones.</li>
        <li>Elaborar estadísticas internas de forma agregada.</li>
        <li>Cumplir obligaciones legales y atender requerimientos de autoridades competentes.</li>
      </ol>`],
    ['menores', 'Datos de niñas, niños y adolescentes', `<p>Este sitio está dirigido a personal directivo, administrativo y docente de instituciones educativas, y no recolecta de forma intencional datos de menores de edad.</p>
      <p>Cuando una institución contrata alguna de las soluciones del portafolio, el tratamiento de los datos de sus estudiantes se rige por los acuerdos entre la institución y el fabricante correspondiente, y por las políticas de este último. En todo caso, Grupo Logic promueve que dicho tratamiento respete el interés superior de niñas, niños y adolescentes y sus derechos fundamentales, como exige el artículo 7 de la Ley 1581 de 2012.</p>`],
    ['derechos', 'Derechos de los titulares', `<p>Como titular de los datos, usted tiene derecho a:</p>
      <ol>
        <li>Conocer, actualizar y rectificar sus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada, salvo cuando la ley no la exija.</li>
        <li>Ser informado, previa solicitud, sobre el uso que se ha dado a sus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la normativa de protección de datos, una vez agotado el trámite de consulta o reclamo ante el responsable.</li>
        <li>Revocar la autorización y solicitar la supresión de sus datos cuando no se respeten los principios, derechos y garantías constitucionales y legales.</li>
        <li>Acceder en forma gratuita a sus datos personales.</li>
      </ol>`],
    ['procedimiento', 'Consultas y reclamos', `<p>Puede ejercer sus derechos a través de los canales indicados en la sección «Responsable del tratamiento».</p>
      <h3>Consultas</h3>
      <p>Las consultas se atenderán en un término máximo de diez (10) días hábiles contados a partir de la fecha de su recibo. Cuando no fuere posible atenderlas dentro de ese término, se le informarán los motivos de la demora y la fecha en que se atenderá, que no podrá superar cinco (5) días hábiles adicionales.</p>
      <h3>Reclamos</h3>
      <p>Si considera que sus datos deben ser corregidos, actualizados o suprimidos, puede presentar un reclamo que incluya su identificación, la descripción de los hechos, la dirección de notificación y los documentos que desee hacer valer. Si el reclamo resulta incompleto, se le requerirá dentro de los cinco (5) días siguientes para que subsane las fallas.</p>
      <p>El término máximo para atender el reclamo será de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recibo. Cuando no fuere posible atenderlo dentro de ese término, se le informarán los motivos de la demora y la fecha en que se atenderá, que no podrá superar ocho (8) días hábiles adicionales.</p>`],
    ['terceros', 'Transmisión y transferencia de datos', `<p>Para operar este sitio y gestionar las solicitudes, Grupo Logic puede apoyarse en proveedores tecnológicos —por ejemplo, de alojamiento web, de procesamiento de formularios o de correo electrónico— que actúan como encargados del tratamiento y que pueden estar ubicados fuera de Colombia. En esos casos exigimos condiciones que garanticen la seguridad y confidencialidad de la información, conforme a la ley.</p>
      <p>Cuando sea necesario para preparar una propuesta o una implementación, y siempre dentro de las finalidades descritas, podremos compartir sus datos de contacto profesional con el fabricante de la solución de su interés.</p>`],
    ['seguridad', 'Seguridad de la información', `<p>Adoptamos medidas técnicas, humanas y administrativas razonables para proteger los datos personales contra adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento. El sitio se sirve mediante conexión cifrada (HTTPS).</p>`],
    ['cookies', 'Cookies y analítica', `<p>Este sitio no usa cookies publicitarias. Si se activa una herramienta de analítica web, se mostrará un aviso para que usted acepte o rechace su uso, y la herramienta solo se cargará si la acepta. Su decisión se guarda en su navegador y puede cambiarla borrando los datos del sitio.</p>`],
    ['vigencia', 'Vigencia y cambios', `<p>Esta política rige a partir de su publicación. Los datos se conservarán durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables. Cualquier cambio sustancial se publicará en esta misma página, con la fecha de actualización.</p>`],
  ];

  const cuerpo = `
${hero('/privacidad/', 'Tratamiento de datos', 'Política de tratamiento de <em>datos personales</em>', 'Cómo recolectamos, usamos y protegemos la información que usted nos entrega a través de este sitio, conforme a la Ley 1581 de 2012 de Colombia.')}
<!-- AVISO PARA EL PROPIETARIO: texto general. Debe ser revisado por un asesor legal antes de publicarse.
     Complete razón social, NIT y correo del responsable en assets/js/config.js (objeto "legal"). -->
<section class="seccion seccion--clara" aria-label="Contenido de la política">
  <div class="contenedor">
    <div class="legal">
      <nav class="legal__indice" aria-label="Contenido de la política">
        <p class="campo__etiqueta">Contenido</p>
        <ol>${secciones.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol>
      </nav>
      ${secciones.map(([id, t, html]) => `<h2 id="${id}">${t}</h2>\n      ${html}`).join('\n      ')}
    </div>
  </div>
</section>`;

  return {
    ruta: '/privacidad/',
    titulo: 'Política de tratamiento de datos personales · Grupo Logic',
    descripcion: 'Política de tratamiento de datos personales de Grupo Logic conforme a la Ley 1581 de 2012: finalidades, derechos de los titulares, consultas y reclamos.',
    og: 'privacidad',
    cuerpo,
    jsonld: [migasLd([['Inicio', '/'], ['Tratamiento de datos', '/privacidad/']])],
  };
}

export function terminos() {
  const secciones = [
    ['objeto', 'Objeto', '<p>Estos términos regulan el acceso y el uso del sitio web grupologiclatam.com (en adelante, «el sitio»), operado por Grupo Logic. Al navegar por el sitio, usted acepta estos términos. Si no está de acuerdo con ellos, le pedimos no utilizarlo.</p>'],
    ['uso', 'Uso del sitio', '<p>El sitio tiene una finalidad informativa sobre las soluciones de tecnología educativa que Grupo Logic acerca a las instituciones educativas de Latinoamérica. Usted se compromete a usarlo de forma lícita, sin afectar su funcionamiento ni los derechos de terceros, y a suministrar información veraz en los formularios.</p>'],
    ['informacion', 'Información sobre las soluciones', `<p>La descripción de cada solución se basa en la información publicada por su fabricante en su sitio oficial, al que enlazamos desde cada página. Las funcionalidades, modalidades de licencia y condiciones pueden cambiar sin previo aviso por decisión del fabricante.</p>
      <p>El contenido del sitio no constituye una oferta comercial. Las condiciones aplicables a su institución —alcance, modalidad, vigencia, valor y forma de pago— son las que consten en la propuesta formal que Grupo Logic le entregue por escrito.</p>`],
    ['propiedad', 'Propiedad intelectual', `<p>Los textos, el diseño, el logotipo de Grupo Logic y los demás elementos propios del sitio están protegidos por las normas de propiedad intelectual. No pueden reproducirse con fines comerciales sin autorización previa y por escrito.</p>
      <p>Los nombres, logotipos y capturas de pantalla de los productos pertenecen a sus respectivos titulares y se muestran únicamente con fines informativos para identificar las soluciones.</p>`],
    ['enlaces', 'Enlaces a sitios de terceros', '<p>El sitio incluye enlaces a los sitios oficiales de los fabricantes y a otros servicios. Grupo Logic no controla esos sitios ni responde por su contenido, disponibilidad o políticas de privacidad, que le recomendamos consultar.</p>'],
    ['responsabilidad', 'Responsabilidad', '<p>Procuramos que la información del sitio sea exacta y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad ininterrumpida del sitio. Grupo Logic no será responsable por daños derivados del uso del sitio o de la imposibilidad de usarlo, en la medida permitida por la ley.</p>'],
    ['datos', 'Datos personales', '<p>El tratamiento de los datos que usted nos entrega se rige por nuestra <a href="/privacidad/">política de tratamiento de datos personales</a>.</p>'],
    ['ley', 'Ley aplicable', '<p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a los jueces competentes de la ciudad de Barranquilla, sin perjuicio de las normas de protección al consumidor que resulten aplicables.</p>'],
    ['cambios', 'Modificaciones', '<p>Grupo Logic puede modificar estos términos en cualquier momento. La versión vigente es la publicada en esta página, con su fecha de actualización.</p>'],
    ['contacto', 'Contacto', '<p>Si tiene preguntas sobre estos términos, escríbanos a través del <a href="/contacto/">formulario de contacto</a>.</p>'],
  ];
  const cuerpo = `
${hero('/terminos/', 'Términos de uso', 'Términos de uso <em>del sitio</em>', 'Condiciones para el acceso y el uso de grupologiclatam.com.')}
<!-- AVISO PARA EL PROPIETARIO: texto general. Debe ser revisado por un asesor legal antes de publicarse. -->
<section class="seccion seccion--clara" aria-label="Contenido de los términos">
  <div class="contenedor">
    <div class="legal">
      ${secciones.map(([id, t, html]) => `<h2 id="${id}">${t}</h2>\n      ${html}`).join('\n      ')}
    </div>
  </div>
</section>`;
  return {
    ruta: '/terminos/',
    titulo: 'Términos de uso del sitio · Grupo Logic',
    descripcion: 'Términos de uso del sitio web de Grupo Logic: finalidad informativa, información de las soluciones, propiedad intelectual, enlaces y ley aplicable.',
    og: 'terminos',
    cuerpo,
    jsonld: [migasLd([['Inicio', '/'], ['Términos de uso', '/terminos/']])],
  };
}
