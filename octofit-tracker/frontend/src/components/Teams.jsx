import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from './api';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));
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

    loadTeams();
  }, []);

  if (loading) return <p>Cargando equipos...</p>;
  if (error) return <p className="text-danger">No se pudo cargar: {error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Equipos</h2>
        <div className="row g-3">
          {items.map((team) => (
            <div className="col-md-6" key={team._id ?? team.id ?? team.name}>
              <article className="border rounded p-3 h-100">
                <h3 className="h5 mb-1">{team.name}</h3>
                <p className="mb-2 text-body-secondary">{team.description}</p>
                <p className="mb-0"><strong>Puntos:</strong> {team.score ?? 0}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
