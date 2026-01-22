import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Captures.css';

interface Capture {
  filename: string;
  path: string;
  size: number;
  created: string;
  modified: string;
}

const Captures: React.FC = () => {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [sort, setSort] = useState('desc');
  const [loading, setLoading] = useState(false);

  // Extraction des devices à partir des captures
  const extractDevices = (captures: Capture[]) => {
    const set = new Set<string>();
    captures.forEach(c => {
      const device = c.filename.split('-')[0];
      if (device) set.add(device);
    });
    return Array.from(set).sort();
  };

  const fetchCaptures = () => {
    setLoading(true);
    let url = '/api/camera/captures';
    if (selectedDevice) {
      url += `/${encodeURIComponent(selectedDevice)}`;
    }
    axios.get(url)
      .then(res => {
        const data = res.data.captures || [];
        // Tri côté frontend si besoin
        data.sort((a: Capture, b: Capture) => {
          const dateA = new Date(a.created).getTime();
          const dateB = new Date(b.created).getTime();
          return sort === 'desc' ? dateB - dateA : dateA - dateB;
        });
        setCaptures(data);
        setDevices(extractDevices(data));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCaptures();
    // eslint-disable-next-line
  }, [selectedDevice, sort]);

  return (
    <div className="captures-root">
      <div className="captures-header-bar">
        <span className="captures-header-icon" role="img" aria-label="camera">📷</span>
        <span className="captures-header-title">Galerie de Captures</span>
        <span className="captures-header-desc">Visualisation des images capturées par les ESP32-CAM</span>
      </div>
      <div className="captures-filters-row">
        <div className="captures-filter">
          <span role="img" aria-label="filter">🗂️</span> Filtrer par appareil :
          <select value={selectedDevice} onChange={e => setSelectedDevice(e.target.value)}>
            <option value="">Tous les appareils</option>
            {devices.map(dev => (
              <option key={dev} value={dev}>{dev}</option>
            ))}
          </select>
        </div>
        <div className="captures-filter">
          <span role="img" aria-label="sort">🔄</span> Tri :
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="desc">Plus récent d'abord</option>
            <option value="asc">Plus ancien d'abord</option>
          </select>
        </div>
        <button className="captures-refresh-btn" onClick={fetchCaptures}>Actualiser</button>
      </div>
      <div className="captures-count">{captures.length} image(s) trouvée(s)</div>
      <div className="captures-gallery">
        {loading ? <div className="captures-loading">Chargement...</div> :
          captures.length === 0 ? <div className="captures-empty">Aucune image trouvée.</div> :
          captures.map((capture, idx) => (
            <div className="captures-card" key={capture.filename + idx}>
              <img src={capture.path} alt={capture.filename} className="captures-img" />
              <div className="captures-card-footer">
                <span>{capture.filename.split('-')[0]}</span>
                <span>{new Date(capture.created).toLocaleString()}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Captures;
