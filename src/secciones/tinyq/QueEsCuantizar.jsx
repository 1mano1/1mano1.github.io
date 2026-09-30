import { useTextos } from '../../lib/idioma'
import { revelado, useRevelar } from '../../lib/useRevelar'

/* Que es cuantizar. Bytes de runs/qwen3b__*.json. */
const FORMATOS = [
  { id: 'fp16', bytes: 6793908224, etiqueta: 'FP16' },
  { id: 'int8', bytes: 4149432320, etiqueta: 'INT8' },
  { id: 'int4', bytes: 2762166272, etiqueta: 'INT4' },
]

const TEXTOS = {
  es: {
    rotulo: 'Qué es cuantizar',
    titulo: 'Los mismos pesos, en menos bits',
    intro:
      'Cada peso de un modelo se guarda en 16 bits. Cuantizar es reescribir esos mismos pesos en 8 o en 4 bits, para que el modelo ocupe menos y quepa donde antes no cabía. Siempre se pierde algo de precisión; lo que importa es cuánta.',
    formatos: {
      fp16: ['16 bits por peso', 'El modelo como sale de fábrica. Es el punto de comparación de todo lo demás.'],
      int8: ['8 bits por peso', 'Casi sin pérdida: como mucho, 0.03% de perplejidad.'],
      int4: ['4 bits por peso', 'Solo 16 valores posibles por peso, con una escala cada 32 pesos. Aquí el método decide la calidad.'],
    },
    fuente: 'Memoria de Qwen2.5 3B en cada formato, medida con grupos de 64.',
    nota:
      'Entre más grande el modelo, menos duele cuantizarlo. Con el mejor método, el de 7B pierde 1.8% de perplejidad y el de 0.5B pierde 5.2%. El orden de los métodos es idéntico en los cuatro tamaños medidos.',
  },
  en: {
    rotulo: 'What quantization is',
    titulo: 'Same weights, fewer bits',
    intro:
      "Every weight in a model is stored in 16 bits. Quantizing rewrites those same weights in 8 or 4 bits, so the model takes less memory and fits where it didn't before. Some precision is always lost; what matters is how much.",
    formatos: {
      fp16: ['16 bits per weight', 'The model as it ships. Everything else is compared against it.'],
      int8: ['8 bits per weight', 'Almost lossless: 0.03% perplexity at most.'],
      int4: ['4 bits per weight', 'Only 16 possible values per weight, with one scale every 32 weights. This is where the method decides the quality.'],
    },
    fuente: 'Qwen2.5 3B memory in each format, measured with groups of 64.',
    nota:
      'The bigger the model, the less quantization hurts. With the best method, the 7B loses 1.8% perplexity and the 0.5B loses 5.2%. The ranking of methods is the same across all four sizes measured.',
  },
}

const gb = (bytes) => bytes / 1e9
const MAYOR = FORMATOS[0].bytes

export default function QueEsCuantizar() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="sectq quees" id="que-es" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">{t.rotulo}</span>
          <h2 className="sectq__titulo">{t.titulo}</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>{t.intro}</p>

        <div className="quees__formatos">
          <ul className="quees__tarjetas">
            {FORMATOS.map((f, i) => {
              const [bits, que] = t.formatos[f.id]
              return (
                <li key={f.id} {...revelado(visible, `quees__tarjeta quees__tarjeta--${f.id}`, 120 + i * 80)}>
                  <div className="quees__fila">
                    <span className="quees__etiqueta mono">{f.etiqueta}</span>
                    <p className="quees__cifra">{gb(f.bytes).toFixed(1)} GB</p>
                  </div>
                  <div className="quees__barra">
                    <div className="quees__relleno" style={{ width: `${(f.bytes / MAYOR) * 100}%` }} />
                  </div>
                  <span className="quees__bits mono">{bits}</span>
                  <p className="quees__que">{que}</p>
                </li>
              )
            })}
          </ul>
          <p {...revelado(visible, 'sectq__fuente', 360)}>{t.fuente}</p>
        </div>

        <p {...revelado(visible, 'sectq__nota', 420)}>{t.nota}</p>
      </div>
    </section>
  )
}
