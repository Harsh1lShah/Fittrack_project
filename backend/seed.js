const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');
const Membership = require('./models/Membership');

dotenv.config();

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing test users (Optional but useful for re-runs)
        await User.deleteMany({ email: /@example\.com$/ });
        console.log('Cleared existing test users.');

        // 1. Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('pass123', salt);

        // 2. Define Dummy Users
        const usersData = [
            { name: 'Free User', email: 'free@example.com', password: hashedPassword, role: 'member', memberId: 'FIT-' + Math.floor(10000 + Math.random() * 90000) },
            { name: 'Basic User', email: 'basic@example.com', password: hashedPassword, role: 'member', memberId: 'FIT-' + Math.floor(10000 + Math.random() * 90000) },
            { name: 'Premium User', email: 'premium@example.com', password: hashedPassword, role: 'member', memberId: 'FIT-' + Math.floor(10000 + Math.random() * 90000) }
        ];

        // 3. Create Users
        const createdUsers = await User.insertMany(usersData);
        console.log(`Created ${createdUsers.length} users successfully.`);

        // 4. Create Memberships for Basic and Premium users
        const memberships = [];
        const basicUser = createdUsers.find(u => u.email === 'basic@example.com');
        const premiumUser = createdUsers.find(u => u.email === 'premium@example.com');

        if (basicUser) {
            memberships.push({
                userId: basicUser._id,
                planName: 'basic',
                status: 'active',
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) // 1 month validity
            });
        }

        if (premiumUser) {
            memberships.push({
                userId: premiumUser._id,
                planName: 'premium',
                status: 'active',
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) // 1 month validity
            });
        }

        await Membership.insertMany(memberships);
        console.log('Memberships assigned to Basic and Premium users.');

        console.log('\nSeed process complete! Use these credentials to login:');
        createdUsers.forEach(u => {
            console.log(` - Email: ${u.email} / Pass: pass123`);
        });

        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
