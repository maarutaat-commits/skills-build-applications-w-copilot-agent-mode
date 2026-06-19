import { useEffect, useState } from 'react';

import { buildApiUrl, fetchCollection } from '../lib/api';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchCollection('activities')
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
      <h2>Activities</h2>
      <p className="endpoint">{buildApiUrl('activities')}</p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="data-list">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? `${item.type}-${item.date}`}>
              <strong>{item.type ?? 'Activity'}</strong>
              <span>{item.duration ?? 0} min | {item.calories ?? 0} kcal</span>
            </li>
          ))}
          {items.length === 0 && <li>No activities returned.</li>}
        </ul>
      )}
    </section>
  );
}