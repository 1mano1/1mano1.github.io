import React from 'react';
import './Areas.css';

const Areas = () => {
  return (
    <section id="areas" className="areas section container">
      <header className="section-header">
        <span className="section-number">01 — ÁREAS</span>
        <h2 className="section-title">En qué trabajo</h2>
        <p className="section-subtitle">Mi base es el backend, pero me gusta llevar las cosas de punta a punta: del modelo al servidor y del servidor a la pantalla.</p>
      </header>

      <div className="areas-grid">
        <div className="area-card">
          <h3 className="area-title">Backend y APIs</h3>
          <p className="area-desc">Servicios en Python y Node, bases de datos, colas y despliegue con Docker. Donde paso la mayor parte del día.</p>
          <div className="area-tags">
            <span>FastAPI</span>
            <span>PostgreSQL</span>
            <span>Docker</span>
          </div>
        </div>

        <div className="area-card">
          <h3 className="area-title">IA y cuantización</h3>
          <p className="area-desc">Entreno y ajusto modelos, y los comprimo a INT8 / INT4 para que corran en menos memoria sin perder precisión.</p>
          <div className="area-tags">
            <span>PyTorch</span>
            <span>GGUF</span>
            <span>ONNX</span>
          </div>
        </div>

        <div className="area-card">
          <h3 className="area-title">Apps Android</h3>
          <p className="area-desc">Apps nativas en Kotlin con modelos de IA corriendo directo en el teléfono, sin depender de la nube.</p>
          <div className="area-tags">
            <span>Kotlin</span>
            <span>Compose</span>
            <span>TFLite</span>
          </div>
        </div>

        <div className="area-card">
          <h3 className="area-title">Juegos en Roblox</h3>
          <p className="area-desc">Mecánicas, sistemas y experiencias multijugador programadas en Luau dentro de Roblox Studio.</p>
          <div className="area-tags">
            <span>Luau</span>
            <span>Roblox Studio</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Areas;
