// Precios y planes de todos los productos: /precios/
import { SOLUCIONES, categoria, esc, icono, logotipo, acordeon, faqLd, migasLd, DOMINIO } from '../lib/plantilla.mjs';
import { planes, NOTA_PRECIOS } from '../lib/bloques.mjs';
import { CONTENIDO } from '../contenido/soluciones.mjs';

export const PREGUNTAS_PRECIOS = [
  ['¿En qué moneda están los precios?', 'En pesos colombianos (COP). Los impuestos aplicables según su país se calculan y se muestran al momento del pago.'],
  ['¿Qué incluye el precio de la licencia?', 'El uso del software durante la vigencia del plan, las actualizaciones de versión y el soporte técnico del producto.'],
  ['¿Cómo se paga?', 'En línea, a través de nuestro proveedor de pagos. Al confirmarse el pago recibe un comprobante electrónico y el acceso o la clave de licencia en su correo.'],
  ['¿La licencia se renueva sola?', 'No sin su autorización. Antes del vencimiento le informamos las condiciones de renovación y puede cancelarla en cualquier momento.'],
  ['¿Puedo pedir un reembolso?', 'Sí. Puede solicitar el reembolso total dentro de los 14 días siguientes al pago. Consulte la <a href="/reembolsos/">política de reembolsos</a>.'],
  ['¿Hay precios por volumen?', 'Sí. Los planes marcados como «Cotización», y las instituciones que superan los cupos de un plan, reciben un precio según el número de usuarios, equipos o sedes.'],
];

export default function precios() {
  const bloques = SOLUCIONES.map(s => {
    const c = CONTENIDO[s.slug];
    return `<section class="precios-producto" aria-labelledby="precios-${s.slug}">
      <div class="precios-producto__cabecera" data-aparecer>
        <div>
          <p class="tarjeta-solucion__linea">${esc(categoria(s.categoria).nombre)}</p>
          <h2 class="titulo-3" id="precios-${s.slug}">${logotipo(s.slug, { color: true, etiqueta: false })}<span class="sr">${esc(s.nombre)}</span></h2>
          <p class="precios-producto__lema">${esc(s.lema)}</p>
        </div>
        <a class="enlace-flecha" href="/productos/${s.slug}/">Ver el producto ${icono('flecha')}</a>
      </div>
      ${planes(s.slug, c.licencias)}
      ${c.licencias.pie ? `<p class="precios-producto__nota">${esc(c.licencias.pie)}</p>` : ''}
    </section>`;
  }).join('\n    ');

  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Precios</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Precios</p>
      <h1 class="titulo-1" id="titulo-principal">Planes y precios <em>de nuestros productos</em></h1>
      <p class="hero__texto">Licencias de software con precio publicado, desde un usuario hasta toda la institución. Todas incluyen actualizaciones y soporte técnico.</p>
      <nav class="etiquetas" aria-label="Ir a los precios de un producto" style="margin-top:2rem">${SOLUCIONES.map(s => `<a class="etiqueta" href="#precios-${s.slug}">${esc(s.nombre)}</a>`).join('')}</nav>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-label="Precios por producto">
  <div class="contenedor precios">
    <p class="nota-legal" style="margin-top:0">${esc(NOTA_PRECIOS)}</p>
    ${bloques}
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-preguntas">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Preguntas frecuentes</p>
      <h2 class="titulo-2" id="titulo-preguntas">Pagos, renovación y <em>reembolsos</em></h2>
    </div>
    ${acordeon(PREGUNTAS_PRECIOS, 'faq-precios')}
  </div>
</section>`;

  const ofertas = SOLUCIONES.flatMap(s => CONTENIDO[s.slug].licencias.modalidades.filter(m => m.precio).map(m => ({
    '@type': 'Offer', name: `${s.nombre} · ${m.nombre}`, price: m.precio.replace(/\D/g, ''), priceCurrency: 'COP',
    url: `${DOMINIO}/productos/${s.slug}/#precios`, seller: { '@id': DOMINIO + '/#organizacion' },
  })));

  return {
    ruta: '/precios/',
    titulo: 'Precios y planes de licencia · Grupo Logic',
    descripcion: 'Precios y planes de licencia de los productos de software de Grupo Logic para colegios, con actualizaciones y soporte técnico incluidos.',
    og: 'precios',
    cuerpo,
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'OfferCatalog', name: 'Licencias de software de Grupo Logic', itemListElement: ofertas },
      migasLd([['Inicio', '/'], ['Precios', '/precios/']]),
      faqLd(PREGUNTAS_PRECIOS),
    ],
  };
}
