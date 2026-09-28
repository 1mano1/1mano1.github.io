import { GA_ID, abrirAvisoCookies } from '../lib/analiticas'

/* Pie de pagina. */
export default function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor pie__interior">
        <p>© {new Date().getFullYear()} Imanol Rodríguez</p>
        <p>
          Hecho en Colima, MX
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
