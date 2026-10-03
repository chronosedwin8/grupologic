/*
 * Grupo Logic — form.js
 * Validación, envío y alternativa por WhatsApp de los formularios de demostración.
 * Envía JSON a GL_CONFIG.formEndpoint (Formspree, Web3Forms o endpoint propio).
 */
(function () {
  "use strict";

  var config = window.GL_CONFIG || {};
  var util = config._util || {
    valido: function (v) { return typeof v === "string" && v.trim() !== "" && v.indexOf("PENDIENTE") === -1; },
    enlaceWhatsApp: function (m) { return "https://wa.me/" + String(config.whatsapp || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(m); }
  };
  var CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var ICONO_CARGA = '<svg class="icono girar" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.2-8.56"/></svg>';

  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function escapar(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }

  // Alternativas de contacto disponibles según config.js
  function alternativas() {
    var partes = [];
    if (util.valido(config.whatsapp)) partes.push('<a href="' + util.enlaceWhatsApp("Hola, quisiera solicitar una demostración.") + '" target="_blank" rel="noopener">WhatsApp</a>');
    if (util.valido(config.email)) partes.push('<a href="mailto:' + escapar(config.email) + '">' + escapar(config.email) + "</a>");
    return partes.length ? " También puede escribirnos por " + partes.join(" o ") + "." : "";
  }

  $$("form[data-formulario]").forEach(function (form) {
    var estado = form.querySelector(".formulario__estado");
    var enviar = form.querySelector('[type="submit"]');
    var textoEnviar = enviar ? enviar.innerHTML : "";

    // Preselección desde la URL: /contacto/?solucion=unticloud
    var parametro = new URLSearchParams(window.location.search).get("solucion");
    if (parametro) {
      $$('input[name="soluciones"]', form).forEach(function (c) { if (c.value === parametro) c.checked = true; });
    }

    function mostrarEstado(tipo, html) {
      estado.className = "formulario__estado formulario__estado--" + tipo;
      estado.innerHTML = html;
    }

    function marcar(campo, mensaje) {
      var contenedor = campo.closest(".campo") || campo.closest(".casilla");
      var error = document.getElementById(campo.getAttribute("data-error-id"));
      campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
      if (contenedor) contenedor.classList.toggle("campo--error", !!mensaje);
      if (error) { error.textContent = mensaje || ""; error.hidden = !mensaje; }
    }

    function validarCampo(campo) {
      var valor = campo.type === "checkbox" ? campo.checked : campo.value.trim();
      var mensaje = "";
      if (campo.required && !valor) mensaje = campo.getAttribute("data-mensaje") || "Este campo es obligatorio.";
      else if (campo.type === "email" && valor && !CORREO.test(valor)) mensaje = "Escriba un correo válido, por ejemplo nombre@colegio.edu.co.";
      else if (campo.type === "tel" && valor && valor.replace(/\D/g, "").length < 7) mensaje = "Escriba un número de teléfono válido, con indicativo si es posible.";
      marcar(campo, mensaje);
      return !mensaje;
    }

    var campos = $$("input[data-error-id], select[data-error-id], textarea[data-error-id]", form);
    campos.forEach(function (campo) {
      // Validar al salir del campo y corregir en vivo una vez marcado el error
      campo.addEventListener("blur", function () { if (campo.value || campo.getAttribute("aria-invalid") === "true") validarCampo(campo); });
      campo.addEventListener("input", function () { if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo); });
      campo.addEventListener("change", function () { if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo); });
    });

    function datos() {
      var fd = new FormData(form);
      var obj = {};
      fd.forEach(function (valor, clave) {
        if (clave === "sitio_web") return; // campo trampa
        obj[clave] = obj[clave] ? obj[clave] + ", " + valor : valor;
      });
      obj._origen = form.getAttribute("data-origen") || "sitio";
      obj._pagina = window.location.href;
      obj._subject = "Solicitud de demostración — " + (obj.institucion || "Grupo Logic");
      var extra = config.formExtra || {};
      Object.keys(extra).forEach(function (k) { obj[k] = extra[k]; });
      return obj;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var invalidos = campos.filter(function (c) { return !validarCampo(c); });
      if (invalidos.length) {
        mostrarEstado("error", invalidos.length === 1 ? "Revise el campo marcado para continuar." : "Revise los " + invalidos.length + " campos marcados para continuar.");
        invalidos[0].focus();
        return;
      }
      // Antispam: si el campo trampa tiene contenido, se simula el éxito sin enviar.
      var trampa = form.querySelector('[name="sitio_web"]');
      if (trampa && trampa.value) { mostrarEstado("exito", "Gracias. Hemos recibido su solicitud."); form.reset(); return; }

      if (!util.valido(config.formEndpoint)) {
        mostrarEstado("error", "El envío en línea no está disponible en este momento." + (alternativas() || " Por favor, inténtelo más tarde."));
        return;
      }

      enviar.setAttribute("aria-busy", "true");
      enviar.disabled = true;
      enviar.innerHTML = ICONO_CARGA + " Enviando…";
      mostrarEstado("cargando", "Enviando su solicitud…");

      fetch(config.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(datos())
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        mostrarEstado("exito", "<strong>Gracias. Hemos recibido su solicitud.</strong> Un asesor de Grupo Logic se pondrá en contacto con usted para coordinar la demostración.");
        form.reset();
        campos.forEach(function (c) { marcar(c, ""); });
      }).catch(function () {
        mostrarEstado("error", "No pudimos enviar su solicitud. Verifique su conexión e inténtelo de nuevo." + alternativas());
      }).then(function () {
        enviar.removeAttribute("aria-busy");
        enviar.disabled = false;
        enviar.innerHTML = textoEnviar;
      });
    });

    // Alternativa: abrir WhatsApp con un mensaje armado con lo que la persona ya escribió.
    var botonWa = form.querySelector("[data-whatsapp-formulario]");
    if (botonWa && util.valido(config.whatsapp)) {
      botonWa.hidden = false;
      botonWa.addEventListener("click", function () {
        var d = datos();
        var partes = ["Hola, quisiera solicitar una demostración."];
        if (d.nombre) partes.push("Mi nombre es " + d.nombre + (d.cargo ? " (" + d.cargo + ")" : "") + (d.institucion ? ", de " + d.institucion : "") + ".");
        var elegidas = $$('input[name="soluciones"]:checked', form).map(function (c) { return c.getAttribute("data-nombre"); });
        if (elegidas.length) partes.push("Me interesa: " + elegidas.join(", ") + ".");
        window.open(util.enlaceWhatsApp(partes.join(" ")), "_blank", "noopener");
      });
    }
  });
})();
