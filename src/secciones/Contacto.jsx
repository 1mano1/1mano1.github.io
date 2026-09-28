import { revelado, useRevelar } from '../lib/useRevelar'

const CORREO = 'ima.roguez11@gmail.com'
const SEGUNDA = {
  texto: 'Escríbeme por LinkedIn',
  url: 'https://www.linkedin.com/in/imanol-rodr%C3%ADguez-627985390/',
}

export default function Contacto() {
  const [ref, visible] = useRevelar()

  return (
    <section className="contacto" id="contacto" ref={ref}>
      <div className="contenedor contacto__interior">
        <div {...revelado(visible, 'contacto__panel')}>
          <h2 className="contacto__titulo">
            ¿Tienes un modelo que no cabe o una idea por construir?
          </h2>
          <p className="contacto__nota">Respondo en menos de 24 horas.</p>

          <div className="contacto__acciones">
            <a className="boton contacto__boton contacto__boton--claro" href={`mailto:${CORREO}`}>
              {CORREO}
            </a>
            <a
              className="boton contacto__boton contacto__boton--linea"
              href={SEGUNDA.url}
              target="_blank"
              rel="noreferrer"
            >
              {SEGUNDA.texto}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
