import sharp from 'sharp';
const [,, archivo, alto = '1800'] = process.argv;
const m = await sharp(archivo).metadata();
const h = +alto; let i = 0;
for (let y = 0; y < m.height; y += h, i++) {
  await sharp(archivo).extract({ left: 0, top: y, width: m.width, height: Math.min(h, m.height - y) })
    .resize({ width: Math.min(m.width, 1000) }).toFile(archivo.replace('.png', `-${i}.png`));
}
console.log(i, 'tramos');
