/* Flecha de los enlaces; toma el color del texto. */
export default function Flecha({ izquierda = false, tamano = 14 }) {
  return (
    <svg
      className="flecha"
      width={tamano}
      height={tamano}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={izquierda ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
