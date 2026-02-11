"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_model_1 = __importDefault(require("./models/admin.model"));
const db_1 = __importDefault(require("./config/db"));
const run = async () => {
    await (0, db_1.default)();
    const hash = await bcryptjs_1.default.hash("admin123", 10);
    await admin_model_1.default.create({
        email: "admin@gmail.com",
        password: hash,
        role: "admin"
    });
    console.log("✅ Admin created successfully");
    process.exit();
};
run();
