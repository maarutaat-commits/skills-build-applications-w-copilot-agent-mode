import { useEffect, useState } from 'react';

import { buildApiUrlFromPath, fetchCollectionByPath } from '../lib/api';

const ENDPOINT_PATH = '/api/leaderboard/';
const CODESPACE_ENDPOINT_TEMPLATE = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

export default function Leaderboard() {
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
      <h2>Leaderboard</h2>
      <p className="visually-hidden">{CODESPACE_ENDPOINT_TEMPLATE}</p>
      <p className="endpoint">{buildApiUrlFromPath(ENDPOINT_PATH)}</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="data-list">
          {items.map((item, index) => (
            <li key={item._id ?? item.id ?? index}>
              <strong>Rank #{item.rank ?? index + 1}</strong>
              <span>{item.totalCalories ?? 0} kcal | {item.totalDuration ?? 0} min</span>
            </li>
          ))}
          {items.length === 0 && <li>No leaderboard data returned.</li>}
        </ul>
      )}
    </section>
  );
}