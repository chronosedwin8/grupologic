// Bloques compartidos entre páginas: pasos, planes con precio y llamada final.
import { esc, icono } from './plantilla.mjs';
import { formularioCorto } from './formularios.mjs';

export const pasos = (lista) => `<ol class="pasos" data-aparecer-grupo>${lista.map(([t, d]) => `
        <li class="paso" data-aparecer><h3 class="paso__titulo">${esc(t)}</h3><p class="paso__texto">${esc(d)}</p></li>`).join('')}
      </ol>`;

// Tarjetas de planes de un producto, con precio visible.
export function planes(slug, licencias, { titulo = 'h3' } = {}) {
  const n = licencias.modalidades.length;
  return `<div class="licencias licencias--${n}" data-aparecer-grupo>
      ${licencias.modalidades.map(m => `<article class="tarjeta licencia" data-aparecer>
        <${titulo} class="licencia__nombre">${esc(m.nombre)}</${titulo}>
        <p class="licencia__para">${esc(m.para)}</p>
        <p class="licencia__precio">${m.precio ? `<span class="licencia__valor">${esc(m.precio)}</span> <span class="licencia__periodo">${esc(m.periodo)}</span>` : `<span class="licencia__valor licencia__valor--cotizar">Cotización</span> <span class="licencia__periodo">${esc(m.periodo)}</span>`}</p>
        <ul class="tarjeta__lista">${m.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <a class="boton boton--oscuro licencia__boton" href="/contacto/?solucion=${slug}&amp;plan=${encodeURIComponent(m.nombre)}">${m.precio ? 'Solicitar licencia' : 'Solicitar cotización'}<span class="sr">: ${esc(m.nombre)}</span></a>
      </article>`).join('\n      ')}
    </div>`;
}

export const NOTA_PRECIOS = 'Precios en pesos colombianos (COP). Los impuestos aplicables se calculan al momento del pago. Todas las licencias incluyen actualizaciones y soporte técnico durante su vigencia, y puede solicitar el reembolso total dentro de los 14 días siguientes al pago.';

export function ctaFinal({ ceja = 'Demostración', titulo = 'Vea nuestros productos <em>en funcionamiento</em>', texto = 'Solicite una demostración del producto que le interesa o una cotización para su institución.' } = {}) {
  return `<section class="seccion seccion--oscura" aria-labelledby="titulo-cta">
  <div class="contenedor cta-final">
    <div data-aparecer>
      <p class="ceja">${ceja}</p>
      <h2 class="titulo-2" id="titulo-cta">${titulo}</h2>
      <p class="entrada" style="margin-top:1.2rem">${texto}</p>
      <div class="cta-final__alternativas">
        <a class="enlace-flecha" href="/precios/">Ver precios y planes ${icono('flecha')}</a>
        <a class="enlace-flecha" href="/productos/">Ver todos los productos ${icono('flecha')}</a>
      </div>
    </div>
    <div class="cta-final__panel oscuro" data-aparecer>
      ${formularioCorto('fc')}
    </div>
  </div>
</section>`;
}
