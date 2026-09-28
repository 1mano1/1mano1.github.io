import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ENLACES = [
  { texto: 'Cómo funciona', href: '#como-funciona' },
  { texto: 'Benchmarks', href: '#benchmarks' },
  { texto: 'Comparativa', href: '#comparativa' },
  { texto: 'Comandos', href: '#comandos' },
]

/** Estrella del boton de GitHub. Figma 206:7809. */
function Estrella() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.12 6.57L12 17.26l-5.9 3.1 1.12-6.57L2.45 9.14l6.6-.96z"
        fill="currentColor"
      />
    </svg>
  )
}

/* Nav de la pagina de Octuma. */
export default function NavTinyq() {
  const [desplazado, setDesplazado] = useState(false)

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 8)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  return (
    <header className={`navtq ${desplazado ? 'navtq--desplazado' : ''}`}>
      <div className="navtq__barra contenedor">
        <div className="navtq__miga">
          <Link className="navtq__volver" to="/">
            <span aria-hidden="true">←</span>
            {/* El movil dibujado dice "Portafolio" y el desktop el nombre. */}
            <span className="navtq__volver-largo">Imanol Rodríguez</span>
            <span className="navtq__volver-corto">Portafolio</span>
          </Link>
          <span className="navtq__separador" aria-hidden="true">
            /
          </span>
          <Link className="navtq__padre" to="/#open-source">
            Open source
          </Link>
          <span className="navtq__separador" aria-hidden="true">
            /
          </span>
          <span className="navtq__actual" aria-current="page">
            Octuma
          </span>
        </div>

        <span className="navtq__aqui mono" aria-hidden="true">
          octuma
        </span>

        <nav className="navtq__enlaces" aria-label="Secciones de esta página">
          {ENLACES.map((e) => (
            <a key={e.href} className="navtq__enlace" href={e.href}>
              {e.texto}
            </a>
          ))}
        </nav>

        <a
          className="boton boton--tinta navtq__star"
          href="https://github.com/1mano1/octuma"
          target="_blank"
          rel="noreferrer"
        >
          <Estrella />
          Star
        </a>
      </div>
    </header>
  )
}
