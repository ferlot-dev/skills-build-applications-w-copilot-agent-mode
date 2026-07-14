import mongoose, { Schema, model, models } from 'mongoose';

export interface ILeaderboard {
  user: mongoose.Types.ObjectId;
  points: number;
  weeklyMinutes: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

const Leaderboard = models.Leaderboard || model<ILeaderboard>('Leaderboard', leaderboardSchema);
export default Leaderboard;
