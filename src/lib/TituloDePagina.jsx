import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useIdioma } from './idioma'

/* El titulo de la pestaña, por pagina y por idioma. Antes /octuma y
   /octuma-app mostraban el de la portada. */
const TITULOS = {
  es: {
    '/': 'Imanol Rodríguez · Backend, IA y modelos que caben en tu bolsillo',
    '/octuma': 'Octuma · Cuantización de modelos de lenguaje a 4 y 8 bits',
    '/octuma-app': 'Octuma App · Un modelo de lenguaje en tu teléfono',
    '/octuma-privacidad': 'Octuma App · Política de privacidad',
  },
  en: {
    '/': 'Imanol Rodríguez · Backend, AI and models that fit in your pocket',
    '/octuma': 'Octuma · 4 and 8-bit quantization for language models',
    '/octuma-app': 'Octuma App · A language model on your phone',
    '/octuma-privacidad': 'Octuma App · Privacy policy',
  },
}

export default function TituloDePagina() {
  const { pathname } = useLocation()
  const { idioma } = useIdioma()

  useEffect(() => {
    const titulos = TITULOS[idioma]
    document.title = titulos[pathname] || titulos['/']
  }, [pathname, idioma])

  return null
}
