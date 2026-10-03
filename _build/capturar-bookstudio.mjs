// Captura del editor de BookStudio usando su modo de prueba sin registro.
// Crea un libro de prueba, aplica la plantilla "Mapa del cuento" y toma la captura (1440×900).
import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://bookstudio.uk/', { waitUntil: 'networkidle' });
await p.getByText('Probar sin registrarse').first().click();
await p.waitForURL('**/dashboard');
await p.waitForTimeout(1500);
await p.getByPlaceholder('Título del libro').fill('El ciclo del agua');
await p.getByRole('button', { name: 'Crear libro' }).click();
await p.waitForURL('**/edit');
await p.waitForTimeout(3000);
await p.getByRole('button', { name: 'Plantillas' }).click();
await p.waitForTimeout(2000);
await p.getByText('Mapa del cuento', { exact: true }).last().click();
await p.waitForTimeout(3000);
const cerrar = p.getByRole('button', { name: 'Cerrar' });
if (await cerrar.isVisible().catch(() => false)) await cerrar.click();
await p.waitForTimeout(1500);
await p.mouse.click(1300, 500); // quitar la selección del lienzo
await p.waitForTimeout(800);
await p.screenshot({ path: 'capturas/final/bookstudio-editor.png' });
await b.close();
console.log('bookstudio-editor ok');
