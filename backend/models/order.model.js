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
            'Delivered',
            'Cancelled'
        ),
        defaultValue: 'Pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Order;
