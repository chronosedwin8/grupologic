// Formularios de solicitud de demostración (corto y completo).
import { SOLUCIONES, esc, icono } from './plantilla.mjs';

export const CARGOS = ['Rector/a', 'Director/a administrativo', 'Coordinador/a TIC', 'Coordinador/a académico', 'Docente', 'Otro'];
export const PAISES = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'Otro país'];
export const ESTUDIANTES = ['Menos de 300', 'Entre 300 y 800', 'Entre 800 y 1.500', 'Entre 1.500 y 3.000', 'Más de 3.000'];

// Campo genérico con etiqueta, ayuda y mensaje de error asociados.
function campo({ id, nombre, etiqueta, tipo = 'text', requerido = true, autocompletar, mensaje, ayuda, opciones, filas, ancho }) {
  const err = `${id}-error`;
  const ayudaId = ayuda ? `${id}-ayuda` : '';
  const describe = [ayudaId, err].filter(Boolean).join(' ');
  const comunes = `id="${id}" name="${nombre}" class="campo__control" data-error-id="${err}" aria-describedby="${describe}"${requerido ? ` required data-mensaje="${esc(mensaje)}"` : ''}${autocompletar ? ` autocomplete="${autocompletar}"` : ''}`;
  let control;
  if (opciones) {
    control = `<select ${comunes}><option value="">Seleccione una opción</option>${opciones.map(o => `<option>${esc(o)}</option>`).join('')}</select>`;
  } else if (tipo === 'textarea') {
    control = `<textarea ${comunes} rows="${filas || 5}"></textarea>`;
  } else {
    control = `<input type="${tipo}" ${comunes}${tipo === 'email' ? ' inputmode="email" spellcheck="false"' : ''}${tipo === 'tel' ? ' inputmode="tel"' : ''}>`;
  }
  return `<div class="campo"${ancho ? ` style="grid-column:${ancho}"` : ''}>
  <label class="campo__etiqueta" for="${id}">${esc(etiqueta)}${requerido ? '' : ' <span class="opcional">(opcional)</span>'}</label>
  ${control}
  ${ayuda ? `<p class="campo__ayuda" id="${ayudaId}">${esc(ayuda)}</p>` : ''}
  <p class="campo__error" id="${err}" hidden></p>
</div>`;
}

const consentimiento = (id) => `<div>
  <label class="casilla casilla--simple">
    <input type="checkbox" id="${id}" name="acepta_politica" value="si" required data-error-id="${id}-error" aria-describedby="${id}-error" data-mensaje="Para enviar la solicitud debe aceptar la política de tratamiento de datos.">
    <span>He leído y acepto la <a href="/privacidad/" target="_blank" rel="noopener">política de tratamiento de datos personales</a> de Grupo Logic.</span>
  </label>
  <p class="campo__error" id="${id}-error" hidden></p>
</div>`;

const trampa = (id) => `<div class="trampa" aria-hidden="true"><label for="${id}">No complete este campo</label><input type="text" id="${id}" name="sitio_web" tabindex="-1" autocomplete="off"></div>`;

export function formularioCorto(prefijo = 'fc') {
  return `<form class="formulario" data-formulario data-origen="inicio" novalidate aria-label="Solicitud de demostración">
  <div class="formulario__fila formulario__fila--2">
    ${campo({ id: `${prefijo}-nombre`, nombre: 'nombre', etiqueta: 'Nombre y apellido', autocompletar: 'name', mensaje: 'Escriba su nombre y apellido.' })}
    ${campo({ id: `${prefijo}-cargo`, nombre: 'cargo', etiqueta: 'Cargo', opciones: CARGOS, mensaje: 'Seleccione su cargo.' })}
  </div>
  <div class="formulario__fila formulario__fila--2">
    ${campo({ id: `${prefijo}-institucion`, nombre: 'institucion', etiqueta: 'Institución', autocompletar: 'organization', mensaje: 'Escriba el nombre de su institución.' })}
    ${campo({ id: `${prefijo}-pais`, nombre: 'pais', etiqueta: 'País', opciones: PAISES, mensaje: 'Seleccione su país.' })}
  </div>
  ${campo({ id: `${prefijo}-correo`, nombre: 'correo', etiqueta: 'Correo institucional', tipo: 'email', autocompletar: 'email', mensaje: 'Escriba su correo institucional.' })}
  ${trampa(`${prefijo}-web`)}
  ${consentimiento(`${prefijo}-acepta`)}
  <div class="formulario__estado" role="status" aria-live="polite"></div>
  <div class="formulario__pie">
    <button class="boton boton--primario" type="submit">Solicitar demostración ${icono('flecha')}</button>
    <a class="enlace-flecha" href="/contacto/">Formulario completo ${icono('flecha')}</a>
  </div>
</form>`;
}

export function formularioCompleto() {
  const p = 'ct';
  return `<form class="formulario" data-formulario data-origen="contacto" novalidate aria-labelledby="titulo-formulario">
  <div class="formulario__fila formulario__fila--2">
    ${campo({ id: `${p}-nombre`, nombre: 'nombre', etiqueta: 'Nombre y apellido', autocompletar: 'name', mensaje: 'Escriba su nombre y apellido.' })}
    ${campo({ id: `${p}-cargo`, nombre: 'cargo', etiqueta: 'Cargo', opciones: CARGOS, mensaje: 'Seleccione su cargo.' })}
  </div>
  ${campo({ id: `${p}-institucion`, nombre: 'institucion', etiqueta: 'Institución', autocompletar: 'organization', mensaje: 'Escriba el nombre de su institución.' })}
  <div class="formulario__fila formulario__fila--2">
    ${campo({ id: `${p}-pais`, nombre: 'pais', etiqueta: 'País', opciones: PAISES, mensaje: 'Seleccione su país.' })}
    ${campo({ id: `${p}-ciudad`, nombre: 'ciudad', etiqueta: 'Ciudad', autocompletar: 'address-level2', mensaje: 'Escriba la ciudad de su institución.' })}
  </div>
  <div class="formulario__fila formulario__fila--2">
    ${campo({ id: `${p}-correo`, nombre: 'correo', etiqueta: 'Correo institucional', tipo: 'email', autocompletar: 'email', mensaje: 'Escriba su correo institucional.' })}
    ${campo({ id: `${p}-telefono`, nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', autocompletar: 'tel', mensaje: 'Escriba un teléfono de contacto.', ayuda: 'Con indicativo de país, por ejemplo +57.' })}
  </div>
  <fieldset class="grupo-opciones">
    <legend class="campo__etiqueta">Soluciones de interés <span class="opcional">(puede elegir varias)</span></legend>
    <div class="opciones">${SOLUCIONES.map(s => `
      <label class="casilla"><input type="checkbox" id="${p}-sol-${s.slug}" name="soluciones" value="${s.slug}" data-nombre="${esc(s.nombre)}"><span>${esc(s.nombre)}</span></label>`).join('')}
      <label class="casilla"><input type="checkbox" id="${p}-sol-asesoria" name="soluciones" value="asesoria" data-nombre="Asesoría general"><span>Aún no lo sé: quiero asesoría</span></label>
    </div>
  </fieldset>
  ${campo({ id: `${p}-estudiantes`, nombre: 'estudiantes', etiqueta: 'Número aproximado de estudiantes', opciones: ESTUDIANTES, requerido: false })}
  ${campo({ id: `${p}-mensaje`, nombre: 'mensaje', etiqueta: 'Mensaje', tipo: 'textarea', requerido: false, ayuda: 'Cuéntenos qué necesita su institución o qué le gustaría ver en la demostración.' })}
  ${trampa(`${p}-web`)}
  ${consentimiento(`${p}-acepta`)}
  <div class="formulario__estado" role="status" aria-live="polite"></div>
  <div class="formulario__pie">
    <button class="boton boton--primario" type="submit">Solicitar demostración ${icono('flecha')}</button>
    <button class="boton boton--secundario" type="button" data-whatsapp-formulario hidden>${icono('whatsapp')} Enviar por WhatsApp</button>
  </div>
  <p class="formulario__aviso">Los campos sin la marca «opcional» son obligatorios. Usaremos sus datos solo para responder esta solicitud.</p>
</form>`;
}
