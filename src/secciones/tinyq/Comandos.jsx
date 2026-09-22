import { revelado, useRevelar } from '../../lib/useRevelar'
import BotonCopiar from './BotonCopiar'

/**
 * Comandos. Figma 192:5996.
 *
 * Los cuatro comandos son los de src/tinyq/cli.py, con sus valores por
 * defecto reales. La carpeta "qwen2.5-3b-instruct-int4" es la que deduce
 * `quantize` cuando no se le pasa --out (cli.py:137).
 *
 * El Figma dice "grupos de 64" y "los valores que ganaron el barrido". Ni
 * uno ni otro es exacto: la CLI usa grupos de 32 porque el exportador a GGUF
 * los exige, y el barrido de las tablas se corrio con 64. Lo que si gana el
 * barrido es el metodo, y asi queda escrito.
 */
const INSTALACION = 'pip install "tiny-q[hf,gguf] @ git+https://github.com/1mano1/TinyQ.git"'
const CARPETA = 'qwen2.5-3b-instruct-int4'

const COMANDOS = [
  {
    id: 'quantize',
    num: '01',
    titulo: 'Cuantizar',
    linea: 'tinyq quantize Qwen/Qwen2.5-3B-Instruct',
    que: 'Calibra, cuantiza y guarda la carpeta .tq. Avisa antes de descargar si el modelo no cabe en la RAM que tienes libre.',
  },
  {
    id: 'compare',
    num: '02',
    titulo: 'Comprobar',
    linea: `tinyq compare ${CARPETA}`,
    que: 'Mide el cuantizado contra el original y lo resume en una línea: cuánto más chico quedó y cuánta calidad costó.',
  },
  {
    id: 'try',
    num: '03',
    titulo: 'Probar',
    linea: `tinyq try ${CARPETA}`,
    que: 'Chat en la terminal. Con --side-by-side hace las mismas diez preguntas a los dos modelos, uno al lado del otro.',
  },
  {
    id: 'export',
    num: '04',
    titulo: 'Exportar',
    linea: `tinyq export ${CARPETA} --out qwen3b.gguf`,
    que: 'El .gguf que corre en llama.cpp y en Android. verify_gguf.py lo revisa antes de publicarlo.',
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
          La CLI ya viene con todo puesto: INT4, GPTQ + AWQ —el método que gana el barrido—, grupos
          de 32 y 128 ventanas de 2048 tokens de calibración. No hay que elegir nada.
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
            Necesita Python 3.10 o mayor. Trae PyTorch, transformers y el exportador a GGUF. En el
            instalador el paquete se llama <span className="mono">tiny-q</span>; el comando y el
            módulo de Python son <span className="mono">tinyq</span>.
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
