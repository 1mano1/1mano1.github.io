import { REPO } from '../../data/octuma'
import Flecha from '../Flecha'
import { useTextos } from '../../lib/idioma'
import { revelado, useRevelar } from '../../lib/useRevelar'
import { IlustracionCalibrar, IlustracionEvaluar, IlustracionGrupos } from './IlustracionesPaso'

/* Cómo funciona. Cada "Saber más" lleva a su seccion del README de su idioma. */
const README_ES = `${REPO}#`
const README_EN = `${REPO}/blob/main/README.en.md#`

const PASOS = [
  { id: 'calibrar', num: '01', Ilustracion: IlustracionCalibrar },
  { id: 'grupos', num: '02', Ilustracion: IlustracionGrupos },
  { id: 'evaluar', num: '03', Ilustracion: IlustracionEvaluar },
]

const TEXTOS = {
  es: {
    rotulo: 'Cómo funciona',
    titulo: 'De 16 bits a 4, en tres pasos',
    intro: [
      'octuma quantize',
      ' calibra y cuantiza de una vez con GPTQ + AWQ, el método que mejor salió en los cuatro modelos medidos. Medir y exportar son dos comandos más.',
    ],
    mas: 'Saber más',
    pasos: {
      calibrar: [
        'Calibrar',
        'Pasa 128 fragmentos de 2048 tokens de wikitext-2 por el modelo y mide qué entradas pesan más en cada capa.',
        `${README_ES}como-funciona`,
      ],
      grupos: [
        'Cuantizar por grupos',
        'Agrupa los pesos de 32 en 32, saca una escala y un punto cero por grupo y redondea cada peso a uno de 16 niveles (4 bits).',
        `${README_ES}por-que-por-grupos-y-asimetrico`,
      ],
      evaluar: [
        'Evaluar y exportar',
        'Mide la perplejidad contra el original y exporta a .gguf para llama.cpp y Android, o a .tq para PyTorch.',
        `${README_ES}android-y-llamacpp`,
      ],
    },
  },
  en: {
    rotulo: 'How it works',
    titulo: 'From 16 bits to 4, in three steps',
    intro: [
      'octuma quantize',
      ' calibrates and quantizes in one go with GPTQ + AWQ, the method that did best across the four models measured. Measuring and exporting are two more commands.',
    ],
    mas: 'Learn more',
    pasos: {
      calibrar: [
        'Calibrate',
        'Runs 128 chunks of 2048 tokens from wikitext-2 through the model and measures which inputs matter most in each layer.',
        `${README_EN}how-it-works`,
      ],
      grupos: [
        'Quantize by groups',
        'Splits the weights into groups of 32, computes a scale and a zero point per group, and rounds each weight to one of 16 levels (4 bits).',
        `${README_EN}why-groups-and-why-asymmetric`,
      ],
      evaluar: [
        'Evaluate and export',
        'Measures perplexity against the original and exports to .gguf for llama.cpp and Android, or to .tq for PyTorch.',
        `${README_EN}android-and-llamacpp`,
      ],
    },
  },
}

export default function ComoFunciona() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="sectq sectq--gris comofunciona" id="como-funciona" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">{t.rotulo}</span>
          <h2 className="sectq__titulo">{t.titulo}</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>
          <span className="mono">{t.intro[0]}</span>
          {t.intro[1]}
        </p>

        <ul className="comofunciona__pasos">
          {PASOS.map((p, i) => {
            const [titulo, que, mas] = t.pasos[p.id]
            return (
              <li key={p.id} {...revelado(visible, 'pasotq', 120 + i * 90)}>
                <div className="pasotq__ilustracion">
                  <p.Ilustracion />
                </div>
                <div className="pasotq__cuerpo">
                  <div className="pasotq__top">
                    <span className="pasotq__num mono">{p.num}</span>
                    <h3 className="pasotq__titulo">{titulo}</h3>
                  </div>
                  <p className="pasotq__que">{que}</p>
                  <a className="pasotq__mas" href={mas}>
                    {t.mas} <Flecha />
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
