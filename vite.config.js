import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * GitHub Pages sirve archivos, no sabe de las rutas de React Router: entrar
 * directo a /tinyq o recargar ahi devolveria el 404 de GitHub. Pages usa
 * `404.html` para lo que no encuentra, asi que una copia del index deja que
 * el router resuelva la ruta ya en el navegador.
 */
function fallbackSpa() {
  return {
    name: 'fallback-spa',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fallbackSpa()],
})
