import mongoose, { Schema, model, models } from 'mongoose';

export interface IActivity {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const Activity = models.Activity || model<IActivity>('Activity', activitySchema);
export default Activity;
