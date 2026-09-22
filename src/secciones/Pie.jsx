/**
 * Pie de pagina. Figma 28:77 (desktop) y 56:3330 (movil).
 *
 * Figma lo dibuja dentro del mismo frame que Contacto, pero aqui va fuera de
 * `<main>`: un `<footer>` metido en el contenido principal no es el pie del
 * sitio y no sale en la lista de regiones del lector de pantalla.
 */
export default function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor pie__interior">
        {/* El año sale del reloj: el diseno dice 2026 y esto no envejece. */}
        <p>© {new Date().getFullYear()} Imanol Rodríguez</p>
        <p>Hecho en Colima, MX</p>
      </div>
    </footer>
  )
}
