/*
 * Configuración central del sitio de Grupo Logic.
 * Cambie aquí los datos de contacto: el sitio los toma de este archivo.
 * Regla: mientras un valor siga en "[PENDIENTE]" o vacío, el elemento que lo usa
 * permanece oculto en la página publicada (nunca se muestra el marcador).
 */
window.GL_CONFIG = {
  empresa: "Grupo Logic",
  dominio: "https://grupologiclatam.com",
  email: "[PENDIENTE]",            // ej. contacto@grupologiclatam.com
  telefono: "[PENDIENTE]",         // ej. +57 605 000 0000 (tal como debe mostrarse)
  whatsapp: "[PENDIENTE]",         // formato internacional sin "+", ej. 573001234567
  direccion: "[PENDIENTE]",
  ciudad: "Barranquilla, Colombia",
  redes: { linkedin: "", instagram: "", youtube: "" },
  formEndpoint: "[PENDIENTE]",     // Formspree, Web3Forms o endpoint propio (URL completa)
  formExtra: {},                   // campos fijos que exija el servicio, ej. { access_key: "..." } en Web3Forms
  analyticsId: "",                 // GA4 (G-XXXXXXX), opcional. Si se define, aparece el aviso de cookies.

  // Datos del responsable del tratamiento (política de privacidad, Ley 1581 de 2012)
  legal: {
    razonSocial: "[PENDIENTE]",    // razón social registrada
    nit: "[PENDIENTE]",
    emailDatos: "[PENDIENTE]"      // correo para consultas y reclamos sobre datos personales
  }
};
