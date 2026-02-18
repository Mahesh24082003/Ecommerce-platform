import db from '../models/index.js';
import { Op } from 'sequelize';

const Cart = db.Cart;
const Product = db.Product;
const Order = db.Order;
const OrderItem = db.OrderItem;

const ORDER_STATUSES = [
    'Pending',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
];

const PAYMENT_METHODS = ['COD', 'Stripe', 'PayPal'];

const buildOrderFilters = (query) => {
    const where = {};

    if (query.status) {
        where.status = query.status;
    }

    if (query.customerId) {
        where.userId = Number(query.customerId);
    }

    if (query.startDate || query.endDate) {
        where.createdAt = {};
        if (query.startDate) {
            where.createdAt[Op.gte] = new Date(query.startDate);
        }
        if (query.endDate) {
            where.createdAt[Op.lte] = new Date(query.endDate);
        }
    }

    return where;
};

const simulatePayment = ({ paymentMethod, mockPaymentSuccess }) => {
    if (paymentMethod === 'COD') {
        return { success: true, paymentStatus: 'Pending' };
    }

    if (mockPaymentSuccess === false) {
        return { success: false, paymentStatus: 'Failed' };
    }

    return { success: true, paymentStatus: 'Paid' };
};

/* PLACE ORDER */
export const placeOrder = async (req, res) => {
    const {
        shippingAddress,
        paymentMethod,
        mockPaymentSuccess = true
    } = req.body;

    if (!shippingAddress || !shippingAddress.trim()) {
        return res.status(400).json({ message: 'Shipping address is required' });
    }

    if (!PAYMENT_METHODS.includes(paymentMethod)) {
        return res.status(400).json({ message: 'Invalid payment method' });
    }

    const paymentResult = simulatePayment({ paymentMethod, mockPaymentSuccess });
    if (!paymentResult.success) {
        return res.status(402).json({
            message: 'Payment failed. Please try a different payment method.',
            paymentStatus: paymentResult.paymentStatus
        });
    }

    const transaction = await db.sequelize.transaction();

    try {
        const cartItems = await Cart.findAll({
            where: { userId: req.user.id },
            include: Product,
            transaction
        });

        if (cartItems.length === 0) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let total = 0;
        const productMap = new Map();

        for (const item of cartItems) {
            const product = await Product.findByPk(item.productId, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!product) {
                await transaction.rollback();
                return res.status(404).json({ message: `Product ${item.productId} not found` });
            }

            if (item.quantity > product.stock) {
                await transaction.rollback();
                return res.status(400).json({
                    message: `${product.name} has only ${product.stock} item(s) in stock`
                });
            }

            total += item.quantity * product.price;
            productMap.set(item.productId, product);
        }

        const order = await Order.create({
            userId: req.user.id,
            totalAmount: total,
            shippingAddress,
            paymentMethod,
            paymentStatus: paymentResult.paymentStatus,
            estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }, {
            transaction
        });

        for (const item of cartItems) {
            const product = productMap.get(item.productId);

            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            }, {
                transaction
            });

            product.stock -= item.quantity;
            await product.save({ transaction });
        }

        await Cart.destroy({
            where: { userId: req.user.id },
            transaction
        });

        await transaction.commit();

        res.status(201).json({
            message: 'Order placed successfully',
            order
        });
    } catch (err) {
        try {
            await transaction.rollback();
        } catch {}
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

export const getMyOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: { model: OrderItem, include: Product }
        });

        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ADMIN VIEW ALL */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: buildOrderFilters(req.query),
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

        if (!ORDER_STATUSES.includes(req.body.status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        order.status = req.body.status;
        await order.save();

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* CUSTOMER CANCEL */
export const cancelMyOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (!['Pending', 'Processing'].includes(order.status)) {
            return res.status(400).json({
                message: 'Order cannot be cancelled after shipping has started'
            });
        }

        order.status = 'Cancelled';
        order.cancelledAt = new Date();
        order.refundStatus = order.paymentStatus === 'Paid' ? 'Requested' : 'Not Requested';
        await order.save();

        res.json({ message: 'Order cancelled successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ADMIN CANCEL */
export const adminCancelOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = 'Cancelled';
        order.cancelledAt = new Date();
        order.refundStatus = order.paymentStatus === 'Paid' ? 'Requested' : 'Not Requested';
        await order.save();

        res.json({ message: 'Order cancelled by admin', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ADMIN REFUND */
export const processRefund = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.paymentStatus !== 'Paid') {
            return res.status(400).json({ message: 'Refund can be processed only for paid orders' });
        }

        order.paymentStatus = 'Refunded';
        order.refundStatus = 'Processed';
        await order.save();

        res.json({ message: 'Refund processed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ADMIN TRACKING */
export const updateTrackingInfo = async (req, res) => {
    try {
        const { trackingNumber, estimatedDeliveryDate } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.trackingNumber = trackingNumber || order.trackingNumber;
        order.estimatedDeliveryDate = estimatedDeliveryDate || order.estimatedDeliveryDate;
        await order.save();

        res.json({ message: 'Tracking info updated', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
