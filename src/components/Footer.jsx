import React, { useState } from 'react';
import logoRecorted from '../assets/logo_recorted.png';

export const Footer = () => {
  const [modalType, setModalType] = useState(null);

  const renderModal = () => {
    if (!modalType) return null;

    const content = modalType === 'privacy' ? (
      <>
        <h3>Política de Privacidad</h3>
        <p><strong>1. Uso de Datos:</strong> UnfollowSpy no recopila, almacena ni transmite tus datos personales o archivos originales a ningún servidor. Todo análisis se realiza exclusivamente de forma local utilizando el motor de procesamiento de tu navegador web.</p>
        <p><strong>2. Información Sensible:</strong> No requerimos credenciales de acceso (nombre de usuario, contraseña) ni usamos APIs de terceros que expongan la integridad de tu cuenta de Instagram.</p>
        <p><strong>3. Archivos Residuales:</strong> Una vez finalizada tu sesión o cerrada la pestaña, los datos estadísticos generados en memoria se destruyen permanentemente. Es responsabilidad del usuario eliminar los archivos JSON originales de su dispositivo o computadora.</p>
        <p><strong>4. Transparencia:</strong> Todo el código fuente de UnfollowSpy se encuentra disponible de forma pública. Puedes auditarlo, bifurcarlo y verificar que no existen procesos en la red no declarados.</p>
      </>
    ) : (
      <>
        <h3>Términos y Condiciones</h3>
        <p><strong>1. Restricciones de Uso:</strong> Al utilizar UnfollowSpy, accedes a que esta herramienta se proporciona "tal cual", sin garantías expresas de ningún tipo sobre la continuidad, rendimiento o exactitud perpetua de los algoritmos de parseo de Meta.</p>
        <p><strong>2. Propiedad Intelectual:</strong> No estamos afiliados, patrocinados ni respaldados por Meta Platforms, Inc. "Instagram" es una marca comercial de Meta Platforms. UnfollowSpy es una utilidad independiente desarrollada con fines informativos y de auditoría personal.</p>
        <p><strong>3. Riesgo de Uso:</strong> Puesto que ninguna conexión automatizada desde terceros es utilizada (todo el análisis es 100% sobre archivos estáticos), el riesgo de "baneo" o suspensión por la plataforma es prácticamente nulo. No obstante, las reglas de exportación de datos locales dependen netamente de Meta.</p>
        <p><strong>4. Modificaciones:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento, reflejándose los cambios de manera inmediata en la última versión de despliegue sobre el repositorio principal.</p>
      </>
    );

    return (
      <div className="legal-modal-overlay" onClick={() => setModalType(null)}>
        <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="legal-modal-close" onClick={() => setModalType(null)}>✕</button>
          <div className="legal-modal-body">
            {content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src={logoRecorted} alt="UnfollowSpy Mini Logo" className="footer-logo" />
              <h3 className="footer-title">Unfollow<span className="gradient-text">Spy</span></h3>
            </div>
            <p className="footer-slogan">El poder de tus datos, exclusivamente en tus manos.</p>
          </div>
          <div className="footer-links">
            <a href="#privacidad" onClick={(e) => { e.preventDefault(); setModalType('privacy'); }}>Privacidad</a>
            <a href="#terminos" onClick={(e) => { e.preventDefault(); setModalType('terms'); }}>Términos</a>
            <a href="https://github.com/CamiloAT/unfollow-spy" target="_blank" rel="noreferrer">Código Fuente</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} UnfollowSpy. Auditoría de seguidores.</p>
        </div>
      </footer>
      {renderModal()}
    </>
  );
};
