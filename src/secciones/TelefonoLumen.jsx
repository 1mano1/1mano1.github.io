/**
 * Maqueta del telefono de la tarjeta de Lumen (Figma 25:12 -> 25:25).
 *
 * Va en HTML y no como SVG exportado a proposito: Figma convierte el texto
 * en contornos al exportar, y el archivo pasaba de 1 KB a 120 KB para dejar
 * unos globos de chat que aqui son cuatro divs. Ademas el texto asi se lee,
 * se puede seleccionar y lo ve un lector de pantalla.
 *
 * Las medidas son las del diseno, en un lienzo fijo de 200x400 colocado a
 * 40px del borde de arriba. Sobresale por abajo del recuadro de 320 y se
 * recorta, igual que en Figma.
 *
 * El globo decia "GGUF vs ONNX" y TinyQ no exporta ONNX, y "1.8 GB en INT4"
 * cuando el .gguf del 1.5B —el modelo mas grande que Lumen puede repartir sin
 * pedirle permiso a Alibaba— pesa 1.32 GB.
 */

const BURBUJAS = [
  { de: 'yo', x: 62, y: 76, w: 120, texto: 'Resume mis notas de la clase de hoy' },
  {
    de: 'ia',
    x: 12,
    y: 130,
    w: 150,
    texto: 'Claro. Temas clave: 1) cuantización por bloques, 2) calibración, 3) export a GGUF.',
  },
  { de: 'yo', x: 80, y: 222, w: 102, texto: '¿Y cuánto pesa el modelo?' },
  { de: 'ia', x: 12, y: 266, w: 140, texto: '1.3 GB en INT4 — cabe en tu RAM.' },
]

export default function TelefonoLumen() {
  return (
    <div className="fono" aria-hidden="true">
      <div className="fono__pantalla">
        <span className="fono__camara" />
        <span className="fono__marca">Lumen</span>
        <span className="fono__estado mono">offline</span>

        {BURBUJAS.map((b) => (
          <p
            key={b.y}
            className={`fono__globo fono__globo--${b.de}`}
            style={{ left: `${b.x}px`, top: `${b.y}px`, width: `${b.w}px` }}
          >
            {b.texto}
          </p>
        ))}

        <span className="fono__caja" />
        <span className="fono__pista">Escribe un mensaje…</span>
        <span className="fono__enviar" />
      </div>
    </div>
  )
}
