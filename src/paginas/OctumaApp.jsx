import { Link } from 'react-router-dom'

import { revelado, useRevelar } from '../lib/useRevelar'
import './OctumaApp.css'

/* Pagina de Octuma App. */

const CAMBIOS = [
  {
    titulo: 'Nada sale del teléfono',
    texto: 'El modelo se ejecuta ahí mismo. No hay un servidor al que mandar tus mensajes.',
  },
  {
    titulo: 'Funciona sin señal',
    texto: 'Después de descargar el modelo, el internet deja de hacer falta.',
  },
  {
    titulo: 'Va más despacio que la nube',
    texto:
      'Un teléfono no es una tarjeta gráfica. Responde a la velocidad a la que lees, no de golpe.',
  },
]

const PASOS = [
  {
    titulo: 'Elige un modelo',
    texto:
      'La app revisa cuánta memoria tiene tu teléfono y te ofrece el modelo más grande que le cabe con margen. También puedes buscar otros en Hugging Face.',
  },
  {
    titulo: 'Descárgalo una vez',
    texto:
      'Antes de empezar comprueba que haya memoria y espacio. Si sales de la app, la descarga se pausa y luego sigue donde iba. Puedes limitarla a wifi, y el archivo se verifica con SHA-256 antes de usarlo.',
  },
  {
    titulo: 'Conversa sin conexión',
    texto:
      'El modelo corre con llama.cpp dentro del teléfono, aparte de la interfaz, para que la app no se congele mientras responde. Puedes detener la respuesta cuando quieras.',
  },
]

/* Perdida de perplejidad frente al original, dentro de llama.cpp (C:/octuma/runs/COMPARATIVA_GGUF.md). */
const MODELOS = [
  { nombre: 'Qwen2.5 0.5B', gb: '0.52 GB', licencia: 'Apache 2.0', octuma: 3.73, q4km: 2.63 },
  { nombre: 'Qwen2.5 1.5B', gb: '1.32 GB', licencia: 'Apache 2.0', octuma: 2.11, q4km: 4.74 },
  {
    nombre: 'Qwen2.5 3B',
    gb: '2.40 GB',
    licencia: 'Qwen Research',
    nota: 'Sin uso comercial',
    octuma: 2.43,
    q4km: 6.21,
  },
]
const TOPE = 7

const PRIVACIDAD = [
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
]

const MODESTOS = [
  'Avisa antes de descargar si no hay memoria o espacio.',
  'Solo tema oscuro: en pantallas OLED el negro no gasta batería.',
  'Respeta el tamaño de letra del sistema hasta 1.6 veces.',
  'Todo lo que se toca mide 48 dp, cómodo para el pulgar.',
]

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

  return (
    <div className="oapp">
      <header className="oapp-nav">
        <div className="contenedor oapp-nav__barra">
          <nav className="oapp-nav__miga" aria-label="Estás en">
            <Link to="/">
              <span aria-hidden="true">←</span> Portafolio
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/#proyectos" className="oapp-nav__medio">
              Proyectos
            </Link>
            <span aria-hidden="true" className="oapp-nav__medio">
              /
            </span>
            <span aria-current="page">Octuma App</span>
          </nav>
          <a className="oapp-nav__ir" href="#como-funciona">
            Cómo funciona
          </a>
        </div>
      </header>

      <main>
        <section className="oapp-hero" ref={ref}>
          <div className="oapp-hero__brillo" aria-hidden="true" />
          <div className="contenedor oapp-hero__interior">
            <div {...revelado(visible, 'oapp-hero__texto')}>
              <div className="oapp-hero__marca">
                <img src="/octuma-app/logo.png" alt="" width="88" height="88" />
                <span>Octuma App</span>
              </div>
              <h1 className="oapp-hero__titulo">
                Un modelo de lenguaje que corre <em>en tu teléfono</em>.
              </h1>
              <p className="oapp-hero__bajada">
                Octuma App descarga un modelo una vez y lo ejecuta dentro del teléfono. Tus
                mensajes no salen del aparato y, después de la descarga, ya no necesita internet.
              </p>
              <div className="oapp-hero__acciones">
                <span className="oapp-pastilla">
                  <span className="oapp-pastilla__punto" aria-hidden="true" />
                  En desarrollo · llegará a Google Play
                </span>
                <a className="oapp-boton" href="#como-funciona">
                  Ver cómo funciona
                </a>
              </div>
            </div>

            <div {...revelado(visible, 'oapp-hero__imagen', 160)}>
              <img
                src="/octuma-app/hero.png"
                alt="Tres pantallas de Octuma App: una conversación, el inicio con el pulpo del logo y la bienvenida"
                width="1800"
                height="1140"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <Bloque
          id="que-cambia"
          rotulo="Qué cambia"
          titulo="Lo mismo que un chat de IA, sin la nube"
        >
          {(v) => (
          <ul className="oapp-tarjetas">
            {CAMBIOS.map((c, i) => (
              <li key={c.titulo} {...revelado(v, 'oapp-tarjeta', 120 + i * 90)}>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </li>
            ))}
          </ul>
          )}
        </Bloque>

        <Bloque
          id="como-funciona"
          rotulo="Cómo funciona"
          titulo="De la descarga a la primera respuesta"
          clase="oapp-sec--hundida"
        >
          {(v) => (
          <ol className="oapp-pasos">
            {PASOS.map((p, i) => (
              <li key={p.titulo} {...revelado(v, 'oapp-paso', 120 + i * 90)}>
                <span className="oapp-paso__num mono">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
          )}
        </Bloque>

        <Bloque
          id="modelos"
          rotulo="Los modelos"
          titulo="Modelos que caben y pierden poco"
          intro="Los modelos oficiales son de la familia Qwen2.5, comprimidos a 4 bits con la librería Octuma. Frente a Q4_K_M, el formato de 4 bits más usado en llama.cpp, pierden menos calidad en el 1.5B y en el 3B. En el 0.5B gana Q4_K_M."
        >
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
                  {m.nota && <span> · {m.nota}</span>}
                </p>
                <div className="oapp-barras">
                  {[
                    ['Octuma', m.octuma, 'oapp-barra--octuma'],
                    ['Q4_K_M', m.q4km, 'oapp-barra--q4km'],
                  ].map(([etq, val, cls]) => (
                    <div key={etq} className="oapp-barra">
                      <span className="oapp-barra__etq">{etq}</span>
                      <span className="oapp-barra__pista">
                        <span className={`oapp-barra__relleno ${cls}`} style={{ width: v ? `${(val / TOPE) * 100}%` : 0 }} />
                      </span>
                      <span className="oapp-barra__valor mono">+{val.toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <p className="oapp-fuente">
            Pérdida de calidad frente al modelo original (perplejidad en wikitext-2, medida en llama.cpp). Menos es mejor. El 3B no permite uso comercial.
          </p>
          </>
          )}
        </Bloque>

        <Bloque
          id="privacidad"
          rotulo="Privacidad"
          titulo="Lo que se queda en tu teléfono"
          clase="oapp-sec--hundida"
        >
          {(v) => (
          <ul className="oapp-lista">
            {PRIVACIDAD.map(([t, x], i) => (
              <li key={t} {...revelado(v, 'oapp-lista__item', 120 + i * 70)}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
          )}
        </Bloque>

        <Bloque id="modestos" rotulo="Requisitos" titulo="Pensada para teléfonos modestos">
          {(v) => (
          <>
          <div className="oapp-dos">
            <ul className="oapp-checks">
              {MODESTOS.map((m, i) => (
                <li key={m} {...revelado(v, 'oapp-checks__item', 120 + i * 80)}>
                  <span className="oapp-check" aria-hidden="true">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5.2 4.2 8.4 11 1.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {m}
                </li>
              ))}
            </ul>
            <dl {...revelado(v, 'oapp-ficha', 260)}>
              <div>
                <dt>Sistema</dt>
                <dd>Android 8.0 o más nuevo</dd>
              </div>
              <div>
                <dt>Procesador</dt>
                <dd>64 bits (ARM64)</dd>
              </div>
              <div>
                <dt>Hecha con</dt>
                <dd>Flutter y llama.cpp</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>En desarrollo, probada en un teléfono real</dd>
              </div>
              <div>
                <dt>Rendimiento</dt>
                <dd>Pruebas en teléfono pendientes</dd>
              </div>
            </dl>
          </div>
          </>
          )}
        </Bloque>
      </main>

      <footer className="oapp-cierre" ref={refCierre}>
        <div {...revelado(visibleCierre, 'contenedor oapp-cierre__interior')}>
          <img src="/octuma-app/logo.png" alt="" width="64" height="64" loading="lazy" />
          <h2>Octuma App llegará a Google Play.</h2>
          <p>
            Los modelos se preparan con Octuma, la librería open source que los comprime.
          </p>
          <div className="oapp-cierre__botones">
            <Link className="oapp-boton oapp-boton--claro" to="/octuma">
              Ver la librería Octuma
            </Link>
            <Link className="oapp-boton" to="/">
              <span aria-hidden="true">←</span> Volver al portafolio
            </Link>
          </div>
          <p className="oapp-cierre__pie">Hecho por Imanol Rodríguez</p>
        </div>
      </footer>
    </div>
  )
}
