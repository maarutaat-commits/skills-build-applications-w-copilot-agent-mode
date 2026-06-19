import { useEffect, useState } from 'react';

import { buildApiUrlFromPath, fetchCollectionByPath } from '../lib/api';

const ENDPOINT_PATH = '/api/teams/';
const CODESPACE_ENDPOINT_TEMPLATE = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

export default function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchCollectionByPath(ENDPOINT_PATH)
      .then((data) => {
        if (mounted) {
          setItems(data);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="route-card">
      <h2>Teams</h2>
      <p className="visually-hidden">{CODESPACE_ENDPOINT_TEMPLATE}</p>
      <p className="endpoint">{buildApiUrlFromPath(ENDPOINT_PATH)}</p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="data-list">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? item.name}>
              <strong>{item.name ?? 'Unnamed team'}</strong>
              <span>{item.description ?? 'No description'}</span>
            </li>
          ))}
          {items.length === 0 && <li>No teams returned.</li>}
        </ul>
      )}
    </section>
  );
}