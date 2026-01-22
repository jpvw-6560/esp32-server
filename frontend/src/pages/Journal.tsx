
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Journal.css';


const Journal: React.FC = () => {
  // États pour les filtres (à brancher dynamiquement plus tard)
  const [module, setModule] = useState('');
  const [io, setIo] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [modules, setModules] = useState<any[]>([]);
  const [ios, setIos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [daysToDelete, setDaysToDelete] = useState('30');

  useEffect(() => {
    axios.get('http://localhost:3000/modules').then(res => setModules(res.data));
    axios.get('http://localhost:3000/io-points').then(res => setIos(res.data));
  }, []);

  // Historique dynamique
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    let url = 'http://localhost:3000/event-logs';
    const params = [];
    if (module) params.push(`device_name=${encodeURIComponent(module)}`);
    if (io) params.push(`symbolic_name=${encodeURIComponent(io)}`);
    if (dateDebut) params.push(`date_debut=${encodeURIComponent(dateDebut)}`);
    if (dateFin) {
      // Si la date de fin ne contient pas d'heure, on ajoute 23:59:59 pour inclure toute la journée
      let dateFinParam = dateFin;
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateFin)) {
        dateFinParam += 'T23:59:59';
      }
      params.push(`date_fin=${encodeURIComponent(dateFinParam)}`);
    }
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    axios.get(url)
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]));
  }, [module, io, dateDebut, dateFin]);

  return (
    <div className="journal-root">
      <div className="journal-title-bar">
        <span className="journal-title-icon">📋</span>
        <span className="journal-title">Journal des Événements</span>
      </div>
      
      <div className="journal-main-layout">
        <aside className="journal-sidebar journal-filtres-menu">
          <div className="journal-filtres-block">
            <div className="journal-filtres-title"><span role="img" aria-label="search">🔍</span> Filtres</div>
            <hr className="journal-sep" />
            <div className="journal-filtres-col">
              <label>Module</label>
              <select value={module} onChange={e => setModule(e.target.value)}>
                <option value="">Tous les modules</option>
                {modules.map(m => (
                  <option key={m.deviceName} value={m.deviceName}>{m.deviceName} ({m.type})</option>
                ))}
              </select>
            </div>
            <div className="journal-filtres-col">
              <label>IO Symbolique</label>
              <select value={io} onChange={e => setIo(e.target.value)}>
                <option value="">Tous les IOs</option>
                {ios.map(i => (
                  <option key={i.symbolicName || i.absoluteName} value={i.symbolicName || i.absoluteName}>{i.symbolicName || i.absoluteName}</option>
                ))}
              </select>
            </div>
            <div className="journal-filtres-col">
              <label>Date début</label>
              <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
            </div>
            <div className="journal-filtres-col">
              <label>Date fin</label>
              <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} />
            </div>
            <div className="journal-filtres-btns">
              <button className="journal-btn-blue" onClick={() => { setModule(''); setIo(''); setDateDebut(''); setDateFin(''); }}>Réinitialiser</button>
              <button className="journal-btn-red" onClick={e => { e.preventDefault(); setShowModal(true); }}>Nettoyer Vieux Logs</button>
            </div>
          </div>
          {showModal && (
            <div className="journal-modal-bg">
              <div className="journal-modal">
                <div className="journal-modal-title">Supprimer les logs plus anciens que combien de jours ?</div>
                <input className="journal-modal-input" type="number" min="1" value={daysToDelete} onChange={e => setDaysToDelete(e.target.value)} />
                <div className="journal-modal-btns">
                  <button className="journal-btn-blue" onClick={() => setShowModal(false)}>Annuler</button>
                  <button className="journal-btn-orange" onClick={() => { setShowModal(false); /* TODO: appel API suppression */ }}>OK</button>
                </div>
              </div>
            </div>
          )}
        </aside>
        <section className="journal-logs-section">
          <div className="journal-logs-block">
            <div className="journal-logs-title"><span role="img" aria-label="log">📑</span> Historique</div>
            <hr className="journal-sep" />
            <div className="journal-logs-table-wrap">
              <table className="journal-logs-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date/Heure</th>
                    <th>Module</th>
                    <th>IO Symbolique</th>
                    <th>Valeur</th>
                    <th>Seuil</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.triggeredAt ? new Date(log.triggeredAt).toLocaleString() : ''}</td>
                      <td>{log.deviceName}</td>
                      <td>{log.symbolicName}</td>
                      <td className="journal-val-blue">{log.value}</td>
                      <td className="journal-val-red">{log.threshold}</td>
                      <td>{log.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Journal;
