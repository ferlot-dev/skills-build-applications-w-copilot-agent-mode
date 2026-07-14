import mongoose, { Schema, model, models } from 'mongoose';

export interface IWorkout {
  user: mongoose.Types.ObjectId;
  title: string;
  focus: string;
  intensity: 'low' | 'medium' | 'high';
  durationMinutes: number;
  scheduledFor: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    scheduledFor: { type: Date, required: true },
  },
  { timestamps: true },
);

const Workout = models.Workout || model<IWorkout>('Workout', workoutSchema);
export default Workout;
