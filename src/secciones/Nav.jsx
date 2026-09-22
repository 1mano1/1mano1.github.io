import { useEffect, useState } from 'react'

/**
 * Logo: caja de 28 con cuatro cuadritos de 6. Coordenadas literales de
 * Figma 19:6 — el primero es azul y el ultimo tiene el radio mas grande.
 *
 * Va en un viewBox y no en divs con porcentajes: el padding en % se
 * resuelve contra el ancho del padre, no contra el del propio logo.
 */
export function Logo({ className = '' }) {
  return (
    <svg className={`logo ${className}`} viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <rect width="28" height="28" rx="8" fill="var(--tinta)" />
      <rect x="6" y="6" width="6" height="6" rx="1.5" fill="var(--azul)" />
      <rect x="16" y="6" width="6" height="6" rx="1.5" fill="var(--blanco)" />
      <rect x="6" y="16" width="6" height="6" rx="1.5" fill="var(--blanco)" />
      <rect x="16" y="16" width="6" height="6" rx="3" fill="var(--blanco)" />
    </svg>
  )
}

const ENLACES = [
  { texto: 'Áreas', href: '#areas' },
  { texto: 'Open source', href: '#open-source' },
  { texto: 'Proyectos', href: '#proyectos' },
  /* El Figma lo llama "Stack" pero apunta a la seccion de diseño, que es la
     que existe: no hay ninguna de stack. */
  { texto: 'Diseño', href: '#diseno' },
  { texto: 'Contacto', href: '#contacto' },
]

export default function Nav() {
  const [abierto, setAbierto] = useState(false)
  const [desplazado, setDesplazado] = useState(false)

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

        <nav className="nav__enlaces" aria-label="Secciones">
          {ENLACES.map((e) => (
            <a key={e.href} className="nav__enlace" href={e.href}>
              {e.texto}
            </a>
          ))}
        </nav>

        <a className="boton boton--tinta nav__cta" href="#contacto">
          Contáctame
        </a>

        <button
          className="nav__menu"
          type="button"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((v) => !v)}
        >
          <span className={`nav__raya ${abierto ? 'nav__raya--uno' : ''}`} />
          <span className={`nav__raya ${abierto ? 'nav__raya--dos' : ''}`} />
        </button>
      </div>

      <div
        id="menu-movil"
        className={`nav__panel ${abierto ? 'nav__panel--abierto' : ''}`}
        hidden={!abierto}
      >
        {ENLACES.map((e) => (
          <a key={e.href} className="nav__panel-enlace" href={e.href} onClick={() => setAbierto(false)}>
            {e.texto}
          </a>
        ))}
        <a
          className="boton boton--primario nav__panel-cta"
          href="#contacto"
          onClick={() => setAbierto(false)}
        >
          Contáctame
        </a>
      </div>
    </header>
  )
}
