import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();

const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'githubpreview.dev'}`;
  }
  return process.env.API_URL ?? 'http://localhost:8000';
};

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  }),
);
app.use(express.json());

app.get('/api/health', (_request: Request, response: Response) => {
  response.json({
    apiPort: 8000,
    apiUrl: getApiUrl(),
    mongoPort: 27017,
    status: 'ok',
  });
});

// Users endpoints
app.get('/api/users/', (_request: Request, response: Response) => {
  response.json({ items: [], resource: 'users' });
});

app.post('/api/users/', (request: Request, response: Response) => {
  response.status(201).json({ id: 1, ...(request.body || {}), resource: 'users' });
});

app.get('/api/users/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, resource: 'users' });
});

app.put('/api/users/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, ...request.body, resource: 'users' });
});

app.delete('/api/users/:id', (request: Request, response: Response) => {
  response.status(204).send();
});

// Teams endpoints
app.get('/api/teams/', (_request: Request, response: Response) => {
  response.json({ items: [], resource: 'teams' });
});

app.post('/api/teams/', (request: Request, response: Response) => {
  response.status(201).json({ id: 1, ...(request.body || {}), resource: 'teams' });
});

app.get('/api/teams/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, resource: 'teams' });
});

app.put('/api/teams/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, ...request.body, resource: 'teams' });
});

app.delete('/api/teams/:id', (request: Request, response: Response) => {
  response.status(204).send();
});

// Activities endpoints
app.get('/api/activities/', (_request: Request, response: Response) => {
  response.json({ items: [], resource: 'activities' });
});

app.post('/api/activities/', (request: Request, response: Response) => {
  response.status(201).json({ id: 1, ...(request.body || {}), resource: 'activities' });
});

app.get('/api/activities/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, resource: 'activities' });
});

app.put('/api/activities/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, ...request.body, resource: 'activities' });
});

app.delete('/api/activities/:id', (request: Request, response: Response) => {
  response.status(204).send();
});

// Leaderboard endpoints
app.get('/api/leaderboard/', (_request: Request, response: Response) => {
  response.json({ items: [], resource: 'leaderboard' });
});

// Workouts endpoints
app.get('/api/workouts/', (_request: Request, response: Response) => {
  response.json({ items: [], resource: 'workouts' });
});

app.post('/api/workouts/', (request: Request, response: Response) => {
  response.status(201).json({ id: 1, ...(request.body || {}), resource: 'workouts' });
});

app.get('/api/workouts/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, resource: 'workouts' });
});

app.put('/api/workouts/:id', (request: Request, response: Response) => {
  response.json({ id: request.params.id, ...request.body, resource: 'workouts' });
});

app.delete('/api/workouts/:id', (request: Request, response: Response) => {
  response.status(204).send();
});

export { app, getApiUrl };
