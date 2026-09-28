import datosAncho from '../../data/chipTinyqAncho.json'
import { revelado, useRevelar } from '../../lib/useRevelar'
import ChipTinyq from '../ChipTinyq'

/* El chip a lo ancho. */
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
