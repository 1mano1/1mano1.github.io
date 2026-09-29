import { revelado, useRevelar } from '../../lib/useRevelar'
import BotonCopiar from './BotonCopiar'

const INSTALACION = 'pip install "octuma[hf,gguf]"'
const CARPETA = 'qwen2.5-3b-instruct-int4'

const COMANDOS = [
  {
    id: 'quantize',
    num: '01',
    titulo: 'Cuantizar',
    linea: 'octuma quantize Qwen/Qwen2.5-3B-Instruct',
    que: 'Calibra, cuantiza y guarda la carpeta .tq. Antes de descargar avisa si el modelo no cabe en la RAM o la VRAM que tienes libre.',
  },
  {
    id: 'compare',
    num: '02',
    titulo: 'Comprobar',
    linea: `octuma compare ${CARPETA}`,
    que: 'Mide el cuantizado contra el original y lo resume en una línea: cuánto más chico quedó y cuánta calidad costó.',
  },
  {
    id: 'try',
    num: '03',
    titulo: 'Probar',
    linea: `octuma try ${CARPETA}`,
    que: 'Chat en la terminal. Con --side-by-side hace las mismas diez preguntas a los dos modelos, uno al lado del otro.',
  },
  {
    id: 'export',
    num: '04',
    titulo: 'Exportar',
    linea: `octuma export ${CARPETA} --out qwen3b.gguf`,
    que: 'Genera el .gguf para llama.cpp y Android. Si clonaste el repositorio, scripts/verify_gguf.py lo revisa antes de publicarlo.',
  },
]

export default function Comandos() {
  const [ref, visible] = useRevelar()

  return (
    <section className="sectq comandos" id="comandos" ref={ref}>
      <div className="contenedor sectq__interior">
        <div {...revelado(visible, 'sectq__cabecera')}>
          <span className="sectq__rotulo">Comandos</span>
          <h2 className="sectq__titulo">Cuatro comandos y ya</h2>
        </div>

        <p {...revelado(visible, 'sectq__intro', 60)}>
          Valores por defecto: INT4, GPTQ + AWQ, grupos de 32 y 128 ventanas de 2048 tokens de calibración.
        </p>

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
            Necesita Python 3.10 o mayor. Los extras <span className="mono">hf</span> y{' '}
            <span className="mono">gguf</span> traen transformers y el exportador a GGUF: sin ellos
            no se puede cuantizar. Si tienes GPU NVIDIA, instala antes PyTorch con CUDA; los pasos
            están en el README.
          </p>
        </div>

        <ul className="comandos__tarjetas">
          {COMANDOS.map((c, i) => (
            <li key={c.id} {...revelado(visible, 'comandos__tarjeta', 180 + i * 70)}>
              <div className="comandos__top">
                <span className="comandos__num mono">{c.num}</span>
                <h3 className="comandos__titulo">{c.titulo}</h3>
              </div>
              <div className="comandos__caja">
                <code className="comandos__cmd mono">{c.linea}</code>
                <BotonCopiar texto={c.linea} />
              </div>
              <p className="comandos__que">{c.que}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
