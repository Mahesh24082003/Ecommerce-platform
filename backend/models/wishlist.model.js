import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notifyOnPriceDrop: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    notifyOnStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'wishlists',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'productId']
        }
    ]
});

export default Wishlist;
