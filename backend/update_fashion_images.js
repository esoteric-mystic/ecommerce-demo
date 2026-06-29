const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const updateFashionImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const updates = [
            {
                name: 'Traditional Cotton Kurta',
                image: 'https://images.pexels.com/photos/12730638/pexels-photo-12730638.jpeg?auto=compress&cs=tinysrgb&w=600' // Man in kurta
            },
            {
                name: 'Waterproof Raincoat',
                image: 'https://images.pexels.com/photos/3480353/pexels-photo-3480353.jpeg?auto=compress&cs=tinysrgb&w=600' // Yellow raincoat
            },
            {
                name: 'Athletic Leggings',
                image: 'https://images.pexels.com/photos/416754/pexels-photo-416754.jpeg?auto=compress&cs=tinysrgb&w=600' // Athletic leggings
            },
            {
                name: 'Classic Polo Shirt',
                image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=600' // Man in polo shirt
            }
        ];

        let count = 0;
        for (const update of updates) {
            const result = await Product.updateOne(
                { name: update.name },
                { $set: { image: update.image } }
            );
            if (result.modifiedCount > 0) {
                console.log(`Updated: ${update.name}`);
                count++;
            } else {
                console.log(`Not Updated (maybe not found or same): ${update.name}`);
            }
        }

        console.log(`\nSuccessfully updated ${count} fashion product images.`);
        process.exit();
    } catch (error) {
        console.error('Error updating images:', error);
        process.exit(1);
    }
};

updateFashionImages();
