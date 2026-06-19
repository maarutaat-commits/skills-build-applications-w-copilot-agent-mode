import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';

dotenv.config();

const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing with API scaffold only.');
    console.warn(error);
  }

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
  });
}

void startServer();
