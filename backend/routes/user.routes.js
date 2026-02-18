import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getMyProfile, updateMyProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/me', verifyToken, getMyProfile);
router.put('/me', verifyToken, updateMyProfile);

export default router;
