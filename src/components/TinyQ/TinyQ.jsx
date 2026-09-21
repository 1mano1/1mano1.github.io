import React from 'react';
import { Link } from 'react-router-dom';
import './TinyQ.css';
import animacion1 from '../../assets/Ilustracion_cuantizacion_animada.svg';
import animacion2 from '../../assets/Codigo_tinyq_animado.svg';

const TinyQ = () => {
  return (
    <div className="tinyq-page">
      <section className="tinyq-hero container section">
        <Link to="/" className="back-link">← Volver al portafolio</Link>
        <div className="tinyq-hero-content">
          <h1>tinyq</h1>
          <p className="tinyq-subtitle">Librería en Python para cuantizar modelos de lenguaje a INT8 e INT4 con un solo comando.</p>
          
          <div className="tinyq-illustrations">
             <img src={animacion1} alt="Cuantización animada" />
             <img src={animacion2} alt="Código tinyq animado" />
          </div>
        </div>
      </section>

      <section className="tinyq-steps container section">
        <h2>Cómo funciona</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-num">01</span>
            <h3>Calibrar</h3>
            <p>Pasa 128 ventanas de 2048 tokens de wikitext-2 por el modelo y anota el rango real de activaciones de cada capa.</p>
            <a href="#">Saber más →</a>
          </div>

          <div className="step-card">
            <span className="step-num">02</span>
            <h3>Cuantizar por grupos</h3>
            <p>Agrupa los pesos de 64 en 64, saca escala y punto cero de cada grupo y redondea a uno de 16 niveles (4 bits).</p>
            <a href="#">Saber más →</a>
          </div>

          <div className="step-card">
            <span className="step-num">03</span>
            <h3>Evaluar y exportar</h3>
            <p>Mide la perplejidad contra el original y exporta a .gguf para llama.cpp y Android, o a .tq para PyTorch.</p>
            <a href="#">Saber más →</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TinyQ;
