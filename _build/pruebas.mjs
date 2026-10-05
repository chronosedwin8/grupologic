// Pruebas de interacción, teclado y accesibilidad básica (requiere el servidor local en :8080).
import { chromium } from 'playwright';
const B = process.env.BASE || 'http://127.0.0.1:8080';
const b = await chromium.launch();
let fallos = 0;
const ok = (cond, msg) => { console.log((cond ? '  ✓ ' : '  ✗ ') + msg); if (!cond) fallos++; };

// --- Inicio (escritorio)
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(B + '/', { waitUntil: 'networkidle' });
console.log('Inicio');
await p.keyboard.press('Tab');
ok(await p.evaluate(() => document.activeElement.classList.contains('saltar')), 'primer Tab enfoca "Saltar al contenido"');
ok(!(await p.locator('.encabezado').getAttribute('class')).includes('solido'), 'encabezado transparente arriba');
await p.mouse.wheel(0, 800); await p.waitForTimeout(400);
ok((await p.locator('.encabezado').getAttribute('class')).includes('solido'), 'encabezado sólido al hacer scroll');
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
await p.click('[data-desplegable]');
ok(await p.isVisible('#menu-productos'), 'menú de productos se abre');
await p.keyboard.press('Escape');
ok(!(await p.isVisible('#menu-productos')), 'Escape cierra el menú de productos');
ok(await p.evaluate(() => document.activeElement.hasAttribute('data-desplegable')), 'el foco vuelve al botón');
await p.focus('#tab-linea-gestion'); await p.keyboard.press('ArrowRight');
ok(await p.isVisible('#panel-linea-ia') && !(await p.isVisible('#panel-linea-gestion')), 'flecha derecha cambia de pestaña');
ok(await p.evaluate(() => document.activeElement.id) === 'tab-linea-ia', 'el foco sigue a la pestaña activa');
await p.keyboard.press('End');
ok(await p.isVisible('#panel-linea-contenidos'), 'End lleva a la última pestaña');
const acc = p.locator('#faq-b0');
await acc.click();
ok(await acc.getAttribute('aria-expanded') === 'true', 'acordeón se abre (aria-expanded)');
await p.locator('.cifra__valor').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(2200);
ok((await p.locator('[data-contador="120"]').textContent()) === '+120', 'contador llega a la cifra real');
ok(await p.locator('.flotante--whatsapp').isHidden(), 'WhatsApp oculto mientras el número esté pendiente');
ok(await p.evaluate(() => [...document.querySelectorAll('[data-gl]:not([data-gl-modo])')].every(e => {
  const v = e.getAttribute('data-gl').split('.').reduce((o, k) => (o ? o[k] : ''), window.GL_CONFIG) || '';
  const valido = typeof v === 'string' && v.trim() !== '' && !v.includes('PENDIENTE');
  return valido ? !e.hidden : e.hidden;
})), 'datos completos visibles y vacíos o [PENDIENTE] ocultos');
ok(await p.locator('[data-gl="telefono"]:visible').count() === 0, 'no se publica ningún teléfono');
ok(!(await p.content()).includes('PENDIENTE'), 'ningún "[PENDIENTE]" en el HTML');
ok(await p.locator('h1').count() === 1, 'un solo H1');
await p.close();

// --- Móvil
p = await b.newPage({ viewport: { width: 360, height: 760 } });
await p.goto(B + '/', { waitUntil: 'networkidle' });
console.log('Móvil');
await p.click('[data-abrir-menu]');
ok(await p.isVisible('#menu-movil'), 'menú móvil se abre');
ok(await p.evaluate(() => document.activeElement.hasAttribute('data-cerrar-menu')), 'foco en "Cerrar menú"');
await p.keyboard.press('Shift+Tab');
ok(await p.evaluate(() => document.getElementById('menu-movil').contains(document.activeElement)), 'foco atrapado dentro del menú');
await p.keyboard.press('Escape');
ok(!(await p.isVisible('#menu-movil')), 'Escape cierra el menú móvil');
const pequenos = await p.evaluate(() => [...document.querySelectorAll('a, button, input, select, textarea')].filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && s.visibility !== 'hidden' && (r.height < 24 || r.width < 24) && !e.closest('.trampa') && !e.closest('label') && !e.closest('p, li span'); }).map(e => e.outerHTML.slice(0, 70)));
ok(pequenos.length === 0, 'áreas táctiles suficientes ' + (pequenos.length ? JSON.stringify(pequenos.slice(0, 5)) : ''));
await p.close();

// --- Portafolio
p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto(B + '/productos/', { waitUntil: 'networkidle' });
console.log('Portafolio');
await p.click('[data-filtro="programacion"]'); await p.waitForTimeout(700);
ok(await p.locator('.tarjeta-solucion:visible').count() === 3, 'filtro Programación deja 3 productos');
ok((await p.textContent('#resultado-filtro')).includes('3 productos'), 'resultado anunciado por aria-live');
ok(await p.getAttribute('[data-filtro="programacion"]', 'aria-pressed') === 'true', 'aria-pressed en el filtro activo');
await p.goto('about:blank'); await p.goto(B + '/productos/#gestion', { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
ok(await p.locator('.tarjeta-solucion:visible').count() === 1, 'filtro desde el hash de la URL');
await p.close();

// --- Contacto
p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto(B + '/contacto/?solucion=codexia&plan=Escuela', { waitUntil: 'networkidle' });
console.log('Contacto');
ok(await p.isChecked('#ct-sol-codexia'), 'preselección desde ?solucion=codexia');
ok((await p.inputValue('#ct-mensaje')).includes('plan Escuela') && (await p.inputValue('#ct-motivo')) === 'Compra o cotización de licencias', 'plan y motivo prellenados desde la URL');
await p.click('form [type=submit]');
ok(await p.locator('[aria-invalid="true"]').count() >= 7, 'errores marcados con aria-invalid');
ok(await p.evaluate(() => document.activeElement.id) === 'ct-nombre', 'foco en el primer campo con error');
ok((await p.textContent('.formulario__estado')).includes('campos marcados'), 'resumen de errores anunciado');
await p.fill('#ct-correo', 'no-es-correo'); await p.locator('#ct-correo').blur();
ok((await p.textContent('#ct-correo-error')).includes('correo válido'), 'mensaje de correo inválido');
await p.fill('#ct-nombre', 'Ana Pérez'); await p.selectOption('#ct-cargo', 'Rector/a'); await p.selectOption('#ct-motivo', 'Soporte técnico');
await p.fill('#ct-institucion', 'Colegio de prueba'); await p.selectOption('#ct-pais', 'Colombia');
await p.fill('#ct-ciudad', 'Lima'); await p.fill('#ct-correo', 'ana@colegio.edu.co'); await p.fill('#ct-telefono', '+57 300 123 4567');
await p.check('#ct-acepta'); await p.click('form [type=submit]'); await p.waitForTimeout(300);
ok((await p.textContent('.formulario__estado')).includes('no está disponible'), 'sin endpoint configurado: estado de error claro');
await p.close();

// --- Movimiento reducido
p = await b.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
await p.goto(B + '/productos/unticloud/', { waitUntil: 'networkidle' });
console.log('Movimiento reducido');
ok(await p.evaluate(() => [...document.querySelectorAll('[data-aparecer]')].every(e => getComputedStyle(e).opacity === '1')), 'todo el contenido visible sin animación');
await p.close();

await b.close();
console.log(fallos ? `\n${fallos} prueba(s) fallida(s)` : '\nTodas las pruebas pasaron');
process.exit(fallos ? 1 : 0);
