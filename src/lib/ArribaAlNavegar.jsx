import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Sube al inicio al cambiar de pagina.
 *
 * React Router no toca el scroll: como no se recarga nada, si sales de la
 * seccion de open source —que esta a media pagina— entras a /tinyq con el
 * scroll donde lo dejaste, o sea por la mitad del articulo.
 *
 * Con "atras" no: ahi el navegador devuelve la posicion que tenia la pagina
 * y subir seria perder el sitio del portafolio. Por eso se salta el POP.
 */
export default function ArribaAlNavegar() {
  const { pathname } = useLocation()
  const tipo = useNavigationType()

  useEffect(() => {
    if (tipo !== 'POP') window.scrollTo(0, 0)
  }, [pathname, tipo])

  return null
}
