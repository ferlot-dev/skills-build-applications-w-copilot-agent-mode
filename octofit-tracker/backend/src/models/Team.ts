import mongoose, { Schema, model, models } from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  score: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Team = models.Team || model<ITeam>('Team', teamSchema);
export default Team;
