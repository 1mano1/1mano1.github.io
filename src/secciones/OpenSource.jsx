import { Link } from 'react-router-dom'
import ChipTinyq from './ChipTinyq'
import Flecha from './Flecha'
import Terminal from './Terminal'
import { useTextos } from '../lib/idioma'
import { revelado, useRevelar } from '../lib/useRevelar'
import { PRUEBAS, PYPI, REPO, VERSION } from '../data/octuma'

/* 02 — Open source. */

const REPOS = [
  { nombre: 'security-audit-lab', lenguaje: 'JavaScript', color: '#f1e05a' },
  { nombre: 'SterenDashboard', lenguaje: 'JavaScript', color: '#f1e05a' },
  { nombre: 'Pieces-Of-The-Mind', lenguaje: 'GDScript', color: '#355570' },
]

const TEXTOS = {
  es: {
    rotulo: '02 — OPEN SOURCE',
    titulo: 'Lo que libero para todos',
    texto:
      'Librería en Python que cuantiza modelos de lenguaje a 8 y 4 bits con un solo comando. Un Qwen de 3B pasa de 6.79 a 2.76 GB perdiendo 2.4% de calidad, y sale en GGUF para llama.cpp o para un teléfono Android.',
    pasos: [
      ['Calibra', 'Pasa 128 fragmentos de texto por el modelo para medir cada capa.'],
      ['Cuantiza', 'Agrupa los pesos de 32 en 32 y los baja a 4 bits.'],
      ['Evalúa', 'Mide la perplejidad contra el original y dice cuánto se perdió.'],
    ],
    pruebas: `${PRUEBAS} pruebas`,
    versionActual: 'Versión actual en PyPI',
    repo: 'Ver repositorio',
    docs: 'Leer documentación',
    otros: 'Otros repositorios',
    todos: 'Ver todos en GitHub',
    repos: [
      'Laboratorio de auditoría de código para la clase de software seguro.',
      'Tablero de riesgos y controles ISO 27001 en React. Proyecto de equipo.',
      'Videojuego en Godot: escenas, mecánicas y arte en un mismo repo.',
    ],
  },
  en: {
    rotulo: '02 — OPEN SOURCE',
    titulo: 'What I share with everyone',
    texto:
      'A Python library that quantizes language models to 8 and 4 bits with a single command. A 3B Qwen goes from 6.79 to 2.76 GB while losing 2.4% of quality, and comes out as GGUF for llama.cpp or an Android phone.',
    pasos: [
      ['Calibrate', 'Runs 128 chunks of text through the model to measure each layer.'],
      ['Quantize', 'Splits the weights into groups of 32 and brings them down to 4 bits.'],
      ['Evaluate', 'Measures perplexity against the original and tells you how much was lost.'],
    ],
    pruebas: `${PRUEBAS} tests`,
    versionActual: 'Current version on PyPI',
    repo: 'View repository',
    docs: 'Read the docs',
    otros: 'Other repositories',
    todos: 'See all on GitHub',
    repos: [
      'Code auditing lab for the secure software class.',
      'Risk and ISO 27001 controls dashboard in React. Team project.',
      'Godot video game: scenes, mechanics and art in one repo.',
    ],
  },
}

export default function OpenSource() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="open" id="open-source" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'open__cabecera')}>
          <p className="rotulo">{t.rotulo}</p>
          <h2 className="titulo-seccion">{t.titulo}</h2>
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
              <p className="panel__texto">{t.texto}</p>
            </div>

            <ol className="panel__pasos">
              {t.pasos.map(([titulo, texto], i) => (
                <li className="paso" key={i}>
                  <span className="paso__num mono">{i + 1}</span>
                  <h4 className="paso__titulo">{titulo}</h4>
                  <p className="paso__texto">{texto}</p>
                </li>
              ))}
            </ol>

            <div className="panel__pie">
              <ul className="panel__meta">
                <li className="panel__lenguaje">
                  <span className="panel__punto" style={{ background: '#3572a5' }} />
                  Python
                </li>
                <li>{t.pruebas}</li>
                <li className="mono">
                  <a href={PYPI} target="_blank" rel="noreferrer" title={t.versionActual}>
                    v{VERSION}
                  </a>
                </li>
              </ul>

              <div className="panel__botones">
                <a className="boton boton--repo" href={REPO}>
                  <span className="icono-github" aria-hidden="true" />
                  {t.repo}
                </a>
                <Link className="boton boton--docs" to="/octuma">
                  {t.docs}
                </Link>
              </div>
            </div>
          </div>

          <Terminal />
        </article>

        <div className="open__otros">
          <div {...revelado(visible, 'open__otros-cabecera', 200)}>
            <h3 className="open__otros-titulo">{t.otros}</h3>
            <a className="open__todos" href="https://github.com/1mano1">
              {t.todos}
              <Flecha />
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

                <span className="tarjeta-repo__texto">{t.repos[i]}</span>

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
