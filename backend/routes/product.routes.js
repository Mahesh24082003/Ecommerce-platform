import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

const router = express.Router();

/* Customer */
router.get('/', getAllProducts);
router.get('/:id', getProductById);

/* Admin */
router.post('/', verifyToken, isAdmin, createProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
