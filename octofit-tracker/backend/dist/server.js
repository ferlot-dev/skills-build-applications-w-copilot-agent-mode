"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', port, apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const items = await User_1.default.find().populate('team', 'name').lean();
    res.json({ resource: 'users', count: items.length, items });
});
app.get('/api/teams/', async (_req, res) => {
    const items = await Team_1.default.find().populate('members', 'username fullName').lean();
    res.json({ resource: 'teams', count: items.length, items });
});
app.get('/api/activities/', async (_req, res) => {
    const items = await Activity_1.default.find()
        .populate('user', 'username fullName')
        .sort({ performedAt: -1 })
        .lean();
    res.json({ resource: 'activities', count: items.length, items });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const items = await Leaderboard_1.default.find()
        .populate('user', 'username fullName')
        .sort({ rank: 1 })
        .lean();
    res.json({ resource: 'leaderboard', count: items.length, items });
});
app.get('/api/workouts/', async (_req, res) => {
    const items = await Workout_1.default.find()
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
