"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: String,
    studentId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Student" },
    dueDate: Date,
    status: {
        type: String,
        enum: ["pending", "completed", "overdue"],
        default: "pending"
    }
});
exports.default = mongoose_1.default.model("Task", taskSchema);
