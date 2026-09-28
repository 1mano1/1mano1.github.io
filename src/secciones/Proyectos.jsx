import { Link } from 'react-router-dom'
import { revelado, useRevelar } from '../lib/useRevelar'

/* 03 — Proyectos. */
const PROYECTO = {
  titulo: 'Octuma App',
  lema: 'IA en tu bolsillo',
  estado: 'En desarrollo',
  texto:
    'App Android que corre dentro del teléfono, sin nube, los modelos cuantizados con Octuma. Los descarga de Hugging Face y los ejecuta con llama.cpp.',
  destino: 'Se publicará en Google Play.',
  chips: ['Flutter', 'llama.cpp', 'Android', 'INT4'],
}

export default function Proyectos() {
  const [ref, visible] = useRevelar()
  const p = PROYECTO

  return (
    <section className="proy" id="proyectos" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'proy__cabecera')}>
          <div className="proy__titulos">
            <p className="rotulo">03 — PROYECTOS</p>
            <h2 className="titulo-seccion">Cosas que he construido</h2>
          </div>
        </div>

        <article {...revelado(visible, 'tarjeta-proy', 80)}>
          <div className="tarjeta-proy__visual">
            <img
              src="/ilustraciones/proyecto-octuma.png"
              alt="Dos teléfonos con Octuma App: la bienvenida con el pulpo del logo y una conversación"
              width="1440"
              height="1080"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="tarjeta-proy__cuerpo">
            <span className="tarjeta-proy__estado mono">{p.estado}</span>
            <h3 className="tarjeta-proy__titulo">
              {p.titulo} <span className="tarjeta-proy__lema">{p.lema}</span>
            </h3>
            <p className="tarjeta-proy__texto">{p.texto}</p>
            <p className="tarjeta-proy__texto">{p.destino}</p>
            <ul className="tarjeta-proy__chips">
              {p.chips.map((c) => (
                <li className="chip-tec mono" key={c}>
                  {c}
                </li>
              ))}
            </ul>
            <div className="tarjeta-proy__enlaces">
              <Link className="boton boton--primario" to="/octuma-app">
                Conocer Octuma App
              </Link>
              <Link className="tarjeta-proy__enlace" to="/octuma">
                Ver la librería
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
