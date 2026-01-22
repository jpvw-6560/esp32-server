import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <span className="navbar-logo">
        <span className="navbar-logo-icon" role="img" aria-label="home">🏠</span>
        ESP Network
      </span>
      <div className="navbar-menu">
        <Link to="/apercu" className={location.pathname === '/apercu' || location.pathname === '/' ? 'navbar-link-active' : 'navbar-link'}>
          <span role="img" aria-label="chart">📊</span> Aperçu
        </Link>
        <Link to="/courbes" className={location.pathname === '/courbes' ? 'navbar-link-active' : 'navbar-link'}>
          <span role="img" aria-label="chart">📈</span> Courbes
        </Link>
        <span className="navbar-link">
          <span role="img" aria-label="journal">📋</span> Journal
        </span>
        <span className="navbar-link">
          <span role="img" aria-label="monitoring">🔍</span> Monitoring
        </span>
        <span className="navbar-link">
          <span role="img" aria-label="captures">📷</span> Captures
        </span>
        <span className="navbar-link" style={{ position: 'relative' }}>
          <span role="img" aria-label="config">⚙️</span> Configuration <span style={{fontSize: 12, marginLeft: 2}}>▼</span>
          <div className="navbar-config-dropdown">
            <div className="navbar-config-item"><span role="img" aria-label="search">🔍</span> Recherche des modules</div>
            <div className="navbar-config-item"><span role="img" aria-label="io">🛠️</span> Gestion E/S</div>
            <div className="navbar-config-item"><span role="img" aria-label="logic">🧠</span> Logique</div>
            <div className="navbar-config-item"><span role="img" aria-label="event">⚡</span> Événements</div>
            <div className="navbar-config-item"><span role="img" aria-label="chart">📊</span> Graphiques</div>
          </div>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
