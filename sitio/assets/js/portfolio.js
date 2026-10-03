/*
 * Grupo Logic — portfolio.js
 * Filtro del portafolio por línea, con transición suave y anuncio accesible del resultado.
 * Las tarjetas ya vienen en el HTML (generadas desde assets/data/soluciones.json).
 */
(function () {
  "use strict";

  var botones = Array.prototype.slice.call(document.querySelectorAll("[data-filtro]"));
  var tarjetas = Array.prototype.slice.call(document.querySelectorAll("[data-categoria]"));
  var anuncio = document.getElementById("resultado-filtro");
  if (!botones.length || !tarjetas.length) return;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DURACION = reducido ? 0 : 320;

  function aplicar(filtro, actualizarUrl) {
    botones.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filtro") === filtro)); });
    var mostrar = tarjetas.filter(function (t) { return filtro === "todas" || t.getAttribute("data-categoria") === filtro; });

    // 1) desvanecer las que salen, 2) ocultarlas, 3) mostrar las que entran
    tarjetas.forEach(function (t) { if (mostrar.indexOf(t) === -1 && !t.hidden) t.classList.add("saliendo"); });
    window.setTimeout(function () {
      tarjetas.forEach(function (t) {
        var visible = mostrar.indexOf(t) !== -1;
        var estabaOculta = t.hidden;
        t.classList.remove("saliendo");
        t.hidden = !visible;
        if (visible && estabaOculta && !reducido) { t.classList.remove("entrando"); void t.offsetWidth; t.classList.add("entrando"); }
      });
    }, DURACION);

    var boton = botones.filter(function (b) { return b.getAttribute("data-filtro") === filtro; })[0];
    var nombre = boton ? boton.getAttribute("data-nombre") : "";
    if (anuncio) anuncio.textContent = mostrar.length + (mostrar.length === 1 ? " solución" : " soluciones") + (filtro === "todas" ? " en el portafolio." : " en " + nombre + ".");
    if (actualizarUrl && window.history.replaceState) {
      window.history.replaceState(null, "", filtro === "todas" ? window.location.pathname : "#" + filtro);
    }
  }

  botones.forEach(function (b) {
    b.addEventListener("click", function () { aplicar(b.getAttribute("data-filtro"), true); });
  });

  // Permite enlazar directamente a una línea: /soluciones/#ia
  var inicial = window.location.hash.replace("#", "");
  if (inicial && botones.some(function (b) { return b.getAttribute("data-filtro") === inicial; })) {
    DURACION = 0;
    aplicar(inicial, false);
    DURACION = reducido ? 0 : 320;
  }
})();
