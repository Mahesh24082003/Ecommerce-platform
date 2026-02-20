import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isCustomer } from '../middleware/role.middleware.js';
import {
    addToWishlist,
    getWishlist,
    moveWishlistItemToCart,
    removeWishlistItem
} from '../controllers/wishlist.controller.js';

const router = express.Router();

router.get('/', verifyToken, isCustomer, getWishlist);
router.post('/', verifyToken, isCustomer, addToWishlist);
router.delete('/:id', verifyToken, isCustomer, removeWishlistItem);
router.post('/:id/move-to-cart', verifyToken, isCustomer, moveWishlistItemToCart);

export default router;
