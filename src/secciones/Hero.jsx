import { Link } from 'react-router-dom'
import { revelado, useRevelar } from '../lib/useRevelar'
import IlustracionCuantizacion from './IlustracionCuantizacion'
import { VERSION } from '../data/octuma'

/** Hero. Figma 76:4198 (desktop) y 53:2169 (movil). */
export default function Hero() {
  const [ref, visible] = useRevelar()

  return (
    <section className="hero" id="inicio" ref={ref}>
      <div className="hero__caja contenedor">
        <div {...revelado(visible, 'hero__texto')}>
          <Link className="hero__aviso" to="/octuma">
            <span className="hero__aviso-etiqueta">Nuevo</span>
            <span className="hero__aviso-largo">Octuma v{VERSION}: cuantización INT4 open source →</span>
            <span className="hero__aviso-corto">Octuma v{VERSION} open source →</span>
          </Link>

          <h1 className="hero__titulo">
            {/* En Figma solo van en azul los caracteres 26–45: el punto queda negro. */}
            Backend, IA y modelos que <em>caben en tu bolsillo</em>.
          </h1>

          <p className="hero__bajada hero__bajada--largo">
            Soy Imanol, desarrollador backend con un pie en el frontend. Entreno, cuantizo y
            despliego modelos de machine learning, construyo apps Android y de vez en cuando juegos
            en Roblox.
          </p>
          <p className="hero__bajada hero__bajada--corto">
            Soy Imanol, desarrollador backend con un pie en el frontend. Cuantizo y despliego
            modelos de ML, construyo apps Android y juegos en Roblox.
          </p>

          <div className="hero__botones">
            <a className="boton boton--primario" href="#proyectos">
              Ver proyectos
            </a>
            <a className="boton boton--secundario" href="/cv-imanol-rodriguez.pdf" download>
              Descargar CV
            </a>
          </div>
        </div>

        <div {...revelado(visible, 'hero__ilustracion', 120)}>
          <IlustracionCuantizacion />
        </div>
      </div>
    </section>
  )
}
