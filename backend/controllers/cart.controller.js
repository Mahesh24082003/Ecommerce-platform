import db from '../models/index.js';

const Cart = db.Cart;
const Product = db.Product;

/* ADD TO CART */
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const qty = Number(quantity);

        if (!Number.isInteger(qty) || qty < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.stock < 1) {
            return res.status(400).json({ message: 'Product is out of stock' });
        }

        let item = await Cart.findOne({
            where: { userId: req.user.id, productId }
        });

        if (item) {
            const nextQty = item.quantity + qty;
            if (nextQty > product.stock) {
                return res.status(400).json({ message: `Only ${product.stock} item(s) in stock` });
            }
            item.quantity = nextQty;
            await item.save();
        } else {
            if (qty > product.stock) {
                return res.status(400).json({ message: `Only ${product.stock} item(s) in stock` });
            }
            item = await Cart.create({
                userId: req.user.id,
                productId,
                quantity: qty
            });
        }

        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* VIEW CART */
export const getCart = async (req, res) => {
    try {
        const items = await Cart.findAll({
            where: { userId: req.user.id },
            include: Product
        });

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* UPDATE QUANTITY */
export const updateCart = async (req, res) => {
    try {
        const { quantity } = req.body;
        const qty = Number(quantity);

        if (!Number.isInteger(qty) || qty < 1)
            return res.status(400).json({ message: 'Invalid quantity' });

        const item = await Cart.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!item) return res.status(404).json({ message: 'Cart item not found' });

        const product = await Product.findByPk(item.productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (qty > product.stock) {
            return res.status(400).json({ message: `Only ${product.stock} item(s) in stock` });
        }

        item.quantity = qty;
        await item.save();

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* REMOVE ITEM */
export const removeFromCart = async (req, res) => {
    try {
        const item = await Cart.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!item) return res.status(404).json({ message: 'Cart item not found' });

        await item.destroy();
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
