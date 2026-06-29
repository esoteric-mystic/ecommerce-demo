const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const imageUpdates = [
    { name: 'Classic Leather Wallet', image: '/product-images/wallet.png' },
    { name: 'Canvas Travel Tote', image: '/product-images/travel_tote.png' },
    { name: 'Minimalist Watch', image: '/product-images/minimalist_watch.png' },
    { name: 'Premium Laptop Backpack', image: '/product-images/laptop_backpack.png' },
    { name: 'Silk Scarf Collection', image: '/product-images/silk_scarf.png' },
    { name: 'Designer Sunglasses', image: '/product-images/sunglasses.png' },
    { name: 'Genuine Leather Belt', image: '/product-images/leather_belt.png' },
    { name: 'Silk Tie Collection', image: '/product-images/silk_tie.png' },
    { name: 'Pearl Drop Earrings', image: '/product-images/pearl_earrings.png' },
    { name: 'Gold Pendant Necklace', image: '/product-images/gold_necklace.png' },
    { name: 'Beaded Bracelet Set', image: '/product-images/beaded_bracelet.png' },
    { name: 'Premium Phone Case', image: '/product-images/phone_case.png' },
    { name: 'Leather Keychain', image: '/product-images/leather_keychain.png' },
    { name: 'Cotton Headband Set', image: '/product-images/headband_set.png' },
    { name: 'Wool Beanie Cap', image: '/product-images/wool_beanie.png' },
    { name: 'Leather Touchscreen Gloves', image: '/product-images/leather_gloves.png' },
    { name: 'Automatic Umbrella', image: '/product-images/umbrella.png' },
    { name: 'Leather Passport Holder', image: '/product-images/passport_holder.png' },
    { name: 'Canvas Messenger Bag', image: '/product-images/messenger_bag.png' },
    { name: 'Crossbody Phone Bag', image: '/product-images/crossbody_bag.png' }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site')
    .then(async () => {
        console.log('Connected to MongoDB');
        let updatedCount = 0;

        for (const update of imageUpdates) {
            const result = await Product.updateOne(
                { name: update.name },
                { $set: { image: update.image } }
            );
            if (result.modifiedCount > 0) {
                console.log(`Updated ${update.name}`);
                updatedCount++;
            } else {
                console.log(`No change for ${update.name} (or product not found)`);
            }
        }

        console.log(`TOTAL UPDATED: ${updatedCount}`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
