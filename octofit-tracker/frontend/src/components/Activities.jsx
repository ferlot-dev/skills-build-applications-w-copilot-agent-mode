import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from './api';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'));
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

    loadActivities();
  }, []);

  if (loading) return <p>Cargando actividades...</p>;
  if (error) return <p className="text-danger">No se pudo cargar: {error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Actividades</h2>
        <ul className="list-group list-group-flush">
          {items.map((activity) => (
            <li className="list-group-item px-0" key={activity._id ?? activity.id}>
              <div className="d-flex justify-content-between flex-wrap gap-2">
                <strong>{activity.type}</strong>
                <span>{activity.durationMinutes} min</span>
              </div>
              <small className="text-body-secondary">
                {activity.user?.fullName ?? activity.user?.username ?? 'Usuario'} - {activity.caloriesBurned} kcal
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
