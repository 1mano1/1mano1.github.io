import { Link } from 'react-router-dom'
import ChipTinyq from './ChipTinyq'
import Terminal from './Terminal'
import { revelado, useRevelar } from '../lib/useRevelar'

/**
 * 02 — Open source. Figma 73:3272 (desktop) y 54:2896 (movil).
 *
 * Tres bloques debajo de la cabecera: la ilustracion del chip, el panel del
 * proyecto destacado (info + terminal) y la fila de tres repos.
 *
 * Los tres repos del Figma (droid-llm, fastapi-ml-kit, rbx-inventory) no
 * existen, y sus estrellas tampoco: los 21 repos publicos de 1mano1 tienen
 * cero. Aqui van tres de verdad, sin contador. Del panel se cayo el "73% de
 * memoria" (el modelo entero baja 59%, no 73: los que bajan 3.66x son los
 * pesos) y ONNX, que no esta en el codigo.
 */

const PASOS = [
  { n: '1', titulo: 'Calibra', texto: 'Pasa 128 ventanas de texto para ver el rango real de cada capa.' },
  { n: '2', titulo: 'Cuantiza', texto: 'Agrupa los pesos de 32 en 32 y los baja a 4 bits.' },
  {
    n: '3',
    titulo: 'Evalúa',
    texto: 'Mide la perplejidad contra el original y dice cuánto se perdió.',
  },
]

const REPOS = [
  {
    nombre: 'security-audit-lab',
    texto: 'Laboratorio de auditoría de código para la clase de software seguro.',
    lenguaje: 'JavaScript',
    color: '#f1e05a',
  },
  {
    nombre: 'SterenDashboard',
    texto: 'Tablero de riesgos y controles ISO 27001 en React. Proyecto de equipo.',
    lenguaje: 'JavaScript',
    color: '#f1e05a',
  },
  {
    nombre: 'Pieces-Of-The-Mind',
    texto: 'Videojuego en Godot: escenas, mecánicas y arte en un mismo repo.',
    lenguaje: 'GDScript',
    color: '#355570',
  },
]

export default function OpenSource() {
  const [ref, visible] = useRevelar()

  return (
    <section className="open" id="open-source" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'open__cabecera')}>
          <p className="rotulo">02 — OPEN SOURCE</p>
          <h2 className="titulo-seccion">Lo que libero para todos</h2>
        </div>

        <div {...revelado(visible, 'open__chip', 80)}>
          <ChipTinyq />
        </div>

        <article {...revelado(visible, 'panel', 160)}>
          <div className="panel__info">
            <div className="panel__repo">
              <span className="panel__marca">
                <span className="icono-github" aria-hidden="true" />
              </span>
              <span className="panel__ruta mono">1mano1 / TinyQ</span>
              <span className="panel__licencia mono">MIT</span>
            </div>

            <div className="panel__intro">
              <h3 className="panel__titulo">tinyq</h3>
              <p className="panel__texto">
                Librería en Python que cuantiza modelos de lenguaje a 8 y 4 bits con un solo
                comando. Un Qwen de 3B pasa de 6.79 a 2.76 GB perdiendo 2.4% de calidad, y sale
                en GGUF para llama.cpp o para un teléfono Android.
              </p>
            </div>

            <ol className="panel__pasos">
              {PASOS.map((p) => (
                <li className="paso" key={p.n}>
                  <span className="paso__num mono">{p.n}</span>
                  <h4 className="paso__titulo">{p.titulo}</h4>
                  <p className="paso__texto">{p.texto}</p>
                </li>
              ))}
            </ol>

            <div className="panel__pie">
              <ul className="panel__meta">
                <li className="panel__lenguaje">
                  <span className="panel__punto" style={{ background: '#3572a5' }} />
                  Python
                </li>
                <li>60 tests</li>
                <li className="mono">v0.1.0</li>
              </ul>

              <div className="panel__botones">
                <a className="boton boton--repo" href="https://github.com/1mano1/TinyQ">
                  <span className="icono-github" aria-hidden="true" />
                  Ver repositorio
                </a>
                {/* Este si es interno: la pagina de tinyq es lo que explica el
                    proyecto. El README de GitHub ya cuelga del boton de al lado. */}
                <Link className="boton boton--docs" to="/tinyq">
                  Leer documentación
                </Link>
              </div>
            </div>
          </div>

          <Terminal />
        </article>

        <div className="open__repos">
          {REPOS.map((r, i) => (
            <a
              href={`https://github.com/1mano1/${r.nombre}`}
              key={r.nombre}
              {...revelado(visible, 'tarjeta-repo', 240 + i * 80)}
            >
              <span className="tarjeta-repo__cabecera">
                <span className="tarjeta-repo__nombre mono">
                  <span className="icono-github" aria-hidden="true" />
                  {r.nombre}
                </span>
                <span className="icono-enlace" aria-hidden="true" />
              </span>

              <span className="tarjeta-repo__texto">{r.texto}</span>

              <span className="tarjeta-repo__meta">
                <span className="tarjeta-repo__lenguaje">
                  <span className="panel__punto" style={{ background: r.color }} />
                  {r.lenguaje}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
