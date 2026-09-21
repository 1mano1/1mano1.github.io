import React from 'react';
import './Online.css';

const Online = () => {
  return (
    <section id="online" className="online section container">
      <header className="section-header">
        <span className="section-number">05 — EN LÍNEA</span>
        <h2 className="section-title">Dónde encontrarme</h2>
        <p className="section-subtitle">Código en GitHub, diseños en Figma, modelos en Hugging Face y lo profesional en LinkedIn.</p>
      </header>

      <div className="online-grid">
        <a href="#" className="online-card">
          <div className="online-icon github"></div>
          <div className="online-info">
            <h4>GitHub</h4>
            <span className="online-desc">@imanolr · 24 repos · 1.6k ★</span>
          </div>
        </a>

        <a href="#" className="online-card">
          <div className="online-icon linkedin">in</div>
          <div className="online-info">
            <h4>LinkedIn</h4>
            <span className="online-desc">/in/imanolr · Experiencia y CV</span>
          </div>
        </a>

        <a href="#" className="online-card">
          <div className="online-icon figma"></div>
          <div className="online-info">
            <h4>Figma</h4>
            <span className="online-desc">@imanolr · Diseños y prototipos</span>
          </div>
        </a>

        <a href="#" className="online-card">
          <div className="online-icon huggingface">🤗</div>
          <div className="online-info">
            <h4>Hugging Face</h4>
            <span className="online-desc">imanolr · Modelos cuantizados</span>
          </div>
        </a>

        <a href="#" className="online-card">
          <div className="online-icon roblox"></div>
          <div className="online-info">
            <h4>Roblox</h4>
            <span className="online-desc">ImanolDev · Juegos publicados</span>
          </div>
        </a>

        <a href="#" className="online-card">
          <div className="online-icon kaggle">k</div>
          <div className="online-info">
            <h4>Kaggle</h4>
            <span className="online-desc">imanolr · Notebooks y datasets</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Online;
