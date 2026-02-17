import db from '../models/index.js';

const Cart = db.Cart;
const Product = db.Product;

/* ADD TO CART */
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let item = await Cart.findOne({
            where: { userId: req.user.id, productId }
        });

        if (item) {
            item.quantity += quantity;
            await item.save();
        } else {
            item = await Cart.create({
                userId: req.user.id,
                productId,
                quantity
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
    console.log("BODY:", req.body);
    console.log("PARAM:", req.params.id);
    try {
        const { quantity } = req.body;

        if (!quantity || quantity < 1)
            return res.status(400).json({ message: 'Invalid quantity' });

        const item = await Cart.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Cart item not found' });

        item.quantity = quantity;
        await item.save();

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* REMOVE ITEM */
export const removeFromCart = async (req, res) => {
    try {
        const item = await Cart.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Cart item not found' });

        await item.destroy();
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
