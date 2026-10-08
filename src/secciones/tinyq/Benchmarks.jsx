import { useTextos } from '../../lib/idioma'
import { revelado, useRevelar } from '../../lib/useRevelar'

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
    /* Sin INT8. */
    fp16: { bytes: 15230824448, ppl: 7.14562145750649 },
    int4: { bytes: 5748764672, ppl: 7.271729472538426 },
  },
]

/* La grafica llega hasta 8 GB, asi que el 7B (15.2) no cabe y solo sale en la tabla. */
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

const TEXTOS = {
  es: {
    titulo: 'Memoria por modelo',
    intro: 'Perplejidad en wikitext-2, 20 ventanas de 2048 tokens. Menos es mejor.',
    columnas: ['Modelo', 'Mem. FP16', 'Mem. INT4', 'PPL FP16', 'PPL INT4', 'Pérdida', 'Método'],
    fuente:
      'El 7B se cuantizó solo con GPTQ: con AWQ no cupo en la memoria del servidor. Todo se midió con grupos de 64. Con grupos de 32, que es lo que usa hoy la librería, el 0.5B pierde 2.8% y el 1.5B 2.0%. Los datos completos están en el repositorio.',
  },
  en: {
    titulo: 'Memory per model',
    intro: 'Perplexity on wikitext-2, 20 windows of 2048 tokens. Lower is better.',
    columnas: ['Model', 'FP16 mem.', 'INT4 mem.', 'FP16 PPL', 'INT4 PPL', 'Loss', 'Method'],
    fuente:
      "The 7B was quantized with GPTQ only: with AWQ it didn't fit in the server's memory. Everything was measured with groups of 64. With groups of 32, which is what the library uses today, the 0.5B loses 2.8% and the 1.5B 2.0%. The full data is in the repository.",
  },
}

export default function Benchmarks() {
  const [ref, visible] = useRevelar()
  const grafica = EN_GRAFICA.map((id) => MODELOS.find((m) => m.id === id))
  const t = useTextos(TEXTOS)
  const [, cMemFp16, cMemInt4, cPplFp16, cPplInt4, cPerdida, cMetodo] = t.columnas

  return (
    <section className="sectq bench" id="benchmarks" ref={ref}>
      <div className="contenedor sectq__interior">
        <div className="bench__cabecera">
          <div {...revelado(visible, 'sectq__cabecera')}>
            <span className="sectq__rotulo">Benchmarks</span>
            <h2 className="sectq__titulo">{t.titulo}</h2>
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
          {t.intro}
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
                {t.columnas.map((c) => (
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
                  <td className="mono" data-col={cMemFp16}>
                    {dosGb(m.fp16.bytes)}
                  </td>
                  <td className="mono" data-col={cMemInt4}>
                    {dosGb(m.int4.bytes)}
                  </td>
                  <td className="mono" data-col={cPplFp16}>
                    {m.fp16.ppl.toFixed(3)}
                  </td>
                  <td className="mono" data-col={cPplInt4}>
                    {m.int4.ppl.toFixed(3)}
                  </td>
                  <td className="mono bench__perdida" data-col={cPerdida}>
                    {perdida(m)}
                  </td>
                  <td className="mono" data-col={cMetodo}>
                    {m.metodo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p {...revelado(visible, 'sectq__fuente', 240)}>
          {t.fuente}
        </p>
      </div>
    </section>
  )
}
