import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin, isCustomer } from '../middleware/role.middleware.js';

import {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} from '../controllers/order.controller.js';

const router = express.Router();

/* customer */
router.post('/', verifyToken, isCustomer, placeOrder);
router.get('/my', verifyToken, isCustomer, getMyOrders);

/* admin */
router.get('/', verifyToken, isAdmin, getAllOrders);
router.put('/:id', verifyToken, isAdmin, updateOrderStatus);

export default router;
