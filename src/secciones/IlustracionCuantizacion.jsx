import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import datos from '../data/heroIlustracion.json'

/**
 * Ilustracion de cuantizacion del hero (Figma 40:1468, variantes
 * Paso=Inicio y Paso=Cuantizado).
 *
 * Ciclo del prototipo de Figma:
 *   Cuantizado --3.5s--> DISSOLVE 300ms --> Inicio
 *   Inicio     --0.6s--> SMART_ANIMATE 1200ms EASE_IN_AND_OUT --> Cuantizado
 *
 * Las 64 celdas INT4 (i0..i63) nacen encima de la rejilla FP16 y vuelan a la
 * derecha encogiendose de 22 a 16px; la barra INT4 pasa de 464 a 175px y los
 * textos de INT4 aparecen.
 *
 * Los numeros del dibujo (15.2 GB, 5.7 GB, -62%, +1.8%) y el ancho de la
 * barra salen de runs/qwen7b__fp16 y runs/qwen7b__gptq-int4: 175 = 464 x
 * 5.749/15.231. En Figma decian 16 GB, 4.3 GB, -73% y "98.6% de precision",
 * que no es ni una medicion de TinyQ ni de un modelo que se haya corrido.
 *
 * Se dibuja en un lienzo fijo de 560x560 con los valores en px tal cual estan
 * en Figma, y se escala con transform. Es lo mismo que hace el diseno movil,
 * donde la ilustracion mide 320px (= 560 x 0.571).
 */

const LIENZO = 560
const { inicio, cuantizado } = datos
const PIEZAS = cuantizado.piezas
const CELDAS = Object.keys(cuantizado.celdas)
const porNombre = Object.fromEntries(inicio.piezas.map((p) => [p.name, p]))

const px = (v) => `${v}px`
const fam = (f) => (f === 'JetBrains Mono' ? 'var(--mono)' : 'var(--fuente)')

/** La misma pieza en el paso que toque. */
const enPaso = (p, paso) => (paso === 'inicio' ? porNombre[p.name] || p : p)

/**
 * Pinta un descendiente cualquiera de un chip: texto, punto o el frame que
 * los agrupa. Va recursivo porque los chips anidan los dos textos dentro de
 * otro frame, y quedarse en el primer nivel los dejaba en blanco.
 */
function Nodo({ n }) {
  const base = { left: px(n.x), top: px(n.y), opacity: n.opacity }

  if (n.type === 'TEXT') {
    return (
      <span
        className="ilus__chip-txt"
        style={{
          ...base,
          color: n.fill,
          fontFamily: fam(n.font),
          fontWeight: n.weight,
          fontSize: px(n.size),
          lineHeight: px(n.lineHeight || n.size * 1.2),
        }}
      >
        {n.text}
      </span>
    )
  }

  if (n.type === 'ELLIPSE') {
    return (
      <span
        className="ilus__punto"
        style={{ ...base, width: px(n.w), height: px(n.h), background: n.fill }}
      />
    )
  }

  return (
    <div className="ilus__grupo" style={{ ...base, width: px(n.w), height: px(n.h) }}>
      {(n.children || []).map((h, i) => (
        <Nodo key={i} n={h} />
      ))}
    </div>
  )
}

function Pieza({ p, paso }) {
  const s = enPaso(p, paso)

  if (p.type === 'TEXT') {
    return (
      <span
        className="ilus__txt"
        style={{
          left: px(s.x),
          top: px(s.y),
          opacity: s.opacity,
          color: s.fill,
          fontFamily: fam(p.font),
          fontWeight: p.weight,
          fontSize: px(p.size),
          lineHeight: px(p.lineHeight || p.size * 1.2),
        }}
      >
        {p.text}
      </span>
    )
  }

  if (p.name === 'arrow0') {
    return (
      <svg
        className="ilus__flecha"
        viewBox="0 0 52 16"
        style={{ left: px(s.x), top: px(s.y), width: px(s.w), height: px(s.h) }}
        aria-hidden="true"
      >
        <path
          d="M1 8h42M37 2.5 42.5 8 37 13.5"
          fill="none"
          stroke="var(--azul)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (p.name.startsWith('chip')) {
    return (
      <div
        className={`ilus__chip ${p.name === 'chip0' ? 'ilus__chip--oscuro' : ''}`}
        style={{
          left: px(s.x),
          top: px(s.y),
          width: px(s.w),
          height: px(s.h),
          opacity: s.opacity,
          background: s.fill,
          borderRadius: px(p.radius || 12),
          border: p.stroke ? `${p.strokeWidth || 1}px solid ${p.stroke}` : undefined,
          boxShadow: p.shadow,
        }}
      >
        {(p.children || []).map((h, i) => (
          <Nodo key={i} n={h} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="ilus__rect"
      style={{
        left: px(s.x),
        top: px(s.y),
        width: px(s.w),
        height: px(s.h),
        opacity: s.opacity,
        background: s.fill,
        borderRadius: px(p.radius || 0),
      }}
    />
  )
}

export default function IlustracionCuantizacion() {
  const [paso, setPaso] = useState('cuantizado')
  const [enPantalla, setEnPantalla] = useState(false)
  const caja = useRef(null)

  // Escala el lienzo de 560px al ancho real del hueco.
  useLayoutEffect(() => {
    const nodo = caja.current
    if (!nodo) return
    const medir = () => {
      const ancho = nodo.getBoundingClientRect().width
      nodo.style.setProperty('--escala', ancho / LIENZO)
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(nodo)
    return () => ro.disconnect()
  }, [])

  // Solo anima mientras se ve.
  useEffect(() => {
    const nodo = caja.current
    if (!nodo || typeof IntersectionObserver === 'undefined') {
      setEnPantalla(true)
      return
    }
    const obs = new IntersectionObserver((e) => setEnPantalla(e[0].isIntersecting), {
      threshold: 0.2,
    })
    obs.observe(nodo)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || !enPantalla) return
    // 3.5s mostrando el resultado, 0.6s de respiro tras volver al inicio.
    const espera = paso === 'cuantizado' ? 3500 : 600
    const t = setTimeout(() => setPaso(paso === 'cuantizado' ? 'inicio' : 'cuantizado'), espera)
    return () => clearTimeout(t)
  }, [paso, enPantalla])

  return (
    <div className="ilus" ref={caja} data-paso={paso}>
      <div className="ilus__lienzo">
        {PIEZAS.map((p) => (
          <Pieza key={p.name} p={p} paso={paso} />
        ))}

        {CELDAS.map((nombre) => {
          const c = paso === 'inicio' ? inicio.celdas[nombre] : cuantizado.celdas[nombre]
          const esInt4 = nombre.startsWith('i')
          return (
            <div
              key={nombre}
              className="ilus__celda"
              style={{
                left: px(c.x),
                top: px(c.y),
                width: px(c.w),
                height: px(c.h),
                background: c.color,
                borderRadius: px(c.radius || 4),
                opacity: c.opacity,
                // Solo las INT4 viajan, y solo a la ida: la vuelta al inicio
                // es un DISSOLVE en el prototipo, no mueve nada. Animandola
                // tambien 1200ms se quedaba a mitad de camino y se devolvia,
                // porque en inicio solo se esta 600ms.
                transitionDuration: esInt4 && paso === 'cuantizado' ? '1200ms' : '0ms',
              }}
            >
              <span className="ilus__brillo" style={{ borderRadius: px(c.radius || 4) }} />
              {c.valor && <span className="ilus__tip">{c.valor}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
