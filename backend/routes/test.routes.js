import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin, isCustomer } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

router.get('/customer', verifyToken, isCustomer, (req, res) => {
    res.json({ message: 'Welcome Customer' });
});

export default router;
