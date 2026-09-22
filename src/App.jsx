import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ArribaAlNavegar from './lib/ArribaAlNavegar'
import Portafolio from './paginas/Portafolio'
import TinyQ from './paginas/TinyQ'

export default function App() {
  return (
    <BrowserRouter>
      <ArribaAlNavegar />
      <Routes>
        <Route path="/" element={<Portafolio />} />
        <Route path="/tinyq" element={<TinyQ />} />
      </Routes>
    </BrowserRouter>
  )
}
