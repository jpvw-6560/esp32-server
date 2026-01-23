import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Courbes.css';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface ChartConfig {
  id: number;
  name: string;
}

const Courbes: React.FC = () => {
  const [config, setConfig] = useState('');
  const [period, setPeriod] = useState('24h');
  const [configs, setConfigs] = useState<ChartConfig[]>([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/chart-configs`)
      .then(res => setConfigs(res.data))
      .catch(() => setConfigs([]));
  }, []);

  const handleShowChart = (e: React.FormEvent) => {
    e.preventDefault();
    setShowChart(true);
  };

  // Données factices pour le graphique (à remplacer par l'API plus tard)
  const chartRef = useRef<any>(null);
  const chartData = {
    labels: [
      '21/01 14:00', '21/01 15:00', '21/01 16:00', '21/01 17:00', '21/01 18:00',
      '21/01 19:00', '21/01 20:00', '21/01 21:00', '22/01 10:00', '22/01 13:00', '22/01 14:00'
    ],
    datasets: [
      {
        label: 'BP_CH_JP [0/1]',
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0.7, 0.95, 0.1],
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74,222,128,0.2)',
        pointBackgroundColor: '#4ade80',
        pointBorderColor: '#4ade80',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Température Ch_JP_M [0-100]',
        data: [22, 22, 21, 21, 20, 20, 19, 19, 18, 18, 17],
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96,165,250,0.2)',
        pointBackgroundColor: '#60a5fa',
        pointBorderColor: '#60a5fa',
        tension: 0.3,
        yAxisID: 'y2',
      },
      {
        label: 'Humidité Ch_JP_M [0-100]',
        data: [60, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53],
        borderColor: '#f87171',
        backgroundColor: 'rgba(248,113,113,0.2)',
        pointBackgroundColor: '#f87171',
        pointBorderColor: '#f87171',
        tension: 0.3,
        yAxisID: 'y2',
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#fff', font: { size: 16 } },
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Graphique',
        color: '#fff',
        font: { size: 22, weight: 'bold' },
        align: 'start' as const,
        padding: { bottom: 18 }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#232a36',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff', font: { size: 13 } },
        grid: { color: '#232a36' },
        title: { display: true, text: 'Date/Heure', color: '#fff', font: { size: 15 } }
      },
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        min: 0,
        max: 1,
        ticks: {
          color: '#4ade80',
          callback: (v: number) => v === 1 ? 'ON' : v === 0 ? 'OFF' : v,
          font: { size: 13 }
        },
        grid: { color: '#232a36' },
        title: { display: true, text: 'Binaire (0/1)', color: '#4ade80', font: { size: 15 } }
      },
      y2: {
        type: 'linear' as const,
        position: 'right' as const,
        min: 0,
        max: 100,
        ticks: { color: '#fff', font: { size: 13 } },
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Valeur (0-100)', color: '#fff', font: { size: 15 } }
      }
    },
    layout: {
      padding: 20
    },
    backgroundColor: '#181d25',
  };

  const handleDownload = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const a = document.createElement('a');
      a.href = url;
      a.download = 'graphique.png';
      a.click();
    }
  };

  return (
    <div className="courbes-root">
      <div className="courbes-title-bar">
        <span className="courbes-title-icon">📈</span>
        <span className="courbes-title">Courbes de Données</span>
      </div>
      <div className="courbes-card">
        <form className="courbes-config-block" onSubmit={handleShowChart}>
          <div className="courbes-config-title">
            <span className="courbes-config-icon">💾</span>
            <span>Configuration</span>
          </div>
          <hr className="courbes-config-sep" />
          <div className="courbes-config-row">
            <div className="courbes-config-col">
              <label className="courbes-label">Sélectionner une configuration</label>
              <select className="courbes-select" value={config} onChange={e => setConfig(e.target.value)} required>
                <option value="">-- Choisir une configuration --</option>
                {configs.map(cfg => (
                  <option key={cfg.id} value={cfg.id}>{cfg.name}</option>
                ))}
              </select>
            </div>
            <div className="courbes-config-col">
              <label className="courbes-label">Période</label>
              <select className="courbes-select" value={period} onChange={e => setPeriod(e.target.value)}>
                <option value="1h">Dernière heure</option>
                <option value="6h">6 dernières heures</option>
                <option value="24h">24 dernières heures</option>
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="custom">Personnalisé</option>
              </select>
            </div>
          </div>
          <button className="courbes-btn" type="submit">
            <span role="img" aria-label="chart">📊</span> Afficher Graphique
          </button>
        </form>
        {showChart && (
          <div className="courbes-graphique-block">
            <div className="courbes-graphique-header">
              <span className="courbes-graphique-title"><span role="img" aria-label="chart">📈</span> <b>Graphique</b></span>
              <button className="courbes-graphique-download" onClick={handleDownload} type="button">
                <span role="img" aria-label="save">💾</span> Télécharger PNG
              </button>
            </div>
            <div className="courbes-graphique-area">
              <Line ref={chartRef} data={chartData} options={chartOptions} style={{background:'#181d25', borderRadius:12}} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courbes;
