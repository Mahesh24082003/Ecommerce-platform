import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isCustomer } from '../middleware/role.middleware.js';

import {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/', verifyToken, isCustomer, addToCart);
router.get('/', verifyToken, isCustomer, getCart);
router.put('/:id', verifyToken, isCustomer, updateCart);
router.delete('/:id', verifyToken, isCustomer, removeFromCart);

export default router;
