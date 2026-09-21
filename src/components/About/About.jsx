import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <header className="about-header">
          <span className="section-eyebrow">(03) Sobre mí</span>
        </header>

        <div className="about-content">
          <div className="about-image-placeholder">
            <span className="placeholder-text">Tu retrato aquí · 4:5</span>
          </div>

          <div className="about-info">
            <h2 className="about-heading">
              Me interesa el punto donde el diseño deja de verse y simplemente funciona.
            </h2>
            
            <p className="about-desc">
              Soy Imanol, estudiante de Ingeniería en Software en Colima. Empecé programando páginas por curiosidad y terminé obsesionado con por qué algunas interfaces se sienten obvias y otras no. Hoy trabajo entre Figma y el código: investigo, prototipo, pruebo con personas reales y construyo lo que diseño.
            </p>

            <div className="about-timeline">
              <div className="timeline-item">
                <span className="timeline-year">2026</span>
                <span className="timeline-title">Prácticas en diseño de producto</span>
                <span className="timeline-org">Empresa local · Colima</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-year">2025</span>
                <span className="timeline-title">Freelance UX/UI</span>
                <span className="timeline-org">Negocios locales y proyectos escolares</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-year">2023 —</span>
                <span className="timeline-title">Ing. en Software</span>
                <span className="timeline-org">Universidad de Colima</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
