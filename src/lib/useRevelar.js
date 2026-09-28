import { useEffect, useRef, useState } from 'react'

/* Revela un elemento cuando entra en pantalla. */
export function useRevelar({ margen = '0px 0px -12% 0px', umbral = 0.08 } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    // Sin soporte o con movimiento reducido: se muestra y ya.
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        }
      },
      { rootMargin: margen, threshold: umbral },
    )
    obs.observe(nodo)
    return () => obs.disconnect()
  }, [margen, umbral])

  return [ref, visible]
}

/* Props para un bloque que se revela. */
export function revelado(visible, clase = '', retraso = 0) {
  return {
    className: [clase, 'revelar', visible ? 'es-visible' : ''].filter(Boolean).join(' '),
    style: retraso ? { '--retraso': `${retraso}ms` } : undefined,
  }
}
