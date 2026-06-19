import cors from 'cors';
import express, { Request, Response } from 'express';

import { isDatabaseConnected } from './config/database';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

const app = express();

const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return process.env.API_URL ?? 'http://localhost:8000';
};

function ensureDatabase(response: Response): boolean {
  if (isDatabaseConnected()) {
    return true;
  }

  response.status(503).json({
    error: 'Database unavailable',
    message: 'MongoDB is not connected on port 27017.',
  });
  return false;
}

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
app.get('/api/users/', async (_request: Request, response: Response) => {
  if (!ensureDatabase(response)) {
    return;
  }
  const items = await User.find().select('-password');
  response.json(items);
});

app.post('/api/users/', async (request: Request, response: Response) => {
  const user = await User.create(request.body);
  const { password: _pw, ...safe } = user.toObject();
  response.status(201).json(safe);
});

app.get('/api/users/:id', async (request: Request, response: Response) => {
  const user = await User.findById(request.params.id).select('-password');
  if (!user) { response.status(404).json({ error: 'User not found' }); return; }
  response.json(user);
});

app.put('/api/users/:id', async (request: Request, response: Response) => {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true }).select('-password');
  if (!user) { response.status(404).json({ error: 'User not found' }); return; }
  response.json(user);
});

app.delete('/api/users/:id', async (request: Request, response: Response) => {
  await User.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

// Teams endpoints
app.get('/api/teams/', async (_request: Request, response: Response) => {
  const items = await Team.find().populate('members', '-password');
  response.json(items);
});

app.post('/api/teams/', async (request: Request, response: Response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
});

app.get('/api/teams/:id', async (request: Request, response: Response) => {
  const team = await Team.findById(request.params.id).populate('members', '-password');
  if (!team) { response.status(404).json({ error: 'Team not found' }); return; }
  response.json(team);
});

app.put('/api/teams/:id', async (request: Request, response: Response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!team) { response.status(404).json({ error: 'Team not found' }); return; }
  response.json(team);
});

app.delete('/api/teams/:id', async (request: Request, response: Response) => {
  await Team.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

// Activities endpoints
app.get('/api/activities/', async (_request: Request, response: Response) => {
  if (!ensureDatabase(response)) {
    return;
  }
  const items = await Activity.find().populate('user', '-password').sort({ date: -1 });
  response.json(items);
});

app.post('/api/activities/', async (request: Request, response: Response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
});

app.get('/api/activities/:id', async (request: Request, response: Response) => {
  const activity = await Activity.findById(request.params.id).populate('user', '-password');
  if (!activity) { response.status(404).json({ error: 'Activity not found' }); return; }
  response.json(activity);
});

app.put('/api/activities/:id', async (request: Request, response: Response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!activity) { response.status(404).json({ error: 'Activity not found' }); return; }
  response.json(activity);
});

app.delete('/api/activities/:id', async (request: Request, response: Response) => {
  await Activity.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

// Leaderboard endpoints
app.get('/api/leaderboard/', async (_request: Request, response: Response) => {
  const items = await Leaderboard.find().populate('user', '-password').sort({ rank: 1 });
  response.json(items);
});

// Workouts endpoints
app.get('/api/workouts/', async (_request: Request, response: Response) => {
  const items = await Workout.find();
  response.json(items);
});

app.post('/api/workouts/', async (request: Request, response: Response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
});

app.get('/api/workouts/:id', async (request: Request, response: Response) => {
  const workout = await Workout.findById(request.params.id);
  if (!workout) { response.status(404).json({ error: 'Workout not found' }); return; }
  response.json(workout);
});

app.put('/api/workouts/:id', async (request: Request, response: Response) => {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!workout) { response.status(404).json({ error: 'Workout not found' }); return; }
  response.json(workout);
});

app.delete('/api/workouts/:id', async (request: Request, response: Response) => {
  await Workout.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

export { app, getApiUrl };
