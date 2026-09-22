import Areas from "../secciones/Areas";
import Contacto from "../secciones/Contacto";
import Disenos from "../secciones/Disenos";
import Hero from "../secciones/Hero";
import Nav from "../secciones/Nav";
import OpenSource from "../secciones/OpenSource";
import Pie from "../secciones/Pie";
import Proyectos from "../secciones/Proyectos";
import Redes from "../secciones/Redes";

import "../secciones/Areas.css";
import "../secciones/ChipTinyq.css";
import "../secciones/Contacto.css";
import "../secciones/Disenos.css";
import "../secciones/Hero.css";
import "../secciones/IlustracionCuantizacion.css";
import "../secciones/Nav.css";
import "../secciones/OpenSource.css";
import "../secciones/Pie.css";
import "../secciones/Proyectos.css";
import "../secciones/Redes.css";

export default function Portafolio() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Areas />
        <OpenSource />
        <Proyectos />
        <Disenos />
        <Redes />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}
