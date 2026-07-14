import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from './api';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users'));
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

    loadUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-danger">No se pudo cargar: {error}</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Usuarios</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Nivel</th>
                <th>Equipo</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.id ?? user.username}>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.fitnessLevel}</td>
                  <td>{user.team?.name ?? 'Sin equipo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
