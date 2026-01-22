import React from 'react';

export interface ModuleProps {
  id: number;
  name: string;
  mac: string;
  ip: string;
  status: 'ONLINE' | 'OFFLINE';
  lastSeen: string;
  children?: React.ReactNode;
}

const CarteModule: React.FC<ModuleProps> = ({ id, name, mac, ip, status, lastSeen, children }) => {
  return (
    <div style={{ border: '1px solid #333', borderRadius: 8, padding: 16, marginBottom: 24, background: '#232b3a' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontWeight: 'bold', color: '#4fc3f7', marginRight: 8 }}>{name}</span>
        <span style={{ fontSize: 12, color: '#aaa' }}>(ID: {id})</span>
      </div>
      <div style={{ fontSize: 13, color: '#bbb', marginBottom: 4 }}>MAC: {mac}</div>
      <div style={{ fontSize: 13, color: '#bbb', marginBottom: 4 }}>IP: {ip}</div>
      <div style={{ fontSize: 13, color: status === 'ONLINE' ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
        {status} <span style={{ fontWeight: 'normal', color: '#aaa', fontSize: 12 }}>({lastSeen})</span>
      </div>
      {children}
    </div>
  );
};

export default CarteModule;
