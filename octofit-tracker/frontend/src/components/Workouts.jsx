import { useEffect, useState } from 'react';

import { buildApiUrlFromPath, fetchCollectionByPath } from '../lib/api';

const ENDPOINT_PATH = '/api/workouts/';

export default function Workouts() {
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
      <h2>Workouts</h2>
      <p className="endpoint">{buildApiUrlFromPath(ENDPOINT_PATH)}</p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="data-list">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? item.name}>
              <strong>{item.name ?? 'Workout'}</strong>
              <span>{item.duration ?? 0} min | {item.difficulty ?? 'unknown'}</span>
            </li>
          ))}
          {items.length === 0 && <li>No workouts returned.</li>}
        </ul>
      )}
    </section>
  );
}