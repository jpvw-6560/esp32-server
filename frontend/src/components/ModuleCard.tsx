import React from 'react';
import './ModuleCard.css';

export interface IO {
  id: number;
  label: string;
  value: React.ReactNode;
  unit?: string;
  icon?: string;
}

export interface ModuleCardProps {
  name: string;
  type: string;
  mac: string;
  ip: string;
  id: number;
  status: 'ONLINE' | 'OFFLINE';
  lastSeen: string;
  ios: IO[];
  cameraActionsComponent?: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ name, type, mac, ip, id, status, lastSeen, ios, cameraActionsComponent }) => {
  return (
    <div className="module-card">
      <div className="module-info">
        <div className="module-title">{name}<span className="module-type">({type})</span></div>
        <div><span className="module-label">MAC:</span><span className="module-value">{mac}</span></div>
        <div><span className="module-label">IP:</span><span className="module-value">{ip}</span></div>
        <div><span className="module-label">ID:</span><span className="module-value">{id}</span></div>
        <div className="module-status">{status}</div>
        <div className="module-lastseen">(vu il y a {lastSeen})</div>
      </div>
      <div className="module-io">
        {cameraActionsComponent && (
          <div className="io-card camera-io-card">{cameraActionsComponent}</div>
        )}
        {ios.map(io => {
          const isCameraIO = io.id === -1000 || io.id === -1001 || io.id === -1002;
          return (
            <div className={"io-card" + (isCameraIO ? " camera-io-card" : "")} key={io.id}>
              {io.icon && <span className={"io-icon" + (isCameraIO ? " camera-io-icon" : "")} role="img" aria-label="icon">{io.icon}</span>}
              {!isCameraIO && <div className="io-title">{io.label}</div>}
              <div className="io-value">{io.value}{io.unit && <span className="io-unit">{io.unit}</span>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleCard;
