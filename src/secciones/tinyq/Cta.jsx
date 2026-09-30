import { Link } from 'react-router-dom'

import { REPO } from '../../data/octuma'
import Flecha from '../Flecha'
import { useTextos } from '../../lib/idioma'
import { revelado, useRevelar } from '../../lib/useRevelar'

const TEXTOS = {
  es: {
    titulo: '¿Te sirvió? Dale una estrella.',
    bajada: 'Los issues y pull requests son bienvenidos.',
    star: 'Star en GitHub',
    volver: 'Volver al portafolio',
    licencia: 'Octuma · Licencia MIT',
    hecho: 'Hecho por Imanol Rodríguez',
  },
  en: {
    titulo: 'Found it useful? Give it a star.',
    bajada: 'Issues and pull requests are welcome.',
    star: 'Star on GitHub',
    volver: 'Back to portfolio',
    licencia: 'Octuma · MIT License',
    hecho: 'Made by Imanol Rodríguez',
  },
}

export default function Cta() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <footer className="ctatq" ref={ref}>
      <div className="contenedor ctatq__interior">
        <div {...revelado(visible, 'ctatq__bloque')}>
          <h2 className="ctatq__titulo">{t.titulo}</h2>
          <p className="ctatq__bajada">{t.bajada}</p>
          <div className="ctatq__botones">
            <a
              className="boton boton--tinta ctatq__boton"
              href={REPO}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">★</span> {t.star}
            </a>
            <Link className="boton boton--secundario ctatq__boton" to="/">
              <Flecha izquierda /> {t.volver}
            </Link>
          </div>
        </div>

        <div {...revelado(visible, 'ctatq__pie', 120)}>
          <span>{t.licencia}</span>
          <span>{t.hecho}</span>
        </div>
      </div>
    </footer>
  )
}
