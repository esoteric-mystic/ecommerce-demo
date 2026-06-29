const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site')
    .then(async () => {
        try {
            const products = await Product.find({ category: 'Accessories' });
            fs.writeFileSync('accessories.json', JSON.stringify(products, null, 2));
            console.log('Written to accessories.json');
            process.exit(0);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
