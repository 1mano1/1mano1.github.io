import { revelado, useRevelar } from '../../lib/useRevelar'

/* Que es cuantizar. */
const FORMATOS = [
  {
    id: 'fp16',
    bytes: 6793908224,
    etiqueta: 'FP16',
    bits: '16 bits por peso',
    que: 'El modelo como sale de fábrica. Es el punto de comparación de todo lo demás.',
  },
  {
    id: 'int8',
    bytes: 4149432320,
    etiqueta: 'INT8',
    bits: '8 bits por peso',
    que: 'Casi sin pérdida: como mucho, 0.03% de perplejidad.',
  },
  {
    id: 'int4',
    bytes: 2762166272,
    etiqueta: 'INT4',
    bits: '4 bits por peso',
    que: 'Solo 16 valores posibles por peso, con una escala cada 32 pesos. Aquí el método decide la calidad.',
  },
]

const gb = (bytes) => bytes / 1e9
const MAYOR = FORMATOS[0].bytes

export default function QueEsCuantizar() {
  const [ref, visible] = useRevelar()

  return (
    <section className="sectq quees" id="que-es" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">Qué es cuantizar</span>
          <h2 className="sectq__titulo">Los mismos pesos, en menos bits</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>
          Cada peso de un modelo se guarda en 16 bits. Cuantizar es reescribir esos mismos pesos en
          8 o en 4 bits, para que el modelo ocupe menos y quepa donde antes no cabía. Siempre se pierde algo de precisión; lo que importa es cuánta.
        </p>

        <div className="quees__formatos">
          <ul className="quees__tarjetas">
            {FORMATOS.map((f, i) => (
              <li key={f.id} {...revelado(visible, `quees__tarjeta quees__tarjeta--${f.id}`, 120 + i * 80)}>
                <div className="quees__fila">
                  <span className="quees__etiqueta mono">{f.etiqueta}</span>
                  <p className="quees__cifra">{gb(f.bytes).toFixed(1)} GB</p>
                </div>
                <div className="quees__barra">
                  <div className="quees__relleno" style={{ width: `${(f.bytes / MAYOR) * 100}%` }} />
                </div>
                <span className="quees__bits mono">{f.bits}</span>
                <p className="quees__que">{f.que}</p>
              </li>
            ))}
          </ul>
          <p {...revelado(visible, 'sectq__fuente', 360)}>
            Memoria de Qwen2.5 3B en cada formato, medida con grupos de 64.
          </p>
        </div>

        <p {...revelado(visible, 'sectq__nota', 420)}>
          Entre más grande el modelo, menos duele cuantizarlo. Con el mejor método, el de 7B pierde
          1.8% de perplejidad y el de 0.5B pierde 5.2%. El orden de los métodos es idéntico en los
          cuatro tamaños medidos.
        </p>
      </div>
    </section>
  )
}
