import { useState } from 'react'

import LogoFigma from './LogoFigma'
import { revelado, useRevelar } from '../lib/useRevelar'

/* 04 — Diseño. */

/* El perfil de Community donde estan publicados los cinco disenos. */
const FIGMA_PERFIL = 'https://www.figma.com/@imanolrdz'

const FILTROS = [
  { id: 'todos', texto: 'Todos' },
  { id: 'movil', texto: 'Apps móviles' },
  { id: 'web', texto: 'Web' },
  { id: 'dashboards', texto: 'Dashboards' },
  { id: 'sistemas', texto: 'Sistemas de diseño' },
]

/* `alto` y `fondo` son los de Figma. */
const DISENOS = [
  {
    id: 'banca',
    titulo: 'Pulso · App de finanzas',
    meta: 'App móvil · 24 pantallas',
    filtro: 'movil',
    alt: 'Dos teléfonos con la app de finanzas Pulso, en claro y en oscuro',
    img: { ancho: 784, alto: 420 },
    columnas: 2,
    alto: 420,
    altoMovil: 292,
    fondo: '#eef2ff',
    figma: 'https://www.figma.com/community/file/1686205705929795504',
  },
  {
    id: 'clima',
    titulo: 'Nimbo · Widget de clima',
    meta: 'App móvil · Componentes',
    filtro: 'movil',
    alt: 'Widget de clima de Mérida con la temperatura y el pronóstico de cinco días',
    img: { ancho: 392, alto: 420 },
    columnas: 1,
    alto: 420,
    altoMovil: 382,
    fondo: '#fff3e6',
    figma: 'https://www.figma.com/community/file/1686207688042591161',
  },
  {
    id: 'dashboard',
    titulo: 'Observa · Dashboard de ML',
    meta: 'Web app · Dark mode',
    filtro: 'dashboards',
    alt: 'Panel oscuro de un entrenamiento con la curva de pérdida y las métricas',
    img: { ancho: 384, alto: 300 },
    columnas: 1,
    alto: 300,
    altoMovil: 300,
    fondo: '#0e0f12',
    figma: 'https://www.figma.com/community/file/1686209291573876671',
  },
  {
    id: 'landing',
    titulo: 'Brisa · Landing SaaS',
    meta: 'Web · Responsive',
    filtro: 'web',
    alt: 'Página de inicio de Brisa con el titular "Tu equipo, en sincronía"',
    img: { ancho: 384, alto: 300 },
    columnas: 1,
    alto: 300,
    altoMovil: 300,
    fondo: '#eef7f1',
    figma: 'https://www.figma.com/community/file/1686210078288540613',
  },
  {
    id: 'sistema',
    titulo: 'Átomo · Design system',
    meta: '120 componentes · Variables',
    filtro: 'sistemas',
    alt: 'Botones, interruptores, campo de texto y paleta de un sistema de diseño',
    img: { ancho: 384, alto: 300 },
    columnas: 1,
    alto: 300,
    altoMovil: 300,
    fondo: '#f5f6f8',
    figma: 'https://www.figma.com/community/file/1686208607363343291',
  },
]

export default function Disenos() {
  const [ref, visible] = useRevelar()
  const [filtro, setFiltro] = useState('todos')

  const lista = filtro === 'todos' ? DISENOS : DISENOS.filter((d) => d.filtro === filtro)

  return (
    <section className="dis" id="diseno" ref={ref}>
      <div className="contenedor dis__interior">
        <div {...revelado(visible, 'dis__titulos')}>
          <p className="rotulo">04 — DISEÑO</p>
          <h2 className="titulo-seccion">Diseños en Figma</h2>
        </div>

        <a
          className="dis__perfil"
          href={FIGMA_PERFIL}
          target="_blank"
          rel="noreferrer"
          {...revelado(visible, 'dis__perfil', 60)}
        >
          <LogoFigma />
          Ver perfil en Figma Community
        </a>

        <div {...revelado(visible, 'dis__filtros-carril', 80)}>
          <ul className="dis__filtros">
            {FILTROS.map((f) => (
              <li key={f.id}>
                <button
                  className="dis__filtro"
                  type="button"
                  aria-pressed={filtro === f.id}
                  onClick={() => setFiltro(f.id)}
                >
                  {f.texto}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="dis__galeria">
          {lista.map((d, i) => {
            const rev = revelado(visible, 'tarjeta-dis', 120 + i * 60)
            return (
              <li
                className={rev.className}
                key={d.id}
                style={{
                  ...rev.style,
                  '--columnas': d.columnas,
                  '--alto': `${d.alto}px`,
                  '--alto-movil': `${d.altoMovil}px`,
                  '--proporcion': d.img.ancho / d.img.alto,
                  '--fondo': d.fondo,
                }}
              >
                <a
                  className="tarjeta-dis__enlace"
                  href={d.figma}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="tarjeta-dis__miniatura">
                    <img
                      src={`/disenos/${d.id}.png`}
                      alt={d.alt}
                      width={d.img.ancho}
                      height={d.img.alto}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="tarjeta-dis__pie">
                    <div className="tarjeta-dis__textos">
                      <h3 className="tarjeta-dis__titulo">{d.titulo}</h3>
                      <p className="tarjeta-dis__meta">{d.meta}</p>
                    </div>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
