import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    category: DataTypes.STRING,
    imageUrl: DataTypes.STRING
}, {
    tableName: 'products',   // ⭐ IMPORTANT
    timestamps: true
});

export default Product;
