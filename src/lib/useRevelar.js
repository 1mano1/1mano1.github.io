import { useEffect, useRef, useState } from 'react'

/**
 * Revela un elemento cuando entra en pantalla.
 *
 * En Figma cada seccion es un componente con los estados Oculta y Visible
 * (contenido 40px mas abajo y opacidad 0 -> posicion final y opacidad 1,
 * SMART_ANIMATE 700ms EASE_OUT). Figma no tiene disparador de scroll, asi
 * que usaba un temporizador; en la web lo correcto es el scroll.
 *
 * Devuelve [ref, visible]. Una vez revelado ya no se vuelve a ocultar.
 */
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

/**
 * Props para un bloque que se revela: revelado(visible, 'mi-clase', 120).
 *
 * La clase base va dentro a proposito. Si se deja fuera como className y
 * luego se hace spread de esto, el spread la pisa y el bloque pierde su
 * maquetacion sin que nada falle a gritos.
 */
export function revelado(visible, clase = '', retraso = 0) {
  return {
    className: [clase, 'revelar', visible ? 'es-visible' : ''].filter(Boolean).join(' '),
    style: retraso ? { '--retraso': `${retraso}ms` } : undefined,
  }
}
