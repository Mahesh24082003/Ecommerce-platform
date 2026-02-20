import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin, isCustomer } from '../middleware/role.middleware.js';

import {
    placeOrder,
    getMyOrders,
    getMyOrderById,
    getAllOrders,
    updateOrderStatus,
    cancelMyOrder,
    adminCancelOrder,
    processRefund,
    updateTrackingInfo
} from '../controllers/order.controller.js';

const router = express.Router();

/* customer */
router.post('/', verifyToken, isCustomer, placeOrder);
router.get('/my', verifyToken, isCustomer, getMyOrders);
router.get('/my/:id', verifyToken, isCustomer, getMyOrderById);
router.put('/:id/cancel', verifyToken, isCustomer, cancelMyOrder);

/* admin */
router.get('/', verifyToken, isAdmin, getAllOrders);
router.put('/:id', verifyToken, isAdmin, updateOrderStatus);
router.put('/:id/admin-cancel', verifyToken, isAdmin, adminCancelOrder);
router.put('/:id/refund', verifyToken, isAdmin, processRefund);
router.put('/:id/tracking', verifyToken, isAdmin, updateTrackingInfo);

export default router;
