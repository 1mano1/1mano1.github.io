import { useTextos } from '../../lib/idioma'
import { revelado, useRevelar } from '../../lib/useRevelar'

const LINEAS = [
  { t: 'from transformers import AutoModelForCausalLM, AutoTokenizer', c: 'import' },
  { t: 'from octuma.calibrate import load_wikitext2', c: 'import' },
  { t: 'from octuma.quantizer import QuantConfig, quantize_model', c: 'import' },
  { t: 'from octuma.export.tq import save_quantized', c: 'import' },
  { t: '' },
  { t: 'MODEL = "Qwen/Qwen2.5-3B-Instruct"' },
  { t: 'tok   = AutoTokenizer.from_pretrained(MODEL)' },
  { t: 'model = AutoModelForCausalLM.from_pretrained(MODEL)' },
  { t: '' },
  { t: 'calib  = load_wikitext2(tok, n_samples=128)' },
  { t: 'cfg    = QuantConfig(bits=4, group_size=32, awq=True)' },
  { t: 'report = quantize_model(model, calib, cfg)' },
  { t: 'save_quantized(model, "qwen3b-int4")' },
  { t: '' },
  { t: 'print(report.summary())', com: '  # q_gb, compression, worst_layer' },
]

const TEXTOS = {
  es: {
    rotulo: 'Uso',
    titulo: 'También desde Python',
    bajada: 'Si prefieres usarlo desde tu código, son tres pasos: cargar el modelo, cuantizarlo y guardarlo.',
    ventajas: [
      'Modelos de Hugging Face tipo Llama y Qwen',
      'INT4, INT8 y precisión mixta por capa',
      'Exporta a GGUF para llama.cpp y Android',
    ],
  },
  en: {
    rotulo: 'Usage',
    titulo: 'From Python too',
    bajada: 'If you’d rather use it from your own code, it takes three steps: load the model, quantize it and save it.',
    ventajas: [
      'Hugging Face models like Llama and Qwen',
      'INT4, INT8 and per-layer mixed precision',
      'Exports to GGUF for llama.cpp and Android',
    ],
  },
}

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
  const t = useTextos(TEXTOS)

  return (
    <section className="sectq sectq--gris uso" id="uso" ref={ref}>
      <div className="contenedor uso__interior">
        <div {...revelado(visible, 'uso__texto')}>
          <span className="sectq__rotulo">{t.rotulo}</span>
          <h2 className="uso__titulo">{t.titulo}</h2>
          <p className="uso__bajada">{t.bajada}</p>
          <ul className="uso__ventajas">
            {t.ventajas.map((v) => (
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
