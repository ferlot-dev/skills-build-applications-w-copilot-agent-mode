import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './config/database';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Workout from './models/Workout';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', port, apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const items = await User.find().populate('team', 'name').lean();
  res.json({ resource: 'users', count: items.length, items });
});

app.get('/api/teams/', async (_req, res) => {
  const items = await Team.find().populate('members', 'username fullName').lean();
  res.json({ resource: 'teams', count: items.length, items });
});

app.get('/api/activities/', async (_req, res) => {
  const items = await Activity.find()
    .populate('user', 'username fullName')
    .sort({ performedAt: -1 })
    .lean();
  res.json({ resource: 'activities', count: items.length, items });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const items = await Leaderboard.find()
    .populate('user', 'username fullName')
    .sort({ rank: 1 })
    .lean();
  res.json({ resource: 'leaderboard', count: items.length, items });
});

app.get('/api/workouts/', async (_req, res) => {
  const items = await Workout.find()
    .populate('user', 'username fullName')
    .sort({ scheduledFor: 1 })
    .lean();
  res.json({ resource: 'workouts', count: items.length, items });
});

app.get('/api/config/', (_req, res) => {
  res.json({ apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
