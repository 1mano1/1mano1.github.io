import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { REPO } from '../../data/octuma'
import Flecha from '../Flecha'
import { useTextos } from '../../lib/idioma'
import SelectorIdioma from '../SelectorIdioma'

const DESTINOS = ['#como-funciona', '#benchmarks', '#comparativa', '#comandos']

const TEXTOS = {
  es: {
    enlaces: ['Cómo funciona', 'Benchmarks', 'Comparativa', 'Comandos'],
    portafolio: 'Portafolio',
    secciones: 'Secciones de esta página',
  },
  en: {
    enlaces: ['How it works', 'Benchmarks', 'Comparison', 'Commands'],
    portafolio: 'Portfolio',
    secciones: 'Sections on this page',
  },
}

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
  const t = useTextos(TEXTOS)

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
            <Flecha izquierda />
            {/* El movil dibujado dice "Portafolio" y el desktop el nombre. */}
            <span className="navtq__volver-largo">Imanol Rodríguez</span>
            <span className="navtq__volver-corto">{t.portafolio}</span>
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

        <nav className="navtq__enlaces" aria-label={t.secciones}>
          {DESTINOS.map((href, i) => (
            <a key={href} className="navtq__enlace" href={href}>
              {t.enlaces[i]}
            </a>
          ))}
        </nav>

        <div className="navtq__acciones">
          <span className="navtq__aqui mono" aria-hidden="true">
            octuma
          </span>
          <SelectorIdioma />
          <a className="boton boton--tinta navtq__star" href={REPO} target="_blank" rel="noreferrer">
            <Estrella />
            Star
          </a>
        </div>
      </div>
    </header>
  )
}
