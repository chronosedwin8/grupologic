// Páginas legales: política de privacidad (Ley 1581 de 2012), términos y condiciones y política de reembolsos.
// IMPORTANTE (propietario): textos generales; conviene revisarlos con un abogado. Confirme el plazo de
// reembolso (14 días) con su proveedor de pagos. La razón social, el NIT y el correo se toman de config.js.
import { migasLd } from '../lib/plantilla.mjs';

const ACTUALIZACION = '5 de octubre de 2026';

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
      <p>Si contrata una licencia o un servicio, tratamos además los datos necesarios para la facturación y la entrega: razón social y datos de la institución, persona de contacto y referencia del pago. El pago lo procesa un proveedor de pagos especializado, que trata los datos de pago conforme a sus propias políticas; Grupo Logic no almacena números de tarjeta.</p>
      <p>Si el sitio tiene activada una herramienta de analítica web, también se recolectan datos de navegación de forma agregada, únicamente después de que usted lo acepte en el aviso de cookies.</p>`],
    ['finalidades', 'Finalidades del tratamiento', `<p>Los datos personales se tratarán para las siguientes finalidades:</p>
      <ol>
        <li>Responder sus solicitudes de información, demostración, cotización o soporte.</li>
        <li>Coordinar demostraciones de nuestros productos.</li>
        <li>Activar y administrar las licencias y cuentas de usuario de nuestros productos.</li>
        <li>Prestar el soporte técnico de los productos contratados.</li>
        <li>Gestionar pagos, facturación, renovaciones y solicitudes de reembolso.</li>
        <li>Enviarle información sobre nuestros productos, nuevas versiones o novedades, siempre con la posibilidad de solicitar que no le enviemos más comunicaciones.</li>
        <li>Elaborar estadísticas internas de forma agregada.</li>
        <li>Cumplir obligaciones legales y atender requerimientos de autoridades competentes.</li>
      </ol>`],
    ['menores', 'Datos de niñas, niños y adolescentes', `<p>Este sitio está dirigido a personal directivo, administrativo y docente de instituciones educativas, y no recolecta de forma intencional datos de menores de edad.</p>
      <p>Cuando una institución usa nuestros productos, los datos de sus estudiantes se tratan únicamente para prestar el servicio del producto, según la licencia contratada y las instrucciones de la institución. Respetamos el interés superior de niñas, niños y adolescentes y sus derechos fundamentales, como exige el artículo 7 de la Ley 1581 de 2012: recolectamos los datos mínimos, no mostramos publicidad y no vendemos ni cedemos datos de menores a terceros.</p>`],
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
    ['terceros', 'Transmisión y transferencia de datos', `<p>Para operar este sitio y gestionar las solicitudes, Grupo Logic puede apoyarse en proveedores tecnológicos —por ejemplo, de alojamiento web, de procesamiento de formularios, de pagos o de correo electrónico— que actúan como encargados del tratamiento y que pueden estar ubicados fuera de Colombia. En esos casos exigimos condiciones que garanticen la seguridad y confidencialidad de la información, conforme a la ley.</p>
      <p>No vendemos ni alquilamos datos personales a terceros.</p>`],
    ['seguridad', 'Seguridad de la información', `<p>Adoptamos medidas técnicas, humanas y administrativas razonables para proteger los datos personales contra adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento. El sitio se sirve mediante conexión cifrada (HTTPS).</p>`],
    ['cookies', 'Cookies y analítica', `<p>Este sitio no usa cookies publicitarias. Si se activa una herramienta de analítica web, se mostrará un aviso para que usted acepte o rechace su uso, y la herramienta solo se cargará si la acepta. Su decisión se guarda en su navegador y puede cambiarla borrando los datos del sitio.</p>`],
    ['vigencia', 'Vigencia y cambios', `<p>Esta política rige a partir de su publicación. Los datos se conservarán durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables. Cualquier cambio sustancial se publicará en esta misma página, con la fecha de actualización.</p>`],
  ];

  const cuerpo = `
${hero('/privacidad/', 'Política de privacidad', 'Política de <em>privacidad</em>', 'Cómo recolectamos, usamos y protegemos sus datos personales. Esta es nuestra política de tratamiento de datos personales, conforme a la Ley 1581 de 2012 de Colombia.')}
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
    titulo: 'Política de privacidad y tratamiento de datos · Grupo Logic',
    descripcion: 'Política de privacidad de Grupo Logic conforme a la Ley 1581 de 2012: datos que recolectamos, finalidades, derechos de los titulares, consultas y reclamos.',
    og: 'privacidad',
    cuerpo,
    jsonld: [migasLd([['Inicio', '/'], ['Política de privacidad', '/privacidad/']])],
  };
}

// Canales de contacto para términos y reembolsos (se completan desde config.js)
const CONTACTO = `<ul>
        <li><a href="/contacto/">Formulario de contacto</a></li>
        <li data-gl="email" hidden>Correo: <a href="#" data-gl-enlace><span data-gl-texto></span></a></li>
        <li data-gl="whatsapp" hidden data-gl-mensaje="Hola, tengo una consulta sobre mi compra."><a href="#" data-gl-enlace target="_blank" rel="noopener">WhatsApp</a></li>
      </ul>`;

const pagina = (secciones, indice) => `
<section class="seccion seccion--clara" aria-label="Contenido">
  <div class="contenedor">
    <div class="legal">
      ${indice ? `<nav class="legal__indice" aria-label="Contenido">
        <p class="campo__etiqueta">Contenido</p>
        <ol>${secciones.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol>
      </nav>` : ''}
      ${secciones.map(([id, t, html]) => `<h2 id="${id}">${t}</h2>\n      ${html}`).join('\n      ')}
    </div>
  </div>
</section>`;

export function terminos() {
  const secciones = [
    ['objeto', 'Objeto y aceptación', `<p>Estos términos y condiciones regulan el uso del sitio web www.grupologiclatam.com (el «sitio») y la compra de licencias de los productos de software que desarrolla y comercializa <span data-gl="legal.razonSocial" data-gl-modo="texto">Grupo Logic</span> («Grupo Logic» o «nosotros»). Al usar el sitio o comprar una licencia, usted acepta estos términos, junto con nuestra <a href="/privacidad/">política de privacidad</a> y nuestra <a href="/reembolsos/">política de reembolsos</a>.</p>
      <p>Si compra en nombre de una institución, declara que tiene facultades para obligarla.</p>`],
    ['productos', 'Nuestros productos', `<p>Grupo Logic diseña, desarrolla y comercializa software para instituciones educativas: plataformas web (SaaS) y aplicaciones de escritorio. Lo que usted adquiere es una licencia de uso del software por el período y el número de usuarios, equipos o sedes del plan elegido. La licencia incluye las actualizaciones del producto y el soporte técnico durante su vigencia; algunos planes incluyen además una capacitación inicial en línea sobre el uso del producto.</p>
      <p>Todos nuestros productos son digitales: se entregan mediante la activación de una licencia o la habilitación de accesos. No realizamos envíos físicos.</p>`],
    ['compra', 'Compra de licencias', `<p>Los planes, sus precios y lo que incluye cada uno se publican en la página de <a href="/precios/">precios</a> y en la página de cada producto. Antes del pago, el resumen de compra le indica el producto, el plan, el número de usuarios, equipos o sedes, la vigencia, el valor, la moneda y los impuestos aplicables. Para los planes por volumen le enviamos una cotización por escrito con esa misma información.</p>
      <p>La compra queda perfeccionada cuando usted acepta esas condiciones y se confirma el pago.</p>`],
    ['pagos', 'Precios y pagos', `<p>Los precios son los publicados en el sitio o, para planes por volumen, los de la cotización. Están expresados en pesos colombianos (COP) y los impuestos aplicables se calculan al momento del pago. Los pagos se procesan a través de proveedores de pago especializados; Grupo Logic no almacena los datos de su tarjeta. Al confirmarse el pago, usted recibe un comprobante electrónico de la transacción.</p>`],
    ['entrega', 'Entrega y activación', `<p>Una vez confirmado el pago, activamos la licencia o habilitamos los accesos y se los enviamos al correo indicado en la compra. Si tiene dificultades para acceder, escríbanos y lo resolveremos.</p>`],
    ['vigencia', 'Vigencia y renovación', `<p>Las licencias tienen la vigencia indicada en el plan, generalmente de doce (12) meses desde su activación. Antes del vencimiento le informaremos las condiciones de renovación; la renovación requiere su aceptación.</p>`],
    ['cancelacion', 'Cancelación y reembolsos', `<p>Puede cancelar la renovación de una licencia en cualquier momento antes de su vencimiento. Las condiciones, los plazos y el procedimiento para solicitar un reembolso se describen en nuestra <a href="/reembolsos/">política de reembolsos</a>.</p>`],
    ['licencia-uso', 'Licencia de uso', `<p>La licencia es no exclusiva e intransferible y se limita a los usuarios, equipos o sedes del plan. Usted se compromete a usar el software de forma lícita, a no compartir credenciales fuera de los cupos contratados, a no revender ni sublicenciar el acceso y a no intentar vulnerar su seguridad ni descompilar el software.</p>`],
    ['soporte', 'Soporte técnico y actualizaciones', `<p>Durante la vigencia de la licencia le brindamos soporte técnico del producto por correo (dudas de uso, incidencias y acceso) y las actualizaciones que publiquemos. Más información en <a href="/soporte/">soporte</a>.</p>`],
    ['cambios-producto', 'Cambios en los productos', `<p>Mejoramos nuestros productos de forma continua. Podemos añadir, modificar o retirar funciones, sin reducir de forma sustancial las funciones principales del plan contratado durante su vigencia.</p>`],
    ['propiedad', 'Propiedad intelectual', `<p>El software, los nombres y logotipos de los productos, los textos, el diseño y el logotipo de Grupo Logic están protegidos por las normas de propiedad intelectual y pertenecen a Grupo Logic. La compra de una licencia otorga un derecho de uso, no la propiedad del software.</p>`],
    ['enlaces', 'Enlaces a sitios de terceros', '<p>Cada producto tiene además su propio sitio web, operado por Grupo Logic. El sitio puede incluir enlaces a servicios de terceros; Grupo Logic no controla esos sitios ni responde por su contenido, disponibilidad o políticas de privacidad.</p>'],
    ['responsabilidad', 'Limitación de responsabilidad', '<p>Procuramos que la información del sitio sea exacta y que el software funcione sin interrupciones, pero no podemos garantizarlo de forma absoluta. En la medida permitida por la ley, la responsabilidad de Grupo Logic se limita al valor efectivamente pagado por la licencia que dio origen al reclamo. Nada en estos términos limita los derechos que la ley le reconoce como consumidor.</p>'],
    ['datos', 'Datos personales', '<p>El tratamiento de sus datos personales se rige por nuestra <a href="/privacidad/">política de privacidad</a>.</p>'],
    ['ley', 'Ley aplicable', '<p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a los jueces competentes del domicilio del responsable del sitio, sin perjuicio de las normas de protección al consumidor que resulten aplicables.</p>'],
    ['cambios', 'Modificaciones', '<p>Grupo Logic puede modificar estos términos. La versión vigente es la publicada en esta página, con su fecha de actualización; los cambios no afectan las compras ya realizadas.</p>'],
    ['contacto', 'Contacto', `<p>Si tiene preguntas sobre estos términos, puede escribirnos por:</p>${CONTACTO}`],
  ];
  const cuerpo = `
${hero('/terminos/', 'Términos y condiciones', 'Términos y <em>condiciones</em>', 'Condiciones para el uso del sitio y la compra de licencias de los productos de software de Grupo Logic.')}
${pagina(secciones, true)}`;
  return {
    ruta: '/terminos/',
    titulo: 'Términos y condiciones de servicio · Grupo Logic',
    descripcion: 'Términos y condiciones de Grupo Logic: compra de licencias de software, precios y pagos, entrega digital, vigencia, cancelación, reembolsos y soporte.',
    og: 'terminos',
    cuerpo,
    jsonld: [migasLd([['Inicio', '/'], ['Términos y condiciones', '/terminos/']])],
  };
}

export function reembolsos() {
  const secciones = [
    ['alcance', 'Alcance', '<p>Esta política aplica a las licencias de los productos de software de Grupo Logic: UntiCloud, Codexia, CodeNest School, VCodePro y BookStudio.</p>'],
    ['plazo', 'Reembolso dentro de los 14 días', '<p>Si no está satisfecho con su compra, puede solicitar el <strong>reembolso total</strong> dentro de los <strong>catorce (14) días calendario</strong> siguientes a la fecha del pago, sin necesidad de justificar el motivo. Este plazo aplica tanto a la compra inicial como a cada renovación.</p>'],
    ['despues', 'Después de los 14 días', '<p>Pasado ese plazo, los pagos no son reembolsables por el período en curso, salvo que la ley aplicable disponga otra cosa o que exista un incumplimiento de nuestra parte. En ese caso, evaluaremos un reembolso proporcional al tiempo no utilizado.</p>'],
    ['incumplimiento', 'Fallas del producto', '<p>Si no podemos activar la licencia, o el producto presenta una falla que impide su uso y no logramos solucionarla, le reembolsaremos el valor pagado por la parte no entregada, sin importar la fecha de la solicitud.</p>'],
    ['errores', 'Cobros duplicados o erróneos', '<p>Los cobros duplicados o por un valor distinto al acordado se reembolsan en su totalidad una vez verificados.</p>'],
    ['cancelar', 'Cancelar la renovación', '<p>Puede cancelar la renovación de su licencia en cualquier momento antes del vencimiento. Al cancelarla, conserva el acceso hasta el final del período ya pagado y no se le hace ningún cobro adicional.</p>'],
    ['como', 'Cómo solicitar un reembolso', `<p>Escríbanos por cualquiera de estos canales indicando el nombre de la institución, el correo usado en la compra, la referencia o el comprobante del pago y, si lo desea, el motivo:</p>${CONTACTO}`],
    ['procesamiento', 'Plazos y forma de pago del reembolso', '<p>Confirmaremos la recepción de su solicitud y le responderemos en un máximo de cinco (5) días hábiles. Los reembolsos aprobados se realizan por el mismo medio de pago utilizado en la compra, dentro de los diez (10) días hábiles siguientes a la aprobación. El tiempo en que el dinero se refleja en su cuenta depende de su banco o del emisor de su tarjeta.</p><p>Cuando la compra se haya procesado a través de un proveedor de pagos que actúe como vendedor autorizado, el reembolso se tramita por medio de ese proveedor.</p><p>Una vez aprobado el reembolso, la licencia o los accesos correspondientes se desactivan.</p>'],
    ['derechos', 'Sus derechos como consumidor', '<p>Esta política no limita los derechos que la ley aplicable le reconoce como consumidor, incluidos el derecho de retracto y la reversión del pago cuando correspondan.</p>'],
  ];
  const cuerpo = `
${hero('/reembolsos/', 'Política de reembolsos', 'Política de <em>reembolsos</em>', 'Cuándo y cómo puede solicitar el reembolso de una licencia de nuestros productos de software.')}
${pagina(secciones, false)}`;
  return {
    ruta: '/reembolsos/',
    titulo: 'Política de reembolsos · Grupo Logic',
    descripcion: 'Política de reembolsos de Grupo Logic: reembolso total dentro de los 14 días siguientes al pago, cancelación de renovaciones y cómo solicitar un reembolso.',
    og: 'reembolsos',
    cuerpo,
    jsonld: [migasLd([['Inicio', '/'], ['Política de reembolsos', '/reembolsos/']])],
  };
}
