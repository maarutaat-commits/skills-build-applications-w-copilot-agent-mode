"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiUrl = exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
exports.app = app;
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'githubpreview.dev'}`;
    }
    return process.env.API_URL ?? 'http://localhost:8000';
};
exports.getApiUrl = getApiUrl;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
}));
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({
        apiPort: 8000,
        apiUrl: getApiUrl(),
        mongoPort: 27017,
        status: 'ok',
    });
});
// Users endpoints
app.get('/api/users/', async (_request, response) => {
    const items = await User_1.User.find().select('-password');
    response.json(items);
});
app.post('/api/users/', async (request, response) => {
    const user = await User_1.User.create(request.body);
    const { password: _pw, ...safe } = user.toObject();
    response.status(201).json(safe);
});
app.get('/api/users/:id', async (request, response) => {
    const user = await User_1.User.findById(request.params.id).select('-password');
    if (!user) {
        response.status(404).json({ error: 'User not found' });
        return;
    }
    response.json(user);
});
app.put('/api/users/:id', async (request, response) => {
    const user = await User_1.User.findByIdAndUpdate(request.params.id, request.body, { new: true }).select('-password');
    if (!user) {
        response.status(404).json({ error: 'User not found' });
        return;
    }
    response.json(user);
});
app.delete('/api/users/:id', async (request, response) => {
    await User_1.User.findByIdAndDelete(request.params.id);
    response.status(204).send();
});
// Teams endpoints
app.get('/api/teams/', async (_request, response) => {
    const items = await Team_1.Team.find().populate('members', '-password');
    response.json(items);
});
app.post('/api/teams/', async (request, response) => {
    const team = await Team_1.Team.create(request.body);
    response.status(201).json(team);
});
app.get('/api/teams/:id', async (request, response) => {
    const team = await Team_1.Team.findById(request.params.id).populate('members', '-password');
    if (!team) {
        response.status(404).json({ error: 'Team not found' });
        return;
    }
    response.json(team);
});
app.put('/api/teams/:id', async (request, response) => {
    const team = await Team_1.Team.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!team) {
        response.status(404).json({ error: 'Team not found' });
        return;
    }
    response.json(team);
});
app.delete('/api/teams/:id', async (request, response) => {
    await Team_1.Team.findByIdAndDelete(request.params.id);
    response.status(204).send();
});
// Activities endpoints
app.get('/api/activities/', async (_request, response) => {
    const items = await Activity_1.Activity.find().populate('user', '-password').sort({ date: -1 });
    response.json(items);
});
app.post('/api/activities/', async (request, response) => {
    const activity = await Activity_1.Activity.create(request.body);
    response.status(201).json(activity);
});
app.get('/api/activities/:id', async (request, response) => {
    const activity = await Activity_1.Activity.findById(request.params.id).populate('user', '-password');
    if (!activity) {
        response.status(404).json({ error: 'Activity not found' });
        return;
    }
    response.json(activity);
});
app.put('/api/activities/:id', async (request, response) => {
    const activity = await Activity_1.Activity.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!activity) {
        response.status(404).json({ error: 'Activity not found' });
        return;
    }
    response.json(activity);
});
app.delete('/api/activities/:id', async (request, response) => {
    await Activity_1.Activity.findByIdAndDelete(request.params.id);
    response.status(204).send();
});
// Leaderboard endpoints
app.get('/api/leaderboard/', async (_request, response) => {
    const items = await Leaderboard_1.Leaderboard.find().populate('user', '-password').sort({ rank: 1 });
    response.json(items);
});
// Workouts endpoints
app.get('/api/workouts/', async (_request, response) => {
    const items = await Workout_1.Workout.find();
    response.json(items);
});
app.post('/api/workouts/', async (request, response) => {
    const workout = await Workout_1.Workout.create(request.body);
    response.status(201).json(workout);
});
app.get('/api/workouts/:id', async (request, response) => {
    const workout = await Workout_1.Workout.findById(request.params.id);
    if (!workout) {
        response.status(404).json({ error: 'Workout not found' });
        return;
    }
    response.json(workout);
});
app.put('/api/workouts/:id', async (request, response) => {
    const workout = await Workout_1.Workout.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!workout) {
        response.status(404).json({ error: 'Workout not found' });
        return;
    }
    response.json(workout);
});
app.delete('/api/workouts/:id', async (request, response) => {
    await Workout_1.Workout.findByIdAndDelete(request.params.id);
    response.status(204).send();
});
