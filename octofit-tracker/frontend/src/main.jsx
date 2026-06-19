import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <section className="hero-card">
      <p className="eyebrow">Modern Multi-Tier Application</p>
      <h1>OctoFit Tracker</h1>
      <p className="lead mb-4">
        React 19 on port 5173, a TypeScript Express API on 8000, and MongoDB on 27017.
      </p>
      <div className="status-grid">
        <div>
          <span>Presentation</span>
          <strong>Vite + React 19</strong>
        </div>
        <div>
          <span>Logic</span>
          <strong>Express + TypeScript</strong>
        </div>
        <div>
          <span>Data</span>
          <strong>MongoDB + Mongoose</strong>
        </div>
      </div>
    </section>
  );
}

function ApiRoutes() {
  const routes = [
    '/api/users',
    '/api/teams',
    '/api/activities',
    '/api/leaderboard',
    '/api/workouts',
  ];

  return (
    <section className="route-card">
      <h2>Backend endpoints</h2>
      <ul>
        {routes.map((route) => (
          <li key={route}>{route}</li>
        ))}
      </ul>
    </section>
  );
}

function AppShell() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div>
            <p className="brand-mark">OT</p>
            <div>
              <h1>OctoFit</h1>
              <p>Tracker scaffold</p>
            </div>
          </div>
          <nav>
            <NavLink to="/">Overview</NavLink>
            <NavLink to="/api">API</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api" element={<ApiRoutes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>,
);
