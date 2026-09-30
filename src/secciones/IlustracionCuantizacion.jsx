import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import datos from '../data/heroIlustracion.json'
import { useIdioma } from '../lib/idioma'
import { textoDibujo } from '../lib/textosDibujos'

/* Ilustracion de cuantizacion del hero (Figma 40:1468, variantes Paso=Inicio y Paso=Cuantizado). */

const LIENZO = 560
const { inicio, cuantizado } = datos
const PIEZAS = cuantizado.piezas
const CELDAS = Object.keys(cuantizado.celdas)
const porNombre = Object.fromEntries(inicio.piezas.map((p) => [p.name, p]))

const px = (v) => `${v}px`
const fam = (f) => (f === 'JetBrains Mono' ? 'var(--mono)' : 'var(--fuente)')

/** La misma pieza en el paso que toque. */
const enPaso = (p, paso) => (paso === 'inicio' ? porNombre[p.name] || p : p)

/* Pinta un descendiente cualquiera de un chip. */
function Nodo({ n }) {
  const { idioma } = useIdioma()
  if (n.type === 'TEXT') {
    return (
      <span
        className="ilus__chip-txt"
        style={{
          opacity: n.opacity,
          color: n.fill,
          fontFamily: fam(n.font),
          fontWeight: n.weight,
          fontSize: px(n.size),
          lineHeight: px(n.lineHeight || n.size * 1.2),
        }}
      >
        {textoDibujo(n.text, idioma)}
      </span>
    )
  }

  if (n.type === 'ELLIPSE') {
    return (
      <span
        className="ilus__punto"
        style={{ opacity: n.opacity, width: px(n.w), height: px(n.h), background: n.fill }}
      />
    )
  }

  const hijos = n.children || []
  return (
    <div className="ilus__grupo" style={{ opacity: n.opacity, gap: px(hueco(hijos, 'y')) }}>
      {hijos.map((h, i) => (
        <Nodo key={i} n={h} />
      ))}
    </div>
  )
}

/** Separacion entre el primer hijo y el segundo, en el eje que se pida. */
function hueco(hijos, eje) {
  if (hijos.length < 2) return 0
  const [a, b] = hijos
  return Math.max(0, b[eje] - (a[eje] + a[eje === 'x' ? 'w' : 'h']))
}

/* El aire que Figma dejo alrededor del contenido del chip. */
function relleno(p) {
  const hijos = p.children || []
  const bordes = (eje, lado) => hijos.map((h) => h[eje] + (lado ? h[eje === 'x' ? 'w' : 'h'] : 0))
  return `${Math.min(...bordes('y'))}px ${p.w - Math.max(...bordes('x', true))}px ${
    p.h - Math.max(...bordes('y', true))
  }px ${Math.min(...bordes('x'))}px`
}

function Pieza({ p, paso }) {
  const s = enPaso(p, paso)
  const { idioma } = useIdioma()

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
        {textoDibujo(p.text, idioma)}
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
    // El chip crece hacia dentro del lienzo.
    const derecha = LIENZO - (s.x + p.w)
    const izquierda = s.x < derecha
    // Las tarjetas de texto se agrandan desde su esquina hacia fuera del dibujo.
    const realce = p.name === 'chip0' ? null : `${izquierda ? 'left' : 'right'} ${s.y < LIENZO / 2 ? 'bottom' : 'top'}`
    return (
      <div
        className={`ilus__chip ${p.name === 'chip0' ? 'ilus__chip--oscuro' : 'ilus__chip--realce'}`}
        style={{
          ...(izquierda ? { left: px(s.x) } : { right: px(derecha) }),
          transformOrigin: realce || undefined,
          top: px(s.y),
          minWidth: px(s.w),
          minHeight: px(s.h),
          padding: relleno(p),
          gap: px(hueco(p.children || [], 'x')),
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
      const escala = ancho / LIENZO
      nodo.style.setProperty('--escala', escala)
      // Las tarjetas crecen un poco mas cuanto mas se encoge el dibujo, con tope.
      nodo.style.setProperty('--realce', Math.min(1.35, Math.max(1.15, 0.8 / escala)))
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
                // Solo las INT4 viajan, y solo a la ida.
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
