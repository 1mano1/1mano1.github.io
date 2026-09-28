import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// La base va antes que App a proposito.
import './estilos/base.css'
import App from './App.jsx'

// Si alguien mete el sitio en un iframe ajeno, se sale del marco.
if (window.top !== window.self) {
  try {
    window.top.location.href = window.self.location.href
  } catch {
    document.documentElement.style.display = 'none'
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
