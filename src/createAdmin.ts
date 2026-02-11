import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import Admin from "./models/admin.model";
import connectDB from "./config/db";

const run = async () => {
  await connectDB();

  const hash = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hash,
    role: "admin"
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

run();
