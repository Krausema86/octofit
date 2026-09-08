import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    weeklyMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);