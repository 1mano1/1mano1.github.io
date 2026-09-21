import React from 'react';
import './Projects.css';
import lumenImg from '../../assets/Tarjeta_proyecto__Lumen__IA_en_tu_bolsillo.svg';
import circuitImg from '../../assets/Tarjeta_proyecto__Circuit_Rush.svg';
import orbitImg from '../../assets/Tarjeta_proyecto__Orbit_API.svg';

const Projects = () => {
  return (
    <section id="proyectos" className="projects section container">
      <header className="section-header">
        <div className="section-header-top">
          <span className="section-number">03 — PROYECTOS</span>
          <a href="#" className="link-github">Ver todos en GitHub →</a>
        </div>
        <h2 className="section-title">Cosas que he construido</h2>
      </header>

      <div className="projects-grid">
        <div className="project-card lumen">
          <div className="project-content">
            <h3 className="project-title">Lumen — IA en tu bolsillo</h3>
            <span className="project-year">2026</span>
            <p className="project-desc">App Android que corre un modelo de 3B parámetros cuantizado a INT4, sin internet. Resume notas y responde preguntas en el dispositivo.</p>
            <div className="project-tags">
              <span>Kotlin</span>
              <span>llama.cpp</span>
              <span>INT4</span>
            </div>
          </div>
          <div className="project-image">
            <img src={lumenImg} alt="Lumen UI" />
          </div>
        </div>

        <div className="project-card circuit">
          <div className="project-content">
            <h3 className="project-title">Circuit Rush</h3>
            <span className="project-year">2025</span>
            <p className="project-desc">Juego de carreras multijugador en Roblox con física personalizada, tienda y tablas de clasificación guardadas con DataStore.</p>
            <div className="project-tags">
              <span>Luau</span>
              <span>Roblox Studio</span>
            </div>
          </div>
          <div className="project-image">
             <img src={circuitImg} alt="Circuit Rush UI" />
          </div>
        </div>

        <div className="project-card orbit">
          <div className="project-content">
            <h3 className="project-title">Orbit API</h3>
            <span className="project-year">2025</span>
            <p className="project-desc">Backend para una red de tiendas locales: pagos, inventario y notificaciones. 2M de peticiones al mes con latencia p95 de 80 ms.</p>
            <div className="project-tags">
              <span>FastAPI</span>
              <span>PostgreSQL</span>
              <span>Redis</span>
            </div>
          </div>
          <div className="project-image">
             <img src={orbitImg} alt="Orbit API UI" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
