import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// La base va antes que App a proposito: App arrastra el CSS de las
// secciones, y si se cargara despues ganaria los empates de especificidad
// (`.boton` pisaba a `.boton--repo` y los botones salian mas grandes).
import './estilos/base.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
