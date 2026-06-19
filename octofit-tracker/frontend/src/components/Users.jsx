import { useEffect, useState } from 'react';

import { buildApiUrl, fetchCollection } from '../lib/api';

export default function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchCollection('users')
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
      <p className="endpoint">{buildApiUrl('users')}</p>
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