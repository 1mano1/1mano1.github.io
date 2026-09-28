import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/* Sube al inicio al cambiar de pagina. */
export default function ArribaAlNavegar() {
  const { pathname } = useLocation()
  const tipo = useNavigationType()

  useEffect(() => {
    if (tipo !== 'POP') window.scrollTo(0, 0)
  }, [pathname, tipo])

  return null
}
