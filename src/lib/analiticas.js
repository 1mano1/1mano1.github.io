// Google Analytics 4 con consentimiento: no se carga nada hasta que la persona acepta.
// El ID de medicion (G-...) va en VITE_GA_ID, en .env.production.
// Sin ID no hay analiticas ni aviso de cookies.
export const GA_ID = import.meta.env.VITE_GA_ID || ''

const CLAVE = 'consentimiento-cookies'

export function leerConsentimiento() {
  try {
    return localStorage.getItem(CLAVE)
  } catch {
    return null
  }
}

export function guardarConsentimiento(valor) {
  try {
    localStorage.setItem(CLAVE, valor)
  } catch {
    // Sin almacenamiento el aviso vuelve a salir en la siguiente visita.
  }
  window.dispatchEvent(new Event('consentimiento-cambio'))
}

let cargado = false

export function activarAnaliticas() {
  if (!GA_ID) return
  window[`ga-disable-${GA_ID}`] = false
  if (cargado) return
  cargado = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // Las vistas las manda el router al cambiar de pagina.
  window.gtag('config', GA_ID, { send_page_view: false })

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

export function desactivarAnaliticas() {
  if (!GA_ID) return
  window[`ga-disable-${GA_ID}`] = true
  // Borra las cookies que GA ya hubiera puesto.
  const dominio = location.hostname
  for (const c of document.cookie.split(';')) {
    const nombre = c.split('=')[0].trim()
    if (nombre === '_ga' || nombre.startsWith('_ga_')) {
      document.cookie = `${nombre}=; Max-Age=0; path=/`
      document.cookie = `${nombre}=; Max-Age=0; path=/; domain=${dominio}`
      document.cookie = `${nombre}=; Max-Age=0; path=/; domain=.${dominio}`
    }
  }
}

export function registrarVista(ruta) {
  if (!GA_ID || !cargado || window[`ga-disable-${GA_ID}`]) return
  window.gtag('event', 'page_view', {
    page_path: ruta,
    page_location: location.href,
    page_title: document.title,
  })
}

// Lo usa el enlace "Cookies" del pie para volver a mostrar el aviso.
export function abrirAvisoCookies() {
  window.dispatchEvent(new Event('abrir-aviso-cookies'))
}
