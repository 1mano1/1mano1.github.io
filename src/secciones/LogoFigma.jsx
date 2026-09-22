/**
 * Logotipo de Figma: cinco piezas de 6x6 en un lienzo de 12x18 (Figma 42:1984).
 * Cada una lleva sus radios, por eso son paths y no rects.
 *
 * El ancho va por prop porque el diseno lo dibuja a dos tamaños: 12x18 en el
 * boton de la seccion 04 y 18x27 en la tarjeta de la 05.
 */
export default function LogoFigma({ ancho = 12 }) {
  return (
    <svg
      width={ancho}
      height={(ancho * 3) / 2}
      viewBox="0 0 12 18"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 0H6V6H3A3 3 0 0 1 3 0Z" fill="#f24e1e" />
      <path d="M6 0H9A3 3 0 0 1 9 6H6V0Z" fill="#ff7262" />
      <path d="M3 6H6V12H3A3 3 0 0 1 3 6Z" fill="#a259ff" />
      <circle cx="9" cy="9" r="3" fill="#1abcfe" />
      <path d="M3 12H6V15A3 3 0 1 1 3 12Z" fill="#0acf83" />
    </svg>
  )
}
