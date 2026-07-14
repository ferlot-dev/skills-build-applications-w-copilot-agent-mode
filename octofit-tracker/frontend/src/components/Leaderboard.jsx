import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from './api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <p>Cargando leaderboard...</p>;
  if (error) return <p className="text-danger">No se pudo cargar: {error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <ol className="list-group list-group-numbered">
          {items.map((entry) => (
            <li className="list-group-item d-flex justify-content-between" key={entry._id ?? entry.id}>
              <span>{entry.user?.fullName ?? entry.user?.username ?? 'Usuario'}</span>
              <strong>{entry.points} pts</strong>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Leaderboard;
