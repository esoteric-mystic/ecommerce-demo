const mongoose = require('mongoose');
require('dotenv').config();

const productUpdates = [
    {
        name: '20000mAh Power Bank',
        image: '/images/products/power-bank.png'
    },
    {
        name: 'Premium Tablet Pro 12.9"',
        image: '/images/products/tablet-pro-12.png'
    },
    {
        name: 'USB-C Hub 7-in-1',
        image: '/images/products/usb-c-hub.png'
    },
    {
        name: 'Portable External SSD 1TB',
        image: '/images/products/external-ssd.png'
    },
    {
        name: 'Wireless Charging Pad',
        image: '/images/products/wireless-charging-pad.png'
    },
    {
        name: 'Action Camera 4K',
        image: '/images/products/action-camera.png'
    },
    {
        name: 'E-Reader Paperwhite',
        image: '/images/products/kindle-paperwhite.png'
    }
];

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');

        const Product = mongoose.model('Product', new mongoose.Schema({
            name: String,
            image: String,
        }, { strict: false }));

        for (const update of productUpdates) {
            // Create a regex to match the name flexibly (escaping special chars)
            const nameRegex = new RegExp(update.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');

            const result = await Product.updateOne(
                { name: { $regex: nameRegex } },
                { $set: { image: update.image } }
            );

            if (result.matchedCount > 0) {
                console.log(`Updated image for ${update.name}`);
            } else {
                console.log(`Product not found: ${update.name}`);
            }
        }

        console.log('All updates completed');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateImages();
