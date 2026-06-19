import cors from 'cors';
import express from 'express';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  }),
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    apiPort: 8000,
    mongoPort: 27017,
    status: 'ok',
  });
});

app.get('/api/users', (_request, response) => {
  response.json({ items: [], resource: 'users' });
});

app.get('/api/teams', (_request, response) => {
  response.json({ items: [], resource: 'teams' });
});

app.get('/api/activities', (_request, response) => {
  response.json({ items: [], resource: 'activities' });
});

app.get('/api/leaderboard', (_request, response) => {
  response.json({ items: [], resource: 'leaderboard' });
});

app.get('/api/workouts', (_request, response) => {
  response.json({ items: [], resource: 'workouts' });
});

export default app;
