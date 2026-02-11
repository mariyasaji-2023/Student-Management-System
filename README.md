Student Management System API
------------------------------

A RESTful API built using Node.js, Express, TypeScript, MongoDB Atlas, and JWT Authentication.

Features
--------
- Admin Panel APIs
- Student Interface APIs
- Task Assignment & Management
- JWT Authentication (No sessions or cookies)
- JSON Request & Response only

Tech Stack
----------
Node.js, Express.js, TypeScript, MongoDB Atlas, Mongoose, JWT, bcryptjs

Base API URL
------------
http://localhost:5000/api

Authentication
--------------
Authorization: Bearer <TOKEN>

Environment Variables
---------------------
Create a .env file in the project root:

PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=supersecretkey

API Endpoints
-------------

Admin Login
POST /api/admin/login

Request:
{
  "email": "admin@gmail.com",
  "password": "admin123"
}

Response:
{
  "token": "jwt_token_here"
}

Add Student (Admin Only)
POST /api/admin/students

Assign Task (Admin Only)
POST /api/admin/tasks

Student Login
POST /api/student/login

Get Student Tasks
GET /api/student/tasks

Update Task Status
PATCH /api/student/tasks/:id

Role Access
-----------
Admin:
- Add Students
- Assign Tasks

Student:
- View Tasks
- Update Task Status

Run Locally
-----------
npm install
npx ts-node-dev src/server.ts

Notes
-----
- No HTML is used.
- Authentication uses JWT only.
- MongoDB Atlas is used as database.
- Request and Response format is JSON.
