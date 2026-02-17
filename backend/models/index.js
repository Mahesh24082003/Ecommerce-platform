import sequelize from '../config/db.config.js';
import User from './user.model.js';
import Product from './product.model.js';
import Cart from './cart.model.js';
import Order from './order.model.js';
import OrderItem from './orderItem.model.js';

const db = {};

db.sequelize = sequelize;

/* register models */
db.User = User;
db.Product = Product;
db.Cart = Cart;
db.Order = Order;
db.OrderItem = OrderItem;

/* CART RELATIONS */
db.User.hasMany(db.Cart, { foreignKey: 'userId' });
db.Cart.belongsTo(db.User, { foreignKey: 'userId' });

db.Product.hasMany(db.Cart, { foreignKey: 'productId' });
db.Cart.belongsTo(db.Product, { foreignKey: 'productId' });

/* ORDER RELATIONS */
db.User.hasMany(db.Order, { foreignKey: 'userId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });

db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId' });

db.Product.hasMany(db.OrderItem, { foreignKey: 'productId' });
db.OrderItem.belongsTo(db.Product, { foreignKey: 'productId' });

export default db;
