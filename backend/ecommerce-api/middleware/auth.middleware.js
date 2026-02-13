import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.config.js';
import db from '../models/index.js';

const User = db.User;

export const verifyToken = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];

        if (!header) return res.status(403).json({ message: 'No token provided' });

        const token = header.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
