/*
 * Grupo Logic — main.js
 * Comportamiento común a todas las páginas. Sin dependencias.
 */
(function () {
  "use strict";

  var config = window.GL_CONFIG || {};
  var raiz = document.documentElement;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Utilidades ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // Lee una ruta tipo "redes.linkedin" dentro de la configuración.
  function leer(ruta) {
    return ruta.split(".").reduce(function (obj, k) { return obj && obj[k] !== undefined ? obj[k] : ""; }, config);
  }
  // Un dato es utilizable si existe y no conserva el marcador [PENDIENTE].
  function valido(valor) {
    return typeof valor === "string" && valor.trim() !== "" && valor.indexOf("PENDIENTE") === -1;
  }
  function enlaceWhatsApp(mensaje) {
    var numero = String(config.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + numero + (mensaje ? "?text=" + encodeURIComponent(mensaje) : "");
  }
  // Expuesto para form.js sin crear variables globales nuevas.
  config._util = { valido: valido, leer: leer, enlaceWhatsApp: enlaceWhatsApp };

  /* ---------- Datos de contacto desde config.js ---------- */
  // <x data-gl="email" hidden>…<a data-gl-enlace><span data-gl-texto></span></a></x>
  // Si el dato falta, el elemento permanece oculto. Con data-gl-modo="texto" solo se
  // reemplaza el texto cuando el dato existe (se conserva el texto por defecto).
  $$("[data-gl]").forEach(function (el) {
    var clave = el.getAttribute("data-gl");
    var valor = leer(clave);
    var modo = el.getAttribute("data-gl-modo");
    if (!valido(valor)) { if (modo !== "texto") el.hidden = true; return; }
    if (modo === "texto") { el.textContent = valor; return; }
    var enlace = el.matches("a") ? el : $("[data-gl-enlace]", el);
    var texto = $("[data-gl-texto]", el);
    if (texto) texto.textContent = valor;
    if (enlace) {
      if (/email|emailDatos/i.test(clave)) enlace.href = "mailto:" + valor;
      else if (clave === "telefono") enlace.href = "tel:" + valor.replace(/[^\d+]/g, "");
      else if (clave === "whatsapp") enlace.href = enlaceWhatsApp(el.getAttribute("data-gl-mensaje") || "");
      else if (clave.indexOf("redes.") === 0) enlace.href = valor;
    }
    el.hidden = false;
  });

  /* ---------- Encabezado: transparente → sólido ---------- */
  var encabezado = $(".encabezado");
  var botonArriba = $(".flotante--arriba");
  var pendiente = false;
  function alDesplazar() {
    var y = window.scrollY || window.pageYOffset;
    if (encabezado) encabezado.classList.toggle("encabezado--solido", y > 24 || raiz.classList.contains("menu-abierto"));
    if (botonArriba) botonArriba.classList.toggle("visible", y > 700);
    pendiente = false;
  }
  window.addEventListener("scroll", function () {
    if (!pendiente) { pendiente = true; window.requestAnimationFrame(alDesplazar); }
  }, { passive: true });
  alDesplazar();
  if (botonArriba) botonArriba.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reducido.matches ? "auto" : "smooth" });
    var destino = $("#contenido");
    if (destino) destino.focus({ preventScroll: true });
  });

  /* ---------- Menú desplegable de soluciones ---------- */
  $$("[data-desplegable]").forEach(function (boton) {
    var panel = document.getElementById(boton.getAttribute("aria-controls"));
    if (!panel) return;
    function cerrar(devolverFoco) {
      boton.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      if (devolverFoco) boton.focus();
    }
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      panel.hidden = abierto;
      if (encabezado) encabezado.classList.add("encabezado--solido");
      if (abierto) alDesplazar();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && boton.getAttribute("aria-expanded") === "true") cerrar(true);
    });
    document.addEventListener("click", function (e) {
      if (boton.getAttribute("aria-expanded") === "true" && !panel.contains(e.target) && !boton.contains(e.target)) { cerrar(false); alDesplazar(); }
    });
    panel.addEventListener("focusout", function (e) {
      if (e.relatedTarget && !panel.contains(e.relatedTarget) && e.relatedTarget !== boton) { cerrar(false); alDesplazar(); }
    });
  });

  /* ---------- Menú móvil a pantalla completa ---------- */
  var menu = $("#menu-movil");
  var abrirMenu = $("[data-abrir-menu]");
  if (menu && abrirMenu) {
    var cerrarMenu = $("[data-cerrar-menu]", menu);
    var principal = $("main");
    var pie = $(".pie");
    var abrir = function () {
      menu.hidden = false;
      abrirMenu.setAttribute("aria-expanded", "true");
      raiz.classList.add("menu-abierto", "sin-scroll");
      [principal, pie, encabezado].forEach(function (n) { if (n) n.setAttribute("inert", ""); });
      cerrarMenu.focus();
    };
    var cerrar = function () {
      menu.hidden = true;
      abrirMenu.setAttribute("aria-expanded", "false");
      raiz.classList.remove("menu-abierto", "sin-scroll");
      [principal, pie, encabezado].forEach(function (n) { if (n) n.removeAttribute("inert"); });
      abrirMenu.focus();
    };
    abrirMenu.addEventListener("click", abrir);
    cerrarMenu.addEventListener("click", cerrar);
    menu.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { cerrar(); return; }
      if (e.key !== "Tab") return;
      // Mantener el foco dentro del menú
      var focos = $$("a[href], button:not([disabled])", menu);
      var primero = focos[0], ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { if (!menu.hidden) cerrar(); }); });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (m) { if (m.matches && !menu.hidden) cerrar(); });
  }

  /* ---------- Aparición al entrar en pantalla ---------- */
  var aparecer = $$("[data-aparecer]");
  // Escalonado: cada elemento toma su posición dentro de su grupo.
  $$("[data-aparecer-grupo]").forEach(function (grupo) {
    $$("[data-aparecer]", grupo).forEach(function (el, i) { el.style.setProperty("--orden", i); });
  });
  if ("IntersectionObserver" in window && !reducido.matches) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); observador.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    aparecer.forEach(function (el) { observador.observe(el); });
  } else {
    aparecer.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Pestañas accesibles (patrón WAI-ARIA, activación automática) ---------- */
  $$("[data-pestanas]").forEach(function (grupo) {
    var pestanas = $$('[role="tab"]', grupo);
    function activar(pestana, foco) {
      pestanas.forEach(function (p) {
        var activa = p === pestana;
        p.setAttribute("aria-selected", String(activa));
        p.tabIndex = activa ? 0 : -1;
        var panel = document.getElementById(p.getAttribute("aria-controls"));
        if (panel) {
          panel.hidden = !activa;
          if (activa && !reducido.matches) { panel.classList.remove("entrando"); void panel.offsetWidth; panel.classList.add("entrando"); }
        }
      });
      if (foco) pestana.focus();
      if (pestana.scrollIntoView && pestana.parentElement.scrollWidth > pestana.parentElement.clientWidth) {
        pestana.parentElement.scrollTo({ left: pestana.offsetLeft - 24, behavior: reducido.matches ? "auto" : "smooth" });
      }
    }
    pestanas.forEach(function (p, i) {
      p.addEventListener("click", function () { activar(p, false); });
      p.addEventListener("keydown", function (e) {
        var destino = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") destino = pestanas[(i + 1) % pestanas.length];
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") destino = pestanas[(i - 1 + pestanas.length) % pestanas.length];
        else if (e.key === "Home") destino = pestanas[0];
        else if (e.key === "End") destino = pestanas[pestanas.length - 1];
        if (destino) { e.preventDefault(); activar(destino, true); }
      });
    });
  });

  /* ---------- Acordeón ---------- */
  $$("[data-acordeon] .acordeon__boton").forEach(function (boton) {
    var panel = document.getElementById(boton.getAttribute("aria-controls"));
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      if (panel) panel.classList.toggle("abierto", !abierto);
    });
  });

  /* ---------- Contadores (solo cifras verificables) ---------- */
  var contadores = $$("[data-contador]");
  function formatear(n) { return n.toLocaleString("es-CO"); }
  function animarContador(el) {
    var final = parseFloat(el.getAttribute("data-contador"));
    var prefijo = el.getAttribute("data-prefijo") || "";
    var sufijo = el.getAttribute("data-sufijo") || "";
    if (reducido.matches) { el.textContent = prefijo + formatear(final) + sufijo; return; }
    var inicio = null, duracion = 1600;
    function paso(t) {
      if (!inicio) inicio = t;
      var avance = Math.min((t - inicio) / duracion, 1);
      var suave = 1 - Math.pow(1 - avance, 3);
      el.textContent = prefijo + formatear(Math.round(final * suave)) + sufijo;
      if (avance < 1) window.requestAnimationFrame(paso);
    }
    window.requestAnimationFrame(paso);
  }
  if (contadores.length && "IntersectionObserver" in window) {
    var obsContador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { animarContador(e.target); obsContador.unobserve(e.target); } });
    }, { threshold: 0.6 });
    contadores.forEach(function (c) { obsContador.observe(c); });
  }

  /* ---------- Botón flotante de WhatsApp ---------- */
  var flotanteWa = $(".flotante--whatsapp");
  if (flotanteWa && valido(config.whatsapp)) {
    flotanteWa.href = enlaceWhatsApp(flotanteWa.getAttribute("data-mensaje") || "Hola, quisiera información sobre las soluciones de Grupo Logic.");
    flotanteWa.hidden = false;
  }

  /* ---------- Mapa: arcos animados al entrar en pantalla ---------- */
  var mapa = $(".mapa");
  if (mapa) {
    $$(".mapa__arco", mapa).forEach(function (arco) {
      var largo = Math.ceil(arco.getTotalLength ? arco.getTotalLength() : 1000);
      arco.style.setProperty("--largo", largo);
    });
    if ("IntersectionObserver" in window && !reducido.matches) {
      var obsMapa = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { mapa.classList.add("animado"); obsMapa.disconnect(); }
      }, { threshold: 0.35 });
      obsMapa.observe(mapa);
    } else {
      mapa.classList.add("animado");
    }
  }

  /* ---------- Hero: constelación de puntos en <canvas> ---------- */
  var lienzo = $(".hero__lienzo");
  if (lienzo && lienzo.getContext) iniciarConstelacion(lienzo);

  function iniciarConstelacion(canvas) {
    var ctx = canvas.getContext("2d");
    var puntos = [], ancho = 0, alto = 0, dpr = 1, activo = true, cuadro = null;
    var DIST = 150;
    function medir() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = r.width; alto = r.height;
      canvas.width = Math.round(ancho * dpr); canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var cantidad = Math.max(28, Math.min(90, Math.round(ancho * alto / 15000)));
      puntos = [];
      for (var i = 0; i < cantidad; i++) {
        puntos.push({
          x: Math.random() * ancho, y: Math.random() * alto,
          vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
          r: Math.random() < 0.12 ? 1.9 : 1.1,
          oro: Math.random() < 0.18
        });
      }
    }
    function dibujar() {
      ctx.clearRect(0, 0, ancho, alto);
      for (var i = 0; i < puntos.length; i++) {
        var a = puntos[i];
        for (var j = i + 1; j < puntos.length; j++) {
          var b = puntos[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < DIST * DIST) {
            var alfa = (1 - Math.sqrt(d2) / DIST) * 0.34;
            ctx.strokeStyle = (a.oro || b.oro) ? "rgba(200,164,92," + alfa + ")" : "rgba(120,150,190," + alfa * 0.8 + ")";
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (var k = 0; k < puntos.length; k++) {
        var p = puntos[k];
        ctx.fillStyle = p.oro ? "rgba(227,205,154,.85)" : "rgba(160,182,210,.6)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    function mover() {
      for (var i = 0; i < puntos.length; i++) {
        var p = puntos[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = ancho + 20; else if (p.x > ancho + 20) p.x = -20;
        if (p.y < -20) p.y = alto + 20; else if (p.y > alto + 20) p.y = -20;
      }
    }
    function ciclo() {
      if (!activo) { cuadro = null; return; }
      mover(); dibujar();
      cuadro = window.requestAnimationFrame(ciclo);
    }
    function reanudar() { if (!cuadro && activo && !reducido.matches) cuadro = window.requestAnimationFrame(ciclo); }
    // El primer cuadro (estático) se dibuja cuando el navegador queda libre, para no
    // competir con la carga. El movimiento empieza con la primera interacción.
    var enReposo = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };
    var iniciado = false;
    activo = false;
    enReposo(function () { medir(); dibujar(); });
    if (reducido.matches) return; // con movimiento reducido queda un cuadro estático
    var temporizador;
    window.addEventListener("resize", function () {
      clearTimeout(temporizador);
      temporizador = setTimeout(function () { medir(); dibujar(); }, 200);
    });
    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; activo = iniciado && visible && !document.hidden; reanudar(); }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () { activo = iniciado && visible && !document.hidden; reanudar(); });
    var eventos = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown"];
    var iniciar = function () {
      if (iniciado) return;
      iniciado = true;
      eventos.forEach(function (ev) { window.removeEventListener(ev, iniciar); });
      activo = visible && !document.hidden;
      if (!puntos.length) medir();
      reanudar();
    };
    eventos.forEach(function (ev) { window.addEventListener(ev, iniciar, { passive: true }); });
  }

  /* ---------- Analítica opcional y aviso de cookies ---------- */
  var idAnalitica = config.analyticsId;
  if (valido(idAnalitica)) {
    var CLAVE = "gl-cookies";
    var decision = null;
    try { decision = localStorage.getItem(CLAVE); } catch (e) { decision = null; }
    var cargarAnalitica = function () {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(idAnalitica);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      var gtag = function () { window.dataLayer.push(arguments); };
      gtag("js", new Date());
      gtag("config", idAnalitica, { anonymize_ip: true });
    };
    if (decision === "aceptado") cargarAnalitica();
    else if (decision !== "rechazado") {
      var aviso = document.createElement("div");
      aviso.className = "aviso-cookies";
      aviso.setAttribute("role", "region");
      aviso.setAttribute("aria-label", "Aviso de cookies");
      aviso.innerHTML = '<p>Usamos cookies de analítica para entender cómo se usa este sitio y mejorarlo. Puede aceptarlas o rechazarlas. Más información en la <a href="/privacidad/">política de tratamiento de datos</a>.</p>' +
        '<div class="botones"><button type="button" class="boton boton--primario" data-cookies="aceptado">Aceptar</button><button type="button" class="boton boton--secundario" data-cookies="rechazado">Rechazar</button></div>';
      document.body.appendChild(aviso);
      $$("[data-cookies]", aviso).forEach(function (b) {
        b.addEventListener("click", function () {
          var valor = b.getAttribute("data-cookies");
          try { localStorage.setItem(CLAVE, valor); } catch (e) { /* almacenamiento no disponible */ }
          if (valor === "aceptado") cargarAnalitica();
          aviso.remove();
        });
      });
    }
  }
})();
