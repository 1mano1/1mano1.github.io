import React from 'react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills section container">
      <header className="skills-header">
        <div className="skills-title-wrap">
          <span className="section-eyebrow">(04) Habilidades</span>
          <h2 className="section-title">Qué hago</h2>
        </div>
        <p className="skills-subtitle">
          Tres áreas que se alimentan entre sí: entender a las personas, diseñar la solución y construirla.
        </p>
      </header>

      <div className="skills-grid">
        <div className="skill-column">
          <div className="skill-column-header">
            <span className="skill-letter">A</span>
            <h3 className="skill-title">Investigación</h3>
          </div>
          <ul className="skill-list">
            <li>Entrevistas a usuarios</li>
            <li>Pruebas de usabilidad</li>
            <li>Mapas de experiencia</li>
            <li>Arquitectura de información</li>
          </ul>
        </div>

        <div className="skill-column">
          <div className="skill-column-header">
            <span className="skill-letter">B</span>
            <h3 className="skill-title">Diseño de interfaces</h3>
          </div>
          <ul className="skill-list">
            <li>Wireframes y prototipos</li>
            <li>Sistemas de diseño</li>
            <li>Diseño responsivo</li>
            <li>Accesibilidad (WCAG 2.2)</li>
          </ul>
        </div>

        <div className="skill-column">
          <div className="skill-column-header">
            <span className="skill-letter">C</span>
            <h3 className="skill-title">Desarrollo front-end</h3>
          </div>
          <ul className="skill-list">
            <li>HTML, CSS y JavaScript</li>
            <li>React y TypeScript</li>
            <li>Maquetación con Tailwind</li>
            <li>Git y control de versiones</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
