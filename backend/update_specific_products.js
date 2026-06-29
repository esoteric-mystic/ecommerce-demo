const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const updateSpecificImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const updates = [
            // Generated Local Images
            { name: '20000mAh Power Bank', image: '/images/products/powerbank_20000mah.png' },
            { name: 'USB-C Hub 7-in-1', image: '/images/products/usbc_hub.png' },
            { name: 'HD Webcam 1080p', image: '/images/products/hd_webcam.png' },
            { name: 'Portable External SSD 1TB', image: '/images/products/external_ssd.png' },
            { name: 'Smart Home Hub', image: '/images/products/smart_home_hub.png' },
            { name: 'Wireless Charging Pad', image: '/images/products/wireless_charger.png' },

            // Pexels Fallbacks (Quota Limit Reached for Generation)
            { name: 'Action Camera 4K', image: 'https://images.pexels.com/photos/3927389/pexels-photo-3927389.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { name: 'E-Reader Paperwhite', image: 'https://images.pexels.com/photos/4153147/pexels-photo-4153147.jpeg?auto=compress&cs=tinysrgb&w=600' },
            { name: 'Mini Drone with Camera', image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=600' }
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

        console.log(`\nSuccessfully updated ${count} product images.`);
        process.exit();
    } catch (error) {
        console.error('Error updating images:', error);
        process.exit(1);
    }
};

updateSpecificImages();
