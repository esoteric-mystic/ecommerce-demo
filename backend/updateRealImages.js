const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Real product images found from web search
const imageUpdates = [
    {
        name: 'Action Camera 4K',
        image: 'https://m.media-amazon.com/images/I/61vGvhJBQ8L._AC_UF1000,1000_QL80_.jpg'
    },
    {
        name: 'Winter Puffer Jacket',
        image: 'https://m.media-amazon.com/images/I/61fZaKs4xyL._AC_UY1000_.jpg'
    },
    {
        name: 'Woolen Cable Knit Sweater',
        image: 'https://m.media-amazon.com/images/I/71shw3svIrL._AC_UY1000_.jpg'
    },
    {
        name: 'Athletic Sports Shorts',
        image: 'https://m.media-amazon.com/images/I/6115Z-cg2cL._AC_UY1000_.jpg'
    },
    {
        name: 'Titanium Smartwatch Ultra',
        image: 'https://m.media-amazon.com/images/I/71XA0QCW5lL._AC_UF1000,1000_QL80_.jpg'
    },
    {
        name: 'Canvas Travel Tote',
        image: 'https://img.freepik.com/free-photo/bag-hanging-from-furniture-item-indoors_23-2151073506.jpg'
    },
    {
        name: 'Portable Bluetooth Speaker',
        image: 'https://m.media-amazon.com/images/I/71Q6XdcmJzL.jpg'
    },
    {
        name: 'Futuristic Running Sneakers',
        image: 'https://static.nike.com/a/images/t_default/187e02b8-726c-4546-aae2-4744dae0761c/NIKE+INTERACT+RUN+EASYON.png'
    },
    {
        name: 'Eco-Friendly Yoga Mat',
        image: 'https://cdn.shopify.com/s/files/1/0505/7373/8135/products/Ink-Blue---Lime-Green_Yoga-Mats-8mm_Main-Image_400x400.jpg?v=1638443068'
    }
];

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        console.log('Connected to MongoDB');

        for (const update of imageUpdates) {
            const result = await Product.findOneAndUpdate(
                { name: update.name },
                { image: update.image },
                { new: true }
            );

            if (result) {
                console.log(`✓ Updated image for: ${update.name}`);
            } else {
                console.log(`✗ Product not found: ${update.name}`);
            }
        }

        console.log('\n✅ All product images updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating images:', error);
        process.exit(1);
    }
};

updateImages();
