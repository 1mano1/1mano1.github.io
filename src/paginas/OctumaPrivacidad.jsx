import { Link } from 'react-router-dom'

import { useTextos } from '../lib/idioma'
import Flecha from '../secciones/Flecha'
import SelectorIdioma from '../secciones/SelectorIdioma'
import './OctumaApp.css'
import './OctumaPrivacidad.css'

/* Politica de privacidad y terminos de uso de Octuma App.

   Google Play pide una direccion publica con la politica, y la app enlaza a
   esta misma desde Ajustes > Privacidad. Lo que dice aqui tiene que coincidir
   con lo que hace la app: cada afirmacion sale del manifiesto de Android (los
   permisos), de las direcciones a las que el codigo se conecta y de donde
   guarda cada cosa. Si la app cambia, esta pagina cambia con ella y se
   actualiza la fecha. */

const CORREO = 'ima.roguez11@gmail.com'

/* Un bloque es un parrafo (string) o una lista ({ lista: [...] }). Un item de
   lista puede ser [termino, explicacion] o un string. */
const TEXTOS = {
  es: {
    miga: 'Estás en',
    portafolio: 'Portafolio',
    titulo: 'Política de privacidad',
    vigencia: 'Vigente desde el 6 de octubre de 2026',
    irTerminos: 'Términos de uso',
    resumenTitulo: 'En resumen',
    resumen: [
      'Los modelos de IA se ejecutan en tu teléfono. Tus conversaciones se guardan solo ahí.',
      'No hay cuentas de Octuma, anuncios ni analítica. El desarrollador no tiene servidores y no recibe ningún dato tuyo.',
      'La app se conecta a internet para lo que tú le pides: descargar modelos de Hugging Face y, si la activas, buscar en la web.',
    ],
    secciones: [
      {
        id: 'responsable',
        titulo: 'Quién es el responsable',
        bloques: [
          'Octuma App es un proyecto de Imanol Rodríguez, desarrollador independiente en México. Para cualquier duda sobre esta política escribe a:',
          { correo: true },
        ],
      },
      {
        id: 'datos',
        titulo: 'Qué datos usa la app y dónde se guardan',
        bloques: [
          'Todo lo siguiente se guarda en el almacenamiento privado de la app, dentro de tu teléfono. Otras apps no pueden leerlo y el desarrollador no lo recibe.',
          {
            lista: [
              ['Conversaciones', 'Lo que escribes y lo que responde el modelo.'],
              [
                'Archivos adjuntos',
                'Las fotos y los documentos (PDF, Word, texto) que adjuntas se copian dentro de la app. Su texto se extrae en el teléfono.',
              ],
              [
                'Voz',
                'Al dictar, la app graba con el micrófono mientras la grabación está activa, convierte el audio en texto dentro del teléfono y borra la grabación. El audio no se envía a ningún servidor.',
              ],
              [
                'Token de Hugging Face',
                'Solo si inicias sesión. Se guarda cifrado en el Keystore de Android.',
              ],
              ['Ajustes', 'El idioma, el modelo elegido y tus preferencias.'],
              [
                'Datos del teléfono',
                'La app lee la memoria RAM, el espacio libre, los núcleos del procesador y si estás en wifi o datos móviles. Los usa para recomendarte un modelo y avisarte antes de gastar datos. No salen del teléfono.',
              ],
            ],
          },
          'La app no pide tu ubicación, tus contactos, tu calendario ni acceso general a tus archivos. Las fotos y los documentos se eligen con el selector de Android, que entrega solo el archivo que tú eliges.',
        ],
      },
      {
        id: 'terceros',
        titulo: 'Qué sale del teléfono y a quién',
        bloques: [
          'La app solo se conecta a internet en estos casos:',
          {
            lista: [
              [
                'Hugging Face',
                'Para buscar y descargar modelos, y para iniciar sesión si quieres usar tus modelos privados. Hugging Face recibe tu dirección IP, lo que buscas y, si iniciaste sesión, tu token. La sesión se inicia en el navegador: la app nunca ve tu contraseña.',
              ],
              [
                'Búsqueda web (opcional)',
                'Está apagada al empezar cada chat. Si la activas, el texto de ese mensaje se envía a DuckDuckGo o a Wikipedia. Después la app abre las primeras páginas de resultados para leerlas, y esos sitios ven tu dirección IP igual que si los visitaras con un navegador. Si pegas un enlace, la app abre esa página. El resto de la conversación no se envía.',
              ],
              [
                'Clima',
                'Si con la búsqueda web activa preguntas por el clima, el nombre del lugar se envía a Open-Meteo.',
              ],
              ['Enlaces', 'Si tocas una fuente o un enlace, se abre en tu navegador.'],
            ],
          },
          'Cada uno de esos servicios trata los datos según su propia política:',
          {
            enlaces: [
              ['Hugging Face', 'https://huggingface.co/privacy'],
              ['DuckDuckGo', 'https://duckduckgo.com/privacy'],
              ['Wikipedia (Fundación Wikimedia)', 'https://foundation.wikimedia.org/wiki/Policy:Privacy_policy'],
              ['Open-Meteo', 'https://open-meteo.com/en/terms'],
            ],
          },
          'La app no tiene anuncios, analítica ni informes automáticos de fallos. No se venden ni se comparten datos personales con nadie.',
        ],
      },
      {
        id: 'permisos',
        titulo: 'Permisos de Android',
        bloques: [
          {
            lista: [
              ['Internet', 'Para descargar modelos y para la búsqueda web.'],
              ['Estado de la red', 'Para saber si estás en wifi y avisarte antes de usar datos móviles.'],
              [
                'Micrófono',
                'Para el dictado por voz. Android lo pregunta la primera vez que dictas. Puedes negarlo y el resto de la app funciona igual.',
              ],
            ],
          },
        ],
      },
      {
        id: 'ia',
        titulo: 'Inteligencia artificial',
        bloques: [
          {
            lista: [
              [
                'Qué modelos usa',
                'Los modelos de chat que ofrece Octuma son de la familia Qwen2.5, de Alibaba Cloud (licencia Apache 2.0), comprimidos con la librería Octuma. El dictado usa Whisper, de OpenAI (licencia MIT). Se ejecutan con llama.cpp y whisper.cpp.',
              ],
              [
                'Dónde se ejecutan',
                'En tu teléfono. Tus conversaciones no se usan para entrenar ningún modelo.',
              ],
              [
                'Las respuestas pueden fallar',
                'Las genera una IA y pueden ser incorrectas, incompletas u ofensivas. No son asesoría médica, legal, financiera ni profesional. Comprueba por tu cuenta lo que sea importante.',
              ],
              [
                'Modelos de terceros',
                'Puedes descargar otros modelos desde Hugging Face. Los publican otras personas: Octuma no los revisa y no responde por su contenido ni por su licencia.',
              ],
              [
                'Reportar una respuesta',
                'Cada respuesta tiene una opción para reportarla. Abre tu app de correo con el texto de la respuesta, y tú decides si lo envías.',
              ],
              [
                'App hecha con ayuda de IA',
                'El código y los textos de la app se escribieron con ayuda de herramientas de IA (Claude, de Anthropic), bajo la dirección y la revisión del autor.',
              ],
            ],
          },
        ],
      },
      {
        id: 'borrado',
        titulo: 'Cuánto se conservan los datos y cómo borrarlos',
        bloques: [
          'Los datos se quedan en tu teléfono hasta que tú los borras:',
          {
            lista: [
              'Puedes borrar un chat desde el menú lateral, o todos desde Ajustes.',
              'Puedes borrar cada modelo descargado desde Modelos o desde Ajustes.',
              'Al cerrar sesión se borra el token de Hugging Face.',
              'Al desinstalar la app se borra todo: conversaciones, adjuntos, modelos y ajustes.',
            ],
          },
          'La app queda fuera de las copias de seguridad de Android y de la transferencia a un teléfono nuevo. Si cambias de teléfono, tus conversaciones no se pasan. El desarrollador no puede recuperar ni borrar nada por ti, porque no tiene tus datos.',
        ],
      },
      {
        id: 'seguridad',
        titulo: 'Seguridad',
        bloques: [
          {
            lista: [
              'Todas las conexiones usan HTTPS. La app no acepta conexiones sin cifrar.',
              'Cada modelo descargado se compara con la huella SHA-256 que publica Hugging Face antes de usarlo.',
              'El token de Hugging Face se guarda en el Keystore de Android y solo se envía a huggingface.co.',
              'Los registros internos de la app no guardan tus mensajes, las respuestas ni tu token.',
            ],
          },
        ],
      },
      {
        id: 'menores',
        titulo: 'Menores de edad',
        bloques: [
          'Octuma App no está dirigida a menores de 13 años ni a quien no tenga la edad mínima que exija su país para usar servicios digitales sin permiso de sus padres. La app no recoge datos de ninguna persona, sea cual sea su edad.',
        ],
      },
      {
        id: 'derechos',
        titulo: 'Tus derechos',
        bloques: [
          'Las leyes de protección de datos, como la LFPDPPP en México, el RGPD en la Unión Europea o la CCPA en California, te dan derecho a acceder a tus datos, corregirlos, borrarlos y oponerte a su uso.',
          'El desarrollador no recibe ni guarda datos personales tuyos, así que no tiene nada a lo que darte acceso ni que borrar: todo está en tu teléfono y lo controlas desde la app. Para los datos que reciben Hugging Face, DuckDuckGo, Wikipedia u Open-Meteo cuando usas esas funciones, dirígete a cada uno con los enlaces de arriba.',
        ],
      },
      {
        id: 'cambios',
        titulo: 'Cambios en esta política',
        bloques: [
          'Si la app cambia lo que hace con los datos, esta página se actualiza antes de publicar ese cambio y se cambia la fecha del principio.',
        ],
      },
    ],
    terminosTitulo: 'Términos de uso',
    terminos: [
      {
        id: 't-uso',
        titulo: 'Uso de la app',
        bloques: [
          'Al usar Octuma App aceptas estos términos. Puedes usarla para fines personales o profesionales, siempre dentro de la ley. No la uses para generar contenido ilegal ni contenido que dañe a otras personas.',
        ],
      },
      {
        id: 't-respuestas',
        titulo: 'Respuestas de la IA',
        bloques: [
          'Las respuestas las genera un modelo de lenguaje y pueden contener errores. Tú decides qué haces con ellas y eres responsable de ese uso. No sustituyen el consejo de un profesional.',
        ],
      },
      {
        id: 't-modelos',
        titulo: 'Modelos y licencias',
        bloques: [
          'Cada modelo tiene su propia licencia, que la app muestra en su ficha. Al descargar un modelo aceptas esa licencia. Los modelos que busques en Hugging Face son de terceros, y te corresponde a ti revisar si puedes usarlos para lo que quieres.',
        ],
      },
      {
        id: 't-garantias',
        titulo: 'Sin garantías',
        bloques: [
          'La app se ofrece tal cual, sin garantías de ningún tipo. Hasta donde la ley lo permita, el autor no responde por los daños que resulten de usar la app, de las respuestas de los modelos o de modelos de terceros. Eso incluye la pérdida de conversaciones, que solo existen en tu teléfono, y el consumo de datos móviles al descargar modelos.',
        ],
      },
      {
        id: 't-marcas',
        titulo: 'Marcas de terceros',
        bloques: [
          'Hugging Face, Qwen, Whisper, DuckDuckGo, Wikipedia y Open-Meteo son marcas de sus respectivos dueños. Octuma App es un proyecto independiente y no está afiliado a ninguno de ellos.',
        ],
      },
    ],
    sitio:
      'Esta política cubre la app. Este sitio web usa Google Analytics solo si aceptas el aviso de cookies.',
    volverApp: 'Volver a Octuma App',
    hecho: 'Hecho por Imanol Rodríguez',
  },
  en: {
    miga: 'You are here',
    portafolio: 'Portfolio',
    titulo: 'Privacy policy',
    vigencia: 'Effective October 6, 2026',
    irTerminos: 'Terms of use',
    resumenTitulo: 'In short',
    resumen: [
      'The AI models run on your phone. Your conversations are stored only there.',
      "There are no Octuma accounts, ads or analytics. The developer has no servers and receives none of your data.",
      'The app connects to the internet for what you ask it to do: downloading models from Hugging Face and, if you turn it on, searching the web.',
    ],
    secciones: [
      {
        id: 'responsable',
        titulo: 'Who is responsible',
        bloques: [
          'Octuma App is a project by Imanol Rodríguez, an independent developer in Mexico. For any question about this policy, write to:',
          { correo: true },
        ],
      },
      {
        id: 'datos',
        titulo: 'What data the app uses and where it is stored',
        bloques: [
          "Everything below is stored in the app's private storage on your phone. Other apps can't read it and the developer doesn't receive it.",
          {
            lista: [
              ['Conversations', 'What you write and what the model answers.'],
              [
                'Attachments',
                'Photos and documents (PDF, Word, text) you attach are copied inside the app. Their text is extracted on the phone.',
              ],
              [
                'Voice',
                'When you dictate, the app records from the microphone while recording is active, turns the audio into text on the phone, and deletes the recording. The audio is not sent to any server.',
              ],
              ['Hugging Face token', 'Only if you sign in. It is stored encrypted in the Android Keystore.'],
              ['Settings', 'Your language, chosen model and preferences.'],
              [
                'Phone information',
                "The app reads the RAM, free storage, processor cores and whether you're on Wi-Fi or mobile data. It uses them to recommend a model and to warn you before using mobile data. They don't leave the phone.",
              ],
            ],
          },
          "The app doesn't ask for your location, contacts, calendar or general access to your files. Photos and documents are chosen with Android's picker, which hands over only the file you choose.",
        ],
      },
      {
        id: 'terceros',
        titulo: 'What leaves the phone, and who receives it',
        bloques: [
          'The app only connects to the internet in these cases:',
          {
            lista: [
              [
                'Hugging Face',
                'To search for and download models, and to sign in if you want to use your private models. Hugging Face receives your IP address, what you search for and, if you signed in, your token. Sign-in happens in the browser: the app never sees your password.',
              ],
              [
                'Web search (optional)',
                'It is off at the start of every chat. If you turn it on, the text of that message is sent to DuckDuckGo or Wikipedia. The app then opens the first result pages to read them, and those sites see your IP address just as if you visited them with a browser. If you paste a link, the app opens that page. The rest of the conversation is not sent.',
              ],
              [
                'Weather',
                'If you ask about the weather with web search on, the name of the place is sent to Open-Meteo.',
              ],
              ['Links', 'If you tap a source or a link, it opens in your browser.'],
            ],
          },
          'Each of those services handles data under its own policy:',
          {
            enlaces: [
              ['Hugging Face', 'https://huggingface.co/privacy'],
              ['DuckDuckGo', 'https://duckduckgo.com/privacy'],
              ['Wikipedia (Wikimedia Foundation)', 'https://foundation.wikimedia.org/wiki/Policy:Privacy_policy'],
              ['Open-Meteo', 'https://open-meteo.com/en/terms'],
            ],
          },
          'The app has no ads, no analytics and no automatic crash reports. Personal data is not sold or shared with anyone.',
        ],
      },
      {
        id: 'permisos',
        titulo: 'Android permissions',
        bloques: [
          {
            lista: [
              ['Internet', 'To download models and for web search.'],
              ['Network state', "To know whether you're on Wi-Fi and warn you before using mobile data."],
              [
                'Microphone',
                'For voice dictation. Android asks the first time you dictate. You can deny it and the rest of the app works the same.',
              ],
            ],
          },
        ],
      },
      {
        id: 'ia',
        titulo: 'Artificial intelligence',
        bloques: [
          {
            lista: [
              [
                'Which models it uses',
                'The chat models Octuma offers are from the Qwen2.5 family by Alibaba Cloud (Apache 2.0 license), compressed with the Octuma library. Dictation uses Whisper by OpenAI (MIT license). They run with llama.cpp and whisper.cpp.',
              ],
              ['Where they run', 'On your phone. Your conversations are not used to train any model.'],
              [
                'Answers can be wrong',
                "They are generated by an AI and may be incorrect, incomplete or offensive. They are not medical, legal, financial or professional advice. Check anything important yourself.",
              ],
              [
                'Third-party models',
                "You can download other models from Hugging Face. Other people publish them: Octuma doesn't review them and isn't responsible for their content or license.",
              ],
              [
                'Reporting an answer',
                'Every answer has an option to report it. It opens your email app with the text of the answer, and you decide whether to send it.',
              ],
              [
                'Built with the help of AI',
                "The app's code and text were written with the help of AI tools (Claude, by Anthropic), directed and reviewed by the author.",
              ],
            ],
          },
        ],
      },
      {
        id: 'borrado',
        titulo: 'How long data is kept and how to delete it',
        bloques: [
          'Data stays on your phone until you delete it:',
          {
            lista: [
              'You can delete one chat from the side menu, or all of them from Settings.',
              'You can delete each downloaded model from Models or from Settings.',
              'Signing out deletes the Hugging Face token.',
              'Uninstalling the app deletes everything: conversations, attachments, models and settings.',
            ],
          },
          "The app is excluded from Android backups and from transfers to a new phone. If you switch phones, your conversations don't carry over. The developer can't recover or delete anything for you, because the developer doesn't have your data.",
        ],
      },
      {
        id: 'seguridad',
        titulo: 'Security',
        bloques: [
          {
            lista: [
              "All connections use HTTPS. The app doesn't accept unencrypted connections.",
              'Every downloaded model is checked against the SHA-256 fingerprint Hugging Face publishes before it is used.',
              'The Hugging Face token is stored in the Android Keystore and is only sent to huggingface.co.',
              "The app's internal logs don't store your messages, the answers or your token.",
            ],
          },
        ],
      },
      {
        id: 'menores',
        titulo: 'Children',
        bloques: [
          "Octuma App is not directed to children under 13, or to anyone below the minimum age their country requires to use digital services without parental permission. The app doesn't collect data from anyone, whatever their age.",
        ],
      },
      {
        id: 'derechos',
        titulo: 'Your rights',
        bloques: [
          "Data protection laws such as Mexico's LFPDPPP, the GDPR in the European Union and the CCPA in California give you the right to access, correct and delete your data, and to object to its use.",
          "The developer doesn't receive or store your personal data, so there is nothing to give you access to or to delete: everything is on your phone and you control it from the app. For the data Hugging Face, DuckDuckGo, Wikipedia or Open-Meteo receive when you use those features, contact each of them through the links above.",
        ],
      },
      {
        id: 'cambios',
        titulo: 'Changes to this policy',
        bloques: [
          'If the app changes what it does with data, this page is updated before that change is released, and the date at the top changes.',
        ],
      },
    ],
    terminosTitulo: 'Terms of use',
    terminos: [
      {
        id: 't-uso',
        titulo: 'Using the app',
        bloques: [
          "By using Octuma App you accept these terms. You may use it for personal or professional purposes, always within the law. Don't use it to generate illegal content or content that harms other people.",
        ],
      },
      {
        id: 't-respuestas',
        titulo: 'AI answers',
        bloques: [
          "Answers are generated by a language model and may contain errors. You decide what to do with them and you are responsible for that use. They don't replace a professional's advice.",
        ],
      },
      {
        id: 't-modelos',
        titulo: 'Models and licenses',
        bloques: [
          "Each model has its own license, shown on its page in the app. By downloading a model you accept that license. Models you find on Hugging Face belong to third parties, and it's up to you to check whether you may use them for your purpose.",
        ],
      },
      {
        id: 't-garantias',
        titulo: 'No warranty',
        bloques: [
          "The app is provided as is, without warranties of any kind. To the extent the law allows, the author is not liable for damages resulting from the use of the app, from the models' answers or from third-party models. That includes the loss of conversations, which exist only on your phone, and mobile data used when downloading models.",
        ],
      },
      {
        id: 't-marcas',
        titulo: 'Third-party trademarks',
        bloques: [
          'Hugging Face, Qwen, Whisper, DuckDuckGo, Wikipedia and Open-Meteo are trademarks of their respective owners. Octuma App is an independent project and is not affiliated with any of them.',
        ],
      },
    ],
    sitio: 'This policy covers the app. This website uses Google Analytics only if you accept the cookie notice.',
    volverApp: 'Back to Octuma App',
    hecho: 'Made by Imanol Rodríguez',
  },
}

function Bloque({ bloque }) {
  if (typeof bloque === 'string') return <p>{bloque}</p>
  if (bloque.correo) {
    return (
      <p>
        <a href={`mailto:${CORREO}`}>{CORREO}</a>
      </p>
    )
  }
  if (bloque.enlaces) {
    return (
      <ul>
        {bloque.enlaces.map(([nombre, url]) => (
          <li key={url}>
            <a href={url} rel="noopener noreferrer">
              {nombre}
            </a>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul>
      {bloque.lista.map((item, i) =>
        typeof item === 'string' ? (
          <li key={i}>{item}</li>
        ) : (
          <li key={i}>
            <strong>{item[0]}.</strong> {item[1]}
          </li>
        ),
      )}
    </ul>
  )
}

function Seccion({ id, titulo, bloques }) {
  return (
    <section id={id} className="opriv-sec">
      <h3>{titulo}</h3>
      {bloques.map((b, i) => (
        <Bloque key={i} bloque={b} />
      ))}
    </section>
  )
}

export default function OctumaPrivacidad() {
  const t = useTextos(TEXTOS)

  return (
    <div className="oapp opriv">
      <header className="oapp-nav">
        <div className="contenedor oapp-nav__barra">
          <nav className="oapp-nav__miga" aria-label={t.miga}>
            <Link to="/">
              <Flecha izquierda /> {t.portafolio}
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/octuma-app">Octuma App</Link>
            <span aria-hidden="true" className="oapp-nav__medio">
              /
            </span>
            <span aria-current="page" className="oapp-nav__medio">
              {t.titulo}
            </span>
          </nav>
          <div className="oapp-nav__acciones">
            <a className="oapp-nav__ir" href="#terminos">
              {t.irTerminos}
            </a>
            <SelectorIdioma className="idioma--oscuro" />
          </div>
        </div>
      </header>

      <main className="contenedor opriv-cuerpo">
        <p className="oapp-rotulo mono">Octuma App</p>
        <h1>{t.titulo}</h1>
        <p className="opriv-vigencia">{t.vigencia}</p>

        <section className="opriv-resumen" aria-labelledby="resumen">
          <h2 id="resumen">{t.resumenTitulo}</h2>
          <ul>
            {t.resumen.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        {t.secciones.map((s) => (
          <Seccion key={s.id} {...s} />
        ))}

        <h2 id="terminos" className="opriv-parte">
          {t.terminosTitulo}
        </h2>
        {t.terminos.map((s) => (
          <Seccion key={s.id} {...s} />
        ))}

        <p className="opriv-sitio">{t.sitio}</p>

        <p>
          <Link className="oapp-boton" to="/octuma-app">
            <Flecha izquierda /> {t.volverApp}
          </Link>
        </p>
        <p className="opriv-pie">{t.hecho}</p>
      </main>
    </div>
  )
}
