import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

console.log("Loading models...");

const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Cart;
