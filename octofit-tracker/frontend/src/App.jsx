import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl } from './components/api';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4 py-md-5">
      <header className="mb-4">
        <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
        <p className="text-body-secondary mb-3">
          React 19 presentation tier with Codespaces-aware API routing.
        </p>
        <p className="small mb-0">
          <strong>API base:</strong> {apiBaseUrl}
        </p>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
