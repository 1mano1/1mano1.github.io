import lineas from '../data/terminal.json'

/* Terminal del panel de Octuma (Figma 23:49 / 54:2989). */
export default function Terminal() {
  return (
    <pre className="terminal" aria-label="Sesión de terminal instalando y usando Octuma">
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
