import { Router } from "express";
import { studentLogin, getMyTasks, updateTaskStatus } from "../controllers/student.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";

const router = Router();

router.post("/login", studentLogin);
router.get("/tasks", authMiddleware, checkRole("student"), getMyTasks);
router.patch("/tasks/:id", authMiddleware, checkRole("student"), updateTaskStatus);

export default router;
