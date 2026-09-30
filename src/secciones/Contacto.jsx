import { useTextos } from '../lib/idioma'
import { revelado, useRevelar } from '../lib/useRevelar'

const CORREO = 'ima.roguez11@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/imanol-rodr%C3%ADguez-627985390/'

const TEXTOS = {
  es: {
    titulo: '¿Tienes un modelo que no cabe o una idea por construir?',
    nota: 'Respondo en menos de 24 horas.',
    linkedin: 'Escríbeme por LinkedIn',
  },
  en: {
    titulo: 'Got a model that doesn’t fit, or an idea to build?',
    nota: 'I reply within 24 hours.',
    linkedin: 'Message me on LinkedIn',
  },
}

export default function Contacto() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)

  return (
    <section className="contacto" id="contacto" ref={ref}>
      <div className="contenedor contacto__interior">
        <div {...revelado(visible, 'contacto__panel')}>
          <h2 className="contacto__titulo">{t.titulo}</h2>
          <p className="contacto__nota">{t.nota}</p>

          <div className="contacto__acciones">
            <a className="boton contacto__boton contacto__boton--claro" href={`mailto:${CORREO}`}>
              {CORREO}
            </a>
            <a
              className="boton contacto__boton contacto__boton--linea"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              {t.linkedin}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
