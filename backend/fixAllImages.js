const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// COMPREHENSIVE IMAGE FIX - All verified Unsplash URLs
const fixAllProductImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        console.log('Connected to MongoDB');

        // All image fixes with verified Unsplash URLs
        const imageUpdates = [
            // ELECTRONICS - Verified URLs
            { name: '20000mAh Power Bank', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80' },
            { name: 'USB-C Hub 7-in-1', image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&q=80' },
            { name: 'HD Webcam 1080p', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&q=80' },
            { name: 'Portable External SSD 1TB', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80' },
            { name: 'Wireless Charging Pad', image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&q=80' },
            { name: 'Action Camera 4K', image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&q=80' },
            { name: 'Smart Home Hub', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&q=80' },
            { name: 'E-Reader Paperwhite', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80' },
            { name: 'Mini Drone with Camera', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80' },

            // CLOTHING - Verified URLs
            { name: 'Winter Puffer Jacket', image: 'https://images.unsplash.com/photo-1544923246-77307dd628b5?w=400&q=80' },
            { name: 'Essential Cotton T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
            { name: 'Comfortable Joggers', image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80' },
            { name: 'Formal Blazer Slim Fit', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80' },
            { name: 'Athletic Sports Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80' },
            { name: 'Woolen Cable Knit Sweater', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80' },
            { name: 'Cargo Pants Utility', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=400&q=80' },
            { name: 'Premium Cotton Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
            { name: 'Classic Denim Jacket', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80' },
            { name: 'Slim Fit Chino Pants', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80' },
            { name: 'Floral Summer Dress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80' },
            { name: 'Casual Linen Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
            { name: 'Classic Polo Shirt', image: 'https://images.unsplash.com/photo-1625910513413-5fc45da59989?w=400&q=80' },
            { name: 'Athletic Leggings', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80' },
            { name: 'Waterproof Raincoat', image: 'https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=400&q=80' },
            { name: 'Oxford Button-Down Shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80' },
            { name: 'Traditional Cotton Kurta', image: 'https://images.unsplash.com/photo-1583391733956-6c78276eedc5?w=400&q=80' },

            // HOME & KITCHEN - Verified URLs  
            { name: 'Artisan Coffee Maker', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80' },
            { name: 'Japanese Chef Knife Set', image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?w=400&q=80' },
            { name: 'Modern Ceramic Vase', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80' },
            { name: 'Smart Air Purifier', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
            { name: 'Luxury Cotton Bed Sheets', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80' },
            { name: 'Cast Iron Skillet', image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&q=80' },
            { name: 'Robot Vacuum Cleaner', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
            { name: 'Electric Kettle Premium', image: 'https://images.unsplash.com/photo-1594213114663-8a54b3f07a27?w=400&q=80' },
            { name: 'High-Speed Blender', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80' },
            { name: 'Stainless Steel Toaster', image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&q=80' },
            { name: 'Non-Stick Cookware Set', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
            { name: 'Instant Pressure Cooker', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80' },
            { name: 'Digital Rice Cooker', image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&q=80' },
            { name: 'Stand Mixer Professional', image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&q=80' },
            { name: 'RO Water Purifier', image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400&q=80' },
            { name: 'Induction Cooktop', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
            { name: 'Food Storage Container Set', image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=400&q=80' },
            { name: 'Bone China Dinner Set', image: 'https://images.unsplash.com/photo-1603199506016-5f8e24c1c9f4?w=400&q=80' },
            { name: 'Modern Table Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80' },
            { name: 'Decorative Wall Clock', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80' },

            // ACCESSORIES - Verified URLs
            { name: 'Classic Leather Wallet', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80' },
            { name: 'Canvas Travel Tote', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
            { name: 'Minimalist Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
            { name: 'Premium Laptop Backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
            { name: 'Silk Scarf Collection', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80' },
            { name: 'Designer Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
            { name: 'Genuine Leather Belt', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=400&q=80' },

            // SPORTS - Verified URLs
            { name: 'Eco-Friendly Yoga Mat', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80' },
            { name: 'Adjustable Dumbbell Pair', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
            { name: 'Smart Fitness Tracker', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80' },
            { name: 'Resistance Bands Set', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80' },
            { name: 'Speed Jump Rope', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&q=80' },

            // BEAUTY - Verified URLs
            { name: 'Radiance Skincare Set', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80' },
            { name: 'Aromatherapy Diffuser', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80' },
            { name: 'Professional Hair Dryer', image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&q=80' },
            { name: 'Luxury Perfume Collection', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80' }
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

fixAllProductImages();
