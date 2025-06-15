# Backend - To-Do List App (Express.js + MongoDB)

This is the backend API for the To-Do List app, built using **Express.js**, **MongoDB**, and **Nodemailer**. It provides RESTful endpoints for managing tasks and sending email notifications.

## Features

- Create, read, update, and delete tasks (CRUD)
- Mark tasks as completed
- Send email notification on new task creation
- Store data in MongoDB
- CORS enabled for frontend communication

## Folder Structure

back-end/

├── .env

├── server.js

├── package.json


## Setup Instructions

### 1. Navigate to Backend
```bash
cd back-end
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
Create a .env file in the root:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```
### 4. Start Server
```bash
node server.js
```
The backend runs on http://localhost:5000.

## API Endpoints

- GET /todos – Fetch all todos
- GET /todos/completed – Fetch completed todos
- POST /todos – Add new todo (triggers email)
- PATCH /todos/complete/:id – Mark todo as complete
- PUT /todos/:id – Edit a todo
- DELETE /todos/:id – Delete a todo
