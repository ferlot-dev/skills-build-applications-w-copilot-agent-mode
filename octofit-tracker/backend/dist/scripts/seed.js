"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
        ]);
        const teams = await Team_1.default.insertMany([
            { name: 'Cardio Crushers', description: 'Endurance-focused runners and cyclists', score: 1480 },
            { name: 'Iron Squad', description: 'Strength-first lifters and functional athletes', score: 1625 },
        ]);
        const users = await User_1.default.insertMany([
            {
                username: 'alexfit',
                email: 'alexfit@example.com',
                fullName: 'Alex Rivera',
                age: 29,
                fitnessLevel: 'advanced',
                team: teams[1]._id,
            },
            {
                username: 'samrunner',
                email: 'samrunner@example.com',
                fullName: 'Samantha Lee',
                age: 26,
                fitnessLevel: 'intermediate',
                team: teams[0]._id,
            },
            {
                username: 'jordanmove',
                email: 'jordanmove@example.com',
                fullName: 'Jordan Kim',
                age: 34,
                fitnessLevel: 'intermediate',
                team: teams[0]._id,
            },
            {
                username: 'taylorlift',
                email: 'taylorlift@example.com',
                fullName: 'Taylor Brooks',
                age: 31,
                fitnessLevel: 'advanced',
                team: teams[1]._id,
            },
        ]);
        await Team_1.default.findByIdAndUpdate(teams[0]._id, { members: [users[1]._id, users[2]._id] });
        await Team_1.default.findByIdAndUpdate(teams[1]._id, { members: [users[0]._id, users[3]._id] });
        await Activity_1.default.insertMany([
            {
                user: users[0]._id,
                type: 'HIIT Circuit',
                durationMinutes: 42,
                caloriesBurned: 560,
                performedAt: new Date('2026-07-10T07:30:00Z'),
            },
            {
                user: users[1]._id,
                type: '5K Run',
                durationMinutes: 31,
                caloriesBurned: 390,
                performedAt: new Date('2026-07-11T06:10:00Z'),
            },
            {
                user: users[2]._id,
                type: 'Indoor Cycling',
                durationMinutes: 50,
                caloriesBurned: 620,
                performedAt: new Date('2026-07-12T18:00:00Z'),
            },
            {
                user: users[3]._id,
                type: 'Strength Session',
                durationMinutes: 55,
                caloriesBurned: 510,
                performedAt: new Date('2026-07-13T17:20:00Z'),
            },
        ]);
        await Leaderboard_1.default.insertMany([
            { user: users[3]._id, points: 1240, weeklyMinutes: 285, rank: 1 },
            { user: users[0]._id, points: 1185, weeklyMinutes: 260, rank: 2 },
            { user: users[2]._id, points: 990, weeklyMinutes: 230, rank: 3 },
            { user: users[1]._id, points: 915, weeklyMinutes: 210, rank: 4 },
        ]);
        await Workout_1.default.insertMany([
            {
                user: users[0]._id,
                title: 'Power Intervals',
                focus: 'Cardio + Core',
                intensity: 'high',
                durationMinutes: 45,
                scheduledFor: new Date('2026-07-15T07:00:00Z'),
            },
            {
                user: users[1]._id,
                title: 'Tempo Run',
                focus: 'Endurance',
                intensity: 'medium',
                durationMinutes: 40,
                scheduledFor: new Date('2026-07-15T06:30:00Z'),
            },
            {
                user: users[2]._id,
                title: 'Leg Day Builder',
                focus: 'Strength',
                intensity: 'high',
                durationMinutes: 60,
                scheduledFor: new Date('2026-07-16T18:30:00Z'),
            },
            {
                user: users[3]._id,
                title: 'Mobility Reset',
                focus: 'Recovery',
                intensity: 'low',
                durationMinutes: 30,
                scheduledFor: new Date('2026-07-16T07:15:00Z'),
            },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log(`Seeded users: ${await User_1.default.countDocuments()}`);
        console.log(`Seeded teams: ${await Team_1.default.countDocuments()}`);
        console.log(`Seeded activities: ${await Activity_1.default.countDocuments()}`);
        console.log(`Seeded leaderboard entries: ${await Leaderboard_1.default.countDocuments()}`);
        console.log(`Seeded workouts: ${await Workout_1.default.countDocuments()}`);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
