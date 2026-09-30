import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ArribaAlNavegar from './lib/ArribaAlNavegar'
import ProveedorIdioma from './lib/ProveedorIdioma'
import TituloDePagina from './lib/TituloDePagina'
import AvisoCookies from './secciones/AvisoCookies'
import OctumaApp from './paginas/OctumaApp'
import Portafolio from './paginas/Portafolio'
import Octuma from './paginas/TinyQ'

export default function App() {
  return (
    <ProveedorIdioma>
      <BrowserRouter>
        <ArribaAlNavegar />
        <TituloDePagina />
        <Routes>
          <Route path="/" element={<Portafolio />} />
          <Route path="/octuma" element={<Octuma />} />
          <Route path="/octuma-app" element={<OctumaApp />} />
          {/* La libreria se llamaba TinyQ: los enlaces viejos siguen llegando. */}
          <Route path="/tinyq" element={<Navigate to="/octuma" replace />} />
        </Routes>
        <AvisoCookies />
      </BrowserRouter>
    </ProveedorIdioma>
  )
}
