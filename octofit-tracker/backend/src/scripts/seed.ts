import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Trailblazers', mascot: 'Comet', city: 'Portland', memberCount: 24 },
      { name: 'Code Crushers', mascot: 'Circuit', city: 'Seattle', memberCount: 18 },
      { name: 'Cardio Kings', mascot: 'Pulse', city: 'Austin', memberCount: 21 },
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-runner',
        displayName: 'Maya Rodriguez',
        email: 'maya.rodriguez@example.com',
        teamName: 'Trailblazers',
        fitnessGoal: 'Run a half marathon',
        joinedAt: new Date('2026-06-12'),
      },
      {
        username: 'liam-lifts',
        displayName: 'Liam Chen',
        email: 'liam.chen@example.com',
        teamName: 'Code Crushers',
        fitnessGoal: 'Build functional strength',
        joinedAt: new Date('2026-07-03'),
      },
      {
        username: 'ava-cardio',
        displayName: 'Ava Patel',
        email: 'ava.patel@example.com',
        teamName: 'Cardio Kings',
        fitnessGoal: 'Improve endurance',
        joinedAt: new Date('2026-05-21'),
      },
    ]);

    await Activity.insertMany([
      {
        username: 'maya-runner',
        activityType: 'Outdoor Run',
        durationMinutes: 52,
        caloriesBurned: 540,
        activityDate: new Date('2026-09-06T07:30:00Z'),
      },
      {
        username: 'liam-lifts',
        activityType: 'Strength Training',
        durationMinutes: 45,
        caloriesBurned: 380,
        activityDate: new Date('2026-09-06T18:00:00Z'),
      },
      {
        username: 'ava-cardio',
        activityType: 'Cycling',
        durationMinutes: 61,
        caloriesBurned: 610,
        activityDate: new Date('2026-09-07T12:15:00Z'),
      },
      {
        username: 'maya-runner',
        activityType: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 160,
        activityDate: new Date('2026-09-07T19:45:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { username: 'ava-cardio', teamName: 'Cardio Kings', points: 1420, rank: 1, weeklyMinutes: 214 },
      { username: 'maya-runner', teamName: 'Trailblazers', points: 1310, rank: 2, weeklyMinutes: 196 },
      { username: 'liam-lifts', teamName: 'Code Crushers', points: 1185, rank: 3, weeklyMinutes: 172 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        category: 'Flexibility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        focusAreas: ['hips', 'hamstrings', 'shoulders'],
      },
      {
        title: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        focusAreas: ['endurance', 'pace control', 'breathing'],
      },
      {
        title: 'Full-Body Strength Circuit',
        category: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        focusAreas: ['legs', 'core', 'upper body'],
      },
      {
        title: 'Recovery Ride',
        category: 'Cardio',
        difficulty: 'Beginner',
        durationMinutes: 35,
        focusAreas: ['low-impact endurance', 'recovery'],
      },
    ]);

    console.log(`Database seeding complete: ${users.length} users, ${teams.length} teams`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
