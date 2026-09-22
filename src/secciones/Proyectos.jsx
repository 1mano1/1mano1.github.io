import TelefonoLumen from './TelefonoLumen'
import { revelado, useRevelar } from '../lib/useRevelar'

/**
 * 03 — Proyectos. Figma 73:3584 (desktop) y 54:3050 (movil).
 *
 * Tres tarjetas identicas salvo por la ilustracion de arriba: un recuadro
 * de 320 de alto, con el dibujo centrado y sin escalar, que se recorta por
 * los lados cuando la tarjeta es mas estrecha que los 382 dibujados.
 *
 * Lumen decia "corre un modelo de 3B sin internet" en presente y todavia no
 * corre nada: en C:/ProyectosIA_Imanol/Lumen solo hay diseño. De Orbit API se
 * cayo "2M de peticiones al mes con latencia p95 de 80 ms", que no sale de
 * ninguna medicion.
 *
 * TODO(Imanol): Circuit Rush y Orbit API no tienen repo en 1mano1, asi que de
 * esos dos no hay nada que comprobar. Si existen en otro lado, enlazarlos.
 */

const PROYECTOS = [
  {
    arte: 'lumen',
    fondo: '#e9eeff',
    titulo: 'Lumen — IA en tu bolsillo',
    anio: 'En curso',
    texto:
      'App Android para hablar con un modelo cuantizado con tinyq sin conexión. Los modelos ya están listos en GGUF; la app va en el diseño.',
    chips: ['Kotlin', 'llama.cpp', 'INT4'],
  },
  {
    arte: 'circuit-rush',
    fondo: '#fff3e6',
    titulo: 'Circuit Rush',
    anio: '2025',
    texto:
      'Juego de carreras multijugador en Roblox con física personalizada, tienda y tablas de clasificación guardadas con DataStore.',
    chips: ['Luau', 'Roblox Studio'],
  },
  {
    arte: 'orbit-api',
    fondo: '#eef7f1',
    titulo: 'Orbit API',
    anio: '2025',
    texto:
      'Backend para una red de tiendas locales: pagos, inventario y notificaciones, cada cosa en su servicio detrás de un mismo gateway.',
    chips: ['FastAPI', 'PostgreSQL', 'Redis'],
  },
]

/* Los nodos del diagrama de Orbit API (Figma 26:3 .. 26:18), en las
   coordenadas del lienzo de 382x320 en el que estan dibujadas las lineas. */
const NODOS_ORBIT = [
  { x: 135, y: 50, texto: 'API Gateway', color: 'var(--azul)' },
  { x: 33, y: 150, texto: 'Pedidos' },
  { x: 138, y: 150, texto: 'Inventario' },
  { x: 269, y: 150, texto: 'Pagos' },
  { x: 78, y: 250, texto: 'PostgreSQL' },
  { x: 230, y: 250, texto: 'Redis' },
]

function Arte({ tipo }) {
  if (tipo === 'lumen') return <TelefonoLumen />

  if (tipo === 'orbit-api') {
    return (
      <div className="lienzo320" aria-hidden="true">
        <img src="/ilustraciones/proyecto-orbit-api.svg" alt="" width="382" height="320" />
        {NODOS_ORBIT.map((n) => (
          <span
            className="orbit__nodo mono"
            key={n.texto}
            style={{ left: `${n.x}px`, top: `${n.y}px` }}
          >
            <span className="orbit__punto" style={{ background: n.color || 'var(--verde)' }} />
            {n.texto}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="lienzo320" aria-hidden="true">
      <img src={`/ilustraciones/proyecto-${tipo}.svg`} alt="" width="382" height="320" />
    </div>
  )
}

export default function Proyectos() {
  const [ref, visible] = useRevelar()

  return (
    <section className="proy" id="proyectos" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'proy__cabecera')}>
          <div className="proy__titulos">
            <p className="rotulo">03 — PROYECTOS</p>
            <h2 className="titulo-seccion">Cosas que he construido</h2>
          </div>
          <a className="proy__todos" href="https://github.com/1mano1">
            Ver todos en GitHub
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="proy__lista">
          {PROYECTOS.map((p, i) => (
            <li key={p.arte} {...revelado(visible, 'tarjeta-proy', 80 + i * 80)}>
              <div className="tarjeta-proy__visual" style={{ background: p.fondo }}>
                <Arte tipo={p.arte} />
              </div>

              <div className="tarjeta-proy__cuerpo">
                <div className="tarjeta-proy__alto">
                  <h3 className="tarjeta-proy__titulo">{p.titulo}</h3>
                  <span className="tarjeta-proy__anio mono">{p.anio}</span>
                </div>
                <p className="tarjeta-proy__texto">{p.texto}</p>
                <ul className="tarjeta-proy__chips">
                  {p.chips.map((c) => (
                    <li className="chip-tec mono" key={c}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
