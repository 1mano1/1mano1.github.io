import { useLayoutEffect, useRef } from 'react'
import datosPanel from '../data/chipTinyq.json'

/* Ilustracion del chip de Octuma (Figma 27:2). */

const px = (v) => `${v}px`
const fam = (f) => (f === 'JetBrains Mono' ? 'var(--mono)' : 'var(--fuente)')

function Pieza({ p, anclaje }) {
  const base = {
    left: px(p.x),
    top: px(p.y),
    width: px(p.w),
    height: px(p.h),
    opacity: p.opacity,
  }

  // Los rotulos del pie se anclan al borde de lo que se ve, no al del lienzo.
  if (anclaje) {
    delete base.left
    base[anclaje.lado === 'izq' ? 'left' : 'right'] =
      `calc(var(--marco-${anclaje.lado}, 0px) + ${px(anclaje.sangria)})`
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
          // Va como background-image a proposito.
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

/* El punto del dibujo que tiene que quedar en el centro cuando se recorta. */
function foco(datos) {
  const resplandor = datos.piezas.find((p) => p.tipo === 'ELLIPSE')
  return resplandor ? resplandor.x + resplandor.w / 2 : datos.w / 2
}

/* "OPEN SOURCE · MIT" y "15.2 GB -> 5.7 GB · +1.8% de perplejidad" no son parte del dibujo. */
function anclajeDe(p, datos) {
  const resplandor = datos.piezas.find((q) => q.tipo === 'ELLIPSE')
  if (p.tipo !== 'TEXT' || !resplandor) return null
  if (p.x + p.w <= resplandor.x) return { lado: 'izq', sangria: p.x }
  if (p.x >= resplandor.x + resplandor.w) return { lado: 'der', sangria: datos.w - (p.x + p.w) }
  return null
}

export default function ChipTinyq({ datos = datosPanel, className = '' }) {
  const caja = useRef(null)

  useLayoutEffect(() => {
    const nodo = caja.current
    if (!nodo) return
    const medir = () => {
      const { width, height } = nodo.getBoundingClientRect()
      const escala = height / datos.h
      nodo.style.setProperty('--escala', escala)

      // Desplazar solo lo que sobra del recorte.
      const sobra = Math.max(0, (datos.w * escala - width) / 2)
      const pide = (datos.w / 2 - foco(datos)) * escala
      const desplaza = Math.max(-sobra, Math.min(sobra, pide))
      nodo.style.setProperty('--desplaza', `${desplaza}px`)

      // Que trozo del lienzo se esta viendo, en unidades del lienzo.
      const medio = datos.w / 2 - desplaza / escala
      const mitad = width / (2 * escala)
      nodo.style.setProperty('--marco-izq', `${Math.max(0, medio - mitad)}px`)
      nodo.style.setProperty('--marco-der', `${Math.max(0, datos.w - (medio + mitad))}px`)
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(nodo)
    return () => ro.disconnect()
  }, [datos])

  return (
    <div className={`chipq ${className}`} ref={caja}>
      <div
        className="chipq__lienzo"
        style={{ width: px(datos.w), height: px(datos.h), background: datos.fill }}
      >
        {datos.piezas.map((p) => (
          <Pieza key={p.id} p={p} anclaje={anclajeDe(p, datos)} />
        ))}
      </div>
    </div>
  )
}
