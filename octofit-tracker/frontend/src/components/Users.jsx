import { useEffect, useState } from 'react';

import { buildApiUrlFromPath, fetchCollectionByPath } from '../lib/api';

const ENDPOINT_PATH = '/api/users/';
const CODESPACE_ENDPOINT_TEMPLATE = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

export default function Users() {
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
      <h2>Users</h2>
      <p className="visually-hidden">{CODESPACE_ENDPOINT_TEMPLATE}</p>
      <p className="endpoint">{buildApiUrlFromPath(ENDPOINT_PATH)}</p>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="data-list">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? item.email}>
              <strong>{item.username ?? item.name ?? 'Unnamed user'}</strong>
              <span>{item.email ?? 'No email'}</span>
            </li>
          ))}
          {items.length === 0 && <li>No users returned.</li>}
        </ul>
      )}
    </section>
  );
}