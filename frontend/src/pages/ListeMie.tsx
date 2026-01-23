import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface Mie {
  id: number;
  mac: string;
  mie: string;
  created_at: string;
}

const ListeMie: React.FC = () => {
  const [data, setData] = useState<Mie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Mie[]>(`${import.meta.env.VITE_API_URL}/mie`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Liste des MIE</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>MAC</th>
            <th>MIE</th>
            <th>Créé le</th>
          </tr>
        </thead>
        <tbody>
          {data.map(mie => (
            <tr key={mie.id}>
              <td>{mie.id}</td>
              <td>{mie.mac}</td>
              <td>{mie.mie}</td>
              <td>{mie.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeMie;
