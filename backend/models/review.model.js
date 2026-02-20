import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT },
    approved: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    tableName: 'reviews',
    timestamps: true
});

export default Review;
