import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login);

export default router;