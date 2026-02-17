import app from './app.js';
import dotenv from 'dotenv';
import db from './models/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await db.sequelize.sync({ force: true }); // recreate all tables
        console.log("All tables recreated");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("DB Sync Failed:", err);
    }
})();
