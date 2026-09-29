import { Link } from 'react-router-dom'
import ChipTinyq from './ChipTinyq'
import Terminal from './Terminal'
import { revelado, useRevelar } from '../lib/useRevelar'
import { PRUEBAS, PYPI, REPO, VERSION } from '../data/octuma'

/* 02 — Open source. */

const PASOS = [
  { n: '1', titulo: 'Calibra', texto: 'Pasa 128 fragmentos de texto por el modelo para medir cada capa.' },
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
              <span className="panel__ruta mono">1mano1 / octuma</span>
              <span className="panel__licencia mono">MIT</span>
            </div>

            <div className="panel__intro">
              <h3 className="panel__titulo">Octuma</h3>
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
                <li>{PRUEBAS} pruebas</li>
                <li className="mono">
                  <a href={PYPI} target="_blank" rel="noreferrer" title="Versión actual en PyPI">
                    v{VERSION}
                  </a>
                </li>
              </ul>

              <div className="panel__botones">
                <a className="boton boton--repo" href={REPO}>
                  <span className="icono-github" aria-hidden="true" />
                  Ver repositorio
                </a>
                <Link className="boton boton--docs" to="/octuma">
                  Leer documentación
                </Link>
              </div>
            </div>
          </div>

          <Terminal />
        </article>

        <div className="open__otros">
          <div {...revelado(visible, 'open__otros-cabecera', 200)}>
            <h3 className="open__otros-titulo">Otros repositorios</h3>
            <a className="open__todos" href="https://github.com/1mano1">
              Ver todos en GitHub
              <span aria-hidden="true">→</span>
            </a>
          </div>

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
      </div>
    </section>
  )
}
