import { useState } from 'react'

import LogoFigma from './LogoFigma'
import { revelado, useRevelar } from '../lib/useRevelar'

/**
 * 04 — Diseño. Figma 73:3844 (desktop) y 56:3052 (movil).
 *
 * Las cinco miniaturas son maquetas dibujadas en Figma (telefonos girados,
 * degradados, graficas), asi que van como PNG exportado a 2x y no como HTML:
 * rehacerlas a mano seria reimplementar cinco apps de mentira. El titulo y la
 * categoria si son texto.
 *
 * El pie llevaba un corazon con 128 y un ojo con 2.4k, copiados del dibujo.
 * Ninguno de estos diseños esta publicado en Figma Community, asi que esos
 * numeros no salen de ningun lado y se fueron.
 *
 * El diseno movil de esta seccion esta oculto en el archivo de Figma: todo
 * lo que cuelga de 56:3052 exporta un PNG de 1x1. Las medidas salen del
 * volcado de `design-ref/spec/disenos.mobile.txt`, que si las tiene, y en
 * movil se reusa el render de desktop recortado por los lados, que es lo
 * mismo que hace el diseno con cuatro de las cinco maquetas.
 */

/* TODO(Imanol): la URL del perfil real. El boton esta dibujado como "Ver
   perfil en Figma Community" y hoy apunta al directorio, no a un perfil. */
const FIGMA_PERFIL = 'https://www.figma.com/community'

const FILTROS = [
  { id: 'todos', texto: 'Todos' },
  { id: 'movil', texto: 'Apps móviles' },
  { id: 'web', texto: 'Web' },
  { id: 'dashboards', texto: 'Dashboards' },
  { id: 'sistemas', texto: 'Sistemas de diseño' },
]

/* `alto` y `fondo` son los de Figma: la miniatura tiene altura fija y su
   relleno es el mismo color con el que se exporto el PNG. `columnas` es
   cuantas columnas de la galeria ocupa la tarjeta.
   `altoMovil` es la altura del movil dibujado, salvo en Pulso: ahi el diseno
   redibuja los telefonos y no se puede exportar, asi que 292 es la altura a
   la que el arte de desktop entra completo y los deja de 167 de ancho,
   contra los 163 que mide el movil de Figma. */
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
  },
  {
    id: 'clima',
    titulo: 'Nimbo · Widget de clima',
    meta: 'App móvil · Componentes',
    filtro: 'movil',
    alt: 'Widget de clima de Colima con la temperatura y el pronóstico de cinco días',
    img: { ancho: 392, alto: 420 },
    columnas: 1,
    alto: 420,
    altoMovil: 382,
    fondo: '#fff3e6',
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
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
