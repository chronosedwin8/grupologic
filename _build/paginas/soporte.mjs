// Soporte técnico de los productos: /soporte/
import { SOLUCIONES, esc, icono, logotipo, migasLd } from '../lib/plantilla.mjs';

export default function soporte() {
  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Soporte</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Soporte</p>
      <h1 class="titulo-1" id="titulo-principal">Soporte técnico <em>de nuestros productos</em></h1>
      <p class="hero__texto">Todas las licencias incluyen soporte técnico del producto durante su vigencia. Escríbanos y le ayudamos con el uso, el acceso o cualquier incidencia.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-label="Cómo obtener soporte">
  <div class="contenedor">
    <div class="rejilla-tarjetas rejilla-tarjetas--3" data-aparecer-grupo>
      <article class="tarjeta" data-aparecer>
        <div class="tarjeta__icono">${icono('correo')}</div>
        <h2 class="tarjeta__titulo">Escríbanos</h2>
        <ul class="tarjeta__lista">
          <li data-gl="email" hidden>Correo: <a href="#" data-gl-enlace><span data-gl-texto></span></a></li>
          <li><a href="/contacto/">Formulario de contacto</a></li>
        </ul>
        <p class="tarjeta__texto">Respondemos en días hábiles, en español.</p>
      </article>
      <article class="tarjeta" data-aparecer>
        <div class="tarjeta__icono">${icono('soporte')}</div>
        <h2 class="tarjeta__titulo">Qué cubre</h2>
        <ul class="tarjeta__lista">
          <li>Dudas sobre el uso del producto</li>
          <li>Errores e incidencias técnicas</li>
          <li>Acceso, usuarios y contraseñas</li>
          <li>Activación y renovación de licencias</li>
          <li>Pagos, comprobantes y reembolsos</li>
        </ul>
      </article>
      <article class="tarjeta" data-aparecer>
        <div class="tarjeta__icono">${icono('documento')}</div>
        <h2 class="tarjeta__titulo">Qué incluir</h2>
        <ul class="tarjeta__lista">
          <li>El producto y el plan que usa</li>
          <li>El nombre de la institución y el correo de la cuenta</li>
          <li>Qué intentaba hacer y qué ocurrió</li>
          <li>Capturas de pantalla, si las tiene</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section class="seccion seccion--blanca" aria-labelledby="titulo-productos">
  <div class="contenedor">
    <div class="cabecera-seccion" data-aparecer>
      <p class="ceja">Por producto</p>
      <h2 class="titulo-2" id="titulo-productos">Información de cada producto</h2>
      <p class="entrada">Funcionalidades, requisitos y preguntas frecuentes de cada producto.</p>
    </div>
    <ul class="lista-soluciones" style="max-width:720px">${SOLUCIONES.map(s => `<li><a href="/productos/${s.slug}/">${logotipo(s.slug)}<small>${esc(s.dominio)}</small></a></li>`).join('')}</ul>
  </div>
</section>

<section class="seccion seccion--clara" aria-labelledby="titulo-legal">
  <div class="contenedor dos-columnas">
    <div data-aparecer>
      <p class="ceja">Licencias y pagos</p>
      <h2 class="titulo-2" id="titulo-legal">Condiciones de compra</h2>
    </div>
    <ul class="lista-columnas" data-aparecer>
      <li>${icono('check')}<span><a href="/precios/">Precios y planes</a> de cada producto.</span></li>
      <li>${icono('check')}<span><a href="/reembolsos/">Política de reembolsos</a>: reembolso total dentro de 14 días.</span></li>
      <li>${icono('check')}<span><a href="/terminos/">Términos y condiciones</a> de las licencias.</span></li>
      <li>${icono('check')}<span><a href="/privacidad/">Política de privacidad</a> y tratamiento de datos.</span></li>
    </ul>
  </div>
</section>`;

  return {
    ruta: '/soporte/',
    titulo: 'Soporte técnico de productos · Grupo Logic',
    descripcion: 'Soporte técnico de los productos de software de Grupo Logic: uso, acceso, incidencias, activación de licencias, pagos y reembolsos.',
    og: 'soporte',
    cuerpo,
    jsonld: [migasLd([['Inicio', '/'], ['Soporte', '/soporte/']])],
  };
}
