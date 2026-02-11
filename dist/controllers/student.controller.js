"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.getMyTasks = exports.studentLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const student_model_1 = __importDefault(require("../models/student.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const jwt_1 = require("../utils/jwt");
const studentLogin = async (req, res) => {
    const student = await student_model_1.default.findOne({ email: req.body.email });
    if (!student)
        return res.status(404).json({ message: "Student not found" });
    const isMatch = await bcryptjs_1.default.compare(req.body.password, student.password);
    if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
    const token = (0, jwt_1.generateToken)({ id: student._id, role: "student" });
    res.json({ token });
};
exports.studentLogin = studentLogin;
const getMyTasks = async (req, res) => {
    const tasks = await task_model_1.default.find({ studentId: req.user.id });
    tasks.forEach(task => {
        if (task.status === "pending" &&
            task.dueDate &&
            task.dueDate < new Date()) {
            task.status = "overdue";
            task.save();
        }
    });
    res.json(tasks);
};
exports.getMyTasks = getMyTasks;
const updateTaskStatus = async (req, res) => {
    const task = await task_model_1.default.findById(req.params.id);
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    task.status = "completed";
    await task.save();
    res.json(task);
};
exports.updateTaskStatus = updateTaskStatus;
