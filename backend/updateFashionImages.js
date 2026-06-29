const mongoose = require('mongoose');
require('dotenv').config();

const productUpdates = [
    {
        name: 'Winter Puffer Jacket',
        image: '/images/products/winter-puffer-jacket.png'
    },
    {
        name: 'Essential Cotton T-Shirt',
        image: '/images/products/cotton-tshirt.png'
    },
    {
        name: 'Comfortable Joggers',
        image: '/images/products/comfortable-joggers.png'
    },
    {
        name: 'Formal Blazer Slim Fit',
        image: '/images/products/formal-blazer.png'
    },
    {
        name: 'Athletic Sports Shorts',
        image: '/images/products/athletic-sports-shorts.png'
    },
    {
        name: 'Elegant Maxi Skirt',
        image: '/images/products/elegant-maxi-skirt.png'
    },
    {
        name: 'Cargo Pants Utility',
        image: '/images/products/cargo-pants-utility.png'
    },
    {
        name: 'Traditional Cotton Kurta',
        image: '/images/products/cotton-kurta.png'
    },
    {
        name: 'Classic Polo Shirt',
        image: '/images/products/classic-polo-shirt.png'
    },
    {
        name: 'Leather Chelsea Boots',
        image: '/images/products/leather-chelsea-boots.png'
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
            const result = await Product.updateOne(
                { name: { $regex: new RegExp(update.name, 'i') } },
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
