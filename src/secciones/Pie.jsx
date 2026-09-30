import { GA_ID, abrirAvisoCookies } from '../lib/analiticas'
import { useTextos } from '../lib/idioma'

const HECHO = { es: 'Hecho en Colima, MX', en: 'Made in Colima, MX' }

/* Pie de pagina. */
export default function Pie() {
  const hecho = useTextos(HECHO)

  return (
    <footer className="pie">
      <div className="contenedor pie__interior">
        <p>© {new Date().getFullYear()} Imanol Rodríguez</p>
        <p>
          {hecho}
          {GA_ID && (
            <>
              {' · '}
              <button type="button" className="pie__cookies" onClick={abrirAvisoCookies}>
                Cookies
              </button>
            </>
          )}
        </p>
      </div>
    </footer>
  )
}
