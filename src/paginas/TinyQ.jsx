import Benchmarks from '../secciones/tinyq/Benchmarks'
import ChipDestacado from '../secciones/tinyq/ChipDestacado'
import ComoFunciona from '../secciones/tinyq/ComoFunciona'
import Cta from '../secciones/tinyq/Cta'
import Comandos from '../secciones/tinyq/Comandos'
import Comparativa from '../secciones/tinyq/Comparativa'
import HeroTinyq from '../secciones/tinyq/HeroTinyq'
import NavTinyq from '../secciones/tinyq/NavTinyq'
import QueEsCuantizar from '../secciones/tinyq/QueEsCuantizar'
import Uso from '../secciones/tinyq/Uso'

import '../secciones/ChipTinyq.css'
import '../secciones/tinyq/Cta.css'
import '../secciones/tinyq/Benchmarks.css'
import '../secciones/tinyq/ChipDestacado.css'
import '../secciones/tinyq/ComoFunciona.css'
import '../secciones/tinyq/Comandos.css'
import '../secciones/tinyq/Comparativa.css'
import '../secciones/tinyq/HeroTinyq.css'
import '../secciones/tinyq/NavTinyq.css'
import '../secciones/tinyq/QueEsCuantizar.css'
import '../secciones/tinyq/SeccionTq.css'
import '../secciones/tinyq/Uso.css'

/**
 * Pagina de tinyq. Figma 95:5999 ("tinyq — Desktop") y 196:1461 (movil).
 *
 * Se entra desde el boton "Leer documentacion" del panel de open source y
 * desde el chip del hero del portafolio.
 */
export default function TinyQ() {
  return (
    <>
      <NavTinyq />
      <main>
        <HeroTinyq />
        <ChipDestacado />
        <QueEsCuantizar />
        <ComoFunciona />
        <Benchmarks />
        <Comparativa />
        <Comandos />
        <Uso />
      </main>
      <Cta />
    </>
  )
}
