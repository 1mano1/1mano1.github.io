import { revelado, useRevelar } from '../../lib/useRevelar'
import { IlustracionCalibrar, IlustracionEvaluar, IlustracionGrupos } from './IlustracionesPaso'

/**
 * Cómo funciona. Figma 84:6075 (desktop) y 197:1461 (movil).
 *
 * Los tres pasos son los que hace `tinyq quantize` con sus valores por
 * defecto, comprobados en src/tinyq/cli.py: 128 ventanas de 2048 tokens,
 * grupos de 32, metodo gptq con awq encendido.
 *
 * El Figma de desktop dice "de 64 en 64" y el de movil "de 32 en 32". Manda
 * el codigo: `--group` vale 32 desde que el exportador a GGUF lo exige. El
 * barrido de la tabla de mas abajo si se midio con 64, y por eso la seccion
 * de "Que es cuantizar" lo aclara en su linea de procedencia.
 *
 * Los "Saber mas" apuntan a secciones que existen en el README del repo; no
 * hay paginas propias que inventar.
 */
const REPO = 'https://github.com/1mano1/TinyQ'

const PASOS = [
  {
    id: 'calibrar',
    num: '01',
    titulo: 'Calibrar',
    que: 'Pasa 128 ventanas de 2048 tokens de wikitext-2 por el modelo y anota el rango real de activaciones de cada capa.',
    mas: `${REPO}#como-funciona`,
    Ilustracion: IlustracionCalibrar,
  },
  {
    id: 'grupos',
    num: '02',
    titulo: 'Cuantizar por grupos',
    que: 'Agrupa los pesos de 32 en 32, saca escala y punto cero de cada grupo y redondea a uno de 16 niveles (4 bits).',
    mas: `${REPO}#por-que-por-grupos-y-asimetrico`,
    Ilustracion: IlustracionGrupos,
  },
  {
    id: 'evaluar',
    num: '03',
    titulo: 'Evaluar y exportar',
    que: 'Mide la perplejidad contra el original y exporta a .gguf para llama.cpp y Android, o a .tq para PyTorch.',
    mas: `${REPO}#android-y-llamacpp`,
    Ilustracion: IlustracionEvaluar,
  },
]

export default function ComoFunciona() {
  const [ref, visible] = useRevelar()

  return (
    <section className="sectq sectq--gris comofunciona" id="como-funciona" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">Cómo funciona</span>
          <h2 className="sectq__titulo">Tres pasos, un comando</h2>
        </div>

        {/* El Figma dice "con los valores que ganaron el barrido". No es
            exacto: el barrido se corrio con grupos de 64 y la CLI usa 32. Lo
            que si gana en los cuatro modelos es el metodo, y eso es lo que
            queda dicho. */}
        <p {...revelado(visible, 'sectq__intro', 60)}>
          El comando hace los tres pasos seguidos con GPTQ + AWQ, el método que gana el barrido en
          los cuatro modelos medidos. No hay nada que elegir.
        </p>

        <ul className="comofunciona__pasos">
          {PASOS.map((p, i) => (
            <li key={p.id} {...revelado(visible, 'pasotq', 120 + i * 90)}>
              <div className="pasotq__ilustracion">
                <p.Ilustracion />
              </div>
              <div className="pasotq__cuerpo">
                <div className="pasotq__top">
                  <span className="pasotq__num mono">{p.num}</span>
                  <h3 className="pasotq__titulo">{p.titulo}</h3>
                </div>
                <p className="pasotq__que">{p.que}</p>
                <a className="pasotq__mas" href={p.mas}>
                  Saber más <span aria-hidden="true">→</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
