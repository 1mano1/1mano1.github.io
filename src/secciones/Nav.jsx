import { useEffect, useState } from 'react'
import { useTextos } from '../lib/idioma'
import { MARCA, encajeCuadrado } from '../lib/marca'
import SelectorIdioma from './SelectorIdioma'

/* La caja de Figma 19:6. */
const CAJA = 28
const RADIO = 8
const { escala, x, y } = encajeCuadrado(CAJA)

export function Logo({ className = '' }) {
  return (
    <svg
      className={`logo ${className}`}
      viewBox={`0 0 ${CAJA} ${CAJA}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width={CAJA} height={CAJA} rx={RADIO} fill="var(--tinta)" />
      <g transform={`translate(${x} ${y}) scale(${escala})`}>
        <path d={MARCA.trazos.barra} fill="var(--blanco)" />
        <path d={MARCA.trazos.r} fill="var(--blanco)" />
        <path d={MARCA.trazos.acento} fill="var(--azul)" />
      </g>
    </svg>
  )
}

/* El Figma llama "Stack" al enlace de diseño, pero apunta a la seccion de diseño, que es la que existe. */
const TEXTOS = {
  es: {
    enlaces: ['Áreas', 'Open source', 'Proyectos', 'Diseño', 'Contacto'],
    secciones: 'Secciones',
    contacto: 'Contáctame',
    abrir: 'Abrir menú',
    cerrar: 'Cerrar menú',
  },
  en: {
    enlaces: ['Areas', 'Open source', 'Projects', 'Design', 'Contact'],
    secciones: 'Sections',
    contacto: 'Contact me',
    abrir: 'Open menu',
    cerrar: 'Close menu',
  },
}
const DESTINOS = ['#areas', '#open-source', '#proyectos', '#diseno', '#contacto']

export default function Nav() {
  const [abierto, setAbierto] = useState(false)
  const [desplazado, setDesplazado] = useState(false)
  const t = useTextos(TEXTOS)
  const enlaces = DESTINOS.map((href, i) => ({ href, texto: t.enlaces[i] }))

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 8)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  // Con el menu abierto no se scrollea el fondo.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  useEffect(() => {
    const alTeclado = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', alTeclado)
    return () => window.removeEventListener('keydown', alTeclado)
  }, [])

  return (
    <header className={`nav ${desplazado ? 'nav--desplazado' : ''}`}>
      <div className="nav__barra contenedor">
        <a className="nav__marca" href="#inicio">
          <Logo />
          <span className="nav__nombre">
            <span className="nav__nombre-largo">Imanol Rodríguez</span>
            <span className="nav__nombre-corto">Imanol R.</span>
          </span>
        </a>

        <nav className="nav__enlaces" aria-label={t.secciones}>
          {enlaces.map((e) => (
            <a key={e.href} className="nav__enlace" href={e.href}>
              {e.texto}
            </a>
          ))}
        </nav>

        <div className="nav__acciones">
          <SelectorIdioma />

          <a className="boton boton--tinta nav__cta" href="#contacto">
            {t.contacto}
          </a>

          <button
            className="nav__menu"
            type="button"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? t.cerrar : t.abrir}
            onClick={() => setAbierto((v) => !v)}
          >
            <span className={`nav__raya ${abierto ? 'nav__raya--uno' : ''}`} />
            <span className={`nav__raya ${abierto ? 'nav__raya--dos' : ''}`} />
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        className={`nav__panel ${abierto ? 'nav__panel--abierto' : ''}`}
        hidden={!abierto}
      >
        {enlaces.map((e) => (
          <a key={e.href} className="nav__panel-enlace" href={e.href} onClick={() => setAbierto(false)}>
            {e.texto}
          </a>
        ))}
        <a
          className="boton boton--primario nav__panel-cta"
          href="#contacto"
          onClick={() => setAbierto(false)}
        >
          {t.contacto}
        </a>
      </div>
    </header>
  )
}
