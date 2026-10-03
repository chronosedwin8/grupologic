# Sitio web de Grupo Logic — grupologiclatam.com

Sitio corporativo estático de Grupo Logic: HTML5, CSS3 y JavaScript puro, sin frameworks.
Presenta a Grupo Logic ante colegios de Latinoamérica, muestra el portafolio de ocho soluciones
(cada una con página propia) y convierte visitas en solicitudes de demostración.

> **Decisiones del propietario:** ServiVPS se retiró del alcance; se añadieron Veyon Control (línea Gestión
> institucional) y CodeNest School (línea Programación). El portafolio tiene ocho soluciones en cuatro líneas
> y el sitio tiene 15 páginas.

---

## 1. Estructura

```
GrupoLogic/
├── sitio/                    ← LO QUE SE PUBLICA (raíz del dominio)
│   ├── index.html                      Inicio
│   ├── soluciones/index.html           Portafolio con filtro
│   ├── soluciones/<slug>/index.html    unticloud, veyon-control, aulamagica-ia, edunova, codexia, codenest-school, vcodepro, bookstudio
│   ├── nosotros/  contacto/  privacidad/  terminos/
│   ├── 404.html  robots.txt  sitemap.xml  site.webmanifest
│   ├── favicon.svg  favicon-32.png  apple-touch-icon.png
│   └── assets/
│       ├── css/   base.css (se inserta en línea como CSS crítico), components.css, pages.css
│       ├── js/    config.js, main.js, portfolio.js, form.js
│       ├── fonts/ Fraunces y Manrope en WOFF2 (auto-alojadas)
│       ├── img/   logo/, productos/ (capturas WebP), og/ (Open Graph), iconos/, mapa-puntos.svg
│       └── data/  soluciones.json  ← fuente única de datos del portafolio
├── _build/                   ← generador opcional (Node). NO se publica.
│   ├── build.mjs             ensambla las páginas en sitio/
│   ├── lib/                  plantilla común (head, encabezado, pie, íconos) y formularios
│   ├── paginas/              una función por tipo de página
│   ├── contenido/            textos de cada página de solución
│   ├── imagenes.mjs          logotipo, favicons, mapa y capturas WebP
│   ├── og.mjs                imágenes Open Graph 1200×630
│   ├── capturar*.mjs         investigación y capturas de los sitios oficiales (Playwright)
│   ├── investigacion/        texto extraído de cada sitio oficial (respaldo de lo publicado)
│   ├── verificar.mjs         validación HTML, enlaces, anclas y JSON-LD
│   ├── pruebas.mjs           pruebas de interacción, teclado y accesibilidad
│   └── servidor.mjs          vista previa local con gzip
└── nginx/grupologiclatam.conf   configuración de ejemplo para producción
```

El HTML publicado es **estático y completo**: encabezado, pie y todo el contenido de cada solución
están escritos en el HTML (nada se inyecta por JavaScript), para que los buscadores lo indexen.

## 2. Datos de contacto: `sitio/assets/js/config.js`

Todos los datos de la empresa se cambian en un solo lugar:

```js
window.GL_CONFIG = {
  email: "[PENDIENTE]",        // contacto@grupologiclatam.com
  telefono: "[PENDIENTE]",     // tal como debe mostrarse: +57 605 000 0000
  whatsapp: "[PENDIENTE]",     // internacional sin "+": 573001234567
  direccion: "[PENDIENTE]",
  ciudad: "",                  // opcional; vacío = no se muestra
  redes: { linkedin: "", instagram: "", youtube: "" },
  formEndpoint: "[PENDIENTE]", // URL de Formspree, Web3Forms o endpoint propio
  formExtra: {},               // p. ej. { access_key: "..." } para Web3Forms
  analyticsId: "",             // GA4 opcional; si se define aparece el aviso de cookies
  legal: { razonSocial: "[PENDIENTE]", nit: "[PENDIENTE]", emailDatos: "[PENDIENTE]" }
};
```

- Mientras un valor siga en `[PENDIENTE]` o vacío, **el elemento que lo usa queda oculto** en la página
  (correo y teléfono del pie, botón flotante y botones de WhatsApp, redes, NIT…). Nunca se muestra el marcador.
- Basta con editar el archivo y subirlo: el cambio se ve sin reconstruir.
- Para que los datos también aparezcan en los datos estructurados (JSON-LD `Organization.contactPoint`),
  ejecute el build después de editarlos (`npm run build` dentro de `_build/`).

### Formulario
El formulario envía JSON por `fetch` a `formEndpoint`, con estados de carga, éxito y error, validación
accesible y un campo trampa antispam. Opciones:
- **Formspree:** cree un formulario y pegue su URL (`https://formspree.io/f/xxxx`).
- **Web3Forms:** `formEndpoint: "https://api.web3forms.com/submit"` y `formExtra: { access_key: "SU-CLAVE" }`.
- **Propio:** cualquier URL que acepte `POST` con `Content-Type: application/json` y responda 2xx.

Si se llega a `/contacto/?solucion=unticloud`, esa solución queda preseleccionada.

## 3. Portafolio: `sitio/assets/data/soluciones.json`

Contiene las cuatro líneas (`categorias`) y, por solución: `slug`, `nombre`, `categoria`, `origen`,
`lema`, `resumen`, `beneficios[]`, `publico[]`, `urlOficial`, `dominio`, `imagen` (captura del panel),
`portada` (captura del sitio oficial) y `logo`.
Las tarjetas del inicio, del portafolio, del menú y del pie se generan desde aquí en el build.
El texto largo de cada página de solución está en `_build/contenido/soluciones.mjs`.

**Precios:** por decisión del proyecto no se publican. Si se decide lo contrario, añada `precioDesde`
a cada solución en `soluciones.json` y muéstrelo en `_build/paginas/solucion.mjs`.

## 4. Cómo añadir una solución nueva

1. Agregue el objeto en `sitio/assets/data/soluciones.json` (y la línea en `categorias` si es nueva).
2. Agregue su contenido en `_build/contenido/soluciones.mjs` con la misma estructura de las demás
   (`titulo`, `descripcion`, `h1`, `reto`, `funciones`, `publico`, `implementacion`, `licencias`, `preguntas`…).
3. Agregue su logotipo tipográfico en `MARCAS` dentro de `_build/lib/plantilla.mjs`.
4. Investigación: `node investigar-uno.mjs <slug> <url>` guarda el texto del sitio oficial en `investigacion/`.
   Capturas: añada su URL y selectores en `_build/capturar-final.mjs` y ejecute `node capturar-final.mjs <slug>`
   (solo esa solución); revise que no aparezcan precios ni animaciones a medias.
5. Ejecute `npm run todo` (imágenes, páginas, Open Graph) y luego `npm run verificar`.
   El `sitemap.xml`, el menú, el pie, el filtro, el formulario de contacto y los textos con la cantidad de
   soluciones («Ocho soluciones…») se actualizan solos.

## 5. Construir y previsualizar

Requisitos: Node 20 o superior.

```bash
cd _build
npm install
npx playwright install chromium   # solo si va a tomar capturas o generar imágenes OG
npm run todo        # imágenes + páginas + imágenes Open Graph
npm run servir      # vista previa en http://127.0.0.1:8080
npm run verificar   # HTML válido, enlaces internos, anclas, JSON-LD y sitemap
npm run pruebas     # interacción y teclado (con el servidor en marcha)
```

Si solo cambia textos o estilos, basta con `npm run build`.
El build añade a CSS y JS una huella `?v=` para invalidar la caché al publicar.

## 6. Publicar

Suba **solo el contenido de la carpeta `sitio/`** a la raíz del dominio. Funciona en cualquier hosting
estático (Nginx, Apache, Netlify, Cloudflare Pages, Vercel, GitHub Pages con dominio propio).
En servicios tipo Netlify o Cloudflare Pages, indique `sitio` como carpeta de publicación y ningún
comando de build.

Con **Nginx**, use `nginx/grupologiclatam.conf`: compresión gzip, caché larga para CSS/JS/fuentes/imágenes,
redirección de `www` al dominio raíz y de HTTP a HTTPS, cabeceras de seguridad y 404 personalizada.

```bash
rsync -av --delete sitio/ usuario@servidor:/var/www/grupologiclatam.com/
sudo nginx -t && sudo systemctl reload nginx
```

Las rutas son absolutas desde la raíz (`/assets/...`), por lo que el sitio debe servirse en la raíz de
un dominio o subdominio, no en una subcarpeta.

### Servidor actual (CloudPanel)

El sitio está publicado en `https://www.grupologiclatam.com` (dominio canónico; CloudPanel redirige
`grupologiclatam.com` y HTTP hacia esa dirección, con certificado Let's Encrypt).

- Carpeta pública: `/home/grupologiclatam/htdocs/www.grupologiclatam.com`
- Copia del repositorio (no pública): `/home/grupologiclatam/repo-grupologic`
- Script de despliegue: `/home/grupologiclatam/desplegar-sitio.sh`

Para publicar cambios: haga `git push` a `main` y luego, conectado por SSH como el usuario del sitio
(`grupologiclatam`), ejecute:

```bash
~/desplegar-sitio.sh
```

El script actualiza la copia del repositorio y sincroniza solo la carpeta `sitio/` con la carpeta pública
(conserva `.well-known`, que usa la renovación del certificado). No afecta a otros sitios del servidor.

## 7. Datos pendientes del propietario

| Dato | Dónde | Efecto mientras falte |
|---|---|---|
| Correo de contacto | `config.js` → `email` | Se oculta en pie, contacto y JSON-LD |
| Teléfono | `config.js` → `telefono` | Se oculta |
| WhatsApp | `config.js` → `whatsapp` | Se ocultan el botón flotante y los botones «Hablar con un asesor» |
| Dirección | `config.js` → `direccion` | Se oculta |
| Endpoint del formulario | `config.js` → `formEndpoint` | El formulario muestra «El envío en línea no está disponible» |
| Redes sociales | `config.js` → `redes` | No se muestran íconos |
| GA4 (opcional) | `config.js` → `analyticsId` | Sin analítica ni aviso de cookies |
| Razón social, NIT y correo de datos | `config.js` → `legal` | La política muestra «Grupo Logic» y oculta NIT y correo |
| Logotipo oficial | `sitio/assets/img/logo/` | Se usa el logotipo tipográfico provisional |
| Revisión legal | `/privacidad/` y `/terminos/` | **Deben ser revisadas por un asesor legal antes de publicar** |
| Relación comercial con fabricantes | Textos del sitio | Se usa «Grupo Logic acerca estas soluciones…»; no se afirma exclusividad ni representación oficial |

**Logotipo:** `grupologic-claro.svg` (para fondos oscuros) y `grupologic-oscuro.svg` (para fondos claros)
en `sitio/assets/img/logo/`. El encabezado y el pie usan la versión en línea generada por
`_build/imagenes.mjs`; al recibir el logotipo oficial, reemplace esos archivos y la función
`logoGrupoLogic()` de `_build/lib/plantilla.mjs`, regenere con `npm run todo` y sustituya
`grupologic-logo.png` (JSON-LD).

## 8. Veracidad del contenido

- Todo lo que se afirma de cada producto proviene de su sitio oficial (consultado el 3 de octubre de 2026;
  el texto extraído está en `_build/investigacion/`). Cada página enlaza a su sitio oficial.
- **No se usaron** cifras ni testimonios ilustrativos de los sitios de origen: UntiCloud («1.2K colegios»,
  «8.4M horarios», testimonios, «40 % de reducción») y Codexia («1.2M estudiantes», «45 países»,
  testimonios — el propio sitio los marca como ilustrativos).
- Las cifras con contador (+80 herramientas de AulaMágica IA, +120 proyectos de VCodePro) indican su fuente.
- La estimación de EduNova («hasta 70 % menos de tiempo») se presenta como «estimado por el fabricante».
- EduNova se contradice sobre los usuarios de su Licencia Escuela (10 en la tabla de precios, 60 en sus
  preguntas frecuentes); por eso esa cifra no se publica.
- El país de origen de Codexia no figura en su sitio, así que no se indica. CodeNest School indica «Hecho en
  Colombia»; Veyon lo desarrolla Tobias Junghans en Alemania (aviso legal de veyon.io).
- Codexia y CodeNest School cubren las mismas edades (4 a 12 años); ambas páginas explican la diferencia.
- Las capturas de pantalla son de los sitios oficiales y de la versión de prueba pública de BookStudio.

## 9. Calidad verificada

- Lighthouse en producción (móvil simulado): Accesibilidad, Buenas prácticas y SEO en 100 en todas las
  páginas medidas. Rendimiento, mediana de 5 corridas: inicio 96, portafolio 99; páginas de solución
  100 (EduNova, VCodePro). El inicio varía entre corridas (88–100) por el tiempo de bloqueo simulado;
  CLS 0 y LCP ≈ 2 s.
- `npm run verificar`: 15 páginas sin errores de HTML, sin enlaces internos rotos, JSON-LD válido.
- `npm run pruebas`: menú desplegable y móvil (Escape, foco atrapado), pestañas con flechas/Inicio/Fin,
  acordeón, filtro con anuncio `aria-live`, validación accesible del formulario, preselección por URL,
  movimiento reducido y áreas táctiles de 44 px.
- Revisado a 360, 768 y 1440 px sin scroll horizontal.

## 10. Créditos

- Tipografías Fraunces y Manrope — SIL Open Font License (vía Fontsource).
- Datos del mapa: `world-atlas` (Natural Earth, dominio público).
- Algunos trazos de íconos están adaptados de Lucide (licencia ISC).
- Los nombres, logotipos y capturas de los productos pertenecen a sus respectivos titulares.
