// Páginas legales: política de privacidad (Ley 1581 de 2012), términos y condiciones y política de reembolsos.
// IMPORTANTE: textos generales. Deben ser revisados por un asesor legal antes de publicarse.
import { migasLd } from '../lib/plantilla.mjs';

const ACTUALIZACION = '4 de octubre de 2026';

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
        <li>Responder sus solicitudes de información, demostración o propuesta.</li>
        <li>Contactarle para coordinar demostraciones y reuniones.</li>
        <li>Elaborar y enviar propuestas comerciales para su institución.</li>
        <li>Gestionar la relación comercial, la implementación, la formación y el soporte de las soluciones contratadas.</li>
        <li>Gestionar pagos, facturación, renovaciones y solicitudes de reembolso.</li>
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
    ['terceros', 'Transmisión y transferencia de datos', `<p>Para operar este sitio y gestionar las solicitudes, Grupo Logic puede apoyarse en proveedores tecnológicos —por ejemplo, de alojamiento web, de procesamiento de formularios, de pagos o de correo electrónico— que actúan como encargados del tratamiento y que pueden estar ubicados fuera de Colombia. En esos casos exigimos condiciones que garanticen la seguridad y confidencialidad de la información, conforme a la ley.</p>
      <p>Cuando sea necesario para preparar una propuesta o una implementación, y siempre dentro de las finalidades descritas, podremos compartir sus datos de contacto profesional con el fabricante de la solución de su interés.</p>`],
    ['seguridad', 'Seguridad de la información', `<p>Adoptamos medidas técnicas, humanas y administrativas razonables para proteger los datos personales contra adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento. El sitio se sirve mediante conexión cifrada (HTTPS).</p>`],
    ['cookies', 'Cookies y analítica', `<p>Este sitio no usa cookies publicitarias. Si se activa una herramienta de analítica web, se mostrará un aviso para que usted acepte o rechace su uso, y la herramienta solo se cargará si la acepta. Su decisión se guarda en su navegador y puede cambiarla borrando los datos del sitio.</p>`],
    ['vigencia', 'Vigencia y cambios', `<p>Esta política rige a partir de su publicación. Los datos se conservarán durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables. Cualquier cambio sustancial se publicará en esta misma página, con la fecha de actualización.</p>`],
  ];

  const cuerpo = `
${hero('/privacidad/', 'Política de privacidad', 'Política de <em>privacidad</em>', 'Cómo recolectamos, usamos y protegemos sus datos personales. Esta es nuestra política de tratamiento de datos personales, conforme a la Ley 1581 de 2012 de Colombia.')}
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
    ['objeto', 'Objeto y aceptación', `<p>Estos términos y condiciones regulan el uso del sitio web www.grupologiclatam.com (el «sitio») y la contratación de las licencias y los servicios que ofrece <span data-gl="legal.razonSocial" data-gl-modo="texto">Grupo Logic</span> («Grupo Logic» o «nosotros»). Al usar el sitio o contratar cualquiera de nuestros servicios, usted acepta estos términos, junto con nuestra <a href="/privacidad/">política de privacidad</a> y nuestra <a href="/reembolsos/">política de reembolsos</a>.</p>
      <p>Si contrata en nombre de una institución, declara que tiene facultades para obligarla.</p>`],
    ['servicios', 'Servicios que ofrecemos', `<p>Grupo Logic comercializa licencias de uso de soluciones de tecnología educativa desarrolladas por terceros (los «fabricantes»), junto con servicios de implementación, formación docente, acompañamiento y soporte para instituciones educativas.</p>
      <p>Todos nuestros productos son digitales: se entregan mediante la activación de una licencia o la habilitación de accesos. No realizamos envíos físicos.</p>`],
    ['contratacion', 'Propuesta y contratación', `<p>Antes de cualquier pago le informamos por escrito —en una propuesta formal o en el resumen de compra— el alcance del servicio, el número de usuarios, equipos o sedes cubiertos, la vigencia, el valor, la moneda y los impuestos aplicables.</p>
      <p>El contrato queda perfeccionado cuando usted acepta esas condiciones y se confirma el pago. La información del sitio es descriptiva y no constituye por sí sola una oferta comercial.</p>`],
    ['pagos', 'Precios y pagos', `<p>Los precios son los indicados en la propuesta o en el resumen de compra. Los pagos se procesan a través de proveedores de pago especializados; Grupo Logic no almacena los datos de su tarjeta. Al confirmarse el pago, usted recibe un comprobante electrónico de la transacción.</p>`],
    ['entrega', 'Entrega y activación', `<p>Una vez confirmado el pago, activamos la licencia o habilitamos los accesos y se los enviamos al contacto indicado en la compra, en el plazo señalado en la propuesta. Si tiene dificultades para acceder, escríbanos y lo resolveremos.</p>`],
    ['vigencia', 'Vigencia y renovación', `<p>Las licencias tienen la vigencia indicada en la propuesta, generalmente de doce (12) meses desde su activación. Antes del vencimiento le informaremos las condiciones de renovación; la renovación requiere su aceptación.</p>`],
    ['cancelacion', 'Cancelación y reembolsos', `<p>Puede cancelar la renovación de un servicio en cualquier momento antes de su vencimiento. Las condiciones, los plazos y el procedimiento para solicitar un reembolso se describen en nuestra <a href="/reembolsos/">política de reembolsos</a>.</p>`],
    ['uso-soluciones', 'Uso de las soluciones', `<p>El uso de cada solución se rige también por los términos de su fabricante. Usted se compromete a usarla de forma lícita, a no compartir credenciales fuera de los cupos contratados y a no intentar vulnerar su seguridad.</p>`],
    ['soporte', 'Soporte', `<p>Grupo Logic es su primer punto de contacto para dudas de uso y soporte; los casos técnicos que lo requieran se escalan al fabricante. Los niveles de servicio específicos se indican en la propuesta.</p>`],
    ['informacion', 'Información sobre las soluciones', `<p>La descripción de cada solución se basa en la información publicada por su fabricante en su sitio oficial, al que enlazamos desde cada página. Las funcionalidades y modalidades pueden cambiar por decisión del fabricante.</p>`],
    ['propiedad', 'Propiedad intelectual', `<p>Los textos, el diseño, el logotipo de Grupo Logic y los demás elementos propios del sitio están protegidos por las normas de propiedad intelectual. Los nombres, logotipos y capturas de pantalla de los productos pertenecen a sus respectivos titulares y se muestran con fines informativos. La compra de una licencia otorga un derecho de uso, no la propiedad del software.</p>`],
    ['enlaces', 'Enlaces a sitios de terceros', '<p>El sitio incluye enlaces a los sitios oficiales de los fabricantes y a otros servicios. Grupo Logic no controla esos sitios ni responde por su contenido, disponibilidad o políticas de privacidad.</p>'],
    ['responsabilidad', 'Limitación de responsabilidad', '<p>Procuramos que la información del sitio sea exacta y que los servicios funcionen sin interrupciones, pero no podemos garantizarlo de forma absoluta. En la medida permitida por la ley, la responsabilidad de Grupo Logic se limita al valor efectivamente pagado por el servicio que dio origen al reclamo. Nada en estos términos limita los derechos que la ley le reconoce como consumidor.</p>'],
    ['datos', 'Datos personales', '<p>El tratamiento de sus datos personales se rige por nuestra <a href="/privacidad/">política de privacidad</a>.</p>'],
    ['ley', 'Ley aplicable', '<p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a los jueces competentes del domicilio del responsable del sitio, sin perjuicio de las normas de protección al consumidor que resulten aplicables.</p>'],
    ['cambios', 'Modificaciones', '<p>Grupo Logic puede modificar estos términos. La versión vigente es la publicada en esta página, con su fecha de actualización; los cambios no afectan las compras ya realizadas.</p>'],
    ['contacto', 'Contacto', `<p>Si tiene preguntas sobre estos términos, puede escribirnos por:</p>${CONTACTO}`],
  ];
  const cuerpo = `
${hero('/terminos/', 'Términos y condiciones', 'Términos y <em>condiciones</em>', 'Condiciones para el uso del sitio y la contratación de licencias y servicios de Grupo Logic.')}
<!-- AVISO PARA EL PROPIETARIO: texto general. Debe ser revisado por un asesor legal antes de publicarse. -->
${pagina(secciones, true)}`;
  return {
    ruta: '/terminos/',
    titulo: 'Términos y condiciones de servicio · Grupo Logic',
    descripcion: 'Términos y condiciones de Grupo Logic: contratación de licencias y servicios, precios y pagos, entrega, vigencia, cancelación, reembolsos y ley aplicable.',
    og: 'terminos',
    cuerpo,
    jsonld: [migasLd([['Inicio', '/'], ['Términos y condiciones', '/terminos/']])],
  };
}

export function reembolsos() {
  const secciones = [
    ['alcance', 'Alcance', '<p>Esta política aplica a las licencias y los servicios contratados directamente con Grupo Logic: licencias de uso de las soluciones del portafolio, implementación, formación y acompañamiento.</p>'],
    ['plazo', 'Reembolso dentro de los 14 días', '<p>Si no está satisfecho con su compra, puede solicitar el <strong>reembolso total</strong> dentro de los <strong>catorce (14) días calendario</strong> siguientes a la fecha del pago, sin necesidad de justificar el motivo. Este plazo aplica tanto a la compra inicial como a cada renovación.</p>'],
    ['despues', 'Después de los 14 días', '<p>Pasado ese plazo, los pagos no son reembolsables por el período en curso, salvo que la ley aplicable disponga otra cosa o que exista un incumplimiento de nuestra parte. En ese caso, evaluaremos un reembolso proporcional al tiempo no utilizado.</p>'],
    ['incumplimiento', 'Fallas en el servicio', '<p>Si no podemos activar la licencia o entregar el servicio contratado en los términos acordados, y no logramos solucionarlo, le reembolsaremos el valor pagado por la parte no entregada, sin importar la fecha de la solicitud.</p>'],
    ['errores', 'Cobros duplicados o erróneos', '<p>Los cobros duplicados o por un valor distinto al acordado se reembolsan en su totalidad una vez verificados.</p>'],
    ['cancelar', 'Cancelar la renovación', '<p>Puede cancelar la renovación de su licencia en cualquier momento antes del vencimiento. Al cancelarla, conserva el acceso hasta el final del período ya pagado y no se le hace ningún cobro adicional.</p>'],
    ['como', 'Cómo solicitar un reembolso', `<p>Escríbanos por cualquiera de estos canales indicando el nombre de la institución, el correo usado en la compra, la referencia o el comprobante del pago y, si lo desea, el motivo:</p>${CONTACTO}`],
    ['procesamiento', 'Plazos y forma de pago del reembolso', '<p>Confirmaremos la recepción de su solicitud y le responderemos en un máximo de cinco (5) días hábiles. Los reembolsos aprobados se realizan por el mismo medio de pago utilizado en la compra, dentro de los diez (10) días hábiles siguientes a la aprobación. El tiempo en que el dinero se refleja en su cuenta depende de su banco o del emisor de su tarjeta.</p><p>Cuando la compra se haya procesado a través de un proveedor de pagos que actúe como vendedor autorizado, el reembolso se tramita por medio de ese proveedor.</p><p>Una vez aprobado el reembolso, la licencia o los accesos correspondientes se desactivan.</p>'],
    ['derechos', 'Sus derechos como consumidor', '<p>Esta política no limita los derechos que la ley aplicable le reconoce como consumidor, incluidos el derecho de retracto y la reversión del pago cuando correspondan.</p>'],
  ];
  const cuerpo = `
${hero('/reembolsos/', 'Política de reembolsos', 'Política de <em>reembolsos</em>', 'Cuándo y cómo puede solicitar el reembolso de una licencia o un servicio contratado con Grupo Logic.')}
<!-- AVISO PARA EL PROPIETARIO: confirme el plazo de reembolso (14 días) y los tiempos de respuesta con su
     asesor legal y con las condiciones de su proveedor de pagos antes de publicar cambios. -->
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
