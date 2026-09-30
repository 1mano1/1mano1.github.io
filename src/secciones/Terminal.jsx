import lineas from '../data/terminal.json'
import { useTextos } from '../lib/idioma'

const ETIQUETA = {
  es: 'Sesión de terminal instalando y usando Octuma',
  en: 'Terminal session installing and using Octuma',
}

/* Terminal del panel de Octuma (Figma 23:49 / 54:2989). La salida es la real
   de la CLI, que esta en ingles, asi que no cambia con el idioma. */
export default function Terminal() {
  return (
    <pre className="terminal" aria-label={useTextos(ETIQUETA)}>
      {lineas.map((l) => (
        <div className="terminal__linea" key={l.id}>
          {l.spans.map((s, i) => (
            <span key={i} style={{ color: s.fill }}>
              {s.t}
            </span>
          ))}
        </div>
      ))}
    </pre>
  )
}
