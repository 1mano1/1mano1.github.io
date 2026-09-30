import { useState } from 'react'

import LogoFigma from './LogoFigma'
import { useTextos } from '../lib/idioma'
import { revelado, useRevelar } from '../lib/useRevelar'

/* 04 — Diseño. */

/* El perfil de Community donde estan publicados los cinco disenos. */
const FIGMA_PERFIL = 'https://www.figma.com/@imanolrdz'

const FILTROS = ['todos', 'movil', 'web', 'dashboards', 'sistemas']

/* `alto` y `fondo` son los de Figma. */
const DISENOS = [
  {
    id: 'banca',
    filtro: 'movil',
    img: { ancho: 784, alto: 420 },
    columnas: 2,
    alto: 420,
    altoMovil: 292,
    fondo: '#eef2ff',
    figma: 'https://www.figma.com/community/file/1686205705929795504',
  },
  {
    id: 'clima',
    filtro: 'movil',
    img: { ancho: 392, alto: 420 },
    columnas: 1,
    alto: 420,
    altoMovil: 382,
    fondo: '#fff3e6',
    figma: 'https://www.figma.com/community/file/1686207688042591161',
  },
  {
    id: 'dashboard',
    filtro: 'dashboards',
    img: { ancho: 384, alto: 300 },
    columnas: 1,
    alto: 300,
    altoMovil: 300,
    fondo: '#0e0f12',
    figma: 'https://www.figma.com/community/file/1686209291573876671',
  },
  {
    id: 'landing',
    filtro: 'web',
    img: { ancho: 384, alto: 300 },
    columnas: 1,
    alto: 300,
    altoMovil: 300,
    fondo: '#eef7f1',
    figma: 'https://www.figma.com/community/file/1686210078288540613',
  },
  {
    id: 'sistema',
    filtro: 'sistemas',
    img: { ancho: 384, alto: 300 },
    columnas: 1,
    alto: 300,
    altoMovil: 300,
    fondo: '#f5f6f8',
    figma: 'https://www.figma.com/community/file/1686208607363343291',
  },
]

/* Por diseño: titulo, meta y texto alternativo de la imagen. */
const TEXTOS = {
  es: {
    rotulo: '04 — DISEÑO',
    titulo: 'Diseños en Figma',
    perfil: 'Ver perfil en Figma Community',
    filtros: {
      todos: 'Todos',
      movil: 'Apps móviles',
      web: 'Web',
      dashboards: 'Dashboards',
      sistemas: 'Sistemas de diseño',
    },
    disenos: {
      banca: [
        'Pulso · App de finanzas',
        'App móvil · 24 pantallas',
        'Dos teléfonos con la app de finanzas Pulso, en claro y en oscuro',
      ],
      clima: [
        'Nimbo · Widget de clima',
        'App móvil · Componentes',
        'Widget de clima de Mérida con la temperatura y el pronóstico de cinco días',
      ],
      dashboard: [
        'Observa · Dashboard de ML',
        'Web app · Dark mode',
        'Panel oscuro de un entrenamiento con la curva de pérdida y las métricas',
      ],
      landing: [
        'Brisa · Landing SaaS',
        'Web · Responsive',
        'Página de inicio de Brisa con el titular "Tu equipo, en sincronía"',
      ],
      sistema: [
        'Átomo · Design system',
        '120 componentes · Variables',
        'Botones, interruptores, campo de texto y paleta de un sistema de diseño',
      ],
    },
  },
  en: {
    rotulo: '04 — DESIGN',
    titulo: 'Designs in Figma',
    perfil: 'See my Figma Community profile',
    filtros: {
      todos: 'All',
      movil: 'Mobile apps',
      web: 'Web',
      dashboards: 'Dashboards',
      sistemas: 'Design systems',
    },
    disenos: {
      banca: [
        'Pulso · Finance app',
        'Mobile app · 24 screens',
        'Two phones with the Pulso finance app, in light and dark mode',
      ],
      clima: [
        'Nimbo · Weather widget',
        'Mobile app · Components',
        'Weather widget for Mérida with the temperature and a five-day forecast',
      ],
      dashboard: [
        'Observa · ML dashboard',
        'Web app · Dark mode',
        'Dark dashboard of a training run with the loss curve and metrics',
      ],
      landing: [
        'Brisa · SaaS landing page',
        'Web · Responsive',
        'Brisa home page with the headline "Tu equipo, en sincronía" (Your team, in sync)',
      ],
      sistema: [
        'Átomo · Design system',
        '120 components · Variables',
        'Buttons, toggles, a text field and the color palette of a design system',
      ],
    },
  },
}

export default function Disenos() {
  const [ref, visible] = useRevelar()
  const [filtro, setFiltro] = useState('todos')
  const t = useTextos(TEXTOS)

  const lista = filtro === 'todos' ? DISENOS : DISENOS.filter((d) => d.filtro === filtro)

  return (
    <section className="dis" id="diseno" ref={ref}>
      <div className="contenedor dis__interior">
        <div {...revelado(visible, 'dis__titulos')}>
          <p className="rotulo">{t.rotulo}</p>
          <h2 className="titulo-seccion">{t.titulo}</h2>
        </div>

        <a
          className="dis__perfil"
          href={FIGMA_PERFIL}
          target="_blank"
          rel="noreferrer"
          {...revelado(visible, 'dis__perfil', 60)}
        >
          <LogoFigma />
          {t.perfil}
        </a>

        <div {...revelado(visible, 'dis__filtros-carril', 80)}>
          <ul className="dis__filtros">
            {FILTROS.map((id) => (
              <li key={id}>
                <button
                  className="dis__filtro"
                  type="button"
                  aria-pressed={filtro === id}
                  onClick={() => setFiltro(id)}
                >
                  {t.filtros[id]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="dis__galeria">
          {lista.map((d, i) => {
            const rev = revelado(visible, 'tarjeta-dis', 120 + i * 60)
            const [titulo, meta, alt] = t.disenos[d.id]
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
                      alt={alt}
                      width={d.img.ancho}
                      height={d.img.alto}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="tarjeta-dis__pie">
                    <div className="tarjeta-dis__textos">
                      <h3 className="tarjeta-dis__titulo">{titulo}</h3>
                      <p className="tarjeta-dis__meta">{meta}</p>
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
