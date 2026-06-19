import dotenv from 'dotenv';

import { app, getApiUrl } from './app';
import { connectDatabase, mongoUri } from './config/database';

dotenv.config();

const port = Number(process.env.PORT ?? 8000);

async function startServer() {
  try {
    await connectDatabase();
    console.log(`? Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.warn('? MongoDB connection failed. Continuing with API scaffold only.');
    console.warn(error);
  }

  app.listen(port, '0.0.0.0', () => {
    const apiUrl = getApiUrl();
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
