import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
    forgotPassword,
    resetPassword,
    changePassword
} from '../controllers/password.controller.js';

const router = express.Router();

// Public routes
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

// Protected route
router.put('/change', verifyToken, changePassword);

export default router;
