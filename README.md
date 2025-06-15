# Full-Stack To-Do List Application

A MERN-based To-Do List app built with React (Vite) on the frontend and Express.js with MongoDB on the backend. It includes task creation, completion tracking, editing, deletion, and email notification using Nodemailer.

## Project Structure

basic1/

├── back-end/ # Express.js + MongoDB backend

│ ├── .env # Environment variables

│ ├── server.js # Main server file

│ ├── package.json # Backend dependencies

├── front-end/ # React (Vite) frontend

│ ├── src/ # React components and assets

│ ├── index.html

│ ├── vite.config.js

│ ├── package.json # Frontend dependencies

## Features

- Add, update, and delete to-do tasks
- Mark tasks as complete
- Search functionality
- Persistent storage with MongoDB
- Email notification on task creation using Nodemailer

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/todo-fullstack-app.git
cd todo-fullstack-app
```
### 2. Backend Setup (back-end)
```bash
cd back-end
npm install
```
Create .env file:
```bash
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
PORT=5000
```
Start Backend
```bash
node server.js
```
### 3. Frontend Setup (front-end)
```bash
cd front-end
npm install
npm run dev
```
## Tech Stack

- Frontend: React (Vite), CSS

- Backend: Node.js, Express.js

- Database: MongoDB (Mongoose)

- Email: Nodemailer (Gmail SMTP)
