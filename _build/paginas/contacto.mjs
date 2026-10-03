// Contacto: formulario completo de solicitud de demostración.
import { icono, migasLd, organizacionLd, DOMINIO } from '../lib/plantilla.mjs';
import { formularioCompleto } from '../lib/formularios.mjs';

export default function contacto() {
  const cuerpo = `
<section class="hero hero--pagina" aria-labelledby="titulo-principal">
  <div class="contenedor">
    <nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Contacto</span></li></ol></nav>
    <div class="hero__contenido">
      <p class="ceja">Contacto</p>
      <h1 class="titulo-1" id="titulo-principal">Solicite una demostración <em>para su institución</em></h1>
      <p class="hero__texto">Cuéntenos sobre su colegio y las soluciones que le interesan. Un asesor de Grupo Logic coordinará con usted una demostración y le enviará una propuesta formal.</p>
    </div>
  </div>
</section>

<section class="seccion seccion--clara" aria-label="Formulario de contacto">
  <div class="contenedor contacto">
    <div class="contacto__formulario claro">
      <h2 class="titulo-3" id="titulo-formulario" style="margin-bottom:1.6rem">Datos de su solicitud</h2>
      ${formularioCompleto()}
    </div>
    <aside class="contacto__lateral" aria-label="Información adicional">
      <div class="tarjeta">
        <h2 class="tarjeta__titulo">Qué sigue</h2>
        <ol class="pasos-mini">
          <li><span><strong>Revisamos su solicitud</strong>y preparamos la conversación según su perfil y sus intereses.</span></li>
          <li><span><strong>Le contactamos</strong>para entender sus prioridades y agendar la demostración.</span></li>
          <li><span><strong>Demostración y propuesta</strong>con las soluciones pertinentes y una propuesta por escrito.</span></li>
        </ol>
      </div>
      <div class="tarjeta">
        <h2 class="tarjeta__titulo">Otros canales</h2>
        <ul class="lista-check" style="margin-top:12px">
          <li data-gl="whatsapp" hidden data-gl-mensaje="Hola, quisiera hablar con un asesor de Grupo Logic."><a class="enlace-flecha" href="#" data-gl-enlace target="_blank" rel="noopener">${icono('whatsapp')}<span>Hablar con un asesor por WhatsApp</span></a></li>
          <li data-gl="email" hidden><a class="enlace-flecha" href="#" data-gl-enlace>${icono('correo')}<span data-gl-texto></span></a></li>
          <li data-gl="telefono" hidden><a class="enlace-flecha" href="#" data-gl-enlace>${icono('telefono')}<span data-gl-texto></span></a></li>
          <li>${icono('ubicacion')}<span>Barranquilla, Colombia. Atendemos colegios de toda Latinoamérica.</span></li>
        </ul>
      </div>
      <div class="tarjeta">
        <h2 class="tarjeta__titulo">Sus datos, protegidos</h2>
        <p class="tarjeta__texto">Usamos la información de este formulario solo para responder su solicitud, conforme a nuestra <a href="/privacidad/">política de tratamiento de datos personales</a>.</p>
      </div>
    </aside>
  </div>
</section>`;

  return {
    ruta: '/contacto/',
    titulo: 'Solicitar demostración · Contacto · Grupo Logic',
    descripcion: 'Solicite una demostración de UntiCloud, AulaMágica IA, EduNova, Codexia, VCodePro o BookStudio para su colegio. Un asesor de Grupo Logic le contactará.',
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
