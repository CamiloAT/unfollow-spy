import React, { useState, useRef } from 'react';
import { useInstagramData } from '../hooks/useInstagramData';
import { UploadSection } from './UploadSection';
import { UserList } from './UserList';
import { Footer } from './Footer';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 26 26" fill="none" stroke="url(#ig-gradient-title)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '6px', marginTop: '-6px' }}>
    <defs>
      <linearGradient id="ig-gradient-title" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop stopColor="#f09433" offset="0%" />
        <stop stopColor="#e6683c" offset="25%" />
        <stop stopColor="#dc2743" offset="50%" />
        <stop stopColor="#cc2366" offset="75%" />
        <stop stopColor="#bc1888" offset="100%" />
      </linearGradient>
    </defs>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="24" y1="24" x2="17.5" y2="17.5"></line>
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

const HeartBreakIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    <line x1="12" y1="5.67" x2="12" y2="21.23" strokeDasharray="2 4"></line>
  </svg>
);

const CheckUserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);

export const AnalyzePage = () => {
  const {
    followers,
    following,
    traitors,
    error,
    hasAnalyzed,
    handleFileUpload,
    calculateTraitors
  } = useInstagramData();

  const [activeTab, setActiveTab] = useState('traitors');
  const tabsRef = useRef(null);

  return (
    <div className="analyze-page-container">
      <div className="analyze-header">
        <h1 className="analyze-title">
          Panel de <span className="gradient-text">Análisis</span> <SearchIcon />
        </h1>
        <p className="analyze-subtitle">
          Carga tus archivos para descubrir quién no te sigue de vuelta.
        </p>
      </div>

      <UploadSection 
        followers={followers}
        following={following}
        error={error}
        handleFileUpload={handleFileUpload}
        calculateTraitors={() => {
           calculateTraitors();
           setActiveTab('traitors');
           setTimeout(() => {
             if (tabsRef.current) {
               const rect = tabsRef.current.getBoundingClientRect();
               const offset = window.scrollY + rect.top - 120;
               window.scrollTo({ top: offset, behavior: 'smooth' });
             }
           }, 150);
        }}
      />

      {hasAnalyzed && (
        <div className="view-tabs" ref={tabsRef}>
          <button 
            className={`view-tab ${activeTab === 'traitors' ? 'active' : ''}`}
            onClick={() => setActiveTab('traitors')}
          >
            <HeartBreakIcon /> Traidores
          </button>
          <button 
            className={`view-tab ${activeTab === 'followers' ? 'active' : ''}`}
            onClick={() => setActiveTab('followers')}
          >
             <UsersIcon /> Mis Seguidores
          </button>
          <button 
            className={`view-tab ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            <CheckUserIcon /> Mis Seguidos
          </button>
        </div>
      )}

      {activeTab === 'traitors' && hasAnalyzed && (
        <UserList 
          users={traitors} 
          title="Resultados del Análisis" 
          emptyMessage="¡Felicidades! Todos los que sigues te siguen de vuelta."
          statusMessage=" No te sigue de vuelta"
          searchEmptyMessage="No hay ningún traidor que coincida con tu búsqueda."
        />
      )}

      {activeTab === 'followers' && hasAnalyzed && (
        <UserList 
          users={followers} 
          title="Cuentas que te siguen"
          emptyMessage="Aún no tienes seguidores registrados."
          statusMessage=" Te sigue"
          searchEmptyMessage="No hay ningún seguidor que coincida con tu búsqueda."
        />
      )}

      {activeTab === 'following' && hasAnalyzed && (
        <UserList 
          users={following} 
          title="Cuentas que sigues"
          emptyMessage="No sigues a ninguna cuenta todavía."
          statusMessage=" Le sigues"
          searchEmptyMessage="No hay ninguna cuenta seguida que coincida con tu búsqueda."
        />
      )}
    </div>
  );
};
