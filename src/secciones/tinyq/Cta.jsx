import { Link } from 'react-router-dom'

import { revelado, useRevelar } from '../../lib/useRevelar'

/**
 * CTA. Figma 52:2192.
 *
 * Cierra la pagina y hace de pie: en el Figma no hay nada despues, por eso
 * esta seccion lleva la linea de la licencia y la autoria.
 *
 * El boton de Star no dice cuantas hay. La cifra del portafolio ("1.2k")
 * estaba inventada y se quito; aqui no se vuelve a poner una.
 */
const REPO = 'https://github.com/1mano1/TinyQ'

export default function Cta() {
  const [ref, visible] = useRevelar()

  return (
    <footer className="ctatq" ref={ref}>
      <div className="contenedor ctatq__interior">
        <div {...revelado(visible, 'ctatq__bloque')}>
          <h2 className="ctatq__titulo">¿Te sirvió? Dale una estrella.</h2>
          <p className="ctatq__bajada">Los issues y pull requests son bienvenidos.</p>
          <div className="ctatq__botones">
            <a
              className="boton boton--tinta ctatq__boton"
              href={REPO}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">★</span> Star en GitHub
            </a>
            <Link className="boton boton--secundario ctatq__boton" to="/">
              <span aria-hidden="true">←</span> Volver al portafolio
            </Link>
          </div>
        </div>

        <div {...revelado(visible, 'ctatq__pie', 120)}>
          <span>tinyq · MIT License</span>
          <span>Hecho por Imanol Rodríguez</span>
        </div>
      </div>
    </footer>
  )
}
