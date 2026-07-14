"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    scheduledFor: { type: Date, required: true },
}, { timestamps: true });
const Workout = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
