import React from 'react';
import './Design.css';
import bancaImg from '../../assets/Tarjeta_diseno__Banca.svg';
import climaImg from '../../assets/Tarjeta_diseno__Clima.svg';
import dashImg from '../../assets/Tarjeta_diseno__Dashboard.svg';
import landingImg from '../../assets/Tarjeta_diseno__Landing.svg';
import sistemaImg from '../../assets/Tarjeta_diseno__Sistema.svg';

const Design = () => {
  return (
    <section id="design" className="design section container">
      <header className="section-header">
        <div className="section-header-top">
          <span className="section-number">04 — DISEÑO</span>
          <a href="#" className="link-github">Ver perfil en Figma Community →</a>
        </div>
        <h2 className="section-title">Diseños en Figma</h2>
      </header>

      <div className="design-filters">
        <span className="filter active">Todos</span>
        <span className="filter">Apps móviles</span>
        <span className="filter">Web</span>
        <span className="filter">Dashboards</span>
        <span className="filter">Sistemas de diseño</span>
      </div>

      <div className="design-grid">
        <div className="design-card">
          <div className="design-image">
             <img src={bancaImg} alt="Pulso" />
          </div>
          <div className="design-info">
            <h4>Pulso · App de finanzas</h4>
            <span className="design-sub">App móvil · 24 pantallas</span>
            <div className="design-stats">
              <span>❤ 128</span>
              <span>↓ 2.4k</span>
            </div>
          </div>
        </div>

        <div className="design-card">
          <div className="design-image">
             <img src={climaImg} alt="Nimbo" />
          </div>
          <div className="design-info">
            <h4>Nimbo · Widget de clima</h4>
            <span className="design-sub">App móvil · Componentes</span>
            <div className="design-stats">
              <span>❤ 128</span>
              <span>↓ 2.4k</span>
            </div>
          </div>
        </div>

        <div className="design-card">
          <div className="design-image">
             <img src={dashImg} alt="Observa" />
          </div>
          <div className="design-info">
            <h4>Observa · Dashboard de ML</h4>
            <span className="design-sub">Web app · Dark mode</span>
            <div className="design-stats">
              <span>❤ 128</span>
              <span>↓ 2.4k</span>
            </div>
          </div>
        </div>

        <div className="design-card">
          <div className="design-image">
             <img src={landingImg} alt="Brisa" />
          </div>
          <div className="design-info">
            <h4>Brisa · Landing SaaS</h4>
            <span className="design-sub">Web · Responsive</span>
            <div className="design-stats">
              <span>❤ 128</span>
              <span>↓ 2.4k</span>
            </div>
          </div>
        </div>

        <div className="design-card">
          <div className="design-image">
             <img src={sistemaImg} alt="Átomo" />
          </div>
          <div className="design-info">
            <h4>Átomo · Design system</h4>
            <span className="design-sub">120 componentes · Variables</span>
            <div className="design-stats">
              <span>❤ 128</span>
              <span>↓ 2.4k</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Design;
