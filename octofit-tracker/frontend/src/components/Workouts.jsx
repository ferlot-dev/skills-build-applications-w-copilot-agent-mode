import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from './api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiUrl('workouts'));
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

    loadWorkouts();
  }, []);

  if (loading) return <p>Cargando workouts...</p>;
  if (error) return <p className="text-danger">No se pudo cargar: {error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="row g-3">
          {items.map((workout) => (
            <div className="col-md-6" key={workout._id ?? workout.id}>
              <article className="border rounded p-3 h-100">
                <h3 className="h5 mb-1">{workout.title}</h3>
                <p className="mb-1">{workout.focus}</p>
                <p className="mb-0 text-body-secondary">
                  Intensidad: {workout.intensity} - {workout.durationMinutes} min
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
