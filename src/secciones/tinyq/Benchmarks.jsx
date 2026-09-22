import { revelado, useRevelar } from '../../lib/useRevelar'

/**
 * Benchmarks. Figma 84:6396 (desktop) y 198:1461 (movil).
 *
 * Todo sale de C:/TinyQ/runs/qwen*__*w20s2048_float16.json: los bytes de
 * `memory_bytes.total` y la perplejidad tal cual. Los GB, los porcentajes y
 * el ancho de las barras se calculan aqui, asi que no hay ningun numero
 * escrito dos veces.
 *
 * El Figma dice 4.2 GB para el INT8 del 3B; los bytes exactos son
 * 4 149 432 320, o sea 4.1. Se deja el calculado.
 */
const MODELOS = [
  {
    id: '0.5b',
    nombre: 'Qwen2.5 0.5B',
    metodo: 'GPTQ+AWQ',
    fp16: { bytes: 1260247040, ppl: 13.818498868944877 },
    int8: { bytes: 919193600 },
    int4: { bytes: 740280320, ppl: 14.541497888868468 },
  },
  {
    id: '1.5b',
    nombre: 'Qwen2.5 1.5B',
    metodo: 'GPTQ+AWQ',
    fp16: { bytes: 3554000896, ppl: 9.371640513528332 },
    int8: { bytes: 2305220608 },
    int4: { bytes: 1650122752, ppl: 9.588223055843592 },
  },
  {
    id: '3b',
    nombre: 'Qwen2.5 3B',
    metodo: 'GPTQ+AWQ',
    fp16: { bytes: 6793908224, ppl: 8.347172079511308 },
    int8: { bytes: 4149432320 },
    int4: { bytes: 2762166272, ppl: 8.548522943160878 },
  },
  {
    id: '7b',
    nombre: 'Qwen2.5 7B',
    metodo: 'GPTQ',
    /* Sin INT8: del 7B solo hay cuatro corridas y ninguna es de 8 bits.
       Tampoco hace falta, porque el 7B no entra en la grafica. */
    fp16: { bytes: 15230824448, ppl: 7.14562145750649 },
    int4: { bytes: 5748764672, ppl: 7.271729472538426 },
  },
]

/* La grafica llega hasta 8 GB, asi que el 7B (15.2) no cabe y solo sale en la
   tabla. Es como esta dibujada. */
const TOPE_GB = 8
const MARCAS = [0, 2, 4, 6, 8]
const EN_GRAFICA = ['3b', '1.5b', '0.5b']
const FORMATOS = [
  { id: 'fp16', etiqueta: 'FP16' },
  { id: 'int8', etiqueta: 'INT8' },
  { id: 'int4', etiqueta: 'INT4' },
]

const gb = (bytes) => bytes / 1e9
const unGb = (bytes) => `${gb(bytes).toFixed(1)} GB`
const dosGb = (bytes) => `${gb(bytes).toFixed(2)} GB`
const recorte = (m) => `−${Math.round((1 - m.int4.bytes / m.fp16.bytes) * 100)}%`
const perdida = (m) => `+${((m.int4.ppl / m.fp16.ppl - 1) * 100).toFixed(1)}%`

const COLUMNAS = ['Modelo', 'Mem. FP16', 'Mem. INT4', 'PPL FP16', 'PPL INT4', 'Pérdida', 'Método']

export default function Benchmarks() {
  const [ref, visible] = useRevelar()
  const grafica = EN_GRAFICA.map((id) => MODELOS.find((m) => m.id === id))

  return (
    <section className="sectq bench" id="benchmarks" ref={ref}>
      <div className="contenedor sectq__interior">
        <div className="bench__cabecera">
          <div {...revelado(visible, 'sectq__cabecera')}>
            <span className="sectq__rotulo">Benchmarks</span>
            <h2 className="sectq__titulo">Memoria por modelo</h2>
          </div>
          <ul {...revelado(visible, 'bench__leyenda', 60)}>
            {FORMATOS.map((f) => (
              <li key={f.id} className="bench__clave">
                <span className={`bench__muestra bench__muestra--${f.id}`} />
                <span className="mono">{f.etiqueta}</span>
              </li>
            ))}
          </ul>
        </div>

        <p {...revelado(visible, 'sectq__intro', 90)}>
          Perplejidad en wikitext-2, 20 ventanas de 2048 tokens sin solape. Más bajo es mejor, y
          solo se compara contra el FP16 del mismo modelo.
        </p>

        <div {...revelado(visible, 'bench__grafica', 120)}>
          <div className="bench__lienzo">
            <div className="bench__rejilla" aria-hidden="true">
              {MARCAS.map((g) => (
                <span key={g} className="bench__linea" style={{ left: `${(g / TOPE_GB) * 100}%` }} />
              ))}
            </div>
            <ul className="bench__grupos">
              {grafica.map((m) => (
                <li key={m.id} className="bench__grupo">
                  <span className="bench__modelo">{m.nombre}</span>
                  <div className="bench__barras">
                    {FORMATOS.map((f) => {
                      const ancho = (gb(m[f.id].bytes) / TOPE_GB) * 100
                      return (
                        <div key={f.id} className="bench__fila">
                          {/* El ancho va siempre puesto, no atado a `visible`:
                              si el observador no llega a disparar, la grafica
                              sigue diciendo la verdad. Crecer es solo un
                              adorno y lo pone el CSS. */}
                          <span
                            className={`bench__barra bench__barra--${f.id}`}
                            style={{ width: `${ancho}%` }}
                          />
                          <span className="bench__meta" style={{ left: `${ancho}%` }}>
                            <span className="bench__valor mono">{unGb(m[f.id].bytes)}</span>
                            {f.id === 'int4' && <span className="bench__recorte mono">{recorte(m)}</span>}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </li>
              ))}
            </ul>
            <div className="bench__marcas" aria-hidden="true">
              {MARCAS.map((g) => (
                <span key={g} className="bench__marca mono" style={{ left: `${(g / TOPE_GB) * 100}%` }}>
                  {g} GB
                </span>
              ))}
            </div>
          </div>
        </div>

        <div {...revelado(visible, 'bench__tabla', 180)}>
          <table>
            <thead>
              <tr>
                {COLUMNAS.map((c) => (
                  <th key={c} className="mono">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODELOS.map((m) => (
                <tr key={m.id}>
                  <th scope="row">{m.nombre}</th>
                  <td className="mono" data-col="Mem. FP16">
                    {dosGb(m.fp16.bytes)}
                  </td>
                  <td className="mono" data-col="Mem. INT4">
                    {dosGb(m.int4.bytes)}
                  </td>
                  <td className="mono" data-col="PPL FP16">
                    {m.fp16.ppl.toFixed(3)}
                  </td>
                  <td className="mono" data-col="PPL INT4">
                    {m.int4.ppl.toFixed(3)}
                  </td>
                  <td className="mono bench__perdida" data-col="Pérdida">
                    {perdida(m)}
                  </td>
                  <td className="mono" data-col="Método">
                    {m.metodo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p {...revelado(visible, 'sectq__fuente', 240)}>
          El 7B va con GPTQ solo porque las corridas con AWQ se quedaron sin memoria. Los datos
          crudos están en runs/ del repositorio.
        </p>
      </div>
    </section>
  )
}
