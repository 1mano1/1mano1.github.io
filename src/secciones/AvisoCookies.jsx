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
import { useTextos } from '../lib/idioma'
import './AvisoCookies.css'

const TEXTOS = {
  es: {
    region: 'Aviso de cookies',
    texto:
      'Uso cookies de Google Analytics para saber cuántas personas visitan el sitio y qué páginas ven. Solo se activan si aceptas.',
    rechazar: 'Rechazar',
    aceptar: 'Aceptar',
  },
  en: {
    region: 'Cookie notice',
    texto:
      'I use Google Analytics cookies to know how many people visit the site and which pages they see. They only turn on if you accept.',
    rechazar: 'Decline',
    aceptar: 'Accept',
  },
}

/* Aviso de cookies y envio de vistas de pagina. Sin GA_ID no pinta nada. */
export default function AvisoCookies() {
  const { pathname } = useLocation()
  const t = useTextos(TEXTOS)
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
    <div className="cookies" role="region" aria-label={t.region}>
      <p className="cookies__texto">{t.texto}</p>
      <div className="cookies__botones">
        <button type="button" className="cookies__boton" onClick={() => elegir('rechazadas')}>
          {t.rechazar}
        </button>
        <button
          type="button"
          className="cookies__boton cookies__boton--si"
          onClick={() => elegir('aceptadas')}
        >
          {t.aceptar}
        </button>
      </div>
    </div>
  )
}
