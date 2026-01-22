import { FlashSwitch, PhotoButton, StreamButton } from '../components/CameraIO';
import { getIOIcon } from './ioIcons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModuleCard from '../components/ModuleCard';

interface IO {
  id: number;
  label: string;
  value: React.ReactNode;
  unit?: string;
  icon?: string;
}

interface Module {
  id: number;
  deviceName: string;
  type: string;
  mac: string;
  ipAddress: string;
  status: string;
  lastSeen: string;
}


const Apercu: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [ioMap, setIoMap] = useState<Record<number, IO[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Module[]>('http://localhost:3000/modules')
      .then(res => {
        setModules(res.data);
        // Pour chaque module, récupérer ses IO
        Promise.all(res.data.map(module =>
          axios.get<IO[]>(`http://localhost:3000/io-points?moduleId=${module.id}`)
            .then(r => ({ id: module.id, ios: r.data }))
            .catch(() => ({ id: module.id, ios: [] }))
        )).then(results => {
          const map: Record<number, IO[]> = {};
          results.forEach(({ id, ios }) => { map[id] = ios; });
          setIoMap(map);
          setLoading(false);
        });
      })
      .catch(() => {
        setError('Erreur lors du chargement des modules');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ marginTop: 80 }}>
      <h1>📊 Aperçu - Réseau ESP32</h1>
      {loading && <p>Chargement des modules...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {modules.map(module => {
        let ios = (ioMap[module.id] || [])
          .filter(io => io && (io as any).moduleId === module.id && ((io as any).displayCard === undefined || (io as any).displayCard === 1))
          .map(io => ({
            ...io,
            label: (io as any).symbolicName || (io as any).absoluteName || '',
            icon: getIOIcon((io as any).type, (io as any).symbolicName)
          }));

        // Pour ESPCAM, injecter les IOs virtuelles caméra
        if (module.type === 'ESPCAM') {
          ios = [
            {
              id: -1000,
              label: 'Flash',
              value: (<FlashSwitch />),
              icon: '💡',
            },
            {
              id: -1001,
              label: 'Photo',
              value: (<PhotoButton />),
              icon: '📷',
            },
            {
              id: -1002,
              label: 'Stream',
              value: (<StreamButton />),
              icon: '▶️',
            },
            ...ios
          ];
        }
        return (
          <ModuleCard
            key={module.id}
            name={module.deviceName}
            type={module.type || ''}
            mac={module.mac}
            ip={module.ipAddress || ''}
            id={module.id}
            status={module.status === 'ONLINE' ? 'ONLINE' : 'OFFLINE'}
            lastSeen={module.lastSeen}
            ios={ios}
          />
        );
      })}


    </div>
  );
};

export default Apercu;
