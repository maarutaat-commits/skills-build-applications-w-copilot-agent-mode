import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  totalCalories: number;
  totalDuration: number;
  activityCount: number;
  rank: number;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    totalCalories: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    activityCount: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
