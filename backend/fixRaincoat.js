const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site')
    .then(async () => {
        const result = await Product.updateOne(
            { name: 'Waterproof Raincoat' },
            { $set: { image: 'https://images.pexels.com/photos/4872508/pexels-photo-4872508.jpeg?auto=compress&cs=tinysrgb&w=400' } }
        );
        console.log('Fixed Waterproof Raincoat:', result.modifiedCount);
        process.exit(0);
    });
