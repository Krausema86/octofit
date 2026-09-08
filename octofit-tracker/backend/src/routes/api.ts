import { Router } from 'express';
import mongoose from 'mongoose';
import { apiBaseUrl } from '../config/apiUrl.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const router = Router();

router.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting',
  });
});

router.get('/users/', async (_request, response) => {
  const users = await User.find().sort({ displayName: 1 }).lean();
  response.json(users);
});

router.get('/teams/', async (_request, response) => {
  const teams = await Team.find().sort({ name: 1 }).lean();
  response.json(teams);
});

router.get('/activities/', async (_request, response) => {
  const activities = await Activity.find().sort({ activityDate: -1 }).lean();
  response.json(activities);
});

router.get('/leaderboard/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
  response.json(leaderboard);
});

router.get('/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ category: 1, title: 1 }).lean();
  response.json(workouts);
});

export default router;