import { revelado, useRevelar } from '../../lib/useRevelar'

/**
 * Comparativa. Figma 190:5996 (desktop) y 199:1461 (movil).
 *
 * Dos tablas, cada una medida entera dentro de un solo motor:
 *  - bitsandbytes: evaluador de TinyQ, perplejidades crudas de
 *    runs/qwen3b__*__w20s2048_float16.json y runs/baseline__bnb-*__qwen3b.json
 *    (las genera scripts/compare_baselines.py). La tabla las redondea a tres
 *    decimales al pintarlas, no al guardarlas.
 *  - llama.cpp: perplejidades de runs/COMPARATIVA_GGUF.md, que sale de
 *    scripts/tabla_gguf.py.
 *
 * Los porcentajes no estan escritos: se calculan contra el FP16/F16 de la
 * misma tabla, que es la unica comparacion que vale.
 */

const BNB_FP16 = 8.347172079511308
const BITSANDBYTES = [
  { id: 'fp16', nombre: 'FP16 (original)', ppl: BNB_FP16, gb: 6.79, base: true },
  { id: 'tinyq-awq', nombre: 'TinyQ GPTQ+AWQ', ppl: 8.548522943160878, gb: 2.76, nuestro: true },
  { id: 'tinyq', nombre: 'TinyQ GPTQ', ppl: 8.578070458137862, gb: 2.76, nuestro: true },
  { id: 'nf4', nombre: 'bitsandbytes NF4', ppl: 8.905615134182025, gb: 2.63 },
  { id: 'fp4', nombre: 'bitsandbytes FP4', ppl: 13.343381221155415, gb: 2.63 },
]

/* F16 de cada modelo dentro de llama.cpp, y las tres variantes de 4 bits. */
const LLAMACPP = [
  { id: '0.5b', nombre: 'Qwen2.5 0.5B', f16: 12.2523, tinyq: 12.7096, q4km: 12.575, q40: 13.8665 },
  { id: '1.5b', nombre: 'Qwen2.5 1.5B', f16: 8.3111, tinyq: 8.4864, q4km: 8.7047, q40: 9.0051 },
  { id: '3b', nombre: 'Qwen2.5 3B', f16: 7.3338, tinyq: 7.5118, q4km: 7.7892, q40: 8.1418 },
]
const VARIANTES = [
  { id: 'tinyq', etiqueta: 'TinyQ INT4' },
  { id: 'q4km', etiqueta: 'Q4_K_M' },
  { id: 'q40', etiqueta: 'Q4_0' },
]

const dano = (ppl, base) => (ppl / base - 1) * 100
const pct = (v, decimales = 1) => `+${v.toFixed(decimales)}%`

export default function Comparativa() {
  const [ref, visible] = useRevelar()

  return (
    <section className="sectq sectq--gris compara" id="comparativa" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">Comparativa</span>
          <h2 className="sectq__titulo">Contra lo que ya usa todo el mundo</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>
          Medirse contra uno mismo no prueba nada. Estas son las dos comparaciones que importan:
          contra el cuantizador que trae Hugging Face por defecto, y contra los formatos con los
          que la gente corre modelos en local.
        </p>

        <div className="compara__tablas">
          <article {...revelado(visible, 'compara__panel', 120)}>
            <header className="compara__encabezado">
              <h3 className="compara__titulo">Contra bitsandbytes</h3>
              <p className="compara__pie mono">Qwen2.5 3B · evaluador de TinyQ · 20 ventanas de 2048</p>
            </header>
            <div className="compara__marco">
              <table>
                <thead>
                  <tr>
                    <th className="mono">Herramienta</th>
                    <th className="mono">Perplejidad</th>
                    <th className="mono">Memoria</th>
                    <th className="mono">Pérdida</th>
                  </tr>
                </thead>
                <tbody>
                  {BITSANDBYTES.map((f) => (
                    <tr key={f.id} className={f.nuestro ? 'compara__fila--nuestra' : undefined}>
                      <th scope="row">{f.nombre}</th>
                      <td className="mono" data-col="Perplejidad">
                        {f.ppl.toFixed(3)}
                      </td>
                      <td className="mono" data-col="Memoria">
                        {f.gb.toFixed(2)} GB
                      </td>
                      <td className="mono compara__dano" data-col="Pérdida">
                        {f.base ? '—' : pct(dano(f.ppl, BNB_FP16))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="compara__nota">
              NF4 es el cuantizador que trae Hugging Face por defecto y el que usa QLoRA. TinyQ hace
              menos de la mitad de daño, con 5% más de memoria.
            </p>
          </article>

          <article {...revelado(visible, 'compara__panel', 200)}>
            <header className="compara__encabezado">
              <h3 className="compara__titulo">Contra llama.cpp</h3>
              <p className="compara__pie mono">Los tres · medido dentro de llama.cpp · 20 ventanas de 2048</p>
            </header>
            <div className="compara__marco">
              <table>
                <thead>
                  <tr>
                    <th className="mono">Modelo</th>
                    {VARIANTES.map((v) => (
                      <th key={v.id} className="mono">
                        {v.etiqueta}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LLAMACPP.map((m) => {
                    const danos = VARIANTES.map((v) => dano(m[v.id], m.f16))
                    const mejor = Math.min(...danos)
                    return (
                      <tr key={m.id}>
                        <th scope="row">{m.nombre}</th>
                        {VARIANTES.map((v, i) => (
                          <td
                            key={v.id}
                            className={`mono${danos[i] === mejor ? ' compara__mejor' : ''}`}
                            data-col={v.etiqueta}
                          >
                            {pct(danos[i], 2)}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="compara__leyenda">En azul, el menor daño de cada fila. Menos es mejor.</p>
            <p className="compara__nota">
              TinyQ pierde en el 0.5B, y ahí Q4_K_M además ocupa menos. Lo que sostiene el argumento
              es la tendencia: Q4_K_M se degrada al crecer el modelo y TinyQ no.
            </p>
          </article>
        </div>

        <p {...revelado(visible, 'sectq__fuente', 280)}>
          Las perplejidades de motores distintos no se comparan entre sí: cada uno trocea y promedia
          diferente. Por eso cada tabla se mide entera dentro de un solo motor.
        </p>
      </div>
    </section>
  )
}
