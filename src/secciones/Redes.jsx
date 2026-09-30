import LogoFigma from './LogoFigma'
import { useTextos } from '../lib/idioma'
import { revelado, useRevelar } from '../lib/useRevelar'

/* 05 — En línea. */

/* Las marcas: `tono` es el fondo del mosaico y `tinta` el color del glifo. */

function MarcaGitHub() {
  return <span className="icono-github tarjeta-red__github" aria-hidden="true" />
}

function MarcaLinkedIn() {
  return <span className="tarjeta-red__letra">in</span>
}

/* Un circulo con dos ojos y media elipse de boca (Figma I33:757;28:41..44). */
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

/* Cuadrado girado con un hueco cuadrado dentro. */
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
    cuenta: '@1mano1',
    url: 'https://github.com/1mano1',
    tono: '#0e0f12',
    marca: MarcaGitHub,
  },
  {
    id: 'linkedin',
    nombre: 'LinkedIn',
    cuenta: 'Imanol Rodríguez',
    url: 'https://www.linkedin.com/in/imanol-rodr%C3%ADguez-627985390/',
    tono: '#0a66c2',
    marca: MarcaLinkedIn,
  },
  {
    id: 'figma',
    nombre: 'Figma',
    cuenta: '@imanolrdz',
    url: 'https://www.figma.com/@imanolrdz',
    tono: '#0e0f12',
    marca: () => <LogoFigma ancho={18} />,
  },
  {
    id: 'huggingface',
    nombre: 'Hugging Face',
    cuenta: 'Imanol11',
    url: 'https://huggingface.co/Imanol11',
    tono: '#fff4d6',
    marca: MarcaHuggingFace,
  },
  {
    id: 'roblox',
    nombre: 'Roblox',
    cuenta: 'ImanolDev',
    url: 'https://www.roblox.com/users/profile',
    tono: '#0e0f12',
    marca: MarcaRoblox,
  },
  {
    id: 'kaggle',
    nombre: 'Kaggle',
    cuenta: 'imanolr11',
    url: 'https://www.kaggle.com/imanolr11',
    tono: '#e6f7fd',
    marca: MarcaKaggle,
  },
]

const TEXTOS = {
  es: {
    rotulo: '05 — EN LÍNEA',
    titulo: 'Dónde encontrarme',
    intro: 'Código en GitHub, diseños en Figma, modelos en Hugging Face y lo profesional en LinkedIn.',
    meta: {
      github: 'Código y experimentos',
      linkedin: 'Experiencia y CV',
      figma: 'Diseños y prototipos',
      huggingface: 'Modelos cuantizados',
      roblox: 'Juegos publicados',
      kaggle: 'Notebooks y datasets',
    },
  },
  en: {
    rotulo: '05 — ONLINE',
    titulo: 'Where to find me',
    intro: 'Code on GitHub, designs on Figma, models on Hugging Face and the professional side on LinkedIn.',
    meta: {
      github: 'Code and experiments',
      linkedin: 'Experience and CV',
      figma: 'Designs and prototypes',
      huggingface: 'Quantized models',
      roblox: 'Published games',
      kaggle: 'Notebooks and datasets',
    },
  },
}

export default function Redes() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="redes" id="redes" ref={ref}>
      <div className="contenedor redes__interior">
        <div {...revelado(visible, 'redes__cabecera')}>
          <div className="redes__titulos">
            <p className="rotulo">{t.rotulo}</p>
            <h2 className="titulo-seccion">{t.titulo}</h2>
          </div>
          <p className="redes__intro">{t.intro}</p>
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
                      <span className="tarjeta-red__que">{t.meta[r.id]}</span>
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
