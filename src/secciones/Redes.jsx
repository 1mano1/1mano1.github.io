import LogoFigma from './LogoFigma'
import { revelado, useRevelar } from '../lib/useRevelar'

/**
 * 05 — En línea. Figma 73:4270 (desktop) y 56:3260 (movil).
 *
 * Seis tarjetas iguales: un mosaico de 52 con la marca, dos lineas de texto y
 * la flecha de enlace externo. Los logotipos van dibujados en SVG y no como
 * imagen porque son formas planas de cuatro o cinco piezas.
 *
 * Las cuentas buenas, comprobadas el 2026-09-22: GitHub (`1mano1`), Hugging
 * Face (`Imanol11`) y Kaggle (`imanolr11`) responden 200. LinkedIn devuelve
 * 999 a cualquier peticion automatica —es su bloqueo de bots, no un perfil
 * que falte—, y la URL la dio Imanol.
 *
 * TODO(Imanol): faltan dos, y las dos siguen con lo que puso el diseno:
 *   figma.com/@imanolr          403, bloquea bots: no se sabe si existe
 *   roblox.com/users/profile    es la URL de ejemplo, sin id de usuario
 * El `@imanolr` no es un usuario verificado. Hay que poner el bueno o quitar
 * la tarjeta antes de publicar el sitio.
 *
 * Los contadores dibujados en la tarjeta de GitHub ("24 repos · 1.6k ★") no
 * estan aqui a proposito: son inventados, igual que el "Star 1.2k" que hubo
 * que quitar del portafolio de Figma. Si se quieren, salen de la API.
 */

/* Las marcas: `tono` es el fondo del mosaico y `tinta` el color del glifo. */

function MarcaGitHub() {
  return <span className="icono-github tarjeta-red__github" aria-hidden="true" />
}

function MarcaLinkedIn() {
  return <span className="tarjeta-red__letra">in</span>
}

/* Un circulo con dos ojos y media elipse de boca (Figma I33:757;28:41..44).
   La boca esta dibujada como elipse de 12x8 pero se renderiza a la mitad:
   medida sobre el PNG del diseno ocupa y 32..35, o sea solo la parte de
   abajo, asi que va como arco y no como elipse entera. */
function MarcaHuggingFace() {
  return (
    <svg width="32" height="32" viewBox="10 10 32 32" fill="none" aria-hidden="true">
      <circle cx="26" cy="26" r="16" fill="#ffd21e" />
      <ellipse cx="19" cy="23.5" rx="2" ry="2.5" fill="#3a2b0b" />
      <ellipse cx="30" cy="23.5" rx="2" ry="2.5" fill="#3a2b0b" />
      <path d="M20 32A6 4 0 0 0 32 32Z" fill="#3a2b0b" />
    </svg>
  )
}

/* Cuadrado girado con un hueco cuadrado dentro. Los 29.39 que da Figma son la
   caja del grupo ya girado: el lado real es 29.39 / (cos16 + sen16) = 23.5, y
   el hueco es la cuarta parte. Los 16 grados salen de medir las esquinas
   blancas en el PNG del diseno (15.95 por un lado, 16.7 por el otro). */
function MarcaRoblox() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <g transform="rotate(16 15 15)">
        <rect x="3.25" y="3.25" width="23.5" height="23.5" rx="2" fill="#ffffff" />
        <rect x="12.05" y="12.05" width="5.9" height="5.9" fill="#0e0f12" />
      </g>
    </svg>
  )
}

function MarcaKaggle() {
  return <span className="tarjeta-red__letra tarjeta-red__letra--k">k</span>
}

const REDES = [
  {
    id: 'github',
    nombre: 'GitHub',
    meta: 'Código y experimentos',
    cuenta: '@1mano1',
    url: 'https://github.com/1mano1',
    tono: '#0e0f12',
    marca: MarcaGitHub,
  },
  {
    id: 'linkedin',
    nombre: 'LinkedIn',
    meta: 'Experiencia y CV',
    cuenta: 'Imanol Rodríguez',
    url: 'https://www.linkedin.com/in/imanol-rodr%C3%ADguez-627985390/',
    tono: '#0a66c2',
    marca: MarcaLinkedIn,
  },
  {
    id: 'figma',
    nombre: 'Figma',
    meta: 'Diseños y prototipos',
    cuenta: '@imanolr',
    url: 'https://www.figma.com/@imanolr',
    tono: '#0e0f12',
    marca: () => <LogoFigma ancho={18} />,
  },
  {
    id: 'huggingface',
    nombre: 'Hugging Face',
    meta: 'Modelos cuantizados',
    cuenta: 'Imanol11',
    url: 'https://huggingface.co/Imanol11',
    tono: '#fff4d6',
    marca: MarcaHuggingFace,
  },
  {
    id: 'roblox',
    nombre: 'Roblox',
    meta: 'Juegos publicados',
    cuenta: 'ImanolDev',
    url: 'https://www.roblox.com/users/profile',
    tono: '#0e0f12',
    marca: MarcaRoblox,
  },
  {
    id: 'kaggle',
    nombre: 'Kaggle',
    meta: 'Notebooks y datasets',
    cuenta: 'imanolr11',
    url: 'https://www.kaggle.com/imanolr11',
    tono: '#e6f7fd',
    marca: MarcaKaggle,
  },
]

export default function Redes() {
  const [ref, visible] = useRevelar()

  return (
    <section className="redes" id="redes" ref={ref}>
      <div className="contenedor redes__interior">
        <div {...revelado(visible, 'redes__cabecera')}>
          <div className="redes__titulos">
            <p className="rotulo">05 — EN LÍNEA</p>
            <h2 className="titulo-seccion">Dónde encontrarme</h2>
          </div>
          <p className="redes__intro">
            Código en GitHub, diseños en Figma, modelos en Hugging Face y lo profesional en
            LinkedIn.
          </p>
        </div>

        <ul className="redes__lista">
          {REDES.map((r, i) => {
            const Marca = r.marca
            return (
              <li key={r.id} {...revelado(visible, 'tarjeta-red', 80 + i * 60)}>
                <a
                  className="tarjeta-red__enlace"
                  href={r.url}
                  target="_blank"
                  rel="noreferrer me"
                >
                  <span className="tarjeta-red__marca" style={{ background: r.tono }}>
                    <Marca />
                  </span>

                  <span className="tarjeta-red__textos">
                    <span className="tarjeta-red__nombre">{r.nombre}</span>
                    <span className="tarjeta-red__meta">
                      <span className="tarjeta-red__cuenta">{r.cuenta}</span>
                      <span className="tarjeta-red__punto" aria-hidden="true">
                        ·
                      </span>
                      <span className="tarjeta-red__que">{r.meta}</span>
                    </span>
                  </span>

                  <span className="tarjeta-red__flecha" aria-hidden="true">
                    <span className="icono-enlace" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
