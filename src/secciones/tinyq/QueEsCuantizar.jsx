import { revelado, useRevelar } from '../../lib/useRevelar'

/**
 * Que es cuantizar. Figma 189:5996 (desktop) y 196:1485 (movil).
 *
 * Las tres cifras son la memoria de Qwen2.5-3B en cada formato, en bytes
 * crudos de memory_bytes.total (runs/qwen3b__fp16, __gptq-int8 y
 * __gptq-awq-int4__w20s2048_float16.json). Los GB y el largo de la barra se
 * calculan aqui, igual que en Benchmarks: si se escriben a mano las dos
 * secciones acaban diciendo cosas distintas del mismo modelo.
 *
 * El "grupo de 32" de la tarjeta INT4 es lo que hace la CLI hoy, que es lo
 * que va a ver quien corra el comando; el barrido de la tabla se midio con
 * grupos de 64, y por eso la linea de procedencia lo dice.
 */
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
    que: 'Prácticamente gratis: en todo el barrido el peor caso pierde 0.03% de perplejidad.',
  },
  {
    id: 'int4',
    bytes: 2762166272,
    etiqueta: 'INT4',
    bits: '4 bits por peso',
    que: 'Solo 16 valores por grupo de 32 pesos. Aquí es donde el método decide el resultado.',
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
          8 o en 4 bits, para que el modelo ocupe menos y quepa donde antes no cabía. Algo de
          precisión siempre se pierde: lo único que importa es cuánta, y eso se mide.
        </p>

        <div className="quees__formatos">
          <ul className="quees__tarjetas">
            {FORMATOS.map((f, i) => (
              <li key={f.id} {...revelado(visible, `quees__tarjeta quees__tarjeta--${f.id}`, 120 + i * 80)}>
                {/* En movil van en la misma linea, como esta dibujado: tres
                    tarjetas apiladas con la cifra debajo estiran la seccion
                    200px sin decir nada mas. */}
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
            Memoria de Qwen2.5 3B en cada formato, del barrido en runs/ (grupos de 64).
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
