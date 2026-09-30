import { useCallback, useEffect, useState } from 'react'

import { CLAVE_IDIOMA, ContextoIdioma, IDIOMAS } from './idioma'

function idiomaInicial() {
  try {
    const guardado = localStorage.getItem(CLAVE_IDIOMA)
    if (IDIOMAS.includes(guardado)) return guardado
  } catch {
    // Sin almacenamiento se decide por el navegador en cada visita.
  }
  const preferidos = navigator.languages?.length ? navigator.languages : [navigator.language]
  return preferidos.some((l) => l?.toLowerCase().startsWith('es')) ? 'es' : 'en'
}

export default function ProveedorIdioma({ children }) {
  const [idioma, setIdioma] = useState(idiomaInicial)

  const cambiar = useCallback((nuevo) => {
    setIdioma(nuevo)
    try {
      localStorage.setItem(CLAVE_IDIOMA, nuevo)
    } catch {
      // La eleccion dura lo que dure la pestaña.
    }
  }, [])

  // Lectores de pantalla y traductores automaticos leen el idioma de <html>.
  useEffect(() => {
    document.documentElement.lang = idioma
  }, [idioma])

  return <ContextoIdioma.Provider value={{ idioma, cambiar }}>{children}</ContextoIdioma.Provider>
}
