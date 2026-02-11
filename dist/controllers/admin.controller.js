"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTask = exports.addStudent = exports.adminLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const jwt_1 = require("../utils/jwt");
const adminLogin = async (req, res) => {
    const admin = await admin_model_1.default.findOne({ email: req.body.email });
    if (!admin)
        return res.status(404).json({ message: "Admin not found" });
    const isMatch = await bcryptjs_1.default.compare(req.body.password, admin.password);
    if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
    const token = (0, jwt_1.generateToken)({ id: admin._id, role: "admin" });
    res.json({ token });
};
exports.adminLogin = adminLogin;
const addStudent = async (req, res) => {
    const hashed = await bcryptjs_1.default.hash(req.body.password, 10);
    const student = await student_model_1.default.create({ ...req.body, password: hashed });
    res.json(student);
};
exports.addStudent = addStudent;
const assignTask = async (req, res) => {
    const task = await task_model_1.default.create(req.body);
    res.json(task);
};
exports.assignTask = assignTask;
