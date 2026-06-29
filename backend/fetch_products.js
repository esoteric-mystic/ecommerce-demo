const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const fetchProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        const products = await Product.find({});
        console.log(JSON.stringify(products, null, 2));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fetchProducts();
