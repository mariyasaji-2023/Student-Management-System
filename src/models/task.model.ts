import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  dueDate: Date,
  status: {
    type: String,
    enum: ["pending", "completed", "overdue"],
    default: "pending"
  }
});

export default mongoose.model("Task", taskSchema);
