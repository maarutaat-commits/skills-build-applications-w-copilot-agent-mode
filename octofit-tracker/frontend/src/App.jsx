import { NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl, isCodespaceConfigured } from './lib/api';

function Home() {
  return (
    <section className="hero-card">
      <p className="eyebrow">React 19 Presentation Tier</p>
      <h1>OctoFit Tracker</h1>
      <p className="lead mb-3">
        Backend stays on port 8000 and this UI reads API data from the Codespaces URL when configured.
      </p>
      <p className="text-secondary mb-3">
        Active API base: <code>{apiBaseUrl}</code>
      </p>
      <div className="note-card">
        <strong>Environment setup</strong>
        <p className="mb-0">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs.
          If unset, the app safely falls back to <code>http://localhost:8000/api</code>.
        </p>
        {!isCodespaceConfigured && (
          <p className="mb-0 mt-2 text-warning">VITE_CODESPACE_NAME is not set. Using localhost fallback.</p>
        )}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="brand-mark">OT</p>
          <div>
            <h1>OctoFit</h1>
            <p>Multi-tier dashboard</p>
          </div>
        </div>
        <nav>
          <NavLink to="/">Overview</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}