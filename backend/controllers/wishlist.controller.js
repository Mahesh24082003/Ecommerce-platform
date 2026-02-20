import db from '../models/index.js';

const Wishlist = db.Wishlist;
const Product = db.Product;
const Cart = db.Cart;

export const getWishlist = async (req, res) => {
    try {
        const items = await Wishlist.findAll({
            where: { userId: req.user.id },
            include: [{ model: Product }]
        });

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const [item, created] = await Wishlist.findOrCreate({
            where: { userId: req.user.id, productId },
            defaults: {
                userId: req.user.id,
                productId
            }
        });

        res.status(created ? 201 : 200).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeWishlistItem = async (req, res) => {
    try {
        const item = await Wishlist.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!item) return res.status(404).json({ message: 'Wishlist item not found' });
        await item.destroy();
        res.json({ message: 'Item removed from wishlist' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const moveWishlistItemToCart = async (req, res) => {
    try {
        const quantity = Number(req.body.quantity || 1);
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const wishlistItem = await Wishlist.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        const product = await Product.findByPk(wishlistItem.productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cartItem = await Cart.findOne({
            where: { userId: req.user.id, productId: product.id }
        });

        const targetQty = (cartItem?.quantity || 0) + quantity;
        if (targetQty > product.stock) {
            return res.status(400).json({ message: `Only ${product.stock} item(s) in stock` });
        }

        if (!cartItem) {
            cartItem = await Cart.create({
                userId: req.user.id,
                productId: product.id,
                quantity
            });
        } else {
            cartItem.quantity = targetQty;
            await cartItem.save();
        }

        await wishlistItem.destroy();
        res.json({ message: 'Item moved to cart', cartItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
