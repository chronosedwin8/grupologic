// Página 404 personalizada (no indexable).
import { SOLUCIONES, categoria, esc, icono, logotipo } from '../lib/plantilla.mjs';

export default function error404() {
  const cuerpo = `
<section class="hero error-404" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <p class="error-404__codigo" aria-hidden="true">404</p>
    <p class="ceja" style="margin-top:1.6rem">Página no encontrada</p>
    <h1 class="titulo-2" id="titulo-principal">La página que busca <em>no está disponible</em></h1>
    <p class="hero__texto">Es posible que la dirección haya cambiado o que el enlace esté incompleto. Estas son algunas rutas útiles:</p>
    <div class="botones">
      <a class="boton boton--primario" href="/">Ir al inicio ${icono('flecha')}</a>
      <a class="boton boton--secundario" href="/contacto/">Solicitar demostración</a>
    </div>
    <ul class="lista-soluciones">${SOLUCIONES.map(s => `<li><a href="/soluciones/${s.slug}/">${logotipo(s.slug)}<small>${esc(categoria(s.categoria).corto)}</small></a></li>`).join('')}</ul>
  </div>
</section>`;
  return {
    ruta: '/404.html',
    titulo: 'Página no encontrada · Grupo Logic',
    descripcion: 'La página que busca no está disponible. Visite el inicio de Grupo Logic o conozca nuestro portafolio de soluciones tecnológicas para colegios.',
    og: 'inicio',
    cuerpo,
    indexar: false,
  };
}
