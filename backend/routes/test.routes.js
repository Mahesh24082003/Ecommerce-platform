import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin, isCustomer } from '../middleware/role.middleware.js';
import db from '../models/index.js';

const router = express.Router();

router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

router.get('/customer', verifyToken, isCustomer, (req, res) => {
    res.json({ message: 'Welcome Customer' });
});

// Update user role (for testing purposes only)
router.post('/update-role/:userId/:role', async (req, res) => {
    try {
        const { userId, role } = req.params;
        
        if (!['admin', 'customer'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated', user: { id: user.id, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user role', error: err.message });
    }
});

export default router;
