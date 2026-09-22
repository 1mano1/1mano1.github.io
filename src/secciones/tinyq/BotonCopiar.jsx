import { useEffect, useRef, useState } from 'react'

/**
 * Boton de copiar de la pagina de tinyq. Figma 204:6002 (icono) y 209:6424.
 *
 * Sale cinco veces —el comando del hero y los cuatro de la seccion de
 * comandos—, asi que vive aparte. Si el navegador no deja escribir en el
 * portapapeles (pasa fuera de https) el boton lo dice en vez de quedarse
 * callado fingiendo que copio.
 */
export default function BotonCopiar({ texto, className = '' }) {
  const [estado, setEstado] = useState('listo')
  const reloj = useRef(null)

  useEffect(() => () => clearTimeout(reloj.current), [])

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto)
      setEstado('copiado')
    } catch {
      setEstado('error')
    }
    clearTimeout(reloj.current)
    reloj.current = setTimeout(() => setEstado('listo'), 2000)
  }

  return (
    <button
      className={`copiar ${className}`}
      type="button"
      onClick={copiar}
      aria-label={`Copiar: ${texto}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect
          x="0.65"
          y="3.65"
          width="7.7"
          height="9.7"
          rx="1.85"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="4.65"
          y="0.65"
          width="8.7"
          height="9.7"
          rx="1.85"
          fill="var(--blanco)"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
      <span className="copiar__texto">
        {estado === 'copiado' ? 'Copiado' : estado === 'error' ? 'Copia a mano' : 'Copiar'}
      </span>
    </button>
  )
}
