import { revelado, useRevelar } from '../../lib/useRevelar'
import { IlustracionCalibrar, IlustracionEvaluar, IlustracionGrupos } from './IlustracionesPaso'

/* Cómo funciona. */
const REPO = 'https://github.com/1mano1/octuma'

const PASOS = [
  {
    id: 'calibrar',
    num: '01',
    titulo: 'Calibrar',
    que: 'Pasa 128 fragmentos de 2048 tokens de wikitext-2 por el modelo y mide qué entradas pesan más en cada capa.',
    mas: `${REPO}#como-funciona`,
    Ilustracion: IlustracionCalibrar,
  },
  {
    id: 'grupos',
    num: '02',
    titulo: 'Cuantizar por grupos',
    que: 'Agrupa los pesos de 32 en 32, saca una escala y un punto cero por grupo y redondea cada peso a uno de 16 niveles (4 bits).',
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
          <h2 className="sectq__titulo">De 16 bits a 4, en tres pasos</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>
          <span className="mono">octuma quantize</span> calibra y cuantiza de una vez con GPTQ + AWQ, el método
          que mejor salió en los cuatro modelos medidos. Medir y exportar son dos comandos más.
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
