import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
console.log("Loading models...");

const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
});

export default OrderItem;
