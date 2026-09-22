import { revelado, useRevelar } from '../lib/useRevelar'

/**
 * Contacto. Figma 84:5759 (desktop) y 56:3322 (movil).
 *
 * Un panel azul con el titular y los dos botones. Es la unica seccion sin
 * rotulo numerado. La linea de creditos que Figma dibuja aqui debajo esta
 * en `Pie.jsx`, fuera de `<main>`, que es donde le toca.
 *
 * El correo es el que dio Imanol. Antes decia `hola@imanolr.dev`, un dominio
 * que no existe: el boton principal del portafolio rebotaba.
 *
 * TODO(Imanol): el segundo boton estaba dibujado como "Agendar llamada" hacia
 * cal.com/imanolr, que da 404. Mientras no haya calendario apunta a LinkedIn,
 * que si responde. Si algun dia hay agenda, se cambian las dos constantes.
 */
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
