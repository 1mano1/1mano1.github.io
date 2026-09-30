import { Link } from 'react-router-dom'
import { useTextos } from '../lib/idioma'
import { revelado, useRevelar } from '../lib/useRevelar'

/* 03 — Proyectos. */
const CHIPS = ['Flutter', 'llama.cpp', 'Android', 'INT4']

const TEXTOS = {
  es: {
    rotulo: '03 — PROYECTOS',
    seccion: 'Cosas que he construido',
    lema: 'IA en tu bolsillo',
    estado: 'En desarrollo',
    texto:
      'App Android que corre dentro del teléfono, sin nube, los modelos cuantizados con Octuma. Los descarga de Hugging Face y los ejecuta con llama.cpp.',
    destino: 'Se publicará en Google Play.',
    alt: 'Dos teléfonos con Octuma App: la bienvenida con el pulpo del logo y una conversación',
    conocer: 'Conocer Octuma App',
    libreria: 'Ver la librería',
  },
  en: {
    rotulo: '03 — PROJECTS',
    seccion: "Things I've built",
    lema: 'AI in your pocket',
    estado: 'In development',
    texto:
      'An Android app that runs the models quantized with Octuma right on the phone, no cloud. It downloads them from Hugging Face and runs them with llama.cpp.',
    destino: 'It will be published on Google Play.',
    alt: 'Two phones with Octuma App: the welcome screen with the octopus logo, and a conversation',
    conocer: 'Discover Octuma App',
    libreria: 'See the library',
  },
}

export default function Proyectos() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="proy" id="proyectos" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'proy__cabecera')}>
          <div className="proy__titulos">
            <p className="rotulo">{t.rotulo}</p>
            <h2 className="titulo-seccion">{t.seccion}</h2>
          </div>
        </div>

        <article {...revelado(visible, 'tarjeta-proy', 80)}>
          <div className="tarjeta-proy__visual">
            <img
              src="/ilustraciones/proyecto-octuma.png"
              alt={t.alt}
              width="1440"
              height="1080"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="tarjeta-proy__cuerpo">
            <span className="tarjeta-proy__estado mono">{t.estado}</span>
            <h3 className="tarjeta-proy__titulo">
              Octuma App <span className="tarjeta-proy__lema">{t.lema}</span>
            </h3>
            <p className="tarjeta-proy__texto">{t.texto}</p>
            <p className="tarjeta-proy__texto">{t.destino}</p>
            <ul className="tarjeta-proy__chips">
              {CHIPS.map((c) => (
                <li className="chip-tec mono" key={c}>
                  {c}
                </li>
              ))}
            </ul>
            <div className="tarjeta-proy__enlaces">
              <Link className="boton boton--primario" to="/octuma-app">
                {t.conocer}
              </Link>
              <Link className="tarjeta-proy__enlace" to="/octuma">
                {t.libreria}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
