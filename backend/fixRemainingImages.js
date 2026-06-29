const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// FINAL FIX - Using verified working image URLs
const fixRemainingImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        console.log('Connected to MongoDB');

        // These URLs have been verified to work
        const imageUpdates = [
            // ELECTRONICS - Need fixing
            { name: 'Action Camera 4K', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80' },
            { name: 'USB-C Hub 7-in-1', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
            { name: 'Wireless Charging Pad', image: 'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&q=80' },
            { name: 'HD Webcam 1080p', image: 'https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=400&q=80' },

            // CLOTHING - Need fixing
            { name: 'Winter Puffer Jacket', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80' },
            { name: 'Woolen Cable Knit Sweater', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80' },
            { name: 'Athletic Sports Shorts', image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&q=80' },
            { name: 'Cargo Pants Utility', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
            { name: 'Formal Blazer Slim Fit', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80' },
            { name: 'Essential Cotton T-Shirt', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80' }
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

fixRemainingImages();
