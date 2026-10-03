# Especificación del sitio web corporativo — Grupo Logic

**Dominio:** `grupologiclatam.com`
**Empresa:** Grupo Logic
**Stack:** HTML5 + CSS3 + JavaScript puro (sin frameworks, sin build obligatorio)
**Destinatario de este documento:** Claude Code

---

## 1. Objetivo

Construir el sitio corporativo de Grupo Logic, empresa que trae a Latinoamérica recursos pedagógicos de tipo tecnológico desarrollados en otras partes del mundo y los pone al alcance de los colegios de la región.

El sitio debe lograr tres cosas:

1. Presentar a Grupo Logic como un aliado serio y de alto nivel para instituciones educativas.
2. Mostrar el portafolio de siete soluciones, cada una con página propia.
3. Convertir visitas en solicitudes de demostración o propuesta (formulario y WhatsApp).

## 2. Audiencia y tono

**A quién se le habla:** personal de colegios que decide o influye en compras institucionales.

| Perfil | Qué le importa |
|---|---|
| Rector / Director general | Resultados institucionales, reputación, diferenciación del colegio |
| Director administrativo y financiero / Junta | Costo total, licenciamiento claro, proveedor confiable, soporte |
| Coordinador TIC | Implementación, seguridad, integraciones, protección de datos |
| Coordinador académico / Coordinador IB | Impacto pedagógico, alineación curricular, ahorro de tiempo docente |

**Reglas de redacción:**

- Español neutro latinoamericano, trato de **usted** ("su institución", "su equipo docente").
- Lenguaje de decisión: beneficios institucionales, retorno, implementación, acompañamiento. Nada de tono infantil ni de consumo masivo, ni siquiera en productos para niños (se habla al colegio, no al niño).
- Frases cortas, afirmaciones concretas. Sin superlativos vacíos ("el mejor del mundo", "revolucionario").
- Un solo H1 por página. Llamadas a la acción consistentes: **"Solicitar demostración"** (primaria) y **"Hablar con un asesor"** (secundaria).

**Reglas de veracidad (obligatorias):**

- No inventar cifras, testimonios, logos de clientes, premios ni certificaciones.
- No afirmar que Grupo Logic es "distribuidor exclusivo" o "representante oficial" de ningún producto salvo que el dueño del proyecto lo confirme. Usar por defecto: "Grupo Logic acerca estas soluciones a los colegios de Latinoamérica".
- Las cifras que se muestren deben provenir de los sitios oficiales de cada producto (sección 6) y ser verificables.
- Varios sitios de origen muestran contadores en cero, teléfonos de ejemplo (`+57 300 000 0000`) y testimonios ilustrativos. **No copiarlos.**

## 3. Datos pendientes del propietario

Centralizar todo en `assets/js/config.js` para que se cambie en un solo lugar. Usar marcadores `[PENDIENTE]` visibles en el código (no en la página publicada: si falta un dato, ocultar el elemento).

```js
window.GL_CONFIG = {
  empresa: "Grupo Logic",
  dominio: "https://grupologiclatam.com",
  email: "[PENDIENTE]",            // ej. contacto@grupologiclatam.com
  telefono: "[PENDIENTE]",
  whatsapp: "[PENDIENTE]",         // formato internacional sin "+"
  direccion: "[PENDIENTE]",
  ciudad: "Barranquilla, Colombia",
  redes: { linkedin: "", instagram: "", youtube: "" },
  formEndpoint: "[PENDIENTE]",     // Formspree, Web3Forms o endpoint propio
  analyticsId: ""                  // GA4, opcional
};
```

También pendiente: logotipo oficial de Grupo Logic. Mientras no exista, crear un logotipo tipográfico en SVG (ver sección 4) fácil de reemplazar.

## 4. Dirección de diseño: corporativo, moderno y de lujo

La referencia es una firma de consultoría internacional o un banco privado, no una startup EdTech. Sobrio, amplio, con mucho aire y pocos elementos muy bien terminados.

**Paleta (variables CSS en `:root`):**

| Token | Valor | Uso |
|---|---|---|
| `--navy-900` | `#06101F` | Fondo de hero y footer |
| `--navy-700` | `#0B1B33` | Secciones oscuras, encabezado |
| `--navy-500` | `#1B3558` | Bordes y superficies sobre oscuro |
| `--gold-500` | `#C8A45C` | Acento principal: líneas, íconos, CTA |
| `--gold-300` | `#E3CD9A` | Hover y detalles |
| `--ivory` | `#F7F4EE` | Fondo de secciones claras |
| `--white` | `#FFFFFF` | Tarjetas |
| `--ink` | `#14202E` | Texto sobre claro |
| `--muted` | `#5D6B7C` | Texto secundario |

El dorado se usa con moderación (líneas finas, numeración, botón primario). Nunca degradados arcoíris ni colores saturados; los colores de cada producto aparecen solo dentro de su logotipo o captura.

**Tipografía (auto-alojada en WOFF2, `font-display: swap`):**

- Títulos: **Fraunces** (serif, pesos 400–600), interletrado ligeramente negativo en tamaños grandes.
- Texto e interfaz: **Manrope** (400, 500, 700).
- Etiquetas pequeñas ("eyebrows"): Manrope en mayúsculas, 12–13 px, `letter-spacing: .18em`, color dorado.

**Composición:**

- Contenedor máximo 1240 px, rejilla de 12 columnas, espaciado vertical generoso (96–140 px entre secciones en escritorio).
- Alternar secciones oscuras (navy) y claras (marfil) para dar ritmo.
- Tarjetas con borde de 1 px, radio 14–18 px, sombra muy suave; en hover, elevación sutil y línea dorada.
- Iconografía lineal de trazo fino en SVG inline (un solo estilo en todo el sitio). **No usar emojis.**
- Logotipo provisional: "GRUPO LOGIC" en Fraunces con un isotipo geométrico simple (por ejemplo, una "L" formada por dos trazos dentro de un cuadrado de línea dorada), en SVG, con versión clara y oscura.

**Dinamismo (todo en JS puro, sin librerías pesadas):**

- Encabezado fijo que pasa de transparente a navy sólido al hacer scroll.
- Aparición de elementos al entrar en pantalla con `IntersectionObserver` (desvanecer + desplazamiento de 16–24 px, escalonado).
- Hero con fondo animado discreto: malla de líneas o constelación de puntos en `<canvas>` o SVG, en tonos navy/dorado de baja opacidad, sugiriendo conexiones entre continentes.
- Mapa estilizado "del mundo a Latinoamérica": arcos animados desde Alemania, Reino Unido y España hacia la región.
- Filtro del portafolio por categoría con transición suave.
- Carrusel/pestañas de soluciones en el inicio, accesible por teclado.
- Contadores animados solo para cifras reales (sección 6).
- Menú móvil a pantalla completa, botón flotante de WhatsApp, botón "volver arriba".
- Respetar `prefers-reduced-motion`: desactivar animaciones y parallax.

**Responsive:** mobile-first; puntos de quiebre en 640, 960 y 1240 px. Probar a 360 px de ancho sin scroll horizontal.

## 5. Arquitectura del sitio

Sitio estático multipágina con URLs limpias (carpeta + `index.html`), para que cada solución posicione por sí sola.

```
/
├── index.html                      Inicio
├── soluciones/
│   ├── index.html                  Portafolio completo con filtro
│   ├── unticloud/index.html
│   ├── aulamagica-ia/index.html
│   ├── edunova/index.html
│   ├── codexia/index.html
│   ├── vcodepro/index.html
│   ├── bookstudio/index.html
│   └── servivps/index.html
├── nosotros/index.html             Quiénes somos, misión, cómo trabajamos
├── contacto/index.html             Formulario de demostración
├── privacidad/index.html           Política de tratamiento de datos
├── terminos/index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── assets/
    ├── css/  (base.css, components.css, pages.css)
    ├── js/   (config.js, main.js, portfolio.js, form.js)
    ├── fonts/
    ├── img/  (logo/, productos/, og/, iconos/)
    └── data/ soluciones.json       Fuente única de datos del portafolio
```

`soluciones.json` contiene por producto: `slug`, `nombre`, `categoria`, `origen`, `lema`, `resumen`, `beneficios[]`, `publico[]`, `urlOficial`, `imagen`, `logo`. Las tarjetas del inicio y del portafolio se generan desde ahí, pero **el contenido de cada página de solución va escrito en el HTML** (no inyectado por JS) para que sea indexable.

Encabezado y pie se repiten en cada HTML (sin inyección por JS, por SEO). Si se quiere evitar duplicación, usar un script de build opcional en Node que ensamble parciales; el resultado publicado debe ser HTML estático completo.

### 5.1 Página de inicio — secciones en orden

1. **Hero** (navy, animado). Eyebrow: "Tecnología educativa de clase mundial". H1 sugerido: *"Las mejores soluciones educativas del mundo, al servicio de los colegios de Latinoamérica"*. Subtítulo de dos líneas. CTA primaria "Solicitar demostración", secundaria "Conocer el portafolio".
2. **Franja de confianza:** logotipos de las siete soluciones en monocromo marfil, con el texto "Un portafolio seleccionado en Alemania, Reino Unido y España".
3. **Propuesta de valor** (3 columnas): Selección rigurosa · Implementación acompañada · Un solo interlocutor para su institución.
4. **Portafolio por líneas** (pestañas, ver sección 6): cada línea muestra sus productos con captura enmarcada, resumen y enlace "Ver solución".
5. **Mapa "Del mundo a su colegio"** con arcos animados y texto sobre el modelo de Grupo Logic.
6. **Soluciones por rol:** Rectoría · Dirección administrativa · Coordinación TIC · Coordinación académica. Cada pestaña dice qué gana ese perfil y qué soluciones le sirven.
7. **Cómo trabajamos** (línea de tiempo de 4 pasos): Diagnóstico → Demostración → Implementación y formación docente → Acompañamiento continuo.
8. **Seguridad y protección de datos:** síntesis de los compromisos que declaran los productos (control por roles, supervisión docente, tratamiento de datos de menores) y mención de la Ley 1581 de 2012 de Colombia como marco de referencia.
9. **Preguntas frecuentes** (acordeón accesible, 6–8 preguntas de compra institucional: licenciamiento, implementación, formación, soporte, facturación, datos).
10. **CTA final** en navy con formulario corto (nombre, cargo, institución, país, correo) o botón a `/contacto/`.
11. **Pie:** logotipo, descripción breve, enlaces a soluciones, empresa, legal, contacto y redes.

### 5.2 Plantilla de página de solución

1. Migas de pan (Inicio › Soluciones › Producto).
2. Hero: logotipo del producto, categoría, país de origen, H1 con palabra clave, resumen, CTA "Solicitar demostración" y enlace externo "Visitar sitio oficial" (`rel="noopener"`, abre en pestaña nueva).
3. Captura principal dentro de un marco de navegador elegante.
4. "El reto que resuelve" (2–3 párrafos orientados al directivo).
5. Funcionalidades clave (rejilla de 6 tarjetas con ícono lineal).
6. "Para quién es" (por rol).
7. Implementación en su institución (pasos).
8. Licenciamiento: descripción cualitativa de las modalidades + CTA "Solicitar propuesta". **No publicar precios** (ver sección 6.8).
9. Preguntas frecuentes del producto (3–5).
10. Soluciones relacionadas + CTA final.

### 5.3 Contacto

Formulario: nombre, cargo (lista: Rector/a, Director/a administrativo, Coordinador/a TIC, Coordinador/a académico, Docente, Otro), institución, país (lista de países de Latinoamérica), ciudad, correo institucional, teléfono, solución de interés (selección múltiple), número aproximado de estudiantes, mensaje, casilla de aceptación de la política de datos.

- Validación en cliente con mensajes accesibles; campo honeypot antispam.
- Envío por `fetch` a `GL_CONFIG.formEndpoint`; estados de cargando, éxito y error.
- Alternativa: botón de WhatsApp con mensaje precargado según la solución elegida.
- Si se llega desde una página de solución (`?solucion=unticloud`), preseleccionar esa solución.

## 6. Portafolio: contenido analizado de cada sitio

> Atención: en dos casos el dominio no coincide con la marca que muestra el sitio. `magicschools.es` se presenta como **AulaMágica IA** y `teachy.es` como **EduNova**. Usar los nombres de marca que aparecen en cada sitio.

**Líneas del portafolio (categorías para filtros y pestañas):**

| Línea | Soluciones |
|---|---|
| Gestión institucional | UntiCloud |
| Inteligencia artificial para la enseñanza | AulaMágica IA, EduNova |
| Programación y pensamiento computacional | Codexia, VCodePro |
| Contenidos digitales interactivos | BookStudio |
| Infraestructura tecnológica | ServiVPS |

### 6.1 UntiCloud — `https://www.unticloud.de/`

- **Origen:** Alemania (dominio .de). **Línea:** Gestión institucional.
- **Qué es:** capa web para colegios que planifican con Untis. Lee los archivos GPU exportados de Untis Desktop y los convierte en un panel web: horarios en tiempo real, guardias de recreo, sustituciones y estadísticas de ausentismo docente. Sin instalación ni servidores propios; compatible con Untis 2020 o superior.
- **Lema para Grupo Logic:** "Toda la información de Untis, en la web y en manos de quien decide."
- **Funcionalidades:** horarios por docente y curso en cualquier dispositivo · estadísticas de ausentismo por mes, motivo y sección · guardias de recreo · comparador de hasta 4 horarios · reemplazos del día con PDF · módulo de Indicadores IB (cumplimiento de horas HL/SL y núcleo EE·TdC·CAS) · carga horaria docente · usuarios y roles.
- **Público:** Rectoría (ausentismo y KPIs), Coordinación TIC (importación y permisos), Coordinación académica e IB, docentes.
- **Datos utilizables:** importación en menos de 5 minutos; 100 % web; puesta en marcha "en una tarde".
- **Licenciamiento:** tres planes (Institución, Profesional, Red de Colegios).
- **Palabras clave:** Untis web, horarios escolares en línea, ausentismo docente, sustituciones de profesores, guardias de recreo, indicadores IB.

### 6.2 AulaMágica IA — `https://www.magicschools.es/`

- **Origen:** España (AulaMágica S.L.). **Línea:** IA para la enseñanza.
- **Qué es:** plataforma de inteligencia artificial segura para colegios, con más de 80 herramientas para docentes y más de 50 para estudiantes, bajo control de la institución.
- **Lema para Grupo Logic:** "Inteligencia artificial segura para toda su institución."
- **Funcionalidades:** generador de presentaciones, planes de clase, rúbricas, quices de selección múltiple, retroalimentación de escritos, observaciones de boletín, tutor de IA que guía sin dar la respuesta, reescritor de textos por nivel, apoyo a planes de ajustes razonables (PIAR), correo profesional a familias · panel de administración de usuarios y licencias · paneles de uso y adopción por sede · políticas de uso responsable configurables.
- **Seguridad:** cifrado en tránsito y en reposo, control por roles, inicio de sesión con cuentas institucionales, moderación de contenido, supervisión docente de las interacciones de estudiantes; declara cumplimiento de RGPD y no usar datos de docentes ni estudiantes para entrenar modelos.
- **Integraciones:** Google Workspace, Microsoft 365, Canvas, Moodle, Classroom, Teams.
- **Licenciamiento:** Licencia Escuela (hasta 10 usuarios) y Licencia por Volumen (hasta 250 usuarios, varias sedes), vigencia de 12 meses, formación incluida.
- **Palabras clave:** inteligencia artificial para colegios, IA para docentes, IA segura para estudiantes, herramientas de IA para planear clases.

### 6.3 EduNova — `https://www.teachy.es/`

- **Origen:** España. **Línea:** IA para la enseñanza.
- **Qué es:** sistema de aprendizaje con IA para toda la escuela: ocho módulos conectados que cubren el ciclo completo, del libro de texto al boletín para las familias, con cuatro perfiles (docentes, directivos, estudiantes, familias).
- **Lema para Grupo Logic:** "Un solo sistema para planear, enseñar, evaluar y acompañar."
- **Módulos:** 01 Libros de texto · 02 Planeación · 03 Clases · 04 Accesibilidad · 05 Evaluaciones (incluye simulacros tipo prueba de Estado) · 06 Calificación asistida · 07 Recuperación · 08 Comunicación con familias. Además, **Studio**: libros propios de la institución con su modelo pedagógico e identidad, impresos o digitales.
- **Público:** directivos (indicadores por grado, área y sede; alertas tempranas), docentes, estudiantes, familias.
- **Datos utilizables:** 8 módulos, 4 perfiles, funciona desde el navegador sin instalación. La cifra "-70 % de tiempo" aparece como estimación; si se usa, decir "estimado por el fabricante".
- **Licenciamiento:** Licencia Escuela (hasta 10 usuarios, 1 sede) y Licencia por Volumen (hasta 250 usuarios, hasta 5 sedes, incluye Studio).
- **Diferenciación frente a AulaMágica IA:** AulaMágica es una caja de herramientas de IA para el docente; EduNova es un sistema integrado de todo el ciclo de aprendizaje. Explicarlo en ambas páginas para que no compitan entre sí.
- **Palabras clave:** plataforma de aprendizaje con IA, planeación de clases con IA, evaluaciones tipo prueba de Estado, libros de texto personalizados para colegios.

### 6.4 Codexia — `https://codexialab.com/`

- **Línea:** Programación y pensamiento computacional (4 a 12 años).
- **Qué es:** plataforma educativa gamificada que enseña programación, matemáticas, lógica, inteligencia artificial y más mediante retos. Editor de bloques y editor de código real, con tres bandas de edad.
- **Lema para Grupo Logic:** "Pensamiento computacional desde preescolar hasta primaria."
- **Funcionalidades:** 10 materias (Programación, Lógica, Aritmética, Geometría, Informática, Seguridad en Internet, Inteligencia Artificial, Física básica, Preescolar, Juegos y Laboratorios) · más de 200 juegos · voz natural para quienes aún no leen · ejecución de código en entorno aislado · panel docente con grupos, sedes, asignaciones y estadísticas de progreso · optimizada para tabletas.
- **Público:** coordinación de primaria y preescolar, área de tecnología, rectoría (programa STEM diferenciador).
- **Licenciamiento:** plan Escuela anual para la institución completa.
- **Palabras clave:** programación para niños en colegios, pensamiento computacional primaria, plataforma STEM gamificada, Blockly para colegios.

### 6.5 VCodePro — `https://www.vcodepro.de/`

- **Origen:** Alemania (Berlín). **Línea:** Programación y pensamiento computacional (desde los 12 años).
- **Qué es:** editor de código profesional con IA incorporada y estudio de agentes, pensado para enseñar programación y alineado con las electivas de tecnología del Bachillerato Internacional. Versión 2.4; Windows, macOS y Linux.
- **Lema para Grupo Logic:** "Sus estudiantes no solo usan la IA: aprenden a construirla."
- **Funcionalidades:** asistente en modo pedagógico (pistas y preguntas, no soluciones) · estudio de agentes de IA · modo aula con avance en tiempo real · rúbricas IB (criterios A–D) y exportación de notas · bitácora automática del ciclo de diseño MYP · registro completo de conversaciones para integridad académica · modo examen que desactiva la IA · funciona en equipos modestos · soporta Python, JavaScript, HTML, CSS, Java y C++.
- **Lo que recibe el colegio:** plan de aula de 6.º a 12.º con 32 sesiones por año, banco de más de 120 proyectos, formación docente (cuatro talleres en vivo) y panel de coordinación.
- **Licenciamiento:** Personal, Escuela (hasta 100 licencias) y Licencia de Sitio (hasta 500 licencias).
- **Continuidad con Codexia:** presentar ambos como una ruta: Codexia (4–12 años) → VCodePro (12 años en adelante).
- **Palabras clave:** enseñar programación en bachillerato, editor de código educativo, informática IB, agentes de IA en el aula, Bachillerato Internacional tecnología.

### 6.6 BookStudio — `https://bookstudio.uk/`

- **Origen:** Reino Unido (dominio .uk). **Línea:** Contenidos digitales interactivos.
- **Qué es:** plataforma para crear libros interactivos con voz, video, mapas, gráficas y preguntas autocorregibles, que el alumnado crea, escucha y comparte. Para centros educativos y equipos profesionales, con planes desde un docente hasta toda la institución.
- **Lema para Grupo Logic:** "Libros interactivos creados por su comunidad educativa."
- **Nota para Claude Code:** el sitio es una aplicación que requiere JavaScript; el análisis automático solo obtuvo los metadatos anteriores. **Abrir el sitio en un navegador real (Playwright) para completar funcionalidades, planes y capturas antes de escribir su página.** No inventar lo que no se pueda verificar.
- **Palabras clave:** libros interactivos para colegios, crear libros digitales educativos, contenido interactivo autocorregible.

### 6.7 ServiVPS — `https://www.servivps.com/`

- **Línea:** Infraestructura tecnológica.
- **Qué es:** servidores VPS, hosting, almacenamiento en la nube, protección de sitios y diseño web. No es un recurso pedagógico: es la infraestructura que sostiene los servicios digitales del colegio.
- **Enfoque para Grupo Logic:** presentarlo como "infraestructura en la nube para instituciones educativas": alojamiento del sitio web y plataformas del colegio, respaldo y protección.
- **Lema para Grupo Logic:** "La infraestructura que mantiene su colegio siempre en línea."
- **Datos utilizables:** SLA de disponibilidad ≥ 99,9 %, soporte técnico en español 24/7, escalabilidad de recursos, migraciones sin tiempo de inactividad. **No usar** las cifras "35+ años", "4k proyectos" ni "234+ expertos" del sitio (parecen texto de plantilla) salvo confirmación del propietario.
- **Palabras clave:** hosting para colegios, servidores VPS para instituciones educativas, nube para colegios.

### 6.8 Precios

Los sitios oficiales publican precios en pesos colombianos. **Decisión para este sitio: no mostrar precios.** El sitio se dirige a varios países y la venta institucional se cierra con propuesta. En cada página de solución se describen las modalidades de licencia y se ofrece "Solicitar propuesta". Si el propietario decide lo contrario, añadir un campo `precioDesde` en `soluciones.json`.

## 7. Imágenes y recursos gráficos

1. **Logotipos oficiales:** descargar los que existan y guardarlos en `assets/img/logo/`:
   - ServiVPS: `https://www.servivps.com/wp-content/uploads/2024/03/Asset-1resul.png`
   - VCodePro: `https://www.vcodepro.de/assets/img/logo-mark.svg`
   - Imágenes sociales: `https://www.vcodepro.de/assets/img/og-image.png`, `https://codexialab.com/assets/og.png`, `https://bookstudio.uk/og-image.svg`
   - UntiCloud, AulaMágica IA, EduNova y Codexia usan logotipos de texto: recrearlos como texto estilizado respetando el nombre exacto, o capturarlos del sitio.
2. **Capturas de producto:** con Playwright, tomar capturas de cada sitio oficial a 1440×900 (hero y secciones que muestran la interfaz del producto). Recortar, exportar a WebP/AVIF y presentar dentro de un marco de navegador propio del sitio (CSS). Son las "imágenes representativas" de cada solución.
3. **Ilustración propia:** fondo del hero, mapa mundial con arcos e íconos, todo en SVG/canvas con la paleta del sitio.
4. **Fotografía:** si se usan fotos de colegios o directivos, solo de bancos con licencia libre (Unsplash, Pexels), tratadas con un duotono navy para unificar. Descargarlas y alojarlas localmente; no enlazar en caliente.
5. Toda imagen con `alt` descriptivo en español, `width`/`height` declarados, `loading="lazy"` (excepto la del hero, que lleva `fetchpriority="high"`), y `srcset` con al menos dos tamaños.
6. Generar una imagen Open Graph de 1200×630 por página (plantilla común: fondo navy, logotipo, título).

## 8. SEO

**Técnico**

- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`), jerarquía de encabezados correcta, un H1 por página.
- `<html lang="es-419">`, `<link rel="canonical">` absoluto en cada página y `hreflang="es-419"` más `x-default`.
- `<title>` de 50–60 caracteres y meta descripción de 140–160, únicos por página.
- Open Graph y Twitter Card completos (`og:locale` = `es_LA`).
- `robots.txt` que permita todo y apunte a `sitemap.xml`; `sitemap.xml` con todas las URL y `lastmod`.
- Favicon SVG + PNG, `site.webmanifest`, `theme-color` navy.
- Rendimiento: LCP < 2,5 s, CLS < 0,1, INP < 200 ms. CSS crítico en línea, JS con `defer`, fuentes precargadas, imágenes en formatos modernos, sin dependencias externas bloqueantes. Objetivo Lighthouse ≥ 95 en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- Enlaces internos entre soluciones relacionadas; texto de enlace descriptivo.

**Datos estructurados (JSON-LD)**

- Inicio: `Organization` (nombre, URL, logo, `areaServed` Latinoamérica, `contactPoint`) y `WebSite`.
- Portafolio: `ItemList`.
- Cada solución: `SoftwareApplication` (o `Service` en ServiVPS) con `applicationCategory: "EducationalApplication"`, `provider` y `url` oficial; más `BreadcrumbList`.
- Secciones de preguntas: `FAQPage`.
- No incluir `aggregateRating` ni reseñas (no hay datos reales).

**Títulos y descripciones sugeridos**

| Página | Title | Enfoque de la descripción |
|---|---|---|
| Inicio | Grupo Logic · Tecnología educativa para colegios de Latinoamérica | Portafolio internacional, acompañamiento, demostración |
| Soluciones | Soluciones tecnológicas para colegios · Grupo Logic | Gestión, IA, programación, contenidos, infraestructura |
| UntiCloud | UntiCloud: horarios y ausentismo docente desde Untis · Grupo Logic | Untis en la web, indicadores para rectoría |
| AulaMágica IA | AulaMágica IA: inteligencia artificial segura para colegios | 80+ herramientas, control institucional |
| EduNova | EduNova: sistema de aprendizaje con IA para su colegio | 8 módulos, del libro al boletín |
| Codexia | Codexia: programación y pensamiento computacional en primaria | 4–12 años, panel docente |
| VCodePro | VCodePro: programación e IA para bachillerato e IB | Editor con IA, rúbricas IB |
| BookStudio | BookStudio: libros interactivos para colegios | Voz, video, preguntas autocorregibles |
| ServiVPS | ServiVPS: nube y hosting para instituciones educativas | Disponibilidad, soporte en español |

**Palabras clave transversales:** tecnología educativa para colegios, software para colegios, plataformas educativas Latinoamérica, inteligencia artificial en colegios, transformación digital educativa, soluciones EdTech para instituciones educativas. Integrarlas con naturalidad en H1/H2, primeros párrafos y textos alternativos; sin relleno de palabras clave.

## 9. Accesibilidad

- WCAG 2.1 nivel AA: contraste mínimo 4,5:1 (verificar el dorado sobre marfil; usar un tono más oscuro para texto si no cumple).
- Navegación completa por teclado, foco visible, enlace "Saltar al contenido".
- Pestañas, acordeones, menú móvil y carrusel con roles y atributos ARIA correctos.
- Formularios con `label` asociado, errores anunciados con `aria-live`.
- Áreas táctiles de al menos 44×44 px.

## 10. Legal y privacidad

- Política de tratamiento de datos personales conforme a la Ley 1581 de 2012 (Colombia), redactada de forma general y con marcadores para razón social, NIT y correo del responsable. Indicar que debe ser revisada por un asesor legal antes de publicarse.
- Términos de uso del sitio.
- Aviso: "Los nombres y logotipos de los productos pertenecen a sus respectivos titulares."
- Banner de cookies solo si se activa analítica; sin analítica, no se muestra.

## 11. Calidad del código

- Sin frameworks ni jQuery. CSS con variables, `clamp()` para tipografía fluida, Grid y Flexbox. JS en módulos pequeños, sin variables globales salvo `GL_CONFIG`.
- Nomenclatura CSS consistente (BEM o utilidades propias, una sola convención).
- Comentarios breves donde la lógica no sea obvia. Código y comentarios en español.
- `README.md` con: estructura, cómo editar `config.js` y `soluciones.json`, cómo añadir una solución nueva, cómo publicar (subir la carpeta a cualquier hosting estático o servidor Nginx).
- Incluir ejemplo de configuración Nginx: compresión, caché de estáticos, redirección de `www` a dominio raíz y de HTTP a HTTPS, página 404 personalizada.

## 12. Orden de trabajo

1. Abrir los siete sitios con Playwright, confirmar el contenido de la sección 6, completar BookStudio y tomar capturas.
2. Crear estructura de carpetas, `config.js`, `soluciones.json`, fuentes y sistema de diseño (variables, tipografía, botones, tarjetas).
3. Construir encabezado, pie y página de inicio completa.
4. Construir la plantilla de solución y las siete páginas.
5. Portafolio con filtro, Nosotros, Contacto, legales y 404.
6. SEO: metadatos, JSON-LD, sitemap, robots, imágenes OG.
7. Verificación: Lighthouse, validación HTML, revisión a 360/768/1440 px, navegación por teclado, enlaces rotos, `prefers-reduced-motion`.
8. Entregar un resumen de lo construido y la lista de datos `[PENDIENTE]` que debe completar el propietario.

## 13. Criterios de aceptación

- [ ] Las 14 páginas existen, enlazan entre sí y no hay enlaces rotos.
- [ ] Cada solución tiene página propia con contenido verificable en su sitio oficial y enlace a este.
- [ ] No hay cifras, testimonios ni clientes inventados; no hay precios publicados.
- [ ] Identidad visual corporativa coherente: paleta navy/dorado/marfil, Fraunces + Manrope, sin emojis.
- [ ] Animaciones fluidas y desactivables con `prefers-reduced-motion`.
- [ ] Lighthouse ≥ 95 en las cuatro categorías en inicio y en una página de solución.
- [ ] Metadatos únicos, canonical, Open Graph y JSON-LD válidos en todas las páginas; `sitemap.xml` y `robots.txt` presentes.
- [ ] Formulario de contacto validado, con estados de envío y alternativa por WhatsApp.
- [ ] Sitio usable a 360 px de ancho y por teclado.
- [ ] `README.md` y lista de pendientes entregados.
