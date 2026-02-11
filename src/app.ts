import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes";
import studentRoutes from "./routes/student.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

export default app;
