import React, { useState, useMemo } from 'react';

const CURRENT_TIME = Date.now();

const SearchInputIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SortIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

const EmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

export const UserList = ({ users, title, emptyMessage, statusMessage, searchEmptyMessage = "No hay coincidencias con la búsqueda." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('alpha-asc');

  const getValidUsername = (userObj) => {
    const raw = typeof userObj === 'string' ? userObj : userObj.username;
    return raw && typeof raw === 'string' ? raw : "Usuario Desconocido";
  };

  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    // Filter by search
    let processed = users.filter((userObj) => {
      const username = getValidUsername(userObj).toLowerCase();
      return username.includes(searchTerm.toLowerCase());
    });

    // Sort
    processed.sort((a, b) => {
      const nameA = getValidUsername(a).toLowerCase();
      const nameB = getValidUsername(b).toLowerCase();
      const timeA = a.timestamp || 0;
      const timeB = b.timestamp || 0;

      switch (sortBy) {
        case 'alpha-asc':
          return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
        case 'alpha-desc':
          return nameA > nameB ? -1 : (nameA < nameB ? 1 : 0);
        case 'days-desc':
          // Más antiguos primero (menor timestamp = fecha más vieja)
          return timeA - timeB;
        case 'days-asc':
          // Más recientes primero (mayor timestamp = fecha más nueva)
          return timeB - timeA;
        default:
          return 0;
      }
    });

    return processed;
  }, [users, searchTerm, sortBy]);

  if (!users) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysAgo = (timestamp) => {
    if (!timestamp) return null;
    const days = Math.floor((CURRENT_TIME - timestamp * 1000) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="traitor-list-container">
      <div className="traitor-list-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{title}</h3>
          <span className="traitor-badge">{users.length} {users.length === 1 ? 'cuenta en total' : 'cuentas en total'}</span>
        </div>

        {/* Toolbar: Buscador y Filtros (Oculto si no hay usuarios) */}
        {users.length > 0 && (
          <div className="list-toolbar">
            <div className="search-wrapper">
              <div className="search-icon">
                <SearchInputIcon />
              </div>
              <input 
                type="text" 
                className="user-search-input" 
                placeholder="Buscar por nombre de usuario..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="sort-wrapper">
              <SortIcon />
              <select 
                className="user-sort-select" 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="alpha-asc">A - Z</option>
                <option value="alpha-desc">Z - A</option>
                <option value="days-asc">Más recientes</option>
                <option value="days-desc">Más antiguos</option>
              </select>
            </div>
          </div>
        )}

      </div>

      <div className="traitor-grid">
        {users.length === 0 ? (
          <div className="empty-search-state">
              <EmptyIcon />
              <p>{emptyMessage}</p>
          </div>
        ) : filteredAndSortedUsers.length > 0 ? (
          filteredAndSortedUsers.map((userObj, index) => {
            const username = getValidUsername(userObj);
            const initial = username !== "Usuario Desconocido" ? username.charAt(0).toUpperCase() : "?";
            const timestamp = userObj.timestamp;
            const animationDelay = Math.min(index * 0.05, 2); 
            const formattedDate = formatDate(timestamp);
            const daysAgo = getDaysAgo(timestamp);

            return (
              <div 
                key={`${username}-${index}`} 
                className="modern-traitor-card"
                style={{ animationDelay: `${animationDelay}s` }}
              >
                <div className="modern-traitor-card-left">
                  <div className="traitor-avatar">
                    {initial}
                  </div>
                  <div className="traitor-info">
                    {username !== "Usuario Desconocido" ? (
                      <a 
                        href={`https://instagram.com/${username}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="traitor-username"
                      >
                        @{username}
                      </a>
                    ) : (
                      <span className="traitor-username">{username}</span>
                    )}
                    <span className="traitor-status">{statusMessage}</span>
                  </div>
                </div>

                {(formattedDate || daysAgo !== null) && (
                  <div className="modern-traitor-card-right">
                    {formattedDate && <span className="traitor-time-badge">{formattedDate}</span>}
                    {daysAgo !== null && (
                      <span className="traitor-time-days">
                        hace {daysAgo} {daysAgo === 1 ? 'día' : 'días'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })
        ) : (
           <div className="empty-search-state">
              <EmptyIcon />
              <p>{searchEmptyMessage}</p>
           </div>
        )}
      </div>
    </div>
  );
};
