import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/* GitHub Pages sirve archivos, no sabe de las rutas de React Router: cada ruta
   lleva su copia del index (Pages sirve /octuma desde octuma.html con 200) y
   404.html cubre todo lo demas. */
const RUTAS = ['octuma', 'octuma-app', 'octuma-privacidad', 'tinyq']

function fallbackSpa() {
  return {
    name: 'fallback-spa',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      const index = resolve(dist, 'index.html')
      copyFileSync(index, resolve(dist, '404.html'))
      for (const ruta of RUTAS) copyFileSync(index, resolve(dist, `${ruta}.html`))
    },
  }
}

// Pages no deja poner cabeceras HTTP, asi que la politica de seguridad va en
// un <meta>. Solo al compilar: el servidor de desarrollo usa scripts en linea.
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ')

function cabecerasDeSeguridad() {
  return {
    name: 'cabeceras-de-seguridad',
    apply: 'build',
    transformIndexHtml() {
      return [
        { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
        { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' }, injectTo: 'head-prepend' },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cabecerasDeSeguridad(), fallbackSpa()],
})
