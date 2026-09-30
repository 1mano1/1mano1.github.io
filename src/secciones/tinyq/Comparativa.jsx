import { useTextos } from '../../lib/idioma'
import { revelado, useRevelar } from '../../lib/useRevelar'


const BNB_FP16 = 8.347172079511308
const BITSANDBYTES = [
  { id: 'fp16', nombre: 'FP16 (original)', ppl: BNB_FP16, gb: 6.79, base: true },
  { id: 'octuma-awq', nombre: 'Octuma GPTQ+AWQ', ppl: 8.548522943160878, gb: 2.76, nuestro: true },
  { id: 'octuma', nombre: 'Octuma GPTQ', ppl: 8.578070458137862, gb: 2.76, nuestro: true },
  { id: 'nf4', nombre: 'bitsandbytes NF4', ppl: 8.905615134182025, gb: 2.63 },
  { id: 'fp4', nombre: 'bitsandbytes FP4', ppl: 13.343381221155415, gb: 2.63 },
]

/* F16 de cada modelo dentro de llama.cpp, y las tres variantes de 4 bits. */
const LLAMACPP = [
  { id: '0.5b', nombre: 'Qwen2.5 0.5B', f16: 12.2523, octuma: 12.7096, q4km: 12.575, q40: 13.8665 },
  { id: '1.5b', nombre: 'Qwen2.5 1.5B', f16: 8.3111, octuma: 8.4864, q4km: 8.7047, q40: 9.0051 },
  { id: '3b', nombre: 'Qwen2.5 3B', f16: 7.3338, octuma: 7.5118, q4km: 7.7892, q40: 8.1418 },
]
const VARIANTES = [
  { id: 'octuma', etiqueta: 'Octuma INT4' },
  { id: 'q4km', etiqueta: 'Q4_K_M' },
  { id: 'q40', etiqueta: 'Q4_0' },
]

const TEXTOS = {
  es: {
    rotulo: 'Comparativa',
    titulo: 'Contra lo que ya usa todo el mundo',
    intro:
      'Octuma frente al cuantizador que Hugging Face usa por defecto y frente a los formatos de 4 bits más usados en llama.cpp.',
    bnbTitulo: 'Contra bitsandbytes',
    bnbPie: 'Qwen2.5 3B · evaluador de Octuma · 20 ventanas de 2048',
    columnas: ['Herramienta', 'Perplejidad', 'Memoria', 'Pérdida'],
    bnbNota:
      'NF4 es el cuantizador que trae Hugging Face por defecto y el que usa QLoRA. Octuma hace menos de la mitad de daño, con 5% más de memoria.',
    llamaTitulo: 'Contra llama.cpp',
    llamaPie: 'Los tres · medido dentro de llama.cpp · 20 ventanas de 2048',
    modelo: 'Modelo',
    leyenda: 'En azul, el menor daño de cada fila. Menos es mejor.',
    llamaNota:
      'En el 0.5B gana Q4_K_M. Desde el 1.5B, Q4_K_M pierde más calidad conforme crece el modelo y Octuma se mantiene.',
    fuente:
      'Cada tabla se midió dentro de un solo motor, así que sus perplejidades no se comparan entre tablas.',
  },
  en: {
    rotulo: 'Comparison',
    titulo: 'Against what everyone already uses',
    intro:
      "Octuma against Hugging Face's default quantizer and against the most common 4-bit formats in llama.cpp.",
    bnbTitulo: 'Against bitsandbytes',
    bnbPie: 'Qwen2.5 3B · Octuma evaluator · 20 windows of 2048',
    columnas: ['Tool', 'Perplexity', 'Memory', 'Loss'],
    bnbNota:
      "NF4 is Hugging Face's default quantizer and the one QLoRA uses. Octuma does less than half the damage, with 5% more memory.",
    llamaTitulo: 'Against llama.cpp',
    llamaPie: 'All three · measured inside llama.cpp · 20 windows of 2048',
    modelo: 'Model',
    leyenda: 'In blue, the smallest loss in each row. Lower is better.',
    llamaNota:
      "Q4_K_M wins on the 0.5B. From 1.5B up, Q4_K_M loses more quality as the model grows while Octuma holds steady.",
    fuente:
      'Each table was measured inside a single engine, so perplexities are not comparable across tables.',
  },
}

const dano = (ppl, base) => (ppl / base - 1) * 100
const pct = (v, decimales = 1) => `+${v.toFixed(decimales)}%`

export default function Comparativa() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)
  const [cHerramienta, cPerplejidad, cMemoria, cPerdida] = t.columnas

  return (
    <section className="sectq sectq--gris compara" id="comparativa" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">{t.rotulo}</span>
          <h2 className="sectq__titulo">{t.titulo}</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>
          {t.intro}
        </p>

        <div className="compara__tablas">
          <article {...revelado(visible, 'compara__panel', 120)}>
            <header className="compara__encabezado">
              <h3 className="compara__titulo">{t.bnbTitulo}</h3>
              <p className="compara__pie mono">{t.bnbPie}</p>
            </header>
            <div className="compara__marco">
              <table>
                <thead>
                  <tr>
                    <th className="mono">{cHerramienta}</th>
                    <th className="mono">{cPerplejidad}</th>
                    <th className="mono">{cMemoria}</th>
                    <th className="mono">{cPerdida}</th>
                  </tr>
                </thead>
                <tbody>
                  {BITSANDBYTES.map((f) => (
                    <tr key={f.id} className={f.nuestro ? 'compara__fila--nuestra' : undefined}>
                      <th scope="row">{f.nombre}</th>
                      <td className="mono" data-col={cPerplejidad}>
                        {f.ppl.toFixed(3)}
                      </td>
                      <td className="mono" data-col={cMemoria}>
                        {f.gb.toFixed(2)} GB
                      </td>
                      <td className="mono compara__dano" data-col={cPerdida}>
                        {f.base ? '—' : pct(dano(f.ppl, BNB_FP16))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="compara__nota">
              {t.bnbNota}
            </p>
          </article>

          <article {...revelado(visible, 'compara__panel', 200)}>
            <header className="compara__encabezado">
              <h3 className="compara__titulo">{t.llamaTitulo}</h3>
              <p className="compara__pie mono">{t.llamaPie}</p>
            </header>
            <div className="compara__marco">
              <table>
                <thead>
                  <tr>
                    <th className="mono">{t.modelo}</th>
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
            <p className="compara__leyenda">{t.leyenda}</p>
            <p className="compara__nota">
              {t.llamaNota}
            </p>
          </article>
        </div>

        <p {...revelado(visible, 'sectq__fuente', 280)}>
          {t.fuente}
        </p>
      </div>
    </section>
  )
}
