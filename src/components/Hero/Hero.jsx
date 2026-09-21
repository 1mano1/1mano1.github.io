import React from 'react';
import './Hero.css';
import QuantizationGrid from './QuantizationGrid';

const Hero = () => {
  return (
    <section className="hero container">
      <div className="hero-content">
        <div className="hero-text-side">
          <div className="hero-badge">
            <span className="badge-new">Nuevo</span>
            <span className="badge-text">tinyq v0.3 — cuantización INT4 open source →</span>
          </div>
          
          <h1 className="hero-title">
            Backend, IA y <br/>
            modelos que <span style={{color: '#2D55FF'}}>caben <br/>en tu bolsillo.</span>
          </h1>
          
          <p className="hero-desc">
            Soy Imanol, desarrollador backend con un pie en el frontend. Entreno, cuantizo y despliego modelos de machine learning, construyo apps Android y de vez en cuando juegos en Roblox.
          </p>
          
          <div className="hero-ctas">
            <a href="#proyectos" className="btn btn-primary">Ver proyectos</a>
            <a href="/cv.pdf" className="btn btn-secondary">Descargar CV</a>
          </div>
        </div>

        <div className="hero-image-side">
           <QuantizationGrid />
        </div>
      </div>
    </section>
  );
};

export default Hero;
