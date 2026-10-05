// Contacto: demostraciones, compra de licencias y soporte técnico.
import { icono, migasLd, organizacionLd, DOMINIO } from '../lib/plantilla.mjs';
import { formularioCompleto } from '../lib/formularios.mjs';

export default function contacto() {
  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Contacto</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Contacto</p>
      <h1 class="titulo-1" id="titulo-principal">Demostraciones, licencias y <em>soporte</em></h1>
      <p class="hero__texto">Solicite una demostración de un producto, la compra o cotización de licencias, o ayuda técnica. Le responderemos por correo.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-label="Formulario de contacto">
  <div class="contenedor contacto">
    <div class="contacto__formulario claro">
      <h2 class="titulo-3" id="titulo-formulario" style="margin-bottom:1.6rem">Su mensaje</h2>
      ${formularioCompleto()}
    </div>
    <aside class="contacto__lateral" aria-label="Información adicional">
      <div class="tarjeta">
        <h2 class="tarjeta__titulo">Qué sigue</h2>
        <ol class="pasos-mini">
          <li><span><strong>Recibimos su mensaje</strong>con el producto y el motivo que indicó.</span></li>
          <li><span><strong>Le respondemos por correo</strong>con la demostración, el enlace de compra, la cotización o la solución técnica.</span></li>
          <li><span><strong>Active su licencia</strong>cuando lo decida; los precios están publicados en <a href="/precios/">precios</a>.</span></li>
        </ol>
      </div>
      <div class="tarjeta">
        <h2 class="tarjeta__titulo">Otros canales</h2>
        <ul class="lista-check" style="margin-top:12px">
          <li data-gl="email" hidden><a class="enlace-flecha" href="#" data-gl-enlace>${icono('correo')}<span data-gl-texto></span></a></li>
          <li>${icono('soporte')}<span><a href="/soporte/">Soporte técnico</a> de los productos.</span></li>
          <li>${icono('globo')}<span>Atendemos instituciones de toda Latinoamérica.</span></li>
        </ul>
      </div>
      <div class="tarjeta">
        <h2 class="tarjeta__titulo">Sus datos, protegidos</h2>
        <p class="tarjeta__texto">Usamos la información de este formulario solo para responder su mensaje, conforme a nuestra <a href="/privacidad/">política de privacidad</a>.</p>
      </div>
    </aside>
  </div>
</section>`;

  return {
    ruta: '/contacto/',
    titulo: 'Contacto: demostraciones, licencias y soporte · Grupo Logic',
    descripcion: 'Contacte a Grupo Logic para solicitar una demostración, comprar o cotizar licencias de nuestros productos, o recibir soporte técnico.',
    og: 'contacto',
    cuerpo,
    scripts: ['form'],
    jsonld: [
      organizacionLd(),
      { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contacto de Grupo Logic', url: DOMINIO + '/contacto/', about: { '@id': DOMINIO + '/#organizacion' } },
      migasLd([['Inicio', '/'], ['Contacto', '/contacto/']]),
    ],
  };
}
