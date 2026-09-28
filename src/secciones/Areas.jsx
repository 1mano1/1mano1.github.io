import { revelado, useRevelar } from '../lib/useRevelar'

/* 01 — Áreas. */
const TARJETAS = [
  {
    icono: 'backend',
    titulo: 'Backend y APIs',
    texto:
      'Servicios en Python y Node, bases de datos, colas y despliegue con Docker. Donde paso la mayor parte del día.',
    chips: ['FastAPI', 'PostgreSQL', 'Docker'],
  },
  {
    icono: 'ia',
    titulo: 'IA y cuantización',
    texto:
      'Entreno y ajusto modelos, y los comprimo a INT8 / INT4 para que corran en menos memoria perdiendo lo menos posible.',
    chips: ['PyTorch', 'GGUF', 'llama.cpp'],
  },
  {
    icono: 'android',
    titulo: 'Apps Android',
    texto:
      'Apps en Kotlin y en Flutter con modelos de IA corriendo directo en el teléfono, sin depender de la nube.',
    chips: ['Kotlin', 'Flutter', 'llama.cpp'],
  },
  {
    icono: 'roblox',
    titulo: 'Juegos en Roblox',
    texto:
      'Mecánicas, sistemas y experiencias multijugador programadas en Luau dentro de Roblox Studio.',
    chips: ['Luau', 'Roblox Studio'],
  },
]

export default function Areas() {
  const [ref, visible] = useRevelar()

  return (
    <section className="areas" id="areas" ref={ref}>
      <div className="contenedor">
        <div {...revelado(visible, 'areas__cabecera')}>
          <div className="areas__titulos">
            <p className="rotulo">01 — ÁREAS</p>
            <h2 className="titulo-seccion">En qué trabajo</h2>
          </div>
          <p className="entradilla">
            Mi base es el backend, pero me gusta llevar las cosas de punta a punta: del modelo al
            servidor y del servidor a la pantalla.
          </p>
        </div>

        <div className="areas__rejilla">
          {TARJETAS.map((t, i) => (
            <article key={t.icono} {...revelado(visible, 'tarjeta-area', 80 + i * 80)}>
              <span className="tarjeta-area__icono">
                <img src={`/iconos/area-${t.icono}.svg`} alt="" width="56" height="56" />
                <img
                  className="tarjeta-area__icono-hover"
                  src={`/iconos/area-${t.icono}-hover.svg`}
                  alt=""
                  width="56"
                  height="56"
                />
              </span>

              <div className="tarjeta-area__cuerpo">
                <h3 className="tarjeta-area__titulo">{t.titulo}</h3>
                <p className="tarjeta-area__texto">{t.texto}</p>
                <ul className="tarjeta-area__chips">
                  {t.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
