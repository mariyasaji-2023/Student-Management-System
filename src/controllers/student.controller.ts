import { Response } from "express";
import bcrypt from "bcryptjs";
import Student from "../models/student.model";
import Task from "../models/task.model";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth.middleware";

export const studentLogin = async (req: AuthRequest, res: Response) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student)
    return res.status(404).json({ message: "Student not found" });

  const isMatch = await bcrypt.compare(
    req.body.password,
    student.password as string
  );

  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken({ id: student._id, role: "student" });

  res.json({ token });
};

export const getMyTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({ studentId: req.user.id });

  tasks.forEach(task => {
    if (
      task.status === "pending" &&
      task.dueDate &&
      task.dueDate < new Date()
    ) {
      task.status = "overdue";
      task.save();
    }
  });

  res.json(tasks);
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task not found" });

  task.status = "completed";
  await task.save();

  res.json(task);
};
