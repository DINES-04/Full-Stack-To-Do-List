const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB on Compassionate Care'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Todo Schema
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completedOn: { type: String, default: null }
});

const Todo = mongoose.model('Todo', todoSchema);

// Create a Nodemailer transporter (using Gmail in this case)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send an email notification
function sendEmail(subject, text, toEmail) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Routes

// GET all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// GET completed todos
app.get('/todos/completed', async (req, res) => {
  const completedTodos = await Todo.find({ completedOn: { $ne: null } });
  res.json(completedTodos);
});

// POST a new todo
app.post('/todos', async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    description: req.body.description
  });

  await newTodo.save();

  // Send an email notification to the email provided in the request body
  const userEmail = req.body.email; // Get the email from the request body
  if (userEmail) {
    sendEmail(
      'New Todo Created', 
      `A new Todo titled "${newTodo.title}" has been added.`, 
      userEmail  // Send the email to the user's provided email address
    );
  }

  res.json(newTodo);
});

// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

// PATCH to complete a todo
app.patch('/todos/complete/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completedOn: new Date().toISOString() }, { new: true });
  res.json(updatedTodo);
});



// PUT update a todo
app.put('/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
