import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          <span className="logo-dot blue"></span>
          <span className="logo-dot"></span>
          <span className="logo-dot"></span>
          <span className="logo-dot"></span>
        </div>
        <span className="nav-name">Imanol Rodríguez</span>
      </div>
      
      <div className="nav-links">
        <a href="#areas">Áreas</a>
        <a href="#opensource">Open source</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#stack">Stack</a>
        <a href="#contacto">Contacto</a>
      </div>

      <a href="#contacto" className="btn btn-dark">Contáctame</a>
    </nav>
  );
};

export default Navbar;
