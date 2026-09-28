import { revelado, useRevelar } from '../../lib/useRevelar'
import BotonCopiar from './BotonCopiar'

/* La version es la de C:/octuma/src/octuma/__init__.py y la que hay en PyPI. */
const CHIPS = ['0.1.3', 'MIT', 'GPTQ + AWQ', 'GGUF · .tq']
const COMANDO = 'octuma quantize Qwen/Qwen2.5-3B-Instruct'
const REPO = 'https://github.com/1mano1/octuma'

/* Hero de Octuma. */
export default function HeroTinyq() {
  const [ref, visible] = useRevelar()

  return (
    <section className="herotq" ref={ref}>
      <div className="contenedor herotq__interior">
        <ul {...revelado(visible, 'herotq__chips')}>
          {CHIPS.map((c) => (
            <li key={c} className="herotq__chip mono">
              {c}
            </li>
          ))}
        </ul>

        <h1 {...revelado(visible, 'herotq__titulo', 60)}>
          Modelos <em>2.5× más chicos</em>, perdiendo 2.4% de calidad.
        </h1>

        <p {...revelado(visible, 'herotq__bajada', 120)}>
          Librería de Python que cuantiza modelos de lenguaje a INT4 e INT8 con GPTQ + AWQ, mide
          cuánta calidad se perdió y exporta a GGUF para llama.cpp y Android, o a .tq para PyTorch.
        </p>

        <div {...revelado(visible, 'herotq__acciones', 180)}>
          <div className="herotq__comando">
            <code className="herotq__linea mono">
              <span className="herotq__signo" aria-hidden="true">
                $
              </span>
              {COMANDO}
            </code>
            <BotonCopiar texto={COMANDO} />
          </div>

          <div className="herotq__botones">
            <a className="boton boton--primario herotq__boton" href={REPO} target="_blank" rel="noreferrer">
              <span className="icono-github herotq__github" aria-hidden="true" />
              Ver en GitHub
            </a>
            <a
              className="boton boton--secundario herotq__boton"
              href={`${REPO}#readme`}
              target="_blank"
              rel="noreferrer"
            >
              Documentación
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
