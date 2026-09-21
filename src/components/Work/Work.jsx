import React from 'react';
import './Work.css';

const projects = [
  {
    id: '01',
    title: 'Rutas Colima',
    description: 'App de transporte público: rediseñé la consulta de rutas y horarios. En pruebas con 12 usuarios, el tiempo para planear un viaje bajó de 3:10 a 0:58 min.',
    year: '2026',
    tags: ['UX Research', 'App móvil'],
    bg: 'var(--bg-project-1)',
    featured: true
  },
  {
    id: '02',
    title: 'Panel Clínico',
    description: 'Dashboard para agendar citas en una clínica local; menos errores de captura.',
    year: '2025',
    tags: ['Dashboard'],
    bg: 'var(--bg-project-2)',
    featured: false
  },
  {
    id: '03',
    title: 'Cafetería Norte',
    description: 'Sitio y pedido en línea para un café independiente, con sistema visual propio.',
    year: '2025',
    tags: ['Web', 'Branding'],
    bg: 'var(--bg-project-3)',
    featured: false
  },
  {
    id: '04',
    title: 'Aula+',
    description: 'Plataforma de tareas para estudiantes. Proyecto final, diseñado y programado en React.',
    year: '2024',
    tags: ['Front-end'],
    bg: 'var(--bg-project-4)',
    featured: false
  }
];

const ProjectCard = ({ project }) => (
  <article className={`project-card ${project.featured ? 'featured' : ''}`}>
    <div className="project-image-wrapper" style={{ backgroundColor: project.bg }}>
      {/* Mock wireframe lines inside image */}
      <div className="wireframe-box">
        <div className="wireframe-header"></div>
        <div className="wireframe-body">
          <div className="wireframe-line w-long"></div>
          <div className="wireframe-line w-med"></div>
          <div className="wireframe-line w-short"></div>
        </div>
      </div>
    </div>
    
    <div className="project-meta">
      <div className="project-info">
        <div className="project-header">
          <span className="project-id">{project.id}</span>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <p className="project-desc">{project.description}</p>
      </div>
      
      <div className="project-tags-wrap">
        <span className="project-year">{project.year}</span>
        <div className="project-tags">
          {project.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  </article>
);

const Work = () => {
  return (
    <section id="work" className="work section container">
      <header className="work-header">
        <div className="work-title-wrap">
          <span className="section-eyebrow">(02) Trabajo seleccionado</span>
          <h2 className="section-title">Proyectos</h2>
        </div>
        <p className="work-subtitle">Cuatro casos de estudio · 2024 — 2026</p>
      </header>

      <div className="work-grid">
        <ProjectCard project={projects[0]} />
        
        <div className="work-subgrid">
          {projects.slice(1).map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
