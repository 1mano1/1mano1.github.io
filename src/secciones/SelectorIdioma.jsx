import { IDIOMAS, useIdioma } from '../lib/idioma'
import './SelectorIdioma.css'

const ETIQUETAS = {
  es: { grupo: 'Idioma', es: 'Español', en: 'Inglés' },
  en: { grupo: 'Language', es: 'Spanish', en: 'English' },
}

/* El boton ES | EN. Va en los tres menus del sitio. */
export default function SelectorIdioma({ className = '' }) {
  const { idioma, cambiar } = useIdioma()
  const e = ETIQUETAS[idioma]

  return (
    <div className={`idioma ${className}`} role="group" aria-label={e.grupo}>
      {IDIOMAS.map((id) => (
        <button
          key={id}
          type="button"
          className="idioma__opcion mono"
          aria-pressed={idioma === id}
          aria-label={e[id]}
          lang={id}
          onClick={() => cambiar(id)}
        >
          {id.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
