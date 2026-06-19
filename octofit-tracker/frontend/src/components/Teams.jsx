import { useEffect, useState } from 'react';

import { buildApiUrl, fetchCollection } from '../lib/api';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchCollection('teams')
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
      <p className="endpoint">{buildApiUrl('teams')}</p>
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