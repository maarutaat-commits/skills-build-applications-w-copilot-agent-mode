"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
}));
app.use(express_1.default.json());
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
exports.default = app;
