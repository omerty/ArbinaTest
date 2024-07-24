import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';
import { promises as fs } from 'fs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import User from './models/User.js';

const app = express();
const router = express.Router();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
const uri = "mongodb+srv://omer:slbEJzELbfn59y0y@cluster0.iwxlpkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB client
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("HERE1");
    const user = await User.findOne({ username });
    console.log("HERE1");
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });
    console.log("HERE1");
    console.log(user);
    console.log(password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      console.log("HERE1");
      return res.status(400).json({ message: 'Invalid username or password' });
    } else {
      console.log("HERE2");
      res.status(200).json({
        message: 'Login successful!',
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
      console.log("HERE1");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    const user = new User({ username, password, email, firstName, lastName });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
