import React from 'react';
import { Link } from 'react-router-dom';
import './OpenSource.css';

const OpenSource = () => {
  return (
    <section id="opensource" className="opensource section container">
      <header className="section-header">
        <span className="section-number">02 — OPEN SOURCE</span>
        <h2 className="section-title">Lo que libero para todos</h2>
      </header>

      <div className="os-featured">
        <div className="os-featured-header">
          <div className="os-title-wrap">
            <h3 className="os-featured-title">tinyq</h3>
            <span className="os-badge">OPEN SOURCE · MIT</span>
          </div>
          <p className="os-featured-desc">Librería en Python para cuantizar modelos de lenguaje a INT8 e INT4 con un solo comando. Reduce hasta 73% la memoria y exporta a GGUF y ONNX para correrlos en laptops y teléfonos Android.</p>
        </div>
        
        <div className="os-stats">
          <div className="stat"><span>★</span> 1.2k</div>
          <div className="stat"><span>⑂</span> 86 forks</div>
          <div className="stat">v0.3.0</div>
        </div>

        <div className="os-terminal">
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-body">
            <p><span className="prompt">$</span> pip install tinyq</p>
            <p><span className="prompt">$</span> tinyq quantize llama-3-8b --bits 4 --group 64</p>
            <br />
            <p className="success">✓ Calibrando   512/512</p>
            <p className="success">✓ Cuantizando  224 capas</p>
            <p className="success">✓ Exportando   model.gguf</p>
            <br />
            <p>Tamaño     16.0 GB → 4.3 GB</p>
            <p>Precisión  98.6%</p>
            <p>Velocidad  ×2.8 más rápido</p>
          </div>
        </div>
        
        <div className="os-ctas">
          <Link to="/tinyq" className="btn btn-primary">Ver caso de estudio</Link>
          <a href="#" className="btn btn-secondary">Ver en GitHub</a>
        </div>
      </div>

      <div className="os-grid">
        <div className="os-card">
          <div className="os-card-top">
            <h4>droid-llm</h4>
            <span className="os-lang">Kotlin</span>
          </div>
          <p>Chat con LLM local en Android, 100% offline.</p>
          <div className="os-star">★ 340</div>
        </div>
        
        <div className="os-card">
          <div className="os-card-top">
            <h4>fastapi-ml-kit</h4>
            <span className="os-lang">Python</span>
          </div>
          <p>Plantilla para servir modelos con FastAPI y colas.</p>
          <div className="os-star">★ 210</div>
        </div>
        
        <div className="os-card">
          <div className="os-card-top">
            <h4>rbx-inventory</h4>
            <span className="os-lang">Luau</span>
          </div>
          <p>Sistema de inventario modular para Roblox.</p>
          <div className="os-star">★ 95</div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
