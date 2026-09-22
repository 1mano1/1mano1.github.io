import lineas from '../data/terminal.json'

/**
 * Terminal del panel de tinyq (Figma 23:49 / 54:2989).
 *
 * El color de cada tramo NO es el fill del nodo: en el volcado los doce
 * textos dicen #000000 sobre un fondo #0e0f12. El color de verdad vive en
 * styleOverrideTable, por caracter, y lo saca `fig.py spans`.
 */
export default function Terminal() {
  return (
    <pre className="terminal" aria-label="Sesión de terminal instalando y usando tinyq">
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
