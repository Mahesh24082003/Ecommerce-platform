import db from '../models/index.js';

const Cart = db.Cart;
const Product = db.Product;
const Order = db.Order;
const OrderItem = db.OrderItem;

/* PLACE ORDER */
export const placeOrder = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            where: { userId: req.user.id },
            include: Product
        });

        if (cartItems.length === 0)
            return res.status(400).json({ message: 'Cart is empty' });

        let total = 0;

        cartItems.forEach(item => {
            total += item.quantity * item.Product.price;
        });

        const order = await Order.create({
            userId: req.user.id,
            totalAmount: total
        });

        for (const item of cartItems) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price
            });
        }

        await Cart.destroy({ where: { userId: req.user.id } });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* USER ORDERS */
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: { model: OrderItem, include: Product }
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ADMIN VIEW ALL */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [db.User, { model: OrderItem, include: Product }]
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ADMIN UPDATE STATUS */
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = req.body.status;
        await order.save();

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
