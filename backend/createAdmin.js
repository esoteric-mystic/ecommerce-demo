const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-site');
        console.log('Connected to MongoDB');
        
        const email = 'admin@shoppingsite.com';
        let admin = await User.findOne({ email });
        
        if (admin) {
            console.log('Admin user already exists!');
            admin.role = 'admin';
            admin.password = 'admin123';
            await admin.save();
            console.log('Updated admin password to: admin123');
        } else {
            admin = new User({
                name: 'Admin User',
                email: email,
                password: 'admin123',
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created successfully!');
        }
        
        console.log('-----------------------------------');
        console.log('Admin Credentials:');
        console.log('Email: admin@shoppingsite.com');
        console.log('Password: admin123');
        console.log('-----------------------------------');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
