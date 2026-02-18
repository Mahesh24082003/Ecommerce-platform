import db from '../models/index.js';

const Review = db.Review;

export const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        const review = await Review.create({
            productId,
            userId,
            rating,
            comment,
            approved: false
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.findAll({
            where: { productId, approved: true },
            include: [{ model: db.User, attributes: ['id', 'email', 'name'] }]
        });

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPendingReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { approved: false },
            include: [
                { model: db.User, attributes: ['id', 'email', 'name'] },
                { model: db.Product, attributes: ['id', 'name'] }
            ]
        });

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const approveReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) return res.status(404).json({ message: 'Review not found' });

        review.approved = true;
        await review.save();

        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findByPk(id);

        if (!review) return res.status(404).json({ message: 'Review not found' });

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();

        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) return res.status(404).json({ message: 'Review not found' });

        await review.destroy();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
