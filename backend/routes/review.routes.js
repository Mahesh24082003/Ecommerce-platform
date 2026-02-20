import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';
import {
    createReview,
    getProductReviews,
    getPendingReviews,
    approveReview,
    updateReview,
    deleteReview
} from '../controllers/review.controller.js';

const router = express.Router();

/* Customer */
router.post('/', verifyToken, createReview);
router.get('/product/:productId', getProductReviews);

/* Admin */
router.get('/admin/pending', verifyToken, isAdmin, getPendingReviews);
router.put('/admin/approve/:id', verifyToken, isAdmin, approveReview);
router.put('/admin/:id', verifyToken, isAdmin, updateReview);
router.delete('/admin/:id', verifyToken, isAdmin, deleteReview);

export default router;
