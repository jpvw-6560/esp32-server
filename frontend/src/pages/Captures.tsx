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
  const [previewIdx, setPreviewIdx] = useState<number|null>(null);
  const [devices, setDevices] = useState<string[]>([]);
  const [allDevices, setAllDevices] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [sort, setSort] = useState('desc');
  const [loading, setLoading] = useState(false);


  // Extraction des devices à partir des captures (uniquement pour filtrer les images affichées)
  const extractDevices = (captures: Capture[]) => {
    const set = new Set<string>();
    captures.forEach(c => {
      const device = c.filename.split('-')[0];
      if (device) set.add(device);
    });
    return Array.from(set).sort();
  };

  // Récupère la liste de tous les devices connus (même sans photo)
  const fetchAllDevices = () => {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    axios.get(baseUrl + '/api/modules')
      .then(res => {
        const data: { deviceName?: string }[] = res.data || [];
        const names: string[] = data.map((m) => m.deviceName || '').filter(Boolean);
        setAllDevices(Array.from(new Set(names)).sort());
      });
  };

  const fetchCaptures = () => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL || '';
    let url = baseUrl + '/api/camera/captures';
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

  useEffect(() => {
    fetchAllDevices();
    // eslint-disable-next-line
  }, []);

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
            {allDevices.map(dev => (
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
          captures.map((capture, idx) => {
            const device = capture.filename.split('-')[0];
            const date = new Date(capture.created);
            const dateStr = date.toLocaleDateString();
            const timeStr = date.toLocaleTimeString();
            return (
              <div className="captures-card" key={capture.filename + idx} onClick={() => setPreviewIdx(idx)}>
                <img src={`${import.meta.env.VITE_API_URL}${capture.path}`} alt={capture.filename} className="captures-img" />
                <div className="captures-hover-info">
                  <div className="captures-hover-label">{device}</div>
                  <div className="captures-hover-date">{dateStr} {timeStr}</div>
                </div>
              </div>
            );
          })
        }
      </div>
      {/* Aperçu modale */}
      {previewIdx !== null && captures[previewIdx] && (
        <div className="captures-modal-bg" onClick={() => setPreviewIdx(null)}>
          <div className="captures-modal" onClick={e => e.stopPropagation()}>
            {/* Flèche gauche */}
            {previewIdx > 0 && (
              <button className="captures-modal-arrow captures-modal-arrow-left" onClick={() => setPreviewIdx(previewIdx - 1)} aria-label="Précédent">
                &#8592;
              </button>
            )}
            {/* Flèche droite */}
            {previewIdx < captures.length - 1 && (
              <button className="captures-modal-arrow captures-modal-arrow-right" onClick={() => setPreviewIdx(previewIdx + 1)} aria-label="Suivant">
                &#8594;
              </button>
            )}
            <img
              src={`${import.meta.env.VITE_API_URL}${captures[previewIdx].path}`}
              alt={captures[previewIdx].filename}
              className="captures-modal-img"
            />
            <div className="captures-modal-filename">{captures[previewIdx].filename}</div>
            <div className="captures-modal-details">
              <div className="captures-modal-row">
                <span role="img" aria-label="device">📷</span> <b>Appareil :</b> <span>{captures[previewIdx].filename.split('-')[0]}</span>
                <span style={{marginLeft: '2em'}} role="img" aria-label="date">📅</span> <b>Date :</b> <span>{new Date(captures[previewIdx].created).toLocaleDateString()}</span>
                <span style={{marginLeft: '2em'}} role="img" aria-label="heure">⏰</span> <b>Heure :</b> <span>{new Date(captures[previewIdx].created).toLocaleTimeString()}</span>
              </div>
              <div className="captures-modal-row">
                <span role="img" aria-label="sequence">🎞️</span> <b>Séquence :</b> <span>#{captures[previewIdx].filename.split('-')[1]}</span>
                <span style={{marginLeft: '2em'}} role="img" aria-label="taille">📊</span> <b>Taille :</b> <span>{(captures[previewIdx].size/1024).toFixed(2)} KB</span>
                <span style={{marginLeft: '2em'}} role="img" aria-label="dimensions">🖼️</span> <b>Dimensions :</b> <span>640 × 480 px</span>
              </div>
              <div className="captures-modal-actions">
                <button className="captures-modal-btn">Télécharger</button>
                <button className="captures-modal-btn">Copier le lien</button>
                <button className="captures-modal-btn captures-modal-btn-danger">Supprimer</button>
              </div>
            </div>
            <button className="captures-modal-close" onClick={() => setPreviewIdx(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Captures;
