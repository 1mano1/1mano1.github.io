import { useLayoutEffect, useRef } from 'react'
import datosPanel from '../data/chipTinyq.json'

/**
 * Ilustracion del chip de tinyq (Figma 27:2).
 *
 * Son 50 rectangulos colocados a mano sobre un lienzo de 1228x460, asi que
 * se pintan tal cual y se escala todo con transform, igual que hace el
 * diseno movil: ahi el mismo dibujo va a 0.4131 dentro de una caja de
 * 320x190 y lo que sobra a los lados se recorta.
 *
 * La escala se calcula por ALTO, no por ancho: en movil el alto es lo que
 * manda y el dibujo se sale por los costados a proposito.
 *
 * `datos` elige el lienzo: el panel del portafolio usa el de 1228 y la
 * pagina de tinyq el de 1300 (Figma 49:2199), que es el mismo dibujo con
 * los bloques de la derecha espejados para que llene el ancho.
 */

const px = (v) => `${v}px`
const fam = (f) => (f === 'JetBrains Mono' ? 'var(--mono)' : 'var(--fuente)')

function Pieza({ p }) {
  const base = {
    left: px(p.x),
    top: px(p.y),
    width: px(p.w),
    height: px(p.h),
    opacity: p.opacity,
  }

  if (p.tipo === 'TEXT') {
    const degradado = p.fill?.startsWith('linear-gradient')
    return (
      <span
        className={`chipq__txt ${degradado ? 'chipq__txt--degradado' : ''}`}
        style={{
          ...base,
          width: 'auto',
          height: 'auto',
          // Va como background-image a proposito: el atajo `background`
          // reinicia background-clip y el texto saldria como un bloque.
          backgroundImage: degradado ? p.fill : undefined,
          color: degradado ? undefined : p.fill,
          fontFamily: fam(p.font),
          fontWeight: p.weight,
          fontSize: px(p.size),
          lineHeight: px(p.lineHeight || p.size * 1.2),
          letterSpacing: p.ls ? px(p.ls) : undefined,
        }}
      >
        {p.text}
      </span>
    )
  }

  return (
    <span
      className="chipq__pieza"
      style={{
        ...base,
        background: p.fill,
        borderRadius: p.tipo === 'ELLIPSE' ? '50%' : px(p.radius || 0),
        border: p.stroke ? `${p.strokeWidth || 1}px solid ${p.stroke}` : undefined,
        boxShadow: p.shadow,
        filter: p.blur,
      }}
    />
  )
}

export default function ChipTinyq({ datos = datosPanel, className = '' }) {
  const caja = useRef(null)

  useLayoutEffect(() => {
    const nodo = caja.current
    if (!nodo) return
    const medir = () => {
      const { height } = nodo.getBoundingClientRect()
      nodo.style.setProperty('--escala', height / datos.h)
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(nodo)
    return () => ro.disconnect()
  }, [datos.h])

  return (
    <div className={`chipq ${className}`} ref={caja}>
      <div
        className="chipq__lienzo"
        style={{ width: px(datos.w), height: px(datos.h), background: datos.fill }}
      >
        {datos.piezas.map((p) => (
          <Pieza key={p.id} p={p} />
        ))}
      </div>
    </div>
  )
}
