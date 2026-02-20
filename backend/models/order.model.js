import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            'Pending',
            'Processing',
            'Shipped',
            'Out for Delivery',
            'Delivered',
            'Cancelled'
        ),
        defaultValue: 'Pending'
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.ENUM('COD', 'Stripe', 'PayPal'),
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Refunded'),
        defaultValue: 'Pending'
    },
    trackingNumber: {
        type: DataTypes.STRING
    },
    estimatedDeliveryDate: {
        type: DataTypes.DATE
    },
    cancelledAt: {
        type: DataTypes.DATE
    },
    refundStatus: {
        type: DataTypes.ENUM('Not Requested', 'Requested', 'Processed'),
        defaultValue: 'Not Requested'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Order;
