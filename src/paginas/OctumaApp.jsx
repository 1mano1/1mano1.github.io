import { Link } from 'react-router-dom'

import { useTextos } from '../lib/idioma'
import { revelado, useRevelar } from '../lib/useRevelar'
import SelectorIdioma from '../secciones/SelectorIdioma'
import './OctumaApp.css'

/* Pagina de Octuma App. */

/* Perdida de perplejidad frente al original, dentro de llama.cpp (C:/octuma/runs/COMPARATIVA_GGUF.md). */
const MODELOS = [
  { nombre: 'Qwen2.5 0.5B', gb: '0.52 GB', licencia: 'Apache 2.0', octuma: 3.73, q4km: 2.63 },
  { nombre: 'Qwen2.5 1.5B', gb: '1.32 GB', licencia: 'Apache 2.0', octuma: 2.11, q4km: 4.74 },
  { nombre: 'Qwen2.5 3B', gb: '2.40 GB', licencia: 'Qwen Research', comercial: false, octuma: 2.43, q4km: 6.21 },
]
const TOPE = 7

const TEXTOS = {
  es: {
    miga: 'Estás en',
    portafolio: 'Portafolio',
    proyectos: 'Proyectos',
    irComo: 'Cómo funciona',
    titulo: ['Un modelo de lenguaje que corre ', 'en tu teléfono', '.'],
    bajada:
      'Octuma App descarga un modelo una vez y lo ejecuta dentro del teléfono. Tus mensajes no salen del aparato y, después de la descarga, ya no necesita internet.',
    estado: 'En desarrollo · llegará a Google Play',
    verComo: 'Ver cómo funciona',
    altHero:
      'Tres pantallas de Octuma App: una conversación, el inicio con el pulpo del logo y la bienvenida',
    cambia: ['Qué cambia', 'Lo mismo que un chat de IA, sin la nube'],
    cambios: [
      ['Nada sale del teléfono', 'El modelo se ejecuta ahí mismo. No hay un servidor al que mandar tus mensajes.'],
      ['Funciona sin señal', 'Después de descargar el modelo, el internet deja de hacer falta.'],
      [
        'Va más despacio que la nube',
        'Un teléfono no es una tarjeta gráfica. Responde a la velocidad a la que lees, no de golpe.',
      ],
    ],
    como: ['Cómo funciona', 'De la descarga a la primera respuesta'],
    pasos: [
      [
        'Elige un modelo',
        'La app revisa cuánta memoria tiene tu teléfono y te ofrece el modelo más grande que le cabe con margen. También puedes buscar otros en Hugging Face.',
      ],
      [
        'Descárgalo una vez',
        'Antes de empezar comprueba que haya memoria y espacio. Si sales de la app, la descarga se pausa y luego sigue donde iba. Puedes limitarla a wifi, y el archivo se verifica con SHA-256 antes de usarlo.',
      ],
      [
        'Conversa sin conexión',
        'El modelo corre con llama.cpp dentro del teléfono, aparte de la interfaz, para que la app no se congele mientras responde. Puedes detener la respuesta cuando quieras.',
      ],
    ],
    modelos: [
      'Los modelos',
      'Modelos que caben y pierden poco',
      'Los modelos oficiales son de la familia Qwen2.5, comprimidos a 4 bits con la librería Octuma. Frente a Q4_K_M, el formato de 4 bits más usado en llama.cpp, pierden menos calidad en el 1.5B y en el 3B. En el 0.5B gana Q4_K_M.',
    ],
    sinComercial: 'Sin uso comercial',
    fuenteModelos:
      'Pérdida de calidad frente al modelo original (perplejidad en wikitext-2, medida en llama.cpp). Menos es mejor. El 3B no permite uso comercial.',
    privacidad: ['Privacidad', 'Lo que se queda en tu teléfono'],
    puntos: [
      ['Sin servidor propio', 'Todo pasa en el teléfono. No hay una cuenta de Octuma ni una nube detrás.'],
      [
        'Solo dos permisos',
        'Internet, para descargar, y el estado de la red, para saber si vas por wifi. Ni almacenamiento, ni ubicación, ni micrófono.',
      ],
      [
        'Sin copia en la nube',
        'Las conversaciones no se respaldan fuera del teléfono. Si cambias de teléfono, no se transfieren.',
      ],
      [
        'Descargas que no se pueden alterar',
        'Solo por HTTPS, y cada modelo se compara con la huella SHA-256 que publica Hugging Face antes de abrirlo.',
      ],
      [
        'Tu token, en el llavero',
        'Si entras con tu token de Hugging Face para bajar modelos privados, se guarda en el Keystore de Android.',
      ],
      ['Registros limpios', 'Los registros de la app no guardan tus mensajes, las respuestas ni tu token.'],
    ],
    requisitos: ['Requisitos', 'Pensada para teléfonos modestos'],
    modestos: [
      'Avisa antes de descargar si no hay memoria o espacio.',
      'Solo tema oscuro: en pantallas OLED el negro no gasta batería.',
      'Respeta el tamaño de letra del sistema hasta 1.6 veces.',
      'Todo lo que se toca mide 48 dp, cómodo para el pulgar.',
    ],
    ficha: [
      ['Sistema', 'Android 8.0 o más nuevo'],
      ['Procesador', '64 bits (ARM64)'],
      ['Hecha con', 'Flutter y llama.cpp'],
      ['Estado', 'En desarrollo, probada en un teléfono real'],
      ['Rendimiento', 'Pruebas en teléfono pendientes'],
    ],
    cierre: 'Octuma App llegará a Google Play.',
    cierreTexto: 'Los modelos se preparan con Octuma, la librería open source que los comprime.',
    libreria: 'Ver la librería Octuma',
    volver: 'Volver al portafolio',
    hecho: 'Hecho por Imanol Rodríguez',
  },
  en: {
    miga: 'You are here',
    portafolio: 'Portfolio',
    proyectos: 'Projects',
    irComo: 'How it works',
    titulo: ['A language model that runs ', 'on your phone', '.'],
    bajada:
      "Octuma App downloads a model once and runs it inside the phone. Your messages never leave the device and, after the download, it doesn't need internet anymore.",
    estado: 'In development · coming to Google Play',
    verComo: 'See how it works',
    altHero:
      'Three Octuma App screens: a conversation, the home screen with the octopus logo, and the welcome screen',
    cambia: ["What's different", 'Just like an AI chat, without the cloud'],
    cambios: [
      ['Nothing leaves the phone', 'The model runs right there. There is no server to send your messages to.'],
      ['Works without signal', 'Once the model is downloaded, you no longer need internet.'],
      ['Slower than the cloud', "A phone isn't a graphics card. It answers at reading speed, not all at once."],
    ],
    como: ['How it works', 'From download to first answer'],
    pasos: [
      [
        'Pick a model',
        'The app checks how much memory your phone has and offers the largest model that fits with room to spare. You can also search for others on Hugging Face.',
      ],
      [
        'Download it once',
        'Before starting, it checks there is enough memory and storage. If you leave the app, the download pauses and resumes where it left off. You can limit it to wifi, and the file is verified with SHA-256 before use.',
      ],
      [
        'Chat offline',
        "The model runs with llama.cpp inside the phone, separate from the interface, so the app doesn't freeze while it answers. You can stop an answer whenever you want.",
      ],
    ],
    modelos: [
      'The models',
      'Models that fit and lose little',
      'The official models are from the Qwen2.5 family, compressed to 4 bits with the Octuma library. Compared with Q4_K_M, the most common 4-bit format in llama.cpp, they lose less quality on the 1.5B and the 3B. On the 0.5B, Q4_K_M wins.',
    ],
    sinComercial: 'No commercial use',
    fuenteModelos:
      'Quality lost against the original model (perplexity on wikitext-2, measured in llama.cpp). Lower is better. The 3B does not allow commercial use.',
    privacidad: ['Privacy', 'What stays on your phone'],
    puntos: [
      ['No server of our own', 'Everything happens on the phone. There is no Octuma account and no cloud behind it.'],
      [
        'Only two permissions',
        'Internet, to download, and network state, to know if you are on wifi. No storage, no location, no microphone.',
      ],
      ['No cloud backup', "Conversations aren't backed up off the phone. If you switch phones, they don't carry over."],
      [
        "Downloads that can't be tampered with",
        'HTTPS only, and every model is checked against the SHA-256 fingerprint Hugging Face publishes before it is opened.',
      ],
      [
        'Your token, in the keychain',
        'If you sign in with your Hugging Face token to download private models, it is stored in the Android Keystore.',
      ],
      ['Clean logs', "The app's logs don't store your messages, the answers or your token."],
    ],
    requisitos: ['Requirements', 'Built for modest phones'],
    modestos: [
      "Warns you before downloading if there isn't enough memory or storage.",
      "Dark theme only: on OLED screens black doesn't use battery.",
      "Follows the system's text size up to 1.6x.",
      'Every touch target is 48 dp, comfortable for your thumb.',
    ],
    ficha: [
      ['System', 'Android 8.0 or newer'],
      ['Processor', '64-bit (ARM64)'],
      ['Built with', 'Flutter and llama.cpp'],
      ['Status', 'In development, tested on a real phone'],
      ['Performance', 'Phone benchmarks pending'],
    ],
    cierre: 'Octuma App is coming to Google Play.',
    cierreTexto: 'The models are prepared with Octuma, the open source library that compresses them.',
    libreria: 'See the Octuma library',
    volver: 'Back to portfolio',
    hecho: 'Made by Imanol Rodríguez',
  },
}

function Bloque({ id, rotulo, titulo, intro, children, clase = '' }) {
  const [ref, visible] = useRevelar()
  return (
    <section className={`oapp-sec ${clase}`} id={id} ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'oapp-sec__cabecera')}>
          <p className="oapp-rotulo mono">{rotulo}</p>
          <h2 className="oapp-sec__titulo">{titulo}</h2>
          {intro && <p className="oapp-sec__intro">{intro}</p>}
        </div>
        {typeof children === 'function' ? children(visible) : children}
      </div>
    </section>
  )
}

export default function OctumaApp() {
  const [ref, visible] = useRevelar()
  const [refCierre, visibleCierre] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <div className="oapp">
      <header className="oapp-nav">
        <div className="contenedor oapp-nav__barra">
          <nav className="oapp-nav__miga" aria-label={t.miga}>
            <Link to="/">
              <span aria-hidden="true">←</span> {t.portafolio}
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/#proyectos" className="oapp-nav__medio">
              {t.proyectos}
            </Link>
            <span aria-hidden="true" className="oapp-nav__medio">
              /
            </span>
            <span aria-current="page">Octuma App</span>
          </nav>
          <div className="oapp-nav__acciones">
            <a className="oapp-nav__ir" href="#como-funciona">
              {t.irComo}
            </a>
            <SelectorIdioma className="idioma--oscuro" />
          </div>
        </div>
      </header>

      <main>
        <section className="oapp-hero" ref={ref}>
          <div className="oapp-hero__brillo" aria-hidden="true" />
          <div className="contenedor oapp-hero__interior">
            <div {...revelado(visible, 'oapp-hero__texto')}>
              <div className="oapp-hero__marca">
                <img src="/ilustraciones/octuma-app/logo.png" alt="" width="88" height="88" />
                <span>Octuma App</span>
              </div>
              <h1 className="oapp-hero__titulo">
                {t.titulo[0]}
                <em>{t.titulo[1]}</em>
                {t.titulo[2]}
              </h1>
              <p className="oapp-hero__bajada">{t.bajada}</p>
              <div className="oapp-hero__acciones">
                <span className="oapp-pastilla">
                  <span className="oapp-pastilla__punto" aria-hidden="true" />
                  {t.estado}
                </span>
                <a className="oapp-boton" href="#como-funciona">
                  {t.verComo}
                </a>
              </div>
            </div>

            <div {...revelado(visible, 'oapp-hero__imagen', 160)}>
              <img
                src="/ilustraciones/octuma-app/hero.png"
                alt={t.altHero}
                width="1800"
                height="1140"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <Bloque id="que-cambia" rotulo={t.cambia[0]} titulo={t.cambia[1]}>
          {(v) => (
            <ul className="oapp-tarjetas">
              {t.cambios.map(([titulo, texto], i) => (
                <li key={i} {...revelado(v, 'oapp-tarjeta', 120 + i * 90)}>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ul>
          )}
        </Bloque>

        <Bloque id="como-funciona" rotulo={t.como[0]} titulo={t.como[1]} clase="oapp-sec--hundida">
          {(v) => (
            <ol className="oapp-pasos">
              {t.pasos.map(([titulo, texto], i) => (
                <li key={i} {...revelado(v, 'oapp-paso', 120 + i * 90)}>
                  <span className="oapp-paso__num mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ol>
          )}
        </Bloque>

        <Bloque id="modelos" rotulo={t.modelos[0]} titulo={t.modelos[1]} intro={t.modelos[2]}>
          {(v) => (
            <>
              <ul className="oapp-modelos">
                {MODELOS.map((m, i) => (
                  <li key={m.nombre} {...revelado(v, 'oapp-modelo', 120 + i * 90)}>
                    <div className="oapp-modelo__cabeza">
                      <h3>{m.nombre}</h3>
                      <span className="oapp-modelo__peso mono">{m.gb}</span>
                    </div>
                    <p className="oapp-modelo__licencia">
                      {m.licencia}
                      {m.comercial === false && <span> · {t.sinComercial}</span>}
                    </p>
                    <div className="oapp-barras">
                      {[
                        ['Octuma', m.octuma, 'oapp-barra--octuma'],
                        ['Q4_K_M', m.q4km, 'oapp-barra--q4km'],
                      ].map(([etq, val, cls]) => (
                        <div key={etq} className="oapp-barra">
                          <span className="oapp-barra__etq">{etq}</span>
                          <span className="oapp-barra__pista">
                            <span
                              className={`oapp-barra__relleno ${cls}`}
                              style={{ width: v ? `${(val / TOPE) * 100}%` : 0 }}
                            />
                          </span>
                          <span className="oapp-barra__valor mono">+{val.toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="oapp-fuente">{t.fuenteModelos}</p>
            </>
          )}
        </Bloque>

        <Bloque id="privacidad" rotulo={t.privacidad[0]} titulo={t.privacidad[1]} clase="oapp-sec--hundida">
          {(v) => (
            <ul className="oapp-lista">
              {t.puntos.map(([titulo, texto], i) => (
                <li key={i} {...revelado(v, 'oapp-lista__item', 120 + i * 70)}>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ul>
          )}
        </Bloque>

        <Bloque id="modestos" rotulo={t.requisitos[0]} titulo={t.requisitos[1]}>
          {(v) => (
            <div className="oapp-dos">
              <ul className="oapp-checks">
                {t.modestos.map((m, i) => (
                  <li key={i} {...revelado(v, 'oapp-checks__item', 120 + i * 80)}>
                    <span className="oapp-check" aria-hidden="true">
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path
                          d="M1 5.2 4.2 8.4 11 1.6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
              <dl {...revelado(v, 'oapp-ficha', 260)}>
                {t.ficha.map(([dt, dd]) => (
                  <div key={dt}>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Bloque>
      </main>

      <footer className="oapp-cierre" ref={refCierre}>
        <div {...revelado(visibleCierre, 'contenedor oapp-cierre__interior')}>
          <img src="/ilustraciones/octuma-app/logo.png" alt="" width="64" height="64" loading="lazy" />
          <h2>{t.cierre}</h2>
          <p>{t.cierreTexto}</p>
          <div className="oapp-cierre__botones">
            <Link className="oapp-boton oapp-boton--claro" to="/octuma">
              {t.libreria}
            </Link>
            <Link className="oapp-boton" to="/">
              <span aria-hidden="true">←</span> {t.volver}
            </Link>
          </div>
          <p className="oapp-cierre__pie">{t.hecho}</p>
        </div>
      </footer>
    </div>
  )
}
