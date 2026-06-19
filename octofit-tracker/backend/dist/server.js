"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const database_1 = require("./config/database");
dotenv_1.default.config();
const port = Number(process.env.PORT ?? 8000);
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`? Connected to MongoDB at ${database_1.mongoUri}`);
    }
    catch (error) {
        console.warn('? MongoDB connection failed. Continuing with API scaffold only.');
        console.warn(error);
    }
    app_1.app.listen(port, '0.0.0.0', () => {
        const apiUrl = (0, app_1.getApiUrl)();
        console.log('');
        console.log('-----------------------------------------------------------');
        console.log('OctoFit Tracker API');
        console.log('-----------------------------------------------------------');
        console.log(`? Server listening on ${apiUrl}`);
        console.log(`? Health check: ${apiUrl}/api/health`);
        console.log('-------------------------------------------------------------');
        console.log('Available endpoints:');
        console.log(`  GET/POST   /api/users/`);
        console.log(`  GET/POST   /api/teams/`);
        console.log(`  GET/POST   /api/activities/`);
        console.log(`  GET        /api/leaderboard/`);
        console.log(`  GET/POST   /api/workouts/`);
        console.log('-----------------------------------------------------------');
        console.log('');
    });
}
void startServer();
