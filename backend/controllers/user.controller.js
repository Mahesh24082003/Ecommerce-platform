import db from '../models/index.js';

const User = db.User;

export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateMyProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name ?? user.name;
        user.phone = phone ?? user.phone;
        user.address = address ?? user.address;
        await user.save();

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
