import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: string[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    exercises: [{ type: String }],
    duration: { type: Number, required: true, min: 0 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { timestamps: true },
);

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
