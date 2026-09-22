import datosAncho from '../../data/chipTinyqAncho.json'
import { revelado, useRevelar } from '../../lib/useRevelar'
import ChipTinyq from '../ChipTinyq'

/**
 * El chip a lo ancho. Figma 49:2249.
 *
 * Es la misma ilustracion del panel del portafolio con el lienzo de 1300 en
 * vez de 1228. Los numeros que trae escritos son los del 7B medido:
 * 15.23 GB -> 5.75 GB y +1.76% de perplejidad
 * (runs/qwen7b__gptq-int4__w20s2048_float16.json).
 *
 * El movil dibujado no tiene esta seccion; aqui se queda, encogida por el
 * alto igual que en el panel, porque lo que viene debajo es texto y texto y
 * la pagina necesita respirar.
 */
export default function ChipDestacado() {
  const [ref, visible] = useRevelar()

  return (
    <section className="chiptq" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'chiptq__marco')}>
          <ChipTinyq datos={datosAncho} />
        </div>
      </div>
    </section>
  )
}
