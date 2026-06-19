/**
 * Seed the octofit_db database with test data
 *
 * Usage: npx ts-node-dev --transpile-only src/scripts/seed.ts
 *        or: npm run seed
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to ${MONGO_URI} ...`);
  await mongoose.connect(MONGO_URI);
  console.log('Connected.');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections.');

  // Users
  const users = await User.insertMany([
    { username: 'thundercat', email: 'thundercat@octofit.dev', password: 'hashed_pw_1' },
    { username: 'monaocto', email: 'monaocto@octofit.dev', password: 'hashed_pw_2' },
    { username: 'codercat', email: 'codercat@octofit.dev', password: 'hashed_pw_3' },
    { username: 'jetpackcat', email: 'jetpackcat@octofit.dev', password: 'hashed_pw_4' },
    { username: 'surftocat', email: 'surftocat@octofit.dev', password: 'hashed_pw_5' },
  ]);
  console.log(`Inserted ${users.length} users.`);

  // Teams
  const teams = await Team.insertMany([
    {
      name: 'OctoRunners',
      description: 'Distance runners pushing boundaries',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'CycleCats',
      description: 'Cycling enthusiasts',
      members: [users[2]._id, users[3]._id],
    },
    {
      name: 'SwimSquad',
      description: 'Open-water swimming team',
      members: [users[4]._id, users[0]._id],
    },
  ]);
  console.log(`Inserted ${teams.length} teams.`);

  // Activities
  const activityDefs = [
    { user: users[0]._id, type: 'Running', duration: 45, calories: 520, date: new Date('2026-06-01') },
    { user: users[1]._id, type: 'Cycling', duration: 60, calories: 480, date: new Date('2026-06-02') },
    { user: users[2]._id, type: 'Swimming', duration: 30, calories: 350, date: new Date('2026-06-03') },
    { user: users[3]._id, type: 'Yoga', duration: 60, calories: 200, date: new Date('2026-06-04') },
    { user: users[4]._id, type: 'Running', duration: 50, calories: 580, date: new Date('2026-06-05') },
    { user: users[0]._id, type: 'Weight Training', duration: 40, calories: 300, date: new Date('2026-06-06') },
    { user: users[1]._id, type: 'Running', duration: 35, calories: 410, date: new Date('2026-06-07') },
  ];
  const activities = await Activity.insertMany(activityDefs);
  console.log(`Inserted ${activities.length} activities.`);

  // Leaderboard
  const leaderboardEntries = [
    { user: users[0]._id, totalCalories: 820, totalDuration: 85, activityCount: 2, rank: 1 },
    { user: users[4]._id, totalCalories: 580, totalDuration: 50, activityCount: 1, rank: 2 },
    { user: users[1]._id, totalCalories: 890, totalDuration: 95, activityCount: 2, rank: 3 },
    { user: users[2]._id, totalCalories: 350, totalDuration: 30, activityCount: 1, rank: 4 },
    { user: users[3]._id, totalCalories: 200, totalDuration: 60, activityCount: 1, rank: 5 },
  ];
  const leaderboard = await Leaderboard.insertMany(leaderboardEntries);
  console.log(`Inserted ${leaderboard.length} leaderboard entries.`);

  // Workouts
  const workouts = await Workout.insertMany([
    {
      name: '5K Morning Run',
      description: 'Steady-state outdoor run',
      exercises: ['Warm-up walk 5 min', 'Run 5K', 'Cool-down stretch 5 min'],
      duration: 35,
      difficulty: 'beginner',
    },
    {
      name: 'Hill Cycling Blast',
      description: 'High-intensity cycling with elevation',
      exercises: ['Flat warm-up 10 min', 'Hill repeats x5', 'Recovery ride 10 min'],
      duration: 60,
      difficulty: 'intermediate',
    },
    {
      name: 'Swim Intervals',
      description: 'Sprint intervals in the pool',
      exercises: ['Freestyle 100m x4', 'Backstroke 50m x4', 'Cool-down 100m'],
      duration: 45,
      difficulty: 'intermediate',
    },
    {
      name: 'Full-Body Strength',
      description: 'Compound lifts for total-body conditioning',
      exercises: ['Squat 4x8', 'Deadlift 3x6', 'Bench press 4x8', 'Pull-ups 3x10'],
      duration: 50,
      difficulty: 'advanced',
    },
    {
      name: 'Yoga Flow',
      description: 'Flexibility and mindfulness session',
      exercises: ['Sun salutation x5', 'Warrior sequence', 'Seated stretches', 'Savasana'],
      duration: 60,
      difficulty: 'beginner',
    },
  ]);
  console.log(`Inserted ${workouts.length} workouts.`);

  console.log('\nSeed complete. octofit_db is ready.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
