const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const updateSunscreen = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');

        const result = await Product.updateOne(
            { name: 'SPF 50 Sunscreen Lotion' },
            { $set: { image: '/images/products/sunscreen.png' } }
        );

        if (result.modifiedCount > 0) {
            console.log('Successfully updated SPF 50 Sunscreen Lotion image.');
        } else {
            console.log('Product not found or image already set.');
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateSunscreen();
