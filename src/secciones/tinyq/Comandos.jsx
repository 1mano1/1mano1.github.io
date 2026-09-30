import { useTextos } from '../../lib/idioma'
import { revelado, useRevelar } from '../../lib/useRevelar'
import BotonCopiar from './BotonCopiar'

const INSTALACION = 'pip install "octuma[hf,gguf]"'
const CARPETA = 'qwen2.5-3b-instruct-int4'

const COMANDOS = [
  { id: 'quantize', num: '01', linea: 'octuma quantize Qwen/Qwen2.5-3B-Instruct' },
  { id: 'compare', num: '02', linea: `octuma compare ${CARPETA}` },
  { id: 'try', num: '03', linea: `octuma try ${CARPETA}` },
  { id: 'export', num: '04', linea: `octuma export ${CARPETA} --out qwen3b.gguf` },
]

const TEXTOS = {
  es: {
    rotulo: 'Comandos',
    titulo: 'Cuatro comandos y ya',
    intro: 'Valores por defecto: INT4, GPTQ + AWQ, grupos de 32 y 128 ventanas de 2048 tokens de calibración.',
    aclaracion: [
      'Necesita Python 3.10 o mayor. Los extras ',
      ' y ',
      ' traen transformers y el exportador a GGUF: sin ellos no se puede cuantizar. Si tienes GPU NVIDIA, instala antes PyTorch con CUDA; los pasos están en el README.',
    ],
    comandos: {
      quantize: [
        'Cuantizar',
        'Calibra, cuantiza y guarda la carpeta .tq. Antes de descargar avisa si el modelo no cabe en la RAM o la VRAM que tienes libre.',
      ],
      compare: [
        'Comprobar',
        'Mide el cuantizado contra el original y lo resume en una línea: cuánto más chico quedó y cuánta calidad costó.',
      ],
      try: [
        'Probar',
        'Chat en la terminal. Con --side-by-side hace las mismas diez preguntas a los dos modelos, uno al lado del otro.',
      ],
      export: [
        'Exportar',
        'Genera el .gguf para llama.cpp y Android. Si clonaste el repositorio, scripts/verify_gguf.py lo revisa antes de publicarlo.',
      ],
    },
  },
  en: {
    rotulo: 'Commands',
    titulo: 'Four commands, that’s it',
    intro: 'Defaults: INT4, GPTQ + AWQ, groups of 32 and 128 calibration windows of 2048 tokens.',
    aclaracion: [
      'Needs Python 3.10 or newer. The ',
      ' and ',
      ' extras bring transformers and the GGUF exporter: without them you can’t quantize. If you have an NVIDIA GPU, install PyTorch with CUDA first; the steps are in the README.',
    ],
    comandos: {
      quantize: [
        'Quantize',
        'Calibrates, quantizes and saves the .tq folder. Before downloading, it warns you if the model won’t fit in your free RAM or VRAM.',
      ],
      compare: [
        'Check',
        'Measures the quantized model against the original and sums it up in one line: how much smaller it got and how much quality it cost.',
      ],
      try: [
        'Try',
        'Chat in the terminal. With --side-by-side it asks both models the same ten questions, side by side.',
      ],
      export: [
        'Export',
        'Builds the .gguf for llama.cpp and Android. If you cloned the repository, scripts/verify_gguf.py checks it before you publish it.',
      ],
    },
  },
}

export default function Comandos() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="sectq comandos" id="comandos" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">{t.rotulo}</span>
          <h2 className="sectq__titulo">{t.titulo}</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>{t.intro}</p>

        <div {...revelado(visible, 'comandos__instalacion', 120)}>
          <div className="comandos__barra">
            <code className="comandos__linea mono">
              <span className="comandos__signo" aria-hidden="true">
                $
              </span>
              {INSTALACION}
            </code>
            <BotonCopiar texto={INSTALACION} className="copiar--oscuro" />
          </div>
          <p className="comandos__aclaracion">
            {t.aclaracion[0]}
            <span className="mono">hf</span>
            {t.aclaracion[1]}
            <span className="mono">gguf</span>
            {t.aclaracion[2]}
          </p>
        </div>

        <ul className="comandos__tarjetas">
          {COMANDOS.map((c, i) => {
            const [titulo, que] = t.comandos[c.id]
            return (
              <li key={c.id} {...revelado(visible, 'comandos__tarjeta', 180 + i * 70)}>
                <div className="comandos__top">
                  <span className="comandos__num mono">{c.num}</span>
                  <h3 className="comandos__titulo">{titulo}</h3>
                </div>
                <div className="comandos__caja">
                  <code className="comandos__cmd mono">{c.linea}</code>
                  <BotonCopiar texto={c.linea} />
                </div>
                <p className="comandos__que">{que}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
