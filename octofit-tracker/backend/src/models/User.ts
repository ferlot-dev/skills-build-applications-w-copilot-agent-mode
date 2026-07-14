import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  fullName: string;
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  team?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>('User', userSchema);
export default User;
