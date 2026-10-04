/*
 * Configuración central del sitio de Grupo Logic.
 * Cambie aquí los datos de contacto: el sitio los toma de este archivo.
 * Regla: mientras un valor siga en "[PENDIENTE]" o vacío, el elemento que lo usa
 * permanece oculto en la página publicada (nunca se muestra el marcador).
 */
window.GL_CONFIG = {
  empresa: "Grupo Logic",
  dominio: "https://www.grupologiclatam.com",
  email: "gestion@grupologiclatam.com",
  telefono: "",                    // vacío a propósito: el propietario no quiere publicar teléfono
  whatsapp: "",                    // vacío: muestra un número de teléfono (no publicar por ahora)
  direccion: "[PENDIENTE]",
  ciudad: "",                      // opcional: ciudad de la oficina; vacío = no se muestra
  redes: { linkedin: "", instagram: "", youtube: "" },
  formEndpoint: "[PENDIENTE]",     // Formspree, Web3Forms o endpoint propio (URL completa)
  formExtra: {},                   // campos fijos que exija el servicio, ej. { access_key: "..." } en Web3Forms
  analyticsId: "",                 // GA4 (G-XXXXXXX), opcional. Si se define, aparece el aviso de cookies.

  // Datos del responsable del tratamiento (política de privacidad, Ley 1581 de 2012)
  legal: {
    razonSocial: "Grupo Logic SAS Latinoamerica", // razón social registrada
    nit: "[PENDIENTE]",
    emailDatos: "gestion@grupologiclatam.com" // consultas y reclamos sobre datos personales
  }
};
