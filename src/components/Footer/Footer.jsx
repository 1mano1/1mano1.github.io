import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contacto" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <h2 className="footer-title">¿Tienes un modelo que no cabe o una idea por construir?</h2>
            <p className="footer-desc">Respondo en menos de 24 horas.</p>
            <div className="footer-ctas">
              <a href="mailto:hola@imanolr.dev" className="btn btn-primary">hola@imanolr.dev</a>
              <a href="#" className="btn btn-secondary">Agendar llamada</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Imanol Rodríguez</span>
          <span>Hecho en Colima, MX</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
