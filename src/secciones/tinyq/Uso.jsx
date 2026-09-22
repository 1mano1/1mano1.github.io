import { revelado, useRevelar } from '../../lib/useRevelar'

/**
 * Uso. Figma 52:2157, con el bloque de codigo 80:6105.
 *
 * Cada import se comprobo contra C:/TinyQ/src/tinyq: load_wikitext2 esta en
 * calibrate.py:62, QuantConfig y quantize_model en quantizer.py:26 y 155, y
 * save_quantized en export/tq.py:23.
 *
 * Tres cosas cambian respecto al Figma, y por el mismo motivo: ahi el codigo
 * no corre.
 *  - Faltaba el tokenizador, que load_wikitext2 pide como primer argumento,
 *    y faltaba definir MODELO.
 *  - Decia group_size=64. Para exportar a GGUF tiene que ser 32:
 *    gguf_export.py:218 lo rechaza con cualquier otro valor.
 *  - El comentario final prometia "2.76 GB · ppl 8.55". summary() devuelve un
 *    dict (quantizer.py:73) y no trae perplejidad: esa la da el evaluador,
 *    no el cuantizador.
 */
const LINEAS = [
  { t: 'from transformers import AutoModelForCausalLM, AutoTokenizer', c: 'import' },
  { t: 'from tinyq.calibrate import load_wikitext2', c: 'import' },
  { t: 'from tinyq.quantizer import QuantConfig, quantize_model', c: 'import' },
  { t: 'from tinyq.export.tq import save_quantized', c: 'import' },
  { t: '' },
  { t: 'MODELO = "Qwen/Qwen2.5-3B-Instruct"' },
  { t: 'tok   = AutoTokenizer.from_pretrained(MODELO)' },
  { t: 'model = AutoModelForCausalLM.from_pretrained(MODELO)' },
  { t: '' },
  { t: 'calib  = load_wikitext2(tok, n_samples=128)' },
  { t: 'cfg    = QuantConfig(bits=4, group_size=32, awq=True)' },
  { t: 'report = quantize_model(model, calib, cfg)' },
  { t: 'save_quantized(model, "qwen3b-int4")' },
  { t: '' },
  { t: 'print(report.summary())', com: '  # q_gb, compression, worst_layer' },
]

const VENTAJAS = [
  'Compatible con modelos de Hugging Face',
  'INT8, INT4 y cuantización mixta por capa',
  'Exporta a GGUF para llama.cpp y Android',
]

function Palomita() {
  return (
    <span className="uso__marca" aria-hidden="true">
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.4 3.3 5.8 8 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function Uso() {
  const [ref, visible] = useRevelar()

  return (
    <section className="sectq sectq--gris uso" id="uso" ref={ref}>
      <div className="contenedor uso__interior">
        <div {...revelado(visible, 'uso__texto')}>
          <span className="sectq__rotulo">Uso</span>
          <h2 className="uso__titulo">También desde Python</h2>
          <p className="uso__bajada">
            Úsalo en tus scripts o pipelines de entrenamiento. La API es pequeña a propósito:
            cargar, cuantizar, guardar.
          </p>
          <ul className="uso__ventajas">
            {VENTAJAS.map((v) => (
              <li key={v} className="uso__ventaja">
                <Palomita />
                {v}
              </li>
            ))}
          </ul>
        </div>

        <div {...revelado(visible, 'uso__codigo', 120)}>
          <div className="uso__barra">
            <span className="mono">quantize.py</span>
            <span className="mono">Python</span>
          </div>
          {/* Una sola caja con saltos de linea: partirlo en un <span> por
              renglon rompe el copiar y pegar, que es justo para lo que esta
              este bloque. */}
          <pre className="uso__pre mono">
            <code>
              {LINEAS.map((l, i) => (
                <span key={i} className={`uso__linea${l.c ? ` uso__linea--${l.c}` : ''}`}>
                  {l.t}
                  {l.com && <span className="uso__comentario">{l.com}</span>}
                  {'\n'}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
