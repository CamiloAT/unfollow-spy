import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import logo from '../assets/logo.png';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const HeartBreakIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    <line x1="12" y1="5.67" x2="12" y2="21.23" strokeDasharray="2 4"></line>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CheckUserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);

const getDaysAgo = (timestamp) => {
  if (!timestamp) return null;
  return Math.floor((Date.now() - timestamp * 1000) / (1000 * 60 * 60 * 24));
};

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Desconocido';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
};

const imageToBase64 = (imgSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = imgSrc;
  });
};

export const ReportModal = ({ onClose, traitors, followers, following }) => {
  const [includeTraitors, setIncludeTraitors] = useState(true);
  const [includeFollowers, setIncludeFollowers] = useState(false);
  const [includeFollowing, setIncludeFollowing] = useState(false);

  const anySelected = includeTraitors || includeFollowers || includeFollowing;

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    const logoBase64 = await imageToBase64(logo);
    if (logoBase64) {
      const logoWidth = 50;
      const logoHeight = 35;
      doc.addImage(logoBase64, 'PNG', 14, y - 5, logoWidth, logoHeight);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(31, 41, 55);
    doc.text('UnfollowSpy - Reporte de Auditoria', logoBase64 ? 55 : pageWidth / 2, y + 6, { align: logoBase64 ? 'left' : 'center' });
    y += 18;

    const drawGradientLine = () => {
      const colors = [
        [240, 148, 51],
        [230, 104, 60],
        [220, 39, 67],
        [204, 35, 102],
        [188, 24, 136]
      ];
      const step = pageWidth / colors.length;
      colors.forEach((color, i) => {
        doc.setDrawColor(...color);
        doc.setLineWidth(0.8);
        doc.line(i * step, y, (i + 1) * step, y);
      });
      y += 10;
    };

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`, pageWidth / 2, y, { align: 'center' });
    y += 12;

    drawGradientLine();

    const sections = [];

    if (includeTraitors) {
      sections.push({
        title: `Traidores (${traitors.length})`,
        subtitle: 'Cuentas que no te siguen de vuelta',
        data: traitors,
        color: [220, 39, 67],
        lastColumnHeader: 'Dias sin seguirte',
        formatLastColumn: (user) => {
          const days = getDaysAgo(user.timestamp);
          return days !== null ? `${days} dias` : '-';
        }
      });
    }

    if (includeFollowers) {
      sections.push({
        title: `Mis Seguidores (${followers.length})`,
        subtitle: 'Cuentas que te siguen',
        data: followers,
        color: [16, 185, 129],
        lastColumnHeader: 'Dias siguiendote',
        formatLastColumn: (user) => {
          const days = getDaysAgo(user.timestamp);
          return days !== null ? `${days} dias` : '-';
        }
      });
    }

    if (includeFollowing) {
      sections.push({
        title: `Mis Seguidos (${following.length})`,
        subtitle: 'Cuentas que sigues',
        data: following,
        color: [59, 130, 246],
        lastColumnHeader: 'Dias siguiendo',
        formatLastColumn: (user) => {
          const days = getDaysAgo(user.timestamp);
          return days !== null ? `${days} dias` : '-';
        }
      });
    }

    sections.forEach((section, sIndex) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...section.color);
      doc.text(section.title, 14, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      doc.text(section.subtitle, 14, y);
      y += 10;

      if (section.data.length === 0) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175);
        doc.text('No hay usuarios en esta categoria.', 14, y);
        y += 10;
      } else {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(75, 85, 99);
        doc.text('Usuario', 14, y);
        doc.text('Fecha de seguimiento', 80, y);
        doc.text(section.lastColumnHeader, 155, y);
        y += 2;

        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.3);
        doc.line(14, y, pageWidth - 14, y);
        y += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        section.data.forEach((user, i) => {
          if (y > 275) {
            doc.addPage();
            y = 20;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(75, 85, 99);
            doc.text('Usuario', 14, y);
            doc.text('Fecha de seguimiento', 80, y);
            doc.text(section.lastColumnHeader, 155, y);
            y += 2;
            doc.line(14, y, pageWidth - 14, y);
            y += 5;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
          }

          if (i % 2 === 0) {
            doc.setFillColor(249, 250, 251);
            doc.rect(12, y - 4, pageWidth - 24, 7, 'F');
          }

          doc.setTextColor(31, 41, 55);
          doc.text(user.username || 'Desconocido', 14, y);

          doc.setTextColor(107, 114, 128);
          doc.text(formatTimestamp(user.timestamp), 80, y);

          doc.text(section.formatLastColumn(user), 155, y);

          y += 7;
        });
      }

      y += 8;

      if (sIndex < sections.length - 1) {
        drawGradientLine();
      }
    });

    y += 10;
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    drawGradientLine();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(31, 41, 55);
    doc.text('Resumen', 14, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);

    if (includeTraitors) {
      doc.text(`Traidores: ${traitors.length}`, 14, y);
      y += 5;
    }
    if (includeFollowers) {
      doc.text(`Seguidores: ${followers.length}`, 14, y);
      y += 5;
    }
    if (includeFollowing) {
      doc.text(`Seguidos: ${following.length}`, 14, y);
      y += 5;
    }

    doc.save('UnfollowSpy_Reporte.pdf');
    onClose();
  };

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        <button className="report-modal-close" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="report-modal-header">
          <h2>Descargar <span className="gradient-text">Reporte</span></h2>
          <p>Selecciona que datos incluir en tu reporte PDF.</p>
        </div>

        <div className="report-options">
          <label className={`report-option ${includeTraitors ? 'selected' : ''}`}>
            <div className="report-option-left">
              <div className="report-option-icon traitors-icon">
                <HeartBreakIcon />
              </div>
              <div className="report-option-info">
                <span className="report-option-name">Traidores</span>
                <span className="report-option-count">{traitors.length} cuentas</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeTraitors}
              onChange={(e) => setIncludeTraitors(e.target.checked)}
              className="report-checkbox"
            />
          </label>

          <label className={`report-option ${includeFollowers ? 'selected' : ''}`}>
            <div className="report-option-left">
              <div className="report-option-icon followers-icon">
                <UsersIcon />
              </div>
              <div className="report-option-info">
                <span className="report-option-name">Mis Seguidores</span>
                <span className="report-option-count">{followers.length} cuentas</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeFollowers}
              onChange={(e) => setIncludeFollowers(e.target.checked)}
              className="report-checkbox"
            />
          </label>

          <label className={`report-option ${includeFollowing ? 'selected' : ''}`}>
            <div className="report-option-left">
              <div className="report-option-icon following-icon">
                <CheckUserIcon />
              </div>
              <div className="report-option-info">
                <span className="report-option-name">Mis Seguidos</span>
                <span className="report-option-count">{following.length} cuentas</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeFollowing}
              onChange={(e) => setIncludeFollowing(e.target.checked)}
              className="report-checkbox"
            />
          </label>
        </div>

        <button
          className="btn-primary report-download-btn"
          onClick={generatePDF}
          disabled={!anySelected}
        >
          <DownloadIcon />
          Descargar PDF
        </button>
      </div>
    </div>
  );
};
