import { revelado, useRevelar } from '../../lib/useRevelar'
import BotonCopiar from './BotonCopiar'

const CHIPS = ['0.1.0', 'MIT', 'GPTQ + AWQ', 'GGUF · .tq']
const COMANDO = 'tinyq quantize Qwen/Qwen2.5-3B-Instruct'
const REPO = 'https://github.com/1mano1/TinyQ'

/**
 * Hero de tinyq. Figma 49:2175 (desktop) y 196:1466 (movil).
 *
 * El titular dibujado decia "2.6x mas chicos, perdiendo 2.4% de calidad",
 * que son dos modelos distintos: el 2.65x es el 7B (que pierde 1.8%) y el
 * 2.4% es el 3B (que encoge 2.46x). Aqui va el 3B entero, que es el modelo
 * del resto de la pagina: 6.79 GB -> 2.76 GB y 8.347 -> 8.549 de perplejidad
 * (runs/qwen3b__gptq-awq-int4__w20s2048_float16.json).
 */
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
