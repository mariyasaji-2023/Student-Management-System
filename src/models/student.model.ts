import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  department: String,
  password: String
});

export default mongoose.model("Student", studentSchema);
