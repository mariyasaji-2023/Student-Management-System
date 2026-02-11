import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model";
import Student from "../models/student.model";
import Task from "../models/task.model";
import { generateToken } from "../utils/jwt";

export const adminLogin = async (req: Request, res: Response) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(req.body.password, admin.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken({ id: admin._id, role: "admin" });
  res.json({ token });
};

export const addStudent = async (req: Request, res: Response) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const student = await Student.create({ ...req.body, password: hashed });
  res.json(student);
};

export const assignTask = async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.json(task);
};
