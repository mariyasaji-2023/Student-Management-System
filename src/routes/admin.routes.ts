import { Router } from "express";
import { adminLogin, addStudent, assignTask } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";

const router = Router();

router.post("/login", adminLogin);
router.post("/students", authMiddleware, checkRole("admin"), addStudent);
router.post("/tasks", authMiddleware, checkRole("admin"), assignTask);

export default router;
