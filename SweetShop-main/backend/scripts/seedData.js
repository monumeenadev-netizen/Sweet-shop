const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Sweet.deleteMany({});
    console.log('Cleared existing data');

    const users = await User.create([
      {
        email: 'user@test.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'user',
      },
      {
        email: 'admin@test.com',
        passwordHash: await bcrypt.hash('admin123', 10),
        role: 'admin',
      },
    ]);
    console.log('✅ Users created:', users.map(u => u.email));

    const sweets = await Sweet.create([
      {
        name: 'Gulab Jamun',
        category: 'Milk Based',
        price: 150,
        quantity: 20,
        image: 'https://images.unsplash.com/photo-1606471191009-63a0ef7b7e36?w=400&h=300&fit=crop&crop=center',
      },
      {
        name: 'Rasgulla',
        category: 'Milk Based',
        price: 120,
        quantity: 15,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center',
      },
      {
        name: 'Jalebi',
        category: 'Fried',
        price: 100,
        quantity: 25,
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop&crop=center',
      },
      {
        name: 'Kheer',
        category: 'Milk Based',
        price: 80,
        quantity: 10,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
      },
      {
        name: 'Kaju Barfi',
        category: 'Dry Fruits',
        price: 200,
        quantity: 12,
        image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop&crop=center',
      },
      {
        name: 'Motichoor Laddu',
        category: 'Traditional',
        price: 90,
        quantity: 30,
        image: 'https://images.unsplash.com/photo-1606471191009-63a0ef7b7e36?w=400&h=300&fit=crop&crop=center',
      },
    ]);
    console.log('✅ Sweets created:', sweets.map(s => s.name));

    console.log('\n✅ Seed data added successfully!');
    console.log('\nTest Credentials:');
    console.log('User - Email: user@test.com, Password: password123');
    console.log('Admin - Email: admin@test.com, Password: admin123');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();