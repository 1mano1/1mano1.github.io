/**
 * El monograma IR, en un lienzo de 665.4 x 634.2.
 *
 * Los trazos salen de `marca.py`, el script que reconstruyo el logo ajustando
 * rectas y circunferencias al PNG original con precision subpixel en vez de
 * calcar el mapa de bits: el dibujo cubre el 98.3% del original, medido como
 * IoU contra el bitmap. Vive fuera de este repo, en `Portafolio/tools/`,
 * junto con el resto de utilidades de captura y medicion.
 *
 * `barra` es el grosor de la barra vertical, y es tambien la "x" del aire
 * libre: la guia de marca pide 1x por los cuatro lados. De ahi sale sola la
 * caja de cualquier icono cuadrado, sin numeros inventados.
 */
export const MARCA = {
  ancho: 665.4,
  alto: 634.2,
  barra: 120,
  trazos: {
    barra:
      'M16 0L104 0A16 16 0 0 1 120 16L120 618.3A16 16 0 0 1 104 634.3L16 634.3' +
      'A16 16 0 0 1 0 618.3L0 16A16 16 0 0 1 16 0Z',
    r:
      'M161.62 0L415.85 0A211.8 211.8 0 0 1 493.47 408.86C445.98 427.57 373.54 387.56 402.93 429.3' +
      'L540.59 624.79A6 6 0 0 1 535.69 634.24L403.56 634.24A6 6 0 0 1 398.66 631.69' +
      'L216.09 372.44A34 34 0 0 1 243.89 318.86L392.95 318.86A105.6 105.6 0 0 0 436.48 117.05' +
      'L259.29 117.05A6 6 0 0 1 254.89 115.14L157.23 10.09A6 6 0 0 1 161.62 0Z',
    acento: 'M411.73 441.8L529.83 441.8L658.69 624.79A6 6 0 0 1 653.79 634.24L547.25 634.24Z',
  },
}

/**
 * Como colocar la marca dentro de una caja cuadrada de `lado` respetando el
 * aire libre. El ancho manda porque la marca es un poco mas ancha que alta:
 * lado = ancho + 2x, asi que la escala es lado / (ancho + 2 * barra).
 */
export function encajeCuadrado(lado) {
  const escala = lado / (MARCA.ancho + 2 * MARCA.barra)
  return {
    escala,
    x: escala * MARCA.barra,
    y: (lado - escala * MARCA.alto) / 2,
  }
}
