import React from 'react';
import { FaFilter, FaHistory, FaTrashAlt, FaSyncAlt, FaSearch, FaBook, FaChartBar } from 'react-icons/fa';
import './SidebarMenu.css';

interface SidebarMenuProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const sections = [
  { key: 'journal', label: 'Journal', icon: <FaHistory /> },
  { key: 'courbes', label: 'Courbes', icon: <FaChartBar /> },
  { key: 'apercu', label: 'Aperçu', icon: <FaBook /> },
  // Ajoutez d'autres sections ici si besoin
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ activeSection = 'journal', onSectionChange }) => {
  return (
    <nav className="sidebar-menu-root">
      <div className="sidebar-menu-logo">
        <span role="img" aria-label="logo">🎛️</span> <span className="sidebar-menu-title">Gestion ESP</span>
      </div>
      <ul className="sidebar-menu-list">
        {sections.map(section => (
          <li
            key={section.key}
            className={
              'sidebar-menu-item' + (activeSection === section.key ? ' sidebar-menu-item-active' : '')
            }
            onClick={() => onSectionChange && onSectionChange(section.key)}
          >
            <span className="sidebar-menu-icon">{section.icon}</span>
            <span>{section.label}</span>
          </li>
        ))}
      </ul>
      <div className="sidebar-menu-search">
        <FaSearch className="sidebar-menu-search-icon" />
        <input type="text" placeholder="Rechercher..." />
      </div>
    </nav>
  );
};

export default SidebarMenu;
