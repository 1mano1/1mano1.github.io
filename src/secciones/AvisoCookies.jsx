import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
  GA_ID,
  activarAnaliticas,
  desactivarAnaliticas,
  guardarConsentimiento,
  leerConsentimiento,
  registrarVista,
} from '../lib/analiticas'
import './AvisoCookies.css'

/* Aviso de cookies y envio de vistas de pagina. Sin GA_ID no pinta nada. */
export default function AvisoCookies() {
  const { pathname } = useLocation()
  const [eleccion, setEleccion] = useState(() => (GA_ID ? leerConsentimiento() : 'sin-analiticas'))

  useEffect(() => {
    if (eleccion === 'aceptadas') activarAnaliticas()
  }, [eleccion])

  useEffect(() => {
    if (eleccion === 'aceptadas') registrarVista(pathname)
  }, [pathname, eleccion])

  // El enlace "Cookies" del pie vuelve a abrir el aviso.
  useEffect(() => {
    const reabrir = () => setEleccion(null)
    window.addEventListener('abrir-aviso-cookies', reabrir)
    return () => window.removeEventListener('abrir-aviso-cookies', reabrir)
  }, [])

  if (!GA_ID || eleccion) return null

  const elegir = (valor) => {
    guardarConsentimiento(valor)
    if (valor === 'rechazadas') desactivarAnaliticas()
    setEleccion(valor)
  }

  return (
    <div className="cookies" role="region" aria-label="Aviso de cookies">
      <p className="cookies__texto">
        Uso cookies de Google Analytics para saber cuántas personas visitan el sitio y qué páginas
        ven. Solo se activan si aceptas.
      </p>
      <div className="cookies__botones">
        <button type="button" className="cookies__boton" onClick={() => elegir('rechazadas')}>
          Rechazar
        </button>
        <button
          type="button"
          className="cookies__boton cookies__boton--si"
          onClick={() => elegir('aceptadas')}
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
