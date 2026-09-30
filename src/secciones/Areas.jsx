import { useTextos } from '../lib/idioma'
import { revelado, useRevelar } from '../lib/useRevelar'

/* 01 — Áreas. */
const CHIPS = {
  backend: ['FastAPI', 'PostgreSQL', 'Docker'],
  ia: ['PyTorch', 'GGUF', 'llama.cpp'],
  android: ['Kotlin', 'Flutter', 'llama.cpp'],
  roblox: ['Luau', 'Roblox Studio'],
}

const TEXTOS = {
  es: {
    rotulo: '01 — ÁREAS',
    titulo: 'En qué trabajo',
    entradilla:
      'Mi base es el backend, pero me gusta llevar las cosas de punta a punta: del modelo al servidor y del servidor a la pantalla.',
    tarjetas: {
      backend: [
        'Backend y APIs',
        'Servicios en Python y Node, bases de datos, colas y despliegue con Docker. Donde paso la mayor parte del día.',
      ],
      ia: [
        'IA y cuantización',
        'Entreno y ajusto modelos, y los comprimo a INT8 / INT4 para que corran en menos memoria perdiendo lo menos posible.',
      ],
      android: [
        'Apps Android',
        'Apps en Kotlin y en Flutter con modelos de IA corriendo directo en el teléfono, sin depender de la nube.',
      ],
      roblox: [
        'Juegos en Roblox',
        'Mecánicas, sistemas y experiencias multijugador programadas en Luau dentro de Roblox Studio.',
      ],
    },
  },
  en: {
    rotulo: '01 — AREAS',
    titulo: 'What I work on',
    entradilla:
      'Backend is my home base, but I like taking things end to end: from the model to the server, and from the server to the screen.',
    tarjetas: {
      backend: [
        'Backend and APIs',
        'Services in Python and Node, databases, queues and deployment with Docker. Where I spend most of my day.',
      ],
      ia: [
        'AI and quantization',
        'I train and fine-tune models, and compress them to INT8 / INT4 so they run in less memory while losing as little as possible.',
      ],
      android: [
        'Android apps',
        'Apps in Kotlin and Flutter with AI models running right on the phone, no cloud needed.',
      ],
      roblox: [
        'Roblox games',
        'Mechanics, systems and multiplayer experiences written in Luau inside Roblox Studio.',
      ],
    },
  },
}

export default function Areas() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="areas" id="areas" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'areas__cabecera')}>
          <div className="areas__titulos">
            <p className="rotulo">{t.rotulo}</p>
            <h2 className="titulo-seccion">{t.titulo}</h2>
          </div>
          <p className="entradilla">{t.entradilla}</p>
        </div>

        <div className="areas__rejilla">
          {Object.keys(CHIPS).map((icono, i) => {
            const [titulo, texto] = t.tarjetas[icono]
            return (
              <article key={icono} {...revelado(visible, 'tarjeta-area', 80 + i * 80)}>
                <span className="tarjeta-area__icono">
                  <img src={`/iconos/area-${icono}.svg`} alt="" width="56" height="56" />
                  <img
                    className="tarjeta-area__icono-hover"
                    src={`/iconos/area-${icono}-hover.svg`}
                    alt=""
                    width="56"
                    height="56"
                  />
                </span>

                <div className="tarjeta-area__cuerpo">
                  <h3 className="tarjeta-area__titulo">{titulo}</h3>
                  <p className="tarjeta-area__texto">{texto}</p>
                  <ul className="tarjeta-area__chips">
                    {CHIPS[icono].map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
