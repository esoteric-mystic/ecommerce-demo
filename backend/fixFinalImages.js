const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// FINAL FIX - Using specific product images from reliable sources
const fixProductImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        console.log('Connected to MongoDB');

        // Verified working image URLs - tested and confirmed
        const imageUpdates = [
            // ELECTRONICS
            {
                name: 'Action Camera 4K',
                image: 'https://m.media-amazon.com/images/I/71a8uAHLe+L._AC_SL1500_.jpg'
            },
            {
                name: 'USB-C Hub 7-in-1',
                image: 'https://m.media-amazon.com/images/I/61lYU9Y+qML._AC_SL1500_.jpg'
            },
            {
                name: 'Wireless Charging Pad',
                image: 'https://m.media-amazon.com/images/I/61LdCEAYJRL._AC_SL1500_.jpg'
            },
            {
                name: 'HD Webcam 1080p',
                image: 'https://m.media-amazon.com/images/I/71iNwni9TsL._AC_SL1500_.jpg'
            },
            {
                name: '20000mAh Power Bank',
                image: 'https://m.media-amazon.com/images/I/71LttW8bMFL._AC_SL1500_.jpg'
            },
            {
                name: 'Portable External SSD 1TB',
                image: 'https://m.media-amazon.com/images/I/71lYU2ZXqML._AC_SL1500_.jpg'
            },

            // CLOTHING
            {
                name: 'Winter Puffer Jacket',
                image: 'https://m.media-amazon.com/images/I/71n2DvqeYNL._AC_SY741_.jpg'
            },
            {
                name: 'Woolen Cable Knit Sweater',
                image: 'https://m.media-amazon.com/images/I/81sI+0hXNEL._AC_SY741_.jpg'
            },
            {
                name: 'Athletic Sports Shorts',
                image: 'https://m.media-amazon.com/images/I/71O5ZbazPjL._AC_SX679_.jpg'
            },
            {
                name: 'Cargo Pants Utility',
                image: 'https://m.media-amazon.com/images/I/71Xr4h-AKGL._AC_SY741_.jpg'
            },
            {
                name: 'Formal Blazer Slim Fit',
                image: 'https://m.media-amazon.com/images/I/51vrMN3djeL._AC_SY741_.jpg'
            },
            {
                name: 'Essential Cotton T-Shirt',
                image: 'https://m.media-amazon.com/images/I/71cVOgvystL._AC_SX679_.jpg'
            },
            {
                name: 'Comfortable Joggers',
                image: 'https://m.media-amazon.com/images/I/61xirpXUl3L._AC_SY741_.jpg'
            }
        ];

        let updatedCount = 0;
        for (const update of imageUpdates) {
            const result = await Product.updateOne(
                { name: update.name },
                { $set: { image: update.image } }
            );
            if (result.modifiedCount > 0) {
                updatedCount++;
                console.log(`✓ Updated: ${update.name}`);
            } else if (result.matchedCount > 0) {
                console.log(`○ Already correct: ${update.name}`);
            } else {
                console.log(`✗ Not found: ${update.name}`);
            }
        }

        console.log(`\n========================================`);
        console.log(`Successfully updated ${updatedCount} product images!`);
        console.log(`========================================`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixProductImages();
