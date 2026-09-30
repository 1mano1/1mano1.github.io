import { Link } from 'react-router-dom'
import { revelado, useRevelar } from '../lib/useRevelar'
import IlustracionCuantizacion from './IlustracionCuantizacion'
import { VERSION } from '../data/octuma'
import { useTextos } from '../lib/idioma'

const TEXTOS = {
  es: {
    nuevo: 'Nuevo',
    avisoLargo: `Octuma v${VERSION}: cuantización INT4 open source →`,
    avisoCorto: `Octuma v${VERSION} open source →`,
    titulo: ['Backend, IA y modelos que ', 'caben en tu bolsillo', '.'],
    largo:
      'Soy Imanol, desarrollador backend con un pie en el frontend. Entreno, cuantizo y despliego modelos de machine learning, construyo apps Android y de vez en cuando juegos en Roblox.',
    corto:
      'Soy Imanol, desarrollador backend con un pie en el frontend. Cuantizo y despliego modelos de ML, construyo apps Android y juegos en Roblox.',
    proyectos: 'Ver proyectos',
    cv: 'Descargar CV',
  },
  en: {
    nuevo: 'New',
    avisoLargo: `Octuma v${VERSION}: open source INT4 quantization →`,
    avisoCorto: `Octuma v${VERSION} open source →`,
    titulo: ['Backend, AI and models that ', 'fit in your pocket', '.'],
    largo:
      "I'm Imanol, a backend developer with one foot in the frontend. I train, quantize and deploy machine learning models, build Android apps and, now and then, Roblox games.",
    corto:
      "I'm Imanol, a backend developer with one foot in the frontend. I quantize and deploy ML models, build Android apps and Roblox games.",
    proyectos: 'See projects',
    cv: 'Download CV',
  },
}

/** Hero. Figma 76:4198 (desktop) y 53:2169 (movil). */
export default function Hero() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="hero" id="inicio" ref={ref}>
      <div className="hero__caja contenedor">
        <div {...revelado(visible, 'hero__texto')}>
          <Link className="hero__aviso" to="/octuma">
            <span className="hero__aviso-etiqueta">{t.nuevo}</span>
            <span className="hero__aviso-largo">{t.avisoLargo}</span>
            <span className="hero__aviso-corto">{t.avisoCorto}</span>
          </Link>

          <h1 className="hero__titulo">
            {/* En Figma solo va en azul la frase del bolsillo: el punto queda negro. */}
            {t.titulo[0]}
            <em>{t.titulo[1]}</em>
            {t.titulo[2]}
          </h1>

          <p className="hero__bajada hero__bajada--largo">{t.largo}</p>
          <p className="hero__bajada hero__bajada--corto">{t.corto}</p>

          <div className="hero__botones">
            <a className="boton boton--primario" href="#proyectos">
              {t.proyectos}
            </a>
            <a className="boton boton--secundario" href="/cv-imanol-rodriguez.pdf" download>
              {t.cv}
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
