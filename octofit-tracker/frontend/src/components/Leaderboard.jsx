import { useEffect, useState } from 'react';

import { buildApiUrl, fetchCollection } from '../lib/api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchCollection('leaderboard')
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
      <p className="endpoint">{buildApiUrl('leaderboard')}</p>
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