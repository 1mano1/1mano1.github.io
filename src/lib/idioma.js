import { createContext, useContext } from 'react'

/*
 * Idioma del sitio: español o ingles, a eleccion del visitante.
 *
 * La eleccion se guarda en el navegador. Si todavia no ha elegido nada, se
 * toma el idioma del navegador: español para quien lo tenga en español, e
 * ingles para todos los demas. El proveedor esta en ProveedorIdioma.jsx.
 */
export const IDIOMAS = ['es', 'en']
export const CLAVE_IDIOMA = 'idioma'

export const ContextoIdioma = createContext({ idioma: 'es', cambiar: () => {} })

export function useIdioma() {
  return useContext(ContextoIdioma)
}

/** Los textos del idioma activo: `useTextos({ es: {...}, en: {...} })`. */
export function useTextos(textos) {
  return textos[useIdioma().idioma]
}
