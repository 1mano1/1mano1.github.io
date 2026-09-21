import React from 'react';
import './Tools.css';

const toolsList = [
  { name: 'Figma', category: 'Diseño', level: 'Avanzado', levelScore: 3 },
  { name: 'FigJam', category: 'Talleres', level: 'Avanzado', levelScore: 3 },
  { name: 'VS Code', category: 'Código', level: 'Avanzado', levelScore: 3 },
  { name: 'React', category: 'Framework', level: 'Intermedio', levelScore: 2 },
  { name: 'Tailwind CSS', category: 'Estilos', level: 'Intermedio', levelScore: 2 },
  { name: 'GitHub', category: 'Versiones', level: 'Intermedio', levelScore: 2 },
  { name: 'Notion', category: 'Documentación', level: 'Avanzado', levelScore: 3 },
  { name: 'Maze', category: 'Pruebas', level: 'Básico', levelScore: 1 }
];

const Tools = () => {
  return (
    <section id="tools" className="tools section container">
      <header className="tools-header">
        <div className="tools-title-wrap">
          <span className="section-eyebrow">(05) Herramientas</span>
          <h2 className="section-title">Con qué trabajo</h2>
        </div>
        <p className="tools-subtitle">
          Las herramientas que uso a diario, con el nivel con el que me siento cómodo.
        </p>
      </header>

      <div className="tools-table">
        {toolsList.map((tool, index) => (
          <div className="tool-row" key={index}>
            <div className="tool-info">
              <h3 className="tool-name">{tool.name}</h3>
              <span className="tool-category">{tool.category}</span>
            </div>
            
            <div className="tool-level">
              <div className="level-bars">
                <span className={`level-bar ${tool.levelScore >= 1 ? 'filled' : ''}`}></span>
                <span className={`level-bar ${tool.levelScore >= 2 ? 'filled' : ''}`}></span>
                <span className={`level-bar ${tool.levelScore >= 3 ? 'filled' : ''}`}></span>
              </div>
              <span className="level-text">{tool.level}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
